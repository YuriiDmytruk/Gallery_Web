import { Connection } from 'mysql2';

import { ImageType, ResponseType, UserType } from '../types';
import {
  create200Response,
  create403Response,
  create404Response,
} from './responseCreators';

const getUser = (
  connection: Connection,
  email: string,
  password: string
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `CALL getUser('${email}', '${password}')`,
      (err: any, result: any) => {
        if (err) {
          reject(create404Response(err));
        } else {
          if (result[0][0].message !== undefined) {
            resolve(create403Response());
          }
          resolve(create200Response({...result[0][0], _id: result[0][0]._id.toString() }));
        }
      }
    );
  });
};

const addUser = (
  connection: Connection,
  email: string,
  password: string,
  nickName: string
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT addUser('${email}', '${password}', '${nickName}') as userId`,
      (err: any, result: any) => {
        if (err) {
          reject(create404Response(err));
        } else {
          resolve(
            create200Response({
              _id: result[0].userId,
              email: email,
              password: password,
              nickName: nickName,
            } as UserType)
          );
        }
      }
    );
  });
};

const searchUsers = (
  connection: Connection,
  search: string,
  userId: string
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `CALL searchUsers('${search}', ${userId})`,
      (err: any, result: any) => {
        if (err) {
          reject(create404Response(err));
        } else {
          resolve(create200Response(result[0]));
        }
      }
    );
  });
};

const getUserFriends = (
  connection: Connection,
  userId: string
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `CALL getUserFriends(${userId})`,
      (err: any, result: any) => {
        if (err) {
          reject(create404Response(err));
        } else {
          resolve(create200Response(result[0]));
        }
      }
    );
  });
};

const addFriend = (
  connection: Connection,
  userId: string,
  friendId: string
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT addFriend(${userId}, ${friendId})`,
      (err: any, result: any) => {
        if (err) {
          reject(create404Response(err));
        } else {
          resolve(create200Response(null));
        }
      }
    );
  });
};

const deleteFriend = (
    connection: Connection,
    userId: string,
    friendId: string
  ): Promise<ResponseType> => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT deleteFriend(${userId}, ${friendId})`,
        (err: any, result: any) => {
          if (err) {
            reject(create404Response(err));
          } else {
            resolve(create200Response(null));
          }
        }
      );
    });
  };

export { getUser, addUser, searchUsers, getUserFriends, addFriend, deleteFriend };
