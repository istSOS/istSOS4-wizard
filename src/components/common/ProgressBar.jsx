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
    { id: 6, name: "Sample", icon: FileText },
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
          <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
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
              className="bg-green-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0 bg-green-50 rounded-2xl"></div>
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
                {/* Icon Circle */}
                <div
                  className={`
                  w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 cursor-pointer
                  ${
                    isCompleted
                      ? "bg-green-600 text-white shadow-lg border-2 border-green-500"
                      : isCurrent
                      ? "bg-green-500 text-white shadow-lg ring-2 ring-green-400 border-2 border-green-300"
                      : "bg-gray-300 text-gray-600 border-2 border-gray-200"
                  }
                `}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : (
                    <StepIcon className="w-7 h-7" />
                  )}

                  {/* Animated indicator circle for current step */}
                  {isCurrent && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-green-300 rounded-full animate-ping z-5 opacity-50"></div>
                  )}
                </div>

                {/* Step Number Badge */}
                <div
                  className={`
                  absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-20 border-2 border-white shadow-md
                  ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isCurrent
                      ? "bg-green-700 text-white"
                      : "bg-gray-400 text-white"
                  }
                `}
                >
                  {step.id}
                </div>

                {/* Step Name */}
                <span
                  className={`
                  text-sm mt-4 font-semibold transition-colors duration-200 text-center max-w-20 leading-tight
                  ${
                    isCompleted
                      ? "text-green-700"
                      : isCurrent
                      ? "text-green-600 font-bold"
                      : "text-gray-600"
                  }
                `}
                >
                  {step.name}
                </span>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-7 left-7 flex items-center"
                    style={{ width: "calc(100% + 28px)" }}
                  >
                    <div
                      className={`
                      h-1 rounded-full transition-colors duration-300
                      ${
                        step.id < state.currentStep
                          ? "bg-green-600"
                          : step.id === state.currentStep
                          ? "bg-blue-400"
                          : "bg-gray-300"
                      }
                    `}
                      style={{ width: "100%" }}
                    ></div>
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
