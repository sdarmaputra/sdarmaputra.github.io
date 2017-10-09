const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

const extractSass = new ExtractTextWebpackPlugin({
	filename: 'app.css'
});
const copyAssets = new CopyWebpackPlugin([
	{
		from: PUBLIC_DIR,
		to: DIST_DIR
	}
]);

const configs = {
	entry: path.resolve(SRC_DIR, 'app.js'),
	output: {
		path: DIST_DIR,
		filename: 'app.js',
		publicPath: '/dist/'
	},
	module: {
		rules: [
			{
				test: /\.(js)/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				include: SRC_DIR,
				use: extractSass.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			}
		]
	},
	plugins: [
		extractSass,
		copyAssets
	],
	devServer: {
		port: 8080
	}
};

module.exports = configs;
