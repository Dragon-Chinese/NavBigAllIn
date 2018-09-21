<template>
    <div class="footer-menu">
        <div class="footer-main">
            <div class="footer-line" v-if="footerLine"></div>
            <div class="y-row">
                <ul class="footer-main-content">
                    <li>
                        <h3>{{$t("message.footer.server.title")}}</h3>
                        <ul>
                            <li><a @click="locationFn(hrefList.trading,1)">{{$t("message.footer.server.child.tradingCenter")}}</a></li>
                            <li><a @click="locationFn(hrefList.notice,1)">{{$t("message.footer.server.child.systemNotice")}}</a></li>
                            <li><a @click="locationFn(hrefList.applicationCurrency,1)">{{$t("message.footer.server.child.coinApplyFor")}}</a></li>
                        </ul>
                    </li>
                    <li>
                        <h3>{{$t("message.footer.clause.title")}}</h3>
                        <ul>
                            <li><a @click="locationFn(hrefList.agreement,1)">{{$t("message.footer.clause.child.userAgree")}}</a></li>
                            <li><a @click="locationFn(hrefList.privacy,1)">{{$t("message.footer.clause.child.privacyPolicy")}}</a></li>
                            <li><a @click="locationFn(hrefList.rate,1)">{{$t("message.footer.clause.child.rageExplain")}}</a></li>
                    </li>
                    <li>
                        <h3>{{$t("message.footer.aboutUs.title")}}</h3>
                        <ul>
                            <li><a @click="locationFn(hrefList.onlineService,1)">{{$t("message.footer.aboutUs.child.onnlineServer")}}</a></li>
                        </ul>
                    </li>
                    <li>
                        <h3>{{$t("message.footer.community.title")}}</h3>
                        <ol>
                            <li><a @click="locationFn(hrefList.twitter,1)" title="twitter"><img src="../../assets/images/twitter@2x.png" alt=""></a></li>
                            <li><a @click="locationFn(hrefList.facebook,1)" title="facebook"><img src="../../assets/images/facebook@2x.png" alt=""></a></li>
                            <li><a @click="locationFn(hrefList.github,1)" title="github"><img src="../../assets/images/github@2x.png" alt=""></a></li>
                            <li><a @click="locationFn(hrefList.medium,1)" title="medium"><img src="../../assets/images/medium@2x.png" alt=""></a></li>
                            <li><a @click="locationFn(hrefList.reddit,1)" title="reddit"><img src="../../assets/images/reddit-alien@2x.png" alt=""></a></li>
                            <li><a @click="locationFn(hrefList.slack,1)" title="slack"><img src="../../assets/images/slack@2x.png" alt=""></a></li>
                        </ol>
                    </li>
                    <li style="width:12%">
                        <h3>{{$t("message.footer.QRcode.title")}} </h3>
                        <ul>
                            <li><router-link to="/"><img src="../../assets/images/qrcode-mini.jpg" style="max-width:100%;width:100px;" alt=""></router-link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="login-register-footer">
            <div class="footer-content">
                <div class="row copyright">
                    <p class="link-wrap">
                        <em>{{$t("message.footer.partner.title")}}</em>
                        <span>
                            <a>{{$t("message.footer.partner.child.chuangshiziben")}}</a>
                            <a>{{$t("message.footer.partner.child.juziben")}}</a>
                            <a>{{$t("message.footer.partner.child.gongshishiyanshi")}}</a>
                            <a>{{$t("message.footer.partner.child.lierenziben")}}</a>
                            <a>{{$t("message.footer.partner.child.Hcapital")}}</a>
                            <a>{{$t("message.footer.partner.child.chaoxuanziben")}}</a>
                            <a>{{$t("message.footer.partner.child.InnoNext")}}</a>
                            <a>{{$t("message.footer.partner.child.haishangqukuailian")}}</a>
                            <a>{{$t("message.footer.partner.child.Kfund")}}</a>
                            <a>{{$t("message.footer.partner.child.jiamiyuanjing")}}</a>
                            <a>{{$t("message.footer.partner.child.heightFund")}}</a>
                        </span>
                    </p>
                    <!-- <p class="copyright">© 2009-2018 Bithank.com 版权所有 ICP证：京B2-20080101</p> -->
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
                hrefList:{
                    trading:globalUrl.hrefUrl+"/trading/",
                    twitter:"https://twitter.com/pirrer5?s=05",
                    facebook:"https://www.facebook.com/bit.hank.16",
                    github:"https://github.com/bithank",
                    medium:"https://medium.com/@bithank",
                    reddit:"https://reddit.com/u/bithank",
                    slack:"https://bithank.slack.com/",
                    telegram:"https://t.me/bithank",
                    agreement:"https://bithank.zendesk.com/hc/zh-cn/articles/360007162492",
                    rate:"https://bithank.zendesk.com/hc/zh-cn/articles/360007636972",
                    notice:"https://bithank.zendesk.com/hc/zh-cn/sections/360001641991",
                    privacy:"https://bithank.zendesk.com/hc/zh-cn/articles/360010317191",
                    ask:"https://bithank.zendesk.com/hc/zh-cn/sections/360001632412",
                    applicationCurrency:"https://bithank.zendesk.com/hc/zh-cn/articles/360009240971",
                    onlineService:"http://bithank.udesk.cn/im_client/?web_plugin_id=52203"
                },
                footerLine:false
            }
        },
        created () {
            if(this.$route.name=="register" || this.$route.name=="Increment"){
                this.footerLine=true;
            }
        },
        methods:{
            locationFn(href,num){
                if(num==1){
                    window.open(href)
                }else{
                    window.location.href=href;
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
@import "../../assets/sass/setting";
    .footer-main{
        padding-top: 30px;
        background-color: #373d41;
        .footer-line{
            width: 100%;
            height: 1px;
            background: #CFD0D1;
            max-width: 1200px;
            margin: -10px auto 20px;
        }
        &>div.y-row{
            padding-bottom: 30px;
            position: relative;
            box-sizing: border-box;
            border-bottom: 1px solid #4b5054;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            .footer-main-content{
                box-sizing: border-box;
                overflow: hidden;
                &>li{
                    width: 22%;
                    float: left;
                    h3{
                        color: #d7d8d9;
                        font-size: 12px;
                        height: 18px;
                        line-height: 18px;
                        font-weight: bolder;
                    }
                    &>ul{
                        margin-top: 14px;
                        &>li{
                            margin-top: 8px;
                            a{
                                color: #9b9ea0;
                                height: 18px;
                                line-height: 18px;
                                transition: color .3s; 
                                &:hover{
                                    color: $theme-color;
                                }
                            }
                        }
                    }
                    ol{
                        width: 70px;
                        margin-top: 14px;
                        li{
                            margin-bottom: 8px;
                            float: left;
                            &:nth-child(even){
                                margin-left: 30px;
                            }
                        }
                    }
                }
            }
        }
    }
    .login-register-footer{
        box-sizing: border-box;
        font-size: 12px;
        *{
            box-sizing: border-box;
        }
        .footer-content{
            padding: 30px 20px 0 20px;
            background-color: $text-black-color;
            .row{
                width: 100%;
                max-width: 1200px;
                margin:0 auto;
            }
            .copyright{
                color: #73777a;
                font-size: 14px;
                line-height: 1;
                .link-wrap{
                    em{
                        color:#9B9EA0;
                        font-size: 12px;
                        display: inline-block;
                        line-height: 1;
                        margin-right: 40px;
                    }
                    a{
                        display: inline-block;
                        font-size: 12px;
                        color: #73777a;
                        margin-right: 30px;
                        line-height: 1;
                        transition: color .3s;
                        margin-bottom: 30px;
                        &:hover{
                            color:$theme-color;
                        }
                    }
                    span{
                        vertical-align: top;
                        display: inline-block;
                        width: calc(100% - 93px);
                    }
                }
            }
        }
    }
</style>

