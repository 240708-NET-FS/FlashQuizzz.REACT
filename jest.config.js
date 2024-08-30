/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  collectCoverage: true,
  coverageReporters: ["json", "html", "text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 30,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/mocks/StyleMock.js",
  },
};
