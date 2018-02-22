const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '../');
const CONTEXT = path.resolve(ROOT_DIR, 'src');

//
// === Folder Aliases ===
//

const alias = {
	//actions: path.resolve(ROOT_DIR, 'src', 'actions'),
};

//
// === Plugin Settings ===
//

const cssLoaderOptions = {
	modules: true,
	importLoaders: 1,
	localIdentName: '[hash:base64:6]',
	minimize: true,
	sourceMap: false,
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

const styleLoaderOptions = {
	fallback: 'style-loader',
	use: [
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
	]
};

const globalEnvironmentConfig = new webpack.DefinePlugin({
	__DEV__: false,
	// Force React Production Mode
	'process.env': {
		'NODE_ENV': JSON.stringify('production')
	}
});

const uglifyConfig = new webpack.optimize.UglifyJsPlugin({
	compressor: {
		screw_ie8: true,
		warnings: false
	},
	mangle: {
		screw_ie8: true
	},
	output: {
		comments: false,
		screw_ie8: true
	}
});

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

const styleLoader = {
	test: /\.s?css$/,
	use: ExtractTextPlugin.extract(styleLoaderOptions),
	include: path.resolve(ROOT_DIR, 'src')
};

//
// === Output Configs ===
//

module.exports = {
	devtool: 'cheap-module-source-map',
	context: CONTEXT,
	performance: {hints: false},
	target: 'web',
	output: {
		path: path.resolve(ROOT_DIR, 'build'),
		publicPath: '',
		filename: '[name].js',
	},
	module: {
		rules: [
			eslintLoader,
			jsxLoader,
			styleLoader,
		]
	},
	entry: {
		renderer: './renderer.js',
	},
	resolve: {
		// Allow importing without extensions
		extensions: ['.js', '.jsx'],
		alias,
	},
	plugins: [
		// Global Environment variables,
		globalEnvironmentConfig,
		// Minify Scripts
		uglifyConfig,
		// Extract CSS files
		new ExtractTextPlugin('renderer.css'),
	]
};