import {legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;