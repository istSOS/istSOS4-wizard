import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useWizard } from "../../hooks/useWizard";
import { useWizardPersistence } from "../../hooks/useWizardPersistence";

const steps = [
  { title: "Welcome" },
  { title: "Server Config" },
  { title: "Database" },
  { title: "Authorization" },
  { title: "Data Management" },
  { title: "Sample Data" },
  { title: "Performance" },
  { title: "Coordinate System" },
  { title: "Review" },
];

function Navigation() {
  const { state, dispatch } = useWizard();
  const { resetWizard } = useWizardPersistence();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showResetWarning, setShowResetWarning] = useState(false);

  const hasErrors = Object.keys(state.validation.errors).length > 0;
  const hasTouchedErrors = Object.keys(state.validation.errors).some(
    (field) => state.validation.touched[field]
  );

  const canGoNext = state.currentStep < state.totalSteps;
  const canGoPrev = state.currentStep > 1;
  const isCompletionStep = state.currentStep === state.totalSteps;

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handlePrev = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const handleReset = () => {
    if (showResetConfirm) {
      resetWizard();
      setShowResetConfirm(false);
      setShowResetWarning(false);
    } else {
      setShowResetWarning(true);
      setShowResetConfirm(true);
      setTimeout(() => {
        setShowResetConfirm(false);
        setShowResetWarning(false);
      }, 3000);
    }
  };

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <button
        onClick={handlePrev}
        disabled={!canGoPrev}
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          canGoPrev
            ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      <div className="text-center">
        <div className="text-sm text-gray-600">
          {steps[state.currentStep - 1]?.title}
        </div>
        {hasErrors && hasTouchedErrors && (
          <p className="text-xs text-red-600 mt-1">
            Please fix errors before proceeding
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative">
          <button
            onClick={handleReset}
            className={`${
              isCompletionStep ? "px-4 py-2 flex items-center" : "p-2"
            } rounded-md transition-colors ${
              showResetConfirm
                ? "bg-red-600 text-white"
                : isCompletionStep
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
          >
            {isCompletionStep ? (
              <>
                <RotateCcw className="w-4 h-4 mr-2" />
                Start New Configuration
              </>
            ) : (
              <RotateCcw className="w-4 h-4" />
            )}
          </button>

          {showResetWarning && showResetConfirm && (
            <div className="absolute z-10 w-64 p-3 mb-2 text-sm text-white bg-red-600 rounded-md shadow-lg bottom-full left-1/2 transform -translate-x-1/2">
              <div className="flex items-start">
                <svg
                  className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="font-semibold">Warning!</p>
                  <p className="mt-1">
                    This will permanently delete all your configuration data and
                    restart the wizard from the beginning.
                  </p>
                  <p className="mt-2 text-xs font-semibold">
                    Click again to confirm reset
                  </p>
                </div>
              </div>
              <div className="absolute w-2 h-2 bg-red-600 rotate-45 top-full left-1/2 transform -translate-x-1/2 -mt-1"></div>
            </div>
          )}
        </div>

        {!isCompletionStep && (
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              canGoNext
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Navigation;
