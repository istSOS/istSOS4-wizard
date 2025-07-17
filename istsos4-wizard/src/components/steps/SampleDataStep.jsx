import React, { useState } from "react";
import { useWizard } from "../../hooks/useWizard";
import FormField from "../common/FormField";

function SampleDataStep() {
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

  const getDateTimeValue = () => {
    if (!configuration.startDatetime) return "";

    try {
      if (configuration.startDatetime.includes("T")) {
        return configuration.startDatetime.slice(0, 19);
      }
      const date = new Date(configuration.startDatetime);
      if (!isNaN(date.getTime())) {
        return date.toISOString().slice(0, 19);
      }
    } catch (error) {
      console.warn("Invalid datetime format:", configuration.startDatetime);
    }

    return "";
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

  if (configuration.dummyData === 0) {
    return (
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-400 rounded"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Sample Data Configuration
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Sample data generation is disabled. Enable "Generate dummy data" in
          the Data Management step to configure these options.
        </p>
        <button
          onClick={() => dispatch({ type: "SET_STEP", payload: 5 })}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Go back to Data Management
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Sample Data Configuration
      </h2>
      <p className="text-gray-600">
        Configure the parameters for generating test data
      </p>

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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.nThings}
            onChange={(e) => {
              const value = e.target.value;
              updateConfig("nThings", value === "" ? "" : parseInt(value));
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
        >
          <input
            type="datetime-local"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={getDateTimeValue()}
            onChange={(e) => {
              const rawValue = e.target.value;

              let formattedValue = "";
              if (rawValue) {
                if (rawValue.length === 16) {
                  formattedValue = rawValue + ":00.000+01:00";
                } else if (rawValue.length === 19) {
                  formattedValue = rawValue + ".000+01:00";
                } else {
                  formattedValue = rawValue;
                }
              }

              updateConfig("startDatetime", formattedValue);
            }}
            onBlur={() => handleBlur("startDatetime")}
            step="1"
          />
        </FormField>

        <FormField
          label="Data Generation Period"
        >
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
        
        <FormField
          label="Sampling Frequency"
        >
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
    <div className="border-t border-b pt-4 pb-4">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? "Hide" : "Show"} Advanced Settings
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 mb-2 gap-6 mt-4">
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
        </FormField>

        <FormField label="Chunk Interval" >
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.chunkInterval}
            onChange={(e) => updateConfig("chunkInterval", e.target.value)}
          >
            <option value="P1M">1 Month</option>
            <option value="P3M">3 Months</option>
            <option value="P6M">6 Months</option>
            <option value="P1Y">1 Year</option>
          </select>
        </FormField>

          </div>
        )}
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Data Generation Summary
        </h3>
        <div className="text-blue-800 space-y-1">
          <p>
            <span className="font-medium">Total sensors:</span>{" "}
            {configuration.nThings}
          </p>
          <p>
            <span className="font-medium">Properties per sensor:</span>{" "}
            {configuration.nObservedProperties}
          </p>
          <p>
            <span className="font-medium">Estimated data points:</span>{" "}
            {calculateDataPoints().toLocaleString()}
          </p>
        </div>
        {calculateDataPoints() > 1000000 && (
          <p className="text-amber-700 text-sm mt-2">
            ⚠ Large dataset: Generation may take several minutes
          </p>
        )}
      </div>
      
  
    </div>
  );
}

export default SampleDataStep;
