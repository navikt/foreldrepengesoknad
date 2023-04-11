module.exports = (api) => {
    const isTest = api.env('test');

    const plugins = ['@babel/plugin-proposal-object-rest-spread'];
    const presets = ['@babel/preset-typescript', '@babel/preset-env', '@babel/react'];

    if (isTest) {
        plugins.push('@babel/plugin-transform-modules-commonjs');
    }

    return {
        plugins,
        presets,
    };
};
