<template>
    <div class="Authentication">
        <Head></Head>
        
        <div class="account-container">
            <div class="account-title-nav">
                <h3>{{$t("message.AuthenticationPage.C2.title")}}</h3>
                <ul>
                    <li>
                        <router-link to="/Account">{{$t("message.AuthenticationPage.C2.account")}}<Icon type="arrow-right-c"></Icon></router-link>
                    </li>
                </ul>
            </div>
            <div class="UUID">{{$t("message.AuthenticationPage.C2.uidtext")}}：{{uid}}</div>
            <div class="C2-box">
                 <Col class="spin-col" span="8" v-if="uploadLoading">
                    <Spin fix>
                        <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
                        <div>{{$t("message.AuthenticationPage.C2.load")}}</div>
                    </Spin>
                </Col>
                <div class="file-id">
                    <div v-for="(item,index) in filelist" :key="index">
                        <img :src="item.img" alt="">
                        <Upload action="/api/member/identification/uploadImage" :data="item.data" :ref="item.ref"  :show-upload-list="false" :before-upload="beforeUpload" :on-progress="uploadProgress" :on-success="uploadSuccess" :on-error="uploadError"  accept="image/*">
                            <span><Icon type="plus-round"></Icon></span>
                        </Upload>
                        <p v-t="item.text"></p>
                    </div>
                </div>
                <ul>
                    <li>
                        {{$t("message.AuthenticationPage.C2.uploadexplain.explain1")}}
                    </li>
                    <li>
                        {{$t("message.AuthenticationPage.C2.uploadexplain.explain2")}}
                    </li>
                    <li>
                        {{$t("message.AuthenticationPage.C2.uploadexplain.explain3")}}
                    </li>
                    <li>
                        {{$t("message.AuthenticationPage.C2.uploadexplain.explain4")}}
                    </li>
                </ul>
                <button @click="submission">{{$t("message.AuthenticationPage.C2.submitapply")}}</button>
            </div>
        </div>

        <Popup :alert="alertContent" v-show="popupShow"  @hidepopup="popupShowFn"></Popup>
        <Footer></Footer>
        <HelpEntry></HelpEntry>
    </div>
</template>
<script>
    import Head from "../Common/Head/";
    import Popup from "../Common/Popup";
    import Footer from "../Common/Footer";
    import HelpEntry from "../Common/HelpEntry";
    import faceimg from "../../assets/images/IDface.png";
    import backimg from "../../assets/images/IDback.png";
    import personimg from "../../assets/images/IDperson.png";
    export default {
        data(){
            return{
                filelist:[
                    {
                        img:faceimg,
                        data:{
                            type:1
                        },
                        ref:"upload0",
                        text:"message.AuthenticationPage.C2.filelist.text1"
                    },
                    {
                        img:backimg,
                        data:{
                            type:2
                        },
                        ref:"upload1",
                        text:"message.AuthenticationPage.C2.filelist.text2"
                    },
                    {
                        img:personimg,
                        data:{
                            type:3
                        },
                        ref:"upload2",
                        text:"message.AuthenticationPage.C2.filelist.text3"
                    }
                ],
                uploadLoading:false,
                uploadList:[],
                popupShow:false,
                alertContent:{
                    title:"message.AuthenticationPage.C2.alertContent.title",
                    text:"message.AuthenticationPage.C2.alertContent.text",
                },
                uid:this.$store.state.userInfo.uuid,
            }
        },
        mounted () {
        },
        methods:{
            submission(){
                if(this.uploadList.length==0){
                    this.$Message.error({
                        top: 300,
                        duration: 3,
                        content:this.$t("message.AuthenticationPage.C2.content.cont1"),
                    });
                    return false;
                }
                this.uploadList.forEach((item,index) => {
                    if(item==""){
                        this.$Message.error({
                            top: 300,
                            duration: 3,
                            content:this.$t("message.AuthenticationPage.C2.content.cont2")+_that.filelist[index].text,
                        });
                        return false;
                    }
                });
                let _that = this;
                _that.$axios.post('/mobile/member/identification/submitApply',{
                    idCardImageId:JSON.parse(_that.uploadList[0].response.retJson).info.md5,
                    idCardOppositeImageId:JSON.parse(_that.uploadList[1].response.retJson).info.md5,
                    handIdCardImageId:JSON.parse(_that.uploadList[2].response.retJson).info.md5,
                    imageServerId:_that.uploadList[0].response.imageServerId,
                    })
                    .then(function (response) {
                        let data = response.data;
                        if(data.result=='success'){
                            _that.popupShow= !_that.popupShow;
                        }else if(data.code=='100001'){
                            location.href="/Login";
                        }else if(data.error=="1301"){
                            _that.$Message.error({
                                top: 300,
                                duration: 3,
                                content:_that.$t("message.AuthenticationPage.C2.content.cont3"),
                            });
                        }
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            popupShowFn(){
                this.popupShow= false;
                this.$router.push({ path: '/Account'})
                
            },
            uploadProgress(event, file, fileList){ //文件上传时的钩子
                this.uploadLoading = true;
            },
            uploadSuccess(response, file, fileList){ //文件上传成功的钩子
                this.uploadLoading = false;
                if(JSON.parse(response.retJson).ret == false){
                    this.$Message.error(this.$t("message.AuthenticationPage.C2.content.cont5"));
                    return;
                }
                this.$Message.success({
                    top: 300,
                    duration: 3,
                    content:this.$t("message.AuthenticationPage.C2.content.cont4"),
                });
                this.uploadList[0]=this.$refs.upload0[0].fileList.slice(-1)[0] || "";
                this.uploadList[1]=this.$refs.upload1[0].fileList.slice(-1)[0] || "";
                this.uploadList[2]=this.$refs.upload2[0].fileList.slice(-1)[0] || "";
                if(this.uploadList[0]!=""){
                    this.filelist[0].img=this.uploadList[0].response.imageUrl+'/'+JSON.parse(this.uploadList[0].response.retJson).info.md5
                }
                if(this.uploadList[1]!=""){
                    this.filelist[1].img=this.uploadList[1].response.imageUrl+'/'+JSON.parse(this.uploadList[1].response.retJson).info.md5
                }
                if(this.uploadList[2]!=""){
                    this.filelist[2].img=this.uploadList[2].response.imageUrl+'/'+JSON.parse(this.uploadList[2].response.retJson).info.md5
                }
            },
            uploadError(error, file, fileList){ //文件上传失败的钩子
                this.$Message.error({
                    top: 300,
                    duration: 3,
                    content:this.$t("message.AuthenticationPage.C2.content.cont5"),
                });
            },
        },
        components: {
            Head,
            Popup,
            Footer,
            HelpEntry,
        },
    }
</script>
<style lang="scss" scoped>
@import "../../assets/sass/setting";
    .Authentication{
        background: #f5f5f6;
        .account-container{
            margin: 120px auto 0;
            max-width:1200px;
             .account-title-nav{
                padding-top: 10px;
                color: #333;
                border-bottom: 1px solid #ddd;
                &:after{
                    content:"";
                    display: block;
                    clear: both;
                }
                h3{
                    float: left;
                    padding: 20px;
                    font-size: 16px;
                }
                ul{
                    float: right;
                    li{
                        float: left;
                        font-size: 16px;
                        cursor: pointer;
                        a{
                            padding: 23px 20px; 
                            display: inline-block;
                            line-height: 1;
                            color: $theme-color;
                        }
                        i{
                            margin-left: 10px;
                            font-size: 18px;
                            vertical-align: text-bottom;
                        }
                        &.active{
                            color: $theme-color;
                            a{
                                color: $theme-color;
                                border-bottom: 2px solid $theme-color;
                            }
                        }
                    }
                }
            }
            .UUID{
                background: #FFF;
                margin:10px 0px;
                line-height: 40px;
                font-size:16px;
                text-indent:20px;
            }
            .C2-box{
                background: #fff;
                margin-bottom: 30px;
                border: 1px solid #E7E7E8;
                min-height: 680px;
                position: relative;
                .spin-col{
                    position: absolute;
                    top: 30px;
                    width: 100%;
                    text-align: center;
                    .spin-icon-load{
                        animation: ani-demo-spin 1s linear infinite;
                    }
                }
                    .spin-icon-load{
                    animation: ani-demo-spin 1s linear infinite;
                }
                @keyframes ani-demo-spin {
                    from { transform: rotate(0deg);}
                    50%  { transform: rotate(180deg);}
                    to   { transform: rotate(360deg);}
                }
                .file-id{
                    margin-top: 100px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &>div{
                        width: 290px;
                        border: 1px dashed #ddd;
                        position: relative;
                        margin-left: 16px;
                        img{
                            width: 230px;
                            height: 140px;
                            margin-top: 40px;
                            margin-left: 30px;
                        }
                        span{
                            position: absolute;
                            left: 50%;
                            top: 74px;
                            margin-left: -35px;
                            width: 70px;
                            height:70px;
                            text-align: center;
                            line-height: 70px;
                            color: $theme-color;
                            background: #fff;
                            border-radius: 50%;
                            font-size: 24px;
                            cursor: pointer;
                            i{
                                margin-top: 3px;
                                margin-left: 2px;
                            }
                        }
                        p{
                            margin: 20px 0;
                            line-height: 1;
                            font-size: 16px;
                            color: #333;
                            text-align: center;
                        }
                    }
                }
                ul{
                    margin-top: 40px;
                    margin-left: 160px;
                    li{
                        font-size: 14px;
                        color: #666;
                        line-height: 1;
                        margin-bottom: 10px;
                        &:first-child{
                            margin-bottom: 20px;
                            font-size: 20px;
                            color: #333;
                        }
                    }
                }
                button{
                    width:400px;
                    height:40px;
                    line-height: 40px;
                    color: #fff;
                    text-align: center;
                    font-size: 14px;
                    background: $theme-color;
                    cursor: pointer;
                    display: block;
                    margin: 50px auto;
                }
            }
        }
    }
</style>

