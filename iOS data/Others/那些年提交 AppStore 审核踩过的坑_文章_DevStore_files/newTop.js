function getActivity(){
	var result;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/activity/getTopActivity',
		async: false,
		data: {},
		success: function(data) {
			result=data;
		}
	});
	return result;
}
function getTopProject(){
	var result;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/project/getTopProject',
		async: false,
		data: {},
		success: function(data) {
			result=data;
		}
	});
	return result;
}
function getNews(type){
	var result;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/new/getTopNews',
		async: false,
		data: {type:type},
		success: function(data) {
			result=data;
		}
	});
	return result;
}
function getData(){
	var result;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '/data/getTopData',
		async: false,
		data: {},
		success: function(data) {
			result=data;
		}
	});
	return result;
}

var topNews=new Array($("#iclap_nav .zixun a").size()+1);
//标记是否已经加载过顶部数据报告的数据
var showTopData=false;
var showTopProject=false;
$(function(){
	/*导航*/
//	默认资讯
	$("#iclap_nav").on("mousemove",".rfn-icons-02 a.cat01",function(){
		var html='';
		var x=0;
		if(topNews[x]!=null){
			html=topNews[x];
		} else{
			var para=0;
			if(para!='activity'){
				var data=getNews(para);
				if(data.status==1){
					for(var i=0;i<data.list.length;i++){
						var row=data.list[i];
						html+='<li>';
						html+='<a href="'+row.href+'" title="'+row.title+'" target="_blank"><img src="'+row.Screenshot+'" alt="'+row.title+'">';
						html+='<span>'+row.title+'</span>';
						html+='</a>';
						html+='</li>';
					}
					topNews[x]=html;
				}
			}
		}
		$("#iclap_nav .rfn-icons-02 .rfnna-tabcontent ul.rfnnat-data").html(html);
	});
//	分类资讯
	$("#iclap_nav").on("mousemove",".zixun a",function(){
		var html='';
		var x=$("#iclap_nav .zixun a").index($(this));
		if(topNews[x+1]!=null){
			html=topNews[x+1];
		} else{
			var para=$(this).attr("para");
			var data=null;
			if(para!='activity'){
				data=getNews(para);
				if(data.status==1){
					for(var i=0;i<data.list.length;i++){
						var row=data.list[i];
						html+='<li>';
						html+='<a href="'+row.href+'" title="'+row.title+'" target="_blank"><img src="'+row.Screenshot+'" alt="'+row.title+'">';
						html+='<span>'+row.title+'</span>';
						html+='</a>';
						html+='</li>';
					}
					topNews[x+1]=html;
				}
			} else{
				data=getActivity();
				if(data.status==1){
					for(var i=0;i<data.list.length;i++){
						var row=data.list[i];
						html+='<li>';
						html+='<div class="left_img">';
						html+='<a href="'+row.href+'" title="'+row.title+'" target="_blank"><img src="'+row.shark_image+'" alt="'+row.title+'"></a>';
						html+='</div>';
						html+='<div class="content"><a href="'+row.href+'" title="'+row.title+'">'+row.title+'</a></div>';
						html+='</li>';
					}
					topNews[x+1]=html;
				}
			}
			
		}
		$(this).parents("li.rfn-icons-02").find("ul.rfnnat-data").html(html);
	});
//	数据报告
	$("#iclap_nav").on("mousemove",".rfn-icons-04 a.cat01",function(){
		if(!showTopData){
			var data=getData();
			if(data.status==1){
				var html='';
				for(var i=0;i<data.dataList.length;i++){
					var row=data.dataList[i];
					html+='<li><a href="'+row.href+'" title="'+row.title+'"><img src="'+row.Screenshot+'" alt="'+row.title+'"/><span>'+row.title+'</span></a></li>';
				}
				$("#iclap_nav .rfn-icons-04 .dataLi").html(html);
				showTopData=true;
			}
		}
	});
//	项目
	$("#iclap_nav").on("mousemove",".rfn-icons-04 a.wa_project",function(){
		if(!showTopProject){
			var data=getTopProject();
			if(data.status==1){
				var html='';
				for(var i=0;i<data.list.length;i++){
					var row=data.list[i];
					html+='<li><a href="'+row.href+'" title="'+row.name+'"><img src="'+row.logo_image+'" alt="'+row.name+'"/><span>'+row.name+'</span></a></li>';
				}
				$("#iclap_nav .rfn-icons-04 .topProjectLi").html(html);
				showTopProject=true;
			}
		}
	});
	
	// 返回顶部
	$(".slide-nav-return").click(function(){
		$('html,body').animate({scrollTop:'0px'}, 800);
		return false;
	});
	$(window).scroll(function() {
		showReturnTop();
	});
	function showReturnTop(){
		var client_h = parseInt(document.documentElement.clientHeight || document.body.clientHeight);
		var return_top = document.body.scrollTop || document.documentElement.scrollTop;
		// 滚动超过一屏后显示返回顶部按钮
		if(return_top > client_h){
			$(".slide-nav-return").css({"visibility":"visible"});
		}else{
			$(".slide-nav-return").css({"visibility":"hidden"});
		}
	}
	
	$(".wenzhang li").hover(function(){//右侧导航--文章--tab切换
        $(".wenzhang li").removeClass("active");
        var t = $(this).index();
        $(this).addClass("active");
        $(".rfn-navlist-article .rfnna-tabcontent").eq(t).show().siblings(".rfnna-tabcontent").hide();
	});
});