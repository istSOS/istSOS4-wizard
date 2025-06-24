
import React from 'react';
import { useWizard } from '../../hooks/useWizard';
import FormField from '../common/FormField';
import Toggle from '../common/Toggle';

function BasicServerStep() {
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
      <h2 className="text-2xl font-bold text-gray-900">Basic Server Configuration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField 
          label="Hostname" 
          info="The server URL where istSOS4 will be accessible"
        >
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.hostname}
            onChange={(e) => updateConfig('hostname', e.target.value)}
            placeholder="http://localhost:8018"
          />
        </FormField>

        <FormField 
          label="Subpath" 
          info="API endpoint subpath"
        >
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.subpath}
            onChange={(e) => updateConfig('subpath', e.target.value)}
            placeholder="/istsos4"
          />
        </FormField>

        <FormField label="API Version">
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.version}
            onChange={(e) => updateConfig('version', e.target.value)}
          >
            <option value="/v1.0">/v1.0</option>
            <option value="/v1.1">/v1.1</option>
          </select>
        </FormField>

        <FormField label="Debug Mode">
          <Toggle
            checked={configuration.debug === 1}
            onChange={(e) => updateConfig('debug', e.target.checked ? 1 : 0)}
            label={configuration.debug === 1 ? 'Enabled' : 'Disabled'}
          />
          {configuration.debug === 1 && (
            <p className="text-amber-600 text-sm mt-1">
              ⚠ Debug mode should be disabled in production
            </p>
          )}
        </FormField>
      </div>
    </div>
  );
}

export default BasicServerStep;