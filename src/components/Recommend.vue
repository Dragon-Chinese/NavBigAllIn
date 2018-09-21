<template>
    <div class="recommend">
        <Head></Head>
        <div class="recommend-content">
            <div class="recommend-nav">
                <h3>{{$t("message.Recommend.title")}}</h3>
                <ul>
                    <li>
                        <router-link to="/Account">{{$t("message.Recommend.menu.m1")}}</router-link>
                    </li>
                    <li>
                        <router-link to="/IdAuthentication">{{$t("message.Recommend.menu.m2")}}</router-link>
                    </li>
                    <li class="active">
                        <router-link to="/Recommend">{{$t("message.Recommend.menu.m3")}}</router-link>
                    </li>
                </ul>
            </div>
            <div class="recommend-info">
                <div class="recommend-info-text">
                    <p>{{$t("message.Recommend.info.b1")}}：{{uuid}}</p>
                    <!-- <p>推荐我的人：</p> -->
                    <p>{{$t("message.Recommend.info.b2")}}：{{list.count}}</p>
                </div>
                <div class="recommend-info-url">
                    <p>{{$t("message.Recommend.info.b3")}}：</p>
                    <div>
                        <input type="text" v-model="recommendAddress" readonly >
                        <button :data-clipboard-text="recommendAddress" id="copyBtn"  @click="copy">{{$t("message.Recommend.info.b4")}}</button>
                    </div>
                </div>
                <div class="recommend-info-qrcode">
                    <div class="l">
                        <p>{{$t("message.Recommend.info.b5")}}</p>
                        <p>{{$t("message.Recommend.info.b6")}}</p>
                    </div>
                    <div class="r" id="qrcode">
                    </div>
                </div>
            </div>
            <ul class="recommend-list">
                <li class="recommend-item recommend-title">
                    <p>{{$t("message.Recommend.list.p1")}}</p>
                    <p>UUID</p>
                    <p>{{$t("message.Recommend.list.p2")}}</p>
                    <p>{{$t("message.Recommend.list.p3")}}</p>
                    <p>{{$t("message.Recommend.list.p4")}}</p>
                </li>
                <li class="recommend-item" v-for="(item,index) in list.data" :key="index">
                    <p>{{index+1}}</p>
                    <p>{{item.uuid}}</p>
                    <p>{{item.name}}</p>
                    <p>{{item.updateTimeString}}</p>
                    <button @click="viewTheReferee(index)">{{$t("message.Recommend.list.p5")}}</button>
                </li>
            </ul>
            <Modal class-name="recommend-pop" v-model="viewModal" width="735" :title="$t('message.Recommend.list.p5')">
                <ul class="recommend-pop-list">
                    <li class="recommend-pop-item recommend-pop-title">
                        <p>{{$t("message.Recommend.list.p1")}}</p>
                        <p>{{$t("message.Recommend.list.p2")}}</p>
                        <p>{{$t("message.Recommend.list.p3")}}</p>
                    </li>
                    <template v-if="popList.length>0">
                         <li class="recommend-pop-item" v-for="(popItem,popIndex) in popList" :key="popIndex">
                            <p>{{index+1}}</p>
                            <p>{{popItem.name}}</p>
                            <p>{{popItem.updateTimeString}}</p>
                        </li>
                    </template>
                    <template v-else>
                         <li class="recommend-pop-item">
                            <p></p>
                            <p>{{$t("message.Recommend.list.p6")}}</p>
                            <p></p>
                        </li>
                    </template>
                </ul>
                <div slot="footer"></div>
            </Modal>
        </div>
        
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from "./Common/Head";
    import Footer from "./Common/Footer";
    import HelpEntry from "./Common/HelpEntry";
    import ClipboardJS from "clipboard";
    import QRCode from 'qrcodejs2';
    export default {
        data(){
            return{
                myUrl:'https://www.bithank.com/#/Register?uuid=',
                viewModal:false,
                popList:[],
                list:"",
                uuid:"",
                copyText:""
            }
        },
        created () {
            console.log(this.$store);
            this.uuid=this.$store.state.userInfo.uuid;
            let _that=this;
                _that.$axios.get('/mobile/member/findUnderling',{
                    limit:500,page:1
                    })
                    .then(function (response) {
                        if(response.status==200){
                            if(response.data.msg=="成功"){
                                _that.list=response.data;
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        },
        mounted () {
            this.qrcode();
            let seotitle = this.$t('message.user.account.recommend');
            document.title = seotitle;
        },
        methods:{
            viewTheReferee(index){
                this.viewModal=true;
                let _that=this;
                _that.$axios.get('/mobile/member/findUnderling',{
                    limit:500,page:1,uuid:_that.list.data[index].uuid
                    })
                    .then(function (response) {
                        if(response.status==200){
                            if(response.data.msg==_that.$t("message.Recommend.success")){
                                _that.popList=response.data;
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                
            },
            qrcode () {
                let _that=this;
                let qrcode = new QRCode('qrcode', {
                    width: 80,
                    height: 80, // 高度
                    text: _that.recommendAddress // 二维码内容
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                })
            },
            copy(){
                let _that=this;
                let clipboard = new ClipboardJS('#copyBtn');
                clipboard.on('success', function(e) {
                    _that.$Message.success(_that.$t('message.Recommend.messagesuccess'));
                    e.clearSelection();
                    clipboard.destroy();  
                });

                clipboard.on('error', function(e) {
                    _that.$Message.error(_that.$t('message.Recommend.messageerror'));
                    clipboard.destroy();  
                });  
            }
        },
        computed: {
            recommendAddress(){
                return this.myUrl+this.uuid
            }  
        },
        components: {
            Head,
            Footer,
            HelpEntry
        }
    }
</script>
<style lang="scss">
    .recommend-pop{
        .ivu-modal-content{
            border-radius: 0;
            .ivu-modal-close {
                right: 30px;
                .ivu-icon-ios-close-empty{
                    font-size: 40px;
                    top: 13px;
                }
            }
            .ivu-modal-header{
                padding: 30px 30px 27px;
                border-bottom: 0;
                .ivu-modal-header-inner{
                    font-size: 20px;
                    color: #333;
                    font-weight: normal;
                }
            }
            .ivu-modal-body{
                padding: 0 30px 29px;
                .recommend-pop-list{
                    border: 1px solid #E7E7E8;
                    border-bottom: 0;
                    .recommend-pop-item{
                        line-height: 48px;
                        border-bottom: 1px solid #E7E7E8;
                        text-align: center;
                        &:after{
                            content: '';
                            display: block;
                            clear: both;
                        }
                        &:nth-child(even){
                            background-color: #f5f5f5;
                        }
                        p{
                            float: left;
                            font-size: 14px;
                            color: #333;
                            width: 250px;
                            height: 48px;
                            &:first-child{
                                width: 172px;
                            }
                        }
                    }
                    .recommend-pop-title{
                        p{
                            color: #666;
                        }
                    }
                }
            }
            .ivu-modal-footer{
                display: none;
            }
        }

    }
</style>
<style lang="scss" scoped>
    @import "../assets/sass/setting";
    .recommend{
        background-color: #f5f5f5;
        margin-top: 120px;
        .recommend-content{
            width: 1200px;
            margin: 0 auto;
            .recommend-nav{
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
            .recommend-info{
                position: relative;
                padding: 23px 0 22px;
                background: #fff;
                border: 1px solid #e7e7e8;
                margin: 17px 0 27px;
                p{
                    font-size: 14px;
                    color: #393B43;
                }
                .recommend-info-text{
                    position: absolute;
                    left: 40px;
                    top: 26px;
                    p{
                        line-height: 36px;
                    }
                }
                .recommend-info-url{
                    width: 661px;
                    height: 78px;
                    margin-left: 228px;
                    border-left: 1px solid #ccc;
                    border-right: 1px solid #ccc;
                    padding-left: 72px;
                    padding-top: 4px;
                    >div{
                        margin-top: 5px;
                        input{
                            width: 400px;
                            height: 40px;
                            border: 1px solid #DCDCDE;
                            color: #999;
                            font-size: 12px;
                            margin-right: 9px;
                            padding: 0 12px;
                        }
                        button{
                            width: 130px;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            color: #fff;
                            background-color: #00B7D3;
                            font-size: 14px;
                            cursor: pointer;
                        }
                    }
                }
                .recommend-info-qrcode{
                    position: absolute;
                    right: 97px;
                    top: 24px;
                    &:after{
                        content:"";
                        display: block;
                        clear: both;
                    }
                    .l{
                        float: left;
                        padding-top: 2px;
                        padding-right: 16px;
                        p{
                            line-height: 18px;
                        }
                    }
                    .r{
                        float: right;
                        width: 80px;
                        height: 80px;
                        border: 1px solid #e7e7e8;
                    }
                }
            }
            .recommend-list{
                border: 1px solid #E7E7E8;
                border-bottom: 0;
                margin-bottom: 30px;
                .recommend-item{
                    line-height: 68px;
                    border-bottom: 1px solid #E7E7E8;
                    text-align: center;
                    &:after{
                        content: '';
                        display: block;
                        clear: both;
                    }
                    &:nth-child(odd){
                        background-color: #fff;
                    }
                    p{
                        float: left;
                        font-size: 14px;
                        color: #333;
                        width: 239px;
                        height:68px;
                    }
                    button{
                        float: left;
                        font-size: 14px;
                        color: #00A2CA;
                        width: 120px;
                        margin-left: 60px;
                        margin-top: 24px;
                        cursor: pointer;
                        background: rgba(0,0,0,0);
                    }
                }
                .recommend-title{
                    p{
                        color: #666;
                    }
                }
            }
        }
    }
</style>

