import http from '../utils/http'

/***
 * @description 获取国家线信息
 * 
 */
export const getLine=(data)=>{
  return http.get('/line/page',data)
}