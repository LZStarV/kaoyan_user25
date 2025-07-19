import http from '../utils/http';
/**
 * @description 获得文章列表
 * @param 请求所携带的参数
 */
export const getArticle = (data) => http.get('/post/page', data);

/**
 * @description 获得文章详情
 * @param 文章的id
 */
export const getArticleDetail = (id) => {
  const data = http.get(`/post/${id}`);
  return data;
};

/**
 * @description 点赞文章
 * @param {id}文章的id
 */
export const likeArticle = (id) => {
  http.post(`/user/like/${id}`);
};

/**
 * @description 收藏文章
 * @param 参数有id:文章的id，type:1.资讯 2.院校
 */
export const starArticle = (data) => {
  http.post('/user/star', data);
};
