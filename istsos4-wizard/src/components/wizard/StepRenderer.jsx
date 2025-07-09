
import React from 'react';
import { useWizard } from '../../hooks/useWizard';

import WelcomeStep from '../steps/WelcomeStep';
import BasicServerStep from '../steps/BasicServerStep';
import DatabaseStep from '../steps/DatabaseStep';
import DataManagementStep from '../steps/DataManagementStep';
import SampleDataStep from '../steps/SampleDataStep';
import PerformanceStep from '../steps/PerformanceStep';
import ServicesStep from '../steps/ServicesStep';
import ReviewStep from '../steps/ReviewStep';
import CompletionStep from '../steps/CompletionStep';
import AuthorizationStep from '../steps/AuthorizationStep';

function StepRenderer() {
  const { state } = useWizard();
  
  const steps = [
    WelcomeStep,
    BasicServerStep,
    DatabaseStep,
    AuthorizationStep,
    DataManagementStep,
    SampleDataStep,
    PerformanceStep,
    ServicesStep,
    ReviewStep,
    CompletionStep
  ];

  const CurrentStep = steps[state.currentStep - 1];
  
  return (
    <div className="min-h-96">
      <CurrentStep />
    </div>
  );
}

export default StepRenderer;