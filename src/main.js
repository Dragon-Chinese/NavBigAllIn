import "babel-polyfill";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vue from 'vue';
import axios from 'axios';
import qs from "qs";
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import App from './App';
import store from './store/store';
import router from './router/index';
import './assets/sass/common';
import globalUrl from "./urlConfig";
import LangEn from "./assets/lib/en";
import LangZhCHS from "./assets/lib/zhCHS";
import LangZhCHT from "./assets/lib/zhCHT";
import en from '../node_modules/iview/dist/locale/en-US';
import zh from '../node_modules/iview/dist/locale/zh-CN';
import zht from '../node_modules/iview/dist/locale/zh-TW';

Vue.config.devtools = false;
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(Vuex);
Vue.use(iView,{
  i18n: (key, value) => i18n.t(key, value)
});
Vue.locale = () => {};
const messages = {
    en: Object.assign(LangEn, en),
    zhCHS: Object.assign(LangZhCHS, zh),
    zhCHT: Object.assign(LangZhCHT, zht)
};

const i18n = new VueI18n({
  //定义默认语言
  locale: 'zhCHS',
  fallbackLocale: 'zhCHS',
  messages
})

Vue.use(iView, {
  // i18n:(key,value)=> i18n.t(key,value)
  i18n: function(path, options) {
      let value = i18n.t(path, options);
      if (value !== null && value !== undefined) return value;

      return '';
  }
});

iView.i18n((key, value) => i18n.t(key, value))

Vue.prototype.resizeBanner=function () {  
  let bannerImg=document.getElementsByClassName("banner-img");
  for(let i=0,len=bannerImg.length;i<len;i++){
      bannerImg[i].style.left=-(1920-document.body.clientWidth)/2+"px";
  }
};


Vue.prototype.$axios = {
  post: function (url,params) {
    params=params || "";
    return axios({
      url:url,
      method: 'post',
      data: qs.stringify(params),
    });
  },
  get: function (url,params) {
    params=params || "";
    return axios({
      url:url,
      method: 'get',
      params: params,
    });
  },
  getType: function (url,params,type) {
    params=params || "";
    return axios({
      url:url,
      method: 'get',
      params: params,
      responseType:type
    });
  }
};


axios.defaults.baseURL = globalUrl.url;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 6000;
axios.defaults.retry = 2;
axios.defaults.retryDelay = 1000;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  　　// 在发送请求之前做些什么
  
  　　return config;

  }, function (error) {

    // 对请求错误做些什么
    iView.LoadingBar.error();
  　　
});
  
// 添加响应拦截器
axios.interceptors.response.use(function (response) {

    if(response.request.responseURL.indexOf("login.jsp") != -1){
        store.commit("isLoginFn",false);
        store.commit("getUserInfo","");
        sessionStorage.removeItem("loginStatus");
        router.replace({
            path: '/Login',
        });
    }
 
    return response;

}, function (err) {

    // 对响应错误做点什么
    iView.LoadingBar.error();

    if(err.request.responseURL.indexOf("login.jsp") != -1){
        store.commit("isLoginFn",false);
        store.commit("getUserInfo","");
        sessionStorage.removeItem("loginStatus");
        router.replace({
            path: '/Login',
        });
    }

    if (err.response) {
      switch (err.response.status) {

          case 401:
            // // 只有在当前路由不是登录页面才跳转
            // router.currentRoute.path !== 'login' &&
            // router.replace({
            //   path: 'login',
            //   query: { redirect: router.currentRoute.path }
            // });
          break;
          case 500:
              alert("服务器出问题了！");
          break;
      }
    }
    
    return Promise.reject(err.response.data)
    // var config = err.config; // If config does not exist or the retry option is not set, reject 

    // if(!config || !config.retry) return Promise.reject(err); // Set the variable for keeping track of the retry count 

    // config.__retryCount = config.__retryCount || 0; // Check if we've maxed out the total number of retries 

    // if(config.__retryCount >= config.retry) { 
    //   // Reject with the error 
    //   return Promise.reject(err); 
    // } 

    // config.__retryCount += 1;  // Increase the retry count 

    // var backoff = new Promise(function(resolve) { // Create new promise to handle exponential backoff 
    //   setTimeout(function() {
    //      resolve(); 
    //     }, config.retryDelay || 1);
    // }); 
    // config.baseURL="";
    // return backoff.then(function() {  // Return the promise in which recalls axios to retry the request 
    //    return axios(config); 
    // });

});

Date.prototype.format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Vue.prototype.commonValid=function (type,str) {   
    if(type=="phone"){ //校验手机号
        if(str==""){
            return {
                text:"请输入手机号"
            };
        }else if (!/^1[345678]\d{9}$/.test(str)){
            return {
                text:"请输入正确格式的手机号"
            };
        } 
    }else if(type=="password"){ //校验密码
        if(str==""){
          return {
            text:"请输入密码"
          };
        }else if(str.length >= 8 && str.length <= 15){
            if (!/^[0-9]{8,15}$/.test(str)) {
              if (!/^[a-z]{8,15}$/i.test(str)) {
                  if (!/^(\w|@|%|#){8,15}$/.test(str)) {
                    return {
                      text:"密码长度8-15之间, 数字字母或@%#组成"
                    };
                  }
              }else{
                  return {
                    text:"密码不能纯字母组成"
                  };
              }
            }else{
              return {
                text:"密码不能纯数字组成"
              };
            }
        }else{
          return {
            text:"密码长度8-15之间"
          };
        }
    }else if(type=="ID"){ //校验身份证
      if(str==""){
          return {
              text:"请输入身份证号"
          };
      }else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)){
          return {
              text:"请输入正确格式的身份证号"
          };
      }
    }
};

Vue.prototype.scientificToNumber=function(p) {
  var k = p.toString();
  var m = /^(((\d+.?\d+)|(\d+))[Ee]{1}((\-(\d+))|(\d+)))$/;
  var i, j, l = "";
  if (!m.test(k)) {
      return p
  } else {
      i = m.exec(k);
      j = Math.abs(i[6]) - 1;
      for (var o = 0; o < j; o++) {
          l += "0"
      }
      var n = (i[2].indexOf(".") != -1) ? (i[2].split(".")[0] + i[2].split(".")[1]) : i[2];
      return "0." + l + n
  }
};



Vue.prototype.numFormat=function(num){
    num=(""+num).split(".");  // 分隔小数点

    var arr=num[0].split("").reverse();  // 转换成字符数组并且倒序排列
    var res=[];
    for(var i=0,len=arr.length;i<len;i++){
      if(i%3===0&&i!==0){
         res.push(",");   // 添加分隔符
      }
      res.push(arr[i]);
    }
    res.reverse(); // 再次倒序成为正确的顺序
    if(num[1]){  // 如果有小数的话添加小数部分
      res=res.join("").concat("."+num[1]);
    }else{
      res=res.join("");
    }
    return res;
}

// Vue.prototype.toDecimal=function(x,num){
//    var f = parseFloat(x);
//    if (isNaN(f)) {
//       return "";
//    }
//    switch (num){
//       case 1:
//         var f = Math.round(x*10)/10;
//       break;
//       case 2:
//         var f = Math.round(x*100)/100;
//       break;
//       case 3:
//         var f = Math.round(x*1000)/1000;
//       break;
//       case 4:
//         var f = Math.round(x*10000)/10000;
//       break;
//       case 5:
//         var f = Math.round(x*100000)/100000;
//       break;
//       case 6:
//         var f = Math.round(x*1000000)/1000000;
//       break;
//       case 7:
//         var f = Math.round(x*10000000)/10000000;
//       break;
//       case 8:
//         var f = Math.round(x*100000000)/100000000;
//       break;
//       case 9:
//         var f = Math.round(x*1000000000)/100000000;
//       break;
//       case 10:
//         var f = Math.round(x*1000000000)/1000000000;
//       break;
//    }
//    var s = f.toString();
//    var rs = s.indexOf('.');
//    if (rs < 0) {
//       rs = s.length;
//       s += '.';
//    }
//    while (s.length <= rs + num) {
//       s += '0';
//    }
//    return s;
// }


Vue.prototype.toDecimal=function (val,num) {
    if (isNaN(val)) {
        return "";
    }else{
      val=val.toString();
    }
    var s=val.substring(0,val.lastIndexOf('.')+(num+1))
//  console.log(val.substring(0,val.lastIndexOf('.')+(num+1)))
    // var s = val.toString();
   var rs = s.indexOf('.');
   if (rs < 0) {
      rs = s.length;
      s += '.';
   }
   while (s.length <= rs + num) {
      s += '0';
   }
   return s;
  // if(val.indexOf(".") != -1){
  //     if(num){
  //         switch (num){
  //           case 0:
  //             val=Number(val.match(/^\d+(?:\.\d{0,0})?/));
  //           break;
  //           case 1:
  //             val=Number(val.match(/^\d+(?:\.\d{0,1})?/));
  //           break;
  //           case 2:
  //             val=Number(val.match(/^\d+(?:\.\d{0,2})?/));
  //           break;
  //           case 3:
  //             val=Number(val.match(/^\d+(?:\.\d{0,3})?/));
  //           break;
  //           case 4:
  //             val=Number(val.match(/^\d+(?:\.\d{0,4})?/));
  //           break;
  //           case 5:
  //             val=Number(val.match(/^\d+(?:\.\d{0,5})?/));
  //           break;
  //           case 6:
  //             val=Number(val.match(/^\d+(?:\.\d{0,6})?/));
  //           break;
  //           case 7:
  //             val=Number(val.match(/^\d+(?:\.\d{0,7})?/));
  //           break;
  //           case 8:
  //             val=Number(val.match(/^\d+(?:\.\d{0,8})?/));
  //           break;
  //           case 9:
  //             val=Number(val.match(/^\d+(?:\.\d{0,9})?/));
  //           break;
  //           case 10:
  //             val=Number(val.match(/^\d+(?:\.\d{0,10})?/));
  //           break;
  //         }
  //     }
  //     return val;
  // }else{
  //   return val;
  // }
 
}

Vue.prototype.doIt=function (num) {
    return num.toString();
}


new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App),
});

