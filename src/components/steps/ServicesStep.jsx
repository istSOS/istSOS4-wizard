import React from "react";
import { useWizard } from "../../hooks/useWizard";
import FormField from "../common/FormField";

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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Coordinate System Configuration
        </h2>
        <p className="text-gray-600 mt-2">
          Configure the coordinate reference system for your istSOS4 instance to
          ensure accurate spatial data handling.
        </p>
      </div>

      {/* Important Note */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3 shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="w-6 h-6 text-blue-600 mt-0.5"
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
          <div className="ml-2 flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-1">
              Coordinate System Overview
            </h3>
            <p className="text-blue-800">
              istSOS4 uses the WGS84 coordinate system (EPSG:4326) by default,
              which is the standard for GPS and web mapping. However, you can
              configure a different coordinate reference system to match your
              specific geographic area and data requirements.
            </p>
          </div>
        </div>
      </div>

      {/* EPSG Configuration Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          EPSG Code Configuration
        </h3>

        <FormField
          label="Coordinate Reference System (EPSG)"
          error={validation.errors.epsg}
          fieldName="epsg"
        >
          <div className="space-y-4">
            <div className="relative">
              <input
                type="number"
                placeholder="Enter EPSG code (e.g., 4326)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={configuration.epsg || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  updateConfig("epsg", value === "" ? "" : parseInt(value));
                }}
                onBlur={() => handleBlur("epsg")}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">EPSG</span>
              </div>
            </div>

            {/* EPSG code validation */}
            {configuration.epsg && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Selected EPSG Code: {configuration.epsg}
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Please verify this code is valid for your geographic area
                      and data requirements.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FormField>
      </div>

      {/* Common EPSG Codes */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Popular EPSG Codes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              code: 4326,
              name: "WGS 84",
              description: "Global GPS standard, latitude/longitude",
              color: "blue",
            },
            {
              code: 3857,
              name: "Web Mercator",
              description: "Web mapping (Google Maps, OpenStreetMap)",
              color: "green",
            },
          ].map((epsg) => (
            <div
              key={epsg.code}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                configuration.epsg === epsg.code
                  ? `border-${epsg.color}-500 bg-${epsg.color}-50`
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => updateConfig("epsg", epsg.code)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">
                  EPSG:{epsg.code}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    epsg.color === "blue"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {epsg.name}
                </span>
              </div>
              <p className="text-sm text-gray-600">{epsg.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to find EPSG codes */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-yellow-600 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">
              Finding the Right EPSG Code
            </h3>
            <div className="text-sm">
              <h4 className="font-medium text-yellow-800 mb-3">
                Online Resources:
              </h4>
              <ul className="space-y-3 text-yellow-700">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-0.5">•</span>
                  <span>
                    <a
                      href="https://epsg.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      epsg.io
                    </a>{" "}
                    - Search by location or coordinate system name
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-0.5">•</span>
                  <span>
                    <a
                      href="https://spatialreference.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      spatialreference.org
                    </a>{" "}
                    - Detailed coordinate system information
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesStep;
