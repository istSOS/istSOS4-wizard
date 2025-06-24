
import React from 'react';
import { useWizard } from '../../hooks/useWizard';

function ProgressBar() {
  const { state } = useWizard();

  const progress = (state.currentStep / state.totalSteps) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Step {state.currentStep} of {state.totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );
}

export default ProgressBar;