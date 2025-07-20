import React, { useState } from "react";
import { useWizard } from "../../hooks/useWizard";
import Toggle from "../common/Toggle";

function DataManagementStep() {
  const { state, dispatch } = useWizard();
  const { configuration } = state;
  const [showVersioningInfo, setShowVersioningInfo] = useState(false);
  const [showDuplicatesInfo, setShowDuplicatesInfo] = useState(false);

  const updateConfig = (field, value) => {
    dispatch({
      type: "UPDATE_CONFIG",
      payload: { [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Data Management Configuration
      </h2>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-6 text-lg">
            Data Behavior Settings
          </h3>

          <div className="space-y-8">
            {/* Data Versioning Section */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Toggle
                    checked={configuration.versioning}
                    onChange={(e) =>
                      updateConfig("versioning", e.target.checked ? 1 : 0)
                    }
                    label="Enable data versioning"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Keep historical versions of all data changes
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVersioningInfo(!showVersioningInfo)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-4"
                >
                  {showVersioningInfo ? "Hide Info" : "Learn More"}
                </button>
              </div>

              {showVersioningInfo && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-md">
                  <div className="text-sm space-y-2">
                    <p className="font-medium text-blue-900">Benefits:</p>
                    <ul className="text-blue-800 space-y-1 text-xs pl-4">
                      <li>✓ Complete audit trail for all data modifications</li>
                      <li>✓ Ability to restore corrupted or incorrect data</li>
                      <li>
                        ✓ Meets compliance requirements for scientific data
                      </li>
                    </ul>
                    <p className="font-medium text-blue-900 mt-3">
                      Considerations:
                    </p>
                    <ul className="text-blue-800 space-y-1 text-xs pl-4">
                      <li>• Increases storage requirements significantly</li>
                      <li>• Cannot be changed after initial setup</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* {configuration.versioning === 1 && (
                
              )} */}
            </div>

            {/* Duplicate Entries Section */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Toggle
                    checked={configuration.duplicates}
                    onChange={(e) =>
                      updateConfig("duplicates", e.target.checked ? 1 : 0)
                    }
                    label="Allow duplicate entries"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Permit multiple identical observations at the same timestamp
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDuplicatesInfo(!showDuplicatesInfo)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-4"
                >
                  {showDuplicatesInfo ? "Hide Info" : "Learn More"}
                </button>
              </div>

              {showDuplicatesInfo && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-md">
                  <div className="text-sm space-y-2">
                    <p className="font-medium text-green-900">Use Cases:</p>
                    <ul className="text-green-800 space-y-1 text-xs pl-4">
                      <li>✓ Multiple sensors measuring the same phenomena</li>
                      <li>✓ Backup sensors for data redundancy</li>
                      <li>✓ Quality control through sensor comparison</li>
                    </ul>
                    <p className="font-medium text-green-900 mt-3">
                      Considerations:
                    </p>
                    <ul className="text-green-800 space-y-1 text-xs pl-4">
                      <li>• May increase storage requirements</li>
                      <li>• Can complicate data analysis workflows</li>
                      <li>• Cannot be changed after initial setup</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
          <p className="text-amber-800 text-sm font-medium flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Permanent Settings
          </p>
          <p className="text-amber-700 text-xs mt-1">
            These setting cannot be modified after setup completion.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DataManagementStep;
