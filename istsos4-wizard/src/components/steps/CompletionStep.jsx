import React from "react";
import { Check, BookOpen, ExternalLink } from "lucide-react";

function CompletionStep() {
  return (
    <div className="text-center space-y-8">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900">
        Configuration Complete!
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Your istSOS4 configuration has been successfully generated. You can now
        deploy your istSOS4 instance using Docker with the generated environment
        file.
      </p>

      <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
        {/* Resources Section */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-4 flex items-center justify-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Resources & Documentation
          </h3>
          <ul className="text-sm text-green-800 space-y-3">
            <li className="bg-white/50 p-3 rounded flex justify-center">
              <a
                href="https://istsos.org/foss4g-asia/tutorial/tutorial_index/"
                className="flex items-center text-green-700 hover:text-green-900 hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                istSOS4 Official Documentation
              </a>
            </li>
            <li className="bg-white/50 p-3 rounded flex justify-center">
              <a
                href="https://docs.docker.com/compose/"
                className="flex items-center text-green-700 hover:text-green-900 hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Docker Deployment Guide
              </a>
            </li>
            <li className="bg-white/50 p-3 rounded flex justify-center">
              <a
                href="https://github.com/istSOS/istSOS4/discussions"
                className="flex items-center text-green-700 hover:text-green-900 hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Community Support Forum
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Developer Attribution */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-3">
          <svg
            className="w-5 h-5 text-purple-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h3 className="font-semibold text-purple-900">
            Developer Contribution
          </h3>
        </div>

        {/* Citation Format */}
        <div className="bg-white/60 p-4 rounded-lg border-l-4 border-purple-400 mb-3">
          <p className="font-medium text-purple-900 mb-2">
            Configuration Wizard Development
          </p>
          <p className="text-sm text-purple-800 italic mb-2">
            <span className="font-semibold">Rahull004</span>. "istSOS4 Configuration
            Wizard" GitHub repository,
            2025. Available:
            <a
              href="https://github.com/Rahull004/istSOS4-wizard"
              className="text-purple-600 hover:text-purple-800 underline ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/Rahull004/istSOS4-wizard
            </a>
          </p>
          <p className="text-xs text-purple-700">
            Developed through{" "}
            <span className="font-bold text-purple-900 bg-purple-100 px-2 py-1 rounded">
              Google Summer of Code 2025
            </span>{" "}
            program
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompletionStep;
