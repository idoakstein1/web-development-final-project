import { config as configDotenv } from 'dotenv';

type Config = {
    env: 'development' | 'production';
    databaseURL: string;
    accessTokenSecret: string;
    accessTokenExpiration: string;
    refreshTokenSecret: string;
    refreshTokenExpiration: string;
    port: number;
    chatGPTApiKey: string;
    backupChatGPTApiKey: string;
    googleClientId: string;
    httpsCert: string;
    httpsKey: string;
    serverUrl: string;
};

const REQUIRED_ENVIRONMENT_VARIABLES = [
    'DATABASE_URL',
    'ACCESS_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET',
    'TOKEN_EXPIRATION',
    'REFRESH_TOKEN_EXPIRATION',
    'CHAT_GPT_API_KEY',
    'GOOGLE_CLIENT_ID',
    'HTTPS_KEY',
    'HTTPS_CERT',
    'SERVER_URL',
];
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
            env: env.NODE_ENV === 'production' ? env.NODE_ENV : 'development',
            databaseURL: env.DATABASE_URL,
            accessTokenSecret: env.ACCESS_TOKEN_SECRET,
            accessTokenExpiration: env.TOKEN_EXPIRATION,
            refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
            refreshTokenExpiration: env.REFRESH_TOKEN_EXPIRATION,
            port: Number(env.PORT) || 8080,
            chatGPTApiKey: env.CHAT_GPT_API_KEY,
            backupChatGPTApiKey: env.BACKUP_CHAT_GPT_API_KEY,
            googleClientId: env.GOOGLE_CLIENT_ID,
            httpsCert: env.HTTPS_CERT,
            httpsKey: env.HTTPS_KEY,
            serverUrl: env.SERVER_URL,
        };
    }

    return config;
};
