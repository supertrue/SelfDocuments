define(function(){function c(c){a=c,$(".bigimg .js-imgmaskimg").remove();var g=$(c).attr("src"),h=g;if(-1!=g.indexOf("img.mukewang.com")||-1!=g.indexOf("img.imooc.com")){var v="http://img.mukewang.com/";-1!=g.indexOf("img.imooc.com")&&(v="http://img.imooc.com/");var w=$(c).attr("src").split(v)[1].split(".");h=w[0],h=h.substring(0,h.length-8)+"00000000."+w[1];var b=v+h}else var w=$(c).attr("src"),b=w;var k=new Image;if(k.onload=function(){var c=$(window).width(),g=$(window).height(),a=this.width,h=this.height,v=this.width,w=this.height,k=c/g,y=a/h;k>y?h>g&&(h=parseInt(g-100),a=parseInt(h*y)):a>c&&(a=parseInt(c-100),h=parseInt(a/y)),$(".bigimg").css({height:h,width:a,marginLeft:-a/2,marginTop:-h/2}),setTimeout(function(){$(".bigimg").html('<img class="js-imgmaskimg" src="'+b+'" class="ylpic" data-size="'+v+"|"+w+'" style="width:'+a+"px;height:"+h+'px"/>')},300)},k.src=b,$(".detail-content").find("img").length>1){$(".bigimgcof .switch").show();var y=$(".detail-content").find("img");y.each(function(i){a==this&&(i==y.length-1&&$(".switch.next").hide(),0==i&&$(".switch.prev").hide())})}else $(".bigimgcof .switch").hide();$(".mask").show(),$(".bigimg").show()}function g(g){var h=$(".detail-content").find("img");h.each(function(i){return a==this?("next"==g?i<h.length-1&&c(h[i+1]):"prev"==g&&0!=i&&c(h[i-1]),!1):void 0})}var a=null;window.Switch=g,$(".detail-content").on("click","img",function(){var g="";g+='<div class="mask" style="display:none;"></div>;',g+='<div class="bigimg"></div>',g+='<div class="bigimgcof">',g+='<span class="switch next icon-right"></span>',g+='<span class="switch prev icon-left"></span>',g+='<i title="关闭" class="close_upLyr icon-close"></i>',g+="</div>",$("body").append(g),a=this,c(this)}),$("body").on("click",".close_upLyr,.mask,.bigimg,.bigimgcof",function(){$(".mask").remove(),$(".bigimg").remove(),$(".bigimgcof").remove()}),$("body").on("click",".bigimgcof .next",function(){return g("next"),!1}),$("body").on("click",".bigimgcof .prev",function(){return g("prev"),!1})});