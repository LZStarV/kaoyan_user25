//创建WxRequest类
//通过类的方式来进行封装，会让代码更加具有复用性
//也可以方便添加新的属性和方法

class WxRequest {
  //定义实例属性，用来设置默认请求参数
  defaults = {
    baseURL: '', //请求基准地址
    url: '', //接口的请求路径
    data: null, //请求参数
    method: 'GET', //默认的请求方法
    //请求头
    header: {
      'Content-type': 'application/x-www-form-urlencoded', //设置数据的交互格式
    },
    timeout: 60000, //默认的超时时长，小程序默认的超时时长是1分钟
    isLoading: true, //控制是否使用默认的loading，默认值是true，表示使用默认的loading
  };

  //定义数组队列
  //初始值需要是一个空数组，用来存储请求队列，存储请求标识
  queue = [];

  //用于创建和初始化类的属性和方法
  //在实例化时传入的参数，会被constructor形参进行接收
  constructor(params = {}) {
    //注意：需要传入的参数，覆盖默认的参数，因此传入的参数需要放到最后
    this.defaults = Object.assign({}, this.defaults, params);
  }

  //定义拦截器对象
  //需要包含请求拦截器以及响应拦截器，方便在请求之前以及响应以后进行逻辑处理
  interceptors = {
    //请求拦截器
    //在请求发送之前，对请求参数进行新增或者修改
    request: (config) => config,

    //响应拦截器
    //在服务器响应数据以后，对服务器响应的数据进行逻辑处理
    response: (response) => response,
  };

  request(options) {
    //如果有新的请求，就清除上一次的id
    this.timerId && clearTimeout(this.timerId);

    //需要使用Promise封装wx.request，处理异步请求
    options.url = this.defaults.baseURL + options.url;

    //合并请求参数
    options = { ...this.defaults, ...options };

    //在请求发送之前，添加loading效果
    // wx.showLoading()

    if (options.isLoading && options.method !== 'UPLOAD') {
      //判断queue队列是否为空，如果是空，就显示loading
      //如果不是空，就不显示loading,不调用wx.showLoading()
      this.queue.length === 0 && wx.showLoading();

      //然后立即向queue数组队列中添加请求标识
      //每个标识代表一个请求，标识是自定义的
      this.queue.push('request');
    }

    //在请求发送之前，调用请求拦截器，新增和修改请求参数
    options = this.interceptors.request(options);
    // debugger;
    //需要使用Promise封装wx.request,处理异步请求
    return new Promise((resolve, reject) => {
      if (options.method === 'UPLOAD') {
        wx.uploadFile({
          ...options,
          success: (res) => {
            //需要将服务器返回的JSON字符串通过JSON.parse转成对象
            res.data = JSON.parse(res.data);

            //合并参数
            const mergeRes = Object.assign({}, res, {
              config: options,
              isSuccess: true,
            });
            resolve(this.interceptors.response(mergeRes));
          },

          fail: (err) => {
            //合并参数
            const mergeErr = Object.assign({}, err, {
              config: options,
              isSuccess: false,
            });
            reject(this.interceptors.response(mergeErr));
          },
        });
      } else {
        wx.request({
          ...options,

          //当接口调用成功时会触发success回调函数
          success: (res) => {
            //不管是成功响应还是失败响应，都需要调用响应拦截器
            //响应拦截器需要接收服务器响应的数据，然后对数据进行逻辑处理，处理好以后进行返回
            //然后再通过resolve将返回的数据抛出去

            //在给响应拦截器传递参数时，需要将请求参数也一起传递
            //方便进行代码的调试或者进行其他逻辑处理，需要先合并参数
            //然后将合并的参数传递给响应拦截器

            //不管是请求失败还是请求成功，都已经将相应的数据传递给了相应拦截器
            //这时候在合并参数的时候，追加一个属性：isSuccess
            //如果属性值为true,说明执行了success回调函数
            //如果属性值为false,说明执行了fail回调函数
            const mergeRes = Object.assign({}, res, {
              config: options,
              isSuccess: true,
            });
            resolve(this.interceptors.response(mergeRes));
          },

          //当接口调用失败时会触发fail回调函数
          fail: (err) => {
            //不管是成功响应还是失败响应，都需要调用响应拦截器
            const mergeErr = Object.assign({}, err, {
              config: options,
              isSuccess: false,
            });
            reject(this.interceptors.response(mergeErr));
          },

          //接口调用结束的回调函数（调用成功，失败都会执行)
          complete: () => {
            if (options.isLoading) {
              //在每一个请求结束以后，都会执行complete回调函数
              //每次从queue队列中删除一个标识
              this.queue.pop();

              this.queue.length === 0 && this.queue.push('request');

              this.timerId = setTimeout(() => {
                this.queue.pop();
                //在删除标识以后，需要判断目前queue数组是否为空
                //如果是空，说明并发请求完成了
                //就需要隐藏loading,需要调用wx.hideLoading()
                this.queue.length === 0 && wx.hideLoading();

                clearTimeout(this.timerId);
              });
            }
          },
        });
      }
    });
  }
  //封装GET实例方法
  get(url, data = {}, config = {}) {
    //需要调用request请求方法发送请求，只需要组织好参数，传递给request请求方法即可
    //当调用get方法时，需要将request方法的返回值return出去
    return this.request(Object.assign({ url, data, method: 'GET' }, config));
  }
  //封装DELETE实例方法
  delete(url, data = {}, config = {}) {
    //需要调用request请求方法发送请求，只需要组织好参数，传递给request请求方法即可
    //当调用get方法时，需要将request方法的返回值return出去
    return this.request(Object.assign({ url, data, method: 'DELETE' }, config));
  }
  //封装POST实例方法
  post(url, data = {}, config = {}) {
    //需要调用request请求方法发送请求，只需要组织好参数，传递给request请求方法即可
    //当调用get方法时，需要将request方法的返回值return出去
    return this.request(Object.assign({ url, data, method: 'POST' }, config));
  }
  //封装PUT实例方法
  put(url, data = {}, config = {}) {
    //需要调用request请求方法发送请求，只需要组织好参数，传递给request请求方法即可
    //当调用get方法时，需要将request方法的返回值return出去
    return this.request(Object.assign({ url, data, method: 'PUT' }, config));
  }
  //用来处理并发请求
  all(...promise) {
    //通过展开运算符接收传递的参数
    //那么展开运算符会将传入的参数转成数组
    return Promise.all(promise);
  }
  //upload实例方法，用来对wx.uploadFile进行封装
  /***
   * @description upload实例方法，用来对wx.uploadFile进行封装
   * @param{*} url 文件的上传地址，接口地址
   * @param{*} filePath 要上传的文件资源路径
   * @param{*} name文件对应的key
   * @param{*} config 其他配置项
   */
  upload(url, filePath, name = 'file', config = {}) {
    return this.request(
      Object.assign({ url, filePath, name, method: 'UPLOAD' }, config),
    );
  }
}
export default WxRequest;
