require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./dev.config');
const WebpackDevServer = require('webpack-dev-server');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const compiler = webpack(webpackConfig);

compiler.apply(new ProgressPlugin());

//
// === Middleware Config ===
//

const ROOT_DIR = path.resolve(__dirname, '..');
const DEV_SERVER_OPTIONS = {
	// public directory for dev server to serve
	contentBase: path.resolve(ROOT_DIR, 'public'),
	publicPath: '/',
	// turn on hot mode
	hot: true,
	// Allow any URL to map to index.html
	historyApiFallback: {
		index: path.resolve(ROOT_DIR, 'src', 'templates', 'index.dev.html'),
	},
	// It suppress error shown in console, so it has to be set to false.
	quiet: false,
	// It suppress everything except error, so it has to be set to false as well
	// to see success build.
	noInfo: false,
	stats: {
		// Config for minimal console.log mess.
		assets: true,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: false
	},
};

const devServer = new WebpackDevServer(compiler, DEV_SERVER_OPTIONS);

devServer.listen(process.env.WEBPACK_PORT, function expressListen(error) {
	if (error) {
		console.error(error);
	}
});
