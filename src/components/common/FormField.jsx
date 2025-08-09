import React from "react";
import { AlertTriangle, Info } from "lucide-react";
import { useWizard } from "../../hooks/useWizard";

function FormField({ label, children, error, fieldName, required = false }) {
  const { state } = useWizard();
  const showError = error && state.validation.touched[fieldName];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {React.isValidElement(children) && children.props
        ? React.cloneElement(children, {
            className: `${children.props.className || ""} ${
              showError
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : ""
            }`,
            "aria-invalid": showError ? "true" : "false",
            "aria-describedby": showError ? `${fieldName}-error` : undefined,
          })
        : children}
      {showError && (
        <p
          id={`${fieldName}-error`}
          className="text-red-600 text-sm flex items-center"
          role="alert"
        >
          <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
