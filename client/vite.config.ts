import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';

const pathToCerts = process.env.PATH_TO_CERTS || '/home/st111/WatchIt/certs/';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    preview: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: ['node07.cs.colman.ac.il', 'localhost', '0.0.0.0'],
        https:
            process.env.NODE_ENV === 'production'
                ? {
                      key: readFileSync(`${pathToCerts}client-key.pem`),
                      cert: readFileSync(`${pathToCerts}client-cert.pem`),
                  }
                : undefined,
    } as any,
});
