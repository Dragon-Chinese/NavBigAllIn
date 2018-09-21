<template>
    <div class="download">
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList"
                     :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text">
                            <div>
                                <h1>
                                    <e v-t="item.text"></e>
                                    <span>{{$t("message.BannerPage.Download.title")}}</span></h1>
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
            <div class="banner-content">
                <ul>
                    <li>
                        <img src="../../assets/images/ios.png" alt=""><span>ios</span>
                    </li>
                    <li>
                        <img src="../../assets/images/android.png" alt=""><span>Android</span>
                    </li>
                    <li>
                        <img src="../../assets/images/windows.png" alt=""><span>Windows</span>
                    </li>
                    <li>
                        <img src="../../assets/images/mac.png" alt=""><span>Mac</span>
                    </li>
                </ul>
            </div>
        </div>
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from "../Common/Head";
    import Footer from "../Common/Footer";
    import HelpEntry from "../Common/HelpEntry";
    import banner0 from "../../assets/images/download-banner.png";

    export default {
        data() {
            return {
                isBanner: 0,
                isCurrency: 0,
                bannertabsTimer: "",
                bannerList: [
                    {
                        text: "message.BannerPage.Download.bannerList.text",
                        img: banner0
                    },
                ],
            }
        },
        mounted() {
            let seotitle = this.$t('message.BannerPage.Download.bannerList.text');
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

    $Assetbanner-height: 590px;
    .banner-container {
        background: transparent;
        height: $Assetbanner-height;
        .index-top-banner {
            height: $Assetbanner-height;
            .banner-slider {
                height: $Assetbanner-height;
                .row {
                    .layer {
                        height: $Assetbanner-height;
                        top: 240px;
                        width: 1200px;
                        text-align: left;
                        div {
                            h1 {
                                color: #fff;
                                margin-bottom: 20px;
                                font-size: 36px;
                                line-height: 1;
                                span {
                                    color: #9B9EA0;
                                    font-size: 18px;
                                }
                            }
                        }
                    }
                }
                .image-layer {
                    img {
                        left: 0;
                    }
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    .download {
        .banner-content {
            position: absolute;
            bottom: 170px;
            width: 1200px;
            background: rgba(255, 255, 255, .05);
            z-index: 999;
            left: 50%;
            margin-left: -600px;
            height: 90px;
            line-height: 90px;
            ul {
                margin-left: 50px;
            }
            li {
                float: left;
                font-size: 18px;
                margin-right: 60px;
                img {
                    vertical-align: middle;
                    margin-right: 10px;
                }
                span {
                    vertical-align: middle;
                    color: #9B9EA0;
                }
            }
        }
    }
</style>

