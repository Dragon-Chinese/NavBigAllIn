var defaultBitId = '3124';
var defaultBitNmae = 'ETH/USDT';
var defaultLang = 'zh';
localStorage.setItem("k","1D");
localStorage.setItem("from",location.href);
var setDefaultLang = sessionStorage.getItem("lang") ? sessionStorage.getItem("lang") : 2;
switch (Number(setDefaultLang)){
    case 0:
        defaultLang = 'en';
        break;
    case 1:
        defaultLang = 'zh';
        break;
    default:
        defaultLang = 'zh_TW';
        setDefaultLang = 2;
        sessionStorage.setItem("lang",2);
        break;
};
var langLists = [
    {
        lang:"English",
        val:"0"
    },
    {
        lang:"简体中文",
        val:"1"
    },
    {
        lang:"繁體中文",
        val:"2"
    },
];
var currentData = new Array();
var coinData    = new Array();
var exchangeRate = 6.81;
var tradingViewHeight = '960';
var headerData = {};
document.oncontextmenu = function () {
    return false;
};
document.onkeydown = function (elem) {
    if (window.event && window.event.keyCode == 123) {
        event.keyCode = 0;
        event.returnValue = false;
        return false
    }
};
layui.config({version: false, debug: false, base: './layui/lay/exports/'});
layui.use(['element', 'laytpl', 'jquery', 'table', 'form', 'lang'], function () {
    var element = layui.element;
    var laytpl = layui.laytpl;
    $ = layui.jquery;
    var table = layui.table;
    var form = layui.form;
    var lang = layui.lang;
    var langData = {};
    var domain = '../api';
    var domainTransit = '../api/public/stock';
    var data = new Array();
    var isLoginData = new Array();
    var autoMinHeight = 300;
    var autoTVMinHeight = 428;
    var errorCodeArr = {"3009": langData.account_balance_insufficient};
    var marketDepthCache = {buyersData: [], sellersData: []};
    var accountInfo = {};
    var windowHeidht = document.documentElement.clientHeight || document.body.clientHeight;
    var autoHeight = (windowHeidht - 365 - 110);
    autoHeight = autoHeight > autoMinHeight ? autoHeight : autoMinHeight;
    var tableNum = parseInt((autoHeight - 40) / 2 / 19);
    var tableSellAndBuyNum = parseInt((autoHeight - 50) / 19);
    var tableAllNum = parseInt((autoHeight - 30) / 18);
    $(".auto-height").css({"height": autoHeight + 'px', "padding-bottom:": '0px', "overflow": "hidden"});
    $(".top").css({"height": ((autoHeight) / 2) + 'px', "overflow": "hidden"});
    $(".layui-side-scroll").css({"height": 'auto', "overflow": 'hidden',});
    $(".bithank-loadding").hide();
    headerData = {
        ajaxRequest: function (param) {
            var result = new Array();
            param.timeout = param.timeout ? param.timeout : 10000;
            $.ajax({
                url: param.url,
                xhrFields: {withCredentials: true},
                timeout: param.timeout,
                data: param.data,
                dataType: 'json',
                async: false,
                success: function (res) {
                    result = res
                },
                error: function () {
                    result = false
                }
            });
            return result
        },
        alertMsg: function (elemId, msg, code) {
            if (code == 1) {
                $("#" + elemId).children(".msgCont").show();
                $("#" + elemId).children(".msgCont").html('<span class="success">' + msg + '</span>')
            } else {
                $("#" + elemId).children(".msgCont").show();
                $("#" + elemId).children(".msgCont").html('<span class="error">' + msg + '</span>')
            }
        },
        loadding: function (elemId, type) {
            if (type == 1) {
                $("#" + elemId).prepend('<div class="loaddingBox"><i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i></div>')
            } else {
                $("#" + elemId).find(".loaddingBox").remove()
            }
        },
        errorCode: function (errorCode) {
            if (langData.error_code[errorCode]) {
                return langData.error_code[errorCode]
            } else {
                return langData.trading.buy_error
            }
        },
        sortDesc: function (property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1
            }
        },
        numberFloat: function (num, digits) {
            switch (digits) {
                case 3:
                    var num = Number(num.toString().match(/^\d+(?:\.\d{0,3})?/));
                    return headerData.digits(num, digits);
                    break;
                case 4:
                    var num = Number(num.toString().match(/^\d+(?:\.\d{0,4})?/));
                    return headerData.digits(num, digits);
                    break;
                case 5:
                    var num = Number(num.toString().match(/^\d+(?:\.\d{0,5})?/));
                    return headerData.digits(num, digits);
                    break;
                case 6:
                    var num = Number(num.toString().match(/^\d+(?:\.\d{0,6})?/));
                    return headerData.digits(num, digits);
                    break;
                case 7:
                    var num = Number(num.toString().match(/^\d+(?:\.\d{0,7})?/));
                    return headerData.digits(num, digits);
                    break;
                case 8:
                    var num = Number(num.toString().match(/^\d+(?:\.\d{0,8})?/));
                    return headerData.digits(num, digits);
                    break;
                case 9:
                    var num = Number(num.toString().match(/^\d+(?:\.\d{0,9})?/));
                    return headerData.digits(num, digits);
                    break;
                case 10:
                    var num = Number(num.toString().match(/^\d+(?:\.\d{0,10})?/));
                    return headerData.digits(num, digits);
                    break;
                default:
                    var num = Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
                    return headerData.digits(num, digits);
                    break
            }
        },
        floatCNY(coinType,price){
            switch (coinType) {
                case 'BHK/ETH':
                    return coinData['BHK/ETH'].price * coinData['ETH/USDT'].price * exchangeRate;
                    break;
                case 'BCH/ETH':
                    return coinData['BCH/ETH'].price * coinData['ETH/USDT'].price * exchangeRate;
                    break;
                case 'LTC/ETH':
                    return coinData['LTC/ETH'].price * coinData['ETH/USDT'].price * exchangeRate;
                    break;
                case 'ETC/ETH':
                    return coinData['ETC/ETH'].price * coinData['ETH/USDT'].price * exchangeRate;
                    break;
                case 'BHK/BTC':
                    return coinData['BHK/BTC'].price * coinData['BTC/USDT'].price * exchangeRate;
                    break;
                case 'ETH/BTC':
                    return coinData['ETH/BTC'].price * coinData['BTC/USDT'].price * exchangeRate;
                    break;
                case 'LTC/BTC':
                    return coinData['LTC/BTC'].price * coinData['BTC/USDT'].price * exchangeRate;
                case 'BCH/BTC':
                    return coinData['BCH/BTC'].price * coinData['BTC/USDT'].price * exchangeRate;
                    break;
                case 'ETC/BTC':
                    return coinData['ETC/BTC'].price * coinData['BTC/USDT'].price * exchangeRate;
                    break;
                default:
                    return price * exchangeRate;
                    break
            }
        },
        digits: function (number, digits) {
            var decimal = number.toString().split(".");
            if (decimal[1]) {
                if (decimal[1].length < digits) {
                    var decimalLength = decimal[1].length;
                    for (i = decimalLength; i < digits; i++) {
                        number = number + '0'
                    }
                }
            } else {
                for (i = 0; i < digits; i++) {
                    if (i == 0) {
                        number = number + '.0'
                    } else {
                        number = number + '0'
                    }
                }
            }
            return number
        },
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2])
            } else {
                if (name == 'id') {
                    return defaultBitId
                } else if (name == 'name') {
                    return defaultBitNmae
                } else if (name == 'lang') {
                    return defaultLang
                }
            }
            return null
        },
        dateTime: function (fmt, date) {
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds()
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt
        },
        initTrading: function (isLogin) {
            var dataCont = new Array();
            var tname = headerData.getQueryString('name');
            var tnameArr = tname.split('/');
            dataCont.name = tnameArr[1];
            dataCont.name1 = tnameArr[0];
            dataCont.isLogin = isLogin;
            dataCont.login = langData.user_center.login;
            dataCont.code = currentData.code;
            dataCont.property = langData.property;
            dataCont.price = langData.price;
            dataCont.size = langData.size;
            dataCont.total = langData.total;
            dataCont.count = langData.count;
            dataCont.buy = langData.buy;
            dataCont.sell = langData.sell;
            dataCont.suspended = langData.suspended;
            dataCont.market_price = langData.market_price;
            dataCont.isSuspended = currentData.isSuspended;
            balance = headerData.getWithCurrency(currentData.code);
            dataCont.balance = balance;
            var getTpl = bottomBlockPrice.innerHTML, view = document.getElementById('bottomBlockPriceView');
            laytpl(getTpl).render(dataCont, function (html) {
                view.innerHTML = html
            });
            var getTplMark = bottomMarketPrice.innerHTML, view = document.getElementById('bottomMarketPriceView');
            laytpl(getTplMark).render(dataCont, function (html) {
                view.innerHTML = html
            });
            form.render()
        },
        checkIsLogin: function () {
            var isLoginRes = headerData.ajaxRequest({url: domain + '/mobile/member/findRealNameCheck'});
            var loginData = new Array();
            if (isLoginRes.code == '100001') {
                return false
            } else {
                return isLoginRes
            }
        },
        getPairList: function (type) {
            pairList = new Array();
            $.ajax({
                url: domain + '/public/stock/sector/find',
                data: {type: 2,},
                type: 'GET',
                dataType: 'json',
                async: false,
                success: function (res) {
                    optionalLists = res;
                }
            });
            $.ajax({
                url: domain + '/public/stock/sector/find',
                data: {type: 1,},
                type: 'GET',
                dataType: 'json',
                async: false,
                success: function (res) {
                    pairList = res
                }
            });
            //pairList = optionalLists.concat(pairList);
            //pairList = optionalLists.concat(pairList);
            layui.each(pairList, function (index, elem) {
                if (elem.id == 7) {
                    elem.name = langData.innovation_zone
                } else {
                    elem.name = elem.name.replace(/[^a-z]+/ig, "")
                }
            });
            data.pairList = pairList;
            data.thisName = headerData.getQueryString('name');
            var getTpl = blockNav.innerHTML, view = document.getElementById('blockNavView');
            laytpl(getTpl).render(data, function (html) {
                view.innerHTML = html
            });
            var bindId = data.pairList[0].name;
            layui.each(data.pairList, function (index, elem) {
                if (elem.name != '') {
                    $.ajax({
                        url: domain + '/public/stock/findBySector',
                        data: {sectorId: elem.id, v: Math.random()},
                        dataType: 'json',
                        async: false,
                        success: function (res) {
                            headerData.findBySector(elem.name, res)
                        }
                    })
                }
            })
        },
        findBySector: function (bindId, data) {
            var queryId = headerData.getQueryString('id');
            table.render({
                elem: '#' + bindId,
                data: data,
                text: {
                    none: langData.no_data,
                },
                page: false,
                cellMinWidth: 150,
                cols: [[{
                    field: 'name', title: langData.head_drop_down.market, templet: function (d) {
                        //缓存所有币种指定数据
                        var param = {price:d.price};
                        coinData[d.name] = param;
                        if (d.id == queryId) {
                            currentData = d;
                            localStorage.setItem("currentCoinCode",d.code);
                            headerData.getRealTime(d.code);
                            return '<div><a style="color:#00C1DC" href="?id=' + d.id + '&name=' + d.name + '">' + d.name + '</a></div>'
                        } else {
                            return '<div><a href="?id=' + d.id + '&name=' + d.name + '">' + d.name + '</a></div>'
                        }
                    }, sort: true
                }, {
                    field: 'price', title: langData.head_drop_down.latest_deal, sort: true, templet: function (d) {
                        return '<div>' + headerData.numberFloat(d.price, d.priceDigits) + '</div>'
                    }
                }, {
                    field: 'priceFluctuation',
                    title: langData.head_drop_down.up_down_24h,
                    sort: true,
                    templet: function (d) {
                        return '<div>' + d.priceFluctuation + '%</div>'
                    }
                }, {
                    field: 'volume', title: langData.head_drop_down.turnover_24h, sort: true, templet: function (d) {
                        return '<div>' + headerData.numberFloat(d.volume, d.volumeDigits) + '</div>'
                    }
                }]]
            })
        },
        getCodeInfo: function (code) {
            $.ajax({
                url: domain + '/public/stock/get',
                data: {code: code},
                sync: true,
                dataType: 'json',
                success: function (res) {
                    currentData = res.data
                }
            })
        }, searchFindBySector: function () {
        },
        getRealTime: function (code) {
            $.ajax({
                url: domain + '/public/stock/get',
                data: {code: code},
                sync: true,
                dataType: 'json',
                success: function (res) {
                    var data = {};
                    //处理币种人民币价格
                    if (res.result == 'success') {
                        data = {
                            "title": {
                                "price": langData.price,
                                "delta": langData.delta,
                                "high": langData.high,
                                "low": langData.low,
                                "volume": langData.volume,
                            },
                            "price": headerData.numberFloat(res.data.price, res.data.priceDigits),
                            "priceUS": headerData.numberFloat(headerData.floatCNY(res.data.name,res.data.price), res.data.priceDigits),
                            "openingPrice": res.data.openingPrice,
                            "closingPrice": res.data.closingPrice,
                            "highestPrice": headerData.numberFloat(res.data.highestPrice, res.data.priceDigits),
                            "lowestPrice": headerData.numberFloat(res.data.lowestPrice, res.data.priceDigits),
                            "volume": headerData.numberFloat(res.data.volume, res.data.volumeDigits),
                            "priceFluctuation": res.data.priceFluctuation,
                        };
                        accountInfo.marketPrice = data.price;

                        var getTpl = block.innerHTML, view = document.getElementById('blockView');
                        laytpl(getTpl).render(data, function (html) {
                            view.innerHTML = html;
                        });
                        var getTpl = currentPrice.innerHTML, view = document.getElementById('currentPriceView');
                        laytpl(getTpl).render(data, function (html) {
                            view.innerHTML = html;
                        });
                        var getTpl = currentPriceSell.innerHTML, view = document.getElementById('currentPriceViewSell');
                        laytpl(getTpl).render(data, function (html) {
                            view.innerHTML = html;
                        });
                        var getTpl = currentPriceBuy.innerHTML, view = document.getElementById('currentPriceViewBuy');
                        laytpl(getTpl).render(data, function (html) {
                            view.innerHTML = html;
                        });
                    }
                }
            })
        },
        getTradingHistory: function (code) {
            var queryId = headerData.getQueryString('id');
            var historyData = headerData.ajaxRequest({
                url: domain + '/public/stock/currency/trade/latest',
                data: {code: code,}
            });
            table.render({
                elem: '#tradingHistory',
                data: historyData,
                text: {
                    none: langData.no_data,
                },
                page: false,
                limit: tableAllNum,
                width: 268,
                cols: [[{
                    field: 'tradePrice', title: langData.price, width: 88.33, templet: function (d) {
                        if (d.tradeMark == 1) {
                            return '<div><span class="red">' + headerData.numberFloat(d.tradePrice, currentData.priceDigits) + '</span></div>'
                        } else {
                            return '<div><span class="green">' + headerData.numberFloat(d.tradePrice, currentData.priceDigits) + '</span></div>'
                        }
                    }
                }, {
                    field: 'num', title: langData.size, width: 88.33, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.num, currentData.volumeDigits) + '</span></div>'
                    }
                }, {
                    field: 'tradeTime', title: langData.date, width: 88.33, templet: function (d) {
                        var now = new Date(d.tradeTime);
                        var year = now.getFullYear(), month = now.getMonth() + 1, date = now.getDate(),
                            hour = now.getHours(), minute = now.getMinutes(), second = now.getSeconds();
                        hour = hour < 10 ? '0' + hour : '' + hour;
                        minute = minute < 10 ? '0' + minute : '' + minute;
                        second = second < 10 ? '0' + second : '' + second;
                        return hour + ":" + minute + ":" + second
                    }
                }]]
            })
        },
        getMarketDepth: function (code) {
            var queryId = headerData.getQueryString('id');
            var marketDepthData = headerData.ajaxRequest({
                url: domain + '/public/stock/marketDepth',
                timeout: 3000,
                data: {code: code, num: 20}
            });
            var buyersData, sellersData, marketDepthAllData = new Array();
            buyersData = marketDepthData.buyers;
            sellersData = marketDepthData.sellers;
            layui.each(buyersData, function (index, value) {
                if (index == 0) {
                    var amountTotal = value.amountStr;
                    value.amountTotal = headerData.numberFloat(amountTotal, value.amountDigits)
                } else {
                    var amountTotal = parseFloat(buyersData[parseInt(index - 1)].amountTotal) + parseFloat(value.amountStr);
                    value.amountTotal = headerData.numberFloat(amountTotal, value.amountDigits)
                }
            });
            layui.each(sellersData, function (index, value) {
                if (index == 0) {
                    var amountTotal = value.amountStr;
                    value.amountTotal = headerData.numberFloat(amountTotal, value.amountDigits)
                } else {
                    var amountTotal = parseFloat(sellersData[parseInt(index - 1)].amountTotal) + parseFloat(value.amountStr);
                    value.amountTotal = headerData.numberFloat(amountTotal, value.amountDigits)
                }
            });
            sellersData = sellersData.slice(0, tableSellAndBuyNum);
            sellersDataTop = sellersData.slice(0, tableNum);
            sellersData.sort(headerData.sortDesc('price'));
            sellersDataTop.sort(headerData.sortDesc('price'));
            buyersData.sort(headerData.sortDesc('price'));
            marketDepthCache.buyersData = buyersData;
            marketDepthCache.sellersData = sellersData;
            table.render({
                elem: '#marketDepthAllTop',
                data: sellersDataTop ? sellersDataTop : [],
                text: {
                    none: langData.no_data,
                },
                page: false,
                limit: tableNum,
                width: 268,
                cols: [[{
                    field: 'price', title: langData.price, width: 88.33, templet: function (d) {
                        return '<div><span class="red">' + headerData.numberFloat(d.price, currentData.priceDigits) + '</span></div>'
                    }
                }, {
                    field: 'amountStr', title: langData.size, width: 88.33, templet: function (d) {
                        return '<div><span>' + d.amountStr + '</span></div>'
                    }
                }, {
                    field: 'amountTotal', title: langData.total, width: 88.33, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.amountTotal, currentData.volumeDigits) + '</span></div>'
                    }
                }]],
                done: function () {
                    $(".loadding").remove()
                }
            });
            table.render({
                elem: '#marketDepthAllBottom',
                data: buyersData ? buyersData : [],
                text: {
                    none: langData.no_data,
                },
                page: false,
                limit: tableNum,
                width: 268,
                cols: [[{
                    field: 'price', title: langData.price, width: 88.33, templet: function (d) {
                        return '<div><span class="green">' + headerData.numberFloat(d.price, currentData.priceDigits) + '</span></div>'
                    }
                }, {
                    field: 'amountStr', title: langData.size, width: 88.33, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.amountStr, currentData.volumeDigits) + '</span></div>'
                    }
                }, {
                    field: 'amountTotal', title: langData.total, width: 88.33, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.amountTotal, currentData.volumeDigits) + '</span></div>'
                    }
                }]],
            });
            table.render({
                elem: '#sellersData',
                data: sellersData ? sellersData : [],
                text: {
                    none: langData.no_data,
                },
                page: false,
                limit: tableSellAndBuyNum,
                width: 268,
                cols: [[{
                    field: 'price', title: langData.price, width: 88.33, templet: function (d) {
                        return '<div><span class="red">' + headerData.numberFloat(d.price, currentData.priceDigits) + '</span></div>'
                    }
                }, {
                    field: 'amountStr', title: langData.size, width: 88.33, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.amountStr, currentData.volumeDigits) + '</span></div>'
                    }
                }, {
                    field: 'amountTotal', title: langData.total, width: 88.33, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.amountTotal, currentData.volumeDigits) + '</span></div>'
                    }
                }]]
            });
            table.render({
                elem: '#buyersData',
                data: buyersData ? buyersData : [],
                text: {
                    none: langData.no_data,
                },
                page: false,
                limit: tableSellAndBuyNum,
                width: 268,
                cols: [[{
                    field: 'price', title: langData.price, width: 88.33, templet: function (d) {
                        return '<div><span class="green">' + headerData.numberFloat(d.price, currentData.priceDigits) + '</span></div>'
                    }
                }, {
                    field: 'amountStr', title: langData.size, width: 88.33, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.amountStr, currentData.volumeDigits) + '</span></div>'
                    }
                }, {
                    field: 'amountTotal', title: langData.total, width: 88.33, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.amountTotal, currentData.volumeDigits) + '</span></div>'
                    }
                }]]
            })
        },
        getWithCurrency: function (code) {
            var balance = headerData.ajaxRequest({
                url: domain + '/mobile/member/position/getWithCurrency',
                data: {code: code,}
            });
            accountInfo.balance = balance;
            return balance
        },
        getEntrust: function (code) {
            var findEntrust = headerData.ajaxRequest({
                url: domain + '/mobile/currency/trade/findEntrust',
                timeout: 2000,
                data: {code: code, page: 1, limit: 9}
            });
            var findHistoryEntrust = headerData.ajaxRequest({
                url: domain + '/mobile/currency/trade/findHistoryEntrust',
                timeout: 2000,
                data: {code: code, page: 1, limit: 9}
            });
            var findEntrustData = [];
            layui.each(findEntrust.data, function (index, item) {
                findEntrustData.unshift(item)
            });
            table.render({
                elem: '#findEntrust',
                data: findEntrustData ? findEntrustData : [],
                page: false,
                limit: 6,
                text: {
                    none: langData.no_data,
                },
                cols: [[{
                    field: 'createTimeString', title: langData.date, minWidth: 120, templet: function (d) {
                        return '<div><span>' + d.createTimeString + '</span></div>'
                    }
                }, {
                    field: 'tradeMark', title: langData.type, templet: function (d) {
                        if (d.tradeMark == 0) {
                            return '<div><span>' + langData.buy + '</span></div>'
                        } else {
                            return '<div><span>' + langData.sell + '</span></div>'
                        }
                    }
                }, {
                    field: 'entrustPrice', title: langData.price, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.entrustPrice, currentData.priceDigits) + '</span></div>'
                    }
                }, {
                    field: 'entrustNumber', title: langData.size, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.entrustNumber, currentData.volumeDigits) + '</span></div>'
                    }
                }, {
                    field: 'leftNumber', title: langData.num_remaining, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.leftNumber, currentData.volumeDigits) + '</span></div>'
                    }
                }, {
                    field: 'txNo', title: langData.action, templet: function (d) {
                        return '<div><a data-txno="' + d.txNo + '" class="undo-btn">撤销</a></div>'
                    }
                }]]
            });
            var findHistoryEntrustData = [];
            layui.each(findHistoryEntrust.data, function (index, item) {
                findHistoryEntrustData.unshift(item)
            });
            table.render({
                elem: '#findHistoryEntrust',
                data: findHistoryEntrustData ? findHistoryEntrustData : [],
                text: {
                    none: langData.no_data,
                },
                page: false,
                limit: 6,
                cols: [[{
                    field: 'createTimeString', title: langData.date, minWidth: 118, templet: function (d) {
                        return '<div><span>' + d.createTimeString + '</span></div>'
                    }
                }, {
                    field: 'tradeMark', title: langData.type, templet: function (d) {
                        if (d.tradeMark == 0) {
                            return '<div><span>' + langData.buy + '</span></div>'
                        } else {
                            return '<div><span>' + langData.sell + '</span></div>'
                        }
                    }
                }, {
                    field: 'entrustPrice', title: langData.price, templet: function (d) {
                        if (d.entrustPrice == 0) {
                            return '<div><span>' + langData.market_price + '</span></div>'
                        } else {
                            return '<div><span>' + headerData.numberFloat(d.entrustPrice, currentData.priceDigits) + '</span></div>';
                        }
                    }
                }, {
                    field: 'entrustNumber', title: langData.size, templet: function (d) {
                        if (d.entrustNumber == 0) {
                            return '<div><span>' + langData.market_price + '</span></div>'
                        } else {
                            return '<div><span>' + headerData.numberFloat(d.entrustNumber, currentData.volumeDigits) + '</span></div>'
                        }
                    }
                }, {
                    field: 'turnoverQuantity', title: langData.submitted, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.turnoverQuantity, currentData.volumeDigits) + '</span></div>'
                    }
                }, {
                    field: 'averagePrice', title: langData.average_price, templet: function (d) {
                        return '<div><span>' + headerData.numberFloat(d.averagePrice, currentData.priceDigits) + '</span></div>'
                    }
                }, {
                    field: 'tradeStatus', title: langData.status, templet: function (d) {
                        return '<div><span>' + langData.history_entrust_status[d.tradeStatus] + '</span></div>'
                    }
                }]]
            });
            table.render()
        }, formCount: function (currentThis, price, num) {
            var total = (price * num);
            total = parseFloat(total.toFixed(6));
            currentThis.parents('form').find(".input-total").html(total);
            currentThis.addClass('current')
        }
    };
    var currentLang = headerData.getQueryString('lang');
    langData = lang[currentLang] ? lang[currentLang] : lang[defaultLang];
    $('body').find('.langChang').each(function (index) {
        key = $(this).attr('lang-txt');
        if (key == 'img-sell-buy' || key == 'img-sell' || key == 'img-buy') {
            $(this).attr('title', langData[key])
        } else {
            $(this).html(langData[key])
        }
    });
    headerData.getPairList();
    var isLogin = headerData.checkIsLogin();
    if (isLogin.result == 'success') {
        isLoginData.isLogin = 1;
        tradingViewHeight = windowHeidht - 347;
        tradingViewHeight = tradingViewHeight > autoTVMinHeight ? tradingViewHeight : autoTVMinHeight;
        isLoginData.data = isLogin.data;
        isLoginData.realName = langData.user_center.real_name_yes;
        isLoginData.realNameNo = langData.user_center.real_name_no;
        isLoginData.account_information = langData.user_center.account_information;
        isLoginData.identity_auth = langData.user_center.identity_auth;
        isLoginData.rec_center = langData.user_center.rec_center;
        isLoginData.assets_manage = langData.user_center.assets_manage;
        isLoginData.entrusted_manage = langData.user_center.entrusted_manage;
        isLoginData.logout = langData.user_center.logout;
        isLoginData.lang = setDefaultLang;
        $(".trading-bottom-box").show();
        headerData.getEntrust(currentData.code);
        setInterval(function () {
            isLogin = headerData.checkIsLogin();
            if (isLogin == false) {
                location.href = '../#/Login'
            }
        }, 5000);
    } else {
        isLoginData.isLogin = 0;
        accountInfo = '';
        tradingViewHeight = windowHeidht - 64;
        tradingViewHeight = tradingViewHeight > (autoTVMinHeight + 365) ? tradingViewHeight : (autoTVMinHeight + 369);
        isLoginData.realName = langData.user_center.real_name_no;
        isLoginData.login = langData.user_center.login;
        isLoginData.register = langData.user_center.register
        isLoginData.lang = setDefaultLang;
        //isLoginData.thisUrl = encodeURI(location.href);
    }
    loadTradingView(tradingViewHeight, domainTransit,langData.timeSharing,langData.weeks,langData.indicators);
    var getTpl = loginRegBox.innerHTML, view = document.getElementById('loginRegBoxView');
    laytpl(getTpl).render(isLoginData, function (html) {
        view.innerHTML = html
    });
    headerData.getCodeInfo(currentData.code);
    headerData.getMarketDepth(currentData.code);
    headerData.getTradingHistory(currentData.code);
    headerData.initTrading(isLoginData.isLogin);
    element.render();
    $("input").blur(function () {
        var txt = $(this).val();
        if (txt == '') {
            $(this).css("border-color", "#F15533")
        } else {
            $(this).css("border-color", "#06B24A")
        }
    });
    form.on('submit(limitPriceBuy)', function (data) {
        //判断是否实名认证
        if(!isLogin.data.identityCardNo){
            headerData.alertMsg("limitPriceSell", langData.trading.unauthenticated, 0);
            return false
        }
        if (!data.field.code) {
            headerData.alertMsg("limitPriceBuy", langData.trading.coin_not_exist, 0);
            return false
        }
        if (!data.field.price) {
            headerData.alertMsg("limitPriceBuy", langData.trading.please_input_buy_price, 0);
            $("#limitPriceBuy").find("input[name='price']").css("border-color", "#F15533");
            return false
        }
        if (!data.field.num) {
            headerData.alertMsg("limitPriceBuy", langData.trading.buy_num_not_empty, 0);
            $("#limitPriceBuy").find("input[name='num']").css("border-color", "#F15533");
            $("#limitPriceBuy").find("input[name='num']").focus();
            return false
        }
        $.ajax({
            url: domain + '/mobile/currency/trade/buy',
            beforeSend: function () {
                headerData.loadding('limitPriceBuy', 1)
            },
            data: {code: data.field.code, num: data.field.num, price: data.field.price},
            dataType: 'json',
            success: function (res) {
                headerData.loadding('limitPriceBuy', 0);
                if (res.result == '3000') {
                    headerData.alertMsg("limitPriceBuy", langData.trading.buy_submit_success, 1);
                    $("#limitPriceBuy").find("input[name='price']").val('');
                    $("#limitPriceBuy").find("input[name='num']").val('');
                    setTimeout(function () {
                        headerData.initTrading(isLoginData.isLogin);
                        headerData.getEntrust(currentData.code)
                    }, 3000);
                }else if (res.code == 100001) {
                    location.href = '#/Login'
                }else {
                    console.log(res.result);
                    headerData.alertMsg("limitPriceBuy", headerData.errorCode(res.result), 0)
                }
            }
        });
        return false
    });
    form.on('submit(limitPriceSell)', function (data) {
        //判断是否实名认证
        if(!isLogin.data.identityCardNo){
            headerData.alertMsg("limitPriceSell", langData.trading.unauthenticated, 0);
            return false
        }
        if (!data.field.code) {
            headerData.alertMsg("limitPriceSell", langData.trading.coin_not_exist, 0);
            return false
        }
        if (!data.field.price) {
            headerData.alertMsg("limitPriceSell", langData.trading.please_input_sell_price, 0);
            $("#limitPriceSell").find("input[name='price']").css("border-color", "#F15533");
            $("#limitPriceSell").find("input[name='price']").focus();
            return false
        }
        if (!data.field.num) {
            headerData.alertMsg("marketPriceBuy", langData.trading.buy_num_not_empty, 0);
            $("#limitPriceSell").find("input[name='num']").css("border-color", "#F15533");
            $("#limitPriceSell").find("input[name='num']").focus();
            return false
        }
        $.ajax({
            url: domain + '/mobile/currency/trade/sell',
            beforeSend: function () {
                headerData.loadding('limitPriceSell', 1)
            },
            data: {code: data.field.code, num: data.field.num, price: data.field.price},
            dataType: 'json',
            success: function (res) {
                headerData.loadding('limitPriceSell', 0);
                if (res.result == '3000') {
                    headerData.alertMsg("limitPriceSell", langData.trading.sell_submit_success, 1);
                    $("#limitPriceSell").find("input[name='price']").val('');
                    $("#limitPriceSell").find("input[name='num']").val('');
                    setTimeout(function () {
                        headerData.initTrading(isLoginData.isLogin);
                        headerData.getEntrust(currentData.code);
                        element.render()
                    }, 3000)
                }else if (res.code == 100001) {
                    location.href = '#/Login'
                }else {
                    headerData.alertMsg("limitPriceSell", headerData.errorCode(res.result), 0)
                }
            }
        });
        return false
    });
    form.on('submit(marketPriceBuy)', function (data) {
        //判断是否实名认证
        if(!isLogin.data.identityCardNo){
            headerData.alertMsg("limitPriceSell", langData.trading.unauthenticated, 0);
            return false
        }
        if (!data.field.code) {
            headerData.alertMsg("marketPriceBuy", langData.trading.coin_not_exist, 0);
            return false
        }
        if (!data.field.num) {
            headerData.alertMsg("marketPriceBuy", langData.trading.buy_num_not_empty, 0);
            $("#marketPriceBuy").find("input[name='num']").css("border-color", "#F15533");
            $("#marketPriceBuy").find("input[name='num']").focus();
            return false
        }
        $.ajax({
            url: domain + '/mobile/currency/trade/market/buy', beforeSend: function () {
                headerData.loadding('marketPriceBuy', 1)
            }, data: {code: data.field.code, amount: data.field.num,}, dataType: 'json', success: function (res) {
                headerData.loadding('marketPriceBuy', 0);
                if (res.result == '3000') {
                    headerData.alertMsg("marketPriceBuy", langData.trading.buy_submit_success, 1);
                    $("#marketPriceBuy").find("input[name='num']").val('');
                    setTimeout(function () {
                        headerData.initTrading(isLoginData.isLogin);
                        headerData.getEntrust(currentData.code);
                        element.render()
                    }, 3000)
                }else if (res.code == 100001) {
                    location.href = '#/Login'
                }else {
                    headerData.alertMsg("marketPriceBuy", headerData.errorCode(res.result), 0)
                }
            }
        });
        return false
    });
    form.on('submit(marketPriceSell)', function (data) {
        //判断是否实名认证
        if(!isLogin.data.identityCardNo){
            headerData.alertMsg("limitPriceSell", langData.trading.unauthenticated, 0);
            return false
        }
        if (!data.field.code) {
            headerData.alertMsg("marketPriceSell", langData.trading.coin_not_exist, 0);
            return false
        }
        if (!data.field.num) {
            headerData.alertMsg("marketPriceSell", langData.trading.sell_num_not_empty, 0);
            $("#marketPriceSell").find("input[name='num']").css("border-color", "#F15533");
            $("#marketPriceSell").find("input[name='num']").focus();
            return false
        }
        $.ajax({
            url: domain + '/mobile/currency/trade/market/sell',
            beforeSend: function () {
                headerData.loadding('marketPriceSell', 1)
            },
            data: {code: data.field.code, num: data.field.num, price: data.field.price},
            dataType: 'json',
            success: function (res) {
                headerData.loadding('marketPriceSell', 0);
                if (res.result == '3000') {
                    headerData.alertMsg("marketPriceSell", langData.trading.sell_submit_success, 1);
                    $("#marketPriceSell").find("input[name='num']").val('');
                    setTimeout(function () {
                        headerData.initTrading(isLoginData.isLogin);
                        headerData.getEntrust(currentData.code);
                        element.render()
                    }, 3000)
                }else if (res.code == 100001) {
                    location.href = '#/Login'
                }else {
                    headerData.alertMsg("marketPriceSell", headerData.errorCode(res.result), 0)
                }
            }
        });
        return false
    });
    $('body').on('click', '.undo-btn', function () {
        var txNo = $(this).data('txno');
        $.ajax({
            url: domain + '/currency/trade/cancel', data: {txNo: txNo}, dataType: 'json', success: function (res) {
                if (res.result == 'failure') {
                    layer.msg(res.error)
                }else if (res.code == 100001) {
                    location.href = '#/Login'
                } else {
                    layer.msg(res.data);
                    headerData.initTrading(isLoginData.isLogin);
                    headerData.getEntrust(currentData.code);
                    element.render();
                }
            }, error: function () {
                console.log(langData.network_anomaly)
            }
        })
    });
    $('body').on('click', '.percentage', function () {
        var type = $(this).data('type');
        if (isLogin) {
            var buyBalance = accountInfo.balance.buyBalance;
            if (buyBalance == 0) {
                if (type == 'limitLeft') {
                    $("#limitPriceBuy").find("input[name='num']").val(0.000000);
                    headerData.alertMsg("limitPriceBuy", langData.trading.account_balance_insufficient, 1);
                    return false;
                } else if (type == 'marketLeft') {
                    $("#marketPriceBuy").find("input[name='num']").val(0.000000);
                    headerData.alertMsg("marketPriceBuy", langData.trading.account_balance_insufficient, 1);
                    return false;
                }
            } else {
                if (type == 'limitLeft') {
                    if (accountInfo.currentLimitLeftPrice) {
                        var buyNumPer = $(this).data('num');
                        var buyNum = buyBalance / accountInfo.currentLimitLeftPrice * buyNumPer;
                        $("#limitPriceBuy").find("input[name='num']").val(buyNum);
                        $('.left-box .percentage').removeClass('current');
                        headerData.formCount($(this), accountInfo.currentLimitLeftPrice, buyNum);
                        return false;
                    } else {
                        layer.tips(langData.trading.price_not_empty, '#limitLeftPrice', {tips: 1});
                        return false;
                    }
                } else if (type == 'marketLeft') {
                    var sellNumPer = $(this).data('num');
                    var sellNum = buyBalance * sellNumPer;
                    $("#marketPriceBuy").find("input[name='num']").val(sellNum);
                    $('.left-box .percentage').removeClass('current');
                    headerData.formCount($(this), accountInfo.currentLimitRightPrice, sellNum);
                    return false;
                }
            }
        }
        return false
    });
    $('body').on('click', '.percentage', function () {
        var type = $(this).data('type');
        if (isLogin) {
            var sellBalance = accountInfo.balance.sellBalance;
            if (sellBalance == 0) {
                if (type == 'limitRight') {
                    $("#limitPriceSell").find("input[name='num']").val(0.000000);
                    headerData.alertMsg("limitPriceSell", langData.trading.account_balance_insufficient, 1);
                    return false;
                } else if (type == 'marketRight') {
                    $("#marketPriceSell").find("input[name='num']").val(0.000000);
                    headerData.alertMsg("marketPriceSell", langData.trading.account_balance_insufficient, 1);
                    return false;
                }
            } else {
                if (type == 'limitRight') {
                    if (accountInfo.currentLimitRightPrice) {
                        var sellNumPer = $(this).data('num');
                        var sellNum = sellBalance * sellNumPer;
                        $("#limitPriceSell").find("input[name='num']").val(sellNum);
                        $('.right-box .percentage').removeClass('current');
                        headerData.formCount($(this), accountInfo.currentLimitRightPrice, sellNum);
                        return false;
                    } else {
                        layer.tips(langData.trading.price_not_empty, '#limitRightPrice', {tips: 1});
                        return false;
                    }
                } else if (type == 'marketRight') {
                    var sellNumPer = $(this).data('num');
                    var sellNum = sellBalance * sellNumPer;
                    layer.msg(sellNumPer);
                    $("#marketPriceSell").find("input[name='num']").val(sellNum);
                    $('.right-box .percentage').removeClass('current');
                    headerData.formCount($(this), accountInfo.currentLimitRightPrice, sellNum);
                    return false;
                }
            }
        }
        return false
    });
    //选择语言
    element.on('nav(lang)', function(data){
        if($(this).data('value')){
            sessionStorage.setItem("lang",$(this).data('value'));
            location.reload();
        }
        return false;
    });
    form.on('submit(logout)', function () {
        sessionStorage.removeItem('loinStatus');
        headerData.ajaxRequest({url: domain + '/public/user/logoutAjax'});
        location.reload()
    });
    var index = setInterval(function () {
        headerData.getRealTime(currentData.code);
        headerData.getMarketDepth(currentData.code);
        headerData.getTradingHistory(currentData.code)
    }, 3000);
    $('body').on('keyup', 'input', function () {
        var type = $(this).data('type');
        var area = $(this).data('area');
        if (type == 'price' || type == 'num') {
            var text = $(this).val();
            $(this).val($(this).val().replace(/[^\d.]/g, ""));
            $(this).val($(this).val().replace(/^\./g, ""));
            $(this).val($(this).val().replace(/\.{2,}/g, "."));
            $(this).val($(this).val().replace(".", "$#$").replace(/\./g, "").replace("$#$", "."));
            if(type == 'price'){
                $(this).val(amount($(this).val(),currentData.priceDigits));
            }else{
                $(this).val(amount($(this).val(),currentData.volumeDigits));
            }

        }
        var price = $(this).parents('form').find("input[name='price']").val();
        var num = $(this).parents('form').find("input[name='num']").val();
        if (area == 'limitLeft') {
            accountInfo.currentLimitLeftPrice = price
        } else if (area == 'limitRight') {
            accountInfo.currentLimitRightPrice = price
        }
        if (price && num) {
            headerData.formCount($(this), price, num)
        } else {
            $(this).parents('form').find(".input-total").html('')
        }
    });
    $('body .tab-left-box').on('click', 'tr', function (elem) {
        var currentPrice = elem.currentTarget.cells[0].innerText;
        $(".auto-price").val(currentPrice);
        $(".auto-num").val('');
        accountInfo.currentLimitLeftPrice = currentPrice;
        accountInfo.currentLimitRightPrice = currentPrice;
    });
});

function amount(th,num){
    var regStrs = [];
    switch (num) {
        case 3:
            regStrs = [
                ['^(\\d+\\.\\d{3}).+', '$1'] //禁止录入小数点后两位以上
            ];
            break;
        case 4:
            regStrs = [
                ['^(\\d+\\.\\d{4}).+', '$1'] //禁止录入小数点后两位以上
            ];
            break;
        case 5:
            regStrs = [
                ['^(\\d+\\.\\d{5}).+', '$1'] //禁止录入小数点后两位以上
            ];
            break;
        case 6:
            regStrs = [
                ['^(\\d+\\.\\d{6}).+', '$1'] //禁止录入小数点后两位以上
            ];
            break;
        case 7:
            regStrs = [
                ['^(\\d+\\.\\d{7}).+', '$1'] //禁止录入小数点后两位以上
            ];
            break;
        case 8:
            regStrs = [
                ['^(\\d+\\.\\d{8}).+', '$1'] //禁止录入小数点后两位以上
            ];
            break;
        case 9:
            regStrs = [
                ['^(\\d+\\.\\d{9}).+', '$1'] //禁止录入小数点后两位以上
            ];
            break;
        case 10:
            regStrs = [
                ['^(\\d+\\.\\d{10}).+', '$1'] //禁止录入小数点后两位以上
            ];
            break;
        case 11:
            regStrs = [
                ['^(\\d+\\.\\d{11}).+', '$1'] //禁止录入小数点后两位以上
            ];
            break;
        default :
            regStrs = [
                ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
            ];
            break;
    }

    for(var i=0; i<regStrs.length; i++){
        var reg = new RegExp(regStrs[i][0]);
        th = th.replace(reg, regStrs[i][1]);
    }
    return th;
}


function loadTradingView(tradingViewHeight, domainTransit,timeSharing,weeks,indicators) {
    var widget = window.tvWidget = new TradingView.widget({
        debug:false,
        width: '100%',
        height: tradingViewHeight,
        symbol: getParameterByName('name'),
        interval:"1",
        timeframe:getDepth(),
        container_id: "tv_chart_container",
        datafeed: new Datafeeds.UDFCompatibleDatafeed(domainTransit),
        library_path: "charting_library/",
        toolbar_bg: "#272b2e",
        timezone: "Asia/Shanghai",
        locale: defaultLang,
        custom_css_url: "theme/style.css",
        drawings_access: {type: 'black', tools: [{name: "Regression Trend"}]},
        disabled_features: ["use_localstorage_for_settings", "volume_force_overlay", "header_symbol_search", "header_compare", "header_undo_redo", "header_screenshot", "header_fullscreen_button", "header_saveload", "header_settings", "header_resolutions", "header_chart_type", "left_toolbar", "header_indicators", "timeframes_toolbar", "control_bar", "pane_context_menu", "move_logo_to_main_pane", "adaptive_logo"],
        enabled_features: ["study_templates"],
        charts_storage_api_version: "1.1",
        overrides: {
            "volumePaneSize": "small",
            "mainSeriesProperties.style": 3,
            "paneProperties.background": "#272b2e",
            "paneProperties.vertGridProperties.color": "#272b2e",
            "paneProperties.horzGridProperties.color": "#272b2e",
            "paneProperties.crossHairProperties.color": "#989898",
            "scalesProperties.backgroundColor": "#000",
            "mainSeriesProperties.lineStyle.color": "#ffffff",
            "scalesProperties.textColor": "#AAA",
            "mainSeriesProperties.areaStyle.color1": "#373D41",
            "mainSeriesProperties.areaStyle.color2": "#373D41",
            "mainSeriesProperties.areaStyle.linecolor": "#5D7583",
            "mainSeriesProperties.areaStyle.linewidth": 1,
            "timeScale.barSpacing" : 15
        },
        studies_overrides: {
            "volume.volume.plottype": "columns",
            "volume.volume.color.0": "#21AE79",
            "volume.volume.color.1": "#FF5353",
            "volume.volume.transparency": 70,
            "volume.volume ma.plottype": 'line',
            "volume.volume ma.linewidth": 1,
            "volume.show ma": true,
        },
        client_id: 'tradingview.com',
        user_id: 'public_user_id'
    });
    tvWidget.onChartReady(function () {
        tvWidget.chart().setResolution("1");
        tvWidget.chart().createStudy('Moving Average', true, false, [7], null, {
            'Plot.color': '#358194',
            'Plot.linewidth': 2
        });
        tvWidget.chart().createStudy('Moving Average', true, false, [30], null, {
            'Plot.color': '#A48B76',
            'Plot.linewidth': 2,
        });
        createResolutionBtn('1', timeSharing, 1);
        createResolutionBtn('1', '1m', 'kline');
        createResolutionBtn('5', '5m');
        createResolutionBtn('15', '15m');
        createResolutionBtn('30', '30m');
        createResolutionBtn('60', '60m');
        createResolutionBtn('1D', '1D');
        createResolutionBtn('1W', weeks);
        createResolutionBtn('0', indicators, 'studies');
    });
}

function getParameterByName(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2])
    } else {
        if (name == 'id') {
            return defaultBitId
        } else if (name == 'name') {
            return defaultBitNmae
        }
    }
    return null;
}

function createResolutionBtn(resolution, txt, min1Type) {
    if(resolution != 0){
        localStorage.setItem("k",resolution);
    }
    if (min1Type == 1) {
        tvWidget.createButton().text(txt).on('click', (e) => this.changeResolution(e, resolution, txt, min1Type)).addClass('active')
    } else {
        tvWidget.createButton().text(txt).on('click', (e) => this.changeResolution(e, resolution, txt, min1Type))
    }
}

function changeResolution(e, resolution, txt, min1Type) {
    if (min1Type != 'studies') {
        e.view.$('.left').find('.button').removeClass('active');
        e.view.$(e.toElement).addClass('active');
    }
    if (!tvWidget) {
        return
    }
    if (resolution === "1" && min1Type == 1) {
        tvWidget.chart().setChartType(3);
        tvWidget.chart().setResolution(resolution);
    } else if (min1Type == 'studies') {
        tvWidget.chart().executeActionById('insertIndicator');
    } else {
        var studies = tvWidget.chart().getAllStudies();
        if (!tvWidget.isRealTime) {
            tvWidget.chart().setChartType(1);
        }
        tvWidget.chart().setResolution(resolution);
    }
}

function getDepth() {
    var k = localStorage.getItem("k");
    switch (k) {
        case "1D":
            return "1D";
            break;
        case "1W":
            return "25M";
            break;
        case "60":
            return "5D";
            break;
        case "30":
            return "2D";
            break;
        case "15":
            return "1D";
            break;
        case "5":
            return "1D";
            break;
        case "1":
            return "1D";
            break;
    }
}