module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((@)?react-native|@react-native-community|@react-native-firebase|@react-navigation|react-native-.*)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
