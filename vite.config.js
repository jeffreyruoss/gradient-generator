import { defineConfig } from 'vite';
import { resolve } from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig(({ command, mode }) => {
	const baseConfig = {
		base: '/gradient-generator/',
		build: {
			rollupOptions: {
				input: {
					main: resolve(__dirname, 'index.html'),
				},
			},
		},
	};

	if (mode === 'npm') {
		return {
			plugins: [cssInjectedByJsPlugin()],
			build: {
				lib: {
					entry: resolve(__dirname, 'src/index.js'),
					name: 'GradientGenerator',
					fileName: (format) => `gradient-generator.${format}.js`
				},
				outDir: 'dist-npm',
				rollupOptions: {
					external: ['coloris'], // Add other external dependencies if needed
					output: {
						globals: {
							coloris: 'Coloris'
						},
						assetFileNames: (assetInfo) => {
							if (assetInfo.name.endsWith('.woff2') || assetInfo.name.endsWith('.woff')) {
								return 'fonts/[name][extname]';
							}
							return 'assets/[name]-[hash][extname]';
						},
					},
				},
			},
			resolve: {
				alias: {
					'./../css': resolve(__dirname, 'css'),
					'./../style.css': resolve(__dirname, 'style.css'),
					'./vendor': resolve(__dirname, 'src/vendor')
				}
			}
		};
	}

	return baseConfig;
});