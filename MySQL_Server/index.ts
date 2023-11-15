import { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';

import {
  addImage,
  deleteImage,
  getImagesByAuthor,
  getImagesPopular,
} from './dataManagers/imagesManager';
import { create500Response } from './dataManagers/responseCreators';

dotenv.config();

const connection = require('./connection');
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
  console.log('GET IMAGES');
  const author = (req.query.author as string) || '';
  const amount = req.query.amount ? parseInt(req.query.amount as string) : 0;

  if (author === '') {
    try {
      const result = await getImagesPopular(connection, amount);
      res.send(result);
    } catch {
      res.send(create500Response());
    }
    return;
  }
  try {
    const result = await getImagesByAuthor(
      connection,
      parseInt(req.query.author as string)
    );
    res.send(result);
  } catch {
    res.send(create500Response());
  }
});

app.post('/images', async (req: Request, res: Response) => {
  console.log('POST IMAGE');
  try {
    const image = req.body.image;
    const result = await addImage(
      connection,
      image.authorId as number,
      image.authorName as string,
      image.description as string,
      image.url as string
    );
    console.log(result)
    res.send(result)
  } catch {
    res.send(create500Response());
  }
});

app.delete('/images', async (req: Request, res: Response) => {
  try{
    const result = await deleteImage(connection, req.body.imageId as number)
    res.send(result)
  }catch(error){
    console.log(error)
    res.send(create500Response())
  }
});

//-----  Users  -----

app.put('/users', async (req: Request, res: Response) => {});

app.post('/users', async (req: Request, res: Response) => {});

app.get('/users', async (req: Request, res: Response) => {});

app.patch('/users', async (req: Request, res: Response) => {});

//-----  Scores  -----

app.put('/scores', async (req: Request, res: Response) => {});



app.on('exit', () => {
  connection.end()
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
