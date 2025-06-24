import React from 'react';
import { WizardProvider, StepRenderer } from './components/wizard';
import ProgressBar from './components/common/ProgressBar';
import Navigation from './components/common/Navigation';

function App() {
  return (
    <WizardProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ProgressBar />
            <StepRenderer />
            <Navigation />
          </div>
        </div>
      </div>
    </WizardProvider>
  );
}

export default App;