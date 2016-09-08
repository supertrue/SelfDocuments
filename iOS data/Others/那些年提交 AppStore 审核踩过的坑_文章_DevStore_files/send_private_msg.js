$(function() {
	$(".sendPrivateToThisUser").click(function(){
		showSendMSGPopup($(this).attr("un"));
	});
	$( ".sendUserNameInput" ).autocomplete({
		minLength: 1,
		source:function(request, response){
			var result=searchUser(request.term);
			$('.ui-autocomplete').css("z-index",9999);
			response(result);
		},
		delay:600
	});
	$(".submitPrivateMsg").click(function(){
		var toUserName=$(".sendUserNameInput").val();
		var content=$(".sendPmContent").val();
		if(checkToUserName()){
			var data=submitSendPM(null, toUserName, content);
			if(data.status==1){
				$(".sendPrivateMsgPop .pop_close").click();
				$(".sendPrivateMsgOK").popupFn();
				setTimeout(function(){
					$(".sendPrivateMsgOK .pop_close").click();
				}, 1500);
			} else if(data.status==-101){
				sendPmCache=$(this);
				showLoginDiv(sendPmLoginCallback);
			} else if(data.status==-10){
				showNoHasThisUser();
			} else{
				alert("发生错误！请稍后重试！");
			}
		}
	});
});

var sendPmCache=null;
/**
 * 登陆后的回调方法
 * @author yangwenguang
 * @date 2015-1-25
 */
function sendPmLoginCallback(){
	$(".sendPrivateMsgPop").popupFn();
	sendPmCache.click();
}

/**
 * 展示该用户不存在
 * @author yangwenguang
 * @date 2015-1-25
 */
function showNoHasThisUser(){
	$(".validation_font_red").html("此用户不存在！请检查！");
}

/**
 * 检查是否输入了对方的用户名
 * @author yangwenguang
 * @date 2015-1-25
 * @returns {Boolean}
 */
function checkToUserName(){
	var toUserName=$(".sendUserNameInput").val();
	if(toUserName!=null && toUserName.length>0){
		return true;
	} else{
		$(".sendUserNameInputError").html("请输入发信对象的用户名！");
		return false;
	}
}



/**
 * 提交私信发送
 * @author yangwenguang
 * @date 2015-1-25
 * @param toUserId
 * @param toUserName
 * @param content
 * @returns {Array}
 */
function submitSendPM(toUserId,toUserName,content){
	var result=[];
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/user_operate/sendPrivateMsg',
		async: false,
		data: {toUserId:toUserId,toUserName:toUserName,content:content},
		success: function(data) {
			result=data;
		}
	});
	return result;
}

/**
 * 搜索用户
 * @author yangwenguang
 * @date 2015-1-25
 * @param searchStr
 * @returns {Array}
 */
function searchUser(searchStr){
	var result=[];
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/public_data/searchUser',
		async: false,
		data: {searchStr:searchStr},
		success: function(data) {
			if(data.status==1){
				var list=data.list;
				for(var i=0;i<list.length;i++){
					result.push(list[i].user_name);
				}
			}
		}
	});
	return result;
}

/**
 * 展示发送私信的弹窗
 * @author yangwenguang
 * @date 2015-1-25
 * @param searchStr
 */
function showSendMSGPopup(searchStr){
	$(".sendPrivateMsgPop .sendUserName").html(searchStr+'&nbsp&nbsp<a href="javascript:;" class="edit">修改</a>');
	$(".sendPrivateMsgPop .sendUserName").show();
	$(".sendPrivateMsgPop .sendUserNameInput").val(searchStr);
	$(".sendPrivateMsgPop .sendUserNameInput").hide();
	$(".sendPrivateMsgPop").popupFn();
	if(searchStr.length<1){
		$(".sendPrivateMsgPop .edit").click();
	}
}