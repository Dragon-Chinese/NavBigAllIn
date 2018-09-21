<template>
    <div class="introduce">
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList" :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text">
                            <div>
                                <h1 v-t="item.text"></h1>
                                <span></span>
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
        <ul>
            <li v-for="(item,index) in introduceList" :key="index">
                <div class="title" v-for="(value,index) in item.title" :key="index" v-t="value"><!-- {{value}} --></div>
                <div class="info" v-for="(value,index) in item.text" :key="index" v-t="value"><!-- {{value}} --></div>
                <div class="quan">
                    <i></i>
                    <img src="../../assets/images/introduce-arrow.png" alt="">
                </div>
            </li>
        </ul>
        <Footer></Footer>
        <HelpEntry></HelpEntry>
        <BackTop :right="20" :bottom="90" ></BackTop>
    </div>
</template>
<script>
    import Head from "../Common/Head";
    import Footer from "../Common/Footer";
    import HelpEntry from "../Common/HelpEntry";
    import banner0 from "../../assets/images/Introduce-banner.png";
    export default {
        data(){
            return{
                isBanner:0,
                isCurrency:0,
                bannertabsTimer:"",
                bannerList:[
                    {
                        text:"message.BannerPage.Introduce.banner.text",
                        img:banner0
                    },
                ],
                introduceList:[
                    {
                        title:["message.BannerPage.Introduce.introduceList.a.title.a1","message.BannerPage.Introduce.introduceList.a.title.a2"],
                        text:[],
                    },
                    {
                        title:["message.BannerPage.Introduce.introduceList.b.title"],
                        text:["message.BannerPage.Introduce.introduceList.b.text"],
                    },
                    {
                        title:["message.BannerPage.Introduce.introduceList.c.title"],
                        text:["message.BannerPage.Introduce.introduceList.c.text.c1","message.BannerPage.Introduce.introduceList.c.text.c2","message.BannerPage.Introduce.introduceList.c.text.c3"],
                    },
                    {
                        title:["message.BannerPage.Introduce.introduceList.d.title"],
                        text:["message.BannerPage.Introduce.introduceList.d.text.d1","message.BannerPage.Introduce.introduceList.d.text.d2"],
                    },
                    {
                        title:["message.BannerPage.Introduce.introduceList.e.title"],
                        text:["message.BannerPage.Introduce.introduceList.e.text.e1","message.BannerPage.Introduce.introduceList.e.text.e2"],
                    },
                    {
                        title:["message.BannerPage.Introduce.introduceList.f.title"],
                        text:["message.BannerPage.Introduce.introduceList.f.text"],
                    },
                    {
                        title:["message.BannerPage.Introduce.introduceList.g.title"],
                        text:["message.BannerPage.Introduce.introduceList.g.text"],
                    },
                    {
                        title:["message.BannerPage.Introduce.introduceList.h.title"],
                        text:["message.BannerPage.Introduce.introduceList.h.text.h1","message.BannerPage.Introduce.introduceList.h.text.h2"],
                    }
                ]
            }
        },
        mounted () {
            let seotitle = this.$t('message.home.banner.a.seotitle');
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
                        top: 240px;
                        width: 1200px;
                        text-align: left;
                        div{
                            h1{
                                color: #fff;
                                margin-bottom: 0px;
                                font-size: 40px;
                                line-height: 1;
                            }
                            span{
                                line-height: 1;
                                margin-top: 30px;
                                display: inline-block;
                                font-size: 24px;
                                color: #9B9EA0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    .introduce{
        background:#272C2F;
        >ul{
            width: 1200px;
            margin: 60px auto 80px;
            &:after{
                content: "";
                display: block;
                height: 0;
                visibility: hidden;
                clear: both;
            }
            >li{
                width: 568px;
                height: 160px;
                float: left;
                list-style: none;
                margin-right: 45px;
                background: url("../../assets/images/Introduce-left.png") top no-repeat;
                background-size: 100% 100%;
                position: relative;
                padding:20px;
                &:nth-child(2n){
                    height: 160px;
                    float: right;
                    margin:-55px 24px -50px 0;
                    padding-left:30px;
                    background: url("../../assets/images/Introduce-right.png") top no-repeat;
                    .quan{
                        width: 35px;
                        position: absolute;
                        top: 4px;
                        left: -39px;
                    }
                }
                &:hover{
                    .quan {
                        i{
                            height: 26px;
                            width: 26px;
                            background-size:100%;
                            background-image:url("../../assets/images/circle.png");
                        }
                    }
                }
                .title{
                    margin-top:10px;
                    color:#373D41;
                    font-size:20px;
                    line-height:1;
                    margin-bottom:10px;
                }
                .info{
                    font-size:14px;
                    line-height:24px;
                }
                .quan{
                    width: 35px;
                    position: absolute;
                    top: 0;
                    right: -36px;
                    i{
                        display:block;
                        height: 22px;
                        width: 22px;
                        background-image:url("../../assets/images/circle-s.png");
                        background-repeat:no-repeat;
                        background-size:100%;
                        margin: 0 auto;
                    }
                    img{
                        width: 8px;
                        margin: 0 auto;
                        height: 75px;
                        display: block;
                        margin-top: 7px;
                        margin-bottom: 2px;
                    }
                }
            }
        }
    }

</style>

