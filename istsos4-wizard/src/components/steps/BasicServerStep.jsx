import React from 'react';
import { useWizard } from '../../hooks/useWizard';
import FormField from '../common/FormField';
import Toggle from '../common/Toggle';

function BasicServerStep() {
  const { state, dispatch } = useWizard();
  const { configuration, validation } = state;

  const updateConfig = (field, value) => {
    dispatch({
      type: 'UPDATE_CONFIG',
      payload: { [field]: value }
    });
  };

  const handleBlur = (field) => {
    dispatch({ type: 'SET_FIELD_TOUCHED', payload: field });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Basic Server Configuration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField 
          label="Hostname" 
          error={validation.errors.hostname}
          fieldName="hostname"
          required
        >
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.hostname}
            onChange={(e) => updateConfig('hostname', e.target.value)}
            onBlur={() => handleBlur('hostname')}
            placeholder="http://localhost:8018"
          />
        </FormField>

        <FormField 
          label="Subpath" 
          error={validation.errors.subpath}
          fieldName="subpath"
          required
        >
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.subpath}
            onChange={(e) => updateConfig('subpath', e.target.value)}
            onBlur={() => handleBlur('subpath')}
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
          <div>
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
          </div>
        </FormField>
      </div>

      {/* Validation Summary */}
      {Object.keys(validation.errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
          <h3 className="text-sm font-semibold text-red-900 mb-2">
            Please correct the following errors:
          </h3>
          <ul className="text-sm text-red-700 space-y-1">
            {Object.entries(validation.errors).map(([field, error]) => 
              validation.touched[field] ? (
                <li key={field}>• {error}</li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BasicServerStep;