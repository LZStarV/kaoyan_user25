// 导入封装的 网络请求模块实例
import http from '../utils/http'

/**
 * @description 获得轮播图
 * @param 无参数
 */
export const getCarousel = () => {
  return  http.get('/carousel/list')
}
/**
 * @description 资讯类型
 * @param 无参数
 */
export const getListType=()=>{
  return http.get('/post-type/list')
}
/**
 * @description 判断是否签到
 * @param 无参数
 */
export const juedgeIsSign=()=>{
  return http.get('/user/isSign')
}

/**
 * @description 签到
 * @param 无参数
 */
export const signToday=()=>{
  return http.post('/user/sign',{ header:{ 'Content-type':'application/json'},})
}