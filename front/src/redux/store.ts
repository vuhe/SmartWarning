import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';

// 增强函数写法
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const enhancer = composeEnhancers(applyMiddleware());
const store = createStore(reducer, enhancer);

export default store;
