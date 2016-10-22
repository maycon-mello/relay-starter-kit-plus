import gulp from 'gulp';
import gutil from 'gulp-util';
import watch from 'gulp-watch';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import updateSchema from './build/updateSchema';

const APP_PORT = 3000;

var compiler = webpack({
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './src/index'
  ],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
   new webpack.HotModuleReplacementPlugin()
 ]
});

gulp.task('webpack-dev-server', function() {
  var app = new WebpackDevServer(compiler, {
    publicPath: '/static/',
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      assets: false,
      chunks: false
    }
  });
  // Serve static resources
  app.use('/', express.static(path.resolve(__dirname, 'public')));
  app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
  });
});


gulp.task('compile-schema', function() {
  console.log('Compiling schema');
  updateSchema().then(() => {
    console.log('Schema compiled');
  })
});

gulp.task('default', ['compile-schema', 'webpack-dev-server'], function() {
  gulp.watch('./src/data/**/*.js', ['compile-schema']);
})
