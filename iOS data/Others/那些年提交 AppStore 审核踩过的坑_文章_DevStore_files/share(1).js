
$(function() {
/** 项目标签 */
	$("#essay-user").select2({
		placeholder: "输入用户名称",
		minimumInputLength: 1,
		multiple: true,
		allowClear: true,
		ajax: {
			url: "/public_data/searchUser",
			dataType: 'json',
			quietMillis: 250,
			data: function (term) {
				return {
					searchStr: term
				};
			},
			results: function (data) {
				var result = [];
				$.each(data.list, function(){
					result.push({id: this.id, text: this.user_name });
				});
				return { results:result};
			},
			cache: true
		},
		formatSelection : function (item) { return item.text; },
		formatResult    : function (item) { return item.text; }
	});
	
	
	$("#shareBtn").click(function(){
		var userid = [];
		$('.share_content ul li.active').each(function(){
			userid.push($(this).attr("bid"));    
	    });
		var userids = "";
		if(""!=$("#essay-user").val() && null != $("#essay-user").val()){
			userids = $("#essay-user").val()+","+userid.join(",");
		}else{
			userids = userid.join(",");
		}
		var result = Apollo.post('/user_operate/message',{userids:userids,paraType:$("#shareid").attr("btype"),shareid:$("#shareid").val(),shareurl:$("#shareid").attr("buri"),sharetitle:$("#shareid").attr("btitle")});
		if(result.status == -101){
			clickObj_share = $("#shareBtn");
			showLoginDiv(loginAfterCall_share);
		}else if(result.status == 1){
			 $(".station_share").hide();
			 $(".glo_station_share").hide();
			 alert("分享成功");
		}else if(result.status == 2){
			 alert("分享失败");
		}
    });
});
var clickObj_share=null;
function loginAfterCall_share(){
	clickObj_share.click();
}
