import React from 'react';
import { useWizard } from '../../hooks/useWizard';
import Toggle from '../common/Toggle';

function DataManagementStep() {
  const { state, dispatch } = useWizard();
  const { configuration } = state;

  const updateConfig = (field, value) => {
    dispatch({
      type: 'UPDATE_CONFIG',
      payload: { [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Data Management Configuration</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4">Data Initialization</h3>
          <div className="space-y-4">
            <Toggle
              checked={configuration.dummyData === 1}
              onChange={(e) => updateConfig('dummyData', e.target.checked ? 1 : 0)}
              label="Generate dummy data for testing"
            />
            
            <Toggle
              checked={configuration.clearData === 1}
              onChange={(e) => updateConfig('clearData', e.target.checked ? 1 : 0)}
              label="Clear existing data on startup"
            />
            
            {configuration.clearData === 1 && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mt-2">
                <p className="text-red-800 text-sm font-medium">
                  ⚠ Warning: This will permanently delete all existing data!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4">Data Behavior</h3>
          <div className="space-y-4">
            <Toggle
              checked={configuration.versioning}
              onChange={(e) => updateConfig('versioning', e.target.checked)}
              label="Enable data versioning"
            />
            
            <Toggle
              checked={configuration.duplicates}
              onChange={(e) => updateConfig('duplicates', e.target.checked)}
              label="Allow duplicate entries"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataManagementStep;