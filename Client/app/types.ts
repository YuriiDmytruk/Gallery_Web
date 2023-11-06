type ActionType = {
  type: string;
  user?: UserType;
};

type ResponseType = {
  statusCode: number;
  value: ImageType[] | UserType;
  errorMessage: string;
};

type UserType = {
  _id: string;
  email: string;
  password: string;
  nickName: string;
  friends: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type ImageType = {
  _id: string;
  url: string;
  authorId: string;
  authorName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type { ActionType, UserType, ImageType, ResponseType};
