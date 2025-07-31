import React from "react";
import { useWizard } from "../../hooks/useWizard";
import FormField from "../common/FormField";
import Toggle from "../common/Toggle";

function BasicServerStep() {
  const { state, dispatch } = useWizard();
  const { configuration, validation } = state;

  const updateConfig = (field, value) => {
    dispatch({
      type: "UPDATE_CONFIG",
      payload: { [field]: value },
    });
  };

  const handleBlur = (field) => {
    dispatch({ type: "SET_FIELD_TOUCHED", payload: field });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Basic Server Configuration
        </h2>
        <p className="text-gray-600 mt-2">
          Configure the basic server settings for your istSOS4 instance.
        </p>
      </div>

      {/* Server Configuration Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Server Settings
        </h3>

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
              onChange={(e) => updateConfig("hostname", e.target.value)}
              onBlur={() => handleBlur("hostname")}
              placeholder="http://localhost"
            />
            <p className="text-xs text-gray-500 mt-1">
              The hostname where istSOS4 will be accessible
            </p>
          </FormField>

          <FormField
            label="External Port"
            error={validation.errors.externalPort}
            fieldName="externalPort"
            required
          >
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={configuration.externalPort}
              onChange={(e) => updateConfig("externalPort", e.target.value)}
              onBlur={() => handleBlur("externalPort")}
              placeholder="8018"
            />
            <p className="text-xs text-gray-500 mt-1">
              Port number on which the server will be accessible (1024-49151)
            </p>
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
              onChange={(e) => updateConfig("subpath", e.target.value)}
              onBlur={() => handleBlur("subpath")}
              placeholder="/istsos4"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL path where the API will be available
            </p>
          </FormField>

          <FormField label="API Version">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={configuration.version}
              onChange={(e) => updateConfig("version", e.target.value)}
            >
              <option value="/v1.0">/v1.0</option>
              <option value="/v1.1">/v1.1</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              API version to use for the server
            </p>
          </FormField>
        </div>
      </div>

      {/* Development Settings Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Development Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-900">
                Debug Mode
              </label>
              <p className="text-sm text-gray-600">
                Enable detailed logging and error messages for development
              </p>
            </div>
            <div className="ml-6">
              <Toggle
                checked={configuration.debug === 1}
                onChange={(e) =>
                  updateConfig("debug", e.target.checked ? 1 : 0)
                }
                label=""
              />
            </div>
          </div>

          {configuration.debug === 1 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
              <div className="flex items-start">
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-amber-900">
                    ⚠️ Development Mode Warning
                  </h4>
                  <p className="text-sm text-amber-800 mt-1">
                    Debug mode should be disabled in production environments for
                    security and performance reasons.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Server URL Preview Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Server URL Preview
        </h3>
        <div className="bg-white border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">
            Your istSOS4 server will be available at:
          </div>
          <div className="text-lg font-mono text-blue-900 break-all">
            {configuration.hostname}
            {configuration.externalPort && `:${configuration.externalPort}`}
            {configuration.subpath}
            {configuration.version}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicServerStep;
