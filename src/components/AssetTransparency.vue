<template>
    <div>
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList" :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text">
                            <h1 v-t="item.title"></h1>
                            <p v-for="(value,index) in item.text" v-t="value" :key="index" style="margin-bottom:15px;"></p>
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
        <div class="asset-address-table">
            <table>
                <thead>
                    <tr>
                        <th v-for="(item,key,index) in assetAddressColumns" :index="index" :key="key" :width="item.width" v-t="item.title"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item,index) in assetAddressList">
                        <tr>
                            <td>
                               {{item.currency}}
                            </td>
                            <td>
                                {{item.link}}
                            </td>
                            <td>
                                <Button type="info" @click="blockChainQuery(item.link,item.currency)">{{$t("message.user.asset.select")}}</Button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div>
                                    {{$t("message.user.asset.management.title")}}： <t v-t="item.autograph"></t> <!-- {{item.autograph}} -->
                                </div>
                                <div>
                                    {{$t("message.user.asset.transparency.signatureCont")}}： {{item.autographText}}
                                </div>
                            </td>
                            <td></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        
        <Footer></Footer>
        <HelpEntry></HelpEntry>
        <BackTop :right="20" :bottom="120" ></BackTop>
    </div>
</template>
<script>
    import Head from "./Common/Head";
    import Footer from "./Common/Footer";
    import HelpEntry from "./Common/HelpEntry";
    
    import AssetBanner from "../assets/images/AssetBanner.png";
    export default {
        data () {
            return {   
                isBanner:0,
                bannerList:[
                    {
                        title:"message.user.asset.banner.title",
                        text:["message.user.asset.banner.text.a1","message.user.asset.banner.text.a2"],
                        link:"",
                        img:AssetBanner
                    },
                ],
                assetAddressColumns: [
                    {
                        title: 'message.user.asset.assetAddressColumns.a',
                        key: 'currency',
                        width:110,
                    },
                    {
                        title: 'message.user.asset.assetAddressColumns.b',
                        key: 'age',
                    },
                    {
                        title: 'message.user.asset.assetAddressColumns.c',
                        key: 'address',
                        width:150,
                    }
                ],
                assetAddressList:[
                    {
                        currency:'BTC',
                        link:"1FDrVjaDewF6usYKuBEaDR9FphwTz9TSnc",
                        autograph:'message.user.asset.assetAddress',
                        autographText:'"www.bithank.com"'
                    },
                    {
                        currency:'ETH',
                        link:"0xfe08af8ef21f3b34a2185692b4468e10636e1455",
                        autograph:'message.user.asset.assetAddress',
                        autographText:'"www.bithank.com"'
                    },
                ]
            }
        },
        mounted () {
            let seotitle = this.$t('message.topbarNavList.AssetTransparency');
            document.title = seotitle;
            this.resizeBanner();
            window.onresize = () => {
                return (() => {
                    this.resizeBanner();
                })()
            };  
        },
        methods:{
            blockChainQuery(href,val){
                if(val=='BTC'){
                    window.open("https://btc.com/"+href)
                }else if(val=='ETH'){
                    window.open("https://etherscan.io/address/"+href)
                }
                
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

    .asset-address-table{
        text-align: center;
        position: relative;
        min-width: 1000px;
        max-width: 1200px;
        margin:40px auto 30px;
        table{
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #D1D8D9;
            th,td{
                height: 70px;
                border-bottom: 1px solid #E7E7E8;
                font-size: 18px;
                color: #3A3A40;
                font-weight: 500;
                &:first-child{
                    text-align: center;
                    width:110px;
                }
                &:last-child{
                    text-align: center;
                    width:180px;
                }
            }
            tr:nth-child(even){
                background: #F5F5F6;
            }
            td{
                border: none;
                height: 68px;
                text-align: left;
                font-size: 14px;
                &:first-child{
                    color: #333;
                }
                &:last-child{
                    .ivu-btn-info{
                        background: #00A2CA;
                        border-radius: 0;
                    }
                }
                div{
                    color:#666;
                    margin: 3px 0;
                }
            }
        }
    }
</style>

