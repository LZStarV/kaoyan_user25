import http from '../utils/http'

/***
 * @description 获取专业信息
 * 
 */
export const getSubject=(data)=>{
  return http.get('/subject/page',data)
}