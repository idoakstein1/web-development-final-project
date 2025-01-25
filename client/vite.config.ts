import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        https:
            process.env.NODE_ENV === 'production'
                ? {
                      key: `${process.env.PATH_TO_CERTS}client-key.pem`,
                      cert: `${process.env.PATH_TO_CERTS}client-cert.pem`,
                  }
                : undefined,
    },
});
