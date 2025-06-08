import React from 'react';

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div className={`w-10 h-6 flex rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}>
          <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${
            checked ? 'translate-x-5' : 'translate-x-1'
          } mt-1`}></div>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}

export default Toggle;