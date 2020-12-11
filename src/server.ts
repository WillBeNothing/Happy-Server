import express from 'express';
import 'express-async-errors';
import { resolve } from 'path';

import './database/connections';
import routes from './routes';
import errorhandler from './errors/Handler';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/images', express.static(resolve(__dirname, '..', 'uploads')));
app.use(errorhandler);

app.listen(3333, '192.168.0.110');

export default app;
