import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rottReducer from './root.reducer';

const middlewares = [logger];

const store = createStore(rottReducer, applyMiddleware(...middlewares));

export default store;
