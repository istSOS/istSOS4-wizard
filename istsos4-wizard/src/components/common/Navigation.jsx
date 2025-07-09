import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useWizard } from '../../hooks/useWizard';
import { useWizardPersistence } from '../../hooks/useWizardPersistence';

const steps = [
  { title: 'Welcome' },
  { title: 'Server Config' },
  { title: 'Database' },
  { title: 'Authorization' },
  { title: 'Data Management' },
  { title: 'Sample Data' },
  { title: 'Performance' },
  { title: 'Services' },
  { title: 'Review' },
  { title: 'Complete' }
];

function Navigation() {
  const { state, dispatch } = useWizard();
  const { resetWizard } = useWizardPersistence();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const hasErrors = Object.keys(state.validation.errors).length > 0;
  const hasTouchedErrors = Object.keys(state.validation.errors).some(
    field => state.validation.touched[field]
  );

  const canGoNext = state.currentStep < state.totalSteps;
  const canGoPrev = state.currentStep > 1;

  const handleNext = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const handlePrev = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const handleReset = () => {
    if (showResetConfirm) {
      resetWizard();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 3000);
    }
  };

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <button
        onClick={handlePrev}
        disabled={!canGoPrev}
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          canGoPrev 
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      <div className="text-center">
        <div className="text-sm text-gray-600">
          {steps[state.currentStep - 1]?.title}
        </div>
        {hasErrors && hasTouchedErrors && (
          <p className="text-xs text-red-600 mt-1">
            Please fix errors before proceeding
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleReset}
          className={`p-2 rounded-md transition-colors ${
            showResetConfirm 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
          title={showResetConfirm ? 'Click again to confirm reset' : 'Reset wizard'}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            canGoNext 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}

export default Navigation;