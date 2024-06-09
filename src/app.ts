import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
// import config from './app/config';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// applications
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler);

// NOt Found
app.use(notFound);

export default app;
