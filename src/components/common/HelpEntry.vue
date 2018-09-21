<template>
    <div class="float-tool">
        <div class="module-wrap"  @mouseleave="hideHelpentry">
            <div class="help-entry" :class="{active:visible}">
                <div class="entry-panel" @mouseenter="ShowHelpentry" @mouseleave="hideHelpentry">
                    <div class="panel-close" @click="hideHelpentry"><Icon type="close-round"></Icon></div>
                    <ul>
                        <li>
                            <div class="panel-icon">
                                <img src="../../assets/images/helpQrImg.png" alt="">
                            </div>
                            <div class="panel-content">
                                <a @click="qrCodeShow">
                                    <div>
                                        <div class="panel-content-title">{{$t("message.helpEntry.weChatServer")}}</div>
                                        <div class="panel-content-desc">
                                            <span>{{$t("message.helpEntry.QRcode")}}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="panel-icon">
                                <img src="../../assets/images/serviceImg.png" alt="">
                            </div>
                            <div class="panel-content">
                                <a @click="locationFn(panelHref.adviserHref)">
                                    <div>
                                        <div class="panel-content-title">{{$t("message.helpEntry.smartCounselor")}}</div>
                                        <div class="panel-content-desc">{{$t("message.helpEntry.zendesk")}}</div>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="panel-icon">
                                <img src="../../assets/images/opinionImg.png" alt="">
                            </div>
                            <div class="panel-content">
                                <router-link to="/">
                                    <div>
                                        <div class="panel-content-title">{{$t("message.helpEntry.feedback")}}</div>
                                        <div class="panel-content-desc">support@bithank.com</div>
                                    </div>
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="entry-button" @mouseenter="ShowHelpentry">
                    <img src="../../assets/images/helpLogo.png" alt="">
                    <span>{{$t("message.helpEntry.consultingAdvice")}}</span>
                </div>
            </div>
        </div>
        <div class="qrPopup" v-show="showWechat" @click="showWechat=!showWechat">
            <img src="../../assets/images/wechatQr.png" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                 visible:false,
                 panelHref:{
                    adviserHref:'http://bithank.udesk.cn/im_client/?web_plugin_id=52203' 
                 },
                 showWechat:false
            }
        },
        methods: {
            ShowHelpentry(){
                this.visible=true;
            },
            hideHelpentry(){
                this.visible=false;
            },
            qrCodeShow(){
                this.showWechat=true;
            },
            locationFn(href){
                window.open(href)
            }
        },
        props:{
            showqrCode:''
        }
    }
</script>
<style lang="scss" scoped>
@import "../../assets/sass/setting";
.float-tool {
        position: fixed;
        width: 44px;
        right: 8px;
        bottom: 40%;
        z-index: 250;
        margin-bottom: -90px;
        .module-wrap {
            position: absolute;
            bottom: 0;
            right: 8px;
            width: auto;
            min-width: 0;
            *{
                box-sizing: border-box;
            }
            .help-entry{
                position: relative;
                &.active{
                    visibility: visible;
                    .entry-panel{
                            visibility: visible!important;
                            opacity: 1;
                    }
                }
                @keyframes myfirst
                {
                    from {background: red;}
                    to {background: yellow;}
                }
                .entry-panel{
                    box-sizing: border-box;
                    position: absolute;
                    bottom: 0;
                    width: 320px;
                    min-height: 50px;
                    padding: 20px;
                    background: #fff;
                    box-shadow: 0 6px 12px 0 rgba(0,0,0,.15);
                    z-index: 4;
                    bottom: 0;
                    right: 52px;
                    visibility: hidden;
                    opacity: 0;
                    animation: myfirst .3s;
                    transition: all .3s;
                    .panel-close{
                        position: absolute;
                        right: 20px;
                        top: 20px;
                        cursor: pointer;
                        font-size: 16px;
                        color: #999;
                    }
                    ul{
                        min-height: 24px;
                        padding-left: 0;
                        transition: all .3s;
                        transition-delay: .1s;
                        li{
                            list-style: none;
                            margin-bottom: 20px;
                            .panel-icon{
                                width: 22px;
                                height: 22px;
                                display: inline-block;
                                vertical-align: middle;
                                img{
                                    width: 100%;
                                }
                            }
                            .panel-content{
                                display: inline-block;
                                vertical-align: middle;
                                margin-left: 12px;
                                a{
                                    color: #5f6367;
                                    font-size: 14px;
                                    &:hover div{
                                        color: $theme-color;
                                    }
                                    div{
                                        line-height: 24px;
                                        transition: all .2s ease;
                                    }
                                    .panel-content-title{
                                        color: #373d41;
                                    }
                                    .panel-content-desc{
                                        color: #9b9ea0;
                                        font-size: 12px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .entry-button{
                width: 44px;
                height: auto;
                box-shadow: 0 6px 12px 0 rgba(0,0,0,.15);
                background-color: #33cde5;
                text-align: center;
                position: absolute;
                right: 0;
                bottom: 0;
                img{
                    width: 14px;
                    margin: 8px auto;
                    display:block;
                }
                span{
                    cursor: default;
                    display: inline-block;
                    width: 14px;
                    font-size: 14px;
                    color: #fff;
                    line-height: 17px;
                    writing-mode:tb-rl;
                    letter-spacing:5px
                }
            }
        }
        .qrPopup{
            background: rgba(0,0,0,.55);
            position: fixed;
            top:0;
            left: 0;
            right: 0;
            bottom: 0;
            img{
                position: absolute;
                top: 100px;
                left: 50%;
                margin-left: -200px;
                width: 400px;
                height: 500px;
            }
        }
    }
</style>

