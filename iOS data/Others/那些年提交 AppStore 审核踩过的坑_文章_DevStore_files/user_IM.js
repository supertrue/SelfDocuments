
/**
 * 获取用户的即时消息的数据
 * @author yangwenguang
 * @date 2015-1-29
 * @returns
 */
function checkUserIM(){
	var result;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/user_operate/checkUserIM',
		async: true,
		data: {},
		success: function(data) {
//			result=data;
			if(data.status==-101){
//				如果用户未登录，停止检测
				clearInterval(IM_ID);
			} else if(data.status==1){
				var list=data.list;
				for(var i=0;i<list.length;i++){
					var row=list[i];
					var html=getContent(row);
					if($(".userImPop[para='"+row.key+"']").size()==0){
						$("body").append(html);
						var infoheight = $(".userImPop[para='"+row.key+"']").height();
						$(".userImPop[para='"+row.key+"']").css("bottom", -infoheight);
						$(".userImPop[para='"+row.key+"']").css("z-index", 99999);
						$(".userImPop[para='"+row.key+"']").animate(
							{bottom: '0px'}, "slow"
						);
					}
				}
			}
		}
	});
	return result;
}
/**
 * 处理用户申请加入项目的请求
 * @author yangwenguang
 * @date 2015-1-29
 * @param id
 * @param handleType
 * @param msg
 * @returns
 */
function handleUserJoinProject(id,handleType,msg){
	var result;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/user_operate/handleUserJoinProject',
		async: false,
		data: {id:id,handleType:handleType,msg:msg},
		success: function(data) {
			result=data;
		}
	});
	return result;
}

function delUserIM(key){
	var result;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/user_operate/delUserIM',
		async: false,
		data: {key:key},
		success: function(data) {
			result=data;
		}
	});
	return result;
}

/**
 * 得到弹窗的内容
 * @author yangwenguang
 * @date 2015-1-29
 * @param value
 */
function getContent(data){
	var value=data;
	var html='';
	html+='<div class="info_popup_window userImPop" para="'+data.key+'">';
	html+='<div class="info_tit">';
	html+='<span class="info_close">&nbsp;</span><em><b>D</b>ev<b>S</b>tore</em> &nbsp;&nbsp; <span class="text01">移动互联网运营解决方案</span>';
	html+='</div>';
	if(value.IM_type==0){
		html+='<div class="info_con">';
		html+='<div class="div01">';
			html+='<div class="l">';
				html+='<a href="'+value.userHref+'" target="_blank"><img src="'+value.icon+'" width="35" height="35" alt=" "></a>';
			html+='</div>';
		html+='<div class="r"  style="padding-top:10px;">';
			html+='<a href="'+value.userHref+'" target="_blank">'+value.user_name+'</a> 欢迎回来~！';
		html+='</div>';
		html+='<div class="clear"></div>';
		html+='</div>';
		html+='<div class="div02">DevStore的小伙伴儿可是十分想念你哦~快快查看你不在都有哪些好消息等着吧~ </div>';
		html+='</div>';
		html+='<div class="info_chakan">';
		html+='<a href="/user_center/myMsg" class="info_close">查看</a>';
		html+='</div>';
	} else if(value.IM_type==20028){
		html+='<div class="info_con">';
		html+='<div class="div01">';
		html+='<div class="l">';
		html+='<a href="'+value.userHref+'" target="_blank"><img src="'+value.icon+'" width="35" height="35" alt=" "></a>';
		html+='</div>';
		html+='<div class="r">';
		html+='<a href="'+value.userHref+'" target="_blank">'+value.user_name+'</a> 评论了您的文章：<br> <span>'+value.title+'</span>';
		html+='</div>';
		html+='<div class="clear"></div>';
		html+='</div>';
		html+='<div class="div02">'+value.content+'</div>';
		html+='</div>';
		html+='<div class="info_chakan">';
		html+='<a href="'+value.href+'" target="_blank" class="info_close">查看</a>';
		html+='</div>';
	} else if(value.IM_type==20026){
		html+='<div class="info_con">';
		html+='<div class="div01">';
		html+='<div class="l">';
		html+='<a href="'+value.userHref+'" target="_blank"><img src="'+value.icon+'" width="35" height="35" alt=" "></a>';
		html+='</div>';
		html+='<div class="r">';
		html+='<a href="'+value.userHref+'" target="_blank">'+value.user_name+'</a> 回复了你的问题：<br> <span>'+value.title+'</span>';
		html+='</div>';
		html+='<div class="clear"></div>';
		html+='</div>';
		html+='<div class="div02">'+value.content+'</div>';
		html+='</div>';
		html+='<div class="info_chakan">';
		html+='<a href="'+value.href+'" target="_blank" class="info_close">查看</a>';
		html+='</div>';
	} else if(value.IM_type==20036){
		html+='<div class="info_con">';
		html+='<div class="div01">';
		html+='<div class="l">';
		html+='<a href="'+value.userHref+'" target="_blank"><img src="'+value.icon+'" width="35" height="35" alt=" "></a>';
		html+='</div>';
		html+='<div class="r">';
		html+='<a href="'+value.userHref+'" target="_blank">'+value.user_name+'</a> 回复了你的评论：<br> <span>'+value.title+'</span>';
		html+='</div>';
		html+='<div class="clear"></div>';
		html+='</div>';
		html+='<div class="div02">'+value.content+'</div>';
		html+='</div>';
		html+='<div class="info_chakan">';
		html+='<a href="'+value.href+'" target="_blank" class="info_close">查看</a>';
		html+='</div>';
	} else if(value.IM_type==20030){
		html+='<div class="info_con">';
			html+='<div class="div01">';
				html+='<div class="l">';
					html+='<a href="'+value.userHref+'" target="_blank"><img src="'+value.icon+'" width="35" height="35" alt=" "></a>';
				html+='</div>';
			html+='<div class="r">';
				html+='<a href="'+value.userHref+'" target="_blank">'+value.user_name+'</a> 申请加入你的项目：<br> <span><a href="'+value.href+'" target="_blank">'+value.title+'</a></span>';
			html+='</div>';
			html+='<div class="clear"></div>';
			html+='</div>';
			html+='<div class="div03">';
				html+='<div class="l">';
					html+='<table width="100%" border="0">';
						html+='<tbody>';
							html+='<tr>';
								html+='<td width="60">真实姓名：</td>';
								if(value.name!=null){
									html+='<td>'+value.name+'</td>';
								} else{
									html+='<td></td>';
								}
							html+='</tr>';
							html+='<tr>';
								html+='<td>职位：</td>';
								if(value.job!=null){
									html+='<td>'+value.job+'</td>';
								} else{
									html+='<td></td>';
								}
							html+='</tr>';
							html+='<tr>';
								html+='<td>电话：</td>';
								if(value.tel!=null){
									html+='<td>'+value.tel+'</td>';
								} else{
									html+='<td></td>';
								}
							html+='</tr>';
						html+='</tbody>';
					html+='</table>';
				html+='</div>';
				html+='<div class="r">';
					html+='<a href="/user_center/manageOtherUserJoinMyProject.html" target="_blank" handleType="2" para="'+value.data_id+'" class="a01 handleTypeButton info_close">查看</a>';
				html+='</div>';
				html+='<div class="clear"></div>';
			html+='</div>';
		html+='</div>';
	} else if(value.IM_type==20038 || value.IM_type==20031){
		html+='<div class="info_con">';
		html+='<div class="div01">';
		html+='<div class="r">';
		if(value.handleType==2){
			html+='恭喜你，加入项目<a href="'+value.projectHref+'" target="_blank">['+value.projectName+']</a>的申请已通过管理员审核~！';
		} else if(handleType==3){
			html+='实在抱歉，您加入项目<a href="'+value.projectHref+'" target="_blank">['+value.projectName+']</a>的申请未通过管理员审核~！';
		}
		html+='</div>';
		html+='<div class="clear"></div>';
		html+='</div>';
		if(value.handleType==2){
			html+='<div class="div02">从此成为该项目的一员，和大家一起努力共同协作吧！</div>';
		} else if(handleType==3){
			html+='<div class="div02">原因：'+value.feedback_msg+'</div>';
		}
		html+='</div>';
		html+='<div class="info_chakan">';
		if(value.handleType==2){
			html+='<a href="'+value.href+'" target="_blank" class="info_close">查看</a>';
		} else if (value.handleType==3){
			html+='<a href="/user_center/myMsg" target="_blank" class="info_close">查看</a>';
		}
		html+='</div>';
	} else if(value.IM_type==20040){
		html+='<div class="info_con">';
		html+='<div class="div01">';
		html+='<div class="l">';
		html+='<a href="'+value.userHref+'" target="_blank"><img src="'+value.icon+'" width="35" height="35" alt=" "></a>';
		html+='</div>';
		html+='<div class="r">';
		html+='<a href="'+value.userHref+'" target="_blank">'+value.user_name+'</a> 邀请你回答TA的问题：<br> <span>'+value.title+'</span>';
		html+='</div>';
		html+='<div class="clear"></div>';
		html+='</div>';
		html+='<div class="div02">'+value.content+'</div>';
		html+='</div>';
		html+='<div class="info_chakan">';
		html+='<a href="'+value.href+'" target="_blank" class="info_close">查看</a>';
		html+='</div>';
	} else if(value.IM_type==20047){
		html+='<div class="info_con">';
		html+='<div class="div01">';
		html+='<div class="r">';
		html+='恭喜你，回答被提问者设置为最佳答案~！<br />获得能力值+'+value.abilityNum+'&nbsp;&nbsp;活力值+'+value.pointsNum;
		html+='</div>';
		html+='<div class="clear"></div>';
		html+='</div>';
		html+='<div class="div02"><a href="'+value.questionHref+'" target="_blank" class="title">'+value.questionTitle+'</a></div>';
		html+='</div>';
		html+='<div class="info_chakan">';
		html+='<a href="/user_center/myAnswer" target="_blank" class="info_close">查看</a>';
		html+='</div>';
	} else if(value.IM_type==20048){
		html+='<div class="info_con">';
		html+='<div class="div01">';
		html+='<div class="l">';
		html+='<a href="'+value.userHref+'" target="_blank"><img src="'+value.icon+'" width="35" height="35" alt=" "></a>';
		html+='</div>';
		html+='<div class="r">';
		html+='<a href="'+value.userHref+'" target="_blank">'+value.user_name+'</a>  同意了加入您项目的邀请<br> <a href="'+value.projectHref+'" target="_blank">'+value.projectName+'</a>';
		html+='</div>';
		html+='<div class="clear"></div>';
		html+='</div>';
		html+='<div class="div02">从此你的项目又多了一名成员，一起努力共同协作吧！</div>';
		html+='</div>';
		html+='<div class="info_chakan">';
		html+='<a href="'+value.href+'" target="_blank" class="info_close">查看</a>';
		html+='</div>';
	} else if(value.IM_type==30003){
		html+='<div class="info_con">';
		html+='<div class="div01">';
		html+='<div class="l">';
		html+='<a href="'+value.projectHref+'" target="_blank"><img src="'+value.projectLogo+'" width="35" height="35" alt=" "></a>';
		html+='</div>';
		html+='<div class="r">';
		html+='<a href="'+value.projectHref+'" target="_blank">'+value.user_name+'</a> 达到了挖项目条件';
		html+='</div>';
		html+='<div class="clear"></div>';
		html+='</div>';
		html+='<div class="div02">恭喜您，项目名称 经过DEV小编层层筛选及审核，现已达到挖项目条件~</div>';
		html+='</div>';
		html+='<div class="info_chakan">';
		html+='<a href="'+value.projectHref+'" target="_blank" class="info_close">查看</a>';
		html+='</div>';
	} else if(value.IM_type=='IM'){
		html+='<div class="info_con">';
		html+='<div class="div01">';
			html+='<div class="l">';
				html+='<a href="'+value.userHref+'" target="_blank"><img src="'+value.icon+'" width="35" height="35" alt=" "></a>';
			html+='</div>';
		html+='<div class="r"  style="padding-top:10px;">';
			html+='<a href="'+value.userHref+'" target="_blank">'+value.user_name+'</a> 发来了一条私信消息';
		html+='</div>';
		html+='<div class="clear"></div>';
		html+='</div>';
		html+='<div class="div02">'+value.content+'</div>';
		html+='</div>';
		html+='<div class="info_chakan">';
		html+='<a href="'+value.href+'" target="_blank" class="info_close">查看</a>';
		html+='</div>';
	}
	html+='</div>';
	return html;
}

/**
 * 检查有无用户的即时消息，有的话给用户显示
 * @author yangwenguang
 * @date 2015-1-29
 */
function userIM(){
	var data=checkUserIM();
}

//var IM_ID=null;
$(function(){
//	启动检测用户即时消息
	userIM();
//	IM_ID=setInterval(userIM, 10000);
	$("body").on("click",".userImPop .info_close",function(){
		var key=$(this).parents(".userImPop").attr("para");
		delUserIM(key);
		var infoheight = $(this).parents(".info_popup_window").height();
		$(this).parents(".info_popup_window").animate(
			{bottom: -infoheight}, "slow"
		);
		$(this).parents(".userImPop").remove(2000);
	});
});


