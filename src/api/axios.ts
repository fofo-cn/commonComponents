import axios from "axios";
import { Notification } from "element-ui";
import store from "@/store";
import Vue from "vue";
import router from "@/router";
export enum BaseURL {
  development = "https://webapi3.haobangni.com/",
  production = "https://api.haobangni.com/",
}

// 判断开发环境或生产环境
const env: "development" | "production" = process.env.NODE_ENV;
if (env === "development") {
  axios.defaults.baseURL = BaseURL.development;
} else {
  axios.defaults.baseURL = BaseURL.production;
}

const axiosConfig = {
  headers: {
    "Content-Type": "application/json", //后端请求格式为json
  },
  timeout: 10000, //请求超时时间为10秒
};

const ApiError = (errormsg: string, status: any) => {
  Notification({
    title: `${status}-提示`,
    message: errormsg,
    type: "error",
    position: "top-right",
    duration: 1000,
  });
};

const $axios = axios.create(axiosConfig); //创建axios实例

const resolve = (response: any) => {
  //200,300 成功后返回结果
  const { errormsg, errorcode } = response.data;
  const { responseURL } = response.request;
  if (responseURL.split("/").splice(-1)[0] === "FiUserIslogin") {
    return response;
  }
  if (errorcode === 1) {
    ApiError(errormsg, 1);
  }
  return response;
};

const reject = (error: any) => {
  // 400 , 500 失败的返回结果
  const { response } = error;
  if (response) {
    switch (response.status) {
      case 401:
        ApiError("未登陆，需要身份验证", 401);
        store.commit("setCurrentRouter", window.location.href); //保存当前路由并在登录后跳转原来的路由
        router.push("/login");
      case 403:
        ApiError("权限不足", 403);
        break;
      case 404:
        ApiError("该路径不存在", 404);
        break;
      case 405:
        ApiError("请求方式错误", 405);
        break;
      case 408:
        ApiError("请求超时", 408);
        break;
      default:
        ApiError("服务器错误", "5--");
    }
  }
};

$axios.interceptors.response.use(resolve,reject);//请求拦截器

// 封装get和post
export const $Get = (url:string,params:any)=>{
  // 必须和后端协商，返回什么再做处理
  return $axios.get(url,{params}).then(res=>{
    if(res.data.errorcode === 1){
      return Promise.reject(res.data);
    }else {
      return Promise.resolve(res.data)
    }
  })
}
export const $Post = (url: string, data: any) => {
  return $axios.get(url, data).then(res => {
    //路径和参数
    if (res.data.errorcode === 1) {
      return Promise.reject(res.data);
    }
    return Promise.resolve(res.data);
  });
};
Vue.prototype.$Get = $Get;
Vue.prototype.$Post = $Post;