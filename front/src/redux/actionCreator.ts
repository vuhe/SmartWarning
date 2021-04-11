import { SWITCH_MENU_ITEM } from './actions';

/**
 * 返回改变顶部 navigator 菜单栏选项 action
 * @param key {string}
 * @returns action
 */
export const changeMenuitemActionCreator = (key: string) => ({
  type: SWITCH_MENU_ITEM,
  key,
});
