const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssCssnext = require('postcss-cssnext')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.env.NODE_ENV || 'prod'

function plugins() {
    if(env === 'prod'){
        return [
            new ExtractTextPlugin('style.css', { allChunks: true }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({minimize: true}),
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        ]
    }
    return [
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new HtmlWebpackPlugin({ title: 'Courses admin', template: './src/index.html' })
    ]
}

function loaders() {
    return [
        {
            test: /\.js$/,
            loader: 'babel', exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['transform-runtime', 'transform-decorators-legacy']
            }
        },
        {
            test: /\.css$/i,
            loader: ExtractTextPlugin.extract('style',
                `css?modules&localIdentName=[name]_[local]__[hash:base64:5]!postcss`),
        },
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
        {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}

    ]
}

function entry() {
    if(env === 'prod'){
        return {
            app: './src/index',
            vendor: [ 'react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux']
        }
    }
    return { app: './src/index'}
}

function output() {
    if(env === 'prod'){
        return {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js',
            publicPath: '/public/'
        }
    }
    return {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    }
}

/* config */
module.exports = {
    devtool: 'inline-source-map',
    entry: entry(),
    output: output(),
    module: { loaders: loaders() },
    postcss: [ postcssCssnext({ browsers: ['last 2 versions'] }) ],
    devServer: { historyApiFallback: true },
    plugins: plugins()
}
