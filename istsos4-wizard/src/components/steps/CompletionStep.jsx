import React from 'react';
import { Check} from 'lucide-react';

function CompletionStep() {
  
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900">Configuration Complete!</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Your istSOS4 configuration has been successfully generated. You can now deploy 
        your istSOS4 instance using Docker with the generated environment file.
      </p>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
        <h3 className="font-semibold text-green-900 mb-2">Resources:</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• istSOS4 Documentation</li>
          <li>• Docker Deployment Guide</li>
          <li>• Community Support</li>
        </ul>
      </div>
    </div>
  );
}

export default CompletionStep;