import { useWizard } from './useWizard';

export function useValidation() {
  const { state, dispatch } = useWizard();
  
  const validateAndUpdateField = (fieldName, value) => {
    dispatch({
      type: 'UPDATE_CONFIG',
      payload: { [fieldName]: value }
    });
  };
  
  const touchField = (fieldName) => {
    dispatch({ type: 'SET_FIELD_TOUCHED', payload: fieldName });
  };
  
  const touchMultipleFields = (fieldNames) => {
    dispatch({ type: 'TOUCH_MULTIPLE_FIELDS', payload: fieldNames });
  };
  
  const getFieldError = (fieldName) => {
    return state.validation.errors[fieldName];
  };
  
  const isFieldTouched = (fieldName) => {
    return state.validation.touched[fieldName];
  };
  
  const shouldShowError = (fieldName) => {
    return getFieldError(fieldName) && isFieldTouched(fieldName);
  };
  
  const isStepValid = () => {
    return Object.keys(state.validation.errors).length === 0;
  };
  
  return {
    validateAndUpdateField,
    touchField,
    touchMultipleFields,
    getFieldError,
    isFieldTouched,
    shouldShowError,
    isStepValid,
    errors: state.validation.errors,
    touched: state.validation.touched
  };
}