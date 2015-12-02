define('cardticket/common_validate.js', ['biz_common/jquery.validate.js'],
function(t) {
    'use strict';
    var validate = t('biz_common/jquery.validate.js');
    $.validator.addMethod('byteMaxLength', function(value, element, param) {
        return this.optional(element) || value.len() <= param;
    }, '_(必须为小于{0}个字节)');
    $.validator.addMethod('telephone', function(value) {
        var trimValue = $.trim(value);
        return /^[0-9]{3,4}-[0-9]{5,}$/.test(trimValue) || validate.rules.mobile(value);
    });
    $.validator.addMethod('telechar', function(value, element) {
        var trimValue = $.trim(value);
        return this.optional(element) || /^(-|[0-9])+$/.test(trimValue);
    });
    $.validator.addMethod('posnum', function(value, element) {
        return this.optional(element) || /^[0-9\.]+$/.test(value) && parseFloat(value) >= 0.01;
    });
    $.validator.addMethod('reduce_cost', function(value, element) {
        return this.optional(element) || parseFloat(value) >= 1;
    });
    $.validator.addMethod('money', function(value, element) {
        return this.optional(element) || /^[0-9]+(\.[0-9]{1,2})?$/.test(value) && parseFloat(value) >= .01;
    });
    $.validator.addMethod('service_phone', function(value) {
        var trimValue = $.trim(value);
        return /^[0-9]{3,4}-[0-9]{5,}$/.test(trimValue) || validate.rules.mobile(value);
    });
    $.validator.addMethod('customer_phone', function(value, element) {
        var trimValue = $.trim(value);
        return this.optional(element) || /^[-0-9+]{7,15}$/.test(trimValue);
    });
    $.validator.addMethod('discount', function(value) {
        var $supplyDiscount = $('#js_supply_discount');
        if ($supplyDiscount.length && !$supplyDiscount.prop('checked')) {
			return true;
		}
        var trimValue = $.trim(value);
        return /^[0-9\.]+$/.test(trimValue) && parseFloat(trimValue) >= 1 && parseFloat(trimValue) < 10;
    });
    $.validator.addMethod('bonus_rules', function(value, element) {
        return !$('#js_supply_bonus').prop('checked') || '' != $.trim($(element).val());
    });
    return validate;
});