<template>
    <div class="popup-box">
        <div class="popup-content">
            <h3 class="popup-title" v-t="alert.title">{{alert.title}}<Icon type="close-round" @click="hide"></Icon></h3>
            <div class="popup-text" v-t="alert.text">
                <!-- {{alert.text}} -->
            </div>
            <div class="popup-btn">
                <span @click="hide">{{$t("message.topbarMenu.confirm")}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["alert"],
        methods:{
            hide(){
                this.$emit("hidepopup",true)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .popup-box{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 999;
        .popup-content{
            position: fixed;
            top: 30%;
            left: 50%;
            margin-left: -270px;
            background: #fff;
            width: 540px;
            padding: 20px 30px;
            .popup-title{
                font-size: 18px;
                line-height: 1;
                color: #333;
                font-weight: 400;
                i{
                    float: right;
                    cursor: pointer;
                    color: #999;
                }
            }
            .popup-text{
                padding: 50px 0;
                font-size: 16px;
                color: #666;
                line-height: 24px;
                min-height: 100px;
                text-align: center;
            }
            .popup-btn{
                text-align: center;
                span{
                    display: inline-block;
                    color: #fff;
                    width: 190px;
                    height: 40px;
                    line-height: 40px;
                    background: #01B0CA;
                    cursor: pointer;
                }
            }
        }
    }
</style>

