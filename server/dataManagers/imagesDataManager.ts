import Image from '../models/image';
import { ImageType, ResponseType, MongoImageType } from '../types';
import { postImageScore, getAverageImageScore } from './imageScoresDataManager';
import { getAuthorName } from './usersDataManager';
import handleError from './utill';
import { create200Response } from './responseCreators';

const postImage = async ({
  url,
  authorId,
  authorName,
  description,
}: {
  url: string;
  authorId: string;
  authorName: string;
  description: string;
}): Promise<ResponseType> => {
  const image = new Image({ url, authorId, authorName, description });
  try {
    const result = await image.save();
    postImageScore(result.id);
    return create200Response(null);
  } catch (error) {
    return handleError(error);
  }
};

const getImagesByAuthor = async (authorId: string): Promise<ResponseType> => {
  try {
    const images = await Image.find({ authorId: authorId });
    const imagesWithScores: ImageType[] = await Promise.all(
      images.map(async (image) => await createImageWithScore(image.toObject()))
    );
    return create200Response(imagesWithScores);
  } catch (error) {
    return handleError(error);
  }
};

const getPopularImages = async (amount: number): Promise<ResponseType> => {
  try {
    const images = await Image.find({});

    let imagesWithScores: ImageType[] = await Promise.all(
      images.map(async (image) => await createImageWithScore(image.toObject()))
    );

    imagesWithScores.sort((a, b) => {
      if (a.score !== null && b.score !== null) {
        return b.score - a.score;
      } else if (a.score === null && b.score !== null) {
        return 1;
      } else if (a.score !== null && b.score === null) {
        return -1;
      } else {
        return 0;
      }
    });

    if (imagesWithScores.length > amount) {
      imagesWithScores = imagesWithScores.slice(0, amount);
    }

    return create200Response(imagesWithScores);
  } catch (error) {
    return handleError(error);
  }
};

const getImageByID = async (id: string): Promise<ResponseType> => {
  try {
    const image = await Image.findOne({ _id: id });
    let imageWithScore = null;
    if (image !== null) {
      imageWithScore = await createImageWithScore(image.toObject());
    }

    return create200Response(imageWithScore);
  } catch (error) {
    return handleError(error);
  }
};

const createImageWithScore = async (
  image: MongoImageType
): Promise<ImageType> => {
  const score = (await getAverageImageScore(image._id.toString())).value as
    | number
    | null;
  const name = (await getAuthorName(image.authorId.toString())).value as
    | string
    | null;
  return {
    ...image,
    score: score,
    _id: image._id.toString(),
    authorId: image.authorId.toString(),
    authorName: name,
    createdAt: image.createdAt.toString(),
    updatedAt: image.updatedAt.toString(),
  };
};

export { postImage, getImagesByAuthor, getPopularImages, getImageByID };
