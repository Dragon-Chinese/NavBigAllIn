<template>
    <div class="Derivative">
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList"
                     :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text">
                            <h1 v-t="item.title"></h1>
                            <p v-t="item.text"></p>
                            <router-link :to="item.link">
                                <button>{{$t("message.Derivative.detail")}}<i class="arrow-right-icon"></i></button>
                            </router-link>
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
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from "./Common/Head";
    import Footer from "./Common/Footer";
    import HelpEntry from "./Common/HelpEntry";
    import banner0 from "../assets/images/banner3.png";

    export default {
        data() {
            return {
                isBanner: 0,
                isCurrency: 0,
                bannertabsTimer: "",
                bannerList: [
                    {
                        title: "message.Derivative.banner.title",
                        text: "message.Derivative.banner.text",
                        link: "Increment",
                        img: banner0
                    },
                ],
            }
        },
        mounted() {
            let seotitle = this.$t('message.topbarNavList.derivative');
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
    @import "../assets/sass/setting";

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
                    }
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    .Derivative {

    }
</style>

