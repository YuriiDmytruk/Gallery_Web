import { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';

const mongoose = require('./connection');

import {
  postImage,
  getImagesByAuthor,
  getPopularImages,
} from './dataManagers/imagesDataManager';
import { putScore } from './dataManagers/imageScoresDataManager';
import {
  postUser,
  getUser,
  getFriends,
  searchUser,
  addFriend,
  deleteFriend,
} from './dataManagers/usersDataManager';

dotenv.config();

const app: Express = express();
const port = 4000;

app.use(bodyParser.json());
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//-----  Images  -----

app.get('/images', async (req: Request, res: Response) => {
  console.log('GET images');
  let result;

  const author = (req.query.author as string) || '';
  const amount = req.query.amount ? parseInt(req.query.amount as string) : 0;
  if (author !== '') {
    result = await getImagesByAuthor(author);
  } else {
    result = await getPopularImages(amount);
  }

  res.send(result);
});

app.post('/images', async (req: Request, res: Response) => {
  console.log('POST image');
  const result = await postImage({ ...req.body.image });
  res.send(result);
});

//-----  Users  -----

app.put('/users', async (req: Request, res: Response) => {
  console.log('GET user');
  const result = await getUser({ ...req.body.user });
  res.send(result);
});

app.post('/users', async (req: Request, res: Response) => {
  console.log('POST user');
  const result = await postUser({ ...req.body.user });
  res.send(result);
});

app.get('/users', async (req: Request, res: Response) => {
  console.log('GET users');
  let result;

  const search = req.query.search;
  const userId = req.query.userId;
  const key = req.query.key;
  let friends = req.query.friends;

  if (friends !== undefined && friends !== '') {
    if (key !== undefined && key === 'search') {
      result = await searchUser(
        search as string,
        friends as string[],
        userId as string
      );
      res.send(result);
      return;
    }
    friends = JSON.parse(friends.toString()) as string[];
    result = await getFriends(friends);
    res.send(result);
    return;
  }
  res.send(null);
});

app.patch('/users', async (req: Request, res: Response) => {
  console.log('PATCH user');
  let result;
  if (req.body.key === 'add') {
    result = await addFriend(req.body.userId, req.body.friendId);
  } else {
    result = await deleteFriend(req.body.userId, req.body.friendId);
  }
  res.send(result);
});

//-----  Scores  -----

app.put('/scores', async (req: Request, res: Response) => {
  console.log('PUT score');
  const result = await putScore({ ...req.body.score });
  res.send(result);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
