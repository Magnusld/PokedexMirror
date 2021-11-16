import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ["dotenv/config"],
    testPathIgnorePatterns: ["__helper*"],
};
export default config;

