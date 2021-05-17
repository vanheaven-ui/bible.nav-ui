import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancer = composeWithDevTools(middlewareEnhancer);

const store = createStore(rootReducer, undefined, composedEnhancer);

export default store;
