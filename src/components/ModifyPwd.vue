<template>
    <div class="modifyPwd">
        <Head></Head>
        
        <div class="account-container">
            <div class="account-title-nav">
                <h3>{{$t("message.ModifyPwd.title")}}</h3>
                <ul>
                    <li>
                        <router-link to="/Account">{{$t("message.ModifyPwd.account")}}<Icon type="arrow-right-c"></Icon></router-link>
                    </li>
                </ul>
            </div>
            <div class="modify-from">
                <p v-show="errorTip.show"><Icon type="close-circled"></Icon><t v-t="errorTip.text"></t></p>
                <dl>
                    <dd>
                        <span>{{$t("message.ModifyPwd.modifyfrom.pwd")}}：</span><input type="password" tabindex="1" @focus="inputEvent" v-model="modifyFrom.newPassword" :placeholder="$t('message.ModifyPwd.modifyfrom.pwdtext')">
                    </dd>
                    <dd>
                        <span>{{$t("message.ModifyPwd.modifyfrom.confirmpwd")}}：</span><input type="password" tabindex="2" @focus="inputEvent" v-model="confirmPassword" :placeholder="$t('message.ModifyPwd.modifyfrom.newpwdtext')">
                    </dd>
                    <dd>
                        <span>{{$t("message.ModifyPwd.modifyfrom.phone")}}：</span>
                        <Select  v-model="selected" style="width:98px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.value}}</Option>
                        </Select>
                        <input type="text" v-model="modifyFrom.mobilePhone" tabindex="3" :placeholder="$t('message.ModifyPwd.modifyfrom.phonetext')" @focus="inputEvent" style="width:293px;margin-left:4px;" readonly>
                    </dd>
                    <dd class="yzm">
                        <span>{{$t("message.ModifyPwd.modifyfrom.code")}}：</span><input type="text" :placeholder="$t('message.ModifyPwd.modifyfrom.codetext')" @focus="inputEvent" tabindex="4" v-model="modifyFrom.captcha"><em @click="sendCaptcha" v-html="codeText"></em>
                        <strong>*{{$t("message.ModifyPwd.modifyfrom.codetext1")}}</strong>
                    </dd>
                    <dd>
                        <button @click="updataPwd">{{$t("message.ModifyPwd.modifyfrom.confirm")}}</button>
                    </dd>
                </dl>
            </div>
        </div>
        <Popup :alert="alertContent" v-show="popupShow"  @hidepopup="popupShowFn"></Popup>
        
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from "./Common/Head";
    
    import Footer from "./Common/Footer";
    import HelpEntry from "./Common/HelpEntry";
    import Popup from "./Common/Popup";
    export default {
        data(){
            return{
                confirmPassword:"",
                modifyFrom:{
                    newPassword:"",
                    captcha:'',
                    mobilePhone:''
                },
                cityList: [
                    {
                        value: '86',
                    },
                ],
                sendPhoneStringtype:true,
                selected:"86",
                codeText:this.$t("message.ModifyPwd.codetext1"),
                errorTip:{
                    show:false,
                    text:"message.ModifyPwd.errortip.a1"
                },
                popupShow:false,
                alertContent:{
                    title:"message.ModifyPwd.alertContent.title",
                    text:"message.ModifyPwd.alertContent.text"
                },
            }
        },
        created(){
            this.modifyFrom.mobilePhone = this.$store.state.userInfo.mobile;
        },
        mounted () {
            let seotitle = this.$t('message.user.account.actionList.a.action') + this.$t('message.user.account.actionList.a.title');
            document.title = seotitle;
        },
        methods: {
            inputEvent(){
                this.errorTip={
                    show:false,
                }
            },
            sendCaptcha(){
                let _that=this;
                if(_that.commonValid("phone",_that.modifyFrom.mobilePhone)){
                    _that.errorTip={
                        show:true,
                        text:_that.commonValid("phone",_that.modifyFrom.mobilePhone).text
                    }
                    return false;
                }
                if (_that.sendPhoneStringtype) {
                     _that.codeText='<Icon class="ivu-icon ivu-icon-load-c"></Icon>';
                    _that.sendPhoneStringtype = false;
                    _that.$axios.get('/public/member/captcha/send',{
                        type:3,
                        mobilePhone:_that.modifyFrom.mobilePhone
                    }).then(function (response) {
                            if(response.status==200){
                                if(response.data.result=="success"){
                                    let time = 60;
                                    let sendTimer = setInterval(function(){
                                        time--;
                                        _that.codeText = _that.$t("message.ModifyPwd.codetext2")+time+" s";
                                        if(time < 1){
                                            _that.sendPhoneStringtype = true;
                                            clearInterval(sendTimer);
                                            _that.codeText = _that.$t("message.ModifyPwd.codetext1");
                                        }
                                    },1000)
                                }else{
                                    _that.sendPhoneStringtype = true;
                                    _that.codeText = _that.$t("message.ModifyPwd.codetext1");
                                    if(response.data.error=="1004"){
                                        _that.errorTip={
                                            show:true,
                                            text:_that.$t("message.ModifyPwd.errortip.a2")
                                        }
                                    }else{
                                        _that.errorTip={
                                            show:true,
                                            text:response.data.error
                                        }
                                    }
                                }
                            }else{
                                _that.errorTip={
                                    show:true,
                                    text:_that.$t("message.ModifyPwd.errortip.a3")
                                }
                            }
                        })
                        .catch(function (error) {
                            _that.errorTip={
                                show:true,
                                text:_that.$t("message.ModifyPwd.errortip.a3")
                            }
                        });
                }
            },
            popupShowFn(){
                this.popupShow= false;
                //this.$router.push({ path: '/Account'})
                //退出登录
                _that.$axios.get('/public/user/logoutAjax')
                    .then(function (response) {
                        let data=response.data;
                        if(response.status==200){
                            _that.$store.commit("isLoginFn",false);
                            _that.$store.commit("getUserInfo","");
                            _that.$router.push({ path: '/Login'})
                        }
                    });
            },
            updataPwd(){

                let _that=this;
                if(_that.commonValid("password",_that.modifyFrom.newPassword)){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.ModifyPwd.modifyfrom.newpwd")
                    }
                    return false;
                }
                if(_that.confirmPassword==""){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.ModifyPwd.errortip.a4")
                    }
                    return false;
                }
                if(_that.modifyFrom.newPassword!=_that.confirmPassword){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.ModifyPwd.errortip.a5")
                    }
                    return false;
                }
                if(_that.commonValid("phone",_that.modifyFrom.mobilePhone)){
                    _that.errorTip={
                        show:true,
                        text:_that.commonValid("phone",_that.modifyFrom.mobilePhone).text
                    }
                    return false;
                }
                if(_that.modifyFrom.captcha==''){
                     _that.errorTip={
                        show:true,
                        text:_that.$t("message.ModifyPwd.errortip.a6")
                    }
                    return false;
                }
                _that.$axios.post('/public/member/resetPassword',_that.modifyFrom)
                    .then(function (response) {
                        let data=response.data;
                        if(data.result=='failure'){
                            let errorCode=parseInt(data.error);
                            if(errorCode=="1007"){
                                _that.errorTip={
                                    show:true,
                                    text:_that.$t("message.ModifyPwd.errortip.a7")
                                }
                            }
                        }else{
                            _that.popupShow= !_that.popupShow;
                        }
                    })
                    .catch(function (error) {
                        _that.errorTip={
                            show:true,
                            text:error
                        }
                    }); 
            },  
        },
        components: {
            Head,
            
            Popup,
            Footer,
            HelpEntry,
        },
    }
</script>
<style lang="scss">
@import "../assets/sass/setting";
    .modifyPwd{
        background: #f5f5f6;
        .account-container{
            margin: 120px auto 0;
            max-width:1200px;
            .account-title-nav{
                padding-top: 10px;
                color: #333;
                border-bottom: 1px solid #ddd;
                &:after{
                    content:"";
                    display: block;
                    clear: both;
                }
                h3{
                    float: left;
                    padding: 20px;
                    font-size: 16px;
                }
                ul{
                    float: right;
                    li{
                        float: left;
                        font-size: 16px;
                        cursor: pointer;
                        a{
                            padding: 23px 20px; 
                            display: inline-block;
                            line-height: 1;
                            color: $theme-color;
                        }
                        i{
                            margin-left: 10px;
                            font-size: 18px;
                            vertical-align: text-bottom;
                        }
                        &.active{
                            color: $theme-color;
                            a{
                                color: $theme-color;
                                border-bottom: 2px solid $theme-color;
                            }
                        }
                    }
                }
            }
            .modify-from{
                background: #fff;
                margin-top: 20px;
                margin-bottom: 30px;
                border: 1px solid #E7E7E8;
                min-height: 600px;
                position: relative;
                &>p{
                    position: absolute;
                    top: 30px;
                    left: 50%;
                    margin-left: -200px;
                    width: 400px;
                    font-size: 14px;
                    background: #FEEEEB;
                    line-height: 1;
                    color: #F15533;
                    text-align: left;
                    padding:8px 12px;
                    i{
                        margin-right: 15px;
                        font-size:16px;
                        vertical-align: text-bottom;
                    }
                }
                dl{
                    width: 400px;
                    margin: 100px auto 0;
                    dd{
                        position: relative;
                        margin-bottom: 30px;
                        input{
                            color: #373d41;
                            font-size: 12px;
                            height: 40px;
                            line-height: 40px;
                            margin: 0;
                            padding: 0 10px;
                            width: 100%;
                            border: 1px solid #dcdcdc;
                            outline: none;
                            font-weight: 400;
                            vertical-align: middle;
                            background-color: transparent;
                            &:hover,&:focus{
                                border-color: $theme-color;
                                box-shadow: 0 1px 6px rgba(0, 183, 211,.2);
                            }
                        }
                        &.yzm{
                            input{
                                width: 210px;
                                margin-right: 10px;
                            }
                            em{
                                display: inline-block;
                                width: 180px;
                                height: 40px;
                                line-height: 40px;
                                border: 1px solid #FF751A;
                                color: #FF751A;
                                text-align: center;
                                background:rgba(255,241,232,1);
                                border-radius:4px;
                                cursor: pointer;
                                vertical-align: middle;
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
                        &>span{
                            position: absolute;
                            left: -125px;
                            top:12px;
                            color: #333;
                            font-size: 14px;
                            display: block;
                            text-align: right;
                            width: 112px;
                            line-height: 1;
                        }
                        p{
                            position: absolute;
                            width: 300px;
                            text-align: left;
                            left: 420px;
                            color: #333;
                            font-size: 14px;
                            top: 11px;
                            a{
                                color: #0066CC;
                            }
                        }
                        strong{
                            color: #FF751A;
                            position: absolute;
                            bottom: -22px;
                            line-height: 1;
                            font-weight: 400;
                            display: block;
                        }
                        .ivu-select{
                            .ivu-select-selection{
                                border-radius: 0;
                                height: 40px;
                                .ivu-select-selected-value{
                                    height: 40px;
                                    line-height: 40px;
                                }
                                &:hover{
                                     border-color: $theme-color;
                                    box-shadow: 0 1px 6px rgba(0, 183, 211,.2);
                                }
                            }
                            .ivu-select-item-selected.ivu-select-item-focus{
                                background: $theme-color;
                            }
                            .ivu-select-selection-focused{
                                border-color: $theme-color;
                                box-shadow: 0 1px 6px rgba(0, 183, 211,.2);
                            }
                        }
                        button{
                            width:400px;
                            height:40px;
                            line-height: 40px;
                            color: #fff;
                            text-align: center;
                            font-size: 14px;
                            background: $theme-color;
                            margin-top: 30px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>

