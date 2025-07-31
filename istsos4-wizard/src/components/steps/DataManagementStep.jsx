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
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Data Management Configuration
        </h2>
        <p className="text-gray-600 mt-2">
          Configure how your istSOS4 instance handles data versioning and
          duplicate entries. These settings are permanent and cannot be changed
          after setup.
        </p>
      </div>

      {/* Data Versioning Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Data Versioning
            </h3>
            <p className="text-gray-600 text-sm">
              Keep historical versions of all data changes for complete audit
              trails and data recovery.
            </p>
          </div>
          <div className="ml-6">
            <Toggle
              checked={configuration.versioning === 1}
              onChange={(e) =>
                updateConfig("versioning", e.target.checked ? 1 : 0)
              }
              label=""
            />
          </div>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowVersioningInfo(!showVersioningInfo)}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
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
            {showVersioningInfo ? "Hide Details" : "Show Details"}
          </button>

          {showVersioningInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-3">Benefits</h4>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Complete audit trail for all data modifications
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Ability to restore corrupted or incorrect data
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Meets compliance requirements for scientific data
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-3">
                    Considerations
                  </h4>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Increases storage requirements significantly
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Cannot be changed after initial setup
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Duplicate Entries Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Duplicate Entries
            </h3>
            <p className="text-gray-600 text-sm">
              Allow multiple identical observations at the same timestamp for
              sensor redundancy and quality control.
            </p>
          </div>
          <div className="ml-6">
            <Toggle
              checked={configuration.duplicates === 1}
              onChange={(e) =>
                updateConfig("duplicates", e.target.checked ? 1 : 0)
              }
              label=""
            />
          </div>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowDuplicatesInfo(!showDuplicatesInfo)}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
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
            {showDuplicatesInfo ? "Hide Details" : "Show Details"}
          </button>

          {showDuplicatesInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-3">
                    Use Cases
                  </h4>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Multiple sensors measuring the same phenomena
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Backup sensors for data redundancy
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Quality control through sensor comparison
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-3">
                    Considerations
                  </h4>
                  <ul className="space-y-2 text-green-800">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      May increase storage requirements
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Can complicate data analysis workflows
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Cannot be changed after initial setup
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="ml-2">
            <h3 className="font-semibold text-amber-900 text-base mb-2">
              ⚠️ Permanent Configuration Settings
            </h3>
            <p className="text-amber-800 text-sm">
              The data management settings above are <strong>permanent</strong>{" "}
              and cannot be modified after setup completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataManagementStep;
