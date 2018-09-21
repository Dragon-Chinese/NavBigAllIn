<template>
    <div class="CapitalPwd">
        <Head></Head>
        
        <div class="account-container">
            <div class="account-title-nav">
                <h3 v-if="$store.state.userInfo.isAccountPwd">{{$t("message.CapitalPwd.container.a1")}}</h3>
                <h3 v-else>{{$t("message.CapitalPwd.container.a2")}}</h3>
                <ul>
                    <li>
                        <router-link to="/Account">{{$t("message.CapitalPwd.container.a3")}}<Icon type="arrow-right-c"></Icon></router-link>
                    </li>
                </ul>
            </div>
            <div class="Capital-from">
                <p v-show="errorTip.show"><Icon type="close-circled"></Icon><t v-t="errorTip.text"></t></p>
                <dl>
                    <dd>
                        <span>{{$t("message.CapitalPwd.container.a4")}}：</span><input type="password" tabindex="1" @focus="inputEvent" v-model="CapitalFrom.accountPassword" :placeholder="$t('message.CapitalPwd.container.a5')">
                    </dd>
                    <dd>
                        <span>{{$t("message.CapitalPwd.container.a6")}}：</span><input type="password" tabindex="2" @focus="inputEvent" v-model="confirmCapitalPwd" :placeholder="$t('message.CapitalPwd.container.a7')">
                    </dd>
                    <!-- <dd>
                        <span>手机号：</span>
                        <Select  v-model="selected" style="width:99px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </Select>
                        <input type="text"  tabindex="3" placeholder="请输入手机号" @focus="inputEvent" style="width:293px;margin-left:4px;">
                    </dd> -->
                    <dd class="yzm">
                        <span>{{$t("message.CapitalPwd.container.a8")}}：</span><input type="text"  :placeholder="$t('message.CapitalPwd.container.a9')" @focus="inputEvent" tabindex="4" v-model="CapitalFrom.captcha"><em @click="sendCaptcha" v-html="codeText"></em>
                    </dd>
                    <dd>
                        <button @click="CapitalFn">{{$t("message.CapitalPwd.container.a10")}}</button>
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
                confirmCapitalPwd:"",
                mobilePhone:"",
                CapitalFrom:{
                    accountPassword:"",
                    captcha:'',
                },
                cityList: [
                    {
                        value: '86',
                    },
                ],
                sendPhoneStringtype:true,
                selected:"86",
                codeText:this.$t("message.CapitalPwd.data.codet"),
                errorTip:{
                    show:false,
                    text:""
                },
                popupShow:false,
                alertContent:{
                    title:"message.CapitalPwd.data.content.title",
                    text:"message.CapitalPwd.data.content.text"
                },
            }
        },
        created () {
            this.mobilePhone=this.$store.state.userInfo.mobile;
        },
        mounted () {
            let seotitle = this.$t('message.user.account.actionList.c.action') + this.$t('message.user.account.actionList.c.title');
            document.title = seotitle;
        },
        methods:{
            inputEvent(){
                this.errorTip={
                    show:false,
                }
            },
            sendCaptcha(){
                let _that=this;
                if(_that.commonValid("phone",_that.mobilePhone)){
                    _that.errorTip={
                        show:true,
                        text:_that.commonValid("phone",_that.mobilePhone).text
                    }
                    return false;
                }
                if (_that.sendPhoneStringtype) {
                    _that.sendPhoneStringtype = false;
                    _that.codeText='<Icon class="ivu-icon ivu-icon-load-c"></Icon>';
                    _that.$axios.get('/public/member/captcha/send',{
                        type:5,
                        mobilePhone:_that.mobilePhone
                    }).then(function (response) {
                            if(response.status==200){
                                if(response.data.result=="success"){
                                    let time = 60;
                                    let sendTimer = setInterval(function(){
                                        time--;
                                        _that.codeText = _that.$t("message.CapitalPwd.sendCaptcha.send1")+time+" s";
                                        if(time < 1){
                                            _that.sendPhoneStringtype = true;
                                            clearInterval(sendTimer);
                                            _that.codeText = _that.$t("message.CapitalPwd.sendCaptcha.send2");
                                        }
                                    },1000)
                                }else{
                                    _that.sendPhoneStringtype = true;
                                    _that.codeText = _that.$t("message.CapitalPwd.sendCaptcha.send2");
                                    if(response.data.error=="1004"){
                                        _that.errorTip={
                                            show:true,
                                            text:_that.$t("message.CapitalPwd.sendCaptcha.send3")
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
                                    text:_that.$t("message.CapitalPwd.sendCaptcha.send4")
                                }
                            }
                        })
                        .catch(function (error) {
                            _that.errorTip={
                                show:true,
                                text:_that.$t("message.CapitalPwd.sendCaptcha.send4")
                            }
                        });
                }
            },
            popupShowFn(){
                this.popupShow= false;
                this.$router.push({ path: '/Account'})
            },
            CapitalFn(){

                const reg1 = /^[0-9]{6,20}$/;
                const reg0 = /^[a-zA-Z]{6,20}$/;
                const reg2 = /^(\w|@|&|%|#){6,20}$/;
                const reg3 = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;

                let _that=this;
                if(_that.CapitalFrom.accountPassword==""){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.CapitalPwd.CapitalFn.text1")
                    }
                    return false;
                }

                if(_that.CapitalFrom.accountPassword.length < 6 || _that.CapitalFrom.accountPassword.length > 20){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.CapitalPwd.CapitalFn.text2")
                    }
                    return false;
                }

                if(reg0.exec(_that.CapitalFrom.accountPassword)){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.CapitalPwd.CapitalFn.text3")
                    }
                    return false;
                }

                if(reg1.exec(_that.CapitalFrom.accountPassword)){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.CapitalPwd.CapitalFn.text4")
                    }
                    return false;
                }

                if(!reg2.exec(_that.CapitalFrom.accountPassword)){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.CapitalPwd.CapitalFn.text5")
                    }
                    return false;
                }

                if(_that.confirmCapitalPwd==""){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.CapitalPwd.CapitalFn.text6")
                    }
                    return false;
                }
                if(_that.CapitalFrom.accountPassword!=_that.confirmCapitalPwd){
                    _that.errorTip={
                        show:true,
                        text:_that.$t("message.CapitalPwd.CapitalFn.text7")
                    }
                    return false;
                }
                if(_that.commonValid("phone",_that.mobilePhone)){
                    _that.errorTip={
                        show:true,
                        text:_that.commonValid("phone",_that.mobilePhone).text
                    }
                    return false;
                }
                if(_that.CapitalFrom.captcha==''){
                     _that.errorTip={
                        show:true,
                        text:_that.$t("message.CapitalPwd.CapitalFn.text8")
                    }
                    return false;
                }

                if(_that.$store.state.userInfo.isAccountPwd){
                     _that.$axios.post('/mobile/member/updateAccountPassword',_that.CapitalFrom)
                        .then(function (response) {
                            let data=response.data;
                            if(data.result=='failure'){
                                let errorCode=parseInt(data.error);
                                if(errorCode=="1007"){
                                    _that.errorTip={
                                        show:true,
                                        text:_that.$t("message.CapitalPwd.CapitalFn.text9")
                                    }
                                }else if(errorCode=="1008"){
                                    _that.errorTip={
                                        show:true,
                                        text:_that.$t("message.CapitalPwd.CapitalFn.text10")
                                    }
                                }else if(errorCode=="1104"){
                                    _that.errorTip={
                                        show:true,
                                        text:_that.$t("message.CapitalPwd.CapitalFn.text11")
                                    }
                                }else{
                                    if(error=="请先发送验证码"){
                                        _that.errorTip={
                                            show:true,
                                            text:_that.$t("message.CapitalPwd.CapitalFn.text10")
                                        }
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
                }else{
                _that.$axios.post('/mobile/member/setAccountPassword',_that.CapitalFrom)
                    .then(function (response) {
                        let data=response.data;
                        if(data.result=='failure'){
                            let errorCode=parseInt(data.error);
                            if(errorCode=="1007"){
                                _that.errorTip={
                                    show:true,
                                    text:_that.$t("message.CapitalPwd.CapitalFn.text9")
                                }
                            }else if(errorCode=="1008"){
                                _that.errorTip={
                                    show:true,
                                    text:_that.$t("message.CapitalPwd.CapitalFn.text10")
                                }
                            }else if(errorCode=="1104"){
                                _that.errorTip={
                                    show:true,
                                    text:_that.$t("message.CapitalPwd.CapitalFn.text11")
                                }
                            }else{
                                if(error=="请先发送验证码"){
                                    _that.errorTip={
                                        show:true,
                                        text:_that.$t("message.CapitalPwd.CapitalFn.text10")
                                    }
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
                 }
            },  
        },
        components: {
            Head,
            
            Footer,
            Popup,
            HelpEntry,
        },
    }
</script>
<style lang="scss">
@import "../assets/sass/setting";
    .CapitalPwd{
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
            .Capital-from{
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
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>

