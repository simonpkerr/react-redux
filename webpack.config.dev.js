var webpack = require('webpack');
var path = require('path');
var DEBUG = !(process.env.NODE_ENV === 'production')

var config = {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: {
        //'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
        app: './src/index'
    },
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: './src'
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {test: /\.js/, exclude: /node_modules/, loaders: ['babel']},
            // {test: /(\.css)$/, loaders: ['style', 'css']},
            {test: /(\.css)$/, loader: 'style-loader!css-loader'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    }
};

if (DEBUG) {
    config.entry.dev = [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server'
    ];
    config.plugins = config.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'bundle',
            filename: 'bundle.js'
        })
    ]);
    config.output.publicPath = 'http://localhost:3001/static/';

}


module.exports = config;