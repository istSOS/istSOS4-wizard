import React, { useState } from "react";
import { useWizard } from "../../hooks/useWizard";
import FormField from "../common/FormField";

function DatabaseStep() {
  const { state, dispatch } = useWizard();
  const { configuration, validation } = state;
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPortTooltip, setShowPortTooltip] = useState(false);

  const updateConfig = (field, value) => {
    dispatch({
      type: "UPDATE_CONFIG",
      payload: { [field]: value },
    });
  };

  const handleBlur = (field) => {
    dispatch({ type: "SET_FIELD_TOUCHED", payload: field });
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    return { strength, label: labels[strength] };
  };

  const passwordStrength = getPasswordStrength(configuration.postgresPassword);

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Database Configuration
        </h2>
        <p className="text-gray-600 mt-2">
          Configure your PostgreSQL database connection settings. Ensure your
          database is properly set up and accessible.
        </p>
      </div>

      {/* Basic Database Settings Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Database Connection
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Database Host"
            error={validation.errors.postgresHost}
            fieldName="postgresHost"
            required
          >
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={configuration.postgresHost}
              onChange={(e) => updateConfig("postgresHost", e.target.value)}
              onBlur={() => handleBlur("postgresHost")}
              placeholder="database"
            />
            <p className="text-xs text-gray-500 mt-1">
              Hostname of the PostgreSQL database server
            </p>
          </FormField>

          <FormField
            label="External Port"
            error={validation.errors.postgresExternalPort}
            fieldName="postgresExternalPort"
            required
          >
            <div className="relative">
              <input
                type="number"
                min="1024"
                max="65535"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={configuration.postgresExternalPort}
                onChange={(e) => {
                  const value = e.target.value;
                  updateConfig(
                    "postgresExternalPort",
                    value === "" ? "" : parseInt(value)
                  );
                }}
                onBlur={() => handleBlur("postgresExternalPort")}
                onMouseEnter={() => setShowPortTooltip(true)}
                onMouseLeave={() => setShowPortTooltip(false)}
                placeholder="45432"
              />

              {/* Port check tooltip */}
              {showPortTooltip && configuration.postgresExternalPort && (
                <div className="absolute z-50 w-80 p-3 text-xs text-blue-900 bg-blue-100 border border-blue-200 rounded-md shadow-xl bottom-full left-0 mb-2">
                  <div className="mb-2">
                    <strong>
                      Check if port {configuration.postgresExternalPort} is
                      available:
                    </strong>
                  </div>
                  <div className="font-mono space-y-1 bg-blue-50 border border-blue-200 p-2 rounded">
                    <div>
                      <strong>Windows:</strong> netstat -an | findstr ":
                      {configuration.postgresExternalPort}"
                    </div>
                    <div>
                      <strong>Linux/Mac:</strong> netstat -an | grep :
                      {configuration.postgresExternalPort}
                    </div>
                  </div>
                  <div className="mt-2 text-blue-700">
                    No output = port available
                  </div>
                  <div className="absolute w-3 h-3 bg-blue-100 border-r border-b border-blue-200 rotate-45 top-full left-4 -mt-1"></div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              External port for PostgreSQL database (1024-65535)
            </p>
          </FormField>

          <FormField
            label="Database Name"
            error={validation.errors.postgresDb}
            fieldName="postgresDb"
            required
          >
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={configuration.postgresDb || "istsos"}
              onChange={(e) => updateConfig("postgresDb", e.target.value)}
              onBlur={() => handleBlur("postgresDb")}
              placeholder="istsos"
            />
            <p className="text-xs text-gray-500 mt-1">
              Name of the PostgreSQL database for istSOS4
            </p>
          </FormField>

          <FormField
            label="Username"
            error={validation.errors.postgresUser}
            fieldName="postgresUser"
            required
          >
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={configuration.postgresUser || "postgres"}
              onChange={(e) => updateConfig("postgresUser", e.target.value)}
              onBlur={() => handleBlur("postgresUser")}
              placeholder="postgres"
            />
            <p className="text-xs text-gray-500 mt-1">
              PostgreSQL database user with appropriate permissions
            </p>
          </FormField>

          <FormField
            label="Password"
            error={validation.errors.postgresPassword}
            fieldName="postgresPassword"
            required
          >
            <div>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-3 py-2 pr-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={configuration.postgresPassword || ""}
                  onChange={(e) =>
                    updateConfig("postgresPassword", e.target.value)
                  }
                  onBlur={() => handleBlur("postgresPassword")}
                  placeholder="Enter secure password"
                />
              </div>

              {/* Password strength indicator */}
              {configuration.postgresPassword && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Password strength:</span>
                    <span
                      className={`font-medium ${
                        passwordStrength.strength <= 2
                          ? "text-red-600"
                          : passwordStrength.strength === 3
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength.strength <= 2
                          ? "bg-red-500"
                          : passwordStrength.strength === 3
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </FormField>
        </div>
      </div>

      {/* Advanced Settings Card */}
      <div className="bg-white border border-gray-200 rounded-xl mb-7 p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Advanced Connection Settings
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Configure connection pooling and timeout settings for optimal
                performance
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="Pool Size"
                  error={validation.errors.pgPoolSize}
                  fieldName="pgPoolSize"
                >
                  <input
                    type="number"
                    min="1"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={configuration.pgPoolSize}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateConfig(
                        "pgPoolSize",
                        value === "" ? "" : parseInt(value)
                      );
                    }}
                    onBlur={() => handleBlur("pgPoolSize")}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Number of connections in the pool (1-50)
                  </p>
                </FormField>

                <FormField
                  label="Max Overflow"
                  error={validation.errors.pgMaxOverflow}
                  fieldName="pgMaxOverflow"
                >
                  <input
                    type="number"
                    min="0"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={configuration.pgMaxOverflow}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateConfig(
                        "pgMaxOverflow",
                        value === "" ? "" : parseInt(value)
                      );
                    }}
                    onBlur={() => handleBlur("pgMaxOverflow")}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Additional connections pool size (0-20)
                  </p>
                </FormField>

                <FormField
                  label="Pool Timeout (seconds)"
                  error={validation.errors.pgPoolTimeout}
                  fieldName="pgPoolTimeout"
                >
                  <input
                    type="number"
                    min="10"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={configuration.pgPoolTimeout}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateConfig(
                        "pgPoolTimeout",
                        value === "" ? "" : parseInt(value)
                      );
                    }}
                    onBlur={() => handleBlur("pgPoolTimeout")}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Wait Time for connection (10-120 seconds)
                  </p>
                </FormField>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <div className="flex items-start">
          <span className="text-amber-600 text-lg mr-2">*</span>
          <div>
            <h4 className="text-sm font-medium text-amber-900 mb-1">
              Security Notice
            </h4>
            <p className="text-sm text-amber-800">
              <strong>Password</strong> fields are not saved for security. When
              you reopen the wizard, you will need to enter passwords again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatabaseStep;
