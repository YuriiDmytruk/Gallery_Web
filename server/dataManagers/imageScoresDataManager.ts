import ImageScores from '../models/imageScores';
import { ResponseType } from '../types';
import handleError from './utill';
import { create200Response, create404Response } from './responseCreators';

const postImageScore = async (imageId: string): Promise<ResponseType> => {
  const imageScore = new ImageScores({ imageId, userScores: [] });
  try {
    const result = await imageScore.save();
    return create200Response(null);
  } catch (error) {
    return handleError(error);
  }
};

const getAverageImageScore = async (imageId: string): Promise<ResponseType> => {
  try {
    const imageScores = await ImageScores.find({ imageId: imageId });
    const imageScore = imageScores[0];
    if (imageScore.userScores.length === 0) {
      return create200Response(0);
    }

    const totalScore = imageScore.userScores.reduce((sum, scoreObject) => {
      const score = scoreObject.score ?? 0;
      return sum + score;
    }, 0);

    const averageScore = totalScore / imageScore.userScores.length;

    return create200Response(averageScore);
  } catch (error) {
    return handleError(error);
  }
};

const putScore = async ({
  imageId,
  userId,
  score,
}: {
  imageId: string;
  userId: string;
  score: number;
}): Promise<ResponseType> => {
  try {
    const imageScore = await ImageScores.findOne({ imageId: imageId });

    if (imageScore) {
      let scores = imageScore.userScores;

      if (
        scores.some(
          (score) => score.userId && score.userId.toString() === userId
        )
      ) {
        const index = scores.findIndex(
          (score) => score.userId && score.userId.toString() === userId
        );

        if (index !== -1) {
          scores[index] = { ...scores[index], score: score };
          await ImageScores.updateOne(
            { _id: imageScore.id },
            { $set: { userId: userId, userScores: scores } }
          );
        } else {
          return create404Response('Image not found');
        }
      } else {
        await ImageScores.updateOne(
          { _id: imageScore.id },
          { $push: { userScores: { userId: userId, score: score } } }
        );
      }
      return create200Response(null);
    } else {
      return create404Response('Image not found');
    }
  } catch (error) {
    return handleError(error);
  }
};

export { postImageScore, getAverageImageScore, putScore };
