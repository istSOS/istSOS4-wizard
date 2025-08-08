import React from "react";
import { useWizard } from "../../hooks/useWizard";

const ConfigurationSummary = () => {
  const { state } = useWizard();
  const { configuration } = state;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Configuration Summary
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-3">
            Server Configuration
          </h4>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-blue-700">URL:</dt>
              <dd className="font-medium text-blue-900">
                {`${configuration.hostname}:${configuration.externalPort}${configuration.subpath}`}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-blue-700">API Version:</dt>
              <dd className="font-medium text-blue-900">
                {configuration.version}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-blue-700">Debug Mode:</dt>
              <dd className="font-medium text-blue-900">
                {configuration.debug ? "Enabled" : "Disabled"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-3">
            Database Configuration
          </h4>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-green-700">Database:</dt>
              <dd className="font-medium text-green-900">
                {configuration.postgresDb}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-green-700">User:</dt>
              <dd className="font-medium text-green-900">
                {configuration.postgresUser}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-green-700"> External Port:</dt>
              <dd className="font-medium text-green-900">
                {configuration.postgresExternalPort}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 mb-3">
            Authentication Settings
          </h4>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-purple-700">Admin User:</dt>
              <dd className="font-medium text-purple-900">
                {configuration.istsosAdmin}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-purple-700">Authorization:</dt>
              <dd className="font-medium text-purple-900">
                {configuration.authorization ? "Enabled" : "Disabled"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-purple-700">Anonymous Viewer:</dt>
              <dd className="font-medium text-purple-900">
                {configuration.anonymousViewer ? "Enabled" : "Disabled"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-900 mb-3">Data Management</h4>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-amber-700">Data Versioning:</dt>
              <dd className="font-medium text-amber-900">
                {configuration.versioning ? "Enabled" : "Disabled"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-amber-700">Duplicates Entries:</dt>
              <dd className="font-medium text-amber-900">
                {configuration.duplicates ? "Enabled" : "Disabled"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-amber-700">Sample Data:</dt>
              <dd className="font-medium text-amber-900">
                {configuration.dummyData ? "Enabled" : "Disabled"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationSummary;
