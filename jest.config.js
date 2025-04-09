export default {
    testEnvironment: "node",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    moduleFileExtensions: ["js", "json", "node"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testPathIgnorePatterns: ["/node_modules/"],
  };