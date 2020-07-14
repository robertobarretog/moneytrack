import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};

const middleware = applyMiddleware(thunk);

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : null || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(middleware)
);

export default store;
