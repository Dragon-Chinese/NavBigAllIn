<template>
    <div class="BHK2">
        <div class="modular">
            <h1>{{$t("message.BHKPage.BHKTab3.text.content1.a1")}}</h1>
            <p>{{$t("message.BHKPage.BHKTab3.text.content1.a2")}}</p>
            <div>
                <div>
                    <i></i>
                    <h3>{{$t("message.BHKPage.BHKTab3.text.content2.b1")}}</h3>
                    <p>{{$t("message.BHKPage.BHKTab3.text.content2.b2")}}</p>
                </div>
                <div>
                    <i></i>
                    <h3>{{$t("message.BHKPage.BHKTab3.text.content3.c1")}}</h3>
                    <p>{{$t("message.BHKPage.BHKTab3.text.content3.c2")}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .modular{
        text-align: center;
        padding: 80px 0;
        h1{
            font-size: 24px;
            margin-bottom:18px;
            color: #333;
        }
        p{
           line-height: 1;
           margin: 10px 0;
           font-size: 16px;
        }
        &>div{
            display: flex;
            max-width: 900px;
            margin: 60px auto 0;
            &>div{
                flex: 1;
                &:nth-child(1){
                    i{
                        background-image: url("../../assets/images/BHk3-1.png");
                    }
                    &:hover i{
                        background-image: url("../../assets/images/BHk3-11.png");
                    }
                }
                &:nth-child(2){
                    i{
                        background-image: url("../../assets/images/BHk3-2.png");
                    }
                    &:hover i{
                        background-image: url("../../assets/images/BHk3-21.png");
                    }
                }
                i{
                    width: 57px;
                    height: 63px;
                    display: block;
                    background-position: center;
                    background-size: 100%;
                    background-repeat: no-repeat;
                    margin: 0 auto;
                }
                h3{
                    font-size: 16px;
                    margin: 30px 0 12px;
                    line-height: 1;
                }
                p{
                    font-size: 14px;
                    line-height: 24px;
                    color: #666;
                    max-width: 290px;
                    margin: 0 auto;
                }
            }
        }
    }
</style>
