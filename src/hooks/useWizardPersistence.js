import { useWizard } from './useWizard';

export function useWizardPersistence() {
  const { state, dispatch } = useWizard();
  
  const resetWizard = () => {
    dispatch({ type: 'RESET_WIZARD' });
  };
  
  const clearPersistedData = () => {
    localStorage.removeItem('istsos4-wizard-state');
  };
    
  return {
    resetWizard,
    clearPersistedData,
  };
}
