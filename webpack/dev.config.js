require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const ASSET_HOST = `http://localhost:${process.env.WEBPACK_PORT}`;
const ROOT_DIR = path.resolve(__dirname, '..');
const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const CONTEXT = path.resolve(ROOT_DIR, 'src');

//
// === Folder Aliases ===
//

const alias = {
	components: path.resolve(ROOT_DIR, 'src', 'components'),
	middlewares: path.resolve(ROOT_DIR, 'src', 'middlewares'),
	reducers: path.resolve(ROOT_DIR, 'src', 'reducers'),
	styles: path.resolve(ROOT_DIR, 'src', 'styles'),
	templates: path.resolve(ROOT_DIR, 'src', 'templates'),
	themes: path.resolve(ROOT_DIR, 'src', 'themes'),
	utils: path.resolve(ROOT_DIR, 'src', 'utils'),
};

//
// === Plugin Settings ===
//

const cssLoaderOptions = {
	modules: true,
	importLoaders: 1,
	localIdentName: '[local]__[hash:base64:6]',
	minimize: true,
	sourceMap: true,
};

const postCSSOptions = {
	plugins: () => [
		autoprefixer({
			browsers: [
				'>1%',
				'last 4 versions',
				'Firefox ESR',
				'not ie < 9'
			]
		})
	]
};

const sassLoaderOptions = {
	includePaths: [
		path.resolve(ROOT_DIR, 'node_modules'),
	]
};

const styleLoaders = [
	'style-loader',
	{
		loader: 'css-loader',
		options: cssLoaderOptions
	},
	{
		loader: 'postcss-loader',
		options: postCSSOptions
	},
	{
		loader: 'sass-loader',
		options: sassLoaderOptions
	}
];

// Global env config
const globalEnvironmentConfig = new webpack.DefinePlugin({
	__DEV__: true,
});

// React Hot Loader
const devServer = [
	`webpack-dev-server/client?${ASSET_HOST}`,
	'webpack/hot/only-dev-server',
	'react-hot-loader/patch'
];

//
// === Loaders ===
//

const eslintLoader = {
	test: /\.jsx?$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	exclude: path.resolve(ROOT_DIR, 'node_modules')
};

const jsxLoader = {
	test: /\.jsx?$/,
	loader: 'babel-loader',
	include: path.resolve(ROOT_DIR, 'src')
};

const cssLoader = {
	test: /\.s?css$/,
	use: styleLoaders,
	include: path.resolve(ROOT_DIR, 'src')
};

//
// === Output Config ===
//

module.exports = {
	devtool: 'cheap-module-source-map',
	context: CONTEXT,
	performance: {hints: false},
	target: 'web',
	module: {
		rules: [
			eslintLoader,
			jsxLoader,
			cssLoader,
		]
	},
	resolve: {
		// Allow importing without extensions
		extensions: ['.js', '.jsx'],
		alias,
	},
	output: {
		path: path.resolve(BUILD_DIR),
		publicPath: `http://localhost:${process.env.WEBPACK_PORT}/`,
		filename: '[name].js',
	},
	entry: {
		renderer: devServer.concat(['./renderer.js'])
	},
	plugins: [
		// Global Environment variables,
		globalEnvironmentConfig,
		// Hot Reload
		new webpack.HotModuleReplacementPlugin(),
		// Prints more readable names w/ HMR
		new webpack.NamedModulesPlugin(),
		// Prevent Webpack from throwing and exiting process
		new webpack.NoEmitOnErrorsPlugin(),
	]
};