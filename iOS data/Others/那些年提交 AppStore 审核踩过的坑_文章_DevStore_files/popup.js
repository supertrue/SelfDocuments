//popup浮层;
(function($) {
	$.fn.popupFn = function() {
		if($(".ui-popup")){
		$(".ui-popup").fadeOut(200);
		$(".ui-mask").hide();
		}

		//获取滚动条高度 for ie6
		var $scrHeight = window.screen.height;

		//获得窗口高度和对象高度，除以2居中，40微调
		var $winHeight = $(window).height();
		$h = $winHeight - this.height();
		$h = $h / 2 - 30;
		//var $a_top = $(document).scrollTop();
		//$h = $h + $a_top;

		//获得窗口宽度和对象宽度，除以2居中
		var $winWidth = $(window).width();
		$w = $winWidth - this.width();
		$w = $w / 2;

		//-----结构
		$(".ui-mask:eq(0)").height($scrHeight).show();
		this.animate({
			"top": $h + "px",
			"left": $w + "px"
		}).fadeIn(200);

		//关闭
		this.find(".pop_close").click(function() {
			$(".ui-mask").hide();
			$(this).parents(".ui-popup").fadeOut(200);
		});
//		$(".ui-mask").click(function(){
//			$(this).hide();
//			$(".ui-popup").fadeOut(300);
//			
//		});
	};
})(jQuery);


$(function(){
	//用户编辑
	$("body").on("click",".user_name .edit",function(){
		$(this).parent(".user_name").siblings(".input01").show();
		$(this).parent(".user_name").hide();
	});
	/*单选按钮组效果*/
$(".popup_radio_group ul li").click(function(){
	$(this).siblings("li").removeClass("active");
	$(this).addClass("active");
	
})
	
	
	
	
})