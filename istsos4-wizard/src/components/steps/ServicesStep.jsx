import React from "react";
import { useWizard } from "../../hooks/useWizard";
import FormField from "../common/FormField";
import Toggle from "../common/Toggle";

function ServicesStep() {
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
      <h2 className="text-2xl font-bold text-gray-900">Coordinate System</h2>

      {/* Important Note */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">
              Important Note
            </p>
            <p className="text-sm text-blue-800">
              Please note that the standard use WGS84 coordinate system by
              default, nevertheless istSOS4 allows you to configure your desired
              coordinate system to fit your specific needs.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <FormField
          label="Coordinate Reference System (EPSG)"
          error={validation.errors.epsg}
          fieldName="epsg"
        >
          <div className="space-y-3">
            {/* EPSG Input */}
            <div className="relative">
              <input
                type="number"
                placeholder="Enter EPSG code (e.g., 4326)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={configuration.epsg || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  updateConfig("epsg", value === "" ? "" : parseInt(value));
                }}
                onBlur={() => handleBlur("epsg")}
              />
            </div>
          </div>
        </FormField>

        {/* EPSG code validation */}
        {configuration.epsg && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-blue-800">
              <strong>Selected EPSG Code:</strong> {configuration.epsg}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Make sure this code is valid for your geographic area and data
              requirements.
            </p>
          </div>
        )}

        {/* How to find EPSG codes */}
        <div className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded p-3">
          <strong>How to find your EPSG code:</strong>
          <ul className="mt-1 space-y-1">
            <li>
              • Visit{" "}
              <a
                href="https://epsg.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                epsg.io
              </a>{" "}
              to search by location or name
            </li>
            <li>
              • Use{" "}
              <a
                href="https://spatialreference.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                spatialreference.org
              </a>{" "}
              for detailed information
            </li>
            <li>• Check your existing GIS data properties</li>
            <li>
              • For GPS data, use <strong>4326</strong> (WGS 84)
            </li>
            <li>
              • For web mapping, use <strong>3857</strong> (Web Mercator)
            </li>
          </ul>
        </div>

        {/* <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">
            Service Architecture
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
              <span>PostgreSQL Database </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
              <span>istSOS4 API Server </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ServicesStep;
