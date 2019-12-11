module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
