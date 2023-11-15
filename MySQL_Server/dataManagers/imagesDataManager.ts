import { Connection } from 'mysql2';

import { ImageType, ResponseType } from '../types';
import { create200Response, create404Response } from './responseCreators';

const getImagesByAuthor = (
  connection: Connection,
  authorId: number
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `CALL getImagesByAuthor(${authorId})`,
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

const getImagesPopular = (
  connection: Connection,
  amount: number
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `CALL getImagesPopular(${amount})`,
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

const addImage = (
  connection: Connection,
  authorId: number,
  authorName: string,
  description: string,
  url: string
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT 
    addImage(${authorId},'${authorName}','${url}','${description}')
    as imageId`,
      (err: any, result: any) => {
        if (err) {
          reject(create404Response(err));
        } else {
          resolve(
            create200Response({
              _id: result[0].imageId.toString(),
              authorId: authorId.toString(),
              authorName: authorName,
              url: url,
              description: description,
            } as ImageType)
          );
        }
      }
    );
  });
};

const deleteImage = (
  connection: Connection,
  imageId: number
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT deleteImage(${imageId}) as res`,
      (err: any, result: any) => {
        if (err) {
          reject(create404Response(err));
        } else {
          if (result[0].res === 1) {
            resolve(create200Response(null));
          } else {
            resolve(create404Response('No image with this ID'));
          }
        }
      }
    );
  });
};

const scoreImage = (
  connection: Connection,
  imageId: string,
  userId: string,
  score: number
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT scoreImage(${score}, ${imageId}, ${userId}) as res`,
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

export {
  getImagesByAuthor,
  getImagesPopular,
  addImage,
  deleteImage,
  scoreImage,
};
