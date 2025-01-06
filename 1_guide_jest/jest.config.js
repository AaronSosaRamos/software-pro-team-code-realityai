module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    collectCoverage: true,
    coverageReporters: ["text", "lcov"],
  };
  