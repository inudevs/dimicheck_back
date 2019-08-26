import express, { json, urlencoded, static as Static } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connect } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import router from './routes';
import reset from './reset';

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  info: {
    // API informations (required)
    description: 'Dimicheck Api Document System',
    version: '1.0.0',
    title: 'Dimicheck API',
  },
  host: 'localhost:3000', // Host (optional)
  basePath: '/', // Base path (optional)
};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: ['./config/document.yaml'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.set('json spaces', 2);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(Static(join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', router);

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
