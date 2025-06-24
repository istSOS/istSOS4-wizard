// // src/utils/constants.js
// export const initialState = {
//   currentStep: 1,
//   totalSteps: 9,
//   configuration: {
//     // Basic Server Configuration
//     hostname: 'http://localhost:8018',
//     subpath: '/istsos4',
//     version: '/v1.1',
//     debug: 0,
    
//     // Database Configuration
//     postgresDb: 'istsos',
//     postgresUser: 'admin',
//     postgresPassword: 'admin',
//     pgMaxOverflow: 0,
//     pgPoolSize: 10,
//     pgPoolTimeout: 30,
    
//     // Data Management
//     dummyData: 0,
//     clearData: 0,
//     versioning: false,
//     duplicates: false,
    
//     // Sample Data (conditional)
//     nThings: 3,
//     nObservedProperties: 2,
//     interval: 'P1Y',
//     frequency: 'PT5M',
//     startDatetime: '2020-01-01T12:00:00.000+01:00',
    
//     // Performance Settings
//     countMode: 'FULL',
//     countEstimateThreshold: 10000,
//     topValue: 100,
//     partitionChunk: 10000,
//     chunkInterval: 'P1Y',
    
//     // Additional Services
//     redis: 1,
//     epsg: 4326
//   },
//   validation: {
//     errors: {},
//     touched: {},
//     isValid: true
//   }
// };

export const initialState = {
  // Wizard State
  currentStep: 1,
  totalSteps: 9,
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
    
    // Data Management
    dummyData: 0,
    clearData: 0,
    versioning: false,
    duplicates: false,
    
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