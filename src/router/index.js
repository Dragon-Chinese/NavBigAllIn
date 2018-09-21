import Vue from 'vue';
import axios from 'axios';
import store from '../store/store';
import Router from 'vue-router';
import iView from 'iview';
// 页面
import Login from '../components/Login';
import Register from '../components/Register';
import ForgetPwd from '../components/ForgetPwd';
import Home from '../components/Home';
import AssetTransparency from '../components/AssetTransparency';
import Derivative from "../components/Derivative";
import BHK from '../components/BHK';
import AssetManagement from '../components/AssetManagement';
import EntrustMangement from '../components/EntrustMangement';
import Building from '../components/Building';
import ModifyPwd from "../components/ModifyPwd";
import SMSVerification from "../components/SMSVerification";
import Account from "../components/Account";
import idAuthentication from "../components/IdAuthentication";
import AuthenticationC1 from "../components/AuthenticationPage/C1";
import AuthenticationC2 from "../components/AuthenticationPage/C2";
import TradeMining from "../components/TradeMining";
import CapitalPwd from "../components/CapitalPwd";
import Recommend from "../components/Recommend";
import DataDetails from "../components/Pages/DataDetails";

// banner详情页
import Introduce from "../components/BannerPage/Introduce";
import Download from "../components/BannerPage/Download";
import Increment from "../components/BannerPage/Increment";
import SuperPartner from "../components/BannerPage/SuperPartner";
//最新活动
// import Activity from "../components/Activity";
// import ActivityDetails from "../components/Pages/ActivityDetails";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Login',
      name:"login",
      component:  Login,
      meta: {
        //title: '登录',
      }
    },
    {
      path: '/Register',
      name:"register",
      component:  Register,
      meta: {
        //title: '注册'
      }
    },
    {
      path: '/ForgetPwd',
      name:"forgetPwd",
      component:  ForgetPwd,
      meta: {
        //title: '重置密码'
      }
    },
    {
      path: '/Home',
      name:"home",
      component:  Home,
      meta: {
        //title: '首页'
      }
    },
    {
      path: '/AssetTransparency',
      name:"assettransparency",
      component:  AssetTransparency,
      meta: {
          //title: '资产透明',
      }
    },
    {
      path: '/BHK',
      name:"bhk",
      component:  BHK,
      meta: {
          title: 'BHK',
      }
    },
    {
        path: '/Derivative',
        name:"derivative",
        component: Derivative,
        meta: {
            //title: '衍生品',
        }
    },
    {
      path: '/AssetManagement',
      name:"assetmanagement",
      component:  AssetManagement,
      meta: {
          //title: '资产管理',
          requireAuth: true,
      }
    },
    {
      path: '/EntrustMangement',
      name:"entrustmangement",
      component:  EntrustMangement,
      meta: {
          //title: '委托管理',
          requireAuth: true,
      }
    },
    {
      path: '/Building',
      name:"building",
      component:  Building,
      meta: {
          //title: '正在建设中'
      }
    },
    {
      path: '/Account',
      name:"account",
      component:  Account,
      meta: {
          //title: '用户中心',
          requireAuth: true,
      },
    },
    {
      path: '/ModifyPwd',
      name:"modifypwd",
      component:  ModifyPwd,
      meta: {
          //title: '修改登录密码',
          requireAuth: true,
      }
    },
    {
      path: '/CapitalPwd',
      name:"capitalPwd",
      component:  CapitalPwd,
      meta: {
          //title: '设置资金密码',
          requireAuth: true,
      }
    },
    {
      path: '/SMSVerification',
      name:"smsverification",
      component:  SMSVerification,
      meta: {
          //title: '绑定短信验证',
          requireAuth: true,
      }
    },
    {
      path: '/idAuthentication',
      name:"idauthentication",
      component:  idAuthentication,
      meta: {
          //title: '身份认证',
          requireAuth: true,
      }
    },
    {
      path: '/AuthenticationC1',
      name:"authenticationc1",
      component:  AuthenticationC1,
      meta: {
          //title: '实名认证C1',
          requireAuth: true,
      }
    },
    {
      path: '/AuthenticationC2',
      name:"authenticationc2",
      component:  AuthenticationC2,
      meta: {
          //title: '实名认证C2',
          requireAuth: true,
      }
    },
    {
        path: '/Download',
        name:"download",
        component:  Download,
        meta: {
            //title: 'Bithank原生态APP'
        }
    },
    {
        path: '/Increment',
        name:"increment",
        component:  Increment,
        meta: {
            //title: '增值解决方案'
        }
    },
    {
        path: '/Introduce',
        name:"introduce",
        component:  Introduce,
        meta: {
            //title: '数字经济模型'
        }
    },
    {
        path: '/SuperPartner',
        name:"superPartner",
        component:  SuperPartner,
        meta: {
            //title: '超级合作伙伴'
        }
    },
    {
        path: '/Recommend',
        name:"Recommend",
        component:  Recommend,
        meta: {
            //title: '推荐中心',
            requireAuth: true,
        }
    },
    {
        path: '/DataDetails/:id',
        name:"dataDetails",
        component: DataDetails,
        meta: {
            //title: '前日挖矿产出'
        }
    },
    {
        path: '/TradeMining',
        name:"tradeMining",
        component:  TradeMining,
        meta: {
            //title: '交易挖矿'
        }
    },
    // {
    //     path: '/Activity',
    //     name:"activity",
    //     component:Activity,
    //     meta: {
    //         title: '最新活动'
    //     }
    // },
    // {
    //     path: '/ActivityDetails/:id',
    //     name:"activityDetails",
    //     component:ActivityDetails,
    //     meta: {
    //         title: '活动详情'
    //     }
    // },
  
  ]
});

router.beforeEach((to, from, next) => {

  if (to.meta.title) {
     document.title = to.meta.title;
  }

  
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    iView.LoadingBar.start();
    axios.get('/mobile/member/findRealNameCheck')
        .then(function (response) {
            iView.LoadingBar.finish();
            if(response.data.result=="success"){
                store.commit("isLoginFn",true);
                store.commit("getUserInfo",response.data.data);
                next();
            }else{
                store.commit("isLoginFn",false);
                store.commit("getUserInfo","");
                sessionStorage.removeItem("loginStatus");
                next({
                    path: '/Login',
                    query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        }); 
  }else {
      next();
  }

});

export default router;