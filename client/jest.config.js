module.exports = {
  testPathIgnorePatterns: ["<rootDir>/client/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
};
