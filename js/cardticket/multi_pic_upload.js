define("cardticket/multi_pic_upload.js", ["tpl/cardticket/multi_pic_upload.html.js", "common/wx/pagebar.js", "common/wx/Tips.js", "common/wx/media/imageDialog.js", "biz_web/utils/upload.js", "page/cardticket/widget_add_img.css"],
function(t) {
    "use strict";
    var e = template.compile(t("tpl/cardticket/multi_pic_upload.html.js")),
    i = t("common/wx/pagebar.js"),
    tips = t("common/wx/Tips.js"),
    imageDialog = t("common/wx/media/imageDialog.js");
	t("biz_web/utils/upload.js");
    var defaults = {
        container: "",
        page: {
            pageCount: 9,
            currentPage: 1
        },
        pagedata: [],
        maxSelect: 100,
        onChanged: $.noop,
        type: "edit",
        data: []
    };
    var MultiPicUpload = function(options) {
        this.opt = $.extend(true, {}, defaults, options);
        this.init();
    };
    t("page/cardticket/widget_add_img.css");
    template.compile('		<div class="edit_pic_wrp js_edit_pic_wrp">            <img src="{pic_url}" alt="">            <div class="edit_pic_mask">                <a href="javascript:;" class="icon18_common del_gray js_delete"></a>            </div>        </div>');
    MultiPicUpload.prototype = {
        init: function() {
            this.$container = $(this.opt.container);
            if ("preview" == this.opt.type) {
				this.opt.page.pageCount++;
			}
            this._init();
        },
        _init: function() {
            var pageOpt = this.opt.page,
				data = this.opt.data,
				n = pageOpt.pageCount * (pageOpt.currentPage - 1),
				r = pageOpt.pageCount * pageOpt.currentPage;
            this.opt.pagedata = [];
            for (var c = n; r > c && c < data.length; c++) {
				if (data[c]) {
					this.opt.pagedata.push((data[c] + "").http2https());
				}
			}
            this.$container.html(e(this.opt)),
            this.initEvent(),
            this.initPager();
        },
        initEvent: function() {
            var that = this,
				opt = this.opt,
				i = opt.data;
            $(".js_upload").click(function() {
                imageDialog({
                    maxSelect: opt.maxSelect - opt.data.length,
                    desc: "建议尺寸：640像素 * 340像素",
                    onOK: function(i) {
                        var values = that.getValues();
                        if (i.length + values.length > opt.maxSelect) {
							tips.err("最多选择100张图片");
							return false;
						}
                        if (i.length) {
                            for (var r = i.length - 1; r >= 0; r--) {
								opt.data.unshift(i[r].url);
							}
                            setTimeout(function() {
                                that._init();
                            }, 10);
                            opt.onChanged.call(that);
                            this.destroy();
                        }
                    },
                    onCancel: function() {
                        this.destroy();
                    }
                });
                return false;
            }),
            this.$container.find(".js_delete").click(function() {
                var a = $(this).closest(".js_edit_pic_wrp"),
					n = $(".js_edit_pic_wrp", t.$container),
					r = n.index(a);
                i.splice(r, 1);
                i.length == e.page.pageCount * (e.page.currentPage - 1) && e.page.currentPage > 1 && e.page.currentPage--;
                a.remove();
                t._init();
                e.onChanged.call(t);
                return false;
            }),
            this.$container.on("mouseover", ".js_edit_pic_wrp", function() {
                $(this).find(".js_edit_area").show();
            }).on("mouseout", ".js_edit_pic_wrp", function() {
                $(this).find(".js_edit_area").hide();
            });
        },
        initPager: function() {
            var that = this,
            opt = this.opt,
            pageOpt = opt.page,
            n = $(".js_pager", this.$container);
			if (opt.data.length > pageOpt.pageCount) {
				this.pagebar = null;
				this.pagebar = new i({
					container: n,
					perPage: pageOpt.pageCount,
					initShowPage: pageOpt.currentPage,
					totalItemsNum: opt.data.length,
					first: false,
					last: false,
					isSimple: true,
					callback: function(e) {
						var i = e.currentPage;
						pageOpt.currentPage = i,
						that._init();
					}
				});
			} else {
				n.html("");
			}
        },
        getValues: function() {
			var values = [];
			var data = this.opt.data;
            for (var i = 0; i < data.length; i++) {
				if (data[i]) {
					values.push((data[i] + "").https2http());
				}
			}
            return values;
        },
        toObject: function(t) {
			var values = this.getValues();
            for (var e = {}, a = 0; a < values.length; a++) {
				e["pic_url" + a] = values[a];
				if (t) {
					t["pic_url" + a] = values[a];
				}
			}
            return e;
        }
    };
    return MultiPicUpload;
});