$(function(){
//	关注用户
	$("body").on("click",".pri_guanzhu01_btn",function(){
		var c = $(this).attr("qid");
		collectObject(c,$(this));
	});
	//赞
	$("body").on("click",".zan_btn",function(){
		var c = $(this).find("[bid]").attr("bid");
		clickObjUserOperate=$(this);
		getZan(c,$(this));
	});
	
	
	//收藏
	$("body").on("click",".shoucang_btn",function(){
		var c = $(this).find("[bid]").attr("bid");
		clickObjUserOperate=$(this);
		getShoucang(c,$(this));
	});
	
	//推荐
	$("body").on("click",".tuijian_btn",function(){
		var c = $(this).find("[bid]").attr("bid");
		clickObjUserOperate=$(this);
		getTuijian(c,$(this));
	});
});
function collectObject(objectId,element){
	var result;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/user_operate/collectObject',
		async: false,
		data: {objectId:objectId,type:5},
		success: function(data) {
			if(data.status=="1")
			{
				element.parent().addClass("active");
			}else if(data.status == "2")
			{
				element.parent().removeClass("active");
			}
		}
	});
	return result;
}
function getZan(id,obj){
    $.ajax({type:"POST", 
		dataType:"json",
		url:"/user_operate/zanObject", 
		data:encodeURI("objectType="+zanObjType+"&objectId="+id),
		success:function (datas) {
			//点过了返回-2 成功1
//			alert(datas.status);
//			alert(datas.info);
			if(datas.status == "-2"){
				popup_text = "赞扬是传统美德，您已经赞过了哦~";
				$(".ui-popup-text .popup_text").text(popup_text);
				$(".ui-popup-text").popupFn();
				setTimeout(function(){
					$(".ui-mask").hide();
					$(".ui-popup").fadeOut(200);
				},1500);
			}else if(datas.status == "1"){
				obj.addClass("active");
				obj.find(".used_tip").html('赞('+datas.info+')');
			}
		}
	});
}


function getShoucang(id,obj){
    $.ajax({type:"POST", 
		dataType:"json", 
		url:"/user_operate/collectObject", 
		data:encodeURI("type="+collectObjType+"&objectId="+id),
		success:function (datas) {
			//取消2  添加1 没有登录-101
//			alert(datas.status);
//			alert(datas.info);
			if(datas.status == "2"){
				popup_text = "已成功取消收藏";
				$(".ui-popup-text .popup_text").text(popup_text);
				$(".ui-popup-text").popupFn();
				setTimeout(function(){
					$(".ui-mask").hide();
					$(".ui-popup").fadeOut(200);
				},3500);
				obj.removeClass("active");
			}else if(datas.status == "-101"){
//				alert("没有登录");
				clickObj = obj;
				showLoginDiv(loginAfterCallUserOperate);
			}else if(datas.status == "1"){
				obj.addClass("active");
			}
		}
	});
}

function getTuijian(id,obj){
    $.ajax({type:"POST", 
		dataType:"json", 
		url:"/user_operate/recommend", 
		data:encodeURI("type="+recommendObjType+"&objectId="+id),
		success:function (datas) {
			//点过了返回-2 成功1 -101 没有登录
//			alert(datas.status);
//			alert(datas.info);
			if(datas.status == "-2"){
				popup_text = "您已经推荐过了哦~~";
				$(".ui-popup-text .popup_text").text(popup_text);
				$(".ui-popup-text").popupFn();
				setTimeout(function(){
					$(".ui-mask").hide();
					$(".ui-popup").fadeOut(200);
				},1500);
			}else if(datas.status == "-101"){
//				alert("没有登录");
				clickObj = obj;
				showLoginDiv(loginAfterCallUserOperate);
			}else if(datas.status == "1"){
				obj.addClass("active");
			}
		}
	});
}

var clickObjUserOperate=null;
function loginAfterCallUserOperate(){
	clickObjUserOperate.click();
	setTimeout(function(){
		window.location.reload(true);
	}, 500);
}
