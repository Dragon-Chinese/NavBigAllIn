<template>
    <div class="putforward-record-table">
        <ul>
            <li v-for="(item,index) in tableStatusList" :class="{active:isTabActive==index}" @click="isTabActive=index,tableStatusTab(index)" :key="index"><span v-t="item"></span></li>
        </ul>
        <table>
            <thead>
                <th v-for="(item,index) in putForwardColumns" :key="index" v-t="item">
                    <!-- {{item}} -->
                </th>
            </thead>
            <tbody  v-if="putForwardList.length>0">
                    <tr v-for="(item,index) in putForwardList" :key="index">
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
                           <Button type="info" @click="locationHref(item.toEwalletAddress)">{{$t("message.AssetManPage.PutForward.bodytitle")}}</Button>
                       </td>
                    </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="6" v-t="tableTip">
                       <!--  {{tableTip}} -->
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <div class="page">
            <Page :current="currentPage" :total="totalPage" show-total @on-change="changePage"></Page>
        </div> -->
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isTabActive:0,
                tableStatusList:["message.AssetManPage.PutForward.tablestatus.a1","message.AssetManPage.PutForward.tablestatus.a2","message.AssetManPage.PutForward.tablestatus.a3","message.AssetManPage.PutForward.tablestatus.a4"],
                putForwardColumns: ["message.AssetManPage.PutForward.putForwardColumns.b1","message.AssetManPage.PutForward.putForwardColumns.b2","message.AssetManPage.PutForward.putForwardColumns.b3","message.AssetManPage.PutForward.putForwardColumns.b4","message.AssetManPage.PutForward.putForwardColumns.b5","message.AssetManPage.PutForward.putForwardColumns.b6"],
                putForwardList:[],
                currentPage:1,
                totalPage:0,
                accountInfo:[],
                tableTip:"message.AssetManPage.PutForward.tableTip"
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
                if(this.tableStatusList[index]=="message.AssetManPage.PutForward.tablestatus.a2"){
                    flow="0";
                }else if(this.tableStatusList[index]=="message.AssetManPage.PutForward.tablestatus.a3"){
                    flow="1";
                }else if(this.tableStatusList[index]=="message.AssetManPage.PutForward.tablestatus.a4"){
                    flow="2";
                }
                _that.putForwardList=[];
                _that.tableTip = _that.$t("message.AssetManPage.PutForward.tablestatus.b1");
                _that.accountInfo.forEach((item,index) => {
                    _that.$axios.get('/mobile/currency/withdraws/find',{code:item.code,page:_that.currentPage,limit:50,type:0,flow:flow})
                        .then(function (response) {
                            if(response.data.result="success"){
                                if(response.data.data.length>0 && response.data.data!=""){
                                    if(response.data.data[0].flow==1){
                                        response.data.data[0].flow = _that.$t("message.AssetManPage.PutForward.tablestatus.a3")
                                    }else if(response.data.data[0].flow==2){
                                        response.data.data[0].flow = _that.$t("message.AssetManPage.PutForward.tablestatus.a4")
                                    }else if(response.data.data[0].flow==0){
                                        response.data.data[0].flow = _that.$t("message.AssetManPage.PutForward.tablestatus.a2")
                                    }
                                    response.data.data[0].codename=item.name;
                                    _that.putForwardList.push(response.data.data[0]) 
                                }else{
                                    _that.tableTip = _that.$t("message.AssetManPage.PutForward.tablestatus.b2")
                                }
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            _that.tableTip = _that.$t("message.AssetManPage.PutForward.tablestatus.b3");
                        });
                });
            },
            locationHref(href){
                if(href==null){
                    this.$Message.error({
                        top: 300,
                        duration: 3,
                        content:this.$t("message.AssetManPage.PutForward.tablestatus.b4"),
                    });
                }else{
                    window.open(href)
                }
            },
            changePage(index){
                this.currentPage=index;
            },
        }
    }
</script>
<style lang="scss" scoped>
@import "../../assets/sass/setting";
   .putforward-record-table{
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
        .page{
            text-align: right;
            margin-top: 20px;
        }
    }
</style>

