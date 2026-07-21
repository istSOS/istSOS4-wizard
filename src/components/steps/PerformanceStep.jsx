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
      <div className="bg-gray-50 p-4 rounded-xl">
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
      
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Configuration Values Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Query Configuration
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Set the fundamental parameters that will influence your count mode
            recommendations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Count Estimation Threshold"
              error={validation.errors.countEstimateThreshold}
              fieldName="countEstimateThreshold"
            >
              <div className="space-y-2">
                <input
                  type="number"
                  min="1000"
                  max="100000"
                  step="1000"
                  placeholder="10000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                <p className="text-xs text-gray-500">
                  The threshold at which counting switches to estimation (1,000
                  - 100,000 records)
                </p>
              </div>
            </FormField>

            <FormField
              label="Maximum Results Per Query"
              error={validation.errors.topValue}
              fieldName="topValue"
            >
              <div className="space-y-2">
                <input
                  type="number"
                  min="10"
                  max="1000"
                  placeholder="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={configuration.topValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateConfig(
                      "topValue",
                      value === "" ? "" : parseInt(value)
                    );
                  }}
                  onBlur={() => {
                    handleBlur("topValue");
                    if (configuration.topValue === "") {
                      updateConfig("topValue", 100);
                    }
                  }}
                />
                <p className="text-xs text-gray-500">
                  Default limit for query results when no limit is specified (10
                  - 1,000 records)
                </p>
              </div>
            </FormField>
          </div>
        </div>

        {/* Count Mode Selection */}
        <div className="bg-white border border-gray-200 rounded-xl mb-6 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Count Mode Strategy
          </h3>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-blue-600 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-900">
                  How Count Mode Works
                </h4>
                <p className="text-sm text-blue-800 mt-1">
                  When querying data, the total record count is returned in the
                  response. For large datasets, this can be time-expensive.
                  Choose the strategy that best balances accuracy and
                  performance for your use case.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                value: "FULL",
                label: "Full Count",
                shortTitle: "Maximum Accuracy",
                description:
                  "Fully count all entities. Always gives accurate results but can be very slow on large result sets.",
              
                bestFor: "Small to medium datasets",
                color: "green",
              },
              {
                value: "LIMIT_ESTIMATE",
                label: "Limit + Estimate",
                shortTitle: "Balanced Approach",
                description:
                  "Count up to the threshold, then estimate using database statistics. Guarantees accuracy for small results but may be inaccurate for large unindexed datasets.",
                bestFor: "Medium datasets",
                color: "blue",
              },
              {
                value: "ESTIMATE_LIMIT",
                label: "Estimate + Limit",
                shortTitle: "Maximum Performance",
                description:
                  "Estimate first using database statistics, then count if below threshold. Fastest method but may give incorrect estimates for low counts if database statistics are inaccurate.",
                bestFor: "Large datasets",
                color: "purple",
              },
            ].map((mode) => {
              const isSelected = configuration.countMode === mode.value;
              const colorClasses = {
                green: isSelected
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300",
                blue: isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300",
                purple: isSelected
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300",
              };

              return (
                <div
                  key={mode.value}
                  className={`border-2 rounded-xl p-3 cursor-pointer transition-all duration-200 ${
                    colorClasses[mode.color]
                  }`}
                  onClick={() => updateConfig("countMode", mode.value)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <input
                        type="radio"
                        name="countMode"
                        value={mode.value}
                        checked={isSelected}
                        onChange={(e) =>
                          updateConfig("countMode", e.target.value)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {mode.label}
                          </h4>
                          <p className="text-sm font-medium text-gray-600">
                            {mode.shortTitle}
                          </p>
                        </div>
                   
                      </div>

                      <p className="text-sm text-gray-700 mb-4">
                        {mode.description}
                      </p>

                      <div className="text-sm">
                        <span className="font-medium text-gray-900">
                          Best for: <span className="text-gray-500">{mode.bestFor}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Default Setting:</strong> FULL mode provides maximum
              accuracy at the cost of performance on large datasets.
            </p>
          </div>
        </div>


      </div>
    </div>
  );
}

export default PerformanceStep;
