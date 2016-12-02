var path = require('path');
var version = require('./package.json').version;
var webpack = require('webpack');

module.exports = {
	entry: {
		Page: './src/Page.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js',
		library: 'Page',
		libraryTarget: 'umd'
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	},
	plugins: [
		new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(version)
		}),
	]
};