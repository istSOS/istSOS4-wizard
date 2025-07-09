export const initialState = {
  // Wizard State
  currentStep: 1,
  totalSteps: 10,
  validation: {
    errors: {},
    touched: {},
    isValid: true
  },
  
  // Configuration object
  configuration: {
    // Basic Server Configuration
    hostname: 'http://localhost:8018',
    subpath: '/istsos4',
    version: '/v1.1',
    debug: 0,
    
    // Database Configuration
    postgresDb: 'istsos',
    postgresUser: 'postgres',
    postgresPassword: '',
    pgMaxOverflow: 0,
    pgPoolSize: 10,
    pgPoolTimeout: 30,

    // Authentication Configuration
    istsosAdmin: 'admin',
    istsosAdminPassword: '',
    authorization: 0,
    secretKey: '09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7',
    algorithm: 'HS256',
    accessTokenExpireMinutes: '5',
    anonymousViewer: 0,
    
    // Data Management
    dummyData: 0,
    clearData: 0,
    versioning: 0,
    duplicates: 0,
    
    // Sample Data
    nThings: 3,
    nObservedProperties: 2,
    interval: 'P1Y',
    frequency: 'PT5M',
    startDatetime: new Date().toISOString().slice(0, 19) + '.000+00:00',
    
    // Performance Settings
    countMode: 'FULL',
    countEstimateThreshold: 10000,
    topValue: 100,
    partitionChunk: 10000,
    chunkInterval: 'P1Y',
    
    // Additional Services
    redis: 0,
    epsg: 4326
  }
};