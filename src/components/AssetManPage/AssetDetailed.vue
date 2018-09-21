<template>
    <div class="asset-detailed-table">
        <table>
            <thead>
                <th v-for="(item,index) in assetDetailedColumns" :key="index" v-t="item">
                    <!-- {{item}} -->
                </th>
            </thead>
            <tbody v-if="assetDetailedList.length>0">
                <template v-for="(item,index) in assetDetailedList" >
                    <tr>
                       <td>
                           {{item.name}}
                       </td>
                       <td>
                            {{item.totalNum}}
                       </td>
                       <td>
                            {{toDecimal(item.blockedNum,4)}}
                       </td>
                       <td>
                            {{item.holdingAmount}}
                       </td>
                       <td>
                            {{toDecimal((item.holdingAmount*item.price),4)}}
                       </td>
                       <td v-if="item.name=='ETH' || item.name=='BTC' || item.name=='USDT' || item.name=='LTC' || item.name=='BCH' || item.name=='ETC'">
                           <Button type="info" :class="{'cur':currentAcion=='recharge' && index == currentActive}" @click="trBox(index,'recharge')">{{$t("message.AssetManPage.AssetDetailed.recharge")}}</Button>
                           <Button type="info" :class="{'cur':currentAcion=='putForward' && index == currentActive}" @click="trBox(index,'putForward')">{{$t("message.AssetManPage.AssetDetailed.withdrawal")}}</Button>
                       </td>
                        <td v-else>

                        </td>
                    </tr>
                    <tr v-show="index == currentActive">
                        <td colspan="6">
                            <div class="recharge-box" v-if="currentAcion=='recharge'">
                                <p>{{$t("message.AssetManPage.AssetDetailed.recharge1.title.a")}}{{item.name}}{{$t("message.AssetManPage.AssetDetailed.recharge1.title.b")}}</p>
                                <div class="recharge-address">
                                    <input type="text" v-model="chargeAddress" readonly ><span @click="copy" class="copyBtn" :data-clipboard-text="chargeAddress">{{$t("message.AssetManPage.AssetDetailed.recharge1.copyadd")}}</span>
                                </div>
                                <div class="recharge-explain">
                                    <img :src="rechargeQRCode" alt="" class="qr-code">
                                    <ul>
                                        <li>
                                            {{$t("message.AssetManPage.AssetDetailed.recharge1.content.a1")}}
                                        </li>
                                        <li>
                                            {{$t("message.AssetManPage.AssetDetailed.recharge1.content.b1")}} {{item.name}} {{$t("message.AssetManPage.AssetDetailed.recharge1.content.b2")}} {{item.name}} {{$t("message.AssetManPage.AssetDetailed.recharge1.content.b3")}} {{item.name}} {{$t("message.AssetManPage.AssetDetailed.recharge1.content.b4")}}
                                        </li>
                                        <li>
                                            {{$t("message.AssetManPage.AssetDetailed.recharge1.content.c1")}}
                                        </li>
                                        <li>
                                            {{$t("message.AssetManPage.AssetDetailed.recharge1.content.d1")}} {{item.name}} {{$t("message.AssetManPage.AssetDetailed.recharge1.content.d2")}} {{item.name}} {{$t("message.AssetManPage.AssetDetailed.recharge1.content.d3")}} {{item.name}} {{$t("message.AssetManPage.AssetDetailed.recharge1.content.d4")}} {{item.name}} {{$t("message.AssetManPage.AssetDetailed.recharge1.content.d5")}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="putForward-box" v-else>
                                <div class="withdraw-money">
                                    <p>{{$t("message.AssetManPage.AssetDetailed.putForward.withdraw")}}</p>
                                    <input type="text" :placeholder="$t('message.AssetManPage.AssetDetailed.putForward.text')" disabled v-model="showAddress" ><span @click.stop="showWithdraw=!showWithdraw" class="addWithdraw"><Icon type="android-add"></Icon></span>
                                    <div class="withdraw-address-list" v-show="showWithdraw">
                                        <ul v-if="withdrawAddressList.length>0">
                                            <li v-for="(item,index) in withdrawAddressList" @click="showSelectAddress(index)" :key="index"><Icon type="android-add-circle"></Icon>{{item}}<span @click.stop="removeWithdrawAddress(index)">{{$t("message.AssetManPage.AssetDetailed.putForward.remove")}}</span></li>
                                        </ul>
                                        <ul v-else>
                                            <li>{{$t("message.AssetManPage.AssetDetailed.putForward.add")}}</li>
                                        </ul>
                                        <a @click="handleRender(index)">{{$t("message.AssetManPage.AssetDetailed.putForward.moneyadd")}}</a>
                                    </div>
                                </div>
                                <div class="withdraw-num">
                                    <p>{{$t("message.AssetManPage.AssetDetailed.putForward.num.title")}}</p>
                                    <input v-model="extractNum" :placeholder="$t('message.AssetManPage.AssetDetailed.putForward.num.text')" type="text" @keyup="checkNum">
                                </div>
                                <div class="service-charge">
                                    <p>{{$t("message.AssetManPage.AssetDetailed.putForward.charge")}}</p>
                                    <input type="text" disabled v-model="quota.currencyPoundage" autocomplete="off" autocorrect>
                                </div>
                                <div class="capital-cipher">
                                    <p>{{$t("message.AssetManPage.AssetDetailed.putForward.cipher.title")}}</p>
                                    <input type="password" :placeholder="$t('message.AssetManPage.AssetDetailed.putForward.cipher.text')" v-model="capitalPwd">
                                </div>
                                <div class="yzm-code">
                                    <p>{{$t("message.AssetManPage.AssetDetailed.putForward.code.title")}}</p>
                                    <input type="text" :placeholder="$t('message.AssetManPage.AssetDetailed.putForward.code.text')" v-model="captchaCode"><span @click="sendCaptcha(index)" v-html="codeText"></span>
                                </div>
                                <span @click="submitPutForward(index)">{{$t("message.AssetManPage.AssetDetailed.putForward.submit")}}</span>
                                <ul>
                                    <li>
                                        {{$t("message.AssetManPage.AssetDetailed.putForward.turnout.a1")}}
                                    </li>
                                    <li v-if="quota.minTb==0">
                                        {{$t("message.AssetManPage.AssetDetailed.putForward.turnout.a2_1")}}
                                    </li>
                                    <li v-else>
                                        {{$t("message.AssetManPage.AssetDetailed.putForward.turnout.a2")}} {{quota.minTb}}{{item.name}}
                                    </li>
                                    <li v-if="quota.maximum==0">
                                        {{$t("message.AssetManPage.AssetDetailed.putForward.turnout.a3_1")}}
                                    </li>
                                    <li v-else>
                                        <template v-if="quota.maxTbDay==0">
                                            {{$t("message.AssetManPage.AssetDetailed.putForward.turnout.a3_2")}} {{quota.maximum}}{{item.name}}{{$t("message.AssetManPage.AssetDetailed.putForward.turnout.a4")}}
                                        </template>
                                        <template v-else>
                                            {{$t("message.AssetManPage.AssetDetailed.putForward.turnout.a3_2")}} {{quota.maximum}}{{item.name}}{{$t("message.AssetManPage.AssetDetailed.putForward.turnout.a4")}} {{quota.maxTbDay}}{{item.name}}
                                        </template>
                                    </li>
                                    <li>
                                        {{$t("message.AssetManPage.AssetDetailed.putForward.turnout.a5")}} {{quota.currencyPoundage}}{{item.name}}
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="6" v-t="tableTip">
                        <!-- {{tableTip}} -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import ClipboardJS from "clipboard";
    export default {
        data () {
            return {
                currentActive:-1,
                currentAcion:"",
                assetDetailedColumns: ["message.AssetManPage.AssetDetailed.columns.a1","message.AssetManPage.AssetDetailed.columns.a2","message.AssetManPage.AssetDetailed.columns.a3","message.AssetManPage.AssetDetailed.columns.a4","message.AssetManPage.AssetDetailed.columns.a5","message.AssetManPage.AssetDetailed.columns.a6"],
                assetDetailedList:[],
                chargeAddress:"",
                USDTData:[],
                sendPhoneStringtype:true,
                codeText:this.$t("message.AssetManPage.AssetDetailed.codetext"),
                extractNum:"",
                showAddress:"",
                rechargeQRCode:"",
                withdrawAddressList:[],
                withdrawAddressId:[],
                addInputAddress:"",
                showWithdraw:false,
                capitalPwd:"",
                quota:{
                    minTb:"",
                    maximum:"",
                    maxTbDay:"",
                    currencyPoundage:"",
                },
                accountBalance:0,
                captchaCode:"",
                isSubmitPutForward:true,
                tableTip:this.$t("message.AssetManPage.AssetDetailed.tabletip"),

            }
        },
        created() {
            let _that=this;
            _that.getAccountData();
            document.addEventListener('click',function(e){
                if(_that.showWithdraw){
                    if(e.target.className!='withdraw-address-list'){
                        _that.showWithdraw=false;
                    }
                }
                
            });
        },
        destroyed () {
           this.$Message.destroy()
        },
        methods:{
            checkNum(){
                this.extractNum=this.extractNum.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符   
                this.extractNum=this.extractNum.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的   
                this.extractNum=this.extractNum.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
                // this.extractNum=this.extractNum.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3$4$5');//只能输入两个小数   
                if(this.extractNum.indexOf(".")< 0 && this.extractNum !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
                    this.extractNum= parseFloat(this.extractNum);  
                }  
            },
            copy(){
                let _that=this;
                if(_that.chargeAddress!=''){
                    let clipboard = new ClipboardJS('.copyBtn');
                    clipboard.on('success', function(e) {
                        _that.$Message.success(_that.$t('message.AssetManPage.AssetDetailed.copysuccess'));
                        e.clearSelection();
                        clipboard.destroy();  
                    });

                    clipboard.on('error', function(e) {
                        _that.$Message.error(_that.$t('message.AssetManPage.AssetDetailed.copyerror'));
                        clipboard.destroy();  
                    });
                }
            },
            findPerson(index){ //查看个人持仓
                let _that=this;
                _that.$axios.get('/member/position/findOne',{code:_that.assetDetailedList[index].code})
                    .then(function (response) {
                        if(response.data.error=='0000'){
                            _that.$Message.error({
                                top: 300,
                                duration: 3,
                                content:_that.$t("message.AssetManPage.AssetDetailed.findp.content1") + _that.assetDetailedList[index].name + _that.$t("message.AssetManPage.AssetDetailed.findp.content2"),
                            });
                        }else{
                            _that.accountBalance=response.data.data.position.holdingAmount;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    }); 
            },
            getQuota(index){ //获取手续费和限额
                let _that=this;
                _that.$axios.get('/public/stock/get',{code:_that.assetDetailedList[index].code})
                .then(function (response) {
                    let data=response.data;
                    if (data.result == 'success') {
                        _that.quota={
                            minTb:data.data.minimum,
                            maximum:data.data.maximum,
                            maxTbDay:data.data.maximumDay,
                            currencyPoundage:data.data.currencyPoundage
                        }

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            trBox(index,action){
                let _that=this;
                //判断是否已经过C1认证
                if(_that.$store.state.userInfo.authenticationLevel == 0){
                    _that.$Message.error(_that.$t("message.AssetManPage.AssetDetailed.putforward.c6"));
                    return;
                }
                _that.currentActive=index;
                _that.currentAcion=action;
                _that.chargeAddress="loading...";
                if(action=='recharge'){//充值
                    _that.rechargeQRCode="";
                    _that.$axios.get('/mobile/ewallet/ewalletAddress/findCurrencyDepositAddress',{code:_that.assetDetailedList[index].code})
                    .then(function (response) {
                        let data=response.data;
                        if (data.result == 'success') {
                            if(data.data.length>0){
                                if(data.data[0]!=null){
                                    _that.chargeAddress=data.data[0].address;
                                    _that.$axios.getType('/public/member/getQRCode',{QRCodeString:data.data[0].address},"arraybuffer")
                                        .then(function (response) {
                                            _that.rechargeQRCode='data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                }else{
                                     _that.chargeAddress=_that.$t("message.AssetManPage.AssetDetailed.chargeaddress.ch1");
                                }
                            }else{
                                _that.chargeAddress=_that.$t("message.AssetManPage.AssetDetailed.chargeaddress.ch2");
                            }
                        }else if(data.error=="6002"){
                            _that.chargeAddress=_that.$t("message.AssetManPage.AssetDetailed.chargeaddress.ch3");
                        }else{
                            _that.chargeAddress=""
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                }else{

                    _that.extractNum="";
                    _that.capitalPwd="";
                    _that.captchaCode="";
                    
                    
                    _that.ewalletFind(index);
                    _that.findPerson(index);
                    _that.getQuota(index);
                   
                }
            },
            ewalletFind(index){ //查询钱包提币地址
                let _that=this;
                _that.withdrawAddressList=[];
                _that.withdrawAddressId=[];
                _that.showAddress='';
                _that.$axios.get('/ewallet/ewalletAddress/find',{code:_that.assetDetailedList[index].code})
                    .then(function (response) {
                        if (response.data.result == 'success') {
                            if(response.data.data.length>0){
                                response.data.data.forEach((item,index) => {
                                    _that.withdrawAddressList.push(item.address);
                                    _that.withdrawAddressId.push(item.id);
                                    _that.showAddress= _that.withdrawAddressList[0];
                                });
                            }else{
                                _that.withdrawAddressList=[];
                            }
                        }else{
                            _that.withdrawAddressList=[];
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            removeWithdrawAddress(index){ //删除提币地址
                let _that=this;
                _that.$axios.post('/ewallet/ewalletAddress/delete',{ids:_that.withdrawAddressId[index]}) 
                    .then(function (response) {
                        let data = response.data;
                        if(data.result=='success'){
                             if(_that.withdrawAddressList.includes(_that.showAddress)){
                                _that.showAddress='';
                            }
                            _that.withdrawAddressList.splice(index,1);
                            if(_that.withdrawAddressList.length<1){
                                _that.showAddress="";
                            
                            }else{
                                _that.showAddress=_that.withdrawAddressList[0];
                            }
                            _that.showWithdraw=false;
                            _that.$Message.success({
                                top: 300,
                                duration: 3,
                                content:_that.$t('message.AssetManPage.AssetDetailed.unbind'),
                            });
                        }else{
                            _that.$Message.error({
                                top: 300,
                                duration: 3,
                                content:_that.$t('message.AssetManPage.AssetDetailed.unbinderror'),
                            });
                        }
                       
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            showSelectAddress(index){
                this.showAddress=this.withdrawAddressList[index];
                this.showWithdraw=false;
            },
            handleRender (index) {
                this.showWithdraw=false;
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: this.$t('message.AssetManPage.AssetDetailed.confirm1')
                            },
                            on: {
                                input: (val) => {
                                    this.addInputAddress=val
                                }
                            }
                        })
                    },
                    onOk: () => {
                        let _that=this;
                         _that.$axios.get('/ewallet/ewalletAddress/save',{address:_that.addInputAddress,code:_that.assetDetailedList[index].code}) 
                            .then(function (response) {
                                let data = response.data;
                                if(data.result=="success"){
                                    // _that.withdrawAddressList.push(_that.addInputAddress);
                                    // if(_that.withdrawAddressList.length<2){
                                    //     _that.showAddress=_that.addInputAddress;
                                    // }
                                    _that.$Message.success({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t('message.AssetManPage.AssetDetailed.success'),
                                    });
                                    _that.ewalletFind(_that.currentActive)
                                }else if(data.error=="6004"){
                                    _that.$Message.error({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t('message.AssetManPage.AssetDetailed.bind'),
                                    });
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        
                    },
                })
            },
            getAccountData(){
                let _that=this;
                _that.tableTip=_that.$t("message.AssetManPage.AssetDetailed.accountdata.data1");
                _that.$axios.get('/member/position/findAll')
                    .then(function (response) {
                        if (response.status == 200) {
                            if(response.data.length>0){
                                response.data.forEach((item,index) => {
                                    item.holdingAmount = _that.toDecimal(item.holdingAmount,4);
                                    item.totalNum = _that.toDecimal(item.totalNum,4);
                                    _that.assetDetailedList.push(item);
                                });
                            }else{
                                _that.tableTip=_that.$t("message.AssetManPage.AssetDetailed.accountdata.data2");
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        _that.tableTip=_that.$t("message.AssetManPage.AssetDetailed.accountdata.data3");
                    });
            },
            thisVerifacation(index){
                let _that=this;
                if(_that.showAddress==""){
                    this.$Message.error({
                        top: 300,
                        duration: 3,
                        content:_that.$t("message.AssetManPage.AssetDetailed.verifacation.cont1"),
                    });
                    return false;
                }
                if(_that.extractNum===""){
                    this.$Message.error({
                        top: 300,
                        duration: 3,
                        content:_that.$t("message.AssetManPage.AssetDetailed.verifacation.cont2"),
                    });
                    return false;
                }
                if(this.quota.minTb>0){
                    if(_that.extractNum< this.quota.minTb){
                        this.$Message.error({
                            top: 300,
                            duration: 3,
                            content:_that.$t("message.AssetManPage.AssetDetailed.verifacation.cont3")+this.quota.minTb,
                        });
                        return false;
                    }
                }
                
                if(_that.extractNum>this.accountBalance){
                    this.$Message.error({
                        top: 300,
                        duration: 3,
                        content:_that.$t("message.AssetManPage.AssetDetailed.verifacation.cont4")+this.assetDetailedList[index].name+_that.$t("message.AssetManPage.AssetDetailed.verifacation.cont5"),
                    });
                    return false;
                }
                if(_that.extractNum>this.quota.maximum){
                    this.$Message.error({
                        top: 300,
                        duration: 3,
                        content:_that.$t("message.AssetManPage.AssetDetailed.verifacation.cont6")+this.quota.maximum,
                    });
                    return false;
                }
                
                if(_that.capitalPwd==""){
                    this.$Message.error({
                        top: 300,
                        duration: 3,
                        content:_that.$t("message.AssetManPage.AssetDetailed.verifacation.cont7"),
                    });
                    return false;
                }
                return true;
            },
            submitPutForward(index){
                let _that=this;
                if(!_that.thisVerifacation(index)){
                    return  false;
                }
                if(_that.captchaCode==""){
                    this.$Message.error({
                        top: 300,
                        duration: 3,
                        content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c0"),
                    });
                    return false;
                }
                if (_that.isSubmitPutForward) {
                    _that.isSubmitPutForward = false;
                     _that.$axios.post('/currency/withdraws/save',{
                            captcha:_that.captchaCode,
                            toEwalletAddress:_that.showAddress,
                            pwd:_that.capitalPwd,
                            amount:_that.extractNum,
                            code:_that.assetDetailedList[index].code
                        }).then(function (response) {
                            _that.isSubmitPutForward=true;
                            if(response.status==200){
                                if(response.data.result=="success"){
                                    _that.$Message.success({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c1"),
                                    });
                                    _that.trBox(_that.currentActive,"putForward")
                                }else if(response.data.error=="2610"){
                                    _that.$Message.error({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c2"),
                                    });
                                }else if(response.data.error=="2403"){
                                    _that.$Message.error({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c3"),
                                    });
                                }else if(response.data.error=="2613"){
                                    _that.$Message.error({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c4"),
                                    });
                                }else if(response.data.error=="2404" || response.data.error=="2612"){
                                    _that.$Message.error({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c5"),
                                    });
                                }else if(response.data.error=="1104"){
                                    _that.$Message.error({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c6"),
                                    });
                                }else if(response.data.error=="2609"){
                                    _that.$Message.error({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c7"),
                                    });
                                }else if(response.data.error=="2611"){
                                    _that.$Message.error({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c9"),
                                    });
                                }else if(response.data.error=="2608"){
                                    _that.$Message.error({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c10"),
                                    });
                                }else if(response.data.error=="2607"){
                                    _that.$Message.error({
                                        top: 300,
                                        duration: 3,
                                        content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c11"),
                                    });
                                }else{
                                    _that.$Message.error({
                                        top: 300,
                                        duration: 3,
                                        content:response.data.error,
                                    });
                                }
                            }
                        })
                        .catch(function (error) {
                            _that.$Message.error({
                                top: 300,
                                duration: 3,
                                content:_that.$t("message.AssetManPage.AssetDetailed.putforward.c8"),
                            });
                        });
                }
            },
            sendCaptcha(index){ //短信
                let _that=this;
                //判断是否已经过C1认证
                if(_that.$store.state.userInfo.authenticationLevel == 0){
                    _that.$Message.error(_that.$t("message.AssetManPage.AssetDetailed.putforward.c6"));
                    return;
                }
                let mobile=_that.$store.state.userInfo.mobile;
                if(!_that.thisVerifacation(index)){
                    return  false;
                }
                if (_that.sendPhoneStringtype) {
                     _that.codeText='<Icon class="ivu-icon ivu-icon-load-c"></Icon>';
                    _that.sendPhoneStringtype = false;
                    _that.$axios.get('/public/member/captcha/send',{
                            type:5,
                            mobilePhone:mobile
                        }).then(function (response) {
                            if(response.status==200){
                                if(response.data.result=="success"){
                                    let time = 60;
                                    let sendTimer = setInterval(function(){
                                        time--;
                                        _that.codeText = _that.$t("message.AssetManPage.AssetDetailed.sendcaptcha.codet1 ")+time+" s";
                                        if(time < 1){
                                            _that.sendPhoneStringtype = true;
                                            clearInterval(sendTimer);
                                            _that.codeText = _that.$t("message.AssetManPage.AssetDetailed.sendcaptcha.codet2");
                                        }
                                    },1000)
                                }else{
                                    _that.sendPhoneStringtype = true;
                                    _that.codeText = _that.$t("message.AssetManPage.AssetDetailed.sendcaptcha.codet2");
                                }
                            }else{
                                _that.$Message.error({
                                    top: 300,
                                    duration: 3,
                                    content:_that.$t("message.AssetManPage.AssetDetailed.sendcaptcha.cont1"),
                                });
                            }
                        })
                        .catch(function (error) {
                            _that.$Message.error({
                                top: 300,
                                duration: 3,
                                content:_that.$t("message.AssetManPage.AssetDetailed.sendcaptcha.cont1"),
                            });
                        });
                }
            },
        },
    }
</script>
<style lang="scss">
@import "../../assets/sass/setting";
   .asset-detailed-table{
        text-align: center;
        position: relative;
        min-width: 1000px;
        max-width: 1200px;
        margin:40px auto 30px;
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
                width: 12%;
            }
            tr:nth-child(4n+1){
               background: #f5f5f6;
            }
            tr[style]:nth-child(4n+2){
                background: #f5f5f6;
                td>div{
                    background: #fff;  
                }
            }
            td{
                border: none;
                height: 68px;
                font-size: 14px;
                color: #333;
                &:last-child{
                    width: 260px;
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
                    button{
                        &.cur{
                            background: $theme-color;
                            color: #fff;
                            border-color: $theme-color;
                        }
                    }
                }
                &>div{
                    background: #f5f5f6;
                }
                &>div.recharge-box{
                    color:#666;
                    margin:0 35px 20px;
                    padding: 20px 25px;
                    text-align: left;
                    p{
                        font-size:14px;
                        line-height: 1;
                    }
                    .recharge-address{
                        margin: 10px 0 15px;
                        input{
                            width: 485px;
                            height: 44px;
                            border: 1px solid #ccc;
                            padding:0 10px;
                            font-size:14px;
                            margin-right: 10px;
                            vertical-align: middle;
                            background: transparent;
                        }
                        span{
                            width: 120px;
                            height: 44px;
                            background: $theme-color;
                            color: #fff;
                            font-size: 14px;
                            line-height: 44px;
                            text-align: center;
                            display:inline-block; 
                            vertical-align: middle;
                            cursor: pointer;
                        }
                    }
                    .recharge-explain{
                        &:after{
                            content:"";
                            display:block;
                            clear: both;
                        }
                        .qr-code{
                            float: left;
                            width: 110px;
                            height: 110px;
                        }
                        ul{
                            float: left;
                            margin-left: 20px;
                            margin-top: 14px;
                            li{
                                line-height:24px;
                            }
                        }
                    }
                }
                &>div.putForward-box{
                    color:#666;
                    margin: 0 35px 20px;
                    padding:0 25px 20px;
                    text-align: left;
                    &:after{
                        content:"";
                        display:block;
                        clear: both;
                    }
                    &>span{
                        width: 210px;
                        height: 44px;
                        line-height: 44px;
                        text-align: center;
                        color: #fff;
                        font-size: 14px;
                        background: $theme-color;
                        display: inline-block;
                        margin-top: 20px;
                        cursor: pointer;
                    }
                    &>ul{
                        clear: both;
                        margin-top: 16px;
                        li{
                            line-height:24px;
                        }
                    }
                    &>div{
                        float: left;
                        margin-right: 25px;
                        p{
                            font-size:14px;
                            line-height: 1;
                            margin:20px 0 10px;
                        }
                        input{
                            height: 44px;
                            border: 1px solid #ccc;
                            padding:0 10px;
                            font-size:14px;
                            color: #666;
                            background: transparent;
                            vertical-align: middle;
                        }
                    }
                    .withdraw-money{
                        position: relative;
                        input{
                            width: 425px;
                            margin-right: 10px;
                        }
                        &>span{
                            width: 44px;
                            height: 44px;
                            line-height: 44px;
                            font-size: 22px;
                            color: $theme-color;
                            display: inline-block;
                            vertical-align: bottom;
                            cursor: pointer;
                            text-align: center;
                            border: 1px solid $theme-color;
                        }
                        &>div{
                            border: 1px solid #ccc;
                            position: absolute;
                            left:0;
                            top: 87px;
                            width: 425px;
                            background: #fff;
                            box-shadow: 0 3px 10px hsla(0,0%,39.2%,.3);
                            ul{
                                li{
                                    padding: 10px 15px;
                                    font-size: 14px;
                                    border-bottom: 1px solid #ccc;
                                    cursor: pointer;
                                    i{
                                        margin-right: 10px;
                                        vertical-align: text-bottom;
                                        font-size: 16px;
                                        color: $theme-color;
                                    }
                                    span{
                                        background: $theme-color;
                                        text-align: center;
                                        cursor: pointer;
                                        color:#fff;
                                        padding: 8px 20px;
                                        float: right;
                                        line-height: 1;
                                        margin-top: -4px;
                                        position: absolute;
                                        right: 5px;
                                    }
                                }
                            }
                            a{
                                text-align: center;
                                line-height: 1;
                                display: block;
                                margin: 15px auto;
                                color: $theme-color;  
                            }
                        }
                    }
                    .withdraw-num,.service-charge{
                            input{
                                width: 250px;
                                outline: none;
                            }
                    }
                    .capital-cipher{
                        input{
                            width: 480px;
                        }
                    }
                    .yzm-code{
                        input{
                            width: 393px;
                            
                        }
                        span{
                            width: 130px;
                            height: 44px;
                            line-height: 44px;
                            font-size: 14px;
                            color: $theme-color;
                            display: inline-block;
                            vertical-align: bottom;
                            cursor: pointer;
                            text-decoration: underline;
                            text-align: center;
                            border: 1px solid #ccc;
                            border-left: 0;
                            .ivu-icon-load-c{
                                font-size: 24px;
                                vertical-align: sub;
                                animation: ani-demo-spin 1s linear infinite;
                                @keyframes ani-demo-spin {
                                    from { transform: rotate(0deg);}
                                    50%  { transform: rotate(180deg);}
                                    to   { transform: rotate(360deg);}
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>

