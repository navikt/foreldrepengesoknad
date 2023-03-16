const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.config.production');

const cb = (err, stats) => {
    if (err || (stats.compilation.errors && stats.compilation.errors.length > 0)) {
        let error = err || stats.compilation.errors;
        console.log('Build failed');
        console.log('Error: ', error);
        process.exit(1);
    } else {
        console.log('Build success');
    }
};

const compiler = webpack(webpackConfig);
compiler.run(cb);
