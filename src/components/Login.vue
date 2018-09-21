<template>
    <div class="login-box">
        <LoginHead></LoginHead>
        <div class="login-body">
            <div class="login-body-box">
                <div>
                    <router-link to=""  class="login-body-txt-box">
                        <h1 class="box-title">{{$t("message.user.login.title")}}</h1>
                        <p>{{$t("message.user.login.desc")}}</p>
                    </router-link>
                </div>
                <div class="login-module">
                    <div class="login-window">
                        <div class="login-form-title">{{$t("message.user.login.login")}}</div>
                        <form action="" id="login-form">
                            <p v-show="errorTip.show"><Icon type="close-circled"></Icon><span v-t="errorTip.text"></span></p>
                            <div class="login-content">
                                <dl>
                                    <dd><input type="text" name="loginId"  @keyup.enter="Login" class="fm-text" v-model="loginFrom.name" tabindex="1" :placeholder="$t('message.user.login.inputMobile')" @focus="inputEvent" autocorrect autocapitalize="off"></dd>
                                    <dd><input type="password" name="password"  @keyup.enter="Login" class="fm-text" tabindex="2" v-model="loginFrom.password" :placeholder="$t('message.user.login.passwordTxt')" @focus="inputEvent" autocorrect autocapitalize="off"></dd>
                                    <dd><input type="text" name="yzm" @keyup.enter="Login" class="fm-text" tabindex="3" v-model="loginFrom.code" :placeholder="$t('message.user.login.inputCode')" @focus="inputEvent" autocorrect autocapitalize="off" autocomplete="off" style="width:230px;"><span class="yzm"><img @click="graphicalCaptcha"></span></dd>
                                </dl>
                                <div class="submit-btn">
                                    <span class="fm-button" @click.enter="Login">{{$t("message.user.login.login")}}</span>
                                </div>
                                <div class="login-other clearfix">
                                    <span><router-link to="/ForgetPwd">{{$t("message.user.login.forgetPwd")}}</router-link></span><span><router-link to="/Register">{{$t("message.user.login.register")}}</router-link></span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="form-loading" v-show="formLoading">
                        <Spin fix>
                            <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
                            <div>Loading</div>
                        </Spin>
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
                fromUrl:"/Home",
                loginFrom:{
                    name:"",
                    password:"",
                    code:"",
                    loginType:1
                },
                errorTip:{
                    show:false,
                    text:"message.user.login.errorTip.userNamePassword"
                }
            }
        },
        mounted () {
            this.graphicalCaptcha();
            let seotitle = this.$t('message.user.login.login');
            document.title = seotitle;
        },
        methods:{
            inputEvent(){
                 this.errorTip={
                    show:false,
                    text:""
                }
            },
            Login(){
                let _that=this;
                if(_that.commonValid("phone",_that.loginFrom.name)){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.user.login.inputMobile")
                    }
                    return false;
                }
                if(_that.commonValid("password",_that.loginFrom.password)){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.user.login.inputPassword")
                    }
                    return false;
                }
                if(_that.loginFrom.code==''){
                     _that.errorTip={
                        show:true,
                        text:_that.$t("message.user.login.errorTip.checkCodeNotEmpty")
                    }
                    return false;
                }
                _that.formLoading=true;
                _that.$axios.post('/public/user/login',_that.loginFrom)
                    .then(function (response) {
                        _that.formLoading=false;
                        let data=response.data;
                        if(data.result=='failure'){
                            let errorCode=parseInt(data.error);
                            if(errorCode=="1016"){
                                _that.errorTip={
                                    show:true,
                                    text:_that.$t("message.user.login.errorTip.accountNotExist")
                                }
                            }else if(errorCode=="1014"){
                                _that.errorTip={
                                    show:true,
                                    text:_that.$t("message.user.login.errorTip.checkCode")
                                }
                            }else if(errorCode=="1006"){
                                _that.errorTip={
                                    show:true,
                                    text:_that.$t("message.user.login.errorTip.checkCodeIsEmpty")
                                }
                            }else if(errorCode=="1010"){
                                _that.errorTip={
                                    show:true,
                                    text:_that.$t("message.user.login.errorTip.limitation")
                                }
                            }else if(errorCode=="1017"){
                                _that.errorTip={
                                    show:true,
                                    text:_that.$t("message.user.login.errorTip.banned")
                                }
                            }else{
                                _that.errorTip={
                                    show:true,
                                    text:_that.$t("message.user.login.errorTip.userNamePassword")
                                }
                            }
                            _that.graphicalCaptcha();
                        }else{
                            _that.$store.commit("isLoginFn",true);
                            _that.fromUrl = localStorage.getItem('from');
                            if(_that.fromUrl){
                                location.href = _that.fromUrl;
                            }else{
                                _that.$router.replace({path:_that.$route.query.redirect || '/Home'})
                            }
                        }
                    })
                    .catch(function (error) {
                        _that.formLoading=false;
                        _that.errorTip={
                            show:true,
                            text:_that.$t("message.user.login.errorTip.other")
                        }
                        _that.graphicalCaptcha();
                    }); 
            },
            graphicalCaptcha(){
                this.$axios.getType('/public/code/get',"","blob")
                    .then(function (response) {
                        let blob =response.data;
                        let img=document.querySelector(".yzm img");
                        img.src=window.URL.createObjectURL(blob)
                    })
                    .catch(function (error) {
                        console.log(error);
                    }); 
            }
        },
        components:{
            LoginHead,
            Footer,
            HelpEntry
        },
    }
</script>
<style lang="scss">
@import "../assets/sass/setting";
    html{
        background: #373d41;
    }
    .login-box{
        background-color: #1F2325;
        background-image: url("../assets/images/loginBanner.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    .login-body{
        padding: 84px 0 118px;
        text-align: center;
        .login-body-box{
            width: 990px;
            margin: auto;
            position: relative;
            height: 388px;
            .login-body-txt-box{
                position: absolute;
                left: 0;
                color: #fff;
                text-align: left;
                top: 90px;
                .box-title{
                    font-size: 30px;
                    color: #FFF;
                    line-height: 36px;
                    margin-bottom: 19px;
                    font-weight: bold;
                }
                p{
                   font-size: 14px;
                   line-height:30px;
                   color: #FFF;
                   width: 275px;
                }
            }
            .login-module{
                width: 380px;
                margin-top: 22px;
                border: none;
                position: absolute;
                right: 0;
                background: #fff;
                .login-window{
                    padding-top: 30px;
                    width: 330px;
                    margin: 0 auto;
                    position: relative;
                    .login-form-title{
                        font-size: 18px;
                        color: $text-black-color;
                        line-height: 1;
                        text-align: left;
                    }
                    #login-form{
                        margin-top: 40px;
                        position: relative;
                        p{
                            position: absolute;
                            top: -32px;
                            width: 100%;
                            font-size: 14px;
                            background: #FEEEEB;
                            line-height: 1;
                            color: #F15533;
                            text-align: left;
                            padding:5px 12px;
                            i{
                                margin-right: 15px;
                                font-size:16px;
                                vertical-align: text-bottom;
                            }
                        }
                        .login-content{
                            dd{
                                padding: 0;
                                margin-bottom: 20px;
                                .fm-text{
                                    width: 100%;
                                    background: #FFF;
                                    border: 1px solid #D7D8D9;
                                    height: 40px;
                                    line-height: 40px;
                                    padding: 0 10px;
                                    box-sizing: border-box;
                                    outline: 0;
                                    box-shadow: none;
                                    font-size: 12px;
                                    color: #595959;
                                    &:hover{
                                        border-color: $theme-color;
                                    }
                                    &:focus{
                                        border-color: $theme-color;
                                        box-shadow: 0 0 2px #a6cfff;
                                    }
                                }
                                .yzm{
                                    width: 90px;
                                    display: inline-block;
                                    height: 40px;
                                    vertical-align: bottom;
                                    margin-left: 10px;
                                    cursor: pointer;
                                    img{
                                        width: 100%;
                                        height: 100%;
                                        vertical-align: middle;
                                    }
                                }
                            }
                            .submit-btn{
                                .fm-button{
                                    width: 100%;
                                    background: $theme-color;
                                    height: 40px;
                                    line-height: 40px;
                                    font-weight: 700;
                                    text-align: center;
                                    color: #fff;
                                    border: 1px solid $theme-color;
                                    cursor: pointer;
                                    box-sizing: border-box;
                                    font-size: 14px;
                                    border-radius: 0;
                                    box-shadow: 0 1px 1px #ebe7e6;
                                    display: inline-block;
                                    &:hover{
                                        background-color: $theme-color;
                                        border-color: $theme-color;
                                    }
                                    &:focus{
                                        outline: 0;
                                    }
                                }
                            }
                            .login-other{
                                margin-top: 13px;
                                margin-bottom: 30px;
                                span{
                                    float: right;
                                    line-height: 1;
                                    &:first-child{
                                        float: left;
                                    }
                                    a{
                                        color: #B0B4B5;
                                        &:hover{
                                            color: $theme-color;
                                        }
                                    }
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
                    .spin-icon-load{
                        animation: ani-demo-spin 1s linear infinite;
                    }
                    @keyframes ani-demo-spin {
                        from { transform: rotate(0deg);}
                        50%  { transform: rotate(180deg);}
                        to   { transform: rotate(360deg);}
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

