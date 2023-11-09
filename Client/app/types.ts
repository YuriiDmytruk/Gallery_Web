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
  score: number;
  __v: number;
};

type ImagePostType = {
  url: string;
  authorId: string;
  authorName: string;
  description: string;
}

export type { ActionType, UserType, ImageType, ResponseType, ImagePostType};
