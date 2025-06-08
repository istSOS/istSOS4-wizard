import React from 'react';
import { useWizard } from '../../hooks/useWizard';
import FormField from '../common/FormField';

function PerformanceStep() {
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
      <h2 className="text-2xl font-bold text-gray-900">Performance & Advanced Settings</h2>
      
      <div className="space-y-6">
        <FormField label="Count Mode" info="How to handle large result set counting">
          <div className="space-y-3">
            {[
              { value: 'FULL', label: 'Full Count', desc: 'Accurate but slow for large datasets' },
              { value: 'LIMIT_ESTIMATE', label: 'Limit + Estimate', desc: 'Balanced approach' },
              { value: 'ESTIMATE_LIMIT', label: 'Estimate + Limit', desc: 'Fast but potentially inaccurate' }
            ].map((mode) => (
              <label key={mode.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="countMode"
                  value={mode.value}
                  checked={configuration.countMode === mode.value}
                  onChange={(e) => updateConfig('countMode', e.target.value)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">{mode.label}</div>
                  <div className="text-sm text-gray-600">{mode.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Count Estimate Threshold">
            <input
              type="number"
              min="1000"
              max="100000"
              step="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={configuration.countEstimateThreshold}
              onChange={(e) => updateConfig('countEstimateThreshold', parseInt(e.target.value))}
            />
          </FormField>

          <FormField label="Default Top Value">
            <input
              type="number"
              min="10"
              max="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={configuration.topValue}
              onChange={(e) => updateConfig('topValue', parseInt(e.target.value))}
            />
          </FormField>

          <FormField label="Partition Chunk Size">
            <input
              type="number"
              min="1000"
              max="50000"
              step="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={configuration.partitionChunk}
              onChange={(e) => updateConfig('partitionChunk', parseInt(e.target.value))}
            />
          </FormField>

          <FormField label="Chunk Interval">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={configuration.chunkInterval}
              onChange={(e) => updateConfig('chunkInterval', e.target.value)}
            >
              <option value="P1M">1 Month</option>
              <option value="P3M">3 Months</option>
              <option value="P6M">6 Months</option>
              <option value="P1Y">1 Year</option>
            </select>
          </FormField>
        </div>
      </div>
    </div>
  );
}

export default PerformanceStep;