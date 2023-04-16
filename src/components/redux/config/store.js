import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ListReducer from '../reducer';

const reducer = combineReducers({
  ListReducer,
});

const store = configureStore({
  reducer,
});

export default store;
