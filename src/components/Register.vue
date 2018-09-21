<template>
    <div class="register-box">
        <LoginHead></LoginHead>
        <div class="register-body">
            <div class="register-body-box">
                <div class="register-module">
                    <div class="register-form-title">{{$t("message.user.register.title")}}</div>
                    <p>{{$t("message.user.register.existingAccount")}}<router-link to="/Login">{{$t("message.user.register.quicklyLogin")}}</router-link></p>
                    <form action="" id="register-form">
                        <div class="register-content">
                            <div class="form-item">
                                <span class="form-input">
                                    <input type="text" autocomplete="off" v-model="registerForm.mobilePhone" @focus="inputEvent" :placeholder="$t('message.user.register.inputMobile')" >
                                </span>
                                <div class="form-item-explain" ref="phoneTip">
                                </div>
                            </div>
                            <div class="form-item">
                                <span class="form-input">
                                    <input type="password" autocomplete="off" v-model="registerForm.password"  @focus="inputEvent" :placeholder="$t('message.user.register.passwordTxt')">
                                </span>
                                <div class="form-item-explain" ref="pwdTip">
                                </div>
                            </div>
                            <div class="form-item">
                                <span class="form-input">
                                    <input type="password" autocomplete="off" v-model="confirmPwd" @focus="inputEvent" :placeholder="$t('message.user.register.repassword')">
                                </span>
                                <div class="form-item-explain" ref="confirmPwdTip">
                                </div>
                            </div>
                            <!-- <div class="form-item">
                                <span class="form-input">
                                    <span class="form-item-addon">+86</span><input type="text" autocomplete="off" placeholder="请输入手机号码">
                                </span>
                                <div class="form-item-explain">
                                    请输入你的手机号码
                                </div>
                            </div> -->
                            <div class="form-item">
                                <span class="form-input">
                                    <input type="text" autocomplete="off" v-model="registerForm.captcha" @focus="inputEvent"  :placeholder="$t('message.user.register.inputCode')" style="width:260px"><em class="code" @click="sendCaptcha" v-html="codeText"></em>
                                </span>
                                <div class="form-item-explain" ref="yzmTip">
                                </div>
                            </div>
                            <div class="form-item">
                                <span class="form-input">
                                    <input type="text" autocomplete="off" v-model="registerForm.superUuid" @focus="inputEvent" :placeholder="$t('message.user.register.inviteCode')">
                                </span>
                                <div class="form-item-explain" ref="superUuidTip">
                                </div>
                            </div>
                            <!-- <div class="form-item">
                                <SlidingVerificatio @slideOk="slideOkFn"></SlidingVerificatio>
                                <div class="form-item-explain" ref="slideTip">
                                </div>
                            </div> -->
                             <div class="form-item">
                                <span class="submit-btn">
                                    <span @click="registerFn">{{$t("message.user.register.register")}}</span>
                                </span>
                            </div>
                            <div class="form-item" style="line-height:1;text-align:left;margin-top:20px;margin-bottom: 35px;height:auto;">
                                <Checkbox v-model="checkboxSingle" :size="checkboxSize" @on-change="inputEvent"></Checkbox><span>{{$t("message.user.register.haveRead")}}<a @click="locationFn">{{$t("message.user.register.userAgree")}}</a>{{$t("message.user.register.agree")}}</span>
                                <div class="form-item-explain" ref="agreementTip" style="top:1px">
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="form-loading" v-show="formLoading">
                        <div class="loading-icon"></div>
                        <div class="loading-mask"></div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import LoginHead from "./Common/loginHead";
    import Footer from "./Common/Footer";
    import HelpEntry from "./Common/HelpEntry";
    import SlidingVerificatio from "./Pages/SlidingVerificatio";
    export default {
        data () {
            return {
                checkboxSize:"large",
                checkboxSingle:false,
                formLoading:false,
                sendPhoneStringtype:true,
                confirmPwd:"",
                codeText:this.$t("message.user.register.codeText.code1"),
                registerForm:{
                    mobilePhone:'',
                    password:"",
                    captcha:'',
                    superUuid:""
                },
                slideState:false,
                slideStateTimer:""
            }
        },
        mounted () {
            if(this.$route.query){
                this.$set(this.registerForm, 'superUuid',this.$route.query.uuid)
            }
            let seotitle = this.$t('message.user.register.register');
            document.title = seotitle;
        },
        methods:{
            inputEvent(){
                let tip=document.querySelectorAll("div.form-item-explain");
                tip.forEach((item,index) => {
                    item.innerHTML="";
                });
            },
            slideOkFn(){
                this.slideState=true;
                this.$refs.slideTip.innerHTML="";
            },
            locationFn(){
                window.open("https://bithank.zendesk.com/hc/zh-cn/articles/360007162492");
            },
            sendCaptcha(){
                let _that=this;
                if(_that.commonValid("phone",_that.registerForm.mobilePhone)){
                    _that.$refs.phoneTip.innerHTML=_that.$t("message.user.register.inputMobile");
                    return false;
                }
                if (_that.sendPhoneStringtype) {
                    _that.codeText='<Icon class="ivu-icon ivu-icon-load-c"></Icon>';
                    _that.sendPhoneStringtype = false;
                    _that.$axios.get('/public/member/captcha/send',{
                        type:1,
                        mobilePhone:_that.registerForm.mobilePhone
                    }).then(function (response) {
                            if(response.status==200){
                                if(response.data.result=="success"){
                                    let time = 60;
                                    let sendTimer = setInterval(function(){
                                        time--;
                                        _that.codeText = _that.$t("message.user.register.codeText.code2") + time + " s";
                                        if(time < 1){
                                            _that.sendPhoneStringtype = true;
                                            clearInterval(sendTimer);
                                            _that.codeText = _that.$t("message.user.register.codeText.code1");
                                        }
                                    },1000)
                                }else{
                                    _that.codeText = _that.$t("message.user.register.codeText.code1");
                                    _that.sendPhoneStringtype = true;
                                    if(response.data.error=="1004"){
                                        _that.$refs.phoneTip.innerHTML= _that.$t('message.user.register.codeText.phonetip');
                                    }else{
                                        console.log(error.data)
                                    }
                                }
                            }else{
                               console.log(error.data)
                            }
                        })
                        .catch(function (error) {
                            console.log(error.data)
                        });
                }
            },
            registerFn(){
                let _that=this;
                if(_that.commonValid("phone",_that.registerForm.mobilePhone)){
                    _that.$refs.phoneTip.innerHTML=_that.$t("message.user.register.inputMobile");
                    return false;
                }
                if(_that.commonValid("password",_that.registerForm.password)){
                    _that.$refs.pwdTip.innerHTML=_that.$t("message.user.register.passwordTxt");
                    return false;
                }
                if(_that.confirmPwd==""){
                    _that.$refs.confirmPwdTip.innerHTML = _that.$t("message.user.register.registerFn.confirm");
                    return false;
                }
                if(_that.registerForm.password!=_that.confirmPwd){
                    _that.$refs.confirmPwdTip.innerHTML = _that.$t("message.user.register.registerFn.confirm1");
                    return false;
                }
                if(_that.registerForm.captcha==""){
                    _that.$refs.yzmTip.innerHTML = _that.$t("message.user.register.registerFn.confirm2");
                    return false;
                }
                // if(_that.slideState==false){
                //     _that.$refs.slideTip.innerHTML="请拖动滑动验证码";
                //     return false;
                // }
                if(!_that.checkboxSingle){
                    _that.$refs.agreementTip.innerHTML = _that.$t("message.user.register.registerFn.confirm3");
                    return false;
                }
                _that.formLoading=true;
                _that.$axios.get('/public/member/register',_that.registerForm)
                    .then(function (response) {
                     _that.formLoading=false;
                     if (response.status == 200) {
                         //直接登录
                        if (response.data.result == "failure") {
                            if(response.data.error=="1008"){
                                _that.$refs.yzmTip.innerHTML = _that.$t("message.user.register.registerFn.confirm4");
                            }else if(response.data.error=="1007"){
                                _that.$refs.yzmTip.innerHTML = _that.$t("message.user.register.registerFn.confirm5");
                            }
                        } else {
                            _that.$store.commit("isLoginFn",true);
                            _that.$router.replace({ path: '/Home'})
                        }
                     }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });  
            },
        },
        destroyed () {
           clearInterval(this.slideStateTimer)
        },
        components:{
            LoginHead,
            Footer,
            SlidingVerificatio,
            HelpEntry,
        }
    }
</script>
<style lang="scss">
@import "../assets/sass/setting";
    .register-body{
        background-color: #F5F5F6;
        padding: 80px 0;
        text-align: center;
        .register-body-box{
            width: 1000px;
            margin: auto;
            position: relative;
            background-color: #fff;
            .register-module{
                width: 360px;
                margin: 0 auto;
                text-align: center;
                .register-form-title{
                    padding-top: 43px;
                    font-size: 30px;
                    color: #373d41;
                    letter-spacing: 1px;
                    line-height: 1;
                }
                p{
                    position: absolute;
                    top: 43px;
                    right: 40px;
                    font-size: 12px;
                    color: #73777a;
                    letter-spacing: .4px;
                    line-height: 30px;
                    text-align: left;
                }
                #register-form{
                    padding: 23px 0 47px;
                    color: #373d41;
                    font-family: Helvetica,Arial,Verdana,PingFang SC,Microsoft YaHei;
                    font-size: 12px;
                    line-height: 1.28571;
                    position: relative;
                    // &>p{
                    //     position: absolute;
                    //     top: 8px;
                    //     left: 0;
                    //     width: 100%;
                    //     font-size: 14px;
                    //     background: #FEEEEB;
                    //     line-height: 1;
                    //     color: #F15533;
                    //     text-align: left;
                    //     padding:5px 12px;
                    //     i{
                    //         margin-right: 15px;
                    //         font-size:16px;
                    //         vertical-align: text-bottom;
                    //     }
                    // }
                    .register-content{
                        .form-item{
                            width: 100%;
                            height: 40px;
                            margin-top: 20px;
                            position: relative;
                            a{
                                color:#00c1de;
                            }
                            .form-input{
                                border-color: #c3c5c6;
                                width: 100%;
                                height: 100%;
                                display: inline-block;
                                // .form-item-addon{
                                //     width: 48px;
                                //     background: #fff;
                                //     font-size: 14px;
                                //     height: 40px;
                                //     line-height: 38px;
                                //     display: inline-block;
                                //     vertical-align: middle;
                                //     padding: 0 8px;
                                //     border:1px solid #c3c5c6;
                                //     white-space: nowrap;
                                //     color: #9b9ea0;
                                //     border-right: none;
                                //     &+input{
                                //         width: 272px;
                                //     }
                                // }
                                input{
                                    color: #373d41;
                                    font-size: 12px;
                                    height: 40px;
                                    line-height: 40px;
                                    margin: 0;
                                    padding: 0 10px;
                                    width: 100%;
                                    border:1px solid #c3c5c6;
                                    outline: none;
                                    font-weight: 400;
                                    vertical-align: middle;
                                    background-color: transparent;
                                    &:hover, &:focus{
                                        border-color: $theme-color;
                                    }
                                }
                                .code{
                                    width: 90px;
                                    height: 40px;
                                    line-height: 40px;
                                    text-align: center;
                                    background: #DADBDC;
                                    color: #595959;
                                    display: inline-block;
                                    margin-left: 10px;
                                    vertical-align: bottom;
                                    cursor: pointer;
                                    .ivu-icon-load-c{
                                        font-size: 24px;
                                        vertical-align: sub;
                                        animation: ani-demo-spin 1s linear infinite;
                                        @keyframes ani-demo-spin {
                                            from { transform: rotate(0deg);}
                                            50%  { transform: rotate(180deg);}
                                            to   { transform: rotate(360deg);}
                                        }
                                    }
                                }
                            }
                            .form-item-explain{
                                font-size: 14px;
                                color: #E13535;
                                line-height: 14px;
                                position: absolute;
                                left: 380px;
                                top: 11px;
                                width: 300px;
                                text-align: left;
                            }
                        }
                        .submit-btn{
                            span{
                                width: 100%;
                                background: $theme-color;
                                height: 40px;
                                line-height: 40px;
                                font-weight: 700;
                                text-align: center;
                                font-family: inherit;
                                display: inline-block;
                                color: #fff;
                                border: 1px solid $theme-color;
                                cursor: pointer;
                                box-sizing: border-box;
                                font-size: 14px;
                                border-radius: 0;
                                box-shadow: 0 1px 1px #ebe7e6;
                                &:hover{
                                    background-color: $theme-color;
                                    border-color: $theme-color;
                                }
                                &:focus{
                                    outline: 0;
                                }
                            }
                        }
                    }
                }
                .form-loading{
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    .loading-icon{
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        background: url("https://g.alicdn.com/vip/havana-login/0.3.2/images/ajax-loader-16x16.gif") no-repeat center center;
                        z-index: 2;
                    }
                    .loading-mask{
                        background-color: #fff;
                        z-index: 1;
                        opacity: .8;
                        filter: alpha(opacity=80);
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                    
                }
            }
        }
    }
</style>

