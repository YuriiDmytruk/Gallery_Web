import { ResponseType } from '../types';

const URL = 'http://localhost:4000/';

const getImages = async (
  userId: string,
  amount: string
): Promise<ResponseType> => {
  try {
    const response = await fetch(
      URL + `images/?author=${userId}&amount=${amount}`,
      {
        method: 'GET',
      }
    );
    if (response.ok) {
      const data: ResponseType = await response.json();
      if (data.statusCode === 200) {
        return data;
      }
      console.log(data.errorMessage);
      return data;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error: any) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const putUser = async (user: {
  email: string;
  password: string;
}): Promise<ResponseType> => {
  try {
    const response = await fetch(URL + 'users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });
    if (response.ok) {
      const data: ResponseType = await response.json();
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

const putScore = async (imageId: string, userId: string, score: number) => {
  try {
    const response = await fetch(URL + 'scores', {
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
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};

export { getImages, putUser, putScore };
