import { SWITCH_MENU_ITEM, CHANGE_USERINFO } from './actions';

// 加载本地的 state 进行 defaultState 的初始化
// const loadUserInfo = () => {
//   const local = getUserInfo();
//   console.log(local);
//   return local;
// };

// 默认 state
const defaultState = {
  userInfo: {
    isAdmin: false,
  },
  navigatorCurrent: 'index',
};

/**
 * 更新 state
 * @param oldState 更新之前的 state
 * @param newState 要添加的 state
 * @returns 更新之后的 state
 */
export function updateState(oldState: any, newState: any) {
  return Object.assign({}, oldState, newState);
}

/**
 * reducer
 * @param state {Object} 传入的 state 值，存在默认值 defaultState
 * @param action {Object} action
 * @returns
 */
const reducer = (state: any = defaultState, action: any): (() => {}) => {
  switch (action.type) {
    case SWITCH_MENU_ITEM: {
      // 深度拷贝state
      // const newState = JSON.parse(JSON.stringify(state));
      return Object.assign({}, state, { navigatorCurrent: action.key });
    }

    case CHANGE_USERINFO: {
      // const newState = JSON.parse(JSON.stringify(state));
      // newState.userInfo = action.user;
      // return newState;
      // return Object.assign({}, state, { userInfo: action.user });
      return updateState(state, { userInfo: action.user });
    }

    default:
      return state;
  }
};

export default reducer;
