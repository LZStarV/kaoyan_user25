import http from '../utils/http';

/***
 * @description 获取真题信息
 *
 */
export const getExam = (data) => http.get('/paper/page', data);
/**
 * @description 根据id获取真题
 */
export const getExamDetail = (id) => http.get(`/paper/${id}`);
/***
 * @description 根据id下载真题
 */
export const downLoadPaper = (id) => http.get(`/paper/download/${id}`);
