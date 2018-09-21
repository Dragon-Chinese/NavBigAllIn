<template>
    <div class="rights-record-table">
        <div class="select-current" v-show="showRebate">
            <Select v-model="selectDefault"  @on-change="changeSelect" :placeholder="selectPlaceholder">
                <Option v-for="item in selectList" :value="item.code" :key="item.code">{{item.name}}</Option>
            </Select>
        </div>
        <ul>
            <li v-for="(item,index) in tableStatusList" :class="{active:isTabActive==index}" @click="isTabActive=index,tableStatusTab(index)" :key="index"><span v-t="item"></span></li>
        </ul>
        <table>
            <thead>
                <th v-for="item in rechargeRecordColumns" v-t="item">
                    <!-- {{item}} -->
                </th>
            </thead>
            <tbody v-if="rechargeRecordList.length>0">
                    <tr v-for="(item,index) in rechargeRecordList">
                       <td>
                            {{item.dt}}
                       </td>
                       <td>
                            {{item.name}}
                       </td>
                       <td>
                           {{item.num}}
                       </td>
                        <td>
                            {{item.rebateNum}}
                        </td>
                       <td v-if="item.flow" v-t="item.flow">
                           <!--  {{item.flow}} -->
                       </td>
                       <td v-t="item.source">
                            <!-- {{item.source}} -->
                       </td>
                    </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td :colspan="rechargeRecordColumns.length" v-t="tableTip">
                      <!--  {{tableTip}} -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isTabActive:0,
                tableStatusList:["message.AssetManPage.RightsInterestsRecord.tablestatus.a1","message.AssetManPage.RightsInterestsRecord.tablestatus.a2","message.AssetManPage.RightsInterestsRecord.tablestatus.a3"],
                rechargeRecordColumns:[],
                rechargeRecordList:[],
                tableTip:this.$t("message.AssetManPage.RightsInterestsRecord.tabletip"),
                selectList: [{
                    name:this.$t("message.AssetManPage.RightsInterestsRecord.selectList.name"),
                    code:"all"
                }],
                selectDefault:"all",
                selectPlaceholder:this.$t("message.AssetManPage.RightsInterestsRecord.selectPlaceholder"),
                showRebate:true,
            }
        },
        created() {
            this.selectPlaceholder="loading...";
            this.getAllData();
        },
        methods:{
            getAllData(){
                let _that=this;
                _that.$axios.get('/member/position/findAll')
                    .then(function (response) {
                        _that.selectPlaceholder= _that.$t("message.AssetManPage.RightsInterestsRecord.selectPlaceholder");
                        if (response.status == 200) {
                            if(response.data.length>0){
                                response.data.forEach((item,index) => {
                                    _that.selectList.push({
                                        name:item.name,
                                        code:item.code
                                    });
                                });
                               _that.tableStatusTab(0)
                               
                            }else{
                                _that.tableTip=_that.$t("message.AssetManPage.RightsInterestsRecord.tabletip");
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        _that.tableTip="message.AssetManPage.RightsInterestsRecord.tabletip1";
                    });
            },
            getRebateOrder(code){
                let _that=this;
                _that.$axios.post("/member/position/getRebateOrder",{code:code})
                .then(function (response) {
                    if(response.data.result=="success"){
                        if(response.data.data.length>0){
                            response.data.data.forEach((value,index) => {
                                if(value.flow==1){
                                    value.flow=_that.$t("message.AssetManPage.RightsInterestsRecord.rebateOrder.b1")
                                }else{
                                    value.flow=_that.$t("message.AssetManPage.RightsInterestsRecord.rebateOrder.b2")
                                }
                                value.num=_that.scientificToNumber(value.num)
                                value.source=_that.$t("message.AssetManPage.RightsInterestsRecord.rebateOrder.b3");
                                _that.rechargeRecordList.push(value) 
                            });
                        }else{
                            _that.tableTip=_that.$t("message.AssetManPage.RightsInterestsRecord.tabletip")
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    _that.tableTip=_that.$t("message.AssetManPage.RightsInterestsRecord.tabletip1");
                });
            },
            getReturnBoundageRefereeOrder(){
                let _that=this;
                _that.$axios.post("/member/position/getReturnBoundageRefereeOrder",{code:""})
                    .then(function (response) {
                        if(response.data.result=="success"){
                            if(response.data.data.length>0){
                                response.data.data.forEach((value,index) => {
                                    value.name="BHK";
                                    value.num=_that.scientificToNumber(value.num);
                                    if(value.level==1){
                                        value.source = _that.$t("message.AssetManPage.RightsInterestsRecord.reward.c1")
                                    }else{
                                        value.source = _that.$t("message.AssetManPage.RightsInterestsRecord.reward.c2")
                                    }
                                    _that.rechargeRecordList.push(value) 
                                });
                            }else{
                                _that.tableTip = _that.$t("message.AssetManPage.RightsInterestsRecord.tabletip")
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        _that.tableTip = _that.$t("message.AssetManPage.RightsInterestsRecord.tabletip1");
                    });
            },
            getReturnBoundageOrder(){
                let _that=this;
                _that.$axios.post("/member/position/getReturnBoundageOrder",{code:""})
                .then(function (response) {
                    if(response.data.result=="success"){
                        if(response.data.data.length>0){
                            response.data.data.forEach((value,index) => {
                                if(value.flow==1){
                                    value.flow = _that.$t("message.AssetManPage.RightsInterestsRecord.boundageOrder.d1")
                                }else{
                                    value.flow = _that.$t("message.AssetManPage.RightsInterestsRecord.boundageOrder.d2")
                                }
                                value.num=_that.scientificToNumber(value.num)
                                value.source=value.name + _that.$t("message.AssetManPage.RightsInterestsRecord.boundageOrder.d3")
                                _that.rechargeRecordList.push(value) 
                            });
                        }else{
                            _that.tableTip=_that.$t("message.AssetManPage.RightsInterestsRecord.tabletip");
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    _that.tableTip = _that.$t("message.AssetManPage.RightsInterestsRecord.tabletip1");
                });
            },
            changeSelect(code){
                if(code=='all'){
                    code=''
                }
                this.rechargeRecordList=[];
                this.getRebateOrder(code);
            },
            tableStatusTab(index){
                let _that=this;
                _that.tableTip = _that.$t("message.AssetManPage.RightsInterestsRecord.tabletab.tab1");
                _that.rechargeRecordList=[];
                if(index==0){  //分红
                    _that.selectDefault="all"
                    _that.showRebate=true;
                    _that.rechargeRecordColumns=["message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e1","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e2","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e3","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e4","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e5"];
                    _that.getRebateOrder("");
                }else if(index==2){  //推荐
                    _that.showRebate=false;
                    _that.rechargeRecordColumns=["message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e1","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e2","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e3","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e5"];
                    _that.getReturnBoundageRefereeOrder();
                   
                }else if(index==1){ //挖矿
                    _that.showRebate=false;
                    _that.rechargeRecordColumns=["message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e1","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e2","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e3","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e3_1","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e4","message.AssetManPage.RightsInterestsRecord.tabletab.rechargeRecord.e5"];
                    _that.getReturnBoundageOrder();
                }
            },
        }
    }
</script>
<style lang="scss">
@import "../../assets/sass/setting";
    .rights-record-table{
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
        &> ul{
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
            td{
                border: none;
                height: 68px;
                font-size: 14px;
                color: #333;
                &:first-child{
                    width: 340px;
                }
                &:last-child{
                    width: 220px;
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
        }
    }
</style>

