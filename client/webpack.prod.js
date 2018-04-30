const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.config.js');

module.exports = merge({
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'SERVERURI': JSON.stringify('https://kitties-dapp.herokuapp.com')
                // 'SERVERURI': JSON.stringify('https://gifting-kitties-dapp-mtrwqdyvui.now.sh')
            }
        })
    ]
},common)