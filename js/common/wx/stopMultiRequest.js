define("common/wx/stopMultiRequest.js", [],
function(e, t, n) {
    try {
        var r = +(new Date);
        "use strict";
        var i = {},
        s = function(e) {
            var t = e.split(/&/);
            return t;
        },
        o = function(e) {
            if (!e) return [];
            var t = [];
            for (var n in e) t.push(n + "=" + e[n]);
            return t;
        },
        u = function(e) {
            var t = e.url.indexOf("?"),
            n = [],
            r = e.url;
            t >= 0 && (n = s(e.url.substr(t + 1)), r = r.substr(0, t)),
            typeof e.data == "string" ? n = n.concat(s(e.data)) : typeof e.data == "object" && (n = n.concat(o(e.data)));
            var i = r + "?" + n.sort().join("&");
            return i.replace(/random=[^&]*/, "");
        };
        return $.ajaxPrefilter(function(e, t, n) {
            if (/^GET$/i.test(e.type)) return;
            var r = function(e, t) {
                t.pendingRequestKey = e,
                i[e] = !0;
            },
            s = u(e);
            if ( !! i[s]) {
                n.abort(),
                i[s] = !1;
                return;
            }
            r(s, n),
            e.btn && $(e.btn).btn(!1);
            var o = e.complete;
            e.complete = function(t, n) {
                e.btn && $(e.btn).btn(!0),
                i[t.pendingRequestKey] = null,
                $.isFunction(o) && o.apply(this, arguments);
            };
        }),
        {};
    } catch(a) {
        wx.jslog({
            src: "common/wx/stopMultiRequest.js"
        },
        a);
    }
});