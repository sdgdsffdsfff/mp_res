define("common/wx/sosomap/util.js", [],
function(e, t, n) {
    try {
        var r = +(new Date);
        "use strict";
        var i = ",北京,北京市,天津,天津市,上海,上海市,重庆,重庆市,台湾,台湾省,香港,香港特别行政区,澳门,澳门特别行政区,",
        s = {
            formatAddress: function(e) {
                if (!e || !e.addressComponents) return {};
                var t = e.addressComponents,
                n = {
                    country: t.country || "",
                    province: t.province || "",
                    city: t.city || "",
                    district: t.district || "",
                    street: t.streetNumber || t.street || t.town + t.village || ""
                };
                return n.district == n.street && (n.street = ""),
                n.province === n.city && (n.city = n.district, n.district = ""),
                n.finalAddress = n.street,
                n;
            },
            fixaddr: function(e) {
                e.address ? e.street = e.finalAddress = e.address.replace(e.province + e.city + e.district, "").replace("中国", "") : e.province && (e.address = e.province + e.city + e.district + (e.street || e.finalAddress));
            },
            area2addr: function(e) {
                var t, n, r;
                return e.length == 2 ? t = n = e[0].data.fullname: (t = e[0].data.fullname, n = e[1].data.fullname),
                r = e[e.length - 1] && e[e.length - 1].data.fullname,
                {
                    province: t,
                    city: n,
                    district: r
                };
            },
            area2scope: function(e) {
                var t = "";
                return e[0] && e[0].data && e[0].data.fullname && (t = e[0].data.fullname),
                s.isTerritory(t) || e[1] && e[1].data && e[1].data.fullname && (t = e[1].data.fullname),
                t;
            },
            isTerritory: function(e) {
                return i.indexOf("," + e + ",") >= 0;
            },
            getLocation: function(e, t) {
                if (typeof t == "string") {
                    e.getLocation(t);
                    return;
                }
                var n = t.finalAddress;
                t.province == t.city ? n = (t.city || "") + (t.district || "") + (n || "") : n = (t.province || "") + (t.city || "") + (t.district || "") + (n || ""),
                e.getLocation(n);
            }
        };
        return s;
    } catch(o) {
        wx.jslog({
            src: "common/wx/sosomap/util.js"
        },
        o);
    }
});