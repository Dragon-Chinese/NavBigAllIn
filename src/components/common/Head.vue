<template>
    <div class="index-menu">
        <div class="minW1000">
            <div class="index-menu-topbar" :class="{highlight:highlight}"  @mouseenter="isHighlight" @mouseleave="isHighlight">
                <div class="topbar-top">
                    <router-link to="/Home" class="topbar-logo"><img src="../../assets/images/logo.png" alt=""></router-link>
                    <div class="topbar-menu">
                        <div class="topbar-menu-link"><a @click="locationNotice">{{$t("message.topbarMenu.notice")}}</a></div>
                        <div class="topbar-menu-link"><a @click="locationHelp">{{$t("message.topbarMenu.help")}}</a></div>
                        <div class="topbar-menu-link"><a @click="whitePaper">{{$t("message.topbarMenu.whitePaper")}}</a></div>
                        <div class="topbar-menu-link" v-if="!isLogin"><router-link to="/Login">{{$t("message.topbarMenu.login")}}</router-link></div>
                    </div>
                    <div class="topbar-site-switch"  @mouseenter="isShowSiteBox" @mouseleave="isShowSiteBox">
                        {{isSiteList[isLanguage].lang}}<Icon :type="chevron"></Icon>
                        <ul v-show="isSiteBox">
                            <li v-for="(item,index) in isSiteList" :key="index" :class="{'lang-cur':index==isLanguage}"  @click="isLanguage=index,toSwitchLanguage(item.val,index)" >
                            <!--<li v-for="(item,index) in isSiteList" :key="index" :class="{'lang-cur':index==isLanguage}" >-->
                                <a :val="item.val">{{item.lang}}</a>
                            </li>
                        </ul>
                    </div>
                    <!-- <div class="topbar-search">
                        <div class="topbar-search-container" :class="{searchActive:searchActive}">
                            <input type="text" placeholder="搜索交易币种" v-model="searchContent" @blur="searchContent='',searchActive=false" @focus="searchActive=true">
                            <div class="search-close" v-show="searchIcon"><Icon type="close-circled"></Icon></div>
                            <div class="search-icon"><Icon type="ios-search-strong" ></Icon></div>
                        </div>
                    </div> -->
                </div>
                <div class="topbar-bottom">
                    <div class="topbar-nav">
                        <!-- <div class="all-nav" :class="{active:allNavActive}"  @mouseenter="mouseAllNav">
                            <Icon type="android-menu"></Icon>
                        </div> -->
                        <ul class="topbar-nav-list">
                            <li v-for="(item,index) in topbarNavList" :key="index" @mouseenter="lineWidthFn($event)" @mouseleave="leaveLineWidthFn" :class="{topbarNavActive:item.topbarNavActive}">
                                <router-link :to="item.href" v-if="!item.location" v-t="item.name"></router-link>
                                <a v-else @click="locationFn(item.locationHref,item.locationNum)" v-t="item.name"></a>
                                <img src="../../assets/images/hot.png" alt="" v-if="item.isHot">
                                <p @click="BigAllInNav" class="but_nav" v-if="item.isNav" v-t="item.name"></p>
                            </li>
                            <div class="line" :style="{width:lineWidth}"></div>
                        </ul>
                        <router-link to="/Register" class="topbar-register-btn" v-if="!isLogin">{{$t("message.topbarMenu.register")}}</router-link>
                        <div class="topbar-user-info" v-else @mouseenter="isShowUserBox" @mouseleave="isShowUserBox">
                            <div class="topbar-user-image-wrapper">
                                <img src="../../assets/images/user-image.png" alt="">
                            </div>
                            <!-- <span>10</span> -->
                        </div>
                        <div class="topbar-user-info-dropdown" v-show="isUserBox" @mouseenter="isShowUserBox" @mouseleave="isShowUserBox">
                            <div class="top">
                                <div class="top-line">
                                    <router-link to="/Account" class="user-uid">{{userInfo.mobile}}</router-link>
                                </div>
                                <span class="short" v-if="userInfo.name!=''">{{$t("message.topbarMenu.realNameYes")}}</span>
                                <router-link to="/IdAuthentication" class="short" v-else>{{$t("message.topbarMenu.realNameNo")}}</router-link>
                            </div>
                            <div class="middle">
                                <div>
                                    <router-link to="/Account"><img src="../../assets/images/zhanghao.png" alt="">{{$t("message.topbarMenu.accountInfo")}}</router-link>
                                    <router-link to="/IdAuthentication"><img src="../../assets/images/renzheng.png" alt="">{{$t("message.topbarMenu.identityAuth")}}</router-link>
                                    <router-link to="/Recommend"><img src="../../assets/images/tuijian.png" alt="">{{$t("message.topbarMenu.recCenter")}}</router-link>
                                    <div class="break-line"></div>
                                    <router-link to="/AssetManagement"><img src="../../assets/images/zican.png" alt="">{{$t("message.topbarMenu.assetManage")}}</router-link>
                                    <router-link to="/EntrustMangement"><img src="../../assets/images/weituo.png" alt="">{{$t("message.topbarMenu.entrustManage")}}</router-link>
                                </div>
                            </div>
                            <div class="bottom">
                                <div @click="signOut">{{$t("message.topbarMenu.logout")}}</div>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="topbar-all-nav-dropdown">
                        <div class="topbar-level1-nav">
                            <div class="level-inner">
                                <ul>
                                    <li class="slide-animation inner-text">

                                    </li>
                                </ul>
                                <div class="space-line slide-animation">

                                </div>
                                <div class="inner-text">
                                    <div class="slide-animation inner-text" v-for="">
                                        <router-link to="/"></router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import globalUrl from "../../urlConfig";
    export default {
        data () {
            return {
                title:"aa",
                chevron:"chevron-down",
                thisUrl: "",
                highlight:false,
                isSiteBox:false,
                searchActive:false,
                allNavActive:false,
                searchIcon:false,
                searchContent:"",
                isLanguage:1,
                isSiteList:[
                    {
                        lang:"English",
                        val:"en"
                    },
                    {
                        lang:"简体中文",
                        val:"zhCHS"
                    },
                    {
                        lang:"繁體中文",
                        val:"zhCHT"
                    },
                ], 
                topbarNavList:[
                    {
                        name:"message.topbarNavList.transaction",
                        href:"",
                        isHot:false,
                        topbarNavActive:false,
                        location:true,
                        locationHref:globalUrl.hrefUrl+"/trading/",
                        locationNum:0
                    },
                    {
                        name:"message.topbarNavList.latestActivities",
                        href:"",
                        isHot:true,
                        topbarNavActive:false,
                        location:true,
                        locationHref:"https://bithank.zendesk.com/hc/zh-cn/sections/360001635912",
                        locationNum:1
                    },
                    {
                        name:"message.topbarNavList.tradeMining",
                        href:"/TradeMining",
                        isHot:false,
                        topbarNavActive:false
                    },
                    {
                        name:"message.topbarNavList.BHK",
                        href:"/BHK",
                        isHot:false,
                        topbarNavActive:false
                    },
                    {
                        name:"message.topbarNavList.AssetTransparency",
                        href:"/AssetTransparency",
                        isHot:false,
                        topbarNavActive:false
                    },
                    {
                        name:"message.topbarNavList.derivative",
                        href:"/Derivative",
                        isHot:false,
                        topbarNavActive:false
                    },
                    {
                        name:"message.topbarNavList.wallet",
                        href:"",
                        isHot:false,
                        topbarNavActive:false
                    },
                    {
                        name:"message.topbarNavList.news",
                        href:"",
                        isHot:false,
                        topbarNavActive:false,
                        location:true,
                        locationHref:"https://bithank.zendesk.com/hc/zh-cn/sections/360001632372",
                        locationNum:1
                    }, 
                    {
                        name: "message.topbarNavList.BigAllin",
                        isNav : true
                    },
                ],
                lineWidth:0,
                isUserBox:false,
                isLogin:false,
                userInfo:this.$store.state.userInfo
            }
        },
        created() {
            //获取当前url
            localStorage.setItem("from",location.href);
            if(sessionStorage.getItem("lang")==null || sessionStorage.getItem("lang")==""){
                this.isLanguage=1;
                sessionStorage.setItem("lang",1);
                this.$i18n.locale = "zhCHS";
            }else{
                this.isLanguage=sessionStorage.getItem("lang");
                this.isSiteList.forEach((item,index) => {
                    if(this.isLanguage==index){
                        this.$i18n.locale =item.val;
                    }
                });
            }
            let path = this.$route.path.replace("/","");
            this.topbarNavList.forEach((item,i)=> {
                if(item.href.replace("/","")==path){
                   this.topbarNavList[i].topbarNavActive=true;
                }
            });
            let _that=this;
            if(_that.$store.state.isLogin || sessionStorage.getItem("loginStatus")){
                _that.isLogin=true,
                _that.$Loading.start();
                _that.findRealNameCheck();
            }    
        },
        methods: {
            // getRebateConfig(){ //获取系统配置信息
            //     let _that=this;
            //     _that.$axios.get('/public/stock/getRebateConfig')
            //         .then(function (response) {
            //             if(response.data.result=="success"){
            //                 _that.getRebateConfig=response.data.data;
            //             }
            //         })
            //         .catch(function (error) {
            //             console.log(error);
            //         }); 
            // },
            findRealNameCheck(){
                let _that=this;
                _that.$axios.get('/mobile/member/findRealNameCheck')
                    .then(function (response) {
                        _that.$Loading.finish();
                        if(response.data.result=="success"){
                            _that.userInfo=response.data.data;
                        }else{
                            _that.$store.commit("isLoginFn",false);
                            _that.$store.commit("getUserInfo","");
                            _that.$router.replace({
                                path: '/Login',
                                query: {redirect: _that.$router.currentRoute.fullPath}
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        _that.$Loading.error();
                    }); 
            },
            isHighlight(){
                this.highlight=!this.highlight;
            },
            isShowSiteBox(){
                this.isSiteBox=!this.isSiteBox;
                if(this.isSiteBox){
                    this.chevron="chevron-up"
                }else{
                     this.chevron="chevron-down"
                }
            },
            locationFn(href,num){
                if(num==1){
                    window.open(href)
                }else{
                    window.location.href=href;
                }
                
            },
            toSwitchLanguage(val,index) {
                this.$i18n.locale = val;
                this.isLanguage=index;
                sessionStorage.setItem("lang",index);
                let path = this.$route.path;
                let seotitle;
                switch (path){
                    case '/Home':
                        seotitle = this.$t('message.topbarNavList.home');
                        break;
                    case '/Register':
                        seotitle = this.$t('message.user.register.register');
                        break;
                    case '/Login':
                        seotitle = this.$t('message.user.login.login');
                        break;
                    case '/ForgetPwd':
                        seotitle = this.$t('message.user.login.forgetPwd');
                        break;
                    case '/AssetTransparency':
                        seotitle = this.$t('message.topbarNavList.AssetTransparency');
                        break;
                    case '/Derivative':
                        seotitle = this.$t('message.topbarNavList.derivative');
                        break;
                    case '/AssetManagement':
                        seotitle = this.$t('message.topbarMenu.assetManage');
                        break;
                    case '/EntrustMangement':
                        seotitle = this.$t('message.topbarMenu.entrustManage');
                        break;
                    case '/Account':
                        seotitle = this.$t('message.user.account.title');
                        break;
                    case '/ModifyPwd':
                        seotitle = this.$t('message.user.account.actionList.a.action') + this.$t('message.user.account.actionList.a.title');
                        break;
                    case '/CapitalPwd':
                        seotitle = this.$t('message.user.account.actionList.c.action') + this.$t('message.user.account.actionList.c.title');
                        break;
                    case '/idAuthentication':
                        seotitle = this.$t('message.user.account.idAuthentication');
                        break;
                    case '/AuthenticationC1':
                        seotitle = this.$t('message.AuthenticationPage.C1.title');
                        break;
                    case '/AuthenticationC2':
                        seotitle = this.$t('message.AuthenticationPage.C2.title');
                        break;
                    case '/Download':
                        seotitle = this.$t('message.BannerPage.Download.bannerList.text');
                        break;
                    case '/Increment':
                        seotitle = this.$t('message.Derivative.banner.text');
                        break;
                    case '/Introduce':
                        seotitle = this.$t('message.home.banner.a.seotitle');
                        break;
                    case '/SuperPartner':
                        seotitle = this.$t('message.home.banner.d.seotitle');
                        break;
                    case '/Recommend':
                        seotitle = this.$t('message.user.account.recommend');
                        break;
                    case '/TradeMining':
                        seotitle = this.$t('message.topbarNavList.tradeMining');
                        break;
                    case '/SMSVerification':
                        seotitle = this.$t('message.user.account.actionList.b.title');
                        break;
                    case '/DataDetails/0':
                        seotitle = this.$t('message.home.boxContainerList.a.title');
                        break;
                    case '/DataDetails/1':
                        seotitle = this.$t('message.home.boxContainerList.b.title');
                        break;
                    case '/DataDetails/2':
                        seotitle = this.$t('message.home.boxContainerList.c.title');
                        break;
                    case '/DataDetails/3':
                        seotitle = this.$t('message.home.boxContainerList.d.title');
                        break;
                    case '/DataDetails/4':
                        seotitle = this.$t('message.home.boxContainerList.e.title');
                        break;
                }
                document.title = seotitle;
            },
            whitePaper(){
                window.open('https://bithank.zendesk.com/hc/zh-cn/articles/360007834791');
            },
            locationHelp(){
                window.open('https://bithank.zendesk.com/hc/zh-cn/categories/360000690951');
            },
            locationNotice(){
                window.open('https://bithank.zendesk.com/hc/zh-cn/sections/360001641991');
            },
            signOut(){
                let _that=this;
                _that.$axios.get('/public/user/logoutAjax')
                    .then(function (response) {
                        if(response.status==200){
                            _that.$store.commit("isLoginFn",false);
                            _that.$store.commit("getUserInfo","");
                            _that.$router.push({ path: '/Login'})
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            isShowUserBox(){
                this.isUserBox=!this.isUserBox;
            },
            mouseAllNav(){
                this.allNavActive=!this.allNavActive;
            },
            lineWidthFn(event){
                let liDom=event.currentTarget;
                let lineDom=document.querySelector(".line");
                lineDom.style.width=liDom.offsetWidth+"px"
                lineDom.style.left=liDom.offsetLeft+"px"
            },
            leaveLineWidthFn(){
                document.querySelector(".line").style.width="0px";
            },
            BigAllInNav () {
                let isLogin = sessionStorage.getItem("loginStatus")
                console.log("isLogin..." , isLogin)
                if(isLogin) {
                    // window.open("https://www.baidu.com/")
                    window.open("http://172.16.1.56:8080/#/")
                }else{
                    location.href= "#/Login"
                }
            }
        },
        watch:{
            searchContent(val){
                if(val.length>0){
                    this.searchIcon=true;
                }else{
                    this.searchIcon=false;
                }
            },
        },
        filters: {
            replacePhone: function (value) {
                return value.substr(0,3)+"****"+value.substr(7);
            }
        }
    }
</script>
<style lang="scss" scoped>
@import "../../assets/sass/setting";
    .index-menu{
        position: absolute;
        top: 0;
        height: 120px;
        width: 100%;
        z-index: 999;
        .minW1000{
            width: 1000px;
        }
        .index-menu-topbar{
            min-width: 1000px;
            width: 100%;
            position: absolute;
            z-index: 1000;
            top: 0;
            left: 0;
            background: rgba(55,61,65,0);
            border-bottom: 1px solid hsla(0,0%,100%,.15);
            transition: background .3s cubic-bezier(0,0,.2,1) .15s;
            &.highlight{
                background: #373d41;
                border-bottom: none;
            }
            .topbar-top{
                height: 60px;
                border-bottom: 1px solid hsla(0,0%,100%,.15);
                .topbar-logo{
                    display: block;
                    float: left;
                    width: 106px;
                    margin-top: 14px;
                    margin-left: 68px;
                    position: relative;
                    color: #fff;
                    cursor: pointer;
                    img{
                        width: 100%;
                    }
                }
                .topbar-menu{
                    float: right;
                    font-size: 14px;
                    margin-right: 56px;
                    .topbar-menu-link{
                        float: left;
                        height: 60px;
                        line-height: 60px;
                        padding: 0 12px;
                        a{
                            color:#fff;
                            &:hover{
                                color: $theme-color;
                            }
                        }
                    }
                }
                .topbar-site-switch{
                    float: right;
                    color: #fff;
                    height: 60px;
                    line-height: 60px;
                    font-size: 14px;
                    position: relative;
                    padding: 0 12px;
                    cursor: pointer;
                    img{
                        width: 16px;
                        vertical-align: text-bottom;
                        margin-right: 4px;
                    }
                    .ivu-icon{
                        margin-left: 5px;
                        vertical-align: middle;
                    }
                    ul{
                        position: absolute;
                        right: 0;
                        top: 60px;
                        background-color: #272b2f;
                        width: 156px;
                        z-index: 1000;
                        padding: 10px;
                        cursor: default;
                        li{
                            height: 30px;
                            line-height: 30px;
                            &:hover a,&.lang-cur a{
                                color: $theme-color;
                            }
                            a{
                                color:#fff;
                            }
                        }
                    }
                }
                .topbar-search{
                    margin-top: 7px;
                    height: 30px;
                    line-height: 0;
                    position: relative;
                    padding-left: 40px;
                    float: right;
                    .topbar-search-container{
                        width: 200px;
                        height: 26px;
                        background: hsla(0,0%,100%,.12);
                        position: relative;
                        transition: all .3s linear;
                        &.searchActive,&:hover{
                            width: 300px;
                            background: #262c30;
                            border: 1px solid $theme-color;
                        }
                        &:after{
                            content: "";
                            width: 1px;
                            height: 16px;
                            position: absolute;
                            top: 5px;
                            background: hsla(0,0%,100%,.15);
                            right: 26px;
                        }
                        input{
                            position: relative;
                            font-size: 12px;
                            z-index: 2;
                            box-sizing: border-box;
                            padding-left: 12px;
                            padding-right: 22px;
                            width: 100%;
                            height: 100%;
                            outline: none;
                            background: transparent;
                            border: none;
                            color: #fff;
                            line-height: 26px;
                             &::-webkit-input-placeholder{
                                color:#ddd;
                            }
                            &::-moz-placeholder{   /* Mozilla Firefox 19+ */
                                color:#ddd;
                            }
                            &:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                                color:#ddd;
                            }
                            &:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
                                color:#ddd;
                            }
                        }
                        .search-close{
                            position: absolute;
                            z-index: 3;
                            right: 32px;
                            top: 7px;
                            bottom: 0;
                            width: 12px;
                            height: 12px;
                            cursor: pointer;
                            color: #3d4751;
                            &:hover{
                                color: #6f7377;
                            }
                        }
                        .search-icon{
                            position: absolute;
                            z-index: 3;
                            right: 0;
                            top: 0;
                            bottom: 0;
                            width: 26px;
                            height: 26px;
                            line-height: 26px;
                            font-size: 18px;
                            text-align: center;
                            cursor: pointer;
                            &:hover{
                                color: $theme-color;
                            }
                        }
                    }
                }
                
            }
            .topbar-bottom{
                height: 60px;
                .topbar-nav{
                    font-size: 14px;
                    overflow: hidden;
                    .all-nav{
                        float: left;
                        position: absolute;
                        height: 60px;
                        line-height: 60px;
                        padding: 0 20px;
                        color: #fff;
                        cursor: default;
                        text-align: center;
                        &.acitve,&:hover{ 
                            background: $theme-color;                               
                        }   
                        i{
                            font-size: 26px;
                            vertical-align: middle;
                        }
                    }
                    .topbar-nav-list{
                        float: left;
                        position: relative;
                        margin-left: 52px;
                        li{
                            float: left;
                            height: 60px;
                            line-height: 60px;
                            padding: 0 16px;
                            position: relative;
                            a{
                                display: inline-block;
                                color: #fff;
                                &:hover{
                                    color: $theme-color;
                                }
                            }
                            img{
                                position: absolute;
                                top: 8px;
                                right: 4px;
                                width: 24px;
                            }
                            &.topbarNavActive{
                                a{
                                    color: $theme-color;
                                }
                                border-bottom: 3px solid $theme-color;
                            }
                        }
                        .line{
                            position: absolute;
                            width: 0;
                            height: 3px;
                            left: 0;
                            bottom: 0;
                            background: #00c1de;
                            transition: all 0.35s;
                            transition: width .3s cubic-bezier(.4,0,.2,1);
                            transition: left .3s cubic-bezier(.4,0,.2,1);
                        }
                    }
                    .topbar-register-btn{
                        float: right;
                        height: 60px;
                        line-height: 60px;
                        background: #00c1de;
                        padding: 0 32px;
                        color: #fff;
                    }
                    .topbar-user-info{
                        float: right;
                        padding: 10px 20px 0;
                        height: 60px;
                        box-sizing: border-box;
                        position: relative;
                        &:hover{
                            background: #00c1de;
                        }
                        .topbar-user-image-wrapper{
                            width: 40px;
                            height: 40px;
                            border-radius: 100%;
                            overflow: hidden;
                            img{
                                width: 42px;
                                border-radius: 50%;
                                height: 42px;
                            }
                        }
                        span{
                            position: absolute;
                            font-size: 10px;
                            background-color: #ff5029;
                            color: #fff;
                            border-radius: 13px;
                            right: 12px;
                            top: 8px;
                            height: 16px;
                            padding: 0 4px;
                            line-height: 16px;
                            text-align: center;
                        }

                    }
                    .topbar-user-info-dropdown{
                        position: absolute;
                        right: 0;
                        top: 120px;
                        width: 200px;
                        height: 300px;
                        background: #202529;
                        color: #fff;
                        z-index: 99999;
                        .top{
                            background: #262c30;
                            padding: 10px 16px;
                            .top-line{
                                line-height: 1;
                                .user-uid{
                                    display: inline-block;
                                    width: 160px;
                                    font-size: 12px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    color: #fff;
                                    &:hover{
                                        color: $theme-color;
                                    }
                                }
                            }
                            .short{
                                display: inline-block;
                                line-height: 1;
                                margin-top: 10px;
                                font-size: 12px;
                                color: $theme-color;
                            }
                        }
                        .middle{
                            a{
                                height: 20px;
                                line-height: 20px;
                                padding: 0 16px;
                                margin: 12px 0;
                                font-size: 12px;
                                position: relative;
                                display:block;
                                color:#fff;
                                &:hover{
                                    color: $theme-color;
                                }
                                img{
                                    width: 18px;
                                    vertical-align: top;
                                    margin-right: 8px;
                                }
                            }
                            .break-line{
                                height: 1px;
                                margin: 0 16px;
                                background: #474D50
                            }
                        }
                        .bottom{
                            position: absolute;
                            bottom: 20px;
                            left: 20px;
                            div{
                                width: 160px;
                                border:1px solid $theme-color;
                                height: 30px;
                                line-height: 28px;
                                color: $theme-color;
                                text-align: center;
                                font-size: 12px;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
        .but_nav {
            color: white;
            cursor: pointer;
        }
        .but_nav:hover {
            color: #00c1de;
        }
    }
</style>
