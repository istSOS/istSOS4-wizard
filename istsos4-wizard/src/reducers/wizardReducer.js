import { validateField, validateStep } from '../utils/fieldValidations';

export function wizardReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
      
    case 'UPDATE_CONFIG':
      const newConfig = { ...state.configuration, ...action.payload };
      const fieldName = Object.keys(action.payload)[0];
      const fieldValue = action.payload[fieldName];
      
        const fieldError = validateField(fieldName, fieldValue);
      
 
      const newErrors = { ...state.validation.errors };
      if (fieldError) {
        newErrors[fieldName] = fieldError;
      } else {
        delete newErrors[fieldName];
      }
      
      return {
        ...state,
        configuration: newConfig,
        validation: {
          ...state.validation,
          errors: newErrors,
          touched: { ...state.validation.touched, [fieldName]: true }
        }
      };
      
    case 'SET_FIELD_TOUCHED':
      return {
        ...state,
        validation: {
          ...state.validation,
          touched: { ...state.validation.touched, [action.payload]: true }
        }
      };
      
    case 'TOUCH_MULTIPLE_FIELDS':
      const newTouched = { ...state.validation.touched };
      action.payload.forEach(field => {
        newTouched[field] = true;
      });
      return {
        ...state,
        validation: {
          ...state.validation,
          touched: newTouched
        }
      };
      
    case 'VALIDATE_CURRENT_STEP':
      const stepErrors = validateStep(state.currentStep, state.configuration);
      return {
        ...state,
        validation: {
          ...state.validation,
          errors: { ...state.validation.errors, ...stepErrors },
          isValid: Object.keys(stepErrors).length === 0
        }
      };
      
    case 'NEXT_STEP':
  
      const currentStepErrors = validateStep(state.currentStep, state.configuration);
      
      if (Object.keys(currentStepErrors).length > 0) {
        
        const errorFields = Object.keys(currentStepErrors);
        const touchedFields = { ...state.validation.touched };
        errorFields.forEach(field => {
          touchedFields[field] = true;
        });
        
        return {
          ...state,
          validation: {
            errors: { ...state.validation.errors, ...currentStepErrors },
            touched: touchedFields,
            isValid: false
          }
        };
      }
      
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps),
        validation: { ...state.validation, isValid: true }
      };
      
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1)
      };
      
    default:
      return state;
  }
}