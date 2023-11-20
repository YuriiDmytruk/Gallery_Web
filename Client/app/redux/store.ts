import { createStore } from 'redux';
import { userReducer } from './ducks/user';

const store = createStore(userReducer);

export { store };