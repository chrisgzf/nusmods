const pkgJson = require('./package.json');

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const IS_PROD = api.env('production');
  const IS_DEV = api.env('development');
  const IS_TEST = api.env('test');

  const presets = [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: IS_TEST ? { node: true } : { browsers: pkgJson.browserslist },
        modules: IS_TEST ? 'commonjs' : false,
        useBuiltIns: 'usage',
        corejs: pkgJson.dependencies['core-js'],
        // Exclude transforms that make all code slower
        // See https://github.com/facebook/create-react-app/pull/5278
        exclude: ['transform-typeof-symbol'],
      },
    ],
    ['@babel/preset-react', { development: !IS_PROD }],
  ];

  const plugins = [
    'babel-plugin-lodash',
    '@babel/plugin-syntax-dynamic-import',
    // Deviate from spec, but Object.defineProperty is expensive
    // See https://github.com/facebook/create-react-app/issues/4263
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // Let's assume document.all doesn't exist to reduce the generated code size
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
  ];

  if (IS_DEV || IS_PROD) {
    plugins.push(['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }]);
    // In production this cleans up hot reload code
    // See https://github.com/gaearon/react-hot-loader#what-about-production
    plugins.push('react-hot-loader/babel');
  }

  if (IS_PROD) {
    // React Optimize plugins
    plugins.push(
      '@babel/plugin-transform-react-inline-elements',
      '@babel/plugin-transform-react-constant-elements',
      'babel-plugin-transform-react-remove-prop-types',
      'babel-plugin-transform-react-class-to-function',
    );
  }

  if (IS_TEST) {
    plugins.push('babel-plugin-dynamic-import-node');
  }

  return {
    sourceType: 'unambiguous',
    presets,
    plugins,
  };
};
