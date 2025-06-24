import React from 'react';
import { useWizard } from '../../hooks/useWizard';
import FormField from '../common/FormField';
import Toggle from '../common/Toggle';

function ServicesStep() {
  const { state, dispatch } = useWizard();
  const { configuration } = state;

  const updateConfig = (field, value) => {
    dispatch({
      type: 'UPDATE_CONFIG',
      payload: { [field]: value }
    });
  };

  const epsgOptions = [
    { value: 4326, label: 'EPSG:4326 (WGS 84)', desc: 'Global GPS coordinates' },
    { value: 3857, label: 'EPSG:3857 (Web Mercator)', desc: 'Web mapping standard' },
    { value: 2154, label: 'EPSG:2154 (RGF93 / Lambert-93)', desc: 'France' },
    { value: 25832, label: 'EPSG:25832 (ETRS89 / UTM zone 32N)', desc: 'Central Europe' },
    { value: 32633, label: 'EPSG:32633 (WGS 84 / UTM zone 33N)', desc: 'Eastern Europe' },
    { value: 4269, label: 'EPSG:4269 (NAD83)', desc: 'North America' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Additional Services</h2>
      <p className="text-gray-600">Configure optional services and coordinate systems</p>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="flex-1">
              <Toggle
                checked={configuration.redis === 1}
                onChange={(e) => updateConfig('redis', e.target.checked ? 1 : 0)}
                label="Enable Redis Caching"
              />
              <p className="text-sm text-gray-600 mt-2 ml-7">
                Redis improves performance by caching frequently accessed data and API responses
              </p>
              
              {configuration.redis === 1 && (
                <div className="ml-7 mt-3 space-y-2">
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Ensure Redis is included in your Docker Compose configuration
                    </p>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Default connection: redis://redis:6379</li>
                    <li>• Recommended memory: 512MB minimum</li>
                    <li>• Cache TTL: 1 hour (configurable)</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <FormField 
          label="Coordinate Reference System (EPSG)"
          info="Spatial reference system for geographic data"
        >
          <div className="space-y-2">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={configuration.epsg}
              onChange={(e) => updateConfig('epsg', parseInt(e.target.value))}
            >
              {epsgOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.desc}
                </option>
              ))}
            </select>
            
            <div className="text-sm text-gray-600">
              {configuration.epsg === 4326 && (
                <p className="text-green-700">
                  ✓ WGS 84 is recommended for global applications and GPS data
                </p>
              )}
              {configuration.epsg === 3857 && (
                <p className="text-blue-700">
                  ℹ Web Mercator is ideal for web mapping applications
                </p>
              )}
            </div>
          </div>
        </FormField>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Service Architecture</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-3 ${
                configuration.redis === 1 ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <span>Redis Cache {configuration.redis === 1 ? '(Enabled)' : '(Disabled)'}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
              <span>PostgreSQL Database (Required)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
              <span>istSOS4 API Server (Required)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesStep;