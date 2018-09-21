<template>
    <div class="login-topbar" :class="{'black':theme}">
        <router-link  to="/Home" class="login-topbar-logo" >
            <img src="../../assets/images/logo.png" alt="" v-if="!theme">
            <img src="../../assets/images/logo-black.png" alt="" v-else>
        </router-link>
        <ul class="login-link">
            <li><router-link to="/Home">{{$t("message.topbarNavList.home")}}</router-link></li>
        </ul>
        <div class="login-site-switch">
            <div class="login-site-switch-box" @mouseenter="isShowSiteBox" @mouseleave="isShowSiteBox">
                {{isSiteList[isLanguage].lang}}<Icon :type="chevron"></Icon>
                <ul v-show="isSiteBox">
                    <li v-for="(item,index) in isSiteList" :key="index" :class="{'lang-cur':index==isLanguage}" @click="isLanguage=index,toSwitchLanguage(item.val,index)">
                    <!--<li v-for="(item,index) in isSiteList" :key="index" :class="{'lang-cur':index==isLanguage}">-->
                        <a :val="item.val">{{item.lang}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                chevron:"chevron-down",
                isSiteBox:false,
                theme:false,
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
            }
        },
        mounted() {
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
            if(this.$route.name=="register" || this.$route.name=="forgetPwd"){
                this.theme=true;
            }
        },
        methods: {
            isShowSiteBox(){
                this.isSiteBox=! this.isSiteBox;
                if(this.isSiteBox){
                    this.chevron="chevron-up"
                }else{
                     this.chevron="chevron-down"
                }
            },
            toSwitchLanguage(val,index) {
                this.$i18n.locale = val;
                this.isLanguage=index;
                sessionStorage.setItem("lang",index);
            },
        }
    }
</script>
<style lang="scss" scoped>
@import "../../assets/sass/setting";
  .login-topbar{
        height: 60px;
        position: relative;
        border-bottom: 1px solid rgba(255,255,255,0.3);
        .login-topbar-logo{
            img{
                left: 20px;
                height: 32px;
                position: absolute;
                z-index: 1;
                top: 14px;
            }
        }
        &.black{
            border-bottom: 1px solid #D7D8D9;
            background: #f5f5f6;
            .login-link{
                li{
                    a{
                        color: $text-black-color;
                    }
                }
            }
            .login-site-switch{
                .login-site-switch-box{
                    color: $text-black-color;
                     ul{
                        background-color: #F5F5F6;
                        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.1);
                        li{
                            &:hover,&.lang-cur{
                                background: #EBECEC;
                                a{
                                    color: $theme-color;
                                }
                            }
                            a{
                                color:$text-black-color;
                            }
                        }
                    }
                }
            }
        }
        .login-link{
            float: right;
            margin: 0;
            list-style: none;
            padding-left: 10px;
            &:after{
                content: "";
                display: table;
                clear: both;
            }
            li{
                a{
                    height: 60px;
                    line-height: 60px;
                    padding: 0 20px;
                    font-size: 14px;
                    color: #fff;
                }
            }
        }
        .login-site-switch{
            float: right;
            .login-site-switch-box{
                position: relative;
                height: 60px;
                line-height: 60px;
                color: #fff;
                cursor: default;
                font-size: 14px;
                padding: 0 12px 0 35px;
                img{
                    left: 14px;
                    position: absolute;
                    width: 16px;
                    top: 22px;
                }
                .ivu-icon{
                    margin-left: 5px;
                    vertical-align: middle;
                }
                ul{
                    position: absolute;
                    width: 140px;
                    background-color: #272B2F;
                    right: 0;
                    li{
                        height: 38px;
                        line-height: 38px;
                        padding-left: 12px;
                        &:hover,&.lang-cur{
                            background: #202529;
                            a{
                                color: $theme-color;
                            }
                        }
                        a{
                            color: #fff;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
</style>

