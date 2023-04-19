import { CommonServerOptions, defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import mkcert from 'vite-plugin-mkcert';
import swc from 'unplugin-swc';
import path from 'path';

const getPackagePath = (packageName: string): string => {
    return path.resolve(__dirname, `node_modules/${packageName}`);
};

const getAliasPath = (path: string): string => {
    return fileURLToPath(new URL(path, import.meta.url));
};

const getCommonServerOptions = (port: number): CommonServerOptions => {
    return {
        port,
        host: true,
        open: true,
        https: false,
    };
};

const srcPath = './src';

export default defineConfig(() => {
    const swcPluginConfig = swc.vite({
        tsconfigFile: true,
        swcrc: true,
    }) as PluginOption;

    return {
        plugins: [
            react({
                fastRefresh: true,
            }),
            swcPluginConfig,
            mkcert(),
        ],
        resolve: {
            alias: {
                '@': getAliasPath(srcPath),
                '@mui/styled-engine': getPackagePath('@mui/styled-engine-sc'),
            },
        },
        server: {
            hmr: true,
            ...getCommonServerOptions(3000),
        },
        preview: {
            ...getCommonServerOptions(3001),
        },
    };
});
