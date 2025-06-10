module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    silent: false,
    testMatch: ['**/tests/**/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', 
      },
};