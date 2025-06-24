
import React from 'react';
import { Info, AlertTriangle } from 'lucide-react';

function FormField({ label, children, error, info }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {info && (
          <Info className="inline w-4 h-4 ml-1 text-gray-400" title={info} />
        )}
      </label>
      {children}
      {error && (
        <p className="text-red-600 text-sm flex items-center">
          <AlertTriangle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;