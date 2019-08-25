import express, { json, urlencoded, static as Static } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connect } from 'mongoose';
import router from './routes';
import reset from './reset';

const app = express();

app.set('json spaces', 2);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(Static(join(__dirname, 'public')));

app.use('/', router);

connect(
  'mongodb://localhost:27017/test',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log('mongodb conncected');
    reset.start();
  },
);

export default app;
