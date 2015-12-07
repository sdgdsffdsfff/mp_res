define("cardticket/common_init.js", ["cardticket/card_cgi.js"],
function(c) {
    "use strict";
    seajs.use("cardticket/clickreport.js",
    function(c) {
        var t = [/\/merchant\/electroniccardmgr.*?action=(addpage|batch|faq)/];
        c.setopt({
            canreport: function() {
                for (var c = 0; c < t.length; c++) if (t[c].test(location.href)) return ! 0;
                return ! 1;
            }
        }),
        c.regreport(),
        c.regcommonclick();
    });
    var t = c("cardticket/card_cgi.js");
    t.check_friend_and_money_acct(function(c, t) {
        t ? $("#js_has_money_acct_tips").show() : c && $("#js_has_friend_card_tips").show(),
        c && $(".js_has_friend_card_tips").show();
    });
});