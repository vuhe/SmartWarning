import { SWITCH_MENU_ITEM, CHANGE_USERINFO } from './actions';

/**
 * 返回改变顶部 navigator 菜单栏选项 action
 * @param key {string}
 * @returns action
 */
export const changeMenuitemActionCreator = (key: string) => ({
  type: SWITCH_MENU_ITEM,
  key,
});

/**
 * 返回用户信息的 action
 * @param user 用户信息
 * @returns action
 */
export const changeUserInfoActionCreator = (user: any) => ({
  type: CHANGE_USERINFO,
  user,
});
