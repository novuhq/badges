import 'dotenv/config';

import express, { Express } from 'express';

import imageRouter from '@/routers/image';

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/images', express.static('public/images'));

app.use('/api', imageRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
