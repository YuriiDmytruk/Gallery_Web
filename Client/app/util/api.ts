import { ImagePostType, ResponseType } from '../types';

// 'http://localhost:4000/'; MonoDB URL
// 'http://localhost:5000/'; MySQL URL

const URL = 'http://localhost:5000/';

const getImages = async (
  userId: string,
  amount: string
): Promise<ResponseType> => {
  return await fetchData(
    URL + `images/?author=${userId}&amount=${amount}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );
};

const postImage = async (image: ImagePostType): Promise<ResponseType> => {
  return await fetchData(URL + 'images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image }),
  });
};

const deleteImage = async (imageId: string): Promise<ResponseType> => {
  return await fetchData(URL + 'images', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageId }),
  });
};

const putUser = async (user: {
  email: string;
  password: string;
}): Promise<ResponseType> => {
  return await fetchData(URL + 'users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });
};

const putScore = async (
  imageId: string,
  userId: string,
  score: number
): Promise<ResponseType> => {
  return await fetchData(URL + 'scores', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      score: {
        imageId: imageId,
        userId: userId,
        score: score,
      },
    }),
  });
};

const getFriends = async (
  search: string,
  userId: string,
  key: string
): Promise<ResponseType> => {
  return await fetchData(
    URL + `users/?search=${search}&userId=${userId}&key=${key}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );
};

const patchFriend = async (userId: string, friendId: string, key: string) => {
  return await fetchData(URL + 'users', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: userId, friendId: friendId, key: key }),
  });
};

const fetchData = async (
  URL: string,
  fetchParams: any
): Promise<ResponseType> => {
  try {
    const response = await fetch(URL, fetchParams);
    if (response.ok) {
      const data: ResponseType = await response.json();
      console.log({...data})
      if (data.statusCode === 200) {
        return data;
      }
      console.log(data.errorMessage);
      return data;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};

export {
  getImages,
  putUser,
  putScore,
  postImage,
  deleteImage,
  getFriends,
  patchFriend,
};
