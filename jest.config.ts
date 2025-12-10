import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["./setupTests.ts"],
  testEnvironment: "jsdom",

  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.app.json",
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: ["/node_modules/(?!(@testing-library|@babel|jest))"],
};

export default config;
