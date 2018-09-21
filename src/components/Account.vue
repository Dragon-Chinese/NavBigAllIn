<template>
    <div class="account">
        <Head></Head>
        
        <div class="account-container">
             <div class="account-title-nav">
                <h3>{{$t("message.user.account.title")}}</h3>
                <ul>
                    <li class="active">
                        <router-link to="/Account">{{$t("message.user.account.desc")}}</router-link>
                    </li>
                    <li>
                        <router-link to="/IdAuthentication">{{$t("message.user.account.idAuthentication")}}</router-link>
                    </li>
                    <li>
                        <router-link to="/Recommend">{{$t("message.user.account.recommend")}}</router-link>
                    </li>
                </ul>
             </div>
             <div class="account-info">
                 <div class="avatar">
                     <img src="../assets/images/avatar.png" alt="">
                 </div>
                 <div class="summary">
                     <p class="account-number"><span>{{$t("message.user.account.loginAccount")}}：</span>{{replacePhone}}</p>
                     <p class="account-name"><span>{{$t("message.user.account.username")}}：</span>{{accountInfo.name}}<span class="text-warning" v-if="accountInfo.name!=''">{{$t("message.user.account.realNameYes")}}<i></i></span><span class="text-warning" v-if="accountInfo.name==''">{{$t("message.user.account.realNameNo")}}</span></p>
                     <p class="account-phone"><i></i>{{replacePhone}}</p>
                 </div>
             </div>
             <div class="security-settings">
                <ul>
                    <li v-for="(item,index) in actionList" :key="index">
                        <div class="set-list-left">
                            <i :class="item.icon"></i><span v-t="item.title"></span><t v-t="item.text"></t><!-- {{item.text}} -->
                        </div>
                        <div class="set-list-right" v-if="item.isSetting==1">
                            <i class="icon-completed"></i><span class="completed">{{$t("message.user.account.haveSet")}}</span><span @click="settingAction(index)" :class="{hide:item.actionBtn==''}"><t v-t="item.actionBtn"></t></span>
                        </div>
                        <div class="set-list-right" v-else-if="item.isSetting==0">
                            <i class="icon-warning"></i><span class="warning">{{$t("message.user.account.notBound")}}</span><span @click="settingAction(index)"><t v-t="item.actionBtn"></t></span>
                        </div>
                        <div class="set-list-right" v-else-if="item.isSetting=-1">
                            <i class="icon-warning"></i><span class="warning">{{$t("message.user.account.notSet")}}</span><span @click="settingAction(index)"><t v-t="item.actionBtn"></t></span>
                        </div>
                    </li>
                </ul>
             </div>
        </div>

        
        <Footer></Footer>
        <HelpEntry></HelpEntry>
        <Popup :alert="alertContent" v-show="popupShow"  @hidepopup="popupShowFn"></Popup>
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
                accountInfo:{},
                alertContent:{
                    title:"message.user.account.alertContent.title",
                    text:"message.user.account.alertContent.text"
                },
                actionList:[
                    {
                        icon:"icon-pwd",
                        title:"message.user.account.actionList.a.title",
                        text:"message.user.account.actionList.a.text",
                        isSetting:1,
                        actionBtn:"message.user.account.actionList.a.action",
                        link:"ModifyPwd"
                    },
                    {
                        icon:"icon-code",
                        title:"message.user.account.actionList.b.title",
                        text:"message.user.account.actionList.b.text",
                        isSetting:1,
                        actionBtn:"",
                        link:""
                    },
                    {
                        icon:"icon-capital",
                        title:"message.user.account.actionList.c.title",
                        text:"message.user.account.actionList.c.text",
                        isSetting:-1,
                        actionBtn:"message.user.account.actionList.c.action",
                        link:"CapitalPWd"
                    }
                ],
                popupShow:false,
            }
        },
        components: {
            Head,
            
            Footer,
            HelpEntry,
            Popup
        },
        mounted () {
            let seotitle = this.$t('message.user.account.title');
            document.title = seotitle;
        },
        created(){
            let _that=this;
            _that.accountInfo=_that.$store.state.userInfo;
            if(_that.accountInfo.isAccountPwd){
                _that.actionList[2].isSetting=1;
                _that.actionList[2].actionBtn=_that.$t("message.user.account.action.a");
            }
        },
        methods:{
            settingAction(index){
                if(this.$store.state.userInfo.authenticationLevel < 1){
                    this.$Message.error(this.$t("message.AssetManPage.AssetDetailed.putforward.c6"));
                }
                console.log(this.$store.state.userInfo.authenticationLevel);return false;
                if(this.actionList[index].title=='message.user.account.action.b'){
                    if(this.accountInfo.authenticationLevel<1){
                        this.popupShow= !this.popupShow;
                    }else{
                        this.$router.push({path: this.actionList[index].link});
                    }
                }else{
                    this.$router.push({path: this.actionList[index].link});
                }
            },
            popupShowFn(){
                this.popupShow= !this.popupShow;
            } 
        },
        computed:{
            replacePhone:function () {
                return this.accountInfo.mobile.substr(0,3)+"****"+this.accountInfo.mobile.substr(7);
            }
        },
    }
</script>
<style lang="scss" scoped>
@import "../assets/sass/setting";
    .account{
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
            .account-info{
                background: #fff;
                margin-top: 15px;
                padding-bottom: 20px;
                border: 1px solid #E7E7E8;
                .avatar{
                    float: left;
                    margin: 20px;
                    img{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                }
                .summary{
                    padding-top: 25px;
                    p{
                        line-height: 1;
                    }
                    .account-number{
                        font-size: 20px;
                        color: #393B43;
                    }
                    .account-name{
                        margin-top: 10px;
                        font-size: 14px;
                        .text-warning{
                            color:$theme-color;
                            margin-left: 10px;
                            i{
                                width: 15px;
                                height: 10px;
                                background-size: 100%;
                                vertical-align: top;
                                display:inline-block;
                                background: url("../assets/images/adopt.png") no-repeat;
                                margin-left: 5px;
                            }
                        }
                        
                    }
                    .account-phone{
                        font-size: 14px;
                        i{
                            width: 10px;
                            height: 15px;
                            background-size: 100%;
                            vertical-align: bottom;
                            display:inline-block;
                            background: url("../assets/images/phone.png") no-repeat;
                            margin-right: 10px;
                        }
                        margin-top: 20px;
                    }
                }
            }
            .security-settings{
                margin-top: 30px;
                background: #fff;
                border: 1px solid #E7E7E8;
                min-height: 480px;
                margin-bottom: 30px;
                ul{
                    li{
                        height: 82px;
                        line-height: 82px;
                        border-bottom: 1px solid #E7E7E8;
                        font-size: 14px;
                        .set-list-left{
                            float: left;
                            color: #9B9EA0;
                            padding-left: 20px;
                            span{
                                color: #333;
                                display: inline-block;
                                margin: 0 20px 0 17px;
                            }
                        }
                        .set-list-right{
                            float: right;
                            span{
                                margin-left: 10px;
                                display: inline-block;
                                &.warning{
                                    color: #FF9900;
                                }
                                &.completed{
                                    color: #009900;
                                }
                                &:last-child{
                                    width: 70px;
                                    text-align: center;
                                    height: 28px;
                                    line-height: 28px;
                                    background: #00A2CA;
                                    font-size: 14px;
                                    display: inline-block;
                                    margin-left: 15px;
                                    margin-right: 20px;
                                    cursor: pointer;
                                    color: #fff;
                                    &.hide{
                                        visibility: hidden;
                                    }
                                }
                            }
                        }
                        i{
                            width: 24px;
                            height:24px;
                            display: inline-block;
                            background-repeat: no-repeat;
                            background-size: 100%;
                            vertical-align: middle;
                            margin-top: -3px;
                        }
                    }
                }
                .icon-pwd{
                    background-image: url("../assets/images/pwd.png")
                }
                .icon-code{
                    background-image: url("../assets/images/code.png")
                }
                .icon-capital{
                    background-image: url("../assets/images/capital.png")
                }
                .icon-completed{
                    background-image: url("../assets/images/Completed.png")
                }
                .icon-warning{
                    background-image: url("../assets/images/Warning.png")
                }
            }
        }
    }
</style>

