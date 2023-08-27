// ==UserScript==
// @name         zcy的论坛签到脚本
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  52破解,瑞克论坛,三通it论坛等签到,回贴,摇奖
// @author       zcy
// @match        *://www.santongit.com/*
// @match        *://www.52pojie.cn/*
// @match        *://www.ruike1.com/*
// @include      *://1*8.17*.1*.2*4/*
// @grant        none
// ==/UserScript==

(() => {
    function _(selector) {
        return document.querySelector(selector);
    }

    const $ = {
        web_save_data_key: "zcy_auto_sign_v0.3",
        webs_info: {
            common: {
                common_fetch_options: {
                    "headers": {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "accept-language": "zh-CN,zh;q=0.9",
                        "cache-control": "no-cache",
                        "content-type": "application/x-www-form-urlencoded",
                        "pragma": "no-cache",
                        "upgrade-insecure-requests": "1"
                    },
                    "referrer": "",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": "",
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }
            },
            pojie: {
                host: 'www.52pojie.cn',
                selector: {
                    formhash: "#um > p:nth-child(2) > a:last-child",
                    reply_list: ""
                },
                reply_url: "",
                sign: {
                    url: "https://www.52pojie.cn/home.php?mod=task&do=apply&id=2&referer=%2F",
                    body: "",
                },
                fetch_body_message: [],
            },
            santongit: {
                host: 'www.santongit.com',
                selector: {
                    formhash: `#nv_forum > div.cl.login-info-wrap > div > div > div.y > div > a:nth-child(7)`,
                    reply_list: ""
                },
                reply: {
                    url: "http://www.santongit.com/forum.php?mod=post&action=reply&tid={tid}&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost&inajax=1",
                    scope: [3, 30],
                    reply_count: 5,
                    second: 20,//秒
                    selector: "#category_ > table > tbody > tr.fl_row > td:nth-child({scope1}) > div > div:nth-child({scope2}) > a",
                    verify: "succeedhandle_fastpost",
                    body: {
                        content: "message={message}&posttime={posttime}&formhash={formhash}&usesig=1&subject=++",
                        messages: [`%B7%C7%B3%A3%B0%F4%B5%C4it%C2%DB%CC%B3%A3%AC%C3%BF%CC%EC%C0%B4%D1%A7%CF%B0%D0%C2%BC%BC%CA%F5`, `%B7%C7%B3%A3%B8%D0%D0%BB%C2%A5%D6%F7%B5%C4%CE%DE%CB%BD%B7%EE%CF%D7%21%21%21`, `%C2%A5%D6%F7%B7%D6%CF%ED%B5%C4%D0%C5%CF%A2%BA%DC%D3%D0%D3%C3.%D4%DA%B4%CB%B8%D0%D0%BB%C1%CB%21%21%21`]
                    },
                    options: {
                        "headers": {
                            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "accept-language": "zh-CN,zh;q=0.9",
                            "cache-control": "no-cache",
                            "content-type": "application/x-www-form-urlencoded",
                            "pragma": "no-cache",
                            "upgrade-insecure-requests": "1"
                        },
                        "referrer": "",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": "",
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }
                },
                sign: {
                    url: "http://www.santongit.com/plugin.php?id=ljdaka:daka&action=msg",
                    // url: "http://www.santongit.com/plugin.php?id=ljdaka:daka&action=tips&formhash={formhash}&rid=1&small=2&money=2&infloat=yes&handlekey=tips&inajax=1&ajaxtarget=fwin_content_tips",
                    body: "formhash={formhash}&cont2=%C7%A9%B5%BD%C7%E1%C7%E1%CB%C9%CB%C9%C4%C3%BD%F0%B1%D2%E0%B6%A3%AC%CD%DB%BF%A8%BF%A8%A3%A1&cont1=%BF%AA%D0%C4",
                    verify: `parent.window.showWindow`
                },
                yj: {
                    url: "http://www.santongit.com/plugin.php?id=yinxingfei_zzza:yinxingfei_zzza_post",
                    options: {
                        "headers": {
                            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "accept-language": "zh-CN,zh;q=0.9",
                            "cache-control": "no-cache",
                            "content-type": "application/x-www-form-urlencoded",
                            "pragma": "no-cache",
                            "upgrade-insecure-requests": "1"
                        },
                        "referrer": "http://www.santongit.com/plugin.php?id=yinxingfei_zzza:yinxingfei_zzza_hall",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": "formhash={formhash}",
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }
                }
            },
            ruike1: {
                host: 'www.ruike1.com',
                selector: {
                    formhash: `#um > p:nth-child(2) > a:nth-child(13)`,
                    reply_list: ""
                },
                reply: {
                    url: "https://www.ruike1.com/forum.php?mod=post&infloat=yes&action=reply&extra=page%3D1&tid={tid}&replysubmit=yes&inajax=1",
                    scope: [4, 10],
                    reply_count: 2,
                    second: 20,//秒
                    selector: "#category_ > table > tbody > tr.fl_row > td:nth-child({scope1}) > div > div:nth-child({scope2}) > a",
                    verify: "succeedhandle_reply",
                    body: {
                        content: "formhash={formhash}&handlekey=reply&noticeauthor=&noticetrimstr=&noticeauthormsg=&usesig=1&subject=&message={message}",
                        messages: [`+%C7%BF%C1%D2%D6%A7%B3%D6%C2%A5%D6%F7ing%A1%AD%A1%AD`]
                    },
                    options: {
                        "headers": {
                            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "accept-language": "zh-CN,zh;q=0.9",
                            "cache-control": "no-cache",
                            "content-type": "application/x-www-form-urlencoded",
                            "pragma": "no-cache",
                            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "\"Windows\"",
                            "sec-fetch-dest": "iframe",
                            "sec-fetch-mode": "navigate",
                            "sec-fetch-site": "same-origin",
                            "sec-fetch-user": "?1",
                            "upgrade-insecure-requests": "1"
                        },
                        "referrer": "",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": "",
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }
                },
                sign: {
                    url: "https://www.ruike1.com/k_misign-sign.html?operation=qiandao&format=global_usernav_extra&formhash={formhash}",
                    body: "",
                    verify: `<root><![CDATA[今日已签]]></root>`
                },
            },
        },
        webs_save_info: ['today', 'is_sign', 'replied_count', 'is_replied', 'is_yj', 'reply_timestamp'],
        webs_host: {
            "pojie": "www.52pojie.cn",
            "santongit": "www.santongit.com",
            "ruike1": "www.ruike1.com",
        },

        web_formhash: "",
        web_name: "",
        // 类似于 http://www.santongit.com/
        web_host: "",

        web_today: "",
        web_is_sign: false,
        web_is_replied: false,
        web_is_yj: false,
        web_replied_count: 0,
        web_reply_timestamp: 0,

        web_save_data: {},
        web_reply_count: 4,
        // 获取的回贴列表 tid中的数值一一对应于url的值
        web_reply_list: { tid: [], url: [] },
        web_referrer: "",
        web_is_homepage: false,
        web_reply_url: "",

        $_$: null
    };

    class $_$ {
        set_web_reply_url_and_web_referrer(index) {
            let tid = $.web_reply_list.tid[index];
            $.web_reply_url = $.webs_info[$.web_name].reply.url.replace('{tid}', tid);
            $.web_referrer = $.web_reply_list.url[index];
        }

        set_web_formhash() {
            const obj = _($.webs_info[$.web_name].selector.formhash);
            (obj && obj.innerHTML === "退出") && ($.web_formhash = obj.href.slice(obj.href.search("formhash") + 9));
        }

        set_webs_host() {
            for (const key in $.webs_info) {
                key === "common" || ($.webs_host[key] = $.webs_info[key].host);
            }
        }

        g({ key }) {
            // 从存储中获取
            const save_data = JSON.parse(localStorage.getItem($.web_save_data_key));
            if (key) {
                return save_data[$.web_name][key];
            }
            return save_data;

            // 从$中获取(以下代码不可能执行)
            if (key) {
                return $["web_" + key];
            }
            return {};
        }

        s({ data, key }) {
            // 如果没有提供key,直接保存数据;如果提供了key,侧先修改其值再保存数据
            key !== undefined && ($.web_save_data[$.web_name][key] = data);
            localStorage.setItem($.web_save_data_key, JSON.stringify($.web_save_data));
            $["web_" + key] = data;
            // 每次保存数据时,更新一下$中对应的数据
            this.do_save_data();
        }


        // 处理本地存储数据
        do_save_data() {
            const web_name = $.web_name;
            $.web_save_data = this.g({}) ? this.g({}) : {};

            if (Object.keys($.web_save_data).length === 0 || new Date($.web_save_data[web_name]['today']).toDateString() !== new Date().toDateString()) {
                $.web_save_data[web_name] = {};
                // 都写了这么多代码了,还不如不用for,一条一条的搞
                for (let i = 0; i < $.webs_save_info.length; i++) {
                    ($.webs_save_info[i].indexOf('today') !== -1) && ($.web_save_data[web_name][$.webs_save_info[i]] = new Date().toDateString());
                    ($.webs_save_info[i].indexOf('is') !== -1) && ($.web_save_data[web_name][$.webs_save_info[i]] = false);
                    ($.webs_save_info[i].indexOf('count') !== -1) && ($.web_save_data[web_name][$.webs_save_info[i]] = 0);
                    // 针对非 三通 的网站 ,不需要is_yj
                    $.web_name === 'santongit' || delete $.web_save_data[web_name].is_yj;
                    ($.webs_save_info[i].indexOf('reply_timestamp') !== -1) && ($.web_save_data[web_name][$.webs_save_info[i]] = 0);
                }
                this.s({});
            }
            $.web_today = $.web_save_data[web_name].today;
            $.web_is_yj = $.web_save_data[web_name].is_yj ?? false;
            $.web_is_sign = $.web_save_data[web_name].is_sign;
            $.web_is_replied = $.web_save_data[web_name].is_replied;
            $.web_replied_count = $.web_save_data[web_name].replied_count;
            $.web_reply_timestamp = $.web_save_data[web_name].reply_timestamp;
        }

        init() {
            const hostname = location.hostname;
            const pathname = location.pathname;
            this.set_webs_host();
            for (const key in $.webs_host) {
                $.webs_host[key] === hostname && ($.web_name = key);//设置web_name
            }
            $.web_is_homepage = pathname === "/" || pathname === "/forum.php";
            this.set_web_formhash();
            this.do_save_data();
            $.web_host = location.origin;
        }

        async delay(second) {
            // 等待second秒
            await new Promise((resolve) => {
                setTimeout(resolve, second === undefined ? 0 : second);
            });
        }

        random(num) {
            return Math.floor(Math.random() * num + 1);
        }


        async fetch({ url, options }) {
            let res;
            res = await fetch(url, options === undefined ? {} : options);
            let buffer = await res.arrayBuffer();
            const decoder = new TextDecoder("gbk");
            return decoder.decode(buffer);
        }

        get_options({ type }) {
            let options = $.web_name === 'ruike1' ? $.webs_info[$.web_name].reply.options : $.webs_info.common.common_fetch_options;
            if (type === "reply") {
                // 使用贴子的地址
                options.referrer = $.web_referrer;
                const messages = $.webs_info[$.web_name].reply.body.messages;
                const message = messages[this.random(messages.length) - 1];
                let content = $.webs_info[$.web_name].reply.body.content;
                content = content.replace("{message}", message);
                content = content.replace("{posttime}", Date.now().toString());
                content = content.replace("{formhash}", $.web_formhash);
                options.body = content;
            }
            if (type === "sign") {
                // 使用主页地址
                options.referrer = $.web_host;
                let body = $.webs_info[$.web_name].sign.body;
                body = body.replace("{formhash}", $.web_formhash);
                options.body = body;
            }
            return options;
        }

        async sign_helper(step) {
            switch ($.web_name) {
                case "santongit":
                    // 签到弹框出现会有延迟
                    let count = 100;
                    let node_santong = null;
                    await this.delay(2 * 1000);
                    while (true) {
                        if (count === 0) break;
                        count--;
                        node_santong = _("#evy_chk > h3");
                        if (node_santong) {
                            break;
                        } else {
                            continue;
                        }
                    }
                    if (step) {
                        node_santong.innerHTML = "签到中。。。。。。";
                        node_santong.style.fontSize = "30px";
                    } else {
                        _("#checkin_btn_close")?.click();// 关闭三通的签到弹框
                    }
                    break;
                case "ruike1":
                    let node_ruike1 = _("#k_misign_topb");
                    console.log(node_ruike1);
                    if (step) {

                    } else {
                        node_ruike1.innerHTML = "今日已签"// ruike1
                    }
                    break;
                case "other_web":
                    let node_otherWeb = _("#um > p:nth-child(2) > a:nth-child(14) > font")
                    if (step) {
                        node_otherWeb.innerHTML = "签到中。。。"
                    } else {
                        node_otherWeb.style.display = "none"// 隐藏other的“点击签到”
                        _("#um > p:nth-child(2) > span:nth-child(15)").style.display = "none"// 隐藏other的“|”
                    }
                    break;
                default:
            }
        }

        async sign() {
            console.log("开始签到》》》》》》》》》》》》》》》》");
            let url = $.webs_info[$.web_name].sign.url;
            url = url.replace("{formhash}", $.web_formhash);
            await this.sign_helper(true);
            let text = await this.fetch({ url: url, options: this.get_options({ type: "sign" }) });
            text.indexOf($.webs_info[$.web_name].sign.verify) !== -1 && (this.s({
                data: true,
                key: 'is_sign'
            }), this.sign_helper());
            console.log($.web_name + "签到结果: ", text);
        }

        set_reply_tid_list() {
            let scope = $.webs_info[$.web_name].reply.scope;
            let count = 0;
            while (true) {
                if (count === $.web_reply_count) break;
                let selector = $.webs_info[$.web_name].reply.selector;
                selector = selector.replace("{scope1}", this.random(scope[0]).toString());
                selector = selector.replace("{scope2}", this.random(scope[1]).toString());

                let href = _(selector)?.href;
                let num = href.split("-")[1];
                // 排除重复
                // 可能列表中的文章数不够reply_count
                if ($.web_reply_list.tid.indexOf(num) === -1) {
                    count++;
                    $.web_reply_list.tid.push(num);
                    $.web_reply_list.url.push(href);
                }
            }
        }

        async reply({ second, callback }) {
            if ($.web_is_replied) return;
            this.set_reply_tid_list();

            let j = 0;
            // 当前还有未回贴的次数
            let count = $.web_reply_count - $.web_replied_count;
            let num = $.web_replied_count;
            while (true) {
                if (count <= 0) {
                    this.s({ data: true, key: 'is_replied' });
                    break;
                }
                // 每次循环都设置一下回贴址
                this.set_web_reply_url_and_web_referrer(j);
                let options = this.get_options({ type: "reply" });
                let text = await this.fetch({ url: $.web_reply_url, options: options });
                // 请求完成结果满足verify,则保存replied_count
                if (text.indexOf($.webs_info[$.web_name].reply.verify) !== -1) {
                    count--;
                    j++;
                    this.s({ data: ++num, key: 'replied_count' });
                }
                // 调用其处理函数,并传递text
                await $.webs_info[$.web_name].reply.callback?.(text);

                console.log($.web_name + `成功回复一次,总次数: ${$.web_reply_count} | 完成数: ${$.web_replied_count}`, options.referrer);

                await this.delay(second);
                //完成指定的回贴次数后,保存数据
                if (count === 0) {
                    console.log(`${$.web_name} 回贴完成了.总次数: ${$.web_reply_count} | 完成数: ${$.web_replied_count} || count: ${count}`);
                }
            }
        }

        async yj() {
            const url = $.webs_info[$.web_name].yj.url;
            let options = $.webs_info.common.common_fetch_options;
            // options.body = options.body.replace("{formhash}", $.web_formhash);
            options.body = "formhash=" + $.web_formhash;
            let text = await this.fetch({ url: url, options: options });
            if (text.indexOf("已经摇过，明天再来看看吧") > -1) {
                console.log("三通it摇奖结果:o▬▬◙▆▆▆▆▆▆▆▆▆▆▆▆◤ ", text);
                this.s({ data: true, key: 'is_yj' });
            }
        }

        constructor() {
            this.init();
            // 如果没有formhash 不用进行下一步
            if (!$.web_formhash) return;
        }


    }

    let web = ((exports) => {
        async function run() {
            let $_$ = $.$_$;
            console.log($);
            if ($.web_name === "pojie") {
                pojie();
                return;
            }
            const second = $.webs_info[$.web_name].reply.second * 1000;
            $.web_reply_count = $.webs_info[$.web_name].reply.reply_count;
            // 1.签到
            !$.web_is_sign && $.web_is_homepage && $_$.sign();
            // 2.自动回贴
            !$.web_is_replied && $.web_is_homepage && await $_$.reply({ second: second });
            // 3.自动摇奖(三通it)
            $.web_name === 'santongit' && $.web_is_homepage && $.web_is_replied && !$.web_is_yj && $_$.yj();
        }

        function pojie() {
            console.log("这里是52破解");

            show();
            !$.web_is_sign && $.web_is_homepage && sign_by_iframe();

            function sign_by_iframe() {
                const messagetext = document.querySelector("#messagetext");
                if (messagetext) {
                    messagetext.innerHTML = '';
                }

                function saveDate() {
                    localStorage.setItem('autoSign', new Date().toDateString());
                }

                function isTody() {
                    var lastSignDate = localStorage.getItem('autoSign');
                    if (lastSignDate) {
                        return new Date(lastSignDate).toDateString() === new Date().toDateString();
                    } else {
                        return false;
                    }
                }

                let s = {
                    a: "正在自动签到...",
                    b: "本期您已申请过此任务",
                    c: "您已经签到了!",
                    d: "任务已完成",
                    f: "签到成功!",
                    g: "签到失败!",
                    h: '<img src="https://www.52pojie.cn/static/image/common/wbs.png" class="qq_bind" align="absmiddle" alt="">',
                    i: "自动签到中..",
                    j: '#hd .wp #um p > a > img[src*="qds.png"]',
                    k: 'home.php?mod=task&do=apply&id=2',
                    l: '#messagetext p',
                }

                function autoSign(num) {
                    if (!isTody()) {
                        let a = document.querySelector(s.j);
                        if (a) {
                            a = a.parentNode;
                            a.text = s.i;
                            try {
                                var iframe = document.createElement('iframe');
                                iframe.id = 'AutoCheckIn';
                                iframe.style.display = "none";
                                iframe.src = s.k;
                                document.body.appendChild(iframe);
                                iframe.onload = function () {
                                    let res = document.getElementById("AutoCheckIn").contentWindow.document.querySelector(s.l)
                                    if (res) {
                                        res = res.innerHTML;
                                        if (res.indexOf(s.b) > 0) {
                                            saveDate();
                                            a.outerHTML = s.h;
                                        } else if (res.indexOf(s.d) > 0) {
                                            saveDate();
                                            a.outerHTML = s.h;
                                        } else {
                                        }
                                    }
                                };
                            } catch (e) {
                                if (!num || num < 2) {
                                    setTimeout(function () {
                                        autoSign(num + 1);
                                    }, 2000);
                                }
                                return;
                            }
                        }
                    }
                }
                

                autoSign(0);
            }

            function show() {
                // 按发帖时间排序的链接
                let soft_url = "https://www.52pojie.cn/forum.php?mod=forumdisplay&fid=16&filter=author&orderby=dateline";
                let flash_url = "https://www.52pojie.cn/forum.php?mod=forumdisplay&fid=21&filter=author&orderby=dateline";
                let ruike1_itjiaocheng_url = "https://www.ruike1.com/forum.php?mod=forumdisplay&fid=47&filter=author&orderby=dateline";
                let biancheng_url = "https://www.52pojie.cn/forum.php?mod=forumdisplay&fid=24&filter=author&orderby=dateline";
                let santongit_url = "http://www.santongit.com/";

                let nav_bar_ul = document.querySelector("#hd #nv_ph #nv ul");
                createLi("『精品软件』", soft_url, false);
                createLi("『动画精品转载区』", flash_url, false);
                createLi("『三通it学院』", santongit_url, true);
                createLi("『编程语言区』", biancheng_url, false);
                createLi("『瑞客IT教程』", ruike1_itjiaocheng_url, true);

                document.querySelectorAll("[id^=stickthread]").forEach((v, i) => {
                    if (v) v.hidden = true;
                }, this);

                $.web_is_homepage || hide_ptn_xg2();

                function createLi(text1, url1, blank) {
                    let soft_li = document.createElement("li");
                    let soft_li_a = document.createElement("a");
                    if (blank === true) {
                        soft_li_a.target = "_blank";
                    }
                    soft_li_a.innerText = text1;
                    soft_li_a.href = url1;
                    soft_li_a.style.color = "red";
                    soft_li.prepend(soft_li_a);
                    nav_bar_ul.prepend(soft_li);
                }

                function hide_ptn_xg2() {
                    let e = document.querySelector(".ptn.xg2");
                    e && (e.hidden = true);
                }
            }
        }

        function createElement(selector) {
            let hidden = _("#mn_N19fe") ? _("#mn_N19fe").style.display = "none" : 0;
            const a = document.createElement("a");
            const li = document.createElement("li");
            li.appendChild(a);
            a.href = "/misc.php?mod=ranklist&type=member&view=post&orderby=today";
            a.innerHTML = "查看灌水";
            _(selector).appendChild(li);
        }

        exports.$_$ = $_$;
        exports.run = run;
        return exports;
    })({});

    let other_web = {
        info: {
            host: location.host,
            selector: {
                formhash: `#um > p:nth-child(2) > a:last-child`,
                reply_list: ""
            },
            reply: {
                url: location.origin + "/forum.php?mod=post&action=reply&tid={tid}&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost&inajax=1",
                scope: [1, 15],
                reply_count: 15,
                second: 55,//秒
                reply_list_for_tid: [8620123,],
                selector: "#portal_block_838_content > div:nth-child({scope1}) > ul > li:nth-child({scope2}) > a",
                verify: "succeedhandle_fastpost",
                body: {
                    content: "message={message}&posttime={posttime}&formhash={formhash}&usesig=1&subject=++",
                    messages: [`%E8%BD%BB%E8%BD%BB%E5%9C%B0%2C%E6%88%91%E6%9D%A5%E4%BA%86.%E7%9C%8B%E4%BA%86%E7%9C%8B%E8%BF%99%E4%B8%AA%E5%86%85%E5%AE%B9%E4%B8%8D%E9%94%99%2C%E6%88%91%E5%8F%88%E8%BD%BB%E8%BD%BB%E7%9A%84%E8%B5%B0%E4%BA%86`, `%E7%8B%AC%E5%AD%A6%E8%80%8C%E6%97%A0%E5%8F%8B%EF%BC%8C%E5%88%99%E5%AD%A4%E9%99%8B%E8%80%8C%E5%AF%A1%E9%97%BB%E3%80%82`, `%E7%BB%A7%E7%BB%AD%E9%80%A0%E7%A6%8F%E4%BA%BA%E7%B1%BB%3B%E7%BB%A7%E7%BB%AD%E9%80%A0%E7%A6%8F%E4%BA%BA%E7%B1%BB.%0D%0A`, `%E5%A5%BD%E7%9C%8B%E5%A5%BD%E7%9C%8B%2C%E5%A5%BD%E7%9C%8B%E5%A5%BD%E7%9C%8B...+%E5%A5%BD%E7%9C%8B%E5%A5%BD%E7%9C%8B%2C%E5%A5%BD%E7%9C%8B%E5%A5%BD%E7%9C%8B...+`]
                },
                options: null,
                callback: async (text) => {
                    /*当回贴后的返回内容中,[没有]"posts_per_hour",直接退出*/
                    if (text.indexOf("posts_per_hour") === -1) {
                        return;
                    }

                    /* 当回贴后的返回内容中,[有]"posts_per_hour"*/
                    // 当reply_timestamp===0时,设置其值为当时时间戳
                    if ($.$_$.g({ key: "reply_timestamp" }) === 0) {
                        $.$_$.s({ data: Date.now(), key: "reply_timestamp" });
                    }
                    // 用一个计数器,防止死循环
                    let count = 1;
                    while (true) {
                        if (count === 10) break;
                        // 时间过去了50分钟,则等待时长为: 剩下的时间+10秒钟
                        if ((Date.now() - $.web_reply_timestamp) > (50 * 60 * 1000)) {
                            await $.$_$.delay((Date.now() - $.web_reply_timestamp) + (10 * 1000));
                            console.log("等待了最后的时间,可以重新开始回贴了....")
                            count++
                            // 更新保存的时间戳
                            $.$_$.s({ data: Date.now(), key: "reply_timestamp" });
                            break;
                        }
                        // 其它时间段[0-50),等待5分钟
                        await $.$_$.delay(5 * 60 * 1000);
                        console.log("等待了5分钟");
                        count++;
                        continue;
                    }
                }

            },
            sign: {
                url: location.origin + "/plugin.php?id=dsu_paulsign:sign&operation=qiandao&infloat=1&sign_as=1&inajax=1",
                body: "formhash={formhash}&qdxq=kx",
                verify: `hideWindow`
            },
        },
        init: () => {
            _("#framet010zR").style.display = "none";
            _("#wp").style.display = "none";
            $.web_name = "other_web"
            $.webs_info.other_web = other_web.info;
        }
    };

    // 1*8.17*.1*.2*4
    // 不知道能不能用正则可以解决
    const host = location.hostname;
    const reference = "1*8.17*.1*.2*4";
    let new_reference = "";
    let isTrue = true;
    // 长度判断
    (reference.length !== host.length) && (isTrue = false);
    if (isTrue === true) {
        // 把相应位置的*号替换
        for (let i = 0; i < reference.length; i++) {
            let tmp = reference[i];
            if (reference[i] === "*") {
                tmp = host[i];
            }
            new_reference += tmp;
        }
        (new_reference !== host) && (isTrue = false)
    }
    if (isTrue) {
        other_web.init();
    }
    $.$_$ = new $_$();
    web.run();
})({});
