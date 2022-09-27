import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/index';
import { applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(thunk));
export default function configStore() {
  return configureStore({reducer:rootReducer},middleware);
}