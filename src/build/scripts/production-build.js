const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.config.production');

const cb = (err) => {
    if (err) {
        console.log('Build failed');
        console.log('Error: ', err);
    } else {
        console.log('Build success');
    }
};

const compiler = webpack(webpackConfig);
compiler.run(cb);
