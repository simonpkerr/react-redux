/*eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production';

console.log('Gen minified bundle for prod via webpack'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(w => console.log(w.yellow));
  }

  console.log ('webpack stats: ${stats}');

  console.log ('app built and compiled, mo fo!'.green);

  return 0;

});
