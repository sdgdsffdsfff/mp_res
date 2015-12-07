define("cardticket/clickreport.js", ["biz_web/lib/store.js", "biz_common/jquery.md5.js"],
function(e) {
    "use strict";
    function t(e) {
        e || (e = location.href);
        var t = e.indexOf("?");
        if (t >= 0) {
            e = e.substr(t + 1);
            for (var n = e.split("&"), r = {},
            o = 0; o < n.length; o++) {
                var a = n[o].split("=");
                a[0] && a[1] && (r[a[0]] = decodeURIComponent(a[1]));
            }
            return r;
        }
        return {};
    }
    var n = e("biz_web/lib/store.js");
    e("biz_common/jquery.md5.js");
    var r = function() {
        function e(e, t) {
            t || (t = 2);
            var n;
            return n = 2 == t ? "time_on_page": "action_id",
            "/merchant/cardclickreport?action=report&" + n + "=" + e + "&type=" + t + "&url=" + encodeURIComponent(location.href) + "&page_id=" + encodeURIComponent(r(location.href)) + "&from_page_id=" + encodeURIComponent(r(document.referrer)) + "&referer=" + encodeURIComponent(document.referrer) + "&bizuin=" + wx.data.uin + "&timestamp=" + +new Date + "&_token=" + wx.data.t;
        }
        function r(e) {
            e || (e = location.href),
            e || (e = "");
            var n = e;
            e = e.replace(location.protocol + "//" + location.host, "");
            var r = e.indexOf("?"),
            o = r >= 0 ? e.substring(0, r) : e,
            a = t(e),
            i = o.replace(/\/$/, "") + (a.action ? "?action=" + a.action: a.t ? "?t=" + a.t: "");
            return o.indexOf("electroniccardmgr") >= 0 && /^addpage|batch$/.test(a.action) && (i += "&flag=" + (a.flag ? a.flag: "0")),
            o.indexOf("cardstat") >= 0 && /^cardstatpage|carddetailstatpage$/.test(a.action) && (i += "&ispay=" + (a.ispay ? a.ispay: "0")),
            f.transformUrl && (i = f.transformUrl(n, i)),
            i;
        }
        function o() {
            f.clickele(this, !0);
        }
        function a(e) {
            var t = i(e.target);
            t && f.clickele(t);
        }
        function i(e) {
            if (f.transformEle) {
                var t = f.transformEle(e);
                if (t) return t;
            }
            if (e === document) return ! 1;
            if ($(e).closest(".col_side").length || $(e).closest("#header").length) return ! 1;
            if (e.isdelegate) return e;
            var n = $._data(e, "events"),
            r = n && n.click,
            o = e.tagName.toLowerCase(),
            a = e.getAttribute("type"),
            i = e.parentNode.className || "",
            c = e.className || "";
            if (c.indexOf("lbl_content") >= 0) return ! 1;
            if ((i.indexOf("frm_checkbox_label") >= 0 || i.indexOf("frm_radio_label") >= 0) && -1 === c.indexOf("frm_radio") && -1 === c.indexOf("frm_checkbox")) return ! 1;
            if ("input" == o && ("checkbox" == a || "radio" == a)) return e.isdelegate = !0,
            e;
            if ("label" == o && c.indexOf("frm_radio_label") >= 0 || c.indexOf("frm_checkbox_label") >= 0) return ! 1;
            var d = e.className || "",
            i = e.parentNode.className || "";
            if (d.indexOf("jsBtLabel") >= 0 || d.indexOf("jsDropdownBt") >= 0) {
                var l = $(e).closest(".dropdown_menu")[0];
                return l.isdelegate = !0,
                l;
            }
            if (d.indexOf("jsDropdownItem") >= 0 || i.indexOf("jsDropdownItem") >= 0) return ! 1;
            var s = e.parentNode,
            u = e.id || "";
            if (r && r.length) {
                if (0 == u.indexOf("calendar_") || 0 == u.indexOf("dateRangeNextMonth") || 0 == u.indexOf("dateRangePreMonth")) return ! 1;
                if (c.indexOf("ta_btn") >= 0) return e.isdelegate = !0,
                e;
                if (0 == u.indexOf("js_dateRangeTitle") || 0 == u.indexOf("js_dateRangeTrigger")) {
                    var l = $(e).closest(".ta_date").parent()[0];
                    return l.isdelegate = !0,
                    l.type = "daterange",
                    l;
                }
                return e.isdelegate = !0,
                e;
            }
            for (var s = e.parentNode,
            p = 0; s && s !== document;) {
                if (n = $._data(s, "events"), r = n && n.click, r && r.delegateCount > 0) for (var m = 0; m < r.length; m++) {
                    var g = r[m].selector;
                    if ($(e).is(g)) return e.isdelegate = !0,
                    e;
                }
                s = s.parentNode,
                p++;
            }
            for (var _ = 3,
            m = 0,
            h = e; _ > m && h && h !== document.body;) {
                if ("a" === h.tagName.toLowerCase()) {
                    var v = h.getAttribute("href") || "";
                    if (0 == v.indexOf("javascript:")) {
                        h = h.parentNode;
                        continue;
                    }
                    return void f.clickele(h);
                }
                h = h.parentNode;
            }
            for (var h = e.parentNode,
            m = 0; h && h !== document && 5 > m;) {
                var b = $._data(h, "events"),
                r = b && b.click;
                if (r && r.length && $(h).data("actionid")) return h.isdelegate = !0,
                h;
                h = h.parentNode,
                m++;
            }
            return f.notfoundele ? f.notfoundele(e) : !1;
        }
        function c(e) {
            if (e || (e = ""), e = $.trim(e), !e) return 0;
            e = $.md5(e).substr(0, 8).toLowerCase();
            for (var t = "a".charCodeAt(0), n = 0, r = 1, o = 0; o < e.length; o++) {
                var a = e[o];
                n += a >= "0" && "9" >= a ? parseInt(a) * r: (e.charCodeAt(o) - t + 10) * r,
                r *= 16;
            }
            return n;
        }
        function d(e) {
            var t, n, r = $(e).offset();
            t = l($(e).text()),
            t || (t = $(e).attr("data-tooltip")),
            n || (n = $(e).attr("type"));
            var o = e.tagName.toLowerCase();
            if ("input" === o)("checkbox" == e.type || "radio" == e.type) && (t = l($(e.parentNode).find(".lbl_content").text()), r = $(e.parentNode).offset()),
            "submit" === e.type || "button" === e.type ? (n = "button", t = e.value) : n = e.type || "text";
            else if ($(e).hasClass("dropdown_menu")) n = "dropdown",
            t = $(e).attr("id");
            else if ("a" === o) {
                var a = $(e).attr("href");
                n = a && 0 !== a.indexOf("javascript:") ? "link": "btn";
            } else "button" === o ? n = "button": e.className.indexOf("ta_btn") >= 0 ? n = "daterange": $(e).hasClass("btn") ? n = "button": "daterange" == e.type && (n = e.type, t = e.id);
            f.transformText && (t = f.transformText(e, t)),
            f.transformType && (n = f.transformType(e, n));
            for (var i = "",
            d = 0; d < f.modulefunc.length; d++) {
                var s = f.modulefunc[d].call(f, e, n, t);
                if (s !== !1 && s && (i = s), s === !1) return;
            }
            var u = $(e).attr("data-actionid") || 0;
            return (t || u) && (t = i ? i + "_" + t: t, t && t.length > 50 && (t = t.substr(0, 50)), u || (u = c(t), f.getActionid && (u = f.getActionid(e, n, t)), u)) ? {
                type: n,
                text: t,
                actionid: u,
                offset: r
            }: void 0;
        }
        function l(e) {
            return $.trim(e).replace(/\r|\n/g, "");
        }
        function s(e, t) {
            var n = $(t).closest(e);
            return n.length ? n[0] : !1;
        }
        var f = {
            click: function(e) {
                e = $.extend(!0, {
                    x: 0,
                    y: 0,
                    inputtype: "",
                    text: "",
                    action_id: 0
                },
                e),
                this.send({
                    url: "/merchant/cardclickreport?action=report&type=1&action_id=" + e.action_id + "&inputtype=" + e.inputtype + "&x=" + e.x + "&y=" + e.y + "&text=" + encodeURIComponent(e.text || 0)
                });
            },
            timeonpage: function(e) {
                e || (e = {}),
                e.begintime || (e.begintime = this._begintime || this.begintime()),
                e.begintime && (e.usetime = +new Date - e.begintime, this.send({
                    url: "/merchant/cardclickreport?action=report&time_on_page=" + e.usetime + "&type=2&action_id=" + (e.actionid || 0),
                    onabort: function(e) {
                        e.store_time();
                    },
                    callback: function() {}
                }));
            }
        },
        u = "__time_cache_key__",
        p = r(location.href) + "__" + Math.random(),
        m = 3e3,
        g = p + "_end_time";
        return f.store_time = function() {
            if (n) {
                var t = this;
                t._endtime = +new Date;
                var r = t._endtime - t._begintime,
                o = e(r);
                try {
                    var a = [],
                    i = n.get(u);
                    i && (a = i.split("|")),
                    a.indexOf(p) < 0 && (a.push(p), n.set(u, a.join("|"))),
                    n.set(g, t._endtime),
                    n.set(p, o);
                } catch(c) {
                    throw c;
                }
            }
        },
        f.report_store_vals = function() {
            if (n) try {
                var e = n.get(u);
                if (e) {
                    for (var t, r = e.split("|"), o = [], a = 0; a < r.length; a++) {
                        t = n.get(r[a]);
                        var i = n.get(r[a] + "_end_time"); + new Date - parseInt(i) > m ? (n.remove(r[a]), n.remove(r[a] + "_end_time"), this.sendurl(t + "&abort=1")) : o.push(r[a]);
                    }
                    n.set(u, o.join("|"));
                }
            } catch(c) {
                throw c;
            }
        },
        f.sendurl = function(e) {
            var t = new Image,
            n = "__timeonpage_report__" + Math.random();
            window[n] = t,
            t.onload = t.onerror = t.onabort = function() {
                t.onload = t.onerror = t.onabort = null,
                window[n] = null;
            },
            t.src = e + wx.data.param;
        },
        f.send = function(e) {
            var t = new Image,
            n = "__timeonpage_report__" + Math.random(),
            o = this;
            window[n] = t,
            t.onload = t.onerror = t.onabort = function() {
                t.onload = t.onerror = t.onabort = null,
                window[n] = null,
                e.callback && e.callback();
            },
            t.onabort = function() {
                t.onload = t.onerror = t.onabort = null,
                window[n] = null,
                e.onabort && e.onabort(o);
            },
            t.src = e.url + "&url=" + encodeURIComponent(location.href) + "&page_id=" + encodeURIComponent(r(location.href)) + wx.data.param + "&from_page_id=" + encodeURIComponent(r(document.referrer)) + "&referer=" + encodeURIComponent(document.referrer) + "&bizuin=" + wx.data.uin + "&timestamp=" + +new Date + "&_token=" + wx.data.t;
        },
        f.regclick = function() {
            $(document).on("click", ".js_clickreport", o);
        },
        wx && !wx.str2int && (wx.str2int = c),
        f.hasevent = i,
        f.click4ie = function(e) {
            document.addEventListener || this.clickele(e);
        },
        f.clickele = function(t, n) {
            if ((n || !$(t).hasClass("js_clickreport")) && (n || !this.canreport || this.canreport(t))) {
                var o, a, i = "",
                c = d(t);
                if (c) {
                    o = c.text,
                    i = c.type;
                    var l = c.actionid;
                    if (a = c.offset, l) {
                        var s = $(".container_box").offset(),
                        f = e(l, 1);
                        f += "&x=" + parseInt(a.left - s.left) + "&y=" + parseInt(a.top - s.top) + "&text=" + encodeURIComponent(o || "") + "&inputtype=" + i,
                        this.sendurl(f),
                        console && console.log && (console.log(c), console.log(r(location.href)));
                    }
                }
            }
        },
        f.regcommonclick = function() {
            document.addEventListener ? document.addEventListener("click", a, !0) : $(document).on("click", a);
        },
        f.getparams = function(e) {
            return d(e);
        },
        window._getreportparams = function(e) {
            var t = $(e)[0];
            return t ? f.getParam(t) : null;
        },
        f.regtimeonpage = function() {
            var e = this;
            this._begintime = this.begintime(),
            $(window).on("unload",
            function() {
                e.timeonpage();
            }),
            setInterval(function() {
                e.report_store_vals();
            },
            3e3),
            this.report_store_vals();
        },
        f.begintime = function() {
            return window._points && window._points[0] || +new Date;
        },
        f.regpv = function() {
            var e = this;
            setTimeout(function() {
                e.click({
                    action_id: "0",
                    x: 0,
                    y: 0,
                    text: "",
                    inputtype: ""
                });
            });
        },
        f.regreport = function() {
            f.regclick(),
            f.regtimeonpage(),
            f.regpv();
        },
        f.setopt = function(e) {
            this.transformText = e.transformText,
            this.transformType = e.transformType,
            this.transformEle = e.transformEle,
            this.transformUrl = e.transformUrl,
            this.canreport = e.canreport,
            this.getActionid = e.getActionid,
            e.acl && (this.acl = e.acl),
            this.notfoundele = e.notfoundele;
        },
        f.modulefunc = [],
        f.acl = {
            dialog: !0,
            popover: !1
        },
        f.addmodulefunc = function(e) {
            "function" == typeof e && f.modulefunc.push(e);
        },
        f.addmodulefunc(function(e) {
            var t = s(".dialog", e);
            return t ? this.acl.dialog ? "dialog_" + $(t).find(".dialog_hd h3").text() : !1 : void 0;
        }),
        f.addmodulefunc(function(e) {
            var t = s(".popover", e);
            return t ? this.acl.popover ? "popover_" + $(t).find(".popover_content").text() : !1 : void 0;
        }),
        f;
    },
    o = r();
    return o;
});