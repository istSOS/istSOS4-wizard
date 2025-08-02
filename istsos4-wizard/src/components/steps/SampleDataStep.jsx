import React, { useState } from "react";
import { useWizard } from "../../hooks/useWizard";
import FormField from "../common/FormField";
import Toggle from "../common/Toggle";

function sampleDataStep() {
  const { state, dispatch } = useWizard();
  const { configuration, validation } = state;
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateConfig = (field, value) => {
    dispatch({
      type: "UPDATE_CONFIG",
      payload: { [field]: value },
    });
  };

  const handleBlur = (field) => {
    dispatch({ type: "SET_FIELD_TOUCHED", payload: field });
  };

  const calculateDataPoints = () => {
    const intervalDays = {
      P1D: 1,
      P1W: 7,
      P1M: 30,
      P1Y: 365,
    };

    const frequencyMinutes = {
      PT1M: 1,
      PT5M: 5,
      PT15M: 15,
      PT1H: 60,
    };

    const days = intervalDays[configuration.interval] || 365;
    const samplesPerDay =
      (24 * 60) / (frequencyMinutes[configuration.frequency] || 5);

    return Math.round(
      configuration.nThings *
        configuration.nObservedProperties *
        days *
        samplesPerDay
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Sample Data Configuration
        </h2>
        <p className="text-gray-600 mt-2">
          Configure data initialization and test data generation options for
          your istSOS4 instance.
        </p>
      </div>

      {/* Data Initialization Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Data Initialization
        </h3>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-900">
                  Generate Test Data
                </label>
                <p className="text-sm text-gray-600">
                  Automatically populate the database with sample sensor data
                  for testing
                </p>
              </div>
              <div className="ml-6">
                <Toggle
                  checked={configuration.dummyData === 1}
                  onChange={(e) => {
                    const isEnabled = e.target.checked;
                    updateConfig("dummyData", isEnabled ? 1 : 0);
                    if (!isEnabled) {
                      updateConfig("clearData", 0);
                    }
                  }}
                  label=""
                />
              </div>
            </div>
          </div>

          {configuration.dummyData === 1 && (
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-900">
                      Clear Existing Data
                    </label>
                    <p className="text-sm text-gray-600">
                      Remove all existing data before generating new test data
                    </p>
                  </div>
                  <div className="ml-6">
                    <Toggle
                      checked={configuration.clearData === 1}
                      onChange={(e) =>
                        updateConfig("clearData", e.target.checked ? 1 : 0)
                      }
                      label=""
                    />
                  </div>
                </div>

                {configuration.clearData === 1 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start">
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-amber-900">
                          ⚠️ Data Loss Warning
                        </h4>
                        <p className="text-sm text-amber-800 mt-1">
                          This will permanently delete all existing data! Make
                          sure you have backups before enabling this option.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {configuration.dummyData === 1 && (
        <>
          {/* Test Data Parameters Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Test Data Generation Parameters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Number of Things (Sensors)"
                error={validation.errors.nThings}
                fieldName="nThings"
              >
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={configuration.nThings}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateConfig(
                      "nThings",
                      value === "" ? "" : parseInt(value)
                    );
                  }}
                  onBlur={() => handleBlur("nThings")}
                />
              </FormField>

              <FormField
                label="Observed Properties per Thing"
                error={validation.errors.nObservedProperties}
                fieldName="nObservedProperties"
              >
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={configuration.nObservedProperties}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateConfig(
                      "nObservedProperties",
                      value === "" ? "" : parseInt(value)
                    );
                  }}
                  onBlur={() => handleBlur("nObservedProperties")}
                />
              </FormField>

              <FormField
                label="Start Date/Time"
                error={validation.errors.baseDatetime}
                fieldName={"baseDatetime"}
              >
                <div className="space-y-3">
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={configuration.baseDatetime || ""}
                    onChange={(e) => {
                      updateConfig("baseDatetime", e.target.value);
                    }}
                    onBlur={() => handleBlur("baseDatetime")}
                    step="1"
                  />

                  {/* Milliseconds Input */}
                  <FormField
                    label="Milliseconds"
                    error={validation.errors.milliseconds}
                    fieldName="milliseconds"
                  >
                    <input
                      type="text"
                      placeholder="000"
                      maxLength="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={configuration.milliseconds || ""}
                      onChange={(e) => {
                        updateConfig("milliseconds", e.target.value);
                      }}
                      onBlur={() => {
                        handleBlur("milliseconds");
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter milliseconds (000-999)
                    </p>
                  </FormField>

                  <FormField
                    label="Timezone Offset"
                    error={validation.errors.timezoneOffset}
                    fieldName="timezoneOffset"
                  >
                    <input
                      type="text"
                      placeholder="+01:00"
                      maxLength="6"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={configuration.timezoneOffset || ""}
                      onChange={(e) => {
                        updateConfig("timezoneOffset", e.target.value);
                      }}
                      onBlur={() => {
                        handleBlur("timezoneOffset");
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter timezone offset (e.g., +00:00, +05:30, -08:00)
                    </p>
                  </FormField>

                  {/* Preview of formatted datetime */}
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-2">
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Final format:</span>{" "}
                      {configuration.baseDatetime
                        ? configuration.baseDatetime +
                          "." +
                          (configuration.milliseconds || "000").padStart(
                            3,
                            "0"
                          ) +
                          (configuration.timezoneOffset || "+01:00")
                        : "Select date and time above"}
                    </p>
                  </div>
                </div>
              </FormField>

              <div className="space-y-6">
                <FormField label="Data Generation Period">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={configuration.interval}
                    onChange={(e) => updateConfig("interval", e.target.value)}
                  >
                    <option value="P1D">1 Day</option>
                    <option value="P1W">1 Week</option>
                    <option value="P1M">1 Month</option>
                    <option value="P1Y">1 Year</option>
                  </select>
                </FormField>

                <FormField label="Sampling Frequency" fieldName="frequency">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={configuration.frequency}
                    onChange={(e) => updateConfig("frequency", e.target.value)}
                  >
                    <option value="PT1M">Every minute</option>
                    <option value="PT5M">Every 5 minutes</option>
                    <option value="PT15M">Every 15 minutes</option>
                    <option value="PT1H">Every hour</option>
                  </select>
                </FormField>
              </div>
            </div>
          </div>

          {/* Advanced Settings Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Advanced Data Settings
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Configure partition settings for large datasets
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  <svg
                    className={`w-4 h-4 mr-1 transition-transform ${
                      showAdvanced ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  {showAdvanced ? "Hide Settings" : "Show Settings"}
                </button>
              </div>

              {showAdvanced && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Partition Chunk Size"
                      error={validation.errors.partitionChunk}
                      fieldName="partitionChunk"
                    >
                      <input
                        type="number"
                        min="1000"
                        max="50000"
                        step="1000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={configuration.partitionChunk}
                        onChange={(e) => {
                          const value = e.target.value;
                          updateConfig(
                            "partitionChunk",
                            value === "" ? "" : parseInt(value)
                          );
                        }}
                        onBlur={() => {
                          handleBlur("partitionChunk");
                          if (configuration.partitionChunk === "") {
                            updateConfig("partitionChunk", 10000);
                          }
                        }}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Number of records per partition chunk (1,000 - 50,000)
                      </p>
                    </FormField>

                    <FormField label="Chunk Interval">
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={configuration.chunkInterval}
                        onChange={(e) =>
                          updateConfig("chunkInterval", e.target.value)
                        }
                      >
                        <option value="P1M">1 Month</option>
                        <option value="P3M">3 Months</option>
                        <option value="P6M">6 Months</option>
                        <option value="P1Y">1 Year</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Time interval for data partitioning
                      </p>
                    </FormField>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Data Summary Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Data Generation Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">
                  {configuration.nThings || 0}
                </div>
                <div className="text-sm">Total Sensors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">
                  {configuration.nObservedProperties || 0}
                </div>
                <div className="text-sm">Properties per Sensor</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">
                  {calculateDataPoints().toLocaleString()}
                </div>
                <div className="text-sm">Estimated Data Points</div>
                {calculateDataPoints() > 1000000 && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Large Dataset
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default sampleDataStep;
