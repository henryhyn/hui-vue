module.exports = {
  transformIgnorePatterns: [
    '/node_modules/(?![dir])'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
