<template>
    <div class="data-main">
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList"
                     :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text">
                            <div>
                                <h1>{{numFormat(bannerData)}}</h1>
                                <span v-t="item.text[showId]"></span>
                                <p v-t="item.contentText[showId]"></p>
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
            <div class="explain">
                <h3 class="title">{{$t("message.Pages.DataDetails.title")}}</h3>
                <p v-html="explainList[showId].explainText"></p>
            </div>
        </div>
        <div class="dataTable">
            <h2>
                <e v-t="explainList[showId].tableTitle"></e>
                <span><DatePicker type="date" v-if="isShowDate" :editable="false"
                                  :placeholder="$t('message.Pages.DataDetails.date')" :value="selectData"
                                  @on-change="dateChange" style="width: 150px"></DatePicker></span></h2>
            <Table :loading="loading" stripe :columns="dataColumns0" :data="dataCont0" v-if="showId==0"></Table>
            <Table :loading="loading" stripe :columns="dataColumns1" :data="dataCont1" v-else-if="showId==1"></Table>
            <Table :loading="loading" stripe :columns="dataColumns2" :data="dataCont2" v-else-if="showId==2"></Table>
            <Table :loading="loading" stripe :columns="dataColumns3" :data="dataCont3"
                   v-else-if="showId==3 || showId==4"></Table>
            <Table :loading="loading" stripe :columns="dataColumns4" :data="dataCont4" v-else-if="showId==5"></Table>
        </div>
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from '../Common/Head';
    import HelpEntry from '../Common/HelpEntry';
    import Footer from '../Common/Footer';
    import banner0 from "../../assets/images/datadetails-banner.png";

    export default {
        data() {
            return {
                isBanner: 0,
                isCurrency: 0,
                bannerList: [
                    {
                        text: ["message.Pages.DataDetails.bannerList.a", "message.Pages.DataDetails.bannerList.b", "message.Pages.DataDetails.bannerList.c", "message.Pages.DataDetails.bannerList.d", "message.Pages.DataDetails.bannerList.e", ""],
                        contentText: ["message.Pages.DataDetails.bannerList.contentText"],
                        img: banner0
                    },
                ],
                bannerData: '',
                explainList: [
                    {
                        tableTitle: "message.Pages.DataDetails.explainList.a.tableTitle",
                        explainText: this.$t("message.Pages.DataDetails.explainList.a.explainText"),
                    },
                    {
                        tableTitle: "message.Pages.DataDetails.explainList.b.tableTitle",
                        explainText: this.$t("message.Pages.DataDetails.explainList.b.explainText"),

                    },
                    {
                        tableTitle: "message.Pages.DataDetails.explainList.c.tableTitle",
                        explainText: this.$t("message.Pages.DataDetails.explainList.c.explainText")
                    },
                    {
                        tableTitle: "message.Pages.DataDetails.explainList.d.tableTitle",
                        explainText: this.$t("message.Pages.DataDetails.explainList.d.explainText"),

                    },
                    {
                        tableTitle: "message.Pages.DataDetails.explainList.e.tableTitle",
                        explainText: this.$t("message.Pages.DataDetails.explainList.e.explainText")
                    },
                    {
                        tableTitle: "message.Pages.DataDetails.explainList.f.tableTitle",
                        explainText: this.$t("message.Pages.DataDetails.explainList.f.explainText"),
                        explainTextCont: []
                    }
                ],
                showId: '',
                dataColumns0: [
                    {
                        title: 'message.Pages.DataDetails.dataColumns0.title1',
                        width: 350,
                        key: 'date',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns0.title1");
                            return h('span', {}, title);
                        }
                    },
                    {
                        title: 'message.Pages.DataDetails.dataColumns0.title2',
                        key: 'miningNum',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns0.title2");
                            return h('span', {}, title);
                        }
                    },
                    {
                        title: 'message.Pages.DataDetails.dataColumns0.title3',
                        key: 'miningFeeReturn',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns0.title3");
                            return h('span', {}, title);
                        }
                    },
                ],
                dataCont0: [],
                dataColumns1: [
                    {
                        title: 'message.Pages.DataDetails.dataColumns1.title1',
                        key: 'date',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns1.title1");
                            return h('span', {}, title);
                        }
                    },
                    {
                        title: 'message.Pages.DataDetails.dataColumns1.title2',
                        key: 'totalIssueNum',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns1.title2");
                            return h('span', {}, title);
                        }
                    },
                ],
                dataCont1: [],
                dataColumns2: [
                    {
                        title: 'message.Pages.DataDetails.dataColumns2.title1',
                        key: 'date',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns2.title1");
                            return h('span', {}, title);
                        }
                    },
                    {
                        title: 'message.Pages.DataDetails.dataColumns2.title2',
                        key: 'totalIssueNum',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns2.title2");
                            return h('span', {}, title);
                        }
                    },
                ],
                dataCont2: [],
                dataColumns3: [
                    {
                        title: 'message.Pages.DataDetails.dataColumns3.title1',
                        key: 'date',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns3.title1");
                            return h('span', {}, title);
                        }
                    },
                    {
                        title: 'message.Pages.DataDetails.dataColumns3.title2',
                        key: 'description',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns3.title2");
                            return h('span', {}, title);
                        }
                    },
                    {
                        title: 'message.Pages.DataDetails.dataColumns3.title3',
                        key: 'totalNum',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns3.title3");
                            return h('span', {}, title);
                        }
                    },
                ],
                dataCont3: [],
                dataColumns4: [
                    {
                        title: 'message.Pages.DataDetails.dataColumns4.title1',
                        key: 'name',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns4.title1");
                            return h('span', {}, title);
                        }
                    },
                    {
                        title: 'message.Pages.DataDetails.dataColumns4.title2' + ' (BHK)',
                        key: 'dailyLimit',
                        renderHeader: (h, params) => {
                            const title = this.$t("message.Pages.DataDetails.dataColumns4.title2") + ' (BHK)';
                            return h('span', {}, title);
                        }
                    },
                    // {
                    //     title: '分红数量',
                    //     key: 'totalNum',
                    // },
                ],
                dataCont4: [],
                selectData: "",
                isShowDate: true,
                loading: false
            }
        },
        created() {
            let yesterday = new Date();
            this.showId = this.$route.params.id;
            if (this.showId == 3) {
                yesterday.setDate(yesterday.getDate());
            } else {
                yesterday.setDate(yesterday.getDate() - 1);
            }
            this.selectData = yesterday.format("yyyy-MM-dd")
            this.getBoxContainerData();
            this.dateChange(this.selectData);
            if (this.showId == 5) {
                this.isShowDate = false;
                this.getMiningLimit();
            };
        },
        mounted() {
            this.resizeBanner();
            window.onresize = () => {
                return (() => {
                    this.resizeBanner();
                })()
            };
            if (this.showId == 1) {
                document.title = this.$t("message.Pages.DataDetails.metaTitle1");
            } else if (this.showId == 2) {
                document.title = this.$t("message.Pages.DataDetails.metaTitle2");
            } else if (this.showId == 3) {
                document.title = this.$t("message.Pages.DataDetails.metaTitle3");
            } else if (this.showId == 4) {
                document.title = this.$t("message.Pages.DataDetails.metaTitle4");
            } else if (this.showId == 5) {
                document.title = this.$t("message.Pages.DataDetails.metaTitle5");
            }else{
                document.title = this.$t("message.Pages.DataDetails.bannerList.a");
            }
            this.explainList=[
                {
                    tableTitle:"message.Pages.DataDetails.explainList.a.tableTitle",
                    explainText:this.$t("message.Pages.DataDetails.explainList.a.explainText"),
                },
                {
                    tableTitle:"message.Pages.DataDetails.explainList.b.tableTitle",
                    explainText:this.$t("message.Pages.DataDetails.explainList.b.explainText"),

                },
                {
                    tableTitle:"message.Pages.DataDetails.explainList.c.tableTitle",
                    explainText:this.$t("message.Pages.DataDetails.explainList.c.explainText")
                },
                {
                    tableTitle:"message.Pages.DataDetails.explainList.d.tableTitle",
                    explainText:this.$t("message.Pages.DataDetails.explainList.d.explainText"),

                },
                {
                    tableTitle:"message.Pages.DataDetails.explainList.e.tableTitle",
                    explainText:this.$t("message.Pages.DataDetails.explainList.e.explainText")
                },
                {
                    tableTitle:"message.Pages.DataDetails.explainList.f.tableTitle",
                    explainText:this.$t("message.Pages.DataDetails.explainList.f.explainText"),
                    explainTextCont:[

                    ]
                }
            ];
        },
        methods: {
            getBoxContainerData() { //获取数据
                let _that = this;
                this.$axios.get('/public/stock/getCurrentRebate')
                    .then(function (response) {
                        let data = response.data;
                        if (_that.$route.params.id == 0) {
                            _that.bannerData = data.data.yesterDayTotalTTFReal;
                        } else if (_that.$route.params.id == 1) {
                            _that.bannerData = data.data.grandTotalTTFReal;
                        } else if (_that.$route.params.id == 2) {
                            _that.bannerData = data.data.marketTotalTTFReal;
                        } else if (_that.$route.params.id == 3) {
                            _that.bannerData = data.data.todayTotalBTCReal;
                        } else if (_that.$route.params.id == 4) {
                            _that.bannerData = data.data.unAllocatedBTC;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            dateChange(date) {
                if (this.showId == 3 || this.showId == 4) {
                    this.getDailyRebate(date)
                } else {
                    this.getTableRecord(date)
                }
            },
            getTableRecord(yesterday) {
                let _that = this;
                _that.dataCont0 = [], _that.dataCont1 = [], _that.dataCont2 = [];
                _that.loading = true;
                this.$axios.get('/public/stock/getDailyRelease', {
                    date: yesterday
                })
                    .then(function (response) {
                        _that.loading = false;
                        let data = response.data;
                        if (data.result == 'success') {
                            if (data.data.length > 0) {
                                _that.dataCont0.push({
                                    date: data.data[0].dt,
                                    miningNum: data.data[0].miningNum
                                })
                                _that.dataCont1.push({
                                    date: data.data[0].dt,
                                    totalIssueNum: data.data[0].totalIssueNum
                                })
                                _that.dataCont2.push({
                                    date: data.data[0].dt,
                                    totalIssueNum: data.data[0].totalIssueNum
                                })
                            }

                        } else {
                            alert($t('message.Pages.DataDetails.returndata'))
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getDailyRebate(yesterday) {
                let _that = this;
                _that.dataCont3 = [];
                _that.loading = true;
                this.$axios.get('/public/stock/getDailyRebate', {
                    date: yesterday
                })
                    .then(function (response) {
                        _that.loading = false;
                        let data = response.data;
                        if (data.result == 'success') {
                            if (data.data.length > 0) {
                                data.data.forEach((item, index) => {
                                    _that.dataCont3.push({
                                        date: item.dt,
                                        description: item.description,
                                        totalNum: item.totalNum
                                    })
                                });
                            }
                        } else {
                            alert($t('message.Pages.DataDetails.returndata'))
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getMiningLimit() {
                let _that = this;
                _that.dataCont4 = [];
                _that.loading = true;
                this.$axios.get('/member/position/getMiningLimit')
                    .then(function (response) {
                        _that.loading = false;
                        let data = response.data;
                        if (data.result == 'success') {
                            if (data.data.length > 0) {
                                data.data.forEach((item, index) => {
                                    _that.dataCont4.push({
                                        name: item.name,
                                        dailyLimit: item.dailyLimit
                                    })
                                });
                            }
                        } else {
                            alert($t('message.Pages.DataDetails.dataFalse'))
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
        components: {
            Head,
            HelpEntry,
            Footer,
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/sass/setting";

    $Assetbanner-height: 590px;
    .banner-container {
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
                                color: #FF6600;
                                margin-bottom: 20px;
                                font-size: 40px;
                                line-height: 1;
                                padding-left: 40px;
                            }
                            span {
                                color: #D2D6D9;
                                padding-left: 40px;
                            }
                            p {
                                color: #D2D6D9;
                                padding-left: 40px;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .data-main {
        background: #272C2F;
    }

    .explain {
        background: #fff;
        width: 1200px;
        padding: 30px;
        margin: 0 auto 0;
        position: absolute;
        bottom: 0;
        z-index: 100;
        left: 50%;
        margin-left: -600px;
        .title {
            color: #333;
            font-size: 18px;
            line-height: 1;
        }
        p {
            margin-top: 20px;
            font-size: 14px;
            line-height: 24px;
            span {
                display: inline-block;
                margin-top: 10px;
            }
            strong {
                display: block;
                text-align: center;
                margin-top: 15px;
            }
        }
    }

    .dataTable {
        background: #fff;
        border: 1px solid #E7E7E8;
        > h2 {
            height: 70px;
            padding: 25px 40px;
            font-weight: 700;
            font-size: 18px;
            line-height: 1;
            color: #3A3A40;
            > span {
                font-size: 14px;
                float: right;
            }
        }
        table {
            td, th {
                text-align: center;
            }
        }
        max-width: 1200px;
        margin: 20px auto 40px;
    }

    .ivu-table td {
        &:nth-child(2) {
            color: #00C1DE;
        }
    }
</style>

