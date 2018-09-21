<template>
    <div class="TradeMing">
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList" :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text">
                            <div>
                                <h1><img src="../assets/images/box-icon.png" />{{$t("message.TradeMining.title.a1")}} <span>{{numFormat(toDecimal(boxContainerList.grandTotalTTFReal*0.51,4))}}</span> BHK<em>{{$t("message.TradeMining.title.a2")}} <span>{{numFormat(5100000000)}}</span> BHK</em></h1>
                                <div class="progress-bar">
                                    <span :style="{width:progress}"></span>
                                </div>
                                <p @click="locationFn(tradeMiningHref)">{{$t("message.TradeMining.title.a3")}} >></p>
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
            <div class="index-box-container">
                <div class="box-container">
                    <ul>
                        <li>
                            <h2>{{$t("message.TradeMining.boxcontainer.b1")}}</h2>
                            <h3><span>{{numFormat(toDecimal(boxContainerList.todayTotalBTCReal,4))}}</span> BTC</h3>
                            <p>{{$t("message.TradeMining.boxcontainer.b2")}}：
                                <span>{{numFormat(toDecimal(boxContainerList.yesterDayRebatePerMillionReal,4))}}</span> BTC</p>
                        </li>
                        <li>
                            <h2>{{$t("message.TradeMining.boxcontainer.b3")}}</h2>
                            <h3><span>{{numFormat(toDecimal(boxContainerList.hourTotalBTCReal,4))}}</span> BTC</h3>
                            <p>{{$t("message.TradeMining.boxcontainer.b4")}}：<span>{{numFormat(toDecimal(boxContainerList.hourRebatePerMillionReal,4))}}</span> BTC</p>

                        </li>
                        <li>
                            <p style="margin-bottom:15px;">{{$t("message.TradeMining.boxcontainer.b6")}}：<span></span><router-link :to="{name:'dataDetails',params:{id:'5'}}"><strong>{{$t("message.TradeMining.boxcontainer.b9")}}<i class="arrow-right-icon"></i></strong></router-link></p>
                            <p style="margin-bottom:15px;">{{$t("message.TradeMining.boxcontainer.b7")}}：<span>{{numFormat(toDecimal(boxContainerList.yesterDayTotalTTFReal,4))}}</span> BHK</p>
                            <p>{{$t("message.TradeMining.boxcontainer.b10")}}：<span>{{numFormat(toDecimal(boxContainerList.grandTotalTTFReal,4))}}</span> BHK</p>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="tradeMining-content">

            <div class="top-content" v-if="isLogin">
                <div class="top-tab">
                    <ul>
                        <li v-for="(item,index) in topTab" :key="index" :class="{'active':topTabActive==index}" @click="topTabActive=index,topTabFn(index)" v-t="item"></li>
                    </ul>
                    <div  @mouseenter="showInviteQr=true,qrcode()" @mouseleave="showInviteQr=false">
                        <img src="../assets/images/helpQrImg.png" alt=""><span>{{$t("message.TradeMining.topcontent.c1")}}</span>
                        <div v-show="showInviteQr" id="qrcode">
                            <!--<img src="../assets/images/invite-img.png" alt="">-->
                        </div>
                    </div>
                </div>
                <div class="top-tab-content" v-if="topTabActive==0">
                    <Table stripe :loading="loading" :columns="topTabTableColumns" :data="topTabTableData" :no-data-text="tableNoData" class="todayTotalTable"></Table>
                    <!-- <div>
                        <p>{{$t("message.TradeMining.topcontent.c2")}}</p>
                        <strong>0</strong>
                        <button>{{$t("message.TradeMining.topcontent.c3")}}</button>
                    </div>
                    <div>
                        <p>{{$t("message.TradeMining.topcontent.c4")}}</p>
                        <strong>0</strong>
                        <button>{{$t("message.TradeMining.topcontent.c5")}}</button>
                    </div>
                    <div>
                        <p>{{$t("message.TradeMining.topcontent.c6")}}</p>
                        <strong>0</strong>
                        <span @click="showUnlockingModal">{{$t("message.TradeMining.topcontent.c7")}}</span>
                    </div>
                    <div>
                        <p>{{$t("message.TradeMining.topcontent.c8")}}</p>
                        <strong>0</strong>
                        <span>{{$t("message.TradeMining.topcontent.c9")}}</span>
                    </div> -->
                </div>
                <!-- <div class="top-tab-content top-tab-profit" v-else-if="topTabActive==1">
                    <div>
                        <p>{{$t("message.TradeMining.topcontent.c10")}}</p>
                        <strong>0</strong>
                        <p>{{$t("message.TradeMining.topcontent.c11")}} <span>0</span> BHK</p>
                    </div>
                    <div>
                        <p>{{$t("message.TradeMining.topcontent.c4")}}</p>
                        <strong>0</strong>
                        <p>{{$t("message.TradeMining.topcontent.c12")}} <span>0</span> BHK</p>
                    </div>
                    <div>
                        <p>{{$t("message.TradeMining.topcontent.c6")}}</p>
                        <strong>0</strong>
                        <p>{{$t("message.TradeMining.topcontent.c13")}} <span>0</span> BHK</p>
                    </div>
                    <div>
                        <p>{{$t("message.TradeMining.topcontent.c8")}}</p>
                        <strong>0</strong>
                        <p>{{$t("message.TradeMining.topcontent.c14")}} <span>0</span> BHK</p>
                    </div>
                </div> -->
            </div>
            
            <div class="not-loggedin" v-else>
                <router-link to="/Login">{{$t("message.TradeMining.topcontent.c15")}}</router-link>{{$t("message.TradeMining.topcontent.c16")}}
            </div>

            <div class="bottom-content">
                <div class="bottom-tab">
                    <div v-for="(item,index) in bottomTab" :key="index" :class="{'active':bottomTabActive==index}" @click="bottomTabActive=index,bottomTabFn(index)" v-t="item"></div>
                </div>
                <div class="bottom-tab-content">
                    <div class="bottom-tab-tab">
                        <ul v-if="bottomTabActive==0">
                            <li v-for="(item,index) in bottomTabTab0" :key="index" :class="{'active':bottomTabTabActive0==index}" @click="bottomTabTabActive0=index,bottomTabTabFn0(index)" v-t="item"></li>
                        </ul>
                        <ul v-else-if="bottomTabActive==1">
                            <li v-for="(item,index) in bottomTabTab1" :key="index" :class="{'active':bottomTabTabActive1==index}" @click="bottomTabTabActive1=index,bottomTabTabFn1(index)" v-t="item"></li>
                        </ul>
                        <div v-if="bottomTabActive==0">
                            <div v-if="bottomTabTabActive0==0">

                            </div>
                            <div v-else-if="bottomTabTabActive0==1">
                                <DatePicker type="date" :editable="false" :placeholder="$t('message.TradeMining.topcontent.c17')" @on-change="dateChange" :value="selectData" style="width: 150px"></DatePicker>
                            </div>
                        </div>
                        <div v-if="bottomTabActive==1">
                            <div v-if="bottomTabTabActive1==0">
                                <div class="select-current" style="width:150px;display:inline-block;" v-if="isShowSelect">
                                    <Select v-model="selectDefault"  @on-change="changeSelect" :placeholder="selectPlaceholder">
                                        <Option v-for="item in selectList" :value="item.code" :key="item.code">{{item.name}}</Option>
                                    </Select>
                                </div>
                            </div>
                            <div v-else-if="bottomTabTabActive1==1">

                            </div>
                        </div>
                    </div>
                    <div v-if="bottomTabActive==0">
                        <Table stripe :loading="loading" :columns="tableColumns1" :data="tableData1" :no-data-text="tableNoData" v-if="bottomTabTabActive0==0" class="todayTotalTable"></Table>
                        <Table stripe :loading="loading" :columns="tableColumns2" :data="tableData2" :no-data-text="tableNoData" v-else-if="bottomTabTabActive0==1"></Table>
                    </div>
                    <div v-else-if="bottomTabActive==1">
                        <Table stripe :loading="loading" :columns="tableColumns3" :data="tableData3" :no-data-text="tableNoData" v-if="bottomTabTabActive1==0"></Table>
                        <Table stripe :loading="loading" :columns="tableColumns4" :data="tableData4" :no-data-text="tableNoData" v-else-if="bottomTabTabActive1==1"></Table>
                        <Table stripe :loading="loading" :columns="tableColumns5" :data="tableData5" :no-data-text="tableNoData" v-else-if="bottomTabTabActive1==2"></Table>
                    </div>
                </div>
            </div>
            
        </div>
        <Modal class-name="unlocking-record" v-model="unlockingRecordPopup" width="540" :closable="false" >
            <div class="unlocking-record-content">
                <h3>{{$t("message.TradeMining.topcontent.c18")}}<Icon type="close-round" @click="showUnlockingModal"></Icon></h3>
                <Table stripe :columns="unlockingColumns" :data="unlockingData"></Table>
            </div>
            <div slot="footer"></div>
        </Modal>
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from "./common/Head";
    import Footer from "./common/Footer";
    import HelpEntry from "./common/HelpEntry";
    import banner0 from "../assets/images/TradeMining-banner.png";
    import boxIcon from "../assets/images/box-icon2.png";
    import QRCode from 'qrcodejs2';
    export default {
        data(){
            return{
                myUrl:'https://www.bithank.com/#/Register?uuid=',
                uuid:"",
                isBanner:0,
                isCurrency:0,
                bannerList:[
                    {
                        img:banner0
                    },
                ],
                boxContainerList:[],
                topTabActive:0,
                topTab:["message.TradeMining.topTab.d1"],
                bottomTabActive:0,
                bottomTab:["message.TradeMining.bottomTab.e1","message.TradeMining.bottomTab.e2"],
                bottomTabTabActive0:0,
                bottomTabTab0:["message.TradeMining.bottomTabTab0.f1","message.TradeMining.bottomTabTab0.f2"],
                bottomTabTabActive1:0,
                bottomTabTab1:["message.TradeMining.bottomTabTab1.g1","message.TradeMining.bottomTabTab1.g2","message.TradeMining.bottomTabTab1.g3"],
                isLogin:false,
                showInviteQr:false,
                topTabTableColumns:[
                    {
                        title: 'message.TradeMining.tableColumns1.h1',
                        key: 'name',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns1.h1");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns1.h2',
                        key: 'HoldingNum',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns1.h2");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns1.h3',
                        key: 'datumDifficulty',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns1.h3");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns1.h4',
                        key: 'miningDifficulty',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns1.h4");
                            return h('span',{},title);
                        }
                    },
                ],
                topTabTableData:[],
                tableColumns1:[
                    {
                        title: 'message.TradeMining.tableColumns1_1.h1',
                        key: 'todayTotalBTCReal',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns1_1.h1");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns1_1.h2',
                        key: 'yesterDayRebatePerMillionReal',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns1_1.h2");
                            return h('span',{},title);
                        }
                    },
                ],
                tableData1:[
                    {
                        todayTotalBTCReal:"",
                        yesterDayRebatePerMillionReal:""
                    }
                ],
                tableColumns2:[
                    {
                        title: 'message.TradeMining.tableColumns2.i1',
                        key: 'date',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns2.i1");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns2.i2',
                        key: 'description',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns2.i2");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns2.i3',
                        key: 'totalNum',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns2.i3");
                            return h('span',{},title);
                        }
                    }
                ],
                tableData2:[],
                tableColumns3:[
                    {
                        title: 'message.TradeMining.tableColumns3.j1',
                        key: 'dt',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns3.j1");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns3.j2',
                        key: 'name',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns3.j2");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns3.j3',
                        key: 'num',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns3.j3");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns3.j4',
                        key: 'flow',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns3.j4");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns3.j5',
                        key: 'source',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns3.j5");
                            return h('span',{},title);
                        }
                    },
                ],
                tableData3:[],
                tableColumns4:[
                    {
                        title: 'message.TradeMining.tableColumns4.j1',
                        key: 'dt',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns4.j1");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns4.j2',
                        key: 'name',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns4.j2");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns4.j3',
                        key: 'num',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns4.j3");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns4.j4',
                        key: 'rebateNum',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns4.j4");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns4.j5',
                        key: 'flow',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns4.j5");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns4.j6',
                        key: 'source',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns4.j6");
                            return h('span',{},title);
                        }
                    },
                ],
                tableData4:[],
                tableNoData:"<div class='table-no-data'><img src='"+boxIcon+"'><p>" + this.$t("message.TradeMining.tableNoData") + "<p/></div>",
                tableColumns5:[
                     {
                         title: 'message.TradeMining.tableColumns5.j1',
                         key: 'dt',
                         align: 'center',
                         renderHeader:(h,params) => {
                             const title = this.$t("message.TradeMining.tableColumns5.j1");
                             return h('span',{},title);
                         }
                    },
                    {
                        title: 'message.TradeMining.tableColumns5.j2',
                        key: 'name',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns5.j2");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns5.j3',
                        key: 'num',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns5.j3");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns5.j4',
                        key: 'flow',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns5.j4");
                            return h('span',{},title);
                        }
                    },
                    {
                        title: 'message.TradeMining.tableColumns5.j5',
                        key: 'source',
                        align: 'center',
                        renderHeader:(h,params) => {
                            const title = this.$t("message.TradeMining.tableColumns5.j5");
                            return h('span',{},title);
                        }
                    },
                ],
                tableData5:[],
                tableNoData:"<div class='table-no-data'><img src='"+boxIcon+"'><p>" + this.$t("message.TradeMining.tableNoData") + "<p/></div>",
                unlockingRecordPopup:false,
                unlockingColumns:[
                    {
                        title: 'message.TradeMining.unlockingColumns.k1',
                        key: 'currency',
                        width:160,
                        align: 'left',
                    },
                    {
                        title: 'message.TradeMining.unlockingColumns.k2',
                        key: 'currency',
                        align: 'center',
                    },
                    {
                        title: 'message.TradeMining.unlockingColumns.k3',
                        key: 'currency',
                        width:160,
                        align: 'right',
                    }
                ],
                loading:false,
                selectData:"",
                selectList: [{
                    name:this.$t("message.TradeMining.select.l1"),
                    code:"all"
                }],
                selectDefault:"all",
                selectPlaceholder:this.$t("message.TradeMining.select.l2"),
                progress:"",
                isShowSelect:false,
                boxContainerTimer:"",
                tradeMiningHref:"https://bithank.zendesk.com/hc/zh-cn/articles/360012948532"
            }
        },
        created () {
            let _that=this;
            this.uuid=this.$store.state.userInfo.uuid;
        },
        mounted () {
            let seotitle = this.$t('message.topbarNavList.tradeMining');
            document.title = seotitle;
            this.resizeBanner();
            window.onresize = () => {
                return (() => {
                    this.resizeBanner();
                })()
            };
            let _that=this;
            this.getBoxContainerData(); //默认执行banner下面的数据
            _that.boxContainerTimer=setInterval(function () {
                _that.getBoxContainerData();
            },5000)


            // 默认执行历史分配
            let yesterday =new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            _that.selectData=yesterday.format("yyyy-MM-dd");
            _that.dateChange(_that.selectData);

            // 如果登录则显示个人收益等接口
            if(_that.$store.state.isLogin || sessionStorage.getItem("loginStatus")=='true'){
                _that.isLogin=true;
                _that.isShowSelect=true;
                _that.getPositionByDt(_that.selectData);
                _that.getAllCurrency();
                _that.changeSelect("");
                _that.getReturnBoundageOrder();
                _that.getReturnBoundageRefereeOrder();

            }
        },
        destroyed () {
           clearInterval(this.boxContainerTimer)
        },
        methods:{
            qrcode () {
                document.querySelector("#qrcode").innerHTML=""
                let _that=this;
                let qrcode = new QRCode('qrcode', {
                    width: 80,
                    height: 80, // 高度
                    text: _that.recommendAddress // 二维码内容
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                });
                // _that.qrcodeUrl = qrcode;
            },
            getBoxContainerData(){ //获取banner下面的数据
                let _that=this;
                this.$axios.get('/public/stock/getCurrentRebate')
                    .then(function (response) {
                        let data = response.data;
                        data.data.hourRebatePerMillionReal=_that.scientificToNumber(data.data.hourRebatePerMillionReal)
                        data.data.hourTotalBTCReal=_that.scientificToNumber(data.data.hourTotalBTCReal)
                        data.data.yesterDayRebatePerMillionReal=_that.scientificToNumber(data.data.yesterDayRebatePerMillionReal)
                        data.data.todayTotalBTCReal=_that.scientificToNumber(data.data.todayTotalBTCReal)
                        _that.boxContainerList=data.data;
                        _that.progress=data.data.grandTotalTTFReal*0.51/5100000000*100+'%';
                        _that.tableData1[0].todayTotalBTCReal=data.data.todayTotalBTCReal;
                        _that.tableData1[0].yesterDayRebatePerMillionReal=data.data.yesterDayRebatePerMillionReal;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            dateChange(date){
                this.selectData=date;
                this.getDailyRebate(date)
            },
            getPositionByDt(yesterday){ //昨日最低BHK持仓数量
                let _that=this;
                _that.tableData2=[];
                _that.loading=true;
                this.$axios.get('/member/position/getPositionByDt',{
                    date:yesterday
                    })
                    .then(function (response) {
                        _that.loading=false;
                        let data = response.data;
                        //console.log(data)
                        if(data.result=='success'){
                            if(data.data.length>0){
                                data.data.forEach((item,index) => {
                                    // _that.topTabTableData.push({
                                    //     date:item.dt,
                                    //     description:item.description,
                                    //     totalNum:item.totalNum
                                    // })
                                });
                            }
                        }else{
                            alert(_that.$t("message.TradeMining.select.l3"))
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getDailyRebate(yesterday){  //历史分配
                let _that=this;
                _that.tableData2=[];
                _that.loading=true;
                this.$axios.get('/public/stock/getDailyRebate',{
                    date:yesterday
                    })
                    .then(function (response) {
                        _that.loading=false;
                        let data = response.data;
                        if(data.result=='success'){
                            if(data.data.length>0){
                                data.data.forEach((item,index) => {
                                    _that.tableData2.push({
                                        date:item.dt,
                                        description:item.description,
                                        totalNum:item.totalNum
                                    })
                                });
                            }
                        }else{
                            alert(_that.$t("message.TradeMining.select.l3"));
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getAllCurrency(){//获取所有的币
                let _that=this;
                _that.$axios.get('/member/position/findAll')
                    .then(function (response) {
                        _that.selectPlaceholder=_that.$t("message.TradeMining.select.l2");
                        if (response.status == 200) {
                            if(response.data.length>0){
                                response.data.forEach((item,index) => {
                                    _that.selectList.push({
                                        name:item.name,
                                        code:item.code
                                    });
                                });
                            }else{
                                _that.selectPlaceholder = _that.$t("message.TradeMining.select.l4");
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            changeSelect(code){
                if(code=='all'){
                    code=''
                }
                this.tableData3=[];
                this.getRebateOrder(code);
            },
            getRebateOrder(code){ //个人 分红明细
                let _that=this;
                _that.loading=true;
                _that.$axios.post("/member/position/getRebateOrder",{code:code})
                .then(function (response) {
                    _that.loading=false;
                    if(response.data.result=="success"){
                        if(response.data.data.length>0){
                            response.data.data.forEach((value,index) => {
                                if(value.flow==1){
                                    value.flow = _that.$t("message.TradeMining.value.m1");
                                }else{
                                    value.flow = _that.$t("message.TradeMining.value.m2");
                                }
                                value.num=_that.scientificToNumber(value.num)
                                value.source = _that.$t("message.TradeMining.value.m3");
                                _that.tableData3.push(value) 
                            });
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getReturnBoundageOrder(){ //个人 交易挖矿产出明细
                let _that=this;
                _that.tableData4=[];
                _that.$axios.post("/member/position/getReturnBoundageOrder",{code:""})
                .then(function (response) {
                    if(response.data.result=="success"){
                        if(response.data.data.length>0){
                            response.data.data.forEach((value,index) => {
                                if(value.flow==1){
                                    value.flow = _that.$t("message.TradeMining.value.m1");
                                }else{
                                    value.flow = _that.$t("message.TradeMining.value.m2");
                                }
                                value.num=_that.scientificToNumber(value.num)
                                value.source=value.name + _that.$t("message.TradeMining.value.m4");
                                _that.tableData4.push(value) 
                            });
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getReturnBoundageRefereeOrder(){ //个人 推荐返佣收益明细
                let _that=this;
                _that.$axios.post("/member/position/getReturnBoundageRefereeOrder",{code:""})
                    .then(function (response) {
                        if(response.data.result=="success"){
                            if(response.data.data.length>0){
                                response.data.data.forEach((value,index) => {
                                    value.name="BHK";
                                    value.num=_that.scientificToNumber(value.num);
                                    if(value.level==1){
                                        value.source= _that.$t("message.TradeMining.value.m5")
                                    }else{
                                        value.source=_that.$t("message.TradeMining.value.m6")
                                    }
                                    _that.tableData5.push({
                                        dt:value.dt,
                                        name:value.name,
                                        num:value.num,
                                        flow:value.flow,
                                        source:value.source
                                    }) 
                                });
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        _that.tableTip=_that.$t("message.TradeMining.value.m7");
                    });
            },
            locationFn(href){
                window.open(href)
            },
            topTabFn(index){
                console.log(index)
            },
            bottomTabFn(index){
               console.log(index)
            },
            bottomTabTabFn0(index){
            },
            bottomTabTabFn1(index){
            },
            showUnlockingModal(){
                this.unlockingRecordPopup=!this.unlockingRecordPopup;
            }
        },
        computed: {
            recommendAddress(){
                console.log(this.$store);
                return this.myUrl+this.uuid;
            }
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
    $Assetbanner-height:588px;
    .TradeMing{
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
                            top: 180px;
                            width: 1200px;
                            text-align: left;
                            div{
                                h1{
                                    color: #03B1CC;
                                    margin-bottom: 0px;
                                    font-size: 24px;
                                    line-height: 1;
                                    color:#fff;
                                    position: relative;
                                    img{
                                        width: 55px;
                                        height: 57px; 
                                        vertical-align: bottom; 
                                    }
                                    em{
                                        position: absolute;
                                        bottom: 0;
                                        right: 0;
                                    }
                                    span{
                                        color: #FF6600;
                                    }
                                }
                                p{
                                    font-size: 16px;
                                    color: #fff;
                                    margin-top: 24px;
                                    text-align: center;
                                    line-height: 1;
                                    width: 100%;
                                    max-width: 1200px;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }
            .index-box-container{
                .box-container{
                    >ul{
                        >li{ 
                            padding: 25px 30px;
                            width:33.333%;
                            h2{
                                font-size: 14px;
                                color: #fff;  
                                line-height: 1;
                                font-weight: 100;
                                strong{
                                    margin-left: 25px;
                                }
                            }
                            h3{
                                opacity: 1;
                                font-size: 14px;
                                line-height: 1;
                                margin-bottom: 23px;
                                span{
                                    font-size: 24px;
                                }
                            }
                            p{
                                color:#fff;
                                line-height: 1;
                                margin-bottom:10px;
                                i{
                                    width: 16px;
                                    height: 17px;
                                    vertical-align: middle;
                                    background-repeat: no-repeat;
                                    background-image: url("../assets/images/arror-right-h.png");
                                }
                            }
                            span{
                                color:#FF6600;
                            }
                            strong{
                                color: $theme-color;
                                cursor: pointer;
                                border-bottom: 1px solid $theme-color;
                                display: inline-block;
                                line-height: 1;
                                a{
                                    color: $theme-color;
                                    display: inline-block;
                                    line-height: 1;
                                    opacity: 1;
                                    padding-bottom: 1px;
                                    text-decoration: none;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
@import "../assets/sass/setting"; 
    .TradeMing{
        background:#555A5E;
        .progress-bar{
            margin-top:20px;
            height:48px;
            border:1px solid RGBA(9, 129, 148, .8);
            box-shadow:0 1px 2px rgba(9,129,148,.8);
            span{
                display: inline-block;
                background:#0E7889;
                background:-webkit-linear-gradient(left,#0E7889,#03B1CC);
                background:-o-linear-gradient(right,#0E7889,#03B1CC);
                background:-moz-linear-gradient(right,#0E7889,#03B1CC);
                background:linear-gradient(to right,#0E7889,#03B1CC);
                width:0%;
                height:100%;
                transition: all .3s linear;
            }
        }
        .tradeMining-content{
            max-width: 1200px;
            margin:0 auto;
            .top-content{
                background:#fff;
                margin:20px 0;
                .top-tab{
                    border-bottom:1px solid #E7E7E8;
                    &:after{
                        content:"";
                        display: block;
                        clear: both;
                    }
                    >div{
                        float: right;
                        margin:36px 50px 20px 0;
                        position: relative;
                        font-size:14px;
                        cursor: pointer;
                        color:$theme-color;
                        >img{
                            width:16px;
                            height:16px;
                            vertical-align:sub;
                        }
                        span{
                            margin-left:8px;
                        }
                        div{
                            position: absolute;
                            left:0;
                            background:#fff;
                            height:165px;
                            width:150px;
                            top: -162px;
                            z-index: 999;
                            img{
                                width:100%;
                                height:160px;
                            }
                        }
                    }
                    >ul{
                        margin-left:10px;
                        float: left;
                        &:after{
                            content:"";
                            display: block;
                            clear: both;
                        }
                        >li{
                            font-size:18px;
                            padding:26px 0;
                            margin-left:30px;
                            float: left;
                            cursor: pointer;
                            font-weight:700;
                            position: relative;
                            &.active{
                                color: $theme-color;
                                &:before{
                                    content:"";
                                    position: absolute;
                                    bottom:0;
                                    left:0;
                                    height:2px;
                                    width:100%;
                                    background:$theme-color;
                                }
                            }
                        }
                    }
                    #qrcode{
                        padding:10px;
                        img{
                            height: auto;
                        }
                    }
                }
                .top-tab-content{
                    display: flex;
                    text-align:center;
                    &.top-tab-profit{
                        >div:hover{
                            background:$theme-color;
                            &:after{
                                width:0;
                            }
                            *{
                                color:#fff;
                            }
                            &:before{
                                content:"";
                                position: absolute;
                                height: 0;
                                width: 0;
                                right: 0;
                                top: 50%;
                                margin-top: -7.5px;
                                border-style:solid;
                                 border-width: 10px 10px 10px 0;
                                border-color:transparent #fff transparent transparent;/*透明 灰 透明 透明 */
                            }
                        }
                        strong{
                            color:#f60;
                        }
                   
                        position: relative ;
                        flex:1;
                        &:after{
                            content:"";
                            position: absolute;
                            width:1px;
                            height:40px;
                            background:#eee;
                            right:0;
                            top:50%;
                            margin-top:-20px;
                        }
                        p{
                            color:#73777A;
                            font-size:14px;
                            line-height:1;
                            margin:30px 0 20px;
                            &:last-child{
                                margin:22px 0 30px;
                            }
                            span{
                                color:#333;
                            }
                        }
                        strong{
                            font-weight:100;
                            color:#333;
                            font-size:24px;
                            display: block;
                            line-height:1;
                        }
                        button{
                            background:#eee;
                            width:90px;
                            height:26px;
                            line-height:26px;
                            color:#999;
                            font-size:12px;
                            margin:20px 0;
                            cursor: pointer;
                            &[disabled]{
                                cursor: not-allowed;
                            }
                        }
                        >span{
                            width:90px;
                            height:26px;
                            line-height:26px;
                            border:1px solid $theme-color;
                            font-size:14px;
                            color:$theme-color;
                            margin:20px 0;
                            display: inline-block;
                            cursor: pointer;
                        }
                     }
                }
            }
            .not-loggedin{
                display:flex;
                justify-content:center;
                align-items:center;
                height:160px;
                font-size:24px;
                line-height:1;
                background:#fff;
                margin:20px 0;
                a{
                    display: inline-block;
                    padding-bottom:1px;
                    border-bottom:1px solid $theme-color;
                    margin-right:5px;
                }
            }
            .bottom-content{
                background:#fff;
                margin-bottom:34px;
                .bottom-tab{
                    height:88px;
                    line-height:88px;
                    border-bottom:1px solid #E7E7E8;
                    display: flex;
                    >div{
                        flex:1;
                        font-size:24px;
                        text-align:left;
                        margin:0 55px;
                        cursor: pointer;
                        position: relative;
                        &:first-child{
                            text-align:right;
                            &:after{
                                content:"";
                                position: absolute;
                                width:2px;
                                height:20px;
                                background:#999;
                                right:-55px;
                                top:50%;
                                margin-top:-10px;
                            }
                        }
                        &.active{
                            color:$theme-color;
                        }
                    }
                }
                .bottom-tab-content{
                    .page{
                        text-align:right;
                        padding:30px;
                    }
                    .bottom-tab-tab{
                        &:after{
                            content:"";
                            display: block;
                            clear: both;
                        }
                        >div{
                            float: right;
                            margin:28px 30px 28px 0;
                            position: relative;
                            font-size:14px;
                            cursor: pointer;
                            color:#333;
                            span{
                                position: relative;
                                padding:0 15px;
                                // &:after{
                                //     content:"";
                                //     position: absolute;
                                //     width:1px;
                                //     height:14px;
                                //     background:#333;
                                //     right:0;
                                //     top:50%;
                                //     margin-top:-7px;
                                // }
                                // &:last-child:after{
                                //     width:0px;
                                // }
                                strong{
                                    color:#ff6600;
                                    font-weight:100;
                                }
                            }
                        }
                        .ivu-date-picker .ivu-select-dropdown{
                            span{
                                padding:0px;
                            }

                        }
                        >ul{
                            margin-left:10px;
                            float: left;
                            &:after{
                                content:"";
                                display: block;
                                clear: both;
                            }
                            li{
                                font-size:18px;
                                padding:26px 0;
                                margin-left:30px;
                                float: left;
                                cursor: pointer;
                                font-weight:700;
                                position: relative;
                                &.active{
                                    color: $theme-color;
                                    &:before{
                                        content:"";
                                        position: absolute;
                                        bottom:0;
                                        left:0;
                                        height:2px;
                                        width:100%;
                                        background:$theme-color;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .todayTotalTable .ivu-table td:nth-child(2){
        color:#495060;
    }
    .unlocking-record{
        .ivu-modal-content{
            border-radius:0;
        }
        .unlocking-record-content{
            h3{
                padding:30px;
                text-align:center;
                font-size:20px;
                color:#333;
                line-height:1;
                i{
                    float: right;
                    color:#666;
                    cursor: pointer;
                }
            }
            .ivu-table-wrapper{
                border:none;
            }
            .ivu-table{
                color:#666666;
                &:before,&:after{
                    width:0;
                    height:0;
                }
                td{
                    color:#333;
                }
            }
        }
        .ivu-modal-footer{
            display: none;
        }
    }
    .ivu-btn-primary{
        background:#00c1de;
        border-color:#00c1de;
        &:hover{
            background-color: #00c1de;
            border-color: #00c1de;
        }
    }
    .ivu-btn-text:hover{
        color:#00c1de;
    }
    .ivu-btn-ghost:hover{
        color:#00c1de;
        border-color: #00c1de;
    }
    .ivu-input:hover{
        border-color: #00c1de;
    }
    .ivu-select-dropdown{
        left:-110px;
    }
</style>


