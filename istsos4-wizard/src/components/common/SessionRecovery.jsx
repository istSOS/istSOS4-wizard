import React, { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useWizard } from '../../hooks/useWizard';

function SessionRecovery() {
  const { state } = useWizard();
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {

    const savedState = localStorage.getItem('istsos4-wizard-state');
    if (savedState && state.currentStep > 1) {
      setShowNotification(true);

      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  if (!showNotification) return null;
  
  return (
    <div className="fixed top-4 right-4 max-w-sm bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900">Session Recovered</h3>
          <p className="text-sm text-blue-800 mt-1">
            Your previous progress has been restored. You're on step {state.currentStep} of {state.totalSteps}.
          </p>
        </div>
        <button
          onClick={() => setShowNotification(false)}
          className="ml-3 text-blue-600 hover:text-blue-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default SessionRecovery;