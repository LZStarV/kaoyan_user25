import http from '../utils/http'

/***
 * @description 获取真题信息
 * 
 */
export const getExam=(data)=>{
  return http.get('/paper/page',data)
}
/**
 * @description 根据id获取真题
 */
export const getExamDetail=(id)=>{
  return http.get(`/paper/${id}`)
}
/***
 * @description 根据id下载真题
 */
export const downLoadPaper=(id)=>{
  return http.get(`/paper/download/${id}`)
}