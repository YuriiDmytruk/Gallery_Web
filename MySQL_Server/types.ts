type ResponseType = {
  statusCode: number;
  value:
    | ImageType
    | ImageType[]
    | UserType
    | UserType[]
    | number
    | string
    | null;
  errorMessage: string;
};

type ImageType = {
  _id: string;
  url: string;
  authorId: string;
  authorName: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
  score: number | null;
};

type UserType = {
  _id: string;
  email: string;
  password: string;
  nickName: string;
  friends: string[];
  createdAt: string;
  updatedAt: string;
};


export { ResponseType, ImageType, UserType };
