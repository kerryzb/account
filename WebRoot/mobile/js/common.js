/*
* 格式化金额 
* 参数说明：
* number：要格式化的数字
* decimals：保留几位小数
* dec_point：小数点符号
* thousands_sep：千分位符号
* */
function number_format(number, decimals, dec_point, thousands_sep) {
	if(decimals==null)decimals=2;
	if(dec_point==null)dec_point='.';
	if(thousands_sep==null)thousands_sep=',';
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };
 
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }
 
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

/**
 * 采用正则表达式获取地址栏参数
 * @param name
 * @returns
 */
function getParam(name)
{
//	 var url=window.location.href;//当前请求的url  
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function initForm(form, values, options){  
    //默认参数  
	if(values==null)values={};
    //设置参数  
    var setting = $.extend({}, values, options);  
    jsonValue = setting;  
    //如果传入的json字符串，将转为json对象  
    if($.type(setting.jsonValue) === "string"){  
        jsonValue = $.parseJSON(jsonValue);  
    }  
    //如果传入的json对象为空，则不做任何操作  
    if(!$.isEmptyObject(jsonValue)){  
        var debugInfo = "";  
        for(var key in jsonValue){
        	var value = jsonValue[key];
        
            //是否开启调试，开启将会把name value打印出来  
            if(setting.isDebug){  
                alert("name:"+key+"; value:"+value);  
                debugInfo += "name:"+key+"; value:"+value+" || ";  
            }  
            var formField = form.find("[name='"+key+"']");  //form.find("[name='"+key+"']");  
            if($.type(formField[0]) === "undefined"){  
                if(setting.isDebug){  
                    alert("can not find name:["+key+"] in form!!!");    //没找到指定name的表单  
                }  
            } else {  
                var fieldTagName = formField[0].tagName.toLowerCase();  
                if(fieldTagName == "input"){  
                    if(formField.attr("type") == "radio"){  
                        $("input:radio[name='"+key+"'][value='"+value+"']").attr("checked","checked");  
                    } else {  
                        formField.val(value);  
                    }  
                } else if(fieldTagName == "select"){  
                    //do something special  
                    //formField.val(value);  
                    formField.val(value).selectmenu('refresh', true);
                } else if(fieldTagName == "textarea"){  
                    //do something special  
                    formField.val(value);  
                } else {  
                    formField.val(value);  
                }  
            }  
        }  
        if(setting.isDebug){  
            alert(debugInfo);  
        }  
    }  
    return form;    //返回对象，提供链式操作  
}  

function isEmpty(value){
	if(value==undefined||value==null||value==''){
		return true;
	}
	return false;
}