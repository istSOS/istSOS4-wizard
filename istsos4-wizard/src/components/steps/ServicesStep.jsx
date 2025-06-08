import React from 'react'
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Additional Services</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <Toggle
            checked={configuration.redis === 1}
            onChange={(e) => updateConfig('redis', e.target.checked ? 1 : 0)}
            label="Enable Redis Caching"
          />
          <p className="text-sm text-gray-600 mt-2">
            Redis improves performance by caching frequently accessed data
          </p>
        </div>

        <FormField label="Coordinate Reference System (EPSG)">
          <div className="flex space-x-4">
            <select
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={configuration.epsg}
              onChange={(e) => updateConfig('epsg', parseInt(e.target.value))}
            >
              <option value={4326}>EPSG:4326 (WGS 84)</option>
              <option value={3857}>EPSG:3857 (Web Mercator)</option>
              <option value={2154}>EPSG:2154 (RGF93 / Lambert-93)</option>
              <option value={25832}>EPSG:25832 (ETRS89 / UTM zone 32N)</option>
            </select>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            EPSG:4326 (WGS 84) is recommended for global applications
          </p>
        </FormField>
      </div>
    </div>
  );
}

export default ServicesStep;