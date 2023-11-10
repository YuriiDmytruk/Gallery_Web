import { ActionType, ImageType, UserState, UserType } from '../../types';

const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const SET_IMAGES = 'SET_IMAGES';
const ADD_IMAGE = 'ADD_IMAGE';
const DELETE_IMAGE = 'DELETE_IMAGE';

const defaultState: UserState = {
  _id: '',
  email: '',
  password: '',
  nickName: '',
  friends: [],
  createdAt: '',
  updatedAt: '',
  __v: 0,
  images: [],
};

export const userReducer = (state = defaultState, action: ActionType) => {
  switch (action.type) {
    case ADD_USER:
      return { ...(action.value as UserType), images: [] };
    case DELETE_USER:
      return { ...defaultState };
    case SET_IMAGES:
      return { ...state, images: action.value as ImageType[] };
    case ADD_IMAGE:
      return {
        ...state,
        images: state.images.concat(action.value as ImageType),
      };
    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter(
          (image) => image._id !== (action.value as string)
        ),
      };
    default:
      return state;
  }
};

export const setImages = (images: ImageType[]): ActionType => {
  return { type: SET_IMAGES, value: images };
};

export const addImage = (image: ImageType): ActionType => {
  return { type: ADD_IMAGE, value: image };
};

export const deleteImage = (imageId: string): ActionType => {
  return { type: DELETE_IMAGE, value: imageId };
};

export const deleteUser = (): ActionType => {
  return { type: DELETE_USER };
};

export const addUser = (user: UserType): ActionType => {
  return { type: ADD_USER, value: user };
};
