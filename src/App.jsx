import React from "react";
import { WizardProvider } from "./components/wizard";
import StepRenderer from "./components/wizard/StepRenderer";
import ProgressBar from "./components/common/ProgressBar";
import Navigation from "./components/common/Navigation";
import SessionRecovery from "./components/common/SessionRecovery";

function App() {
  return (
    <WizardProvider>
      <div
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #2d7e3e 0%, #1e5a2b 50%, #2d7e3e 100%)",
        }}
      >
        <SessionRecovery />
        <div className="max-w-5xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ProgressBar />
            <StepRenderer />
            <Navigation />
          </div>
        </div>
      </div>
    </WizardProvider>
  );
}

export default App;
