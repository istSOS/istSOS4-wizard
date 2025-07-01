import React, { useReducer, useEffect, useRef, useState } from 'react';
import { WizardContext } from '../../context/WizardContext';
import { wizardReducer } from '../../reducers/wizardReducer';
import { initialState } from '../../utils/constants';

const STORAGE_KEY = 'istsos4-wizard-state';
const SAVE_DELAY = 1000;

function WizardProvider({ children }) {
  const [lastSaved, setLastSaved] = useState(null);
  const saveTimeoutRef = useRef(null);
  
  const loadInitialState = () => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        return {
          ...initialState,
          ...parsedState,
          validation: {
            ...initialState.validation,
            ...parsedState.validation
          },
          configuration: {
            ...initialState.configuration,
            ...parsedState.configuration
          }
        };
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(wizardReducer, loadInitialState());
  
  // Debounced save to localStorage
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      try {
        const stateToSave = {
          ...state,
          savedAt: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        setLastSaved(Date.now());
      } catch (error) {
        console.error('Error saving state:', error);
      }
    }, SAVE_DELAY);
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state]);
  
  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue && e.newValue !== e.oldValue) {
        if (window.confirm('The wizard has been updated in another tab. Do you want to load those changes?')) {
          window.location.reload();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
}

export default WizardProvider;
