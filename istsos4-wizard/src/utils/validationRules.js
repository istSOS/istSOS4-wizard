// Validation Rules Library
export const ValidationRules = {
  required: (value) => {
    if (value === null || value === undefined || value === '') {
      return 'This field is required';
    }
    return null;
  },
  
  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },
  
  minLength: (min) => (value) => {
    if (!value || value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },
  
  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be at most ${max} characters`;
    }
    return null;
  },
  
  minValue: (min) => (value) => {
    if (value < min) {
      return `Must be at least ${min}`;
    }
    return null;
  },
  
  maxValue: (max) => (value) => {
    if (value > max) {
      return `Must be at most ${max}`;
    }
    return null;
  },
  
  pattern: (regex, message) => (value) => {
    if (!value) return null;
    if (!regex.test(value)) {
      return message || 'Invalid format';
    }
    return null;
  },
  
  alphanumeric: (value) => {
    if (!value) return null;
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return 'Only letters, numbers, hyphens and underscores allowed';
    }
    return null;
  },
  
  noSpaces: (value) => {
    if (!value) return null;
    if (/\s/.test(value)) {
      return 'Spaces are not allowed';
    }
    return null;
  },
  
  dbName: (value) => {
    if (!value) return null;
    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(value)) {
      return 'Must start with a letter and contain only letters, numbers, and underscores';
    }
    if (value.length > 63) {
      return 'Database name must be 63 characters or less';
    }
    return null;
  },
  
  password: (value) => {
    if (!value) return null;
    const errors = [];
    if (value.length < 8) errors.push('at least 8 characters');
    if (!/[a-z]/.test(value)) errors.push('a lowercase letter');
    if (!/[A-Z]/.test(value)) errors.push('an uppercase letter');
    if (!/\d/.test(value)) errors.push('a number');
    
    if (errors.length > 0) {
      return `Password must contain ${errors.join(', ')}`;
    }
    return null;
  }
};