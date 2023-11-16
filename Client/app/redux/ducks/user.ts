import { ActionType, ImageType, UserState, UserType } from '../../types';

const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const SET_IMAGES = 'SET_IMAGES';
const ADD_IMAGE = 'ADD_IMAGE';
const DELETE_IMAGE = 'DELETE_IMAGE';
const SET_FRIENDS = 'SET_FRIENDS';
const ADD_FRIEND = 'ADD_FRIEND';
const DELETE_FRIEND = 'DELETE_FRIEND';

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
      return { ...(action.value as UserType), images: [], friends: [] };
    case DELETE_USER:
      return { ...defaultState };
    case SET_IMAGES:
      console.log(action.value)
      return { ...state, images: action.value as ImageType[] };
    case ADD_IMAGE:
      console.log(state)
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
    case SET_FRIENDS:
      return { ...state, friends: action.value as UserType[] };
    case ADD_FRIEND:
      return {
        ...state,
        friends: state.friends.concat(action.value as UserType),
      };
    case DELETE_FRIEND:
      return {
        ...state,
        friends: state.friends.filter(
          (friend) => friend._id !== (action.value as string)
        ),
      };
    default:
      return state;
  }
};

export const setFriends = (friends: UserType[]): ActionType => {
  return { type: SET_FRIENDS, value: friends };
};

export const addFriend = (friend: UserType): ActionType => {
  return { type: ADD_FRIEND, value: friend };
};

export const deleteFriend = (friendId: string): ActionType => {
  return { type: DELETE_FRIEND, value: friendId };
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
