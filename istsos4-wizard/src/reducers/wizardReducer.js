
export function wizardReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_CONFIG':
      return {
        ...state,
        configuration: { ...state.configuration, ...action.payload }
      };
    case 'SET_VALIDATION':
      return {
        ...state,
        validation: action.payload
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps)
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