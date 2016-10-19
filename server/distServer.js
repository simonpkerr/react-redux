/*
this would be the server side react

- action - try to get server side rendering working here, and use the same api to get
the data then populate props

- how to serve routes server side? (handled by foundation react project)
*/

import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

/*
 1. in the node server layer, a route would be hit, resulting in a call
 to the orchestration layer to getCustomer via a local 'api' service
 that could be used again by the client

 2. the page would then be hydrated (?) and props populated to be used by the client app

 3. app renders

*/
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
