<template>
    <div class="BHK1">
        <div class="modular">
            <h1>{{$t("message.BHKPage.BHKTab1.modular.a1")}}</h1>
            <p>{{$t("message.BHKPage.BHKTab1.modular.a2")}}</p>
            <p>{{$t("message.BHKPage.BHKTab1.modular.a3")}}</p>
            <img src="../../assets/images/BHK1-1.png" alt="">
        </div>
        <div class="modular">
            <h1>{{$t("message.BHKPage.BHKTab1.background.b1")}}</h1>
            <p>{{$t("message.BHKPage.BHKTab1.background.b2")}}</p>
            <p>{{$t("message.BHKPage.BHKTab1.background.b3")}}</p>
            <img src="../../assets/images/BHK1-2.png" alt="">
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .modular{
        text-align: center;
        padding: 80px 0;
        &:last-child{
             background: #F8F8F8;
             padding: 80px 0 40px;
        }
        h1{
            font-size: 24px;
            margin-bottom:18px;
            color: #333;
        }
        p{
           line-height: 1;
           color: #333;
           margin: 10px 0;
           font-size: 16px;
        }
        img{
            margin-top: 70px;
            vertical-align: middle;
        }
    }
</style>
