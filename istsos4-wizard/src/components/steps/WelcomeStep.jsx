import React from "react";
import LogoImage from "../../assets/logo.png";

function WelcomeStep() {
  return (
    <div className="bg-gradient-to-br from-green-600/5 via-white to-emerald-600/5 flex items-center justify-center p-5">
      <div className="max-w-4xl w-full text-center space-y-6">
        {/* Logo Section */}
        <div className="flex justify-center mt-1">
          <img
            src=  {LogoImage}
            alt="istSOS4 Logo"
            className="w-52 object-contain"
          />
        </div>

        {/* Welcome Content */}
        <div className="space-y-5">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Welcome to istSOS4
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Configuration Wizard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This interactive wizard will guide you through the complete setup of
            istSOS4 for Docker deployment. Configure database connections,
            customize data management options, and generate production-ready
            configuration files with ease.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Easy Configuration
            </h3>
            <p className="text-sm text-gray-600">
              Step-by-step setup process with intelligent defaults and
              validation
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Docker Ready</h3>
            <p className="text-sm text-gray-600">
              Generates optimized Docker Compose files for production deployment
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Validated Setup
            </h3>
            <p className="text-sm text-gray-600">
              Built-in validation ensures your configuration works correctly
            </p>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto mt-8">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Prerequisites
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center text-blue-800">
              <svg
                className="w-4 h-4 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Docker installed
            </div>
            <div className="flex items-center text-blue-800">
              <svg
                className="w-4 h-4 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              PostgreSQL access
            </div>
            <div className="flex items-center text-blue-800">
              <svg
                className="w-4 h-4 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Basic istSOS4 knowledge
            </div>
          </div>
        </div>

        {/* Privacy & Security Notice */}
        <div className="bg-gradient-to-r from-emerald-600/10 to-green-600/10 border border-emerald-300 rounded-xl p-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-2">
            <svg
              className="w-5 h-5 text-green-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <h3 className="font-semibold text-green-800">
              100% Risk-Free & Private
            </h3>
          </div>
          <div className="text-center">
            <p className="text-green-700 text-sm">
              All data stays locally on your device - no external servers or
              data collection
            </p>
          </div>
        </div>

        <div className="pt-3">
          <p className="text-gray-500 text-sm mb-2">
            Ready to begin? Click "Next" to start the configuration process.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeStep;
