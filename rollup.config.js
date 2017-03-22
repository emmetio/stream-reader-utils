export default {
	entry: './index.js',
	targets: [
		{format: 'cjs', dest: 'dist/stream-reader-utils.cjs.js'},
		{format: 'es',  dest: 'dist/stream-reader-utils.es.js'}
	]
};
