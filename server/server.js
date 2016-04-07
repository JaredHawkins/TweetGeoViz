/*eslint no-console:0*/
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import fs from 'fs';
import moment from 'moment';
import consoleStamp from 'console-stamp';
import * as config from './config/config.js';
import authRequest from './middlewares/authRequest.js';
import allowCORSHandler from './middlewares/allowCORS.js';
import notFoundRequest from './middlewares/notFound.js';
import logErrorsHandler from './middlewares/logErrors.js';
import errorHandler from './middlewares/serverError.js';
import db from './store/db.js';

let { port = 3000 } = config;

const {
  ip = 'localhost',
  apiPrefix = 'api',
  apiVersion = 'v1'
} = config;

const app = express();

consoleStamp(console, { pattern: 'dd/mmm/yyyy:HH:MM:ss o' });

logger.token('date', () => moment().format('DD/MMM/YYYY:HH:mm:ss ZZ'));

app.use(logger('common'));
app.use(bodyParser.json());

app.use('/*', allowCORSHandler);
app.use(`${apiPrefix}/*`, authRequest);
app.use([apiPrefix + apiVersion, apiPrefix], routes);
app.use(notFoundRequest);

app.use(logErrorsHandler);
app.use(errorHandler);

// connect to mongodb
db.connect();

// set the port for the webservice
if (process.argv.length > 2) {
  port = process.argv[2];
}

// set process title
if (process.argv.length > 3) {
  process.title = process.argv[3];
}

// output process pid into a file
// This argument works ONLY for linux.
// Adding this argument only because at the moment cannot retreive a proper pid for the process
// Should be moved away in the future
if (process.argv.length > 4) {
  fs.writeFile(process.argv[4], process.pid);
}

// Start the server
app.set('port', port);
app.listen(app.get('port'), ip, () => {
  console.log(`WebService has started on ${ip}:${port}`);
});
