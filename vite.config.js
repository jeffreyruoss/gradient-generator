import { defineConfig } from 'vite';

console.log('Vite config loaded');

const config = defineConfig({
	base: '/gradient-generator/',
});

console.log(config);

export default config;
