Ext.define('monthContainer', {
	extend : 'Ext.container.Container',
	xtype : 'monthContainer',
	layout : 'hbox',
	items : [ {
		xtype : 'combobox',
		fieldLabel : '年',
		labelAlign : 'right',
		labelWidth : 20,
		width : 80,
		editable : false,
		store : {
			xtype : 'store',
			fields : [ 'year' ],
			data : [ {
				year : '2010'
			}, {
				year : '2012'
			}, {
				year : '2013'
			}, {
				year : '2014'
			}, {
				year : '2015'
			}, {
				year : '2016'
			}, {
				year : '2017'
			}, {
				year : '2018'
			}, {
				year : '2019'
			}, {
				year : '2020'
			}, {
				year : '2021'
			}, {
				year : '2022'
			}, {
				year : '2023'
			}, {
				year : '2024'
			}, {
				year : '2025'
			}, {
				year : '2026'
			}, {
				year : '2027'
			}, {
				year : '2028'
			}, {
				year : '2029'
			}, {
				year : '2030'
			} ]
		},
		displayField : 'year',
		valueField : 'year',
		listeners : {
			afterrender : function() {
				var date = new Date();
				var year = date.getYear() + 1900 + '';
				this.setValue(year);
			}
		}
	}, {
		xtype : 'label',
		text : '-'
	}, {
		xtype : 'combobox',
		fieldLabel : '月',
		labelAlign : 'right',
		labelWidth : 20,
		width : 80,
		editable : false,
		store : {
			xtype : 'store',
			fields : [ 'month' ],
			data : [ {
				month : '01'
			}, {
				month : '02'
			}, {
				month : '03'
			}, {
				month : '04'
			}, {
				month : '05'
			}, {
				month : '06'
			}, {
				month : '07'
			}, {
				month : '08'
			}, {
				month : '09'
			}, {
				month : '10'
			}, {
				month : '11'
			}, {
				month : '12'
			} ]
		},
		displayField : 'month',
		valueField : 'month',
		listeners : {
			afterrender : function() {
				var date = new Date();
				var month = date.getMonth() + 1;
				if (month < 10) {
					month = '0' + month;
				} else {
					month = '' + month;
				}
				this.setValue(month);
			}
		}
	} ],
	getValue : function() {
		var year = this.items.getAt(0).getValue();
		var month = this.items.getAt(2).getValue();
		if (year != null && year != '' && month != null && month != '') {
			return year + '-' + month;
		} else {
			return null;
		}
	},
	setValue : function(value) {
		if (value != null && value != '') {
			var monthArray = value.split('-');
			var year = monthArray[0];
			var month = monthArray[1];
			if (year != null) {
				this.items.getAt(0).setValue(year);
			}
			if (month != null) {
				this.items.getAt(2).setValue(month);
			}
		} else {
			this.items.getAt(0).setValue('');
			this.items.getAt(2).setValue('');
		}
	}
});

function numToCny(numberValue) {
	var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
	var chineseValue = ""; // 转换后的汉字金额
	var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
	var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
	var baseNumberStr = '零万零仟零佰零拾零元零角零分';
	var len = numberValue.length; // numberValue 的字符串长度
	var Ch1; // 数字的汉语读法
	var Ch2; // 数字位的汉字读法
	var nZero = 0; // 用来计算连续的零值的个数
	var String3; // 指定位置的数值
	if (len > 15) {
		alert("超出计算范围");
		return "";
	}
	if (numberValue == 0) {
		chineseValue = baseNumberStr;
		return chineseValue;
	}
	String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
	for ( var i = 0; i < len; i++) {
		String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
		if (i != (len - 3) && i != (len - 7) && i != (len - 11)
				&& i != (len - 15)) {
			if (String3 == 0) {
				Ch1 = "";
				Ch2 = "";
				nZero = nZero + 1;
			} else if (String3 != 0 && nZero != 0) {
				Ch1 = "零" + String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else {
				Ch1 = String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			}
		} else { // 该位是万亿，亿，万，元位等关键位
			if (String3 != 0 && nZero != 0) {
				Ch1 = "零" + String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else if (String3 != 0 && nZero == 0) {
				Ch1 = String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else if (String3 == 0 && nZero >= 3) {
				Ch1 = "";
				Ch2 = "";
				nZero = nZero + 1;
			} else {
				Ch1 = "";
				Ch2 = String2.substr(i, 1);
				nZero = nZero + 1;
			}
			if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
				Ch2 = String2.substr(i, 1);
			}
		}
		chineseValue = chineseValue + Ch1 + Ch2;
	}
	if (String3 == 0) { // 最后一位（分）为0时，加上“整”
		chineseValue = chineseValue + "零角零分";
	}
	if (chineseValue.length < baseNumberStr.length) {
		chineseValue = baseNumberStr.substring(0, baseNumberStr.length
				- chineseValue.length - 1)
				+ chineseValue;
	}

	return chineseValue;
}