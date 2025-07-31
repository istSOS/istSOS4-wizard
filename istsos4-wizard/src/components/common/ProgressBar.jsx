import React from "react";
import { useWizard } from "../../hooks/useWizard";
import {
  Home,
  Server,
  Database,
  Shield,
  Settings,
  BarChart3,
  FileText,
  CheckCircle2,
  CheckCheck,
  Compass,
} from "lucide-react";

function ProgressBar() {
  const { state } = useWizard();

  const steps = [
    { id: 1, name: "Welcome", icon: Home },
    { id: 2, name: "Server", icon: Server },
    { id: 3, name: "Database", icon: Database },
    { id: 4, name: "Auth", icon: Shield },
    { id: 5, name: "Data   ", icon: Settings },
    { id: 6, name: "Simple", icon: FileText },
    { id: 7, name: "Performance", icon: BarChart3 },
    { id: 8, name: "Coordination", icon: Compass },
    { id: 9, name: "Review", icon: CheckCheck },
    { id: 10, name: "Complete", icon: CheckCircle2 },
  ];

  const progress = (state.currentStep / state.totalSteps) * 100;

  return (
    <div className="w-full mb-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Setup Progress
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Complete your istSOS4 configuration
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">
              {Math.round(progress)}%
            </div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
          <div className="w-20 bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-3 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Icons Container */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-200 backdrop-blur-sm">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl"></div>
        </div>

        <div className="flex justify-between items-center relative z-10">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = step.id < state.currentStep;
            const isCurrent = step.id === state.currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative group"
              >
                {/* Glow Effect for Current Step */}
                {isCurrent && (
                  <div className="absolute inset-0 w-16 h-16 -top-2 bg-blue-400 rounded-full opacity-20 animate-pulse blur-lg"></div>
                )}

                {/* Icon Circle */}
                <div
                  className={`
                  w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 cursor-pointer group-hover:scale-105
                  ${
                    isCompleted
                      ? "bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-110 border-2 border-green-300"
                      : isCurrent
                      ? "bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white shadow-xl ring-4 ring-blue-200 hover:shadow-2xl border-2 border-blue-300"
                      : "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-600 hover:from-gray-300 hover:to-gray-500 hover:shadow-lg border-2 border-gray-300"
                  }
                `}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-7 h-7 drop-shadow-sm" />
                  ) : (
                    <StepIcon className="w-7 h-7 drop-shadow-sm" />
                  )}

                  {/* Animated Ring for Current Step */}
                  {isCurrent && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-75"></div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse"></div>
                    </>
                  )}

                  {/* Success Particle Effect */}
                  {isCompleted && (
                    <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-pulse"></div>
                  )}
                </div>

                {/* Step Number Badge */}
                <div
                  className={`
                  absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-20 border-2 border-white shadow-lg
                  ${
                    isCompleted
                      ? "bg-gradient-to-br from-green-500 to-green-600 text-white"
                      : isCurrent
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white animate-pulse"
                      : "bg-gradient-to-br from-gray-400 to-gray-500 text-white"
                  }
                `}
                >
                  {step.id}
                </div>

                {/* Step Name */}
                <span
                  className={`
                  text-sm mt-4 font-semibold transition-all duration-300 text-center max-w-20 leading-tight
                  ${
                    isCompleted
                      ? "text-green-700"
                      : isCurrent
                      ? "text-blue-700 font-bold text-base"
                      : "text-gray-600 group-hover:text-gray-800"
                  }
                `}
                >
                  {step.name}
                </span>

                {/* Enhanced Connection Line */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-7 left-7 flex items-center"
                    style={{ width: "calc(100% + 28px)" }}
                  >
                    <div
                      className={`
                      h-1 rounded-full transition-all duration-700 relative overflow-hidden
                      ${
                        step.id < state.currentStep
                          ? "bg-gradient-to-r from-green-400 to-green-500 shadow-md"
                          : step.id === state.currentStep
                          ? "bg-gradient-to-r from-blue-400 via-purple-400 to-gray-300"
                          : "bg-gray-300"
                      }
                    `}
                      style={{ width: "100%" }}
                    >
                      {/* Animated Flow Effect */}
                      {(step.id < state.currentStep ||
                        step.id === state.currentStep) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
