import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        https:
            process.env.NODE_ENV === 'production'
                ? {
                      key: '../../certs/client-key.pem',
                      cert: '../../certs/client-cert.pem',
                  }
                : undefined,
    },
});
