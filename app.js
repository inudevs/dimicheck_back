import express, { static as Static, json, urlencoded } from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import logger from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import reset from './reset';
import router from './routes';

// Swagger
const swaggerDefinition = {
  info: {
    // 설명
    description: 'Dimicheck Api Document System',
    // 버전
    version: '1.0.0',
    // 제목
    title: 'Dimicheck API',
  },
  // 주소
  host: 'localhost:3000',
  basePath: '/api',
};

const options = {
  swaggerDefinition,
  apis: ['./config/document.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.set('json spaces', 2);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(Static(join(__dirname, 'public')));

// Swagger 주소
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// api 주소
app.use('/api', router);

// mongodb 연결
connect(
  'mongodb://localhost:27017/test',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      throw err;
    }
    console.log('mongodb conncected');
    reset.start();
  },
);

export default app;
