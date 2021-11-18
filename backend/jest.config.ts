import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ["dotenv/config"],
    testPathIgnorePatterns: ["__helper*"],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,ts}",
        "!**/node_modules",
        "!src/generated",
        "!src/__tests__"
    ]
};
export default config;

