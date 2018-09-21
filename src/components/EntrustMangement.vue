<template>
    <div class="AssetManagement">
        <Head></Head>
        <div class="banner-container">
            <div class="index-top-banner">
                <div class="banner-slider" v-for="(item,index) in bannerList" :class="{'animating-enter-down':isBanner==index,'center':isBanner==index}" :key="index">
                    <div class="row">
                        <div class="layer banner-text" style="top:220px">
                            <h1 v-t="item.title"></h1>
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
                <li v-for="(item,index) in assetTabsList" :key="index" :class="{active:isAcitve==index}" @click="isAcitve=index,toggleTabsFn(index)" v-t="item.title">
                    <!-- {{item.title}} -->
                </li>
            </ul>
        </div>

        <div class="entrust-table">
            <div class="select-current">
                <Select v-model="selectDefault"  @on-change="changeSelect" :placeholder="selectPlaceholder">
                    <Option v-for="item in selectList" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
                <Icon type="ios-arrow-forward"></Icon>
                <Select v-model="selectChildDefault" :disabled="disabled" @on-change="changeSelectChild" :placeholder="selectChildPlaceholder">
                    <Option v-for="item in selectChildList" :value="item.code" :key="item.id">{{item.name}}</Option>
                </Select>
            </div>
            <table>
                <thead v-if="isAcitve==0">
                    <th v-for="(item,index) in currentEntrustColumns" :key="index" v-t="item">
                       <!--  {{item}} -->
                    </th>
                </thead>
                <thead v-else-if="isAcitve==1">
                    <th v-for="(item,index) in historicalEntrustColumns" :key="index" v-t="item">
                        <!-- {{item}} -->
                    </th>
                </thead>
                <thead v-else-if="isAcitve==2">
                    <th v-for="(item,index) in transactionColumns" :key="index" v-t="item">
                        <!-- {{item}} -->
                    </th>
                </thead>
                <tbody v-if="isAcitve==0 && currentEntrustList.length>0"  class="currentBody">
                        <tr v-for="(item,index) in currentEntrustList" :key="index">
                            <td>
                                    {{item.createTimeString}}
                            </td>
                            <td>
                                {{item.entrustMethod}}
                            </td>
                            <td v-t="item.tradeMark">
                                    <!-- {{item.tradeMark}} -->
                            </td>
                            <td>
                                    {{item.entrustPrice}}11
                            </td>
                            <td>
                                    {{item.entrustNumber}}
                            </td>
                            <td>
                                    {{item.leftNumber}}
                            </td>
                            <td>
                                <Button type="info" @click="revoke(item.txNo,index)">{{$t("message.EntrustMangement.main.a1")}}</Button>
                            </td>
                        </tr>
                </tbody>
                <tbody v-else-if="isAcitve==0">
                    <tr>
                        <td colspan="7">
                            {{tableTip}}
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="isAcitve==1 && historicalEntrustList.length>0"  class="historicaBody">
                        <tr v-for="(item,index) in historicalEntrustList" :key="index">
                            <td>
                                    {{item.createTimeString}}
                            </td>
                            <td>
                                <span v-t="item.entrustMethod"></span>
                            </td>
                            <td v-t="item.tradeMark">
                                    <!-- {{item.tradeMark}} -->
                            </td>
                            <td>
                                    {{item.averagePrice}}
                            </td>
                            <td>
                                    {{item.entrustNumber}}
                            </td>
                            <td>
                                    {{doIt(item.leftNumber)}}
                            </td>
                            <td>
                                    {{item.tradeStatus}}
                            </td>
                        </tr>
                </tbody>
                <tbody v-else-if="isAcitve==1">
                    <tr>
                        <td colspan="7">
                           {{tableTip}}
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="isAcitve==2 && transactionList.length>0"  class="transactionBody">
                        <tr v-for="(item,index) in transactionList" :key="index">
                            <td>
                                    {{item.createTimeString}}
                            </td>
                            <td>
                                    {{$t("message.EntrustMangement.main.a2")}}
                            </td>
                             <td v-t="item.tradeMark">
                                    <!-- {{item.tradeMark}} -->
                            </td>
                            <td>
                                    {{item.price}}
                            </td>
                            <td>
                                    {{item.volume}}
                            </td>
                            <td>
                                    {{item.poundage}}
                            </td>
                        </tr>
                </tbody>
                <tbody v-else-if="isAcitve==2">
                    <tr>
                        <td colspan="6">
                            {{tableTip}}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="page">
                <span @click="prevPage">{{$t("message.EntrustMangement.main.prevPage")}}</span><span @click="nextPage">{{$t("message.EntrustMangement.main.nextPage")}}</span>
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
    import EntrustBanner from "../assets/images/EntrustBanner.png";
    
    export default {
        data () {
            return {   
                isBanner:0,
                bannerList:[
                    {
                        title:"message.EntrustMangement.banner",
                        text:"",
                        link:"",
                        img:EntrustBanner
                    },
                ],
                isAcitve:0,
                assetTabsList:[
                    {
                        title:"message.EntrustMangement.assetTabsList.a",
                    },
                    {
                        title:"message.EntrustMangement.assetTabsList.b",
                    },
                    {
                        title:"message.EntrustMangement.assetTabsList.c",
                    },
                ],
                currentEntrustColumns: ["message.EntrustMangement.Columns.c1","message.EntrustMangement.Columns.c2","message.EntrustMangement.Columns.c3","message.EntrustMangement.Columns.c4","message.EntrustMangement.Columns.c5","message.EntrustMangement.Columns.c6","message.EntrustMangement.Columns.c7"],
                historicalEntrustColumns: ["message.EntrustMangement.Columns.c1","message.EntrustMangement.Columns.c2","message.EntrustMangement.Columns.c3","message.EntrustMangement.Columns.c4","message.EntrustMangement.Columns.c5","message.EntrustMangement.Columns.c6","message.EntrustMangement.Columns.c8"],
                transactionColumns: ["message.EntrustMangement.Columns.c1","message.EntrustMangement.Columns.c2","message.EntrustMangement.Columns.c3","message.EntrustMangement.Columns.c4","message.EntrustMangement.Columns.c5","message.EntrustMangement.Columns.c9"],
                currentEntrustList:[],
                historicalEntrustList:[],
                transactionList:[],
                selectList: [],
                disabled:true,
                selectChildList:[],
                selectDefault:"",
                selectChildDefault:"",
                tableTip:this.$t("message.EntrustMangement.tabletip.tip1"),
                code:"",
                selectChildPlaceholder:this.$t("message.EntrustMangement.select.se1"),
                selectPlaceholder:this.$t("message.EntrustMangement.select.se1"),
                pageData:0,
                isHasData:1,
                requestState:true
            }
        },
        mounted () {
            let seotitle = this.$t('message.topbarMenu.entrustManage');
            document.title = seotitle;
            this.resizeBanner();
            window.onresize = () => {
                return (() => {
                    this.resizeBanner();
                })()
            }; 
            this.selectPlaceholder="loading...";
            this.getData();
        },
        methods:{
            toggleTabsFn(index) {
                this.pageData=0;
                this.isHasData=1;
                if(this.selectChildDefault!=''){
                    this.changeSelectChild(this.code,this.name)
                }
            },
            prevPage(){
                if(this.requestState){
                    this.isHasData=1;
                    if(this.isAcitve==0 || this.isAcitve==1){
                        this.pageData-=20;
                    }else{
                        this.pageData-=100;
                    }
                    if(this.pageData<0){
                        this.pageData=0;
                        this.$Message.warning({
                            top: 300,
                            duration: 2,
                            content:this.$t("message.EntrustMangement.content.a.a1"),
                        });
                        return false;
                    }
                    this.requestState=false;
                    this.changeSelectChild(this.code)
                }
                
            },
            nextPage(){
                if(this.requestState){
                    if(this.isHasData==1){
                        if(this.isAcitve==0 || this.isAcitve==1){
                            this.pageData+=20;
                        }else{
                            this.pageData+=100;
                        }
                        this.requestState=false;
                        this.changeSelectChild(this.code)
                    }else{
                        this.$Message.warning({
                            top: 300,
                            duration: 2,
                            content:this.$t("message.EntrustMangement.content.a.a2"),
                        });
                    }
                }
                
            },
            getData(){ //初始化默认
                let _that=this;
                new Promise(function(resolve,reject){
                    _that.getSelfSelection(resolve);
                }).then(function (resolve,reject) {  
                    _that.getSectorTitleData();
                    return resolve;
                }).then(function (resolve,reject) {
                    _that.changeSelect(4);
                })
            },
            getSelfSelection(resolve){ //获取message.EntrustMangement.content.b
                let _that=this;
                _that.$axios.get('/public/stock/sector/find',{type:2})
                    .then(function (response) {
                        _that.selectPlaceholder=_that.$t("message.EntrustMangement.select.se1");
                        let data = response.data;
                        let selfSelectionObj={
                                id:data[0].id,
                                name:_that.$t("message.EntrustMangement.content.b")
                            }
                        _that.selectList.unshift(selfSelectionObj)
                        return resolve();
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
                        for (let value of data) { 
                            if(_that.getStringLetter(value.name)){
                                _that.selectList.push({
                                    id:value.id,
                                    name:_that.getStringLetter(value.name)
                                })
                            }
                        };
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getStringLetter(text){
               return text.replace(/[^a-z]+/ig, "");
            },
            changeSelect(value){
                let _that=this;
                _that.selectChildPlaceholder="loading...";
                _that.tableTip=_that.$t("message.EntrustMangement.tabletip.tip1");
                _that.selectChildDefault="";
                _that.selectChildList=[];
                _that.$axios.get('/public/stock/findBySector',{sectorId:value})
                    .then(function (response) {
                        _that.selectChildPlaceholder=_that.$t("message.EntrustMangement.select.se1");
                        let data = response.data;
                        _that.selectChildList=data;
                        _that.disabled=false;
                        _that.selectDefault=value;
                        _that.changeSelectChild(data[0].code)
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                        _that.selectChildPlaceholder="message.EntrustMangement.select.se2"
                    });
            },
            changeSelectChild(code){
                if(code=='' || code == undefined){
                    return false;
                }
                let _that=this;
                _that.code=code;
                _that.selectChildDefault=code;
                _that.currentEntrustList=[];
                _that.historicalEntrustList=[];
                _that.transactionList=[];
                _that.tableTip= _that.$t("message.EntrustMangement.tabletip.tip2") + '...';
                if(_that.isAcitve==0){
                    _that.$axios.get('/mobile/currency/trade/findEntrust',{
                        code:code,
                        start:_that.pageData,
                        })
                        .then(function (response) {
                            _that.requestState=true;
                            if (response.data.result =="success") {
                                if(response.data.data.length>0){
                                    response.data.data.forEach((item,index) => {
                                        if(item.entrustMethod==1){
                                        item.entrustMethod="APP"
                                        }else{
                                            item.entrustMethod = _that.$t("message.EntrustMangement.content.c.c1")
                                        }
                                        if(item.tradeMark==1){
                                            item.tradeMark=_that.$t("message.EntrustMangement.content.c.c2")
                                        }else{
                                            item.tradeMark=_that.$t("message.EntrustMangement.content.c.c3")
                                        }
                                    _that.currentEntrustList.unshift(item);
                                    });
                                    if(response.data.data.length<20){
                                        _that.isHasData=0;
                                    }
                                }else{
                                    if(_that.pageData==0){
                                        _that.tableTip=_that.$t("message.EntrustMangement.tabletip.tip1");
                                    }else{
                                        _that.isHasData=0;
                                    }
                                }
                            }
                        })
                        .catch(function (error) {
                            _that.tableTip="message.EntrustMangement.select.se2";
                            console.log(error);
                        });
                }else if(_that.isAcitve==1){
                    _that.$axios.get('/mobile/currency/trade/findHistoryEntrust',{
                            code:code,
                            start:_that.pageData,
                        })
                        .then(function (response) {
                            _that.requestState=true;
                            if (response.data.result =="success") {
                                if(response.data.data.length>0){
                                        response.data.data.forEach((item,index) => {
                                        if(item.entrustMethod==1){
                                            item.entrustMethod="APP"
                                        }else{
                                            item.entrustMethod=_that.$t("message.EntrustMangement.content.c.c1")
                                        }
                                        if(item.tradeMark==1){
                                            item.tradeMark=_that.$t("message.EntrustMangement.content.c.c2")
                                        }else{
                                            item.tradeMark=_that.$t("message.EntrustMangement.content.c.c3")
                                        }
                                        switch(item.tradeStatus)
                                        {
                                        case 0:
                                        item.tradeStatus=_that.$t("message.EntrustMangement.content.c.tradeStatus1")
                                        break;
                                        case 1:
                                        item.tradeStatus=_that.$t("message.EntrustMangement.content.c.tradeStatus2")
                                        break;
                                        case 2:
                                        item.tradeStatus=_that.$t("message.EntrustMangement.content.c.tradeStatus3")
                                        break;
                                        case 3:
                                        item.tradeStatus=_that.$t("message.EntrustMangement.content.c.tradeStatus4")
                                        break;
                                        case 4:
                                        item.tradeStatus=_that.$t("message.EntrustMangement.content.c.tradeStatus5")
                                        break;
                                        case 5:
                                        item.tradeStatus=_that.$t("message.EntrustMangement.content.c.tradeStatus6")
                                        break;
                                        }
                                        _that.historicalEntrustList.unshift(item);
                                    });
                                    if(response.data.data.length<20){
                                        _that.isHasData=0;
                                    }
                                }else{
                                    if(_that.pageData==0){
                                        _that.tableTip=_that.$t("message.EntrustMangement.tabletip.tip1");
                                    }else{
                                        _that.isHasData=0;
                                    }
                                }
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            _that.tableTip=_that.$t("message.EntrustMangement.select.se2");
                        });
                }else if(this.isAcitve==2){
                    _that.$axios.get('/mobile/currency/trade/findTrade',{
                        code:code,
                        start:_that.pageData,
                     })
                    .then(function (response) {
                        _that.requestState=true;
                        if (response.data.result =="success") {
                            if(response.data.data.length>0){
                                // _that.totalPage=response.data.data.length;
                                 response.data.data.forEach((item,index) => {
                                    if(item.tradeMark==1){
                                       item.tradeMark=_that.$t("message.EntrustMangement.content.c.c2")
                                    }else{
                                        item.tradeMark=_that.$t("message.EntrustMangement.content.c.c3")
                                    }
                                   _that.transactionList.unshift(item);
                                });
                                if(response.data.data.length<100){
                                    _that.isHasData=0;
                                }
                            }else{
                                if(_that.pageData==0){
                                    _that.tableTip=_that.$t("message.EntrustMangement.tabletip.tip1");
                                }else{
                                    _that.isHasData=0;
                                }
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        _that.tableTip=_that.$t("message.EntrustMangement.select.se2");
                    });
                }
                
            },
            revoke(txNo,index){
                let _that=this;
                _that.$axios.get('/currency/trade/cancel',{txNo:txNo})
                    .then(function (response) {
                        let data = response.data;
                        if(data.result=="success"){
                            _that.currentEntrustList.splice(index,1);
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
<style lang="scss" >
@import "../assets/sass/setting";
   .entrust-table{
        text-align: center;
        position: relative;
        min-width: 1000px;
        max-width: 1200px;
        margin:40px auto 30px;
        .select-current{
            text-align: left;
            margin-bottom: 20px;
            &>.ivu-icon{
                margin: 0 15px;
                font-size: 20px;
                vertical-align: middle;
            }
            .ivu-select{
                width: 150px;
               .ivu-select-selection{
                   border-radius:0;
                    &:focus {
                        border-color:$theme-color;
                        outline: 0;
                        box-shadow: none;
                    }
                }
                .ivu-select-item-selected.ivu-select-item-focus{
                    background: $theme-color;
                }
                .ivu-select-selection-focused, .ivu-select-selection:hover{
                    border-color:$theme-color;
                }
            }
        }
        table{
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #D1D8D9;
            th,td{
                height: 70px;
                border-bottom: 1px solid #E7E7E8;
                font-size: 14px;
                color: #999999;
                font-weight: 500;
                text-align: center;
            }
            tr:nth-child(odd){
               background: #f5f5f6;
            }
            .currentBody td{
                border: none;
                height: 68px;
                font-size: 14px;
                color: #333;
                &:first-child{
                    width: 260px;
                }
                &:nth-child(2){
                    width: 120px;
                }
                &:nth-child(3){
                    color:$theme-color;
                    width: 150px;
                }
                &:last-child{
                    .ivu-btn-info{
                        width: 70px;
                        border: 1px solid #ccc;
                        border-radius: 0;
                        padding: 4px 12px;
                        margin: 0 8px;
                        color: #333;
                        background: transparent;
                        outline: none;
                        &:focus{
                            box-shadow: none;
                        }
                    }
                    img{
                        vertical-align: middle;
                        margin-right: 10px;
                        margin-top: -2px;
                    }
                }
            }
            .historicaBody td{
                border: none;
                height: 68px;
                font-size: 14px;
                color: #333;
                width: 14%;
                &:nth-child(3){
                    color:$theme-color;
                    width: 10%
                }
                &:last-child{
                    .ivu-btn-info{
                        width: 70px;
                        border: 1px solid #ccc;
                        border-radius: 0;
                        padding: 4px 12px;
                        margin: 0 8px;
                        color: #333;
                        background: transparent;
                        outline: none;
                        &:focus{
                            box-shadow: none;
                        }
                    }
                }
            }
            .transactionBody td{
                border: none;
                height: 68px;
                font-size: 14px;
                color: #333;
                width: 16%;
                &:nth-child(3){
                    color:$theme-color;
                    width: 12%;
                }
                &:last-child{
                    img{
                        vertical-align: middle;
                        margin-right: 10px;
                        margin-top: -2px;
                    }
                }
            }

        }
    }
    .page{
        text-align:right;
        margin-top:20px;
        span{
            display: inline-block;
            vertical-align: middle;
            min-width: 40px;
            height: 32px;
            padding:0 15px;
            line-height: 30px;
            margin-right: 4px;
            text-align: center;
            list-style: none;
            background-color: #fff;
            user-select: none;
            cursor: pointer;
            font-family: Arial;
            border: 1px solid #dddee1;
            border-radius: 4px;
            transition: border .2s ease-in-out,color .2s ease-in-out;
        }
    }
</style>

