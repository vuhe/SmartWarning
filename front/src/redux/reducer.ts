import { SWITCH_MENU_ITEM } from './actions';

// 默认 state
const defaultState = {
  userInfo: {},
  navigator_current: 'index',
};

/**
 * reducer
 * @param state {Object} 传入的 state 值，存在默认值 defaultState
 * @param action {Object} action
 * @returns
 */
const reducer = (state: {} = defaultState, action: any) => {
  switch (action.type) {
    case SWITCH_MENU_ITEM: {
      // 深度拷贝state
      let newState = JSON.parse(JSON.stringify(state));
      newState.navigator_current = action.key;
      return newState;
    }

    default:
      break;
  }
  return state;
};

export default reducer;
