const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    'cms': './src/cms/index.js',
    'client': './src/client/index.js'
  },
  output: {
    path: './app/assets/javascripts',
    filename: '[name]/bundle.js'
  },
  module: {
    loaders: [
        {
          test: /\.(scss|css)$/,
          loader: ExtractTextPlugin.extract(
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader',
            'resolve-url',
            'sass'
          )
        },
        { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel' },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
        { test: /\.(png|jpg|gif|ico)$/, loaders: ['file?name=[name].[ext]'] }
    ]
  },

  postcss: [autoprefixer({ browsers: ['> 1%'] })],

  resolve: {
    root: path.resolve(__dirname),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    alias: {
      cmsActions: 'src/cms/actions',
      cmsComponents: 'src/cms/components',
      cmsCss: 'src/cms/css',
      clientActions: 'src/client/actions',
      clientComponents: 'src/client/components',
      sharedComponents: 'src/shared/components',
      shared: 'src/shared'
    }
  },
  
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new ExtractTextPlugin('../../assets/stylesheets/[name]/style.scss', { allChunks: true, ignoreOrder: true }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
