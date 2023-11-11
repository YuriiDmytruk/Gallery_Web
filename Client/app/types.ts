type ActionType = {
  type: string;
  value?: UserType | UserType[] | ImageType | ImageType[] | string;
};

type ResponseType = {
  statusCode: number;
  value: ImageType[] | UserType | ImageType | UserType[];
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
  score: number;
  __v: number;
};

type ImagePostType = {
  url: string;
  authorId: string;
  authorName: string;
  description: string;
};

type UserState = {
  _id: string;
  email: string;
  password: string;
  nickName: string;
  friends: UserType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  images: ImageType[];
};

export type {
  ActionType,
  UserType,
  ImageType,
  ResponseType,
  ImagePostType,
  UserState,
};
