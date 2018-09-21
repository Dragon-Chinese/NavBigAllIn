<template>
    <div class="recharge-record-table">
        <ul>
            <li v-for="(item,index) in tableStatusList" :class="{active:isTabActive==index}" @click="isTabActive=index,tableStatusTab(index)" :key="index"><span v-t="item"></span></li>
        </ul>
        <table>
            <thead>
                <th v-for="(item,index) in rechargeRecordColumns" :key="index" v-t="item">
                    <!-- {{item}} -->
                </th>
            </thead>
            <tbody  v-if="rechargeRecordList.length>0">
                    <tr v-for="(item,index) in rechargeRecordList" :key="index">
                        <td>
                            {{item.createTimeString}}
                       </td>
                       <td>
                           {{item.codename}}
                       </td>
                       <td>
                            {{item.amount}}
                       </td>
                       <td>
                           {{item.confirmTimes}}/{{item.confirmTimeThreshold}}
                       </td>
                       <td v-t="item.flow">
                            <!-- {{item.flow}} -->
                       </td>
                       <td>
                           <Button type="info" @click="locationHref(item.url)">{{$t("message.AssetManPage.RechargeRecord.bodytitle")}}</Button>
                       </td>
                    </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="6">
                        {{tableTip}}
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
                tableStatusList:["message.AssetManPage.RechargeRecord.tablestatus.a1","message.AssetManPage.RechargeRecord.tablestatus.a2","message.AssetManPage.RechargeRecord.tablestatus.a3","message.AssetManPage.RechargeRecord.tablestatus.a4"],
                rechargeRecordColumns: ["message.AssetManPage.RechargeRecord.rechargeRecordColumns.b1","message.AssetManPage.RechargeRecord.rechargeRecordColumns.b2","message.AssetManPage.RechargeRecord.rechargeRecordColumns.b3","message.AssetManPage.RechargeRecord.rechargeRecordColumns.b4","message.AssetManPage.RechargeRecord.rechargeRecordColumns.b5","message.AssetManPage.RechargeRecord.rechargeRecordColumns.b6"],
                rechargeRecordList:[],
                tabType:true,
                accountInfo:[],
                tableTip:this.$t("message.AssetManPage.RechargeRecord.tableTip"),
            }
        },
        created () {
            let _that=this;
            _that.$axios.get('/mobile/member/getAccount')
                .then(function (response) {
                    if(response.data.length>0){
                        _that.accountInfo=response.data;
                        _that.tableStatusTab(0);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods:{
            tableStatusTab(index){
                let _that=this,flow='';
                if(this.tableStatusList[index]=="message.AssetManPage.RechargeRecord.tablestatus.a2"){
                    flow="0";
                }else if(this.tableStatusList[index]=="message.AssetManPage.RechargeRecord.tablestatus.a3"){
                    flow="1";
                }else if(this.tableStatusList[index]=="message.AssetManPage.RechargeRecord.tablestatus.a4"){
                    flow="2";
                }
                _that.rechargeRecordList=[];
                if(_that.tabType){
                    _that.tabType=false;
                    _that.tableTip= _that.$t("message.AssetManPage.RechargeRecord.tablestatus.b1") + "...";
                    _that.accountInfo.forEach((item,index) => {
                        _that.$axios.get('/mobile/currency/deposits/find',{code:item.code,type:0,flow:flow})
                            .then(function (response) {
                                _that.tabType=true;
                                if(response.data.result="success"){
                                    if(response.data.data.length>0){
                                        response.data.data.forEach((value,index) => {
                                            if(value.flow==1){
                                                value.flow = _that.$t("message.AssetManPage.RechargeRecord.tablestatus.a3")
                                            }else if(value.flow==2){
                                                value.flow = _that.$t("message.AssetManPage.RechargeRecord.tablestatus.a4")
                                            }else if(item.flow==0){
                                                value.flow = _that.$t("message.AssetManPage.RechargeRecord.tablestatus.a2")
                                            }
                                            value.codename=item.name;
                                            _that.rechargeRecordList.push(value)
                                        });
                                    }else{
                                        _that.tableTip=_that.$t("message.AssetManPage.RechargeRecord.tablestatus.b2");
                                    }
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                                _that.tableTip= _that.tableTip=_that("message.AssetManPage.RechargeRecord.tablestatus.b3");
                            });
                    });
                }
            },
            locationHref(href){
                if(href==null){
                    this.$Message.error({
                        top: 300,
                        duration: 3,
                        content:this.$t("message.AssetManPage.RechargeRecord.tablestatus.b4"),
                    });
                }else{
                    window.open(href)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
@import "../../assets/sass/setting";
   .recharge-record-table{
        text-align: center;
        position: relative;
        min-width: 1000px;
        max-width: 1200px;
        margin:40px auto 30px;
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
                width:14%;
            }
            tr:nth-child(odd){
               background: #f5f5f6;
            }
            td{
                border: none;
                height: 68px;
                font-size: 14px;
                color: #333;
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
        }
    }
</style>

