import { SWITCH_MENU_ITEM } from './actions';

// 默认 state
const defaultState = {
  userInfo: {},
  navigatorCurrent: 'index',
};

/**
 * reducer
 * @param state {Object} 传入的 state 值，存在默认值 defaultState
 * @param action {Object} action
 * @returns
 */
const reducer = (state: any = defaultState, action: any): any => {
  switch (action.type) {
    case SWITCH_MENU_ITEM: {
      // 深度拷贝state
      const newState = JSON.parse(JSON.stringify(state));
      newState.navigatorCurrent = action.key;
      return newState;
    }

    default:
      break;
  }
  return state;
};

export default reducer;
