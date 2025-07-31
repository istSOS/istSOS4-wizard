import React from "react";
import { useWizard } from "../../hooks/useWizard";
import FormField from "../common/FormField";
import Toggle from "../common/Toggle";

function AuthorizationStep() {
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

  // Function to generate a new secret key
  const generateSecretKey = () => {
    const chars = "0123456789abcdef";
    let result = "";
    for (let i = 0; i < 64; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    updateConfig("secretKey", result);
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

  const passwordStrength = getPasswordStrength(
    configuration.istsosAdminPassword
  );

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Authorization Configuration
        </h2>
        <p className="text-gray-600 mt-2">
          Configure authentication and authorization settings for your istSOS4
          instance. Control access to your data and services.
        </p>
      </div>

      {/* Main Authorization Settings Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Authentication Settings
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Authorization Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Enable Authorization
                  </label>
                  <p className="text-sm text-gray-600">
                    Require authentication to access the system
                  </p>
                </div>
                <Toggle
                  checked={configuration.authorization === 1}
                  onChange={(e) =>
                    updateConfig("authorization", e.target.checked ? 1 : 0)
                  }
                  label=""
                />
              </div>
            </div>

            {/* Admin Username */}
            <FormField
              label="Administrator Username"
              error={validation.errors.istsosAdmin}
              fieldName="istsosAdmin"
              required
            >
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={configuration.istsosAdmin || ""}
                onChange={(e) => updateConfig("istsosAdmin", e.target.value)}
                onBlur={() => handleBlur("istsosAdmin")}
                placeholder="admin"
              />
            </FormField>

            {/* Admin Password */}
            <FormField
              label="Administrator Password"
              error={validation.errors.istsosAdminPassword}
              fieldName="istsosAdminPassword"
              required
              defaultValue={configuration.istsosAdminPassword || ""}
            >
              <div>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-3 py-2 pr-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={configuration.istsosAdminPassword || ""}
                    onChange={(e) =>
                      updateConfig("istsosAdminPassword", e.target.value)
                    }
                    onBlur={() => handleBlur("istsosAdminPassword")}
                    placeholder="Enter administrator password"
                  />
                </div>

                {/* Password strength indicator */}
                {configuration.istsosAdminPassword && (
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

          <div className="space-y-6">
            {/* Anonymous Viewer */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Anonymous Viewer
                  </label>
                  <p className="text-sm text-gray-600">
                    Allow read-only access without authentication
                  </p>
                </div>
                <Toggle
                  checked={configuration.anonymousViewer === 1}
                  onChange={(e) =>
                    updateConfig("anonymousViewer", e.target.checked ? 1 : 0)
                  }
                  label=""
                />
              </div>
            </div>

            {/* Access Token Expire Minutes */}
            <FormField
              label="Access Token Expire Minutes"
              error={validation.errors.accessTokenExpireMinutes}
              fieldName="accessTokenExpireMinutes"
              required
            >
              <input
                type="number"
                min="1"
                max="1440"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={configuration.accessTokenExpireMinutes || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  updateConfig(
                    "accessTokenExpireMinutes",
                    value === "" ? "" : parseInt(value)
                  );
                }}
                onBlur={() => handleBlur("accessTokenExpireMinutes")}
                placeholder="5"
              />
            </FormField>

            {/* Algorithm */}
            <FormField label="Algorithm" fieldName="algorithm" required>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={configuration.algorithm || "HS256"}
                onChange={(e) => updateConfig("algorithm", e.target.value)}
                onBlur={() => handleBlur("algorithm")}
              >
                <option value="HS256">HS256</option>
                <option value="ES256">ES256</option>
                <option value="RS256">RS256</option>
              </select>
            </FormField>
          </div>
        </div>
      </div>

      {/* Secret Key Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Security Key Configuration
        </h3>
        <FormField
          label="Secret Key"
          error={validation.errors.secretKey}
          fieldName="secretKey"
          required
        >
          <div className="space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
                value={configuration.secretKey || ""}
                onChange={(e) => updateConfig("secretKey", e.target.value)}
                onBlur={() => handleBlur("secretKey")}
                placeholder="09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
              />
              <button
                type="button"
                onClick={generateSecretKey}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-md hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 whitespace-nowrap transition-colors shadow-lg hover:shadow-xl"
              >
                Generate New
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Use 'openssl rand -hex 32' to generate a secure key, or click
              "Generate New"
            </p>
          </div>
        </FormField>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="ml-4">
            <h3 className="font-semibold text-yellow-900 text-base mb-2">
              ⚠️ Important Security Notice
            </h3>
            <p className="text-yellow-800 text-sm">
              <strong>Enable Authorization</strong> settings above cannot be
              changed once the setup is complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorizationStep;
