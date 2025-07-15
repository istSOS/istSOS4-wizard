import React from "react";
import { useWizard } from "../../hooks/useWizard";
import FormField from "../common/FormField";
import Toggle from "../common/Toggle";

function PerformanceStep() {
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Performance & Advanced Settings
      </h2>
      <p className="text-gray-600">
        Configure performance optimization and advanced database settings
      </p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start">
          <div className="flex-1">
            <Toggle
              checked={configuration.redis === 1}
              onChange={(e) => updateConfig("redis", e.target.checked ? 1 : 0)}
              label="Enable Redis Caching"
            />
            <p className="text-sm text-gray-600 mt-2 ml-7">
              Redis improves performance by caching frequently accessed data and
              API responses
            </p>

            {configuration.redis === 1 && (
              <div className="ml-7 mt-3 space-y-2">
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Ensure Redis is included in your
                    Docker Compose configuration
                  </p>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Default connection: redis://redis:6379</li>
                  <li>• Recommended memory: 512MB minimum</li>
                  <li>• Cache TTL: 1 hour (configurable)</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <FormField
          label="Count Mode"
        >
          <div className="space-y-3">
            {[
              {
                value: "FULL",
                label: "Full Count",
                desc: "Always count all results (accurate but slow for large datasets)",
                recommended: configuration.countEstimateThreshold < 10000,
              },
              {
                value: "LIMIT_ESTIMATE",
                label: "Limit + Estimate",
                desc: "Count up to threshold, then estimate (balanced approach)",
                recommended:
                  configuration.countEstimateThreshold >= 10000 &&
                  configuration.countEstimateThreshold <= 50000,
              },
              {
                value: "ESTIMATE_LIMIT",
                label: "Estimate + Limit",
                desc: "Estimate first, count if below threshold (fast but less accurate)",
                recommended: configuration.countEstimateThreshold > 50000,
              },
            ].map((mode) => (
              <label
                key={mode.value}
                className="flex items-start space-x-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="countMode"
                  value={mode.value}
                  checked={configuration.countMode === mode.value}
                  onChange={(e) => updateConfig("countMode", e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{mode.label}</span>
                    {mode.recommended && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{mode.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Count Estimate Threshold"
            error={validation.errors.countEstimateThreshold}
            fieldName="countEstimateThreshold"
          >
            <input
              type="number"
              min="1000"
              max="100000"
              step="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={configuration.countEstimateThreshold}
              onChange={(e) => {
                const value = e.target.value;
                updateConfig(
                  "countEstimateThreshold",
                  value === "" ? "" : parseInt(value)
                );
              }}
              onBlur={() => {
                handleBlur("countEstimateThreshold");
                if (configuration.countEstimateThreshold === "") {
                  updateConfig("countEstimateThreshold", 10000);
                }
              }}
            />
          </FormField>

          <FormField
            label="Default Result Limit"
            error={validation.errors.topValue}
            fieldName="topValue"
          >
            <input
              type="number"
              min="10"
              max="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={configuration.topValue}
              onChange={(e) => {
                const value = e.target.value;
                updateConfig("topValue", value === "" ? "" : parseInt(value));
              }}
              onBlur={() => {
                handleBlur("topValue");
                if (configuration.topValue === "") {
                  updateConfig("topValue", 100);
                }
              }}
            />
          </FormField>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-semibold text-amber-900 mb-2">
            Performance Tips
          </h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• For datasets under 10K records, use Full Count mode</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PerformanceStep;
