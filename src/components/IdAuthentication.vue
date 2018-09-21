<template>
    <div class="Authentication">
        <Head></Head>
        
        <div class="account-container">
            <div class="account-title-nav">
                <h3>{{$t("message.IdAuthentication.title")}}</h3>
                <ul>
                    <li>
                        <router-link to="/Account">{{$t("message.IdAuthentication.menu.m1")}}</router-link>
                    </li>
                    <li class="active">
                        <router-link to="/IdAuthentication">{{$t("message.IdAuthentication.menu.m2")}}</router-link>
                    </li>
                    <li>
                        <router-link to="/Recommend">{{$t("message.IdAuthentication.menu.m3")}}</router-link>
                    </li>
                </ul> 
            </div>
            <div class="id-box">
                <div :class="{authenActive:userAuthentication>0}" >
                    <i class="c1-icon"></i> 
                    <div>
                        <span class="triangle-icon"></span>
                        <i class="c1"></i>
                        <ul v-if="userAuthentication>0">
                            <li>{{$t("message.IdAuthentication.idbox.userdetail.user1")}}：{{userInfo.name}}</li>
                            <li>{{$t("message.IdAuthentication.idbox.userdetail.user2")}}</li>
                            <li>{{$t("message.IdAuthentication.idbox.userdetail.user3")}}：{{replaceID}}</li>
                        </ul>
                        <h3 class="c3-state" v-else>{{$t("message.IdAuthentication.idbox.title1")}}</h3>
                        <p>{{$t("message.IdAuthentication.idbox.text1")}}</p>
                        <button v-if="userAuthentication>0">{{$t("message.IdAuthentication.idbox.confirm1")}}</button>
                        <router-link to="/AuthenticationC1" v-else><button>{{$t("message.IdAuthentication.idbox.confirm2")}}</button></router-link>
                    </div>
                </div>
                <div :class="{authenActive:userAuthentication>1}" >
                    <i class="c2-icon"></i>
                    <div>
                        <span class="triangle-icon"></span>
                        <i class="c2"></i>
                        <h3 class="c3-state" v-if="flow==0" v-t="loadingText"></h3>
                        <h3 class="c2-state" v-else-if="flow==1" v-t="loadingText"></h3>
                        <h3 v-else-if="flow==2" v-t="loadingText"></h3>
                        <h3 class="c3-state" v-else-if="flow==3">{{$t("message.IdAuthentication.idbox.title2")}}</h3>
                        <p>{{$t("message.IdAuthentication.idbox.text2")}}</p>
                        <button v-if="userAuthentication>1">{{$t("message.IdAuthentication.idbox.confirm1")}}</button>
                        <button @click="authenC2" v-else>{{$t("message.IdAuthentication.idbox.confirm2")}}</button>
                    </div>
                </div>
                <div :class="{authenActive:userAuthentication>2}" >
                    <i class="c3-icon"></i>
                    <div>
                        <span class="triangle-icon"></span>
                        <i class="c3"></i>
                        <h3 v-if="userAuthentication>2">{{$t("message.IdAuthentication.idbox.confirm1")}}</h3>
                        <h3 class="c3-state" v-else>{{$t("message.IdAuthentication.idbox.title1")}}</h3>
                        <p>{{$t("message.IdAuthentication.idbox.text3")}}</p>
                        <button v-if="userAuthentication>2">{{$t("message.IdAuthentication.idbox.confirm1")}}</button>
                        <button @click="authenC3" v-else>{{$t("message.IdAuthentication.idbox.confirm2")}}</button>
                    </div>
                </div>
            </div>
        </div>

        <C3 @hidepopup="hideC3" v-show="c3Show"></C3>
        <Popup :alert="alertContent" v-show="popupShow"  @hidepopup="popupShowFn"></Popup>
        
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from "./Common/Head";
    
    import Footer from "./Common/Footer";
    import HelpEntry from "./Common/HelpEntry";
    import C3 from "./AuthenticationPage/C3";
    import Popup from "./Common/Popup";
    export default {
        data(){
            return{
                c3Show:false,
                userAuthentication:"",
                userInfo:"",
                flow:"",
                popupShow:false,
                alertContent:{
                    title:"message.IdAuthentication.alertContent.title",
                    text:"message.IdAuthentication.alertContent.text2"
                },
                loadingText:''
            }
        },
        created () {
            let _that=this;
            _that.authStatus();
            _that.$axios.get('/member/identification/find')
                .then(function (response) {
                    if(response.data.hasOwnProperty("flow")){
                        _that.flow=response.data.flow;
                        if(_that.flow==0){
                            _that.loadingText = _that.$t("message.IdAuthentication.loadingText.a1");
                        }else if(_that.flow==1){
                            _that.loadingText = _that.$t("message.IdAuthentication.loadingText.a2");
                        }else if(_that.flow==2){
                            _that.loadingText = _that.$t("message.IdAuthentication.loadingText.a3");
                        }
                        else if(_that.flow==3){
                            _that.loadingText = _that.$t("message.IdAuthentication.loadingText.a4");
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        mounted () {
            let seotitle = this.$t('message.user.account.idAuthentication');
            document.title = seotitle;
        },
        components: {
            Head,
            Footer,
            HelpEntry,
            Popup,
            C3
        },
        methods:{
            authStatus(){
                this.userAuthentication=this.$store.state.userInfo.authenticationLevel;
                this.userInfo=this.$store.state.userInfo;
            },
            authenC2(){
                if(this.userAuthentication<1){
                    this.alertContent.text=this.$t("message.IdAuthentication.alertContent.text1")
                    this.popupShow= !this.popupShow;
                }else{
                    if(this.flow==1){
                        this.alertContent.text=this.$t("message.IdAuthentication.alertContent.text3")
                        this.popupShow= !this.popupShow;
                    }else{
                        this. $router.push('AuthenticationC2');
                    }
                }
            },
            authenC3(){
                if(this.userAuthentication>=2){
                    this.c3Show=!this.c3Show
                }else{
                    if(this.flow==1){
                        this.alertContent.text=this.$t("message.IdAuthentication.alertContent.text3")
                        this.popupShow= !this.popupShow;
                    }else if(this.flow==0){
                        this.alertContent.text=this.$t("message.IdAuthentication.alertContent.text2")
                        this.popupShow= !this.popupShow;
                    }
                }
            },
            popupShowFn(){
                this.popupShow= !this.popupShow;
            },
            hideC3(hidepopup){
                this.c3Show=false;
            }
        },
        computed:{
            replaceID:function () {
                if(this.userInfo.identityCardNo.length==18){
                    return  this.userInfo.identityCardNo.substr(0,2)+"**************"+this.userInfo.identityCardNo.substr(-2,2);
                }else{
                    return  this.userInfo.identityCardNo.substr(0,2)+"***********"+this.userInfo.identityCardNo.substr(-2,2);
                }
               
            }
        },
    }
</script>
<style lang="scss">
@import "../assets/sass/setting";
[v-cloak] { display: none }
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
                            color: #333333;
                            padding: 23px 20px; 
                            display: inline-block;
                            line-height: 1;
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
            .id-box{
                padding-top: 82px;
                margin-top: 20px;
                margin-bottom: 30px;
                display: flex;
                text-align: center;
                align-content: center;
                justify-content:center;
                background: #fff;
                &>div{
                    margin: 96px 30px 115px;
                    border: 1px solid #ddd;
                    position: relative;
                    &.authenActive{
                        .c1-icon{
                            background-image: url("../assets/images/c1-icon-h.png")
                        }
                        .c2-icon{
                            background-image: url("../assets/images/c2-icon-h.png")
                        }
                        .c3-icon{
                            background-image: url("../assets/images/c3-icon-h.png")
                        }
                        div{
                            background: #01B0CA;
                            border-color: #01B0CA;
                            &>span{
                                width:0;
                                height:0;
                                border-width:0 10px 10px;
                                border-style:solid;
                                border-color:transparent transparent #01B0CA;
                                position:absolute;
                                top: -10px;
                                left: 50%;
                                margin-left: -10px;
                            }
                            p{
                                color: #fff;
                            }
                            button{
                                border-color: #fff;
                            }
                            h3{
                                color: #fff;
                            }
                            ul{
                                color: #fff;
                                font-size: 16px;
                                width: 220px;
                                margin: 42px auto 0;
                                li{
                                    margin-bottom: 15px;
                                    line-height: 1;
                                    text-align: left;
                                }
                            }
                            .c1{
                                background-image: url("../assets/images/C1.png")
                            }
                            .c2{
                                background-image: url("../assets/images/C2.png")
                            }
                            .c3{
                                background-image: url("../assets/images/C3.png")
                            }
                        }
                    }
                    &:first-child i{
                        &:after{
                            height: 0;
                        }
                    }
                    &:last-child i{
                        &:before{
                            height: 0;
                        }
                    }
                    &>i{
                        background-size: 100%;
                        background-repeat: no-repeat;
                        display: inline-block;
                        height: 32px;
                        width: 32px;
                        position: absolute;
                        top: -130px;
                        left: 50%;
                        margin-left: -16px;
                        &:before{
                            content: "";
                            width: 155px;
                            height: 1px;
                            background: #CECECE;
                            position: absolute;
                            left: 48px;
                            top: 16px;
                        }
                        &:after{
                            content: "";
                            width: 155px;
                            height: 1px;
                            background: #CECECE;
                            position: absolute;
                            right: 48px;
                            top: 16px;
                        }
                    }
                    .c1-icon{
                        background-image: url("../assets/images/c1-icon.png")
                    }
                    .c2-icon{
                        background-image: url("../assets/images/c2-icon.png")
                    }
                    .c3-icon{
                        background-image: url("../assets/images/c3-icon.png")
                    }
                    div{
                        position: relative;
                        width: 300px;
                        height: 430px;
                        h3{ 
                            color: #01B0CA;
                            font-size: 16px;
                            line-height: 1;
                            margin-top: 42px;
                            &.c2-state{
                                color: #06B24A;
                            }
                            &.c3-state{
                                color: #F15533;
                            }
                            .icon-load{
                                animation: ani-demo-spin 1s linear infinite;
                            }
                            @keyframes ani-demo-spin {
                                from { transform: rotate(0deg);}
                                50%  { transform: rotate(180deg);}
                                to   { transform: rotate(360deg);}
                            }
                        }
                        p{
                            color: #333;
                            position: absolute;
                            bottom: 96px;
                            padding: 0 25px;
                            line-height: 18px;
                            text-align: left;
                        }
                        button{
                            position: absolute;
                            bottom: 20px;
                            width: 260px;
                            height: 40px;
                            left: 20px;
                            line-height: 40px;
                            border:1px solid #01B0CA;
                            background: #01B0CA;
                            color: #fff;
                            text-align: center;
                            cursor: pointer;
                        }
                        i{
                            display: inline-block;
                            margin-top: 40px;
                            height: 56px;
                            width: 70px;
                            background-size: 100%;
                            background-repeat: no-repeat;
                        }
                        .c1{
                            background-image: url("../assets/images/C1-h.png")
                        }
                        .c2{
                            background-image: url("../assets/images/C2-h.png")
                        }
                        .c3{
                            background-image: url("../assets/images/C3-h.png")
                        }
                    }
                }
            }
        }
    }
</style>

