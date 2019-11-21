

//时间转换
function dateToStr(date) {
	 var time = new Date(date);
	 var y = time.getFullYear();
	 var M = time.getMonth() + 1;
	 M = M < 10 ? ("0" + M) : M;
	 var d = time.getDate();
	 d = d < 10 ? ("0" + d) : d;
	 var h = time.getHours();
	 h = h < 10 ? ("0" + h) : h;
	 var m = time.getMinutes();
	 m = m < 10 ? ("0" + m) : m;
	 var s = time.getSeconds();
	 s = s < 10 ? ("0" + s) : s;
	 var str = y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
	 return str;
}

//String 转  date 
function stringToDate(str){
	if(str != null){
		var tempStrs = str.split(" ");
	    var dateStrs = tempStrs[0].split("-");
	    var year = parseInt(dateStrs[0], 10);
	    var month = parseInt(dateStrs[1], 10) - 1;
	    var day = parseInt(dateStrs[2], 10);
	    var timeStrs = tempStrs[1].split(":");
	    var hour = parseInt(timeStrs [0], 10);
	    var minute = parseInt(timeStrs[1], 10);
	    var second = parseInt(timeStrs[2], 10);
	    var date = new Date(year, month, day, hour, minute, second);
	    return date;
	}else{
		return "";
	}
}

//表单转化

function strTojson(str){
	var reg = new RegExp("&","g");
	var newstr = str.replace(reg,",");
	var reg1 = new RegExp("=","g");
	var last = newstr.replace(reg1,":");
	var jsonTo = {};
  	var arrStr = [];
	arrStr = last.split(",");
	for(var i = 0 ; i < arrStr.length ; i++){
		var childArr = arrStr[i].split(":");
		jsonTo[childArr[0]] = childArr[1];
	}
	var newStr33 = JSON.stringify(jsonTo);
    var newStr44 = JSON.parse(newStr33);
	return newStr44;
}
//请求参数处理  将对象形式参数转化为get请求参数的形式
function bulidStr(obj) {
	var str = '';
	for ( var key in obj) {
		str += key + '=' + obj[key] + '&';
	}
	str = str.substr(0, str.lastIndexOf('&'));
	return str;                              
}
//表单赋值（只有一个表单）
function setValue(obj){  
    // 开始遍历   
    for(var p in obj){      
       // 方法  
       if(typeof(obj[p])=="function"){      
           // obj[p]();     
        }else{    
        	$("#"+p).val(obj[p]);
        }      
    } 
}

//表单序列化后转化为对象形式
$.fn.extend({
       serializeObject:function(){
           if(this.length>1){
              return false;
           }
           var arr=this.serializeArray();
           var obj=new Object;
           $.each(arr,function(k,v){
              obj[v.name]=v.value;
           });
           return obj;
       }
    });

//指定表单赋值
$.fn.setForm = function(jsonValue){
    var obj = this;
    $.each(jsonValue,function(name,ival){
        var $oinput = obj.find("input[name="+name+"]");
        if($oinput.attr("type")=="checkbox"){
            if(ival !== null){
                var checkboxObj = $("[name="+name+"]");
                var checkArray = ival.split(";");
                for(var i=0;i<checkboxObj.length;i++){
                    for(var j=0;j<checkArray.length;j++){
                        if(checkboxObj[i].value == checkArray[j]){
                            checkboxObj[i].click();
                        }
                    }
                }
            }
        }
        else if($oinput.attr("type")=="radio"){
            $oinput.each(function(){
                var radioObj = $("[name="+name+"]");
                for(var i=0;i<radioObj.length;i++){
                    if(radioObj[i].value == ival){
                        radioObj[i].click();
                    }
                }
            });
        }
        else if($oinput.attr("type")=="textarea"){
            obj.find("[name="+name+"]").html(ival);
        }
        else{
            obj.find("[name="+name+"]").val(ival);
        }
    })
}
//字符串判空
function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == "" || obj == '{}'){
        return true;
    }else{
        return false;
    }
}

// 数组判空
function isEmptyArray(obj){
	return obj === undefined || obj === null || obj.length === 0 || JSON.stringify(obj) == "[null]";
}

//对象判空  
function isEmptyObj(obj){
	if(JSON.stringify(obj) != "{}"){
		for(var key in obj) {
			if(obj[key] == undefined||(typeof(obj[key]) === 'string' && obj[key].trim() === '')){
				return true;
			}
		}
		return false;
	}else{
		return true;
	}
}


//处理时间范围
function getTime(startTime,endTime){
	var start;
    var end;
    var total;
    var time
    if(!isEmpty(startTime)) start = stringToDate(startTime);
    if(!isEmpty(endTime)) end = stringToDate(endTime);
    if(!isEmpty(startTime) && !isEmpty(endTime)){
    	total = end.getTime()-start.getTime();  //时间差的毫秒数
    	 if(total < 0){
 			return false;
 		}else{
 			time = {"openDate":startTime,"endDate":endTime};
 		   
 		}
    }else if(!isEmpty(startTime)){
    	time = {"openDate":startTime};
    }else if(!isEmpty(endTime)){
    	time = {"endDate":endTime};
    }
    return time;
}
/**
 * 将以base64的图片url数据转换为Blob 可以直接上传文件
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData){
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type : 'image/png'});
}


//layui---子母表配置 --->子表配置
function collapseTable(options) {
    var trObj = options.elem;
    if (!trObj) return;
    var accordion = options.accordion,
    success = options.success,
    content = options.content || '';
    var tableView = trObj.parents('.layui-table-view'); //当前表格视图
    var id = tableView.attr('lay-id'); //当前表格标识
    var index = trObj.data('index'); //当前行索引
    var leftTr = tableView.find('.layui-table-fixed.layui-table-fixed-l tr[data-index="' + index + '"]'); //左侧当前固定行
    var rightTr = tableView.find('.layui-table-fixed.layui-table-fixed-r tr[data-index="' + index + '"]'); //右侧当前固定行
    var colspan = trObj.find('td').length; //获取合并长度
    var trObjChildren = trObj.next(); //展开行Dom
    var indexChildren = id + '-' + index + '-children'; //展开行索引
    var leftTrChildren = tableView.find('.layui-table-fixed.layui-table-fixed-l tr[data-index="' + indexChildren + '"]'); //左侧展开固定行
    var rightTrChildren = tableView.find('.layui-table-fixed.layui-table-fixed-r tr[data-index="' + indexChildren + '"]'); //右侧展开固定行
    var lw = leftTr.width() + 15; //左宽
    var rw = rightTr.width() + 15; //右宽
    //不存在就创建展开行
    if (trObjChildren.data('index') != indexChildren) {
        //装载HTML元素
        var tr = '<tr data-index="' + indexChildren + '"><td colspan="' + colspan + '"><div style="height: auto;padding-left:' + lw + 'px;padding-right:' + rw + 'px" class="layui-table-cell">' + content + '</div></td></tr>';
        trObjChildren = trObj.after(tr).next().hide(); //隐藏展开行
        var fixTr = '<tr data-index="' + indexChildren + '"></tr>';//固定行
        leftTrChildren = leftTr.after(fixTr).next().hide(); //左固定
        rightTrChildren = rightTr.after(fixTr).next().hide(); //右固定
    }
    //展开|折叠箭头图标
    trObj.find('td[lay-event="collapse"] i.layui-colla-icon').toggleClass("layui-icon-right layui-icon-down");
    //显示|隐藏展开行
    trObjChildren.toggle();
    //开启手风琴折叠和折叠箭头
    if (accordion) {
        trObj.siblings().find('td[lay-event="collapse"] i.layui-colla-icon').removeClass("layui-icon-down").addClass("layui-icon-right");
        trObjChildren.siblings('[data-index$="-children"]').hide(); //展开
        rightTrChildren.siblings('[data-index$="-children"]').hide(); //左固定
        leftTrChildren.siblings('[data-index$="-children"]').hide(); //右固定
    }
    success(trObjChildren, indexChildren); //回调函数
    heightChildren = trObjChildren.height(); //展开高度固定
    rightTrChildren.height(heightChildren + 115).toggle(); //左固定
    leftTrChildren.height(heightChildren + 115).toggle(); //右固定
}
//layui点击行同步选中复选框
$(document).on("click", ".layui-table-body table.layui-table tbody tr", function () {
    var index = $(this).attr('data-index');
    var tableBox = $(this).parents('.layui-table-box');
    //存在固定列
    if (tableBox.find(".layui-table-fixed.layui-table-fixed-l").length > 0) {
        tableDiv = tableBox.find(".layui-table-fixed.layui-table-fixed-l");
    } else {
        tableDiv = tableBox.find(".layui-table-body.layui-table-main");
    }
    var checkCell = tableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
    if (checkCell.length > 0) {
        checkCell.click();
    }
});
//对td的单击事件进行拦截停止，防止事件冒泡再次触发上述的单击事件（Table的单击行事件不会拦截，依然有效）
$(document).on("click", "td div.laytable-cell-checkbox div.layui-form-checkbox", function (e) {
    e.stopPropagation();
});

function Percentage(number1, number2) { 
	return (Math.round(number1 / number2 * 10000) / 100.00 + "%");
}

function devided(number1, number2) { 
    return (Math.round((number1 / number2)*100)/100 );
}

/**
 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
 * f
 * @param num1加数1 | num2加数2
 */
function numAdd(num1, num2) {
	 var baseNum, baseNum1, baseNum2;
	 try {
		 baseNum1 = num1.toString().split(".")[1].length;
	 } catch (e) {
		 baseNum1 = 0;
	 }
	 try {
		 baseNum2 = num2.toString().split(".")[1].length;
	 } catch (e) {
		 baseNum2 = 0;
	 }
	 baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	 return (num1 * baseNum + num2 * baseNum) / baseNum;
};

/**
 * 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
 * 
 * @param num1被减数  |  num2减数
 */
function numSub(num1, num2) {
	 var baseNum, baseNum1, baseNum2;
	 var precision;// 精度
	 try {
		 baseNum1 = num1.toString().split(".")[1].length;
	 } catch (e) {
		 baseNum1 = 0;
	 }
	 try {
		 baseNum2 = num2.toString().split(".")[1].length;
	 } catch (e) {
		 baseNum2 = 0;
	 }
	 baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	 precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
	 return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
};

/**
 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
 * 
 * @param num1被乘数 | num2乘数
 */
function numMulti(num1, num2) {
	 var baseNum = 0;
	 try {
		 baseNum += num1.toString().split(".")[1].length;
	 } catch (e) {
	 }
	 try {
		 baseNum += num2.toString().split(".")[1].length;
	 } catch (e) {
	 }
	 return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
};

/**
 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
 * 
 * @param num1被除数 | num2除数
 */
function numDiv(num1, num2) {
	 var baseNum1 = 0, baseNum2 = 0;
	 var baseNum3, baseNum4;
	 try {
		 baseNum1 = num1.toString().split(".")[1].length;
	 } catch (e) {
		 baseNum1 = 0;
	 }
	 try {
		 baseNum2 = num2.toString().split(".")[1].length;
	 } catch (e) {
		 baseNum2 = 0;
	 }
	 with (Math) {
		 baseNum3 = Number(num1.toString().replace(".", ""));
		 baseNum4 = Number(num2.toString().replace(".", ""));
		 return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
	 }
};
