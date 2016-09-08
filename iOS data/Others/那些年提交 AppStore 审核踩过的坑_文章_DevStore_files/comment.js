var pageanchor="";
var barr="";
var garr="";
var cache=null;
var pageNum=1;
var commentSubmitCache=null;
function commentLoginCallback(){
	commentSubmitCache.click();
	setTimeout(function(){
		window.location.reload(true);
	}, 500);
}
//得到评论
function getCommentPage(objectType,objectId,pageNum){
	var html;
	$.ajax({
		type: "POST",
		dataType: "html",
		url: '/comment/getCommentPage',
		async: false,
		data: {objectType:objectType,objectId:objectId,pageNum:pageNum},
		success: function(data) {
			html=data;
		}
	});
	return html;
}
//得到回复
function getReplyPage(commentId){
	var html;
	$.ajax({
		type: "POST",
		dataType: "html",
		url: '/comment/getReplyPage',
		async: false,
		data: {commentId:commentId},
		success: function(data) {
			html=data;
		}
	});
	return html;
}
//删除回复或者评论
function delComment(commentId){
	var result;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/comment/delComment',
		async: false,
		data: {commentId:commentId},
		success: function(data) {
			result=data;
		}
	});
	return result;
}


//execute add replay comment
function executeComment(atuserid,commType,commid,content){
	if(getCookie("DevStoreLastComment")==null || getCookie("DevStoreLastComment")!=content){
		var urls ="content="+encodeURIComponent(AnalyticEmotion(content))+"&pid="+object_id+"&commtype="+commType+"&objectType="+object_type;
		if(typeof atuserid !='undefined' && atuserid != null){
			urls += "&atuserid="+atuserid;
		}
		if(typeof commid !='undefined' && commid != null ){
			urls += "&commid="+commid;
		}
		if(commType==1){
			urls+="&barr="+barr.toString()+"&garr="+garr.toString();
		}
		var data=doComment(urls);
		return data;
	} else{
		alert("请不要在短时间内发表重复评论！");
		return null;
	}
}
//提交评论和回复
function doComment(urls){
	var strData;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/comment/doComment',
		async: false,
		data: urls,
		success: function(data) {
			strData=data;
		}
	});
	return strData;
}


//赞评论
function zanComment(cid){
	var result=null;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/comment/zanComment',
		async: false,
		data: encodeURI("commentId="+cid),
		success: function(data) {
			result=data;
		}
	});
	return result;
}

function reloadReplyDiv(commid){
	var dl=$(".comments_list_box[cid='"+commid+"']");
	var replyPage=getReplyPage(commid);
	
	dl.find(".reply_list").replaceWith(replyPage);
	var replySize=dl.find(".reply_list ul li").size();
	dl.find(".reply_bt").eq(0).html("回复("+replySize+")");
}


$(function(){
	$("body").on("click",".loadMoreComment",function(){
		pageNum=pageNum+1;
		var html=getCommentPage(object_type, object_id, pageNum);
		$(".loadMoreCommentDiv").remove();
		$(".comments_list").append(html);
//		重置页面上的评论数		
		if($(".comments_total").size()>0){
			$(".comments_total").html('评论('+totalCommentNum+')');
		}
	});
	// 绑定表情
	$('.faceBtn').each(function () {
		var obj=$(this).parent().parent().prev(".reply_input,.comments_input").find("textarea");
		$(this).SinaEmotion(obj); 
	});

//	监听评论的赞
	$("body").on("click",".reply_group .zan",function(){
		var commentId=$(this).parents(".comments_list_box").eq(0).attr("cid");
		var result=zanComment(commentId);
		var status=result.status;
		if(status==1){
			$(this).siblings(".yizan").show();
			$(this).remove();
		} else{
			alert("操作失败，请刷新后重试！");
		}
	});
	
	
	/*评论回复*/  
	$("body").on("click",".reply_bt",function(){
		if($(this).hasClass("replyed")){
			return;
		}
		//pageanchor="upb"+$(this).parents(".user_pl_box").attr("cid");
		var div=$(this).parent().siblings(".reply_box");
		var str="";
		var userName=$(this).attr("un");
		var userId=$(this).attr("ui");
		if(div.html()!=null){
			str+='<div class="reply_input">';
			str+='<textarea class="textarea_bt" style="width:100%;">回复@'+userName+':</textarea>';
			str+='</div>';
			str+='<div class="reply_btn_group">';
			str+='<div class="l"><a href="javascript:;" class="a01 faceBtn"><span>表情</span></a></div>';
			str+='<div class="r"><a href="javascript:;" class="submitReply" ui="'+userId+'" un="'+userName+'">提交评论</a></div>';
			str+='<div class="clear"></div>';
			str+='</div>';
			//$(this).parent().parent().find(".ccc").find(".hf_box_right").eq(0).prepend(str);
			$(this).parent().siblings(".reply_box").eq(0).prepend(str);
		}
		div.slideDown("fast");
		$(this).addClass("replyed");
	});
		
	$("body").on("click",".replyed",function(){
		$(this).parent().siblings(".reply_box").slideUp("fast");
		$(this).parent().siblings(".reply_box").html("");
		$(this).removeClass("replyed");
	});
	
//	监听提交回复按键
	$("body").on("click",".submitReply",function(){
		var atuserid=$(this).attr("ui");
		var commType=2;
		var commid=$(this).parents(".comments_list_box").attr("cid");
		var content=$(this).parent().parent().prevAll(".reply_input").find("textarea").val();
		var contentLength=content.length;
		if(content.indexOf($(this).attr("un"))){
			var subContent=content.substring(content.indexOf($(this).attr("un"))+$(this).attr("un").length+1,content.length);
			contentLength=subContent.length;
		}
		if(contentLength>5){
			cache=$(this);
			var data=executeComment(atuserid, commType, commid, content);
			if(data!=null){
				var status = data.status;
				if(status <1){
					if(-101 == status){
						commentSubmitCache=$(this);
						showLoginDiv(commentLoginCallback);
					}else if("-1" == status){
						alert("发表评论失败，很遗憾~");// 
					}else if("-88" == status){
						alert("您的账号被限制评论了！");
					}
				}else{
					if(data.addPoints!=null && data.addPoints>0){
						remind_cion("回复成功，活力值+"+data.addPoints);
					} else{
						remind_cion("恭喜您！回复成功!");
					}
					addCookieByS("DevStoreLastComment", content, 60);
					reloadReplyDiv(commid);
					$(this).parents(".reply_box").prev("div").find(".replyed").click();
				}
			}
		} else{
			alert("这么惜字如金？但也不能少于5个字哦~！");
		}
	});
	
	$("body").on("click",".submitComment",function(){
		var content=null;
		if($(this).hasClass("usedCommentButton")){
//			公户服务用户后的点评
			content=$(this).parent().prevAll(".div02").find("textarea").val();
			if(object_type==1){
				garr = new Array();
				barr = new Array();
				$(this).parent().prevAll(".div01").find(".dp_label span.g_span.active,.dp_label span.b_span.active").each(function(){
					var tid = $(this).attr("tid");
					var ttype = $(this).attr("ttype");
					garr.push(tid);
					barr.push(ttype);
				});
			}
		} else{
			content=$(this).parent().parent().prevAll(".comments_input,.popup_youguo").find("textarea").val();
			if(object_type==1){
				garr = new Array();
				barr = new Array();
				$(this).parent().parent().prevAll(".commentTags").find(".dp_label span.g_span.active,.dp_label span.b_span.active").each(function(){
					var tid = $(this).attr("tid");
					var ttype = $(this).attr("ttype");
					garr.push(tid);
					barr.push(ttype);
				});
			}
		}
		if(content.length>5){
			var data=executeComment(null, 1, null, content);
			cache=$(this);
			if(data!=null){
				var status = data.status;
				if(status <1){
					if(-101 == status){
						commentSubmitCache=$(this);
						showLoginDiv(commentLoginCallback);
					}else if("1" == status){
						alert("发表评论失败，很遗憾~");// 
					}else if("-88" == status){
						alert("您的账号被限制评论了！");
					}
				}else{
					if(data.addPoints!=null && data.addPoints>0){
						remind_cion("评论成功，活力值+"+data.addPoints);
					} else{
						remind_cion("恭喜您！评论成功!");
					}
					addCookieByS("DevStoreLastComment", content, 60);
					pageNum=1;
					var html=getCommentPage(object_type, object_id, pageNum);
					$(this).parent().parent().prevAll(".comments_input").find("textarea").val("");
					$(".section04").html(html);
//					重置页面上的评论数		
					if($(".comments_total").size()>0){
						$(".comments_total").html('评论('+totalCommentNum+')');
					}
					if(commComplteCallBack!=null && commComplteCallBack!=undefined){
						commComplteCallBack(totalCommentNum);
					}
					if(object_type==1){
						$(".dp_label span.g_span,.dp_label span.b_span").removeClass("active");
					}
	//				服务有用后的弹出窗关闭
					var i=$(this).parents(".ui-popup").size();
					if(i>0){
						$(this).parents(".ui-popup").find(".pop_close").click();
					}
				}
			}
		} else{
			alert("这么惜字如金？但也不能少于5个字哦~！");
		}
	});
	
	var s = null;
	$("body").on("click",".hf_czuo_hf",function(){
		$(this).parents(".user_pl_box").find(".reply").removeClass("replyed");
		$(this).parents(".user_pl_box").find(".reply").click();
		var atuid = $(this).attr("cuid");
		s = atuid;
		var textare = $(this).closest(".hf_box_right_list").find(".hf_p").find("label").text();
		$(this).closest(".hf_box_right").find("textarea").focus().val("回复@"+textare);
		
	});
	
	
	//delete pl
	$("body").on("click",".delectComment,.delectReply",function(){
		var cid=null;
		if($(this).hasClass("delectComment")){
			cid = $(this).closest(".comments_list_box").attr("cid");
		} else{
			cid = $(this).closest("li").attr("cid");
		}
		var t = $(this);
		if(typeof cid != 'undefined'){
			if(window.confirm("删除会扣除相应活力值，确定要删除？")){
				var data=delComment(cid);
				var info = data.info;
				var status = data.status;
				if(status == 'false'){
					alert(info);
				}else{
					if($(this).hasClass("delectComment")){
						t.closest(".comments_list_box").toggle(500);
					} else{
						reloadReplyDiv($(this).closest(".comments_list_box").attr("cid"));
					}
				}
			}
		}
	});
});



