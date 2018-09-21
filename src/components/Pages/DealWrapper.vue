<template>
    <div class="deal-wrapper">
        <router-link to="/">{{$t("message.Pages.DealWrapper.title.a1")}} {{dealList.dealNum}} {{$t("message.Pages.DealWrapper.title.a2")}}</router-link>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                dealList:{
                    totalNum:"",
                    dealNum:""
                },
                timer:""
            }
        },
        created () {
            let _that=this;
            this.timer=setInterval(function () { 
                _that.getData();
            },4000)
        },
        destroyed() {
            clearInterval(this.timer)
        },
        methods:{
            getData(){
                let _that=this;
                this.$axios.get('/public/user/getTradeCount') //交易人数
                    .then(function (response) {
                        let data = response.data;
                        _that.dealList.totalNum=data.data;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.$axios.get('/public/stock/getTodayVolume') //交易总额
                    .then(function (response) {
                        let data = response.data;
                        _that.dealList.dealNum=data.data.USD;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/sass/setting";
    .deal-wrapper{
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        min-width: 1000px;
        background: $theme-color url("../../assets/images/dealBg.png") no-repeat 100% center;
        background-size: 100%;
        font-size: 24px;
        a{
            color: #fff;
        }
    }
</style>

