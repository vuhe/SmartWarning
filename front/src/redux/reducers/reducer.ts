import {
  SWITCH_MENU_ITEM,
  CHANGE_USERINFO,
  CHANGE_STORE_STATE,
  CHANGE_DRIVE_INFO,
  CHANGE_RISK_FACTOR,
} from '../actions/actions';

// 默认 state
const defaultState = {
  userInfo: {
    isAdmin: false,
  },
  navigatorCurrent: 'index',
  drivesRealtimeList: new Map<number, any>(),
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
const reducer = (state: any = defaultState, action: any): any => {
  switch (action.type) {
    case SWITCH_MENU_ITEM: {
      return updateState(state, { navigatorCurrent: action.key });
    }
    case CHANGE_USERINFO: {
      return updateState(state, { userInfo: action.user });
    }
    case CHANGE_STORE_STATE: {
      return action.state || {};
    }
    case CHANGE_DRIVE_INFO: {
      return updateState(state, { drives: action.drives });
    }
    case CHANGE_RISK_FACTOR: {
      return updateState(state, { drivesRiskFactor: action.drivesRiskFactor });
    }

    default:
      return state;
  }
};

export default reducer;
