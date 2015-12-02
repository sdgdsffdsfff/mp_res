define("cardticket/store_cgi.js", ["common/wx/Cgi.js", "common/wx/Tips.js", "common/wx/tooltips.js", "common/wx/tooltipsManager.js", "common/wx/dialog.js"],
function(t) {
    "use strict";
    var e = t("common/wx/Cgi.js"),
    s = t("common/wx/Tips.js"),
    o = t("common/wx/tooltips.js"),
    n = t("common/wx/tooltipsManager.js"),
    c = (t("common/wx/dialog.js"), {
        deleteStore: function(t) {
            e.post({
                url: "/merchant/entityshop?action=delete",
                data: {
                    id: t.store_id
                },
                btn: t.btn
            },
            function(o) {
                0 == o.base_resp.ret ? (s.suc("删除门店成功"), t.success && t.success()) : e.show(o);
            });
        },
        deleteWithConfirm: function(t) {
            if (3 == t.state || 4 == t.state) {
                var e = new o({
                    container: t.container,
                    content: "删除将影响在用此门店的相关业务。<br />你确定要删除吗？",
                    type: "click",
                    buttons: [{
                        text: "确定",
                        type: "btn_primary",
                        click: function() {
                            if (t.success) {
                                var e = t.success;
                                t.success = function() {
                                    e && e(),
                                    n.removeAll();
                                };
                            }
                            c.deleteStore(t);
                        }
                    },
                    {
                        text: "取消",
                        type: "btn_default",
                        click: function() {
                            n.removeAll();
                        }
                    }]
                });
                e.show(),
                n.removeAll(),
                n.add(e);
            }
        },
        listStore: function(t) {
            var s = $.extend({},
            {
                action: "list",
                begin: 0,
                count: 9999999,
                keyword: t.keyword,
                task_id: t.task_id,
                audit_state: t.audit_state || 3
            },
            t.getDataExtra);
            e.get({
                url: "/merchant/entityshop",
                data: s
            },
            function(s) {
                if (0 == s.base_resp.ret) {
                    var o = $.parseJSON(s.data),
                    n = o.store_location;
                    t.success && t.success({
                        shop_list: n,
                        total_num: s.total_count
                    });
                } else e.show(s);
            });
        },
        canSendCard: function(t) {
            t.success && t.success(!0);
        }
    });
    return c;
});