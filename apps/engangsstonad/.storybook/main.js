const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    core: {
        builder: 'webpack5',
    },
    features: {
        storyStoreV7: true,
    },
    stories: ['../src/app/**/*.stories.tsx'],
    webpackFinal: async (config, { configType }) => {
        //Fjern default svg-loader
        config.module.rules = config.module.rules.map((data) => {
            if (/svg\|/.test(String(data.test))) {
                data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
            }
            return data;
        });

        config.devtool = 'source-map';

        // Make whatever fine-grained changes you need
        config.module.rules =  [
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve('tslint-loader'),
                enforce: 'pre',
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.svg$/,
                use: 'svg-sprite-loader',
            },
        ],

        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
            }),
        );

        config.resolve.extensions.push('.ts', '.tsx', '.less');
        config.resolve.alias = {
            ...config.resolve.alias,
            app: path.resolve(__dirname, './../src/app'),
            uttaksplan: path.resolve(__dirname, './../src/uttaksplan'),
            assets: path.resolve(__dirname, './../src/app/assets/'),
            components: path.resolve(__dirname, './../src/app/components/'),
            containers: path.resolve(__dirname, './../src/app/containers/'),
            actions: path.resolve(__dirname, './../src/app/redux/actions/'),
            reducers: path.resolve(__dirname, './../src/app/redux/reducers'),
            styles: path.resolve(__dirname, './../src/app/styles/'),
            util: path.resolve(__dirname, './../src/app/util/'),
            common: path.resolve(__dirname, './../src/common/'),
            storage: path.resolve(__dirname, './../src/storage/'),
            intl: path.resolve(__dirname, './../src/app/intl/'),
        };

        // Return the altered config
        return config;
    },
};