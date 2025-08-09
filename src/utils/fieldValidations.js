import { ValidationRules } from './validationRules';

export const fieldValidations = {
  // Basic Server Configuration
  hostname: [
    ValidationRules.required,
    ValidationRules.url
  ],
  externalPort: [
    ValidationRules.required,
    ValidationRules.minValue(1024),
    ValidationRules.maxValue(49151)
  ],
  subpath: [
    ValidationRules.required,
    ValidationRules.pattern(/^\/[a-zA-Z0-9_-]+$/, 'Must start with / and contain only letters, numbers, hyphens, and underscores')
  ],

  // Database Configuration
  postgresHost: [
    ValidationRules.required,
    ValidationRules.hostname
  ],
  postgresExternalPort: [
    ValidationRules.required,
    ValidationRules.minValue(1024),
    ValidationRules.maxValue(65535)
  ],
  postgresDb: [
    ValidationRules.required,
    ValidationRules.dbName
  ],
  postgresUser: [
    ValidationRules.required,
    ValidationRules.alphanumeric,
    ValidationRules.minLength(1),
    ValidationRules.maxLength(63)
  ],
  postgresPassword: [
    ValidationRules.required,
    ValidationRules.password
  ],
  pgPoolSize: [
    ValidationRules.required,
    ValidationRules.minValue(1),
    ValidationRules.maxValue(50)
  ],
  pgMaxOverflow: [
    ValidationRules.required,
    ValidationRules.minValue(0),
    ValidationRules.maxValue(20)
  ],
  pgPoolTimeout: [
    ValidationRules.minValue(10),
    ValidationRules.maxValue(120)
  ],

  // Authentication Configuration
  istsosAdmin: [
    ValidationRules.required,
    ValidationRules.alphanumeric,
    ValidationRules.minLength(1),
    ValidationRules.maxLength(63)
  ],
  istsosAdminPassword: [
    ValidationRules.required,
    ValidationRules.password
  ],
  secretKey: [
    ValidationRules.required,
    ValidationRules.minLength(32),
    ValidationRules.maxLength(64)
  ],
  accessTokenExpireMinutes: [
    ValidationRules.required,
    ValidationRules.minValue(1),
    ValidationRules.maxValue(1440) // 1 day in minutes
  ],


  // Sample Data Configuration
  nThings: [
    ValidationRules.required,
    ValidationRules.minValue(1),
    ValidationRules.maxValue(100)
  ],
  nObservedProperties: [
    ValidationRules.required,
    ValidationRules.minValue(1),
    ValidationRules.maxValue(10)
  ],
  baseDatetime: [
    ValidationRules.required,
  ],
  timezoneOffset: [
    ValidationRules.required,
    ValidationRules.pattern(/^(?:\+((0[0-9]|1[0-3]):[0-5][0-9]|14:00)|-(0[0-9]|1[0-1]):[0-5][0-9]|-12:00)$/, 'Use format ±HH:MM')
  ],
  partitionChunk: [
    ValidationRules.minValue(1000),
    ValidationRules.maxValue(50000)
  ],

  // Performance Settings
  countEstimateThreshold: [
    ValidationRules.minValue(1000),
    ValidationRules.maxValue(100000)
  ],
  topValue: [
    ValidationRules.minValue(10),
    ValidationRules.maxValue(1000)
  ],

  // Additional Services
  epsg: [
    ValidationRules.required,
    ValidationRules.minValue(1000),
    ValidationRules.maxValue(999999)
  ],


};

// Validate a single field
export const validateField = (fieldName, value) => {
  const validators = fieldValidations[fieldName];
  if (!validators) return null;

  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }

  return null;
};

export const validateStep = (stepNumber, configuration) => {
  const errors = {};
  let fieldsToValidate = [];

  switch (stepNumber) {
    case 2: // Basic Server Configuration
      fieldsToValidate = ['hostname', 'externalPort', 'subpath'];
      break;

    case 3: // Database Configuration
      fieldsToValidate = ['postgresHost', 'postgresExternalPort', 'postgresDb', 'postgresUser', 'postgresPassword'];
      // Include advanced fields if shown
      if (configuration.showAdvanced) {
        fieldsToValidate.push('pgPoolSize', 'pgMaxOverflow', 'pgPoolTimeout');
      }
      break;

    case 4: // Authentication Configuration
      fieldsToValidate = ['istsosAdmin', 'istsosAdminPassword', 'secretKey', 'accessTokenExpireMinutes'];
      break;

    case 6: // Sample Data Configuration
      if (configuration.dummyData === 1) {
        fieldsToValidate = ['nThings', 'nObservedProperties', 'baseDatetime', 'timezoneOffset', 'partitionChunk'];
      }
      break;

    case 7: // Performance Settings
      fieldsToValidate = ['countEstimateThreshold', 'topValue'];
      break;

    case 8: // Additional Services
      fieldsToValidate = ['epsg'];
      break;
  }

  fieldsToValidate.forEach(field => {
    const error = validateField(field, configuration[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

export const validateConfiguration = (configuration) => {
  const errors = {};

  Object.keys(fieldValidations).forEach(field => {
    const error = validateField(field, configuration[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

const stepFieldMappings = {
  1: [],
  2: ['hostname', 'externalPort', 'subpath'],
  3: ['postgresHost', 'postgresExternalPort', 'postgresDb', 'postgresUser', 'postgresPassword', 'pgPoolSize', 'pgMaxOverflow', 'pgPoolTimeout'],
  4: ['istsosAdmin', 'istsosAdminPassword', 'secretKey', 'algorithm', 'accessTokenExpireMinutes'],
  5: [],
  6: ['baseDatetime', 'timezoneOffset', 'nThings', 'nObservedProperties', 'interval', 'frequency', 'partitionChunk', 'chunkInterval'], // Sample Data
  7: ['countEstimateThreshold', 'topValue'],
  8: ['epsg'],
  9: []
};

export const validateStepConfiguration = (configuration, currentStep) => {
  const errors = {};

  if (currentStep === 9) {
    return validateConfiguration(configuration);
  }

  const fieldsToValidate = [];
  for (let step = 1; step <= currentStep; step++) {
    if (stepFieldMappings[step]) {
      fieldsToValidate.push(...stepFieldMappings[step]);
    }
  }

  fieldsToValidate.forEach(field => {
    if (fieldValidations[field]) {
      const error = validateField(field, configuration[field]);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return errors;
};