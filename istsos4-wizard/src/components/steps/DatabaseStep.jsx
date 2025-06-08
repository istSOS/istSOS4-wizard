import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useWizard } from '../../hooks/useWizard';
import FormField from '../common/FormField';

function DatabaseStep() {
  const { state, dispatch } = useWizard();
  const { configuration } = state;
  const [showPassword, setShowPassword] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateConfig = (field, value) => {
    dispatch({
      type: 'UPDATE_CONFIG',
      payload: { [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Database Configuration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Database Name">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.postgresDb}
            onChange={(e) => updateConfig('postgresDb', e.target.value)}
          />
        </FormField>

        <FormField label="Username">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.postgresUser}
            onChange={(e) => updateConfig('postgresUser', e.target.value)}
          />
        </FormField>

        <FormField label="Password">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={configuration.postgresPassword}
              onChange={(e) => updateConfig('postgresPassword', e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </FormField>
      </div>

      <div className="border-t pt-6">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <FormField label="Pool Size" info="Maximum database connections">
              <input
                type="number"
                min="1"
                max="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={configuration.pgPoolSize}
                onChange={(e) => updateConfig('pgPoolSize', parseInt(e.target.value))}
              />
            </FormField>

            <FormField label="Max Overflow">
              <input
                type="number"
                min="0"
                max="20"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={configuration.pgMaxOverflow}
                onChange={(e) => updateConfig('pgMaxOverflow', parseInt(e.target.value))}
              />
            </FormField>

            <FormField label="Pool Timeout (seconds)">
              <input
                type="number"
                min="10"
                max="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={configuration.pgPoolTimeout}
                onChange={(e) => updateConfig('pgPoolTimeout', parseInt(e.target.value))}
              />
            </FormField>
          </div>
        )}
      </div>
    </div>
  );
}

export default DatabaseStep;