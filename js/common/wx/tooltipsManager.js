define("common/wx/tooltipsManager.js", ["common/wx/tooltips.js"],
function(e, t, n) {
    try {
        var r = +(new Date);
        "use strict";
        var i = e("common/wx/tooltips.js"),
        s = {
            tooltips: [],
            init: function(e, t) {
                var n = this;
                $(e).each(function() {
                    t.container = this,
                    n.add(new i(t));
                });
            },
            add: function(e) {
                this.tooltips.push(e);
            },
            hideAll: function() {
                for (var e = 0; e < this.tooltips.length; e++) this.tooltips[e].hide();
            },
            removeItem: function(e) {
                for (var t = 0; t < this.tooltips.length; t++) if (this.tooltips[t] === e) return this.tooltips.splice(t, 1),
                e.$dom.remove(),
                !0;
                return ! 1;
            },
            removeIndex: function(e) {
                if (e >= this.tooltips.length || e < 0) return;
                var t = this.tooltips[e];
                this.tooltips.splice(e, 1),
                t.$dom.remove();
            },
            current: function() {},
            hide: function() {},
            removeAll: function() {
                for (var e = 0; e < this.tooltips.length; e++) this.tooltips[e].$dom.remove();
                this.tooltips = [];
            }
        };
        return s;
    } catch(o) {
        wx.jslog({
            src: "common/wx/tooltipsManager.js"
        },
        o);
    }
});