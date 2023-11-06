import { ActionType, UserType } from '../../types'

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';

const defaultState = {
    _id: '',
    email: '',
    password: '',
    nickName: '',
    friends: [],
    createdAt: '',
    updatedAt: '',
    __v: 0,
};

export const userReducer = (state = defaultState, action: ActionType) => {
    switch (action.type) {
      case ADD_USER:
        return { ...action.user };
      case DELETE_USER:
        return { ...defaultState };
      default:
        return state;
    }
  };

export const deleteUser = () : ActionType => {
  return { type: DELETE_USER };
};

export const addUser = (user: UserType) : ActionType => {
  return { type: ADD_USER, user: user };
};