
import React from 'react';

function WelcomeStep() {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <div className="w-8 h-8 bg-blue-600 rounded"></div>
      </div>
      <h2 className="text-3xl font-bold text-gray-900">Welcome to istSOS4 Setup Wizard</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        This wizard will guide you through configuring istSOS4 for Docker deployment. 
        We'll help you set up database connections, configure data management options, 
        and generate a ready-to-use environment file.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
        <h3 className="font-semibold text-blue-900 mb-2">Prerequisites:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Docker installed</li>
          <li>• PostgreSQL access</li>
          <li>• Basic understanding of istSOS4</li>
        </ul>
      </div>
    </div>
  );
}

export default WelcomeStep;