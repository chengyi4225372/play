//弹框
// window.alert  = function(msg, callBack) {
//     need("biz.widget.dialog", function (Dialog) {
//         Dialog.alert(msg, callBack);
//     });
// }
function commConfrim(msg, callBack) {
    need("biz.widget.dialog", function (Dialog) {
        Dialog.confirm(msg, callBack);
    });
}
//对抽奖处理
function tenResult(iPackageIdCnt,sPackageName){
    var idArr = iPackageIdCnt.substring(0, iPackageIdCnt.length - 1).split(",");
    var nameArr = sPackageName.split(",");
    var obj=[];
    $.each(idArr,function(k,v){
        obj[k]={
            id:v.split(":")[0],
            num:v.split(":")[1],
            name:nameArr[k]
        }
    })
    return obj;
}
//ios
function isIOS(){
    let u = navigator.userAgent;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isIOS;
}
//道聚城app
function isDjcApp() {
    return typeof HostApp != "undefined" || milo.cookie.get("djc_appVersion") != null;
}
//判断QQ
function isQQApp() {
    var sUserAgent = navigator.userAgent;
    var REGEXP_IOS_QQ = new RegExp("(iPad|iPhone|iPod).*? (IPad)?QQ\\/([\\d\\.]+)");
    var REGEXP_ANDROID_QQ = new RegExp("\\bV1_AND_SQI?_([\\d\\.]+)(.*? QQ\\/([\\d\\.]+))?", "ig");
    var isIphoneOs_QQ = REGEXP_IOS_QQ.test(sUserAgent);
    var isAndroid_QQ = REGEXP_ANDROID_QQ.test(sUserAgent);
    if (isIphoneOs_QQ || isAndroid_QQ) {
        return true
    } else {
        return false
    }
}
//wx
function isWeiXinApp() {
    return /MicroMessenger/gi.test(navigator.userAgent);
}
//msdk
function isMsdk() {
    var ua = window.navigator.userAgent.toLowerCase()
    return /msdk/i.test(ua);
}
//分享
function setShare(_share) {
    var isapp = function(){
        return typeof HostApp != "undefined" || milo.cookie.get("djc_appVersion") != null;
    };
    if (isapp()) {
        setTimeout(function () {
            var option = {
                "title": _share.title,
                "pic": _share.icon,
                "content": _share.desc,
                "share_url": _share.link,
                type: '1,2,3,4,5,6',
            }
            HostApp._registerShareInfo = $.param(option);
        }, 1000)
    } else if (isQQApp() || isWeiXinApp()) {
        need(["biz.mobileclient"], function (mClient) {
            //设置分享
            var obj = {
                wx_appid: 'wxf8773b4d31a9a719', //微信公众号appid
                title: _share.title, // 分享标题，默认为活动页面标题（可手动调整）
                desc: _share.desc, //分享活动简介
                link: _share.link, //分享链接
                imgUrl: _share.icon, //分享后朋友看到的图标
            };
            mClient.shareAll(obj);
        })
    } else if (isMsdk()) {
        //msdkShare(_share);
        //msdkShare('{"MsdkMethod":"WGSendToQQ","scene":"2","title":"' + _share.title + '","desc":"' + _share.desc + '","url":"' + _share.link + '"}');
    }
}
function e_code() {
    function show() {
        $.each(arguments, function (k, v) {
            if (v.selector == ".btn_zsggk" || v.selector == ".btn_qwlq") {
                v.css("display", "inline-block");
            } else if (v.selector == ".btn_game") {
                v.css("visibility", "visible");
            } else {
                v.css("display", "block");
            }
        });
    }

    function hide() {
        $.each(arguments, function (k, v) {
            if (v.selector == ".btn_game") {
                v.css("visibility", "hidden");
            } else {
                v.css("display", "none");
            }
        });
    }
    //默认
    var code = milo.request('e_code');
    switch (code) {
        case 'wzryxyx2':
        case 'wzryxyx3':
        case 'wzryxyx6':
        case 'wzryxyx7':
        case 'wzryxyx18':
            hide($("#c_box4,.kv_logo_wx"));
            break;
        case 'wzryxyx19':
            hide($("#c_box3,.kv_logo_djc"));
            break;
        default:
            break;
    }
}
var allGoods = {
    "1835172": ["bx_icon_dkj1y.png", "1元抵扣券（满2元可用）", ""],
    "1835173": ["bx_icon_dkj2y.png", "2元抵扣券（满4元可用）", ""],
    "1835174": ["bx_icon_dkj3y.png", "3元抵扣券（满6元可用）", ""],
    "1835177": ["bx_icon_zs.png", "钻石*20", ""],
    "1835216": ["bx_icon_yhj5y.png", "道聚城5元优惠券", ""],
    "1835218": ["bx_icon_mw.png", "铭文碎片*20", ""],
    "1841968": ["bx_icon_dkj1y.png", "1元抵扣券（满2元可用）", ""],
    "1841969": ["bx_icon_dkj2y.png", "2元抵扣券（满4元可用）", ""],
    "1841970": ["bx_icon_dkj3y.png", "3元抵扣券（满6元可用）", ""],
    "1841971": ["bx_icon_zs.png", "钻石*20", ""],
    "1841972": ["bx_icon_yhj5y.png", "道聚城5元优惠券", ""],
    "1841973": ["bx_icon_mw.png", "铭文碎片*20", ""],

    "1835178": ["icon_xpyxcjj.png", "新品英雄抽奖券*1", ""],
    "1835179": ["icon_zlblb.png", "10战令币礼包*2", ""],
    "1835180": ["icon_xppfcjj.png", "新品皮肤抽奖券*3", ""],
    "1835181": ["icon_pfsp.png", "皮肤碎片*10", ""],
    "1835182": ["icon_jfdbdkj.png", "积分夺宝抵用券*2", ""],
    "1835183": ["icon_ryjf.png", "荣耀积分*140", ""],
    "1835184": ["icon_drj_jyw.png", "狄仁杰-锦衣卫", ""],
    "1835185": ["icon_kt_myjdc.png", "狂铁-命运角斗场", ""],
    "1835186": ["icon_yx_txxm.png", "弈星-踏雪寻梅", ""],
    "1835187": ["icon_zy_hjdj.png", "周瑜-海军大将", ""],
    "1835188": ["icon_sgwe_xzmk.png", "上官婉儿-修竹墨客", ""],
    "1835189": ["icon_ds_jbfyx.png", "盾山-极冰防御线", ""],
    "1835190": ["icon_xq_wsqy.png", "小乔-万圣前夜", ""],
    "1835191": ["icon_wzj_jlgz.png", "王昭君-精灵公主", ""],
    "1835192": ["icon_pfsp.png", "皮肤碎片*28", ""],
    "1835193": ["icon_zgl_zkzl.png", "诸葛亮-掌控之力", ""],
    "1835194": ["icon_dq_shzl.png", "大乔-守护之力", ""],
    "1835195": ["icon_bq_bsss.png", "白起-白色死神", ""],
    "1835196": ["icon_dm_dfmj.png", "达摩-大发明家", ""],
    "1835197": ["icon_cyj_xjlzd.png", "程咬金-星际陆战队", ""],
    "1835198": ["icon_lb_hzld.png", "刘备-汉昭烈帝", ""],
    "1835199": ["icon_dw_hjws.png", "典韦-黄金武士", ""],
    "1835200": ["icon_lp_dyyh.png", "廉颇-地狱岩魂", ""],
    "1835201": ["icon_pfsp.png", "皮肤碎片*48", ""],
    "1835202": ["icon_blsy_tgmy.png", "百里守约-特工魅影", ""],
    "1835203": ["icon_llw_aylsz.png", "兰陵王-暗隐猎兽者", ""],
    "1835204": ["icon_lb_mrjj.png", "吕布-末日机甲", ""],
    "1835205": ["icon_bq_xywz.png", "白起-星夜王子", ""],
    "1835206": ["icon_ak_aymn.png", "阿轲-暗夜猫娘", ""],
    "1835207": ["icon_aql_xlhk.png", "安琪拉-心灵骇客", ""],
    "1835208": ["icon_yz_ayggz.png", "嬴政-暗夜贵公子", ""],
    "1835209": ["icon_mz_lqs.png", "墨子-龙骑士", ""],
    "1835211": ["icon_pfsp.png", "皮肤碎片*88", ""]
};



//跳转道聚城更多活动
function goDJC(){
    need(["biz.login", 'daoju.util', 'daoju.ui.app','biz.widget.dialog'], function (LoginManager, util, app,Dialog) {
        setTimeout(function () {
            if (app.isApp()) {
                location.href = 'tencent-daojucheng://weex?weex_id=42&isShowNav=1&bizCode=yxzj';
            } else {
                var _url = "tencent-daojucheng://weex?weex_id=42&isShowNav=1&bizCode=yxzj";
                if (LoginManager.isWxApp()) {
                    WeixinJSBridge.invoke('launchApplication', {
                        "schemeUrl": _url //原始 scheme 链接
                    }, function (res) {
                        if (res.err_msg == "launchApplication:ok") {
                        } else if (res.err_msg == "launchApplication:fail") {                         
                            Dialog.confirm("请下载掌上道聚城APP参与活动", function () {
                                location.href = location.protocol + "//app.daoju.qq.com/download/all.htm";
                            });
                        }
                    });
                } else {
                    util.getScript("//daoju.qq.com/app/js/url.js", function () {
                        if (milo.browser.android() || milo.browser.ios()) {
                            app.pingUrl(_url, function (b) {
                                if (b) {
                                    location.href = _url;
                                } else {
                                    Dialog.confirm("请下载掌上道聚城APP参与活动", function () {
                                        document.location.href = location.protocol + "//app.daoju.qq.com/download/all.htm";
                                    });
                                }
                            });
                        } else {
                            alert("对不起，目前只支持安卓和ios道聚城app");
                        }
                    });
                }
            }
        }, 500);
    });
}
//优惠券跳转道聚城
function goDJC_yhq() {
    need(["biz.login", 'daoju.util', 'daoju.ui.app','biz.widget.dialog'], function (LoginManager, util, app,Dialog) {
        setTimeout(function () {
            if (app.isApp()) {
                location.href = 'tencent-daojucheng://goods_list?biz=yxzj';
            } else {
                var _url = "tencent-daojucheng://goods_list?biz=yxzj";
                if (LoginManager.isWxApp()) {
                    WeixinJSBridge.invoke('launchApplication', {
                        "schemeUrl": _url //原始 scheme 链接
                    }, function (res) {
                        if (res.err_msg == "launchApplication:ok") {
                        } else if (res.err_msg == "launchApplication:fail") {
                            Dialog.confirm("请下载掌上道聚城APP参与活动", function () {
                                location.href = location.protocol + "//app.daoju.qq.com/download/all.htm";
                            });
                        }
                    });
                } else {
                    util.getScript("//daoju.qq.com/app/js/url.js", function () {
                        if (milo.browser.android() || milo.browser.ios()) {
                            app.pingUrl(_url, function (b) {
                                if (b) {
                                    location.href = _url;
                                } else {
                                    Dialog.confirm("请下载掌上道聚城APP参与活动", function () {
                                        document.location.href = location.protocol + "//app.daoju.qq.com/download/all.htm";
                                    });
                                }
                            });
                        } else {
                            alert("对不起，目前只支持安卓和ios道聚城app");
                        }
                    });
                }
            }
        }, 500);
    });
}