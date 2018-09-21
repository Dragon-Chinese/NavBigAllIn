<template>
    <div class="BHK-box">
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList" :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text">
                            <h1>{{item.title}}</h1>
                            <p v-t="item.text"></p>
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
        <div class="BHK-tabs">
            <ul>
                <li v-for="(item,index) in BHKTabsList" :key="index" :class="{active:isActive==index}" @click="isActive=index,toggleTabsFn(item.content)" v-t="item.title">
                    <!-- {{item.title}} -->
                </li>
            </ul>
        </div>
        <keep-alive>
            <component :is="currentView" class="BHK-tab-content"></component>
        </keep-alive>
        
        <Footer></Footer>
        <HelpEntry></HelpEntry>
        <BackTop :right="20" :bottom="120" ></BackTop>
    </div>
</template>
<script>
    import Head from "./Common/Head";
    import Footer from "./Common/Footer";
    import HelpEntry from "./Common/HelpEntry";
    
    import BHKTab1 from "./BHKPage/BHKTab1";
    import BHKTab2 from "./BHKPage/BHKTab2";
    import BHKTab3 from "./BHKPage/BHKTab3";
    import BHKBanner from "../assets/images/BHKBanner.png";
    export default {
        data(){
            return{
                isBanner:0,
                bannerList:[
                    {
                        title:"Bithank Token",
                        text:"message.BHK.banner",
                        link:"",
                        img:BHKBanner
                    },
                ],
                currentView:BHKTab1,
                isActive:0,
                BHKTabsList:[
                    {
                        title:"message.BHK.BHKTabsList.a1",
                        content:BHKTab1
                    },
                    {
                        title:"message.BHK.BHKTabsList.a2",
                        content:BHKTab2
                    },
                    {
                        title:"message.BHK.BHKTabsList.a3",
                        content:BHKTab3
                    },
                ]
            }
        },
        mounted () {
            this.resizeBanner();
            window.onresize = () => {
                return (() => {
                    this.resizeBanner();
                })()
            };
        },
        methods:{
             toggleTabsFn(tabText) {
                 this.currentView = tabText;
             }
        },
        components:{
            Head,
            
            Footer,
            HelpEntry
        }
    }
</script>
<style lang="scss" scoped>
@import "../assets/sass/setting";
    $BHKBanner-height:400px;
     .banner-container{
        height: $BHKBanner-height;
        .index-top-banner{
            height: $BHKBanner-height;
            .banner-slider{
                .row{
                    .layer{
                        height: $BHKBanner-height;
                        h1{
                            font-size: 36px;
                            font-weight: 400;
                            margin-bottom: 17px;
                        }
                        p{  
                            font-size: 14px;
                            max-width: 750px;
                            line-height: 30px;
                        }
                    }
                }
            }
        }
    }
    .BHK-tabs{
        background: #393B43;
        height: 50px;
        ul{
            margin: 0 auto;
            max-width: 1200px;
            li{
                width: 160px;
                float: left;
                height: 100%;
                line-height: 50px;
                color: #fff;
                font-size: 14px;
                text-align: center;
                cursor: pointer;
                &.active{
                    background: #00C1DE;
                }
            }
        }
    }
</style>

    