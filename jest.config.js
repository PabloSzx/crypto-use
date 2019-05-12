module.exports = {
  transform: {
    '.(ts|tsx)':
      'C:\\Users\\pablo.saez01\\Documents\\crypto-use\\node_modules\\ts-jest\\dist\\index.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  testMatch: ['<rootDir>/test/**/*.(spec|test).{ts,tsx}'],
  testURL: 'http://localhost',
  rootDir: 'C:\\Users\\pablo.saez01\\Documents\\crypto-use',
  watchPlugins: [
    'C:\\Users\\pablo.saez01\\Documents\\crypto-use\\node_modules\\jest-watch-typeahead\\filename.js',
    'C:\\Users\\pablo.saez01\\Documents\\crypto-use\\node_modules\\jest-watch-typeahead\\testname.js',
  ],
};
