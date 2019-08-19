

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
		return "时间空值异常";
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
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}
//数组判空
function isEmptyArray(obj){
	return obj === undefined || obj === null || obj.length === 0;
}

//对象判空
function isEmptyObj(obj){
	if(JSON.stringify(obj) != "{}"){
		for(var key in obj) {
			if(obj[key] == undefined||(typeof(obj[key]) === 'string' && obj[key] === '')){
				return true;
			}
		}
		return true;
	}else{
		return false;
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