<template>
    <div>
        <Head></Head>
        <div class="banner">
            <div>
                <h1>{{$t("message.Building.title")}}...</h1>
                <p>{{$t("message.Building.text")}}</p>
            </div>
            <img src="../assets/images/building.png" alt="">
        </div>
        
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from "./Common/Head";
    
    import Footer from "./Common/Footer";
    import HelpEntry from "./Common/HelpEntry";
    export default {
        components: {
            Head,
            
            Footer,
            HelpEntry
        }
    }
</script>
<style lang="scss" scoped>
    .banner{
        position: relative;
        div{
            position: absolute;
            top: 180px;
            width: 100%;
            text-align: center;
            h1{
                font-size: 40px;
                line-height: 1;
                color: #fff;
            }
            p{
                font-size: 20px;
                margin-top: 20px;
                line-height: 1;
                color: #fff;
            }
        }
        img{
            width: 100%;
            vertical-align: middle;
        }
    }
</style>

