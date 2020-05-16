//设置分享
var _share = {
    "title": "【王者荣耀】春风送福，自选祈福赢史诗皮肤",
    "icon": "https://game.gtimg.cn/images/appdaoju/act/a20200403coming/share.png",
    "desc": "快来参加开感恩宝箱活动；8款史诗皮肤等你选！祈福9次，自选皮肤全部带回家！",
    "link": "https://app.daoju.qq.com/act/a20200403coming/index.htm?plat_support=all" //分享打开地址
};
milo.ready(function () {
    e_code();
    DJC.init();
    setShare(_share);
    TGMobileShare({
        shareTitle: _share.title, //不设置或设置为空时，页面有title，则调取title
        shareDesc: _share.desc, //不设置或设置为空时，页面有Description，则调取Description
        shareImgUrl: _share.icon, //分享图片尺寸200*200，且填写绝对路径
        shareLink: _share.link, //分享链接要跟当前页面同域名(手Q分享有这个要求) ,不设置或设置为空时，默认调取当前URL
        actName: 'a20200403coming' //点击流命名，用于统计分享量，专题一般采用目录名称如a20151029demo
    });
    //进入游戏
    if (isDjcApp()) {
        $(".btn_start").attr('href', "https://app.daoju.qq.com/act/adaoju20170329/index.html?game=yxzj");
        $("#dologout").hide();
    } else {
        $(".btn_start").attr('href', "https://pvp.qq.com/m/m201606/play.shtml");
    }
    need(["daoju.mo", "daoju.util","daoju.mo.bindArea2"], function (mo, util,bindArea2) {
        mo.appid("yxzj", "15411", function (_app_id) { });
        mo.isH5 = location.hostname == "app.daoju.qq.com";
        window.alert = function(msg,call){
            mo.alert(msg,call);
        }
        mo({
            type: "qq,wx", //活动类型，pt登录"pc,h5"，openid登录"qq,wx"，手游内嵌活动"gamein"
            biz: "yxzj", //业务
            iActivityId: "296132", //AMS活动号
            iQueryFlowId: "656963", //查询大区流程号
            iSubmitFlowId: "656962", //绑定大区流程号
            callback: function (bindedInfo, loginall) {
                mo.bindErr(bindedInfo);
                DJC.haveItem();
                DJC.amsExtend5();
                DJC.amsCjHave();
            },
            sData: function (iFlowId) {
                var sData = window["amsCfg_" + iFlowId]["sData"] || {};
                if (typeof mo.bindInfo != "undefined" && typeof mo.bindInfo.iZone) {
                    sData.sPlatId = mo.bindInfo.iPlat; //务必保持字符串
                    sData.sArea = mo.bindInfo.iZone;
                    sData.sPartition = mo.bindInfo.iPartition;
                    sData.sRole = mo.bindInfo.iRole;
                }
                if (mo.source == "wx") {
                    sData.ams_appname = "wx_txyxzs";
                    sData.ams_targetappid = "wx95a3a4d7c627e07d";
                    if (mo.isH5) {
                        if (isDjcApp()) {
                            sData.appid = "wxb406849bf1dd54fc"; //掌上道聚城
                        } else {
                            sData.appid = "wx0afc93bd434b0a41"; //授权登录的appid
                            if (milo.cookie.get("openid") != null) {
                                if (milo.cookie.get("openid").indexOf("oBlfP") != -1) {
                                    sData.appid = "wxf8773b4d31a9a719"; //转换前：王者荣耀公众号
                                } else if (milo.cookie.get("openid").indexOf("oFhrw") != -1) {
                                    sData.appid = "wxf4b1e8a3e9aaf978"; //转换前：王者营地公众号
                                }
                            }
                        }
                    }
                }
                window["amsCfg_" + iFlowId]["sData"] = sData;
            },
            bindArea: function () {
                var acctype = mo.source == "wx" ? "qq" : "weixin";
                var Exclude_ua = isIOS() ? "android" : "ios";
                //排除
                util.channelExclude(acctype, Exclude_ua);
                //amsInit(mo.iActivityId, mo.iSubmitFlowId);
                bindArea2.submit2(mo.biz, mo.iActivityId, mo.iSubmitFlowId, mo.iQueryFlowId);
            },
            bindErr: function (bindedInfo) {
                if ((bindedInfo.Farea == "1" || bindedInfo.Farea == "3") && isIOS()) {
                    alert('亲爱的用户，您当前账号绑定的是安卓区服，请更改为IOS区服再参与活动哦', function () {
                        mo.bindArea();
                    })
                    mo.return = true;
                    return;
                }
                if ((bindedInfo.Farea == "2" || bindedInfo.Farea == "4") && !isIOS()) {
                    alert('亲爱的用户，您当前账号绑定的是IOS区服，请更改为安卓区服再参与活动哦', function () {
                        mo.bindArea();
                    })
                    mo.return = true;
                    return;
                }
                if (typeof mo.partition != "undefined" && mo.partition != bindedInfo.FPartition) {
                    location.reload(true);
                    return;
                }
                mo.partition = bindedInfo.FPartition;
            }
        });
    });
});

var DJC = {
    //初始化
    init: function () {
        var pid1 = [1835184, 1835185, 1835186, 1835187, 1835188, 1835189, 1835190, 1835191, 1835192];//热门
        var pid2 = [1835193, 1835194, 1835195, 1835196, 1835197, 1835198, 1835199, 1835200, 1835201];//勇者
        var pid3 = [1835202, 1835203, 1835204, 1835205, 1835206, 1835207, 1835208, 1835209, 1835211];//史诗
        $.each(pid1, function (k, v) {
            $(".pf_list3 ul li").eq(k).attr("data-pid", v);
        })
        $.each(pid2, function (k, v) {
            $(".pf_list2 ul li").eq(k).attr("data-pid", v);
        })
        $.each(pid3, function (k, v) {
            $(".pf_list1 ul li").eq(k).attr("data-pid", v);
        })
    },
    //查询已拥有和已领取
    haveItem: function () {
        D.mo.amsSubmit2(296132, 657540, {
            "sNeedSubmitPopDiv": false,
            success: function (res) {
                //判断领取
                var res4 = res.sOutValue4.split(",");
                if (res4[0] >= 1) {
                    $("#amsLq_login").addClass("btn_hui").attr("href", "javascript:alert('抱歉，限领取1次，您已领取过了。')");
                }
                if (res4[1] >= 1) {
                    $("#amsLq_djc").addClass("btn_hui").attr("href", "javascript:alert('抱歉，限领取1次，您已领取过了。')");
                }
                if (res4[2] >= 1) {
                    $("#amsLq_zf").addClass("btn_hui").attr("href", "javascript:alert('抱歉，限领取1次，您已领取过了。')");
                }
                //判断热门皮肤
                var res1 = res.sOutValue1.split(",");
                $.each(res1, function (k, v) {
                    if (v >= 1) {
                        $(".pf_list3 ul li").eq(k).addClass("on");
                    }
                })
                //判断勇者皮肤
                var res2 = res.sOutValue2.split(",");
                $.each(res2, function (k, v) {
                    if (v >= 1) {
                        $(".pf_list2 ul li").eq(k).addClass("on");
                    }
                })
                //判断史诗皮肤
                var res3 = res.sOutValue3.split(",");
                $.each(res3, function (k, v) {
                    if (v >= 1) {
                        $(".pf_list1 ul li").eq(k).addClass("on");
                    }
                })

                DJC.jiFen(1);
            },
            failure:function(){
                DJC.jiFen(1);
            }
        });
    },
    //查询积分
    jiFen: function (a) {
        setTimeout(function () {
            D.mo.amsSubmit2(296132, 657955, {
                "sNeedSubmitPopDiv": false,
                success: function (res) {
                    var res2 = res.sOutValue2.split(",");
                    $(".jf_462").html(res2[0]);
                   
                    var btn_hui = true;
                    $("#amsLq a").each(function(){
                        if(!$(this).hasClass("btn_hui")){
                            btn_hui = false;
                        }
                    })

                    if (res2[0] == 0 && btn_hui) {
                        var arr = $('.wrap_content').find('.boxarr').toArray();// 把三个div放进数组里面
                        var temp;
                        // 1 3对调
                        temp = arr[1];
                        arr[1] = arr[0];
                        arr[0] = temp;
                        $('.wrap_content').html(arr);
                    }
                    //需要祈福券
                    var res3 = res.sOutValue3;
                    var needNumArr = [2, 4, 6, 8, 10, 12, 24, 40, 64];
                    var needpriceArr = [2, 4, 6, 8, 10, 12, 24, 40, 64];
                    var hjueArr = [1, 2, 3, 4, 5, 6, 12, 20, 32];
                    if (res3 == 9) {
                        //已结束
                        $(".pf_t1").html("");
                        $("#begain_ams").attr("href", "javascript:alert('奖池道具已全部获得。');");
                    } else {
                        $(".pf_t1 .needNum").html(needNumArr[res3] + "张");
                        $(".pf_t1 .haveNum").html(res.sOutValue1 + "张");
                        //购买or抽奖
                        if (res.sOutValue1 >= needNumArr[res3]) {
                            $("#begain_ams").attr("href", "javascript:DJC.amsZxCj();");
                        } else {
                            //购买
                            var isDq = function () {
                                return !isIOS() && D.mo.isH5
                            };
                            var _text = isDq() ? "元" : "点券";
                            var _price = isDq() ? needpriceArr[res3] : needpriceArr[res3] * 10;
                            $(".qfj_btn1_txt1 .hjueNum").html(hjueArr[res3]);
                            $(".qfj_btn1_txt1 .qfqNum").html(needNumArr[res3]);
                            $(".qfj_btn1_txt2").html(_price + "<br>" + _text);
                            $("#begain_ams").attr("href", "javascript:amsBuyTips();");

                            //折扣券显示
                            $("#qfj_yhjzk,#qfj_yhjzk .qfj_yhjzk p").hide();
                            $(".check_input").prop("checked", false);
                            if (res2[1] >= 1 || res2[2] >= 1 || res2[3] >= 1) {
                                $("#qfj_yhjzk").show();
                                var maxPrice = [];
                                if (res2[3] >= 1) {
                                    $("#qfj_yhjzk .qfj_yhjzk p").eq(0).show();
                                    maxPrice.push(6);
                                }
                                if (res2[2] >= 1) {
                                    $("#qfj_yhjzk .qfj_yhjzk p").eq(1).show();
                                    maxPrice.push(4);
                                }
                                if (res2[1] >= 1) {
                                    $("#qfj_yhjzk .qfj_yhjzk p").eq(2).show();
                                    maxPrice.push(2);
                                }
                                if (maxPrice.length >= 1) {
                                    var _maxPrice = [];
                                    $.each(maxPrice, function (k, v) {
                                        if (needpriceArr[res3] >= v) {
                                            _maxPrice.push(v);
                                        }
                                    })
                                    if (_maxPrice.length == 0) {
                                        var maxNum = Math.min.apply(null, maxPrice);
                                        $(".check_input").prop("checked", false);
                                    } else {
                                        var maxNum = Math.max.apply(null, _maxPrice);
                                        $(".check_input").prop("checked", true);
                                        D.mo._maxPrice = maxNum;
                                    }
                                    if (maxNum == 6) {
                                        c1();
                                    } else if (maxNum == 4) {
                                        c2();
                                    } else {
                                        c3();
                                    }
                                }
                            }
                        }
                    }


                }
            });
        }, a || 2000);
    },
    //查询自选道具
    amsExtend5: function () {
        D.mo.amsSubmit2(296132, 658143, {
            "sNeedSubmitPopDiv": false,
            success: function (res) {
                var res1 = decodeURIComponent(res.sOutValue1).split(",");
                console.log(res1);
                $.each(res1.reverse(), function (k, v) {
                    var _class = '[data-pid="' + v + '"]';
                    var _img = $(_class).find("img").attr("src");
                    var _name = $(_class).find(".pf_iconname").html();
                    $(_class).addClass("act");
                    $("#pifu li").eq(k).attr("data-id", v);
                    $("#pifu li").eq(k).find("img").attr("src", _img);
                    $("#pifu li").eq(k).find(".pf_proname").html(_name);
                })
                DJC.sel_dj = false;
            },
            failure: function (res) {
                console.log(res);
                DJC.sel_dj = true;
            }
        });
    },
    //登录页面领取
    amsLq_login: function () {
        if(D.mo.return){
            D.mo.bindArea();
            return;
        }
        D.mo.amsSubmit(296132, 656964, {
            success: function (res) {
                alert("恭喜获得了：" + res.sPackageName);
                $("#amsLq_login").addClass("btn_hui").attr("href", "javascript:alert('抱歉，限领取1次，您已领取过了。')");
                DJC.jiFen();
            }
        });
    },
    //道聚城领取
    amsLq_djc: function () {
        if(D.mo.return){
            D.mo.bindArea();
            return;
        }
        D.mo.isApp({
            url: location.href,
            callback: function () {
                D.mo.amsSubmit(296132, 656973, {
                    success: function (res) {
                        alert("恭喜获得了：" + res.sPackageName);
                        $("#amsLq_djc").addClass("btn_hui").attr("href", "javascript:alert('抱歉，限领取1次，您已领取过了。')");
                        DJC.jiFen();
                    }
                });
            }
        })
    },
    //转发领取
    amsLq_zf: function () {
        if(D.mo.return){
            D.mo.bindArea();
            return;
        }
        D.mo.sendShare();
        setTimeout(function () {
            D.mo.amsSubmit(296132, 656974, {
                success: function (res) {
                    alert("恭喜获得了：" + res.sPackageName);
                    $("#amsLq_zf").addClass("btn_hui").attr("href", "javascript:alert('抱歉，限领取1次，您已领取过了。')");
                    DJC.jiFen();
                },
                failure: function (res) {

                }
            });
        }, 5000)
    },
    //开箱
    openBox: function () {
        if(D.mo.return){
            D.mo.bindArea();
            return;
        }
        D.mo.amsSubmit(296132, 656975, {
            success: function (res) {
                var obj = tenResult(res.iPackageIdCnt, res.sPackageName);
                var msg = "";
                var id = "";
                $.each(obj, function (k, v) {
                    if (v.id != "1845171") {
                        msg = v.name;
                        id = v.id;
                    }
                })
                if (id == "1835216" || id == "1841972") {
                    showDia('pop1');
                } else {
                    $("#pop4 .cj_icon img").attr("src", "//game.gtimg.cn/images/appdaoju/act/a20200403coming/" + allGoods[id][0]);
                    $("#pop4 .cj_iconname").html(msg);
                    $("#pop4 .t3").hide();
                    showDia('pop4');
                }
                DJC.jiFen();
            }
        });
    },
    //选择道具
    amsSetDj: function () {
        closeDia();
        if(D.mo.return){
            D.mo.bindArea();
            return;
        }
        var pid = [];
        $(".pf_list .act").each(function () {
            pid.push($(this).attr("data-pid"));
        })
        if (pid.length != 3) {
            alert("有皮肤未选择。");
            return;
        }
        D.mo.amsSubmit(296132, 657776, {
            sData: {
                iPackageIdarr: pid.reverse().join("_")//注意传入的顺序
            },
            success: function (res) {
                //alert(res.sMsg);
                DJC.amsExtend5();
            }
        });
    },
    //购买
    amsBuy: function () {
        closeDia();
        if(D.mo.return){
            D.mo.bindArea();
            return;
        }
        if (!isIOS() && D.mo.isH5) {
            if (!$(".check_input").prop("checked")) {
                amsCfg_657104 = {
                    '_everyRead': true,
                    'sData': {
                        "_app_id": D.mo._app_id,
                        "jifen_channel": 463,
                        "jifen_amount": 0
                    },
                    'iActivityId': '296132',
                    'iFlowId': '657104',
                    'fFlowSubmitEnd': function (res) {
                        if (res.jData.ret == "-905") {
                            alert("亲爱的玩家，您有一笔订单冻结中，请15分钟后再试！");
                            return;
                        }
                        need(["ams.daoju_buy_v2.daoju_buy_v2"], function (DaojuBuy) {
                            var option = {
                                onPaySuccess: function () {
                                    DJC.jiFen();
                                    //alert("购买成功，游戏虚拟道具将以邮件形式发放，将会在24小时内到账，祈福券可能会稍有延迟，请稍微等待一会哦~");
                                }, //支付成功后回调方法
                                onPayClose: function () {
                                    location.reload(true);
                                } //关闭支付页面回调方法
                            };
                            DaojuBuy.pay(res.jData, option);
                        });
                    },
                    'fFlowSubmitFailed': function (res) {
                        alert(res.sMsg);
                    }
                };
                D.mo.amsSubmit(296132, 657104);
            } else {
                var jfid = $("#qfj_yhjzk .qfj_yhj_txt p").attr("data-jf");
                var jfMax = {
                    "463": 2,
                    "464": 4,
                    "465": 6
                };
                var jifen_amount = {
                    "463": 1,
                    "464": 2,
                    "465": 3
                };
                if (!D.mo._maxPrice || D.mo._maxPrice < jfMax[jfid]) {
                    alert("抱歉，抵扣券不满足使用条件。");
                    return;
                }
                amsCfg_658209 = {
                    '_everyRead': true,
                    'sData': {
                        "_app_id": D.mo._app_id,
                        "jifen_channel": jfid,
                        "jifen_amount": jifen_amount[jfid]
                    },
                    'iActivityId': '296132',
                    'iFlowId': '658209',
                    'fFlowSubmitEnd': function (res) {
                        if (res.jData.ret == "-905") {
                            alert("亲爱的玩家，您有一笔订单冻结中，请15分钟后再试！");
                            return;
                        }
                        need(["ams.daoju_buy_v2.daoju_buy_v2"], function (DaojuBuy) {
                            var option = {
                                onPaySuccess: function () {
                                    DJC.jiFen();
                                    //alert("购买成功，游戏虚拟道具将以邮件形式发放，将会在24小时内到账，祈福券可能会稍有延迟，请稍微等待一会哦~");
                                }, //支付成功后回调方法
                                onPayClose: function () {
                                    location.reload(true);
                                } //关闭支付页面回调方法
                            };
                            DaojuBuy.pay(res.jData, option);
                        });
                    },
                    'fFlowSubmitFailed': function (res) {
                        alert(res.sMsg);
                    }
                };
                D.mo.amsSubmit(296132, 658209);
            }
        } else {
            //点券支付
            if (!$(".check_input").prop("checked")) {
                amsCfg_657104 = {
                    '_everyRead': true,
                    'sData': {
                        "_app_id": D.mo._app_id,
                        "paytype": 1,
                        "jifen_channel": 463,
                        "jifen_amount": 0
                    },
                    'iActivityId': '296132',
                    'iFlowId': '657104',
                    'fFlowSubmitEnd': function (res) {
                        if (res.jData.ret == "0") {
                            DJC.jiFen();
                            //alert("购买成功，游戏虚拟道具将以邮件形式发放，将会在24小时内到账，祈福券可能会稍有延迟，请稍微等待一会哦~");
                        } else {
                            if (res.jData.msg.indexOf("余额不足") != -1) {
                                alert("您当前的点券余额不足， 请先充值再参与活动哦！");
                            } else {
                                if (res.jData.ret == "-905") {
                                    alert("亲爱的玩家，您在游戏外有一笔订单使用了抵扣券但尚未支付完成，请先在游戏外完成支付！");
                                } else {
                                    alert(res.jData.msg);
                                }
                            }
                        }
                    },
                    'fFlowSubmitFailed': function (res) {
                        alert(res.sMsg);
                    }
                };
                commConfrim("确定使用点券支付吗？", function () {
                    D.mo.amsSubmit(296132, 657104);
                });
            } else {
                var jfid = $("#qfj_yhjzk .qfj_yhj_txt p").attr("data-jf");
                var jfMax = {
                    "463": 2,
                    "464": 4,
                    "465": 6
                }
                var jifen_amount = {
                    "463": 1,
                    "464": 2,
                    "465": 3
                };
                if (!D.mo._maxPrice || D.mo._maxPrice < jfMax[jfid]) {
                    alert("抱歉，抵扣券不满足使用条件。");
                    return;
                }
                amsCfg_658209 = {
                    '_everyRead': true,
                    'sData': {
                        "_app_id": D.mo._app_id,
                        "paytype": 1,
                        "jifen_channel": jfid,
                        "jifen_amount": jifen_amount[jfid]
                    },
                    'iActivityId': '296132',
                    'iFlowId': '658209',
                    'fFlowSubmitEnd': function (res) {
                        if (res.jData.ret == "0") {
                            DJC.jiFen();
                            //alert("购买成功，游戏虚拟道具将以邮件形式发放，将会在24小时内到账，祈福券可能会稍有延迟，请稍微等待一会哦~");
                        } else {
                            if (res.jData.msg.indexOf("余额不足") != -1) {
                                alert("您当前的点券余额不足， 请先充值再参与活动哦！");
                            } else {
                                if (res.jData.ret == "-905") {
                                    alert("亲爱的玩家，您在游戏外有一笔订单使用了抵扣券但尚未支付完成，请先在游戏外完成支付！");
                                } else {
                                    alert(res.jData.msg);
                                }
                            }
                        }
                    },
                    'fFlowSubmitFailed': function (res) {
                        alert(res.sMsg);
                    }
                };
                var jftext = {
                    "463": "本次支付将使用1元抵扣券，确定使用点券支付吗？",
                    "464": "本次支付将使用2元抵扣券，确定使用点券支付吗？",
                    "465": "本次支付将使用3元抵扣券，确定使用点券支付吗？"
                };
                commConfrim(jftext[jfid], function () {
                    D.mo.amsSubmit(296132, 658209);
                });
            }
        }
    },
    //祈福抽奖
    amsZxCj: function () {
        if(D.mo.return){
            D.mo.bindArea();
            return;
        }
        D.mo.amsSubmit(296132, 657916, {
            success: function (res) {
                var obj = tenResult(res.iPackageIdCnt, res.sPackageName);
                var msg = "";
                var id = "";
                $.each(obj, function (k, v) {
                    if (v.id != "1845171") {
                        id = v.id;
                        msg = v.name;
                        var _class = '[data-id="' + v.id + '"]';
                        $(_class).addClass("act");
                    }
                })
                $("#pop4 .cj_icon img").attr("src", "//game.gtimg.cn/images/appdaoju/act/a20200403coming/" + allGoods[id][0]);
                $("#pop4 .cj_iconname").html(msg);
                $("#pop4 .t3").show();
                showDia('pop4');
                DJC.jiFen(1);
            }
        });
    },
    //礼包记录
    div_my_box: function () {
        if(D.mo.return){
            D.mo.bindArea();
            return;
        }
        amsCfg_656965 = {
            'iAMSActivityId': '296132', // AMS活动号
            'iLotteryFlowId': '656965', //  查询获奖轮播的流程号
            'activityId': '340953', // 模块实例号
            'contentId': 'getGiftContent_656965', //容器ID
            'templateId': 'getGiftTemplate_656965', //模板ID
            'contentPageId': 'getGiftPageContent_656965',	//分页容器ID
            'showContentId': '', //弹出层ID
            'pageSize': 5, //默认是10条,
            'isForce': true
        };
        D.mo.amsSubmit(296132, 656965);
        setTimeout(function () {
            showDia('pop5');
        }, 1000)
    },
    //抽奖已获得道具
    amsCjHave: function () {
        D.mo.amsSubmit(296132, 658281, {
            success: function (res) {
                if (res.sOutValue1 != "") {
                    var obj = res.sOutValue1.split(",");
                    $.each(obj, function (k, v) {
                        var _class = '[data-id="' + v + '"]';
                        $(_class).addClass("act");
                    })
                }
            },
            failure: function (res) {

            }
        });
    },
    share: function () {
        D.mo.setShare(_share);
        D.mo.sendShare(_share);
        //setShare();
    }
}

//购买前提示
function amsBuyTips() {
    if(D.mo.return){
        D.mo.bindArea();
        return;
    }
    if (DJC.sel_dj) {
        alert("抱歉，请先选择心仪皮肤。");
        return;
    }
    showDia('pop2');
}




