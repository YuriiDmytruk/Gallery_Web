import { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';

import { getImagesByAuthor } from './dataManagers/imagesManager';

dotenv.config();

const app: Express = express();
const port = 5000;

app.use(bodyParser.json());
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//-----  Images  -----

app.get('/images', async (req: Request, res: Response) => {
    getImagesByAuthor(1)
    res.send("hello from Get");
});

app.post('/images', async (req: Request, res: Response) => {
  
});

app.delete('/images', async (req: Request, res: Response) => {
  
});

//-----  Users  -----

app.put('/users', async (req: Request, res: Response) => {
  
});

app.post('/users', async (req: Request, res: Response) => {
  
});

app.get('/users', async (req: Request, res: Response) => {

});

app.patch('/users', async (req: Request, res: Response) => {

});

//-----  Scores  -----

app.put('/scores', async (req: Request, res: Response) => {

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
