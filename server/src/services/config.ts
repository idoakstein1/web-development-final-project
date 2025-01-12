import { config as configDotenv } from 'dotenv';

type Config = {
    databaseURL: string;
    port: number;
};

const REQUIRED_ENVIRONMENT_VARIABLES = ['DATABASE_URL'];

const checkEnvironmentVariables = () => {
    if (REQUIRED_ENVIRONMENT_VARIABLES.some((variable) => !(variable in process.env))) {
        const missingVariables = REQUIRED_ENVIRONMENT_VARIABLES.find((variable) => !(variable in process.env));
        throw new Error(`missing environment variable: ${missingVariables}`);
    }
};

let config: Config;

export const getConfig = () => {
    if (!config) {
        configDotenv();
        checkEnvironmentVariables();

        const { env } = process as { env: Record<string, string> };

        config = {
            databaseURL: env.DATABASE_URL,
            port: Number(env.PORT) || 8080,
        };
    }

    return config;
};
