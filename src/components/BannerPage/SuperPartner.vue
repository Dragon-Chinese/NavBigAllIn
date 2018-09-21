<template>
    <div class="SuperPartner">
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList" :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text">
                            <div>
                                <h1 v-t="item.text"></h1>
                                <p>{{$t("message.BannerPage.SuperPartner.content1.a1")}}</p>
                                <p>{{$t("message.BannerPage.SuperPartner.content1.a2")}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="image-layer">
                        <div class="banner-row">
                             <div class="layer banner-image">
                                 <img :src="item.img" alt="" class="banner-img">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="why-box">
            <div>
                <h1>{{$t("message.BannerPage.SuperPartner.content2.b1")}}</h1>
                <p>{{$t("message.BannerPage.SuperPartner.content2.b2")}}</p>
            </div>
        </div>
        <div class="rightsAndInterests">
            <h2><span></span>{{$t("message.BannerPage.SuperPartner.content3.c1")}}</h2>
            <ul>
                <li>
                    <img src="../../assets/images/num1.png" alt="">
                    <div>
                        {{$t("message.BannerPage.SuperPartner.content3.c2")}}
                    </div>
                </li>
                <li>
                    <img src="../../assets/images/num2.png" alt="">
                    <div>
                        {{$t("message.BannerPage.SuperPartner.content3.c3")}}  
                    </div>
                </li>
                <li>
                    <img src="../../assets/images/num3.png" alt="">
                    <div>
                        {{$t("message.BannerPage.SuperPartner.content3.c4")}}
                    </div>
                </li>
                <li>
                    <img src="../../assets/images/num4.png" alt="">
                    <div>
                        {{$t("message.BannerPage.SuperPartner.content3.c7")}}
                    </div>
                </li>
                <!--<li>-->
                    <!--<img src="../../assets/images/num5.png" alt="">-->
                    <!--<div>-->
                        <!--{{$t("message.BannerPage.SuperPartner.content3.c6")}}-->
                    <!--</div>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<img src="../../assets/images/num6.png" alt="">-->
                    <!--<div>-->
                        <!--{{$t("message.BannerPage.SuperPartner.content3.c7")}}-->
                    <!--</div>-->
                    <!--<p>-->
                        <!--{{$t("message.BannerPage.SuperPartner.content3.c8")}}-->
                    <!--</p>-->
                <!--</li>-->
                <!-- <li>
                    <img src="../../assets/images/num7.png" alt="">
                    <div>
                        {{$t("message.BannerPage.SuperPartner.content3.c9")}}
                    </div>
                </li> -->
            </ul>
            <div>
                <h3><span></span>{{$t("message.BannerPage.SuperPartner.content3.c10")}}<span></span></h3>
                <p>{{$t("message.BannerPage.SuperPartner.content3.c11")}}<br>{{$t("message.BannerPage.SuperPartner.content3.c12")}}</p>
            </div>
        </div>
        <Footer></Footer>
        <HelpEntry></HelpEntry>
        <BackTop :right="20" :bottom="90" ></BackTop>
    </div>
</template>
<script>
    import Head from "../Common/Head";
    import Footer from "../Common/Footer";
    import HelpEntry from "../Common/HelpEntry";
    import banner0 from "../../assets/images/SuperPartner-banner.png";
    export default {
        data(){
            return{
                isBanner:0,
                isCurrency:0,
                bannertabsTimer:"",
                bannerList:[
                    {
                        text:"message.BannerPage.SuperPartner.banner.text",
                        img:banner0
                    },
                ],
            }
        },
        mounted () {
            let seotitle = this.$t('message.home.banner.d.seotitle');
            document.title = seotitle;
            this.resizeBanner();
            window.onresize = () => {
                return (() => {
                    this.resizeBanner();
                })()
            };  
        },
        components: {
            Head,
            Footer,
            HelpEntry
        }
    }
</script>
<style lang="scss" scoped>
@import "../../assets/sass/setting";
    $Assetbanner-height:590px;
    .banner-container{
        background:transparent;
        height: $Assetbanner-height;
        .index-top-banner{
            height: $Assetbanner-height;
            .banner-slider{
                height: $Assetbanner-height;
                .row{
                    .layer{
                        height: $Assetbanner-height;
                        top: 260px;
                        width: 1200px;
                        text-align: left;
                        div{
                            h1{
                                color: #03B1CC;
                                margin-bottom: 0px;
                                font-size: 40px;
                                line-height: 1;
                            }
                            p{
                                line-height: 1;
                                margin-top: 30px;
                                font-size: 20px;
                                color: #FEFEFE;
                                margin-bottom: 10px;
                                &:last-child{
                                    margin-top: 0px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    .SuperPartner{
        background: #1D1C22;
        .why-box{
            background:#21242D;
            padding:80px;
            &>div{
                max-width: 1200px;
                margin:0 auto;
                text-align:center;
                h1{
                    font-size:30px;
                    color:#03B1CC;
                }
                p{
                    color:#fff;
                    font-size:20px;
                    margin-top:70px;
                    line-height:36px;
                    padding: 0 10px;
                    text-align: left;
                }
            }
        }
        .rightsAndInterests{
            width:1038px;
            margin:60px auto 0;
            h2{
                color:#03B1CC;
                font-size:24px;
                span{
                    height:26px;
                    width:4px;
                    display: inline-block;
                    vertical-align:middle;
                }
            }
            ul{
                margin-top:40px;
                li{
                    &:after{
                        content:"";
                        display: block;
                        clear: both;
                    }
                    background:#21242D;
                    padding:13px 64px;
                    margin-bottom:10px;
                    img{
                        width:53px;
                        height:55px;
                        float: left;
                    }
                    div{
                        float:left;
                        width:800px;
                        line-height:30px;
                        font-size:16px;
                        color:#fff;
                        margin-left:30px;
                        margin-top:10px;
                    }
                    p{
                        clear: both;
                        margin-left:82px;
                        color:#03B1CC;
                        line-height:30px;
                        font-size:16px;
                        padding:13px 0 10px;
                    }
                }
            }
            >div{
                margin-top:20px;
                padding:30px;
                text-align:center;
                background:#21242D;
                margin-bottom:30px;
                h3{
                    font-size:24px;
                    color:#03B1CC;
                    line-height:1;
                    span{
                        width:26px;
                        height: 4px;
                        display: inline-block;
                        vertical-align:middle;
                        background:#03B1CC;
                        margin:0 22px;
                    }
                }
                p{
                    margin-top:40px;
                    color:#fff;
                    font-size:16px;
                    margin-bottom:15px;
                }
            }
        }
    }
</style>

