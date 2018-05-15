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

const compiler = webpack(webpackConfig, (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(
        stats.toString({
            colors: true
        })
    );
});
compiler.run(cb);
