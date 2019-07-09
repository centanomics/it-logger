import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import roodReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  roodReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
