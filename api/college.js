import http from '../utils/http';

/**
 * @description 获得院校列表
 * @param 请求所携带的参数
 */
export const getCollege = (data) => http.get('/school/page', data);
/**
 * @description 获得院校介绍
 * @param 请求所携带的院校id
 */
export const getCollegetIntro = (id) => http.get(`/school/info/${id}`);
/**
 * @description 获得院校信息（名字，头像...)
 * @param 请求所携带的院校id
 */
export const getCollegeInfo = (id) => http.get(`/school/${id}`);
/**
 * @description 获取专业
 * @param 请求所带的参数
 */
export const getCollegeSubject = (data) => http.get('/subject/page', data);
/**
 * @description 收藏文章
 * @param 参数有id:文章的id，type:1.资讯 2.院校
 */
export const starCollege = (data) => http.post('/user/star', data);
/**
 * @description 获取学科门类
 * @param 无参数
 */
export const getSubjectAll = () => http.get('/common/field-discipline/list');
