<template>
    <div class="forgetPwd-box">
        <LoginHead></LoginHead>
        <div class="forgetPwd-body">
            <div class="forgetPwd-body-box">
                <div class="forgetPwd-module">
                    <div class="forgetPwd-form-title">{{$t("message.ForgetPwd.form.title")}}</div>
                    <form action="" id="forgetPwd-form">
                        <div class="forgetPwd-content">
                            <div class="form-item">
                                <span class="form-input">
                                    <input type="text" autocomplete="off" @focus="inputEvent" v-model="forgetPwdForm.mobilePhone" :placeholder="$t('message.ForgetPwd.form.phone')">
                                </span>
                                <div class="form-item-explain" ref="phoneTip"></div>
                            </div>
                             <div class="form-item">
                                <span class="form-input">
                                    <input type="text" autocomplete="off" @focus="inputEvent" v-model="forgetPwdForm.captcha" :placeholder="$t('message.ForgetPwd.form.code')" style="width:260px"><em class="code" @click="sendCaptcha" v-html="codeText"></em>
                                </span>
                                <div class="form-item-explain" ref="yzmTip"></div>
                            </div>
                            <div class="form-item">
                                <span class="form-input">
                                    <input type="password"  v-model="forgetPwdForm.newPassword" @focus="inputEvent" autocomplete="off" :placeholder="$t('message.ForgetPwd.form.pwd')">
                                </span>
                                <div class="form-item-explain" ref="pwdTip"></div>
                            </div>
                            <div class="form-item">
                                <span class="form-input">
                                    <input type="password" autocomplete="off" @focus="inputEvent" v-model="confirmPwd" :placeholder="$t('message.ForgetPwd.form.confirmpwd')">
                                </span>
                                <div class="form-item-explain" ref="confirmPwdTip"></div>
                            </div>
                             <div class="form-item" style="margin-top:33px;">
                                <span class="submit-btn">
                                    <span @click="updataPwd">{{$t("message.ForgetPwd.form.updatapwd")}}</span>
                                </span>
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
    import LoginHead from "./Common/LoginHead";
    import Footer from "./Common/Footer";
    import HelpEntry from "./Common/HelpEntry";
    export default {
        data () {
            return {
                formLoading:false,
                sendPhoneStringtype:true,
                confirmPwd:"",
                codeText:this.$t("message.ForgetPwd.codetext.code1"),
                forgetPwdForm:{
                    mobilePhone:'',
                    newPassword:"",
                    captcha:''
                },
            }
        },
        mounted () {
            let seotitle = this.$t('message.user.login.forgetPwd');
            document.title = seotitle;
        },
        methods:{
            sendCaptcha(){
                let _that=this;
                if(_that.commonValid("phone",_that.forgetPwdForm.mobilePhone)){
                    _that.$refs.phoneTip.innerHTML=_that.$t("message.ForgetPwd.form.phone");
                    return false;
                }
                if (_that.sendPhoneStringtype) {
                    _that.codeText='<Icon class="ivu-icon ivu-icon-load-c"></Icon>';
                    _that.sendPhoneStringtype = false;
                    _that.$axios.get('/public/member/captcha/send',{
                        type:3,
                        mobilePhone:_that.forgetPwdForm.mobilePhone
                    }).then(function (response) {
                            if(response.status==200){
                                if(response.data.result=="success"){
                                    let time = 60;
                                    let sendTimer = setInterval(function(){
                                        time--;
                                        _that.codeText = _that.$t("message.ForgetPwd.codetext.code2")+time+" s";
                                        if(time < 1){
                                            _that.sendPhoneStringtype = true;
                                            clearInterval(sendTimer);
                                            _that.codeText = _that.$t("message.ForgetPwd.codetext.code1");
                                        }
                                    },1000)
                                }else{
                                    if(response.data.error=="1005"){
                                         _that.$refs.phoneTip.innerHTML=_that.$t("message.ForgetPwd.codetext.phonetip")
                                    }else{
                                        console.log(response.data.error)
                                    }
                                    
                                }
                            }else{
                                console.log(response.data.error)
                            }
                        })
                        .catch(function (error) {
                            console.log(error.data)
                        });
                }
            },
            inputEvent(){
                let tip=document.querySelectorAll("div.form-item-explain");
                tip.forEach((item,index) => {
                    item.innerHTML="";
                });
            },
            updataPwd(){
                let _that=this;
                if(_that.commonValid("phone",_that.forgetPwdForm.mobilePhone)){
                    _that.$refs.phoneTip.innerHTML=_that.$t("message.ForgetPwd.form.phone");
                    return false;
                }
                if(_that.forgetPwdForm.captcha==""){
                    _that.$refs.yzmTip.innerHTML=_that.$t("message.ForgetPwd.updataPwd.up1");
                    return false;
                }
                if(_that.commonValid("password",_that.forgetPwdForm.newPassword)){
                    _that.$refs.pwdTip.innerHTML=_that.$t("message.ForgetPwd.form.pwd");
                    return false;
                }
                if(_that.confirmPwd==""){
                    _that.$refs.confirmPwdTip.innerHTML=_that.$t("message.ForgetPwd.updataPwd.up2");
                    return false;
                }
                if(_that.forgetPwdForm.newPassword!=_that.confirmPwd){
                    _that.$refs.confirmPwdTip.innerHTML=_that.$t("message.ForgetPwd.updataPwd.up3");
                    return false;
                }
                
                _that.formLoading=true;
                _that.$axios.get('/public/member/resetPassword', _that.forgetPwdForm).then(function (response) {
                     _that.formLoading=false;
                     if (response.status == 200) {
                        if (response.data.result == "failure") {
                            if(response.data.error=="1007"){
                                _that.$refs.yzmTip.innerHTML=_that.$t("message.ForgetPwd.updataPwd.up4")
                            }else if(response.data.error=="1008"){
                                _that.$refs.yzmTip.innerHTML=_that.$t("message.ForgetPwd.updataPwd.up1")
                            }else{
                                _that.$refs.phoneTip.innerHTML=response.data.error
                            }
                        } else {
                            _that.$Message.success({
                                top: 300,
                                duration: 2,
                                content:_that.$t("message.ForgetPwd.updataPwd.up5"),
                            });
                            setTimeout(function () {
                                _that.$router.push({ path: '/Login'})
                            },2000)
                           
                        }
                     }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });  
            }
        },
        components:{
            LoginHead,
            Footer,
            HelpEntry,
        }
    }
</script>
<style lang="scss">
@import "../assets/sass/setting";
    .forgetPwd-body{
        padding: 85.5px 0;
        text-align: center;
        background: #f5f5f6;
        .forgetPwd-body-box{
            width: 1000px;
            margin: auto;
            position: relative;
            .forgetPwd-module{
                width: 360px;
                margin: 0 auto;
                text-align: center;
                .forgetPwd-form-title{
                    padding-top: 43px;
                    font-size: 30px;
                    color: #373d41;
                    letter-spacing: 1px;
                    line-height: 1;
                }
                #forgetPwd-form{
                    padding: 23px 0 47px;
                    color: #373d41;
                    font-family: Helvetica,Arial,Verdana,PingFang SC,Microsoft YaHei;
                    font-size: 12px;
                    line-height: 1.28571;
                    position: relative;
                    .forgetPwd-content{
                        .form-item{
                            width: 100%;
                            height: 40px;
                            margin-top: 20px;
                            position: relative;
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
                                color: #f15533;
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
                                display: inline-block;
                                font-weight: 700;
                                text-align: center;
                                font-family: inherit;
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

