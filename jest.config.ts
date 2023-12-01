import type {Config} from 'jest';

const config: Config = {
   verbose: true,
   testEnvironment: './jest.environment.js',
   setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
   moduleNameMapper: {
      '\\.css$': '<rootDir>/emptyModule.js',
    },
   collectCoverageFrom: [
      '<rootDir>/src/**/*.{js, ts, jsx, tsx}'
   ],
   testEnvironmentOptions: {
      customExportConditions: [''],
   },
   resetMocks: false
};

export default {config};