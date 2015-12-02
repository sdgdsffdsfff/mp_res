define("common/wx/sosomap/event.js", [],
function(e, t, n) {
    try {
        var r = +(new Date);
        "use strict";
        var i = {};
        return i.once = i.addListenerOnce = function(e, t) {
            return soso.maps.event.addListenerOnce(this, e, t),
            this;
        },
        i.on = i.addListener = function(e, t) {
            return soso.maps.event.addListener(this, e, t),
            this;
        },
        i.off = i.clearListeners = function() {
            return soso.maps.event.clearListeners(this),
            this;
        },
        i.trigger = function(e, t, n, r, i) {
            return soso.maps.event.trigger(this, e, t, n, r, i),
            this;
        },
        i;
    } catch(s) {
        wx.jslog({
            src: "common/wx/sosomap/event.js"
        },
        s);
    }
});