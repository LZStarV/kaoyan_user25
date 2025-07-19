import http from '@/utils/http';
/**
 * @description 获得积分列表
 * @param 请求所携带的参数
 */
export const getPoint = (data) => http.get('/point/page', data);
