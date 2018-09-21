<template>
    <div class="main-wrap">
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList" :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text">
                            <h1 v-t="item.title"></h1>
                            <p v-t="item.text"></p>
                            <router-link :to="item.link"><button>{{$t("message.home.viewInfo")}}<i class="arrow-right-icon"></i></button></router-link>
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
                <ul class="banner-tab">
                    <li v-for="(item,index) in bannerList" :class="{active:isBanner==index}"  @click="bannerTab(index)" :key="index"><span></span></li>
                </ul>
            </div>
            <div class="index-box-container">
                <div class="box-container">
                    <ul>
                        <li v-for="(item,index) in boxContainerList" :key="index" >
                            <div v-if="item.allLink!=1">
                                <h2 class="text-space" v-t="item.title"></h2>
                                <p><img v-if="item.text.icon" :src="item.text.icon" alt="">{{item.text.cont}} BHK</p>
                                <h3 v-t="item.subtitle"></h3>
                                <p  class="text-space">{{item.subtext.cont}}</p>
                                <router-link v-if="item.linkText" :to="{name:item.link,params:{id:item.id}}"><span class="text-space" v-t="item.linkText"></span></router-link>
                            </div>
                            <div v-else>
                                <router-link :to="{name:item.link,params:{id:item.id}}">
                                    <h2 v-t="item.title"></h2>
                                    <p><img v-if="item.text.icon" :src="item.text.icon" alt="">{{item.text.cont}} BTC</p>
                                    <h3 v-t="item.subtitle"></h3>
                                    <p class="text-space">{{toDecimal(item.subtext.cont,4)}} BTC</p>
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="module-container">
            <div class="coin-module">
                <h1 class="product-title"><span> </span>{{$t("message.home.block.title")}}<span></span></h1>
                <p class="product-sub-title">{{$t("message.home.block.desc")}}</p>
                <div class="coin-box">
                    <div class="coin-box-container" v-if="coinList.length>0">
                        <div v-for="(item,index) in coinList" :key="index">
                            <a @click="tableJump(item.id,item.name)">
                                <h3>{{item.name}}<span v-if="item.priceFluctuation>=0">+{{item.priceFluctuation}}%</span><span v-else class="fall" >{{item.priceFluctuation}}%</span></h3>
                                <div>{{item.price}}<span>￥{{item.price2}}</span></div>
                                <p>Volume：{{item.volume}}{{item.currencyName}}</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tabs-table">
                <ul v-if="currencyList.length>0">
                    <li v-for="(item,index) in currencyList" :class="{active:isCurrency==index}" @click="isCurrency=index,currencyTab(index)" :key="index"><span>{{item.name}}</span></li>
                </ul>
                <Table stripe :columns="tabsTableTitle" :data="tabsTableData" :loading="tableLoading"></Table>
            </div>
            <div class="product-style">
                <div class="product-style-container">
                    <div v-for="(item,index) in productStyleList" :key="index">
                        <div class="img"></div>
                        <h3 v-t="item.title"></h3>
                        <p v-for="(value,index) in item.text" :key="index" v-t="value"></p>
                    </div>
                </div>
            </div>
            <div class="road-map">
                <h1 class="product-title">{{$t("message.home.roadmap")}}</h1>
                <div>
                    <ul>
                        <li v-for="(item,index) in roadmapList" :key="index" @mouseenter="swicthImg(index)" @mouseleave="swicthImg(index)">
                            <img :src="item.img" alt="">
                            <p>{{item.time}}</p>
                            <div v-t="item.text"></div>
                        </li>
                    </ul>
                </div>
            </div>
            <DealWrapper></DealWrapper>
            <Footer></Footer>
        </div>
        <Modal class-name="home-popup" :scrollable="true" v-model="homePopup" width="590"  :closable="false" :mask-closable="false">
            <div class="home-popup-content">
                <h3>{{$t("message.home.modal.title")}}</h3>
                <p>{{$t("message.home.modal.desc")}}</p>
                <p>{{$t("message.home.modal.content")}}</p>
                <span @click="closeHomePopup">{{$t("message.home.modal.action")}}</span>
            </div>
            <div slot="footer"></div>
        </Modal>
        <Modal class-name="ie-popup" :scrollable="true" v-model="iePopup" width="590" :closable="false" :mask-closable="false">
            <div class="ie-popup-content">
                <h3>{{$t("message.home.modal.title")}}</h3>
                <p>{{$t("message.home.modal.compatibility")}}</p>
            </div>
            <div slot="footer"></div>
        </Modal>
        <HelpEntry></HelpEntry>
        <BackTop :right="20" :bottom="90" ></BackTop>
    </div>
</template>
<script>
    import Head from './Common/Head';
    import HelpEntry from './Common/HelpEntry';
    import Footer from './Common/Footer';
    import DealWrapper from "./Pages/DealWrapper";
    import banner0 from "../assets/images/banner0.png";
    import banner1 from "../assets/images/banner3.png";
    import banner2 from "../assets/images/banner2.png";
    import banner3 from "../assets/images/banner1.png";
    import roadmap11 from "../assets/images/11@2x.png";
    import roadmap21 from "../assets/images/21@2x.png";
    import roadmap31 from "../assets/images/31@2x.png";
    import roadmap41 from "../assets/images/41@2x.png";
    import roadmap51 from "../assets/images/51@2x.png";
    import roadmap1 from "../assets/images/1@2x.png";
    import roadmap2 from "../assets/images/2@2x.png";
    import roadmap3 from "../assets/images/3@2x.png";
    import roadmap4 from "../assets/images/4@2x.png";
    import roadmap5 from "../assets/images/5@2x.png";
    import globalUrl from "../urlConfig";
    export default {
        data () {
            return {
                isBanner:0,
                isCurrency:0,
                bannertabsTimer:"",
                bannerList:[
                    {
                        title:"message.home.banner.a.title",
                        text:"message.home.banner.a.text",
                        link:"Introduce",
                        img:banner0
                    },
                    {
                        title:"message.home.banner.b.title",
                        text:"message.home.banner.b.text",
                        link:"Download",
                        img:banner3
                    },
                    {
                        title:"message.home.banner.c.title",
                        text:"message.home.banner.c.text",
                        link:"Increment",
                        img:banner1
                    },
                    {
                        title:"message.home.banner.d.title",
                        text:"message.home.banner.d.text",
                        link:"SuperPartner",
                        img:banner2
                    }
                ],
                boxContainerList:[
                    {
                        title:"message.home.boxContainerList.a.title",
                        text:{
                            icon:"",
                            cont:""
                        },
                        subtext:{
                            icon:"",
                            cont:""
                        },
                        linkText:"message.home.boxContainerList.a.linkText",
                        link:"dataDetails",
                        id:0,
                    },
                    {
                        title:"message.home.boxContainerList.b.title",
                        text:{
                            icon:"",
                            cont:""
                        },
                        subtext:{
                            icon:"",
                            cont:""
                        },
                        linkText:"message.home.boxContainerList.b.linkText",
                        link:"dataDetails",
                        id:1,
                    },
                    {
                        title:"message.home.boxContainerList.c.title",
                        text:{
                            icon:"",
                            cont:""
                        },
                        subtext:{
                            icon:"",
                            cont:""
                        },
                        linkText:"message.home.boxContainerList.c.linkText ",
                        link:"dataDetails",
                        id:2,
                    },
                    {
                        title:"message.home.boxContainerList.d.title",
                        subtitle:"message.home.boxContainerList.d.subtitle",
                        text:{
                            cont:""
                        },
                        subtext:{
                            icon:"",
                            cont:""
                        },
                        linkText:"",
                        link:"dataDetails",
                        id:3,
                        allLink:1
                    },
                    {
                        title:"message.home.boxContainerList.e.title",
                        subtitle:"message.home.boxContainerList.e.subtitle",
                        text:{
                            cont:""
                        },
                        subtext:{
                            icon:"",
                            cont:""
                        },
                        linkText:"",
                        link:"dataDetails",
                        id:4,
                        allLink:1
                    }
                ],
                coinList:[],
                currencyList:[],
                tabsTableTitle:[
                    {
                        title: this.$t("message.home.tabsTableTitle.tit1"),//"message.home.tabsTableTitle.tit1",
                        key: 'market1',
                        sortable: true,
                        align: 'center',
                        minWidth:60,
                        render: (h, params) => {
                            return h('div', [
                                h('span',{
                                    style: {
                                        color: '#333',
                                        fontWeight:"500"
                                    },
                                },params.row.market),
                            ]);
                        },
                        renderHeader:(h,params) => {
                            const title = this.$t("message.home.tabsTableTitle.tit1");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: this.$t("message.home.tabsTableTitle.tit2"),
                        key: 'latesttransactionprice',
                        sortable: true,
                        align: 'center',
                        minWidth:80,
                        render: (h, params) => {
                            return h('div', [
                                h('span',{
                                    style: {
                                       color: '#333',
                                       fontWeight:"500"
                                    },
                                }, params.row.latesttransactionprice),
                            ]);
                        },
                        renderHeader:(h,params) => {
                            const title = this.$t("message.home.tabsTableTitle.tit2");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.home.tabsTableTitle.tit3',
                        key: 'priceFluctuation',
                        sortable: true,
                        align: 'center',
                        render: (h, params) => {
                            let p=params.row.priceFluctuation;
                            if(p >= 0){
                                return h('div', [
                                    h('span',{
                                        style: {
                                            background: '#06B24A',
                                            display:"inline-block",
                                            minWidth:"100px",
                                            height:"28px",
                                            color:"#fff",
                                            lineHeight:"28px"
                                        },
                                    }, "+"+params.row.priceFluctuation + '%'),
                                ]);
                            }else{
                                return h('div', [
                                    h('span',{
                                        style: {
                                            background: '#F15533',
                                            display:"inline-block",
                                            minWidth:"100px",
                                            height:"28px",
                                            color:"#fff",
                                            lineHeight:"28px"
                                        },
                                    }, params.row.priceFluctuation + '%'),
                                ]);
                            }
                        },
                        renderHeader:(h,params) => {
                            const title = this.$t("message.home.tabsTableTitle.tit3");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: this.$t("message.home.tabsTableTitle.tit4"),
                        key: 'peak',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.home.tabsTableTitle.tit4");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.home.tabsTableTitle.tit5',
                        key: 'lows',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.home.tabsTableTitle.tit5");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.home.tabsTableTitle.tit6',
                        key: 'turnover',
                        align: 'center',
                        sortable: true,
                        minWidth:100,
                        renderHeader:(h,params) => {
                            const title = this.$t("message.home.tabsTableTitle.tit6");
                            return h('span',{},title);
                        }
                    },
                    {
                        title:"message.home.tabsTableTitle.tit7",
                        width: 120,
                        align: 'center',
                        key:"action",
                        className:"tableJump",
                        render: (h, params) => {
                            return h("i",{
                                on: {
                                        click: () => {
                                            this.tableJump(params.row.id, params.row.market)
                                        }
                                    }
                            });
                        },
                        renderHeader:(h,params) => {
                            const title = this.$t("message.home.tabsTableTitle.tit7");
                            return h('span',{},title);
                        }
                    }
                ],
                tabsTableData:[],
                roadmapList:[
                    {
                       img:roadmap11,
                       img2:roadmap1,
                       time:"2018.08",
                       text:"message.roadmapList.shangXian",
                    },
                    {   
                        
                        img:roadmap21,
                        img2:roadmap2,
                       time:"2018.10",
                       text:"message.roadmapList.b",
                    },
                    {
                        img:roadmap31,
                        img2:roadmap3,
                       time:"2018.12",
                       text:"message.roadmapList.c",
                    },
                    {
                        img:roadmap41,
                        img2:roadmap4,
                       time:"2019.03",
                       text:"message.roadmapList.d",
                    },
                    {
                        img:roadmap51,
                        img2:roadmap5,
                       time:"2019.09",
                       text:"message.roadmapList.e",
                    },
                ],
                productStyleList:[
                    {   
                        title:"message.home.productStyleList.a1.title",
                        text:["message.home.productStyleList.a1.text.b1","message.home.productStyleList.a1.text.b2"],
                    },
                    {   
                        title:"message.home.productStyleList.a2.title",
                        text:["message.home.productStyleList.a2.text.b1","message.home.productStyleList.a2.text.b2"],
                    },
                    {   
                        title:"message.home.productStyleList.a3.title",
                        text:["message.home.productStyleList.a3.text.b1","message.home.productStyleList.a3.text.b2"],
                    },
                    {   
                        title:"message.home.productStyleList.a4.title",
                        text:["message.home.productStyleList.a4.text.b1","message.home.productStyleList.a4.text.b2"],
                    },
                     {   
                        title:"message.home.productStyleList.a5.title",
                        text:["message.home.productStyleList.a5.text.b1","message.home.productStyleList.a5.text.b2"],
                    },
                ],
                getdataTimer:"",
                homePopup:false,
                iePopup:false,
                tableLoading:false,
            }
        },
        components:{
            Head,
            DealWrapper,
            Footer,
            HelpEntry
        },
        mounted () {
            const seotitle = this.$t('message.topbarNavList.home');
            document.title = seotitle;
            this.resizeBanner();
            window.onresize = () => {
                return (() => {
                    this.resizeBanner();
                })()
            };

            if(this.IEVersion()==-1){ 
                if(sessionStorage.getItem("homePopupStatus")==null || sessionStorage.getItem("homePopupStatus")== false){
                    this.homePopup=true;
                    sessionStorage.setItem('homePopupStatus',true);
                }else{
                    sessionStorage.setItem('homePopupStatus',false);
                }
            }else{
                this.iePopup=true;
            }
            

            this.bannertabsTimer=setInterval(switchBanner,3000) 
            let bannertabs=document.querySelectorAll(".banner-tab li");
            const that=this;
            function switchBanner(){
                that.isBanner++
                if(that.isBanner==bannertabs.length){
                    that.isBanner=0;
                }
            }

            this.getdataTimer=setInterval(function () {
                that.getBoxContainerData();
                that.getSectorData(that.currencyList[that.isCurrency].id);
                that.getCurrency();
            },5000);
            this.tableLoading=true;
            this.getBoxContainerData();
            this.getSelfSelection();
            this.getCurrency();
        },
        destroyed () {
           clearInterval(this.bannertabsTimer)
           clearInterval(this.getdataTimer)
        },
        methods:{
            closeHomePopup(){
                this.homePopup=false;
                sessionStorage.setItem('homePopupStatus',false);
            },
            getBoxContainerData(){ //获取banner下面的数据
                let _that=this;
                this.$axios.get('/public/stock/getCurrentRebate')
                    .then(function (response) {
                        let data = response.data;
                        _that.boxContainerList[0].text.cont=_that.numFormat(_that.toDecimal(data.data.yesterDayTotalTTFReal,4));
                        _that.boxContainerList[1].text.cont=_that.numFormat(_that.toDecimal(data.data.grandTotalTTFReal,4));
                        _that.boxContainerList[2].text.cont=_that.numFormat(_that.toDecimal(data.data.marketTotalTTFReal,4));
                        _that.boxContainerList[3].text.cont=_that.numFormat(_that.toDecimal(data.data.todayTotalBTCReal,4));
                        _that.boxContainerList[3].subtext.cont=_that.numFormat(_that.toDecimal(data.data.yesterDayRebatePerMillionReal,4));
                        _that.boxContainerList[4].text.cont=_that.numFormat(_that.toDecimal(data.data.unAllocatedBTC,4));

                        if(data.data.marketTotalTTFReal==0){
                            _that.boxContainerList[4].subtext.cont=0;
                           
                        }else{
                            _that.boxContainerList[4].subtext.cont=_that.numFormat(_that.toDecimal((data.data.unAllocatedBTC*1000000)/data.data.marketTotalTTFReal,4));
                        }
                       
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getCurrency(){  //获取4个币
                let _that=this;
                _that.$axios.get('/public/stock/get',{code:"700001"})  //BTC/USDT:700006
                    .then(function (response) {
                        let data = response.data;
                       _that.coinList[0]=data.data
                        _that.coinList[0].price2=_that.coinList[0].price*6.81;
                        _that.coinList[0].price=_that.toDecimal(_that.coinList[0].price,_that.coinList[0].priceDigits);
                        _that.coinList[0].price2=_that.toDecimal(_that.coinList[0].price2,2);
                        _that.coinList[0].volume=_that.numFormat(parseInt(_that.coinList[0].volume));
                        _that.coinList[0].currencyName="BTC";
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    
                _that.$axios.get('/public/stock/get',{code:"300006"}) //BHK/BTC:300006
                    .then(function (response) {
                        let data = response.data;
                        _that.coinList[1]=data.data;
                        let price=_that.coinList[1].price2,price2;
                        _that.coinList[1].price2=_that.coinList[1].price*_that.coinList[0].price2;
                        _that.coinList[1].price=_that.toDecimal(_that.coinList[1].price,_that.coinList[1].priceDigits);
                        _that.coinList[1].price2=_that.toDecimal(_that.coinList[1].price2,2);
                        _that.coinList[1].volume=_that.numFormat(parseInt(_that.coinList[1].volume));
                        _that.coinList[1].currencyName="BHK";
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                _that.$axios.get('/public/stock/get',{code:"700002"})  //ETH/usdt:700002
                    .then(function (response) {
                        let data = response.data;
                        _that.coinList[2]=data.data;
                        _that.coinList[2].price2=_that.coinList[2].price*6.81;
                        _that.coinList[2].price=_that.toDecimal(_that.coinList[2].price,_that.coinList[2].priceDigits);
                        _that.coinList[2].price2=_that.toDecimal(_that.coinList[2].price2,2);
                        _that.coinList[2].volume=_that.numFormat(parseInt(_that.coinList[2].volume));
                        _that.coinList[2].currencyName="ETH";

                        _that.$axios.get('/public/stock/get',{code:"900006"})  //BHK/ETH:900006
                            .then(function (response) {
                                let data = response.data;
                                _that.coinList[3]=data.data;
                                _that.coinList[3].price2=_that.coinList[3].price*_that.coinList[2].price2;
                                _that.coinList[3].price=_that.toDecimal(_that.coinList[3].price,_that.coinList[3].priceDigits);
                                _that.coinList[3].price2=_that.toDecimal(_that.coinList[3].price2,2);
                                _that.coinList[3].volume=_that.numFormat(parseInt(_that.coinList[3].volume));
                                _that.coinList[3].currencyName="BHK";
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            getSelfSelection(){ //获取创新区
                let _that=this;
                _that.$axios.get('/public/stock/sector/find',{type:2})
                    .then(function (response) {
                        let data = response.data;
                        if(data.length>0){
                            let selfSelectionObj={
                                id:data[0].id,
                                name:"message.home.dataname"
                            };
                            //_that.currencyList.push(selfSelectionObj);
                            _that.getSectorTitleData();
                            //_that.getSectorData(data[0].id);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getSectorTitleData(){ //获取其他币
                let _that=this;
                _that.$axios.get('/public/stock/sector/find',{type:1})
                    .then(function (response) {
                        let data = response.data;
                        if(data.length>0){
                            for (let value of data) { 
                                if(_that.getStringLetter(value.name)){
                                    _that.currencyList.push({
                                        id:value.id,
                                        name:_that.getStringLetter(value.name)
                                    })
                                }
                            };
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getSectorData(currencyid){
                let _that=this;
                 _that.$axios.get('/public/stock/findBySector',{sectorId:currencyid})
                    .then(function (response) {
                        _that.tableLoading=false;
                        let data = response.data;
                        _that.tabsTableData=[];
                        for(let v of data){
                            v.volume=_that.toDecimal( v.volume,v.volumeDigits);
                            v.price=_that.toDecimal( v.price,v.priceDigits);
                            v.highestPrice=_that.toDecimal(v.highestPrice,v.priceDigits);
                            v.lowestPrice=_that.toDecimal(v.lowestPrice,v.priceDigits)
                            _that.tabsTableData.push({
                                id:v.id,
                                market: v.name,
                                latesttransactionprice: v.price,
                                priceFluctuation:v.priceFluctuation,
                                peak:v.highestPrice,
                                lows:v.lowestPrice,
                                turnover:v.volume
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            bannerTab(index){
                this.isBanner=index;
                clearInterval(this.bannertabsTimer)
            },
            currencyTab(index){
                this.tableLoading=true;
                this.getSectorData(this.currencyList[index].id)
            },
            getStringLetter(text){
               return text.replace(/[^a-z]+/ig, "");
            },
            tableJump(id,name){
                window.location.href=globalUrl.hrefUrl+"/trading/?id="+id+"&name="+name;
            },
            swicthImg(index){
                [this.roadmapList[index].img2, this.roadmapList[index].img] = [this.roadmapList[index].img, this.roadmapList[index].img2];
            },
            IEVersion() {
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
                var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
                var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
                var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
                if(isIE) {
                    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                    reIE.test(userAgent);
                    var fIEVersion = parseFloat(RegExp["$1"]);
                    if(fIEVersion == 7) {
                        return 7;
                    } else if(fIEVersion == 8) {
                        return 8;
                    } else if(fIEVersion == 9) {
                        return 9;
                    } else if(fIEVersion == 10) {
                        return 10;
                    } else {
                        return 6;//IE版本<=7
                    }   
                } else if(isEdge) {
                    return 'edge';//edge
                } else if(isIE11) {
                    return 11; //IE11  
                }else{
                    return -1;//不是ie浏览器
                }
            }
        }
    }
</script>
<style lang="scss">
    .home-popup,.ie-popup{
        .ivu-modal-content{
            border-radius:0;
        }
        .ivu-modal-header{
            display:none;
        }
        .ivu-modal-footer{
            display:none;
        }
        .ivu-modal-body{
            padding:30px 25px 20px;
            font-size:14px;
            color:#373D41;
            text-align:center;
            h3{
                font-size:18px;
                color:#373D41;
                margin-bottom:20px;
                line-height:1;
            }
            p{
                line-height:1.5;
                margin-bottom:5px;
            }
            span{
               width:150px;
               height:33px;
               line-height:33px;
               color:#fff;
               background:#F15533;
               margin-top:35px;
               display:inline-block;
               cursor:pointer;
            }
        }
    }
</style>
<style lang="scss">
    @import "../assets/sass/setting.scss";
    .arrow-right-icon{
        background-image:url("../assets/images/arror-right.png");
        background-size: 100%;
        width: 21px;
        height: 18px;
        display: inline-block;
        margin-left: 10px;
        vertical-align: bottom;
         transition:background-image .3s ease-in-out;
    }
    .layer a:hover i{
        background-image:url("../assets/images/arror-right-h.png");
    }
    .module-container{
        .coin-module{
            padding: 80px;
            margin-bottom: 80px;
            background: #f8f8f8;
        }
        .product-title{
            text-align: center;
            font-size: 24px;
            color: #373d41;
            line-height: 1;
            span{
                width: 200px;
                height: 1px;
                background: #E7E7E8;
                display: inline-block;
                vertical-align: middle;
                margin:0 8%; 
                &:last-child{
                    margin-right:0;
                }
                &:first-child{
                    margin-left:0;
                }

            }
        }
        .product-sub-title{
            font-size: 16px;
            margin: 20px auto 45px;
            text-align: center;
            color: #73777A;
            max-width: 1000px;
        }
        .coin-box{
            position: relative;
            .coin-box-container{
                margin: 0 auto;
                max-width: 1200px;
                display: flex;
                &>div{
                    flex: 1;
                    text-align: center;
                    a{
                        max-width: 160px;
                        display: block;
                        margin: 0 auto;
                        text-align: left;
                        *{
                            line-height: 1
                        }
                        span{
                           font-size: 14px; 
                           margin-left: 15px;
                           color: #1E9E55;
                           &.fall{
                               color: #E13535;
                           }
                        }
                        h3{
                            color: #3A3A40;
                            font-size: 16px;
                            font-weight: 700;
                            line-height: 1;
                        }
                        div{
                            color: #3A3A40;
                            font-size: 16px;
                            margin: 10px 0;
                            white-space: nowrap;
                            span{
                                color: #999;
                                font-size: 12px;
                                margin-left: 15px;
                            }
                        }
                        p{
                            font-size: 12px;
                            color: #999;
                            white-space: nowrap;
                            span{
                                color: #999;
                            }
                        }
                    }
                }
            }
        }
        .tabs-table{
            text-align: center;
            position: relative;
            min-width: 1000px;
            max-width: 1200px;
            margin: auto;
            ul{
                height: 70px;
                line-height: 70px;
                overflow: hidden;
                border: 1px solid #E7E7E8;
                border-bottom: none;
                li{
                    float: left;
                    padding: 0 25px;
                    color: #3A3A40;
                    font-size: 18px;
                    font-weight: 400;
                    cursor: pointer;
                    &.active {
                        color: $theme-color;
                        span{
                            border-bottom: 2px solid $theme-color;
                        }
                    }
                    span{
                        height: 100%;
                        padding: 22px 0;
                        line-height: 70px;
                    }
                    
                }
            }
            .tableJump{
                i{
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background: url("../assets/images/tableJump.png") no-repeat;
                    background-size: 100%;
                    cursor: pointer;
                }

            }
        }
        .product-style{
            background: #F8F8F8;
            margin-top: 80px;
            padding: 60px 0;
            .product-style-container{
                display: flex;
                justify-content: center;
                max-width: 1200px;
                margin: 0 auto;
                div{
                    flex: 1;
                    text-align: center;
                    &:hover .img{
                            animation: auto 0.8s steps(14) forwards;
                            @keyframes auto{
                                50%{background-position:0 -1400px;}
                                100%{background-position:0 0;}
                            }
                        }
                    .img{
                        width: 100px;
                        height: 100px;
                        margin: 0 auto 14px;
                        overflow: hidden;
                        background-position: 0 0;
                        background-image:url("../assets/images/style1.png");
                        background-repeat: no-repeat;
                        background-size: cover;
                        transition: all .6s;
                    }
                    &:nth-of-type(2) .img{
                        background-image:url("../assets/images/style2.png");
                    }
                    &:nth-of-type(3) .img{
                        background-image:url("../assets/images/style3.png");
                    }
                    &:nth-of-type(4) .img{
                        background-image:url("../assets/images/style4.png");
                    }
                    &:nth-of-type(5) .img{
                        background-image:url("../assets/images/style5.png");
                    }
                    h3{
                        margin-top: 30px;
                        margin-bottom:15px;
                        color: #333;
                        line-height: 1;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    p{
                        margin-bottom: 10px;
                        color: #666;
                        line-height: 1;
                        font-size: 14px;
                    }
                }
            }
        }
        .road-map{
            margin-top:80px;
            &>div{
                max-width: 1200px;
                margin: 50px auto 80px;
            }
            ul{
                display: flex;
                li{
                    flex: 1;
                    color:#666;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    &:hover{
                        &:before{
                            background-image:url("../assets/images/before-h.png");
                        }
                    }
                    &:after{
                        content: "";
                        width: 100%;
                        border-bottom: 1px dashed #666;
                        position: absolute;
                        top: 58%;
                        left: 0;
                    }
                    &:before{
                        content: "";
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: 100%;
                        background-image:url("../assets/images/before.png");
                        position: absolute;
                        top: 52.75%;
                        left: 50%;
                        z-index: 1;
                        margin-left: -10px;
                    }
                    img{   
                        width: 70px;
                        transition: all .4s;
                    }
                    p{
                        margin: 55px 0 10px;
                        font-size: 14px;
                        line-height: 1;
                        color: #666;
                    }
                    div{
                        line-height: 1;
                        font-size: 16px;
                        color: #666;
                    }
                }
            }
        }
        .text-space {
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
    }

</style>

