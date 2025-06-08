import React from 'react'
import { useWizard } from '../../hooks/useWizard';
import FormField from '../common/FormField';


function SampleDataStep() {
  const { state, dispatch } = useWizard();
  const { configuration } = state;

  const updateConfig = (field, value) => {
    dispatch({
      type: 'UPDATE_CONFIG',
      payload: { [field]: value }
    });
  };

  if (configuration.dummyData === 0) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Sample Data Configuration</h2>
        <p className="text-gray-600">
          Sample data generation is disabled. Enable "Generate dummy data" in the previous step to configure these options.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Sample Data Configuration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Number of Things">
          <input
            type="number"
            min="1"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.nThings}
            onChange={(e) => updateConfig('nThings', parseInt(e.target.value))}
          />
        </FormField>

        <FormField label="Observed Properties">
          <input
            type="number"
            min="1"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.nObservedProperties}
            onChange={(e) => updateConfig('nObservedProperties', parseInt(e.target.value))}
          />
        </FormField>

        <FormField label="Start Date/Time">
          <input
            type="datetime-local"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.startDatetime.slice(0, 19)}
            onChange={(e) => updateConfig('startDatetime', e.target.value + '.000+01:00')}
          />
        </FormField>

        <FormField label="Data Interval">
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.interval}
            onChange={(e) => updateConfig('interval', e.target.value)}
          >
            <option value="P1D">1 Day</option>
            <option value="P1W">1 Week</option>
            <option value="P1M">1 Month</option>
            <option value="P1Y">1 Year</option>
          </select>
        </FormField>

        <FormField label="Frequency">
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.frequency}
            onChange={(e) => updateConfig('frequency', e.target.value)}
          >
            <option value="PT1M">Every minute</option>
            <option value="PT5M">Every 5 minutes</option>
            <option value="PT15M">Every 15 minutes</option>
            <option value="PT1H">Every hour</option>
          </select>
        </FormField>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Estimated Data Points</h3>
        <p className="text-blue-800">
          Approximately {configuration.nThings * configuration.nObservedProperties * 365 * 24 * 12} data points will be generated
        </p>
      </div>
    </div>
  );
}

export default SampleDataStep;