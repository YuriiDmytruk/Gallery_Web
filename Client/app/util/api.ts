type ServerResponseType = {
    statusCode: number,
    value: any,
    errorMessage: string,
}

const URL = 'http://localhost:4000/';

const getImages = async (userId: string, amount: string) => {
    try {
      const response = await fetch(
        URL + `images/?author=${userId}&amount=${amount}`,
        {
          method: 'GET',
          cache: 'no-store'
        }
      );
      if (response.ok) {
        const data : ServerResponseType = await response.json();
        if (data.statusCode === 200) {
          return data.value;
        }
        console.log(data.errorMessage);
        return [];
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error: any) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const putUser = async (user: {email: string, password: string}) => {
    try {
      const response = await fetch(URL + 'users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      });
      if (response.ok) {
        const data : ServerResponseType = await response.json();
        if (data.statusCode === 200) {
          return data.value;
        }
        console.log(data.errorMessage);
        return null;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error: any) {
      console.error('Fetch error:', error.message);
      throw error;
    }
  };
  

export {getImages, putUser}
