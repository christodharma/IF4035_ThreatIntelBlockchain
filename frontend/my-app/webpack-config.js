const path = require('path');

module.exports = {
  resolve: {
    alias: {
      // Alias 'react-native' to 'react-native-web' for web builds
      'react-native$': require.resolve('react-native-web'),
    },
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx'], // Add .web.js extension for web-specific files
  },
};

module.rules = [
    {
        test: /\.js$/,
        exclude: /node_modules[/\\](?!react-native-vector-icons)/,
        use: {
          loader: 'babel-loader',
          options: {
            // Disable reading babel configuration
            babelrc: false,
            configFile: false,
      
            // The configuration for compilation
            presets: [
              ['@babel/preset-env', { useBuiltIns: 'usage' }],
              '@babel/preset-react',
              '@babel/preset-flow',
              "@babel/preset-typescript"
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread'
            ],
          },
        },
    },
    {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        type: 'asset/resource'
    }
]