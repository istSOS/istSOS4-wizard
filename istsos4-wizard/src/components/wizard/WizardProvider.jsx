
import React, { useReducer } from 'react';
import { WizardContext } from '../../context/WizardContext';
import { wizardReducer } from '../../reducers/wizardReducer';
import { initialState } from '../../utils/constants';

function WizardProvider({ children }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  
  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
}

export default WizardProvider;