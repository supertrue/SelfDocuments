$(function(){
	
	//公用表格样式01 隔行变色
	$(".glo-table01 tr:even td").css("background-color","#f1f4f6");
	$(".glo-table01 tr:odd td").css("background-color","#fff");
	
//信息弹窗关闭
$(".info_close").click(function(){
	var infoheight = $(this).parents(".info_popup_window").height();
	$(".info_popup_window").animate(
	{bottom: -infoheight}, "slow"
);
		
});
//右边栏
$(".j_right_box a").hover(function(){
	$(this).find("span").show().css("display","block");
},function(){
	$(this).find("span").hide();
});

//返回顶部
$(".j_right_box .back_top").click(function(){
	$('html,body').animate({scrollTop:'0px'},800);
	return false;
});

$(window).scroll(function() {
	var a_top = document.body.scrollTop || document.documentElement.scrollTop;
	if(a_top > 500){
		$(".service_float_nav .back_top").show();
	}else{
		$(".service_float_nav .back_top").hide();
	}
});


/*搜索*/
/*搜索*/
$(".search_sort p").click(function(){
	var ul=$(".sreach_sort_list");
	if(ul.css("display")=="none"){
		ul.slideDown();
	}else{
		ul.slideUp();
	}
	return false;
});

$("body").click(function(){
	var ul=$(".sreach_sort_list");
	if(ul.css("display")=="block"){
		ul.slideUp();
	}
})

$(".set").click(function(){
	var _name = $(this).attr("name");
	if( $("[name="+_name+"]").length > 1 ){
		$("[name="+_name+"]").removeClass("active");
		$(this).addClass("active");
	} else {
		if( $(this).hasClass("active") ){
			$(this).removeClass("active");
		} else {
			$(this).addClass("active");
		}
	}
});

$(".search_sort li").click(function(){
	var li=$(this).text();
	$(".search_sort p").html(li);
	$(".sreach_sort_list").hide();
	/*$(".set").css({background:'none'});*/
	$("p").removeClass("active") ;   
});

/*导航*/
$(".nav ul .navli").hover(
	function(){
		$(this).addClass("active");
		$(this).find(".sub_nav").show();
		$(this).find(".sub_nav").animate({
			opacity:1,
			marginTop:"15px"
		},200);
		$(this).siblings("li").removeClass("active");
	},
	function(){
		//$(this).removeClass("active");
		$(this).find(".sub_nav").animate({
			opacity:0,
			marginTop:"15px"
		},200);
		$(this).find(".sub_nav").hide();
	}
)
/*导航附加*/
$(".nav ul").hover(
	function(){
		
	},function(){
		$(this).find(".navli").removeClass("active");
	}
)

/*导航更多附加归位*/
$(".navli_more").hover(
	function(){
		$(".sub_nav_more .tabs li").removeClass("active");
		$(".sub_nav_more .tabs li:eq(0)").addClass("active");
		$(".sub_nav_more .tab_content .tabs_item").hide();
		$(".sub_nav_more .tab_content .tabs_item:eq(0)").show();
	},function(){
	}
)

/*导航个人中心*/
$(".pub_user_center").hover(
	function(){
		$(this).find(".u_nav_list").fadeIn();
	},function(){
		$(this).find(".u_nav_list").fadeOut();
	}
)


  /*焦点图*/
  $(".focus_box").hover(
	  function () {
		$(this).find(".content .share").show("fast");
	  },
	  function () {
		$(this).find(".content .share").hide("fast");
     }
  );

  /*图片分享*/
  $(".img_effect").hover(
	  function () {
		$(this).find(".share").slideDown("fast");
	  },
	  function () {
		$(this).find(".share").slideUp("fast");
     }
  );
  
  /*图文效果*/
  $(".img_text_effect").hover(
	  function () {
		$(this).find(".content .share").show("fast");
	  },
	  function () {
		$(this).find(".content .share").hide("fast");
     }
  );
  /*操作切换*/
  $(".operation .zan").hover(
	  function () {
		$(this).find("a").toggle();
	  },
	  function () {
		$(this).find("a").toggle();
     }
  );
  $(".operation .shoucang").hover(
	  function () {
		$(this).find("a").toggle();
	  },
	  function () {
		$(this).find("a").toggle();
     }
  );
  
  /*切换*/
	(function ($) { 
		//$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('active');
		
		$('.tab ul.tabs:not(.fengchao2) li a').click(function (g) { 
			var tab = $(this).closest('.tab'), 
				index = $(this).closest('li').index();
			
			tab.find('ul.tabs > li').removeClass('active');
			$(this).closest('li').addClass('active');
			
			tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').hide();
			tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').show();
			
			g.preventDefault();
		} );
	})(jQuery);  
	
  /*切换*/
	(function ($) { 
		//$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('active');
		
		$('.tab01 ul.tabs li').hover(function (g) { 
			var tab01 = $(this).closest('.tab01'), 
				index = $(this).closest('li').index();
			
			tab01.find('ul.tabs > li').removeClass('active');
			$(this).closest('li').addClass('active');
			
			tab01.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').hide();
			tab01.find('.tab_content').find('div.tabs_item:eq(' + index + ')').show();
			
			g.preventDefault();
		} );
	})(jQuery);  

  /*筛选 更多标签*/
  $(".selection_menu .more_btn a").click(function () {
	  /*var more_btn_text = $(this).text();
	  if(more_btn_text == "更多筛选"){
		$(this).toggleClass("active");
		$(this).text("收起筛选");
		$(".selection_menu dl dd .more_lables").toggleClass("active");
	  }else{
		$(this).toggleClass("active");
		$(this).text("更多筛选");
		$(".selection_menu dl dd .more_lables").toggleClass("active");
	  }*/
   });
   
  /*工具服务列表 左边导航*/
  $(".aside_nav_list  li h3").click(function () {
		$(this).siblings(".aside_sub_nav").slideToggle();
   });
   
   /*服务参数表格*/
  $(".service_parameter_table tr:even").css("backgroundColor","#fbfcfe");
  $(".service_parameter_table tr").hover(
   function () {
		$(this).addClass("active");
   },
   function(){
	   $(this).removeClass("active");
   }
   );
   
   
  /*创建项目 更多内容*/
  $(".more_creat_btn span").click(function () {
	  $(this).parent().parent().find(".more_creat").slideToggle("slow");
   });

  
  
  //end	
  
/*操作
$(".operation .l ul .zan_btn:not('.active')").click(function(){
	$(this).addClass("active");
});
$(".operation .l ul .shoucang_btn").click(function(){
	$(this).toggleClass("active");
})  
$(".operation .l ul .tuijian_btn:not('active')").click(function(){
	$(this).addClass("active");
});*/

 
/*操作 站内分享*/  
$(".operation .xiaoren > a").click(
	function(){
		$(this).parent().find(".station_share").toggle();
		return false;
	});
//站内分享 选择
$(".share_content ul").on("click","li", function(){
	$(this).toggleClass("active");
});


/*单选按钮组效果*/
$(".radio_group_inline ul li").click(function(){
	$(this).siblings("li").removeClass("active");
	$(this).addClass("active");
	
});
  
/*复选按钮组效果*/
$(".checkbox_group_inline ul li").click(function(){
	$(this).toggleClass("active");
});
  
  
/*评论 点赞*/
$(function(){
})


/*搜索公用*/
	$(".pub_search_sort p").click(function(){
		var ul=$(".pub_sreach_sort_list");
		if(ul.css("display")=="none"){
			ul.slideDown();
		}else{
			ul.slideUp();
		}
		return false;
	});
	$(".pub_set").click(function(){
		var _name = $(this).attr("name");
		if( $("[name="+_name+"]").length > 1 ){
			$("[name="+_name+"]").removeClass("active");
			$(this).addClass("active");
		} else {
			if( $(this).hasClass("active") ){
				$(this).removeClass("active");
			} else {
				$(this).addClass("active");
			}
		}
	});
	
	$(".pub_search_sort li").click(function(){
		var li=$(this).text();
		$(".pub_search_sort p").html(li);
		$(".pub_sreach_sort_list").hide();
		/*$(".set").css({background:'none'});*/
		$("p").removeClass("active") ;   
	});
	
	/*点空返回*/
	$("body").click(function(){
		var ul=$(".pub_sreach_sort_list");
		if(ul.css("display")=="block"){
			ul.slideUp();
		}
		if ( $(".pub_set").hasClass("active") ){
				$(".pub_set").removeClass("active");
			}
	});
	
	
	/*工具服务 右边导航 回顶*/
	$(".service_float_nav .ablock05").click(function(){
		$('html,body').animate({scrollTop:'0'},800);
		return false;
	});
	
	$(".service_float_nav .ablock04").click(function(){
		$(".glo_kefu_popup").popupFn();
	});
	
	/*搜索效果导航*/  
	if( $(".results_box .results_suggest .left").height() == "80" ){
		  $(".results_box .results_suggest").addClass("results_suggest_two");
	  }
	  $(".results_suggest_two .left .more_icon").click(function(){
		  if( $(".results_box .results_suggest").hasClass("active") ){
			 $(".results_box .results_suggest").removeClass("active")
			 $(".results_box .results_suggest").animate({
				height:"40px",
			 })
		  }else{
			 $(".results_box .results_suggest").addClass("active")
			 $(".results_box .results_suggest").animate({
				height:"80px",
			 })
		  }
	  })  
  
})











