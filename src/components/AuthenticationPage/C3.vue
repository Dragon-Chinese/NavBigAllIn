<template>
    <div class="video-authentication" @click="hide($event)">
        <div class="video-authentication-content">
            <h3>{{$t("message.AuthenticationPage.C3.title")}}<Icon type="close-round" @click="hide($event)"></Icon></h3>
            <div class="wechatQr-img">
                <img src="../../assets/images/wechatQr.png" alt="">
            </div>
            <!-- <div class="top">
                <img src="../../assets/images/wechatImg.png" alt=""><span>{{$t("message.AuthenticationPage.C3.view")}}</span><Icon type="person"></Icon>
            </div>
            <div class="mid">
                <img src="../../assets/images/qr.png" alt="">
                <p>{{$t("message.AuthenticationPage.C3.wechatimg")}}</p>
            </div> -->
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            hide(event){
                const target=event.target.getAttribute("class");
                if(target=="video-authentication" || target=="ivu-icon ivu-icon-close-round"){
                     this.$emit("hidepopup",false)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .video-authentication{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 999;
        .video-authentication-content{
            position: fixed;
            top: 10%;
            left: 50%;
            margin-left: -200px;
            background: #fff;
            width: 400px;
            h3{
                font-size: 14px;
                height: 42px;
                padding: 13px 15px 13px 20px;
                line-height: 16px;
                color: #06B24A;
                font-weight: 500;
                border-bottom: 1px solid #ddd;
                i{
                    float: right;
                    cursor: pointer;
                    color: #999;
                }
            }
            .wechatQr-img{
                width: 400px;
                img{
                    height: 100%;
                    width: 100%;
                }
            }
            // .top{
            //     margin-left: 46px;
            //     margin-top: 25px;
            //     img{
            //         width: 100px;height: 100px;
            //     }
            //     span{
            //         display: inline-block;
            //         margin-top: 15px;
            //         margin-left: 20px;
            //         font-size: 24px;
            //         color: #333;
            //         vertical-align: top;
            //         line-height: 1;
            //     }
            //     i{
            //         margin-left: 25px;
            //         margin-top: 15px;
            //         font-size: 26px;
            //         color: #01B0CA;
            //         vertical-align: top;
            //     }
            // }
            // .mid{
            //     text-align: center;
            //     margin-top: 30px;
            //     img{
            //         width: 320px;
            //         height: 320px;
            //         vertical-align: middle;
            //     }
            //     p{
            //         margin: 25px 0;
            //         font-size: 24px;
            //         text-align: center;
            //         color: #999;
            //     }
            // }
        }
    }
</style>


