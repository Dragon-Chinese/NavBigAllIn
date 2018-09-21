<template>
    <div class="Authentication">
        <Head></Head>
        
        <div class="account-container">
            <div class="account-title-nav">
                <h3>{{$t("message.AuthenticationPage.C1.title")}}</h3>
                <ul>
                    <li>
                        <router-link to="/Account">{{$t("message.AuthenticationPage.C1.account")}}<Icon type="arrow-right-c"></Icon></router-link>
                    </li>
                </ul>
            </div>
            <div class="C1-box">
                <p v-show="errorTip.show"><Icon type="close-circled"></Icon><t v-t="errorTip.text"></t></p>
                <dl>
                    <dd>
                        <span>{{$t("message.AuthenticationPage.C1.details.name.n1")}}</span><input type="text" @focus="inputEvent" v-model="c1Form.realname" tabindex="1" :placeholder="$t('message.AuthenticationPage.C1.details.name.n2')">
                    </dd>
                    <dd>
                        <span>{{$t("message.AuthenticationPage.C1.details.idcard.card1")}}</span><input type="text" @focus="inputEvent" v-model="c1Form.cardno" tabindex="2" :placeholder="$t('message.AuthenticationPage.C1.details.idcard.card1')">
                    </dd>
                    <dd>
                        <button @click="authentication">{{$t("message.AuthenticationPage.C1.action")}}</button>
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
    import Head from "../Common/Head/";
    
    import Footer from "../Common/Footer";
    import HelpEntry from "../Common/HelpEntry";
    import Popup from "../Common/Popup";
    export default {
        data(){
            return{
                c1Form:{
                    realname:"",
                    cardno:""
                },
                errorTip:{
                    show:false,
                    text:"message.AuthenticationPage.C1.errortip"
                },
                popupShow:false,
                alertContent:{
                    title:"message.AuthenticationPage.C1.alertcontent.title",
                    text:"message.AuthenticationPage.C1.alertcontent.text",
                },
            }
        },
        methods: {
            authentication(){
                let _that=this;
                if(_that.c1Form.realname==''){
                     _that.errorTip={
                        show:true,
                        text:_that.$t("message.AuthenticationPage.C1.authentication.text1")
                    }
                    return false;
                }
                if(_that.commonValid("ID",_that.c1Form.cardno)){
                    _that.errorTip={
                        show:true,
                        text:_that.commonValid("ID",_that.c1Form.cardno).text
                    }
                    return false;
                }
                var realname = _that.c1Form.realname;
                _that.c1Form.realname = realname.replace(/\s+/g,"");
                _that.$axios.post('/mobile/member/realNameCheck',_that.c1Form)
                    .then(function (response) {
                        let data=response.data;
                        if(data.result=='success'){
                            _that.popupShow= !_that.popupShow;
                        }else if(data.error=='1110'){
                            _that.errorTip={
                                show:true,
                                text:_that.$t("message.AuthenticationPage.C1.authentication.text2")
                            }
                        
                        }else if(data.error=='1109'){
                            _that.errorTip={
                                show:true,
                                text:_that.$t("message.AuthenticationPage.C1.authentication.text3")
                            }
                        }else{
                            _that.errorTip={
                                show:true,
                                text:_that.$t("message.AuthenticationPage.C1.authentication.text4")+data.error
                            }
                        }
                    })
                    .catch(function (error) {
                        _that.errorTip={
                            show:true,
                            text:error.data
                        }
                    });
            },
            popupShowFn(){
                this.popupShow= false;
                this.$router.push({ path: '/Account'})
                
            },
            inputEvent(){
                this.errorTip={
                    show:false,
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
<style lang="scss" scoped>
@import "../../assets/sass/setting";
    .Authentication{
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
            .C1-box{
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
                        span{
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

