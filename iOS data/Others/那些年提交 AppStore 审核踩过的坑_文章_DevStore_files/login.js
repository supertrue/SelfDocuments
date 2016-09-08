var loginAfterCall=null;
function showLoginDiv(inputLoginAfterCall){
	var from=encodeURI(window.location.href);
	loginAfterCall=inputLoginAfterCall;
	var from=location.href;
	$(".qqLoginA").attr("href",$(".qqLoginA").attr("href")+"?from="+from);
	$(".weiboLoginA").attr("href",$(".weiboLoginA").attr("href")+"?from="+from);
//	$(".loginPopupDiv #loginSubmitButton").attr("boxid",i);
	$(".loginPopupDiv").popupFn();
}

$(function() {
	$("body").on("keypress","#userName,#pwd",function(event){
		if(event.keyCode==13){
			$("#loginSubmitButton").click();
		}
	});
	$("body").on("blur","#userName",function(){
		checkUserName();
	})
	$("body").on("blur","#pwd",function(){
		checkPwd();
	})
	$("body").on("click","#loginSubmitButton",function(){
		var l = loginSubmit();
//		var boxid = $(this).attr("boxid");
		if(l == 1){
			$(".ui-mask").hide();
			$(this).parents(".ui-popup").fadeOut(200);
//			if(boxid==501){
////				点击下载评测资料
//				clickObj.clc
//			}
			loginAfterCall();
		}
		
	})
});
function loginSubmit() {
	var result;
	var v1=checkUserName();
	var v2=checkPwd();
	if(v1&&v2&& $("#userName").val()!=null && $("#pwd").val()!=null&& ($("#userName").val().length<=1
			 || $("#pwd").val().length<=5)){
		$("#loginMsg").text("账户名或密码错误！");
		$("#loginMsg").show();
		result = 0;
	}
	if(v1 && v2 
			&& $("#userName").val()!=null && $("#userName").val().length>1
			&& $("#pwd").val()!=null && $("#pwd").val().length>5){
		var userName=$("#userName").val();
		var pwd=$("#pwd").val();
		var md5Pwd=getLoginMd5Key(pwd);
		$.ajax({
			url:'/user/login',
			type:'POST',
			async: false, 
			dataType:'json',
			data:encodeURI("userName="+userName+"&pwd="+md5Pwd),
			success:function(data){
				if(data.result==0){
					$("#loginMsg").text("账户名或密码错误！");
					$("#loginMsg").show();
					result = 0;
				} else{
					if(data.firstLogin==1){
						remind_cion("登录成功，活力值+"+data.login_points);
					}
					result= 1;
				}
			}
		});
	}
	return result;
}
function checkUserName(){
	var flag1=IsValid($("#userName").val(), $("#loginMsg"));
	if(flag1){
		$("#loginMsg").hide();
	} else{
		$("#loginMsg").show();
	}
	return flag1;
}
function checkPwd(){
	var flag1=IsValid($("#pwd").val(), $("#loginMsg"));
	if(flag1){
		$("#loginMsg").hide();
	} else{
		$("#loginMsg").show();
	}
	return flag1;
}

function IsValid(oField,showError) {
	if(oField.length > 0){
		re=/\s+(select|insert|script|alert|for|var|update|delete|exec|count|'|"|=|;|>|<|%)/i;
		if(re.test(oField)){
			showError.show();
			showError.text("请您不要输入特殊字符！");
			oField='';
			return false;
		}else{
			showError.hide();
			return true;
		}
	}
	showError.hide();
	return true;
}
function isLogin(i){
	var r="";
		$.ajax({type:"POST", 
			dataType:"json", 
			url:"/service/isLogin",
			async:false, 
			success:function (data) {
				var result = data.result;
				var a_height = document.body.clientHeight;
				var a_width = document.body.clientWidth;
				var a_left = a_width/2-282;
				$(".back_bg").css("height",a_height+"px");
				$(".pop_box").css("left","");
				$(".pop_box").html('');
				if(result){
					r = "1";
				}else{
					showLoginDiv(i);
				}
			}
	});
	return r;
}

function getLoginMd5Key(pwd){
	var result
	$.ajax({
		url:'/user/getKey',
		type:'post',
		async: false, 
		dataType:'json',
		success:function(data){
			if(data.status==1){
				var s=pwd+data.loginMd5Key;
				result=b64_md5(s);				
			}else{
				alert('连接失败，请重试');
			}
		}
	});
	return result;
}
