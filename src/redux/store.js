import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rottReducer from './root.reducer';

const middlewares = [logger];

export const store = createStore(rottReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };
