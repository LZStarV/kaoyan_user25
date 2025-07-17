import http from '../utils/http';
/***
 * @description 获取资源信息
 *
 */
export const getResource = (data) => http.get('/resource/page', data);
/**
 * @description 根据id获取资源
 */
export const getResourceDetail = (id) => http.get(`/resource/${id}`);
/***
 * @description 根据id下载资源
 */
export const downLoadResource = (id) => http.get(`/resource/download/${id}`);
