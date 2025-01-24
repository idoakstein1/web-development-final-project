/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_SERVER_URL: string;
    VITE_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
