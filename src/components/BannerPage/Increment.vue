<template>
    <div class="increment-main">
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList" :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text">
                            <img :src="item.img" alt="">
                            <div>
                                <p v-if="item.title" v-t="item.title"></p>
                                <ul>
                                    <li v-for="(value,index) in item.text" :key="index" v-t="value">
                                       <!--  {{value}} -->
                                    </li>
                                </ul>
                                <span @click="qrCodeShow">{{$t("message.BannerPage.Increment.title")}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="image-layer">
                        <div class="banner-row">
                             <div class="layer banner-image">
                                 <img :src="item.banner" alt="" class="banner-img">
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="banner-tab">
                    <li v-for="(item,index) in bannerList" :class="{active:isBanner==index}"  @click="bannerTab(index)" :key="index"><span></span></li>
                </ul>
            </div>
        </div>
        <div class="qrPopup" v-show="showWechat" @click="showWechat=!showWechat">
            <img src="../../assets/images/wechatQr.png" alt="">
        </div>
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from '../Common/Head';
    import HelpEntry from '../Common/HelpEntry';
    import Footer from '../Common/Footer';
    import banner0 from "../../assets/images/ybb-banner.png";
    import banner1 from "../../assets/images/wlb-banner.png";
    import ybbImg from "../../assets/images/ybb-img.png";
    import wlbImg from "../../assets/images/wlb-img.png";
    export default {
        data () {
            return {
                isBanner:0,
                isCurrency:0,
                bannertabsTimer:"",
                bannerList:[
                    {
                        title:"",
                        text:[
                            "message.BannerPage.Increment.banner.list1.a1",
                            "message.BannerPage.Increment.banner.list1.a2",
                            "message.BannerPage.Increment.banner.list1.a3",
                            "message.BannerPage.Increment.banner.list1.a4"
                        ], 
                        img:ybbImg,
                        banner:banner0
                    },
                    {   
                        title:"message.BannerPage.Increment.banner.list2.title",
                        text:[
                            "message.BannerPage.Increment.banner.list2.b1",
                            "message.BannerPage.Increment.banner.list2.b2",
                            "message.BannerPage.Increment.banner.list2.b3"
                        ],
                        img:wlbImg,
                        banner:banner1
                    },
                ],
                showWechat:false
            }
        },
        mounted() {
            let seotitle = seotitle = this.$t('message.Derivative.banner.text');
            document.title = seotitle;
            this.resizeBanner();
            window.onresize = () => {
                return (() => {
                    this.resizeBanner();
                })()
            };
            this.bannertabsTimer=setInterval(switchBanner,4500) 
            let bannertabs=document.querySelectorAll(".banner-tab li");
            const that=this;
            function switchBanner(){
                that.isBanner++
                if(that.isBanner==bannertabs.length){
                    that.isBanner=0;
                }
            }
        },
        methods: {
          bannerTab(index){
                this.isBanner=index;
                clearInterval(this.bannertabsTimer)
            }, 
            qrCodeShow(){
                this.showWechat=true;
            }, 
        },
        components:{
            Head,
            HelpEntry,
            Footer,
        }
    }
</script>
<style lang="scss" scoped>
@import "../../assets/sass/setting";
    $Assetbanner-height:590px;
     .banner-container{
        height: $Assetbanner-height;
        .index-top-banner{
            height: $Assetbanner-height;
            .banner-slider{
                height: $Assetbanner-height;
                .row{
                    .layer{
                        height: $Assetbanner-height;
                        top: 143px;
                        width: 1200px;
                        text-align: left;
                        div{
                            background: rgba(255,255,255,.05);
                            width: 100%;
                            padding:30px 20px;
                            p{
                                color: #9B9EA0;
                                margin-bottom: 20px;
                                font-size: 16px;
                                line-height: 1;
                            }
                            li{
                                margin-bottom: 16px;
                                color: #D2D6D9;
                                line-height: 1;
                                font-size: 14px;
                            }
                            span{
                                border:1px solid #ccc;
                                width: 110px;
                                height: 30px;
                                line-height: 28px;
                                text-align: center;
                                color:#ccc;
                                display: inline-block;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
            .banner-tab{
                bottom: 24px;
            }
        }
    }
    .qrPopup{
        background: rgba(0,0,0,.55);
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        img{
            position: absolute;
            top: 100px;
            left: 50%;
            margin-left: -200px;
            width: 400px;
            height: 500px;
        }
    }
</style>
