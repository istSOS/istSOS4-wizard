
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWizard } from '../../hooks/useWizard';

function Navigation() {
  const { state, dispatch } = useWizard();

  const steps = [
    { title: 'Welcome' },
    { title: 'Server Config' },
    { title: 'Database' },
    { title: 'Data Management' },
    { title: 'Sample Data' },
    { title: 'Performance' },
    { title: 'Services' },
    { title: 'Review' },
    { title: 'Complete' }
  ];

  const canGoNext = state.currentStep < state.totalSteps;
  const canGoPrev = state.currentStep > 1;

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <button
        onClick={() => dispatch({ type: 'PREV_STEP' })}
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

      <div className="text-sm text-gray-600">
        {steps[state.currentStep - 1]?.title}
      </div>

      <button
        onClick={() => dispatch({ type: 'NEXT_STEP' })}
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
  );
}

export default Navigation;