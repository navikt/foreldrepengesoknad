module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { node: 'current', esmodules: true },
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
  };