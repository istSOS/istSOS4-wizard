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
      <h2 className="text-2xl font-bold text-gray-900">Additional Services</h2>
      <p className="text-gray-600">
        Configure optional services and coordinate systems
      </p>

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

        {/* Common EPSG codes hints */}
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
          <strong>Common EPSG Codes:</strong>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <p className="font-medium text-gray-700">Global:</p>
              <ul className="ml-2 space-y-1">
                <li>
                  • <strong>4326</strong> - WGS 84 (GPS coordinates)
                </li>
                <li>
                  • <strong>3857</strong> - Web Mercator (Google Maps)
                </li>
                <li>
                  • <strong>4269</strong> - NAD83 (North America)
                </li>
                <li>
                  • <strong>4258</strong> - ETRS89 (Europe)
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700">Regional:</p>
              <ul className="ml-2 space-y-1">
                <li>
                  • <strong>2154</strong> - Lambert-93 (France)
                </li>
                <li>
                  • <strong>27700</strong> - British National Grid (UK)
                </li>
                <li>
                  • <strong>32633</strong> - UTM Zone 33N (Europe)
                </li>
                <li>
                  • <strong>3035</strong> - ETRS89 LAEA (Europe)
                </li>
              </ul>
            </div>
          </div>
        </div>

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

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">
            Service Architecture
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            {/* <div className="flex items-center">
              <div
                className={`w-4 h-4 rounded-full mr-3 ${
                  configuration.redis === 1 ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <span>
                Redis Cache{" "}
                {configuration.redis === 1 ? "(Enabled)" : "(Disabled)"}
              </span>
            </div> */}
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
              <span>PostgreSQL Database (Required)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
              <span>istSOS4 API Server (Required)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesStep;
