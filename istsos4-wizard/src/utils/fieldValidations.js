import { ValidationRules } from './validationRules';

export const fieldValidations = {
  // Basic Server Configuration
  hostname: [
    ValidationRules.required,
    ValidationRules.url
  ],
  subpath: [
    ValidationRules.required,
    ValidationRules.pattern(/^\/[a-zA-Z0-9_-]+$/, 'Must start with / and contain only letters, numbers, hyphens, and underscores')
  ],
  
  // Database Configuration
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
  ]
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

// Validate fields for a specific step
export const validateStep = (stepNumber, configuration) => {
  const errors = {};
  let fieldsToValidate = [];
  
  switch (stepNumber) {
    case 2: // Basic Server Configuration
      fieldsToValidate = ['hostname', 'subpath'];
      break;
    case 3: // Database Configuration
      fieldsToValidate = ['postgresDb', 'postgresUser', 'postgresPassword'];
      // Include advanced fields if shown
      if (configuration.showAdvanced) {
        fieldsToValidate.push('pgPoolSize', 'pgMaxOverflow', 'pgPoolTimeout');
      }
      break;
    case 5: // Sample Data Configuration
      if (configuration.dummyData === 1) {
        fieldsToValidate = ['nThings', 'nObservedProperties', 'partitionChunk'];
      }
      break;
    case 6: // Performance Settings
      fieldsToValidate = ['countEstimateThreshold', 'topValue'];
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

// Validate entire configuration
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