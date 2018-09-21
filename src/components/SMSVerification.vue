<template>
    <div class="SMSVerification">
        <Head></Head>
        
        <div class="account-container">
            <div class="account-title-nav">
                <h3>{{$t("message.SMSVerification.title")}}</h3>
                <ul>
                    <li>
                        <router-link to="/Account">{{$t("message.SMSVerification.account")}}<Icon type="arrow-right-c"></Icon></router-link>
                    </li>
                </ul>
            </div>
            <div class="SMS-from">
                <dl>
                    <dd>
                        <span>{{$t("message.SMSVerification.smsfrom.pwd")}}：</span><input type="text" :placeholder="$t('message.SMSVerification.smsfrom.pwdtext')"><p><router-link to="/ForgetPwd">{{$t("message.SMSVerification.smsfrom.forgetpwd")}}</router-link></p>
                    </dd>
                    <dd>
                        <span>{{$t("message.SMSVerification.smsfrom.phone")}}：</span>
                        <Select  v-model="selected" style="width:99px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value" v-t="item.value"></Option>
                        </Select>
                        <input type="text" :placeholder="$t('message.SMSVerification.smsfrom.phonetext')" style="width:293px;margin-left:4px;">
                    </dd>
                    <dd class="yzm">
                        <span>{{$t("message.SMSVerification.smsfrom.code")}}：</span><input type="text" :placeholder="$t('message.SMSVerification.smsfrom.codetext')"><em>{{$t("message.SMSVerification.smsfrom.sendcode")}}</em>
                    </dd>
                    <dd>
                        <button>{{$t("message.SMSVerification.smsfrom.confirm")}}</button>
                    </dd>
                </dl>
            </div>
        </div>

        
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from "./Common/Head";
    
    import Footer from "./Common/Footer";
    import HelpEntry from "./Common/HelpEntry";
    export default {
        data(){
            return{
                 cityList: [
                    {
                        value: '86',
                    },
                ],
                selected:"86"
            }
        },
        mounted () {
            const seotitle = this.$t('message.user.account.actionList.b.title');
            document.title = seotitle;
        },
        components: {
            Head,
            
            Footer,
            HelpEntry,
        },
        methods:{
            
        },
    }
</script>
<style lang="scss">
@import "../assets/sass/setting";
    .SMSVerification{
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
            .SMS-from{
                background: #fff;
                margin-top: 20px;
                margin-bottom: 30px;
                border: 1px solid #E7E7E8;
                min-height: 600px;
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

