import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useWizard } from "../../hooks/useWizard";
import FormField from "../common/FormField";

function DatabaseStep() {
  const { state, dispatch } = useWizard();
  const { configuration, validation } = state;
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Database Configuration
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Database Name"
          error={validation.errors.postgresDb}
          fieldName="postgresDb"
          required
          info="PostgreSQL database name"
        >
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.postgresDb}
            onChange={(e) => updateConfig("postgresDb", e.target.value)}
            onBlur={() => handleBlur("postgresDb")}
            placeholder="istsos"
          />
        </FormField>

        <FormField
          label="Username"
          error={validation.errors.postgresUser}
          fieldName="postgresUser"
          required
          info="Database user with create permissions"
        >
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configuration.postgresUser}
            onChange={(e) => updateConfig("postgresUser", e.target.value)}
            onBlur={() => handleBlur("postgresUser")}
            placeholder="postgres"
          />
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
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={configuration.postgresPassword}
                onChange={(e) =>
                  updateConfig("postgresPassword", e.target.value)
                }
                onBlur={() => handleBlur("postgresPassword")}
                placeholder="Enter secure password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
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

      <div className="border-t pt-6">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? "Hide" : "Show"} Advanced Settings
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <FormField
              label="Pool Size"
              info="Maximum database connections"
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
            </FormField>

            <FormField
              label="Max Overflow"
              info="Extra connections beyond pool size"
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
            </FormField>

            <FormField
              label="Pool Timeout (seconds)"
              info="Connection timeout duration"
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
                  updateConfig('pgPoolTimeout', value === '' ? '' : parseInt(value));}
                } 
                onBlur={() => handleBlur("pgPoolTimeout")}
              />
            </FormField>
          </div>
        )}
      </div>
    </div>
  );
}

export default DatabaseStep;
