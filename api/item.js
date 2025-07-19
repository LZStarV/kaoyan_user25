import http from '../utils/http';
/**
 * @description 获取物品分类信息
 */
export const getNavList = () => http.get('/item-type/list');
/**
 * @description 获取所有物品(可以传入分类id)
 * @param 分类Id
 */
export const getItemList = (id) => http.get('/item/list', { id });
/**
 * @description 兑换物品
 * @param 物品的id
 */
export const exchangeItem = (id) =>
  http.post(`/user/item/${id}`, {}, { isLoading: false });
