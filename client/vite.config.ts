import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { defineConfig } from 'vite';

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
                      key: readFileSync(`${process.env.PATH_TO_CERTS}client-key.pem`),
                      cert: readFileSync(`${process.env.PATH_TO_CERTS}client-cert.pem`),
                  }
                : undefined,
    } as any,
});
