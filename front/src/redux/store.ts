import { createStore } from 'redux'; // compose
import reducer from './reducers/reducer';

// 增强函数写法
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 从本地存储中还原 state
export const loadDefaultState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    return JSON.parse(serializedState || '');
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * 保存 state 到本地缓存中
 * @param state
 */
export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.error(error);
  }
};

// 初始化 store 时设置从本地缓存中加载 defaultState
const store = createStore(
  reducer,
  loadDefaultState(),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
