import {
  SWITCH_MENU_ITEM,
  CHANGE_USERINFO,
  CHANGE_STORE_STATE,
  CHANGE_DRIVE_INFO,
} from './actions';

/**
 * 返回改变顶部 navigator 菜单栏选项 action
 * @param key {string}
 * @returns {action} action
 */
export const changeMenuitemActionCreator = (key: string) => ({
  type: SWITCH_MENU_ITEM,
  key,
});

/**
 * 返回用户信息的 action
 * @param user 用户信息
 * @returns {action} action
 */
export const changeUserInfoActionCreator = (user: any) => ({
  type: CHANGE_USERINFO,
  user,
});

/**
 * 返回修改整个 store 的 action
 * @param state redux 的状态 state
 * @returns {action} action
 */
export const changeStoreStateActionCreator = (state?: any) => ({
  type: CHANGE_STORE_STATE,
  state,
});

/**
 * 返回设备信息数组的 action
 * @param drives 设备信息数组
 * @returns {action} action
 */
export const changeDriveInfoActionCreator = (drives: any[]) => ({
  type: CHANGE_DRIVE_INFO,
  drives,
});
