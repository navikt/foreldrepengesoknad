require('dotenv').config();
const path = require('path');
const mustacheExpress = require('mustache-express');

const configureDevServer = (decoratorFragments) => ({
    setupMiddlewares: (middlewares, devServer) => {
        devServer.app.engine('html', mustacheExpress());
        devServer.app.set('views', `${__dirname}/../../../dist/dev`);
        devServer.app.set('view engine', 'mustache');
        devServer.app.get(/^\/(?!.*dist).*$/, (req, res) => {
            res.render(
                'index.html',
                Object.assign(
                    {
                        REST_API_URL: process.env.FORELDREPENGESOKNAD_API_URL,
                        LOGIN_URL: process.env.LOGINSERVICE_URL,
                    },
                    decoratorFragments
                )
            );
        });

        return middlewares;
    },
    client: {
        logging: 'info',
    },
    devMiddleware: {
        index: true,
        stats: 'minimal',
        publicPath: '/engangsstonad/dist',
    },
    static: {
        directory: path.resolve(__dirname, '../../../dist/dev'),
        serveIndex: true,
        watch: true,
    },
});

module.exports = configureDevServer;
