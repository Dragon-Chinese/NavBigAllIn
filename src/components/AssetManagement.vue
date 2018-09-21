<template>
    <div class="AssetManagement">
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList" :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text">
                            <h1>{{$t("message.user.asset.management.title")}} ≈ {{Valuation}} BTC / {{Valuation1}} CNY</h1>
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
        <div class="asset-tabs">
            <ul>
                <li v-for="(item,index) in assetTabsList" :class="{active:isAcitve==index}" :key="index" @click="isAcitve=index,toggleTabsFn(item.content)" v-t="item.title">
                    <!-- {{item.title}} -->
                </li>
            </ul>
        </div>
        <component :is="currentView" class="asset-tab-content"></component>
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from "./Common/Head";
    import Footer from "./Common/Footer";
    import HelpEntry from "./Common/HelpEntry";
    
    import AssetBanner from "../assets/images/AssetBanner2.png";
    import AssetDetailed from "./AssetManPage/AssetDetailed";
    import RechargeRecord from "./AssetManPage/RechargeRecord";
    import PutForward from "./AssetManPage/PutForward";
    import RightsInterestsRecord from "./AssetManPage/RightsInterestsRecord";
    export default {
        data () {
            return {   
                isBanner:0,
                bannerList:[
                    {
                        img:AssetBanner
                    },
                ],
                currentView:AssetDetailed,
                isAcitve:0,
                assetTabsList:[
                    {
                        title:"message.user.asset.assetTabsList.a",
                        content:AssetDetailed
                    },
                    {
                        title:"message.user.asset.assetTabsList.b",
                        content:RechargeRecord
                    },
                    {
                        title:"message.user.asset.assetTabsList.c",
                        content:PutForward
                    },
                    {
                        title:"message.user.asset.assetTabsList.d",
                        content:RightsInterestsRecord
                    },
                ],
                Valuation:"",
                Valuation1:""
            }
        },
        mounted () {
            let seotitle = this.$t('message.topbarMenu.assetManage');
            document.title = seotitle;
            this.resizeBanner();
            window.onresize = () => {
                return (() => {
                    this.resizeBanner();
                })()
            };
            this.getAccountData();
        },
        methods:{
            toggleTabsFn(tabText) {
                 this.currentView = tabText;
            },
            getAccountData(){
                let _that=this;
                let sum=0;
                _that.$axios.get('/member/position/findAll')
                    .then(function (response) {
                        if (response.status == 200) {
                            response.data.forEach((item,index) => {
                                sum+=(item.totalNum+item.blockedNum)*item.price;
                            });
                            _that.Valuation=_that.toDecimal(sum,6);
                            _that.Valuation1=_that.toDecimal(sum*8200*6.81,2);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
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
    $Assetbanner-height:400px;
     .banner-container{
        height: $Assetbanner-height;
        .index-top-banner{
            height: $Assetbanner-height;
            .banner-slider{
                height: $Assetbanner-height;
                .row{
                    .layer{
                        height: $Assetbanner-height;
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

    .asset-tabs{
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

