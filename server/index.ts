import { initApp } from './src/server/initApp';

const main = async () => {
    await initApp();
    console.log('Server is running');
};

main();
