import { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';

import {
  addImage,
  deleteImage,
  getImagesByAuthor,
  getImagesPopular,
  scoreImage,
} from './dataManagers/imagesDataManager';
import { create500Response } from './dataManagers/responseCreators';
import {
  addFriend,
  addUser,
  deleteFriend,
  getUser,
  getUserFriends,
  searchUsers,
} from './dataManagers/usersDataManager';

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
      console.log('POPULAR');
      const result = await getImagesPopular(connection, amount);
      res.send(result);
      console.log('---------------');
    } catch {
      res.send(create500Response());
    }
    return;
  }
  try {
    console.log('AUTHOR');
    const result = await getImagesByAuthor(
      connection,
      parseInt(req.query.author as string)
    );
    res.send(result);
    console.log('---------------');
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
    res.send(result);
    console.log('---------------');
  } catch {
    res.send(create500Response());
  }
});

app.delete('/images', async (req: Request, res: Response) => {
  console.log('DELETE IMAGE');
  try {
    const result = await deleteImage(connection, req.body.imageId as number);
    res.send(result);
    console.log('---------------');
  } catch (error) {
    console.log(error);
    res.send(create500Response());
  }
});

//-----  Users  -----

app.put('/users', async (req: Request, res: Response) => {
  console.log('GET USER');
  try {
    const result = await getUser(
      connection,
      req.body.user.email,
      req.body.user.password
    );
    res.send(result);
    console.log('---------------');
  } catch (error) {
    console.log(error);
    res.send(create500Response());
  }
});

app.post('/users', async (req: Request, res: Response) => {
  console.log('POST USER');
  try {
    const result = await addUser(
      connection,
      req.body.user.email,
      req.body.user.password,
      req.body.user.nickName
    );
    res.send(result);
    console.log('---------------');
  } catch (error) {
    console.log(error);
    res.send(create500Response());
  }
});

app.get('/users', async (req: Request, res: Response) => {
  console.log('GET USERS');
  const search = req.query.search;
  const userId = req.query.userId;
  const key = req.query.key;

  if (key === 'search') {
    try {
      const result = await searchUsers(connection, search as string, userId as string);
      res.send(result);
      console.log('---------------');
    } catch (error) {
      console.log(error);
      res.send(create500Response());
    }
  } else {
    try {
      const result = await getUserFriends(connection, userId as string);
      res.send(result);
      console.log('---------------');
    } catch (error) {
      console.log(error);
      res.send(create500Response());
    }
  }
});

app.patch('/users', async (req: Request, res: Response) => {
  console.log('PATCH USER');
  if (req.body.key === 'add') {
    try {
      const result = await addFriend(
        connection,
        req.body.userId,
        req.body.friendId
      );
      res.send(result);
      console.log('---------------');
    } catch (error) {
      console.log(error);
      res.send(create500Response());
    }
  } else {
    try {
      const result = await deleteFriend(
        connection,
        req.body.userId,
        req.body.friendId
      );
      res.send(result);
      console.log('---------------');
    } catch (error) {
      console.log(error);
      res.send(create500Response());
    }
  }
});

//-----  Scores  -----

app.put('/scores', async (req: Request, res: Response) => {
  console.log('PUT SCORE');
  try {
    const result = scoreImage(
      connection,
      req.body.score.imageId,
      req.body.score.userId,
      req.body.score.score
    );
    res.send(result)
    console.log('---------------');
  } catch (error) {
    console.log(error);
    res.send(create500Response());
  }
});

app.on('exit', () => {
  connection.end();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
