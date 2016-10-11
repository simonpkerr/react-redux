import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

fs.readFile('src/index.html', 'utf-8', (err, markup) => {
  if (err) {
    return console.log(err.red);
  }

  // loads the file into an in-memory dom that can be
  // queried using jquery style selectors
  const $ = cheerio.load(markup);

  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf-8', function (err) {
    if (err) {
      return console.log(err.red);
    }

    console.log('index.html written to dist'.green);
  });
});
