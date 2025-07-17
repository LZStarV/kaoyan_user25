//导入封装的网络请求模块实例
import http from '../utils/http';

/**
 * @description 用来获取首页轮播图数据
 */
export const reqSwiperData = () => http.get('/index/findBanner');
