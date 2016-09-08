function jsonToString(obj) {
	var THIS = this;
	switch (typeof (obj)) {
	case 'string':
		return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
	case 'array':
		return '[' + obj.map(THIS.jsonToString).join(',') + ']';
	case 'object':
		if (obj instanceof Array) {
			var strArr = [];
			var len = obj.length;
			for ( var i = 0; i < len; i++) {
				strArr.push(THIS.jsonToString(obj[i]));
			}
			return '[' + strArr.join(',') + ']';
		} else if (obj == null) {
			return 'null';

		} else {
			var string = [];
			for ( var property in obj)
				string.push(THIS.jsonToString(property) + ':'
						+ THIS.jsonToString(obj[property]));
			return '{' + string.join(',') + '}';
		}
	case 'number':
		return obj;
	case false:
		return obj;
	}
}  

/**
 * @author 夏の寒风
 * @time 2012-12-14
 */

// 自定义hashtable
function Hashtable() {
    this._hash = new Object();
    this.put = function(key, value) {
        if (typeof (key) != "undefined") {
            if (this.containsKey(key) == false) {
                this._hash[key] = typeof (value) == "undefined" ? null : value;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    this.remove = function(key) { delete this._hash[key]; }
    this.size = function() { var i = 0; for (var k in this._hash) { i++; } return i; }
    this.get = function(key) { return this._hash[key]; }
    this.containsKey = function(key) { return typeof (this._hash[key]) != "undefined"; }
    this.clear = function() { for (var k in this._hash) { delete this._hash[k]; } }
}
var emotions = new Array();
var categorys = new Array();// 分组
var uSinaEmotionsHt = new Hashtable();
var host="http://www.devstore.cn";
// 初始化缓存，页面仅仅加载一次就可以了
$(function() {
	var app_id = '1362404091';
	$.ajax( {
		dataType : 'jsonp',
		url : 'https://api.weibo.com/2/emotions.json?source=' + app_id,
		success : function(response) {
			categorys.push('默认');
			emotions['默认'] = new Array();
			emotions['默认'].push( {
				name : "[崇拜]",
				icon : host+"/images/face/face_gif/50表情(崇拜).gif"
			});
			uSinaEmotionsHt.put("[崇拜]", host+"/images/face/face_gif/50表情(崇拜).gif");
			emotions['默认'].push( {
				name : "[大笑]",
				icon : host+"/images/face/face_gif/50表情(大笑).gif"
			});
			uSinaEmotionsHt.put("[大笑]", host+"/images/face/face_gif/50表情(大笑).gif");
			emotions['默认'].push( {
				name : "[发狂]",
				icon : host+"/images/face/face_gif/50表情(发狂).gif"
			});
			uSinaEmotionsHt.put("[发狂]", host+"/images/face/face_gif/50表情(发狂).gif");
			emotions['默认'].push( {
				name : "[脸红]",
				icon : host+"/images/face/face_gif/50表情(脸红).gif"
			});
			uSinaEmotionsHt.put("[脸红]", host+"/images/face/face_gif/50表情(脸红).gif");
			emotions['默认'].push( {
				name : "[萌萌哒]",
				icon : host+"/images/face/face_gif/50表情(萌萌哒).gif"
			});
			uSinaEmotionsHt.put("[萌萌哒]", host+"/images/face/face_gif/50表情(萌萌哒).gif");
			emotions['默认'].push( {
				name : "[亲亲]",
				icon : host+"/images/face/face_gif/50表情(亲亲).gif"
			});
			uSinaEmotionsHt.put("[亲亲]", host+"/images/face/face_gif/50表情(亲亲).gif");
			emotions['默认'].push( {
				name : "[色心]",
				icon : host+"/images/face/face_gif/50表情(色心).gif"
			});
			uSinaEmotionsHt.put("[色心]", host+"/images/face/face_gif/50表情(色心).gif");
			emotions['默认'].push( {
				name : "[耍帅吧]",
				icon : host+"/images/face/face_gif/50表情(耍帅吧).gif"
			});
			uSinaEmotionsHt.put("[耍帅吧]", host+"/images/face/face_gif/50表情(耍帅吧).gif");
			emotions['默认'].push( {
				name : "[头顶乌云]",
				icon : host+"/images/face/face_gif/50表情(头顶乌云).gif"
			});
			uSinaEmotionsHt.put("[头顶乌云]", host+"/images/face/face_gif/50表情(头顶乌云).gif");
			emotions['默认'].push( {
				name : "[吐舌]",
				icon : host+"/images/face/face_gif/50表情(吐舌).gif"
			});
			uSinaEmotionsHt.put("[吐舌]", host+"/images/face/face_gif/50表情(吐舌).gif");
			emotions['默认'].push( {
				name : "[托腮思考]",
				icon : host+"/images/face/face_gif/50表情(托腮思考).gif"
			});
			uSinaEmotionsHt.put("[托腮思考]", host+"/images/face/face_gif/50表情(托腮思考).gif");
			emotions['默认'].push( {
				name : "[无语]",
				icon : host+"/images/face/face_gif/50表情(无语).gif"
			});
			uSinaEmotionsHt.put("[无语]", host+"/images/face/face_gif/50表情(无语).gif");
			emotions['默认'].push( {
				name : "[捂嘴笑]",
				icon : host+"/images/face/face_gif/50表情(捂嘴笑).gif"
			});
			uSinaEmotionsHt.put("[捂嘴笑]", host+"/images/face/face_gif/50表情(捂嘴笑).gif");
			emotions['默认'].push( {
				name : "[有灵感]",
				icon : host+"/images/face/face_gif/50表情(有灵感).gif"
			});
			uSinaEmotionsHt.put("[有灵感]", host+"/images/face/face_gif/50表情(有灵感).gif");
			emotions['默认'].push( {
				name : "[赞]",
				icon : host+"/images/face/face_gif/50表情(赞).gif"
			});
			uSinaEmotionsHt.put("[赞]", host+"/images/face/face_gif/50表情(赞).gif");
			emotions['默认'].push( {
				name : "[欢迎]",
				icon : host+"/images/face/face_gif/50表情欢迎.gif"
			});
			uSinaEmotionsHt.put("[欢迎]", host+"/images/face/face_gif/50表情欢迎.gif");
			emotions['默认'].push( {
				name : "[欢迎2]",
				icon : host+"/images/face/face_gif/50表情欢迎2.gif"
			});
			uSinaEmotionsHt.put("[欢迎2]", host+"/images/face/face_gif/50表情欢迎2.gif");
			
			
			emotions['默认'].push( {
				name : "[棒]",
				icon : host+"/images/face/100dev/棒.png"
			});
			uSinaEmotionsHt.put("[棒]", host+"/images/face/100dev/棒.png");
			emotions['默认'].push( {
				name : "[冲击力]",
				icon : host+"/images/face/100dev/冲击力.png"
			});
			uSinaEmotionsHt.put("[冲击力]", host+"/images/face/100dev/冲击力.png");
			emotions['默认'].push( {
				name : "[戴维礼物图]",
				icon : host+"/images/face/100dev/戴维礼物图.png"
			});
			uSinaEmotionsHt.put("[戴维礼物图]", host+"/images/face/100dev/戴维礼物图.png");
			emotions['默认'].push( {
				name : "[灰暗静止]",
				icon : host+"/images/face/100dev/灰暗静止.png"
			});
			uSinaEmotionsHt.put("[灰暗静止]", host+"/images/face/100dev/灰暗静止.png");
			emotions['默认'].push( {
				name : "[看别人下班]",
				icon : host+"/images/face/100dev/看别人下班.png"
			});
			uSinaEmotionsHt.put("[看别人下班]", host+"/images/face/100dev/看别人下班.png");
			emotions['默认'].push( {
				name : "[邋遢]",
				icon : host+"/images/face/100dev/邋遢-1.png"
			});
			uSinaEmotionsHt.put("[邋遢]", host+"/images/face/100dev/邋遢-1.png");
			emotions['默认'].push( {
				name : "[马尾女孩]",
				icon : host+"/images/face/100dev/马尾女孩.png"
			});
			uSinaEmotionsHt.put("[马尾女孩]", host+"/images/face/100dev/马尾女孩.png");
			emotions['默认'].push( {
				name : "[美丽新世界]",
				icon : host+"/images/face/100dev/美丽新世界.png"
			});
			uSinaEmotionsHt.put("[美丽新世界]", host+"/images/face/100dev/美丽新世界.png");
			emotions['默认'].push( {
				name : "[气愤]",
				icon : host+"/images/face/100dev/气愤.png"
			});
			uSinaEmotionsHt.put("[气愤]", host+"/images/face/100dev/气愤.png");
			emotions['默认'].push( {
				name : "[敲代码]",
				icon : host+"/images/face/100dev/敲代码.png"
			});
			uSinaEmotionsHt.put("[敲代码]", host+"/images/face/100dev/敲代码.png");
			emotions['默认'].push( {
				name : "[如鱼得水]",
				icon : host+"/images/face/100dev/如鱼得水.png"
			});
			uSinaEmotionsHt.put("[如鱼得水]", host+"/images/face/100dev/如鱼得水.png");
			emotions['默认'].push( {
				name : "[淑女]",
				icon : host+"/images/face/100dev/淑女.png"
			});
			uSinaEmotionsHt.put("[淑女]", host+"/images/face/100dev/淑女.png");
			emotions['默认'].push( {
				name : "[推门]",
				icon : host+"/images/face/100dev/推门.png"
			});
			uSinaEmotionsHt.put("[推门]", host+"/images/face/100dev/推门.png");
			emotions['默认'].push( {
				name : "[无奈]",
				icon : host+"/images/face/100dev/无奈.png"
			});
			uSinaEmotionsHt.put("[无奈]", host+"/images/face/100dev/无奈.png");
			emotions['默认'].push( {
				name : "[一身轻松]",
				icon : host+"/images/face/100dev/一身轻松.png"
			});
			uSinaEmotionsHt.put("[一身轻松]", host+"/images/face/100dev/一身轻松.png");
			var data = response.data;
			for ( var i in data) {
				if (data[i].category == '') {
					data[i].category = '默认';
				}
				if (emotions[data[i].category] == undefined) {
					emotions[data[i].category] = new Array();
					categorys.push(data[i].category);
				}
				emotions[data[i].category].push( {
					name : data[i].phrase,
					icon : data[i].icon
				});
				uSinaEmotionsHt.put(data[i].phrase, data[i].icon);
			}
		}
	});
});

//替换
function AnalyticEmotion(s) {
	if(typeof (s) != "undefined") {
		 s = s.replace(/<\/?[^>]*>/g,''); 
		 var sArr = s.match(/\[.*?\]/g);
		if(sArr!=null){
			for(var i = 0; i < sArr.length; i++){
				if(uSinaEmotionsHt.containsKey(sArr[i])) {
					var src=uSinaEmotionsHt.get(sArr[i]);
					var reStr;
					if(src.indexOf("http://", 0)!=0){
						src=host+src;
					}
					if(src.indexOf("img.t.sinajs.cn")>-1){
						reStr = "<img src=\""+ src + "\" height=\"22\" width=\"22\" />";
					} else{
						reStr = "<img src=\""+ src + "\" height=\"50\" width=\"50\" />";
					}
					s = s.replace(sArr[i], reStr);
				}
			}
		}
	}
	return s;
}


(function($){
	$.fn.SinaEmotion = function(){
		var target;
		var cat_current;
		var cat_page;
		$("body").on("click",".faceBtn",function(event){
			target=$(this).parent().parent().parent().find("textarea");
			event.stopPropagation();
			var eTop = target.offset().top + target.height() + 15;
			var eLeft = target.offset().left - 1;
			
			if($('#emotions .categorys')[0]){
				$('#emotions').css({top: eTop, left: eLeft});
				$('#emotions').toggle();
				return;
			}
			$('body').append('<div id="emotions"></div>');
			$('#emotions').css({top: eTop, left: eLeft});
			$('#emotions').html('<div>正在加载，请稍候...</div>');
			$('#emotions').click(function(event){
				event.stopPropagation();
			});
			
			$('#emotions').html('<div style="float:right"><a href="javascript:void(0);" id="prev">&laquo;</a><a href="javascript:void(0);" id="next">&raquo;</a></div><div class="categorys"></div><div class="container"></div><div class="page"></div>');
			$('#emotions #prev').click(function(){
				showCategorys(cat_page - 1);
			});
			$('#emotions #next').click(function(){
				showCategorys(cat_page + 1);
			});
			showCategorys();
			showEmotions();
			
		});
		/*$(this).click(function(event){
			event.stopPropagation();
			var eTop = target.offset().top + target.height() + 15;
			var eLeft = target.offset().left - 1;
			
			if($('#emotions .categorys')[0]){
				$('#emotions').css({top: eTop, left: eLeft});
				$('#emotions').toggle();
				return;
			}
			$('body').append('<div id="emotions"></div>');
			$('#emotions').css({top: eTop, left: eLeft});
			$('#emotions').html('<div>正在加载，请稍候...</div>');
			$('#emotions').click(function(event){
				event.stopPropagation();
			});
			
			$('#emotions').html('<div style="float:right"><a href="javascript:void(0);" id="prev">&laquo;</a><a href="javascript:void(0);" id="next">&raquo;</a></div><div class="categorys"></div><div class="container"></div><div class="page"></div>');
			$('#emotions #prev').click(function(){
				showCategorys(cat_page - 1);
			});
			$('#emotions #next').click(function(){
				showCategorys(cat_page + 1);
			});
			showCategorys();
			showEmotions();
			
		});*/
		$('body').click(function(){
			$('#emotions').remove();
		});
		$.fn.insertText = function(text){
			this.each(function() {
				if(this.tagName !== 'INPUT' && this.tagName !== 'TEXTAREA') {return;}
				if (document.selection) {
					this.focus();
					var cr = document.selection.createRange();
					cr.text = text;
					cr.collapse();
					cr.select();
				}else if (this.selectionStart || this.selectionStart == '0') {
					var 
					start = this.selectionStart,
					end = this.selectionEnd;
					this.value = this.value.substring(0, start)+ text+ this.value.substring(end, this.value.length);
					this.selectionStart = this.selectionEnd = start+text.length;
				}else {
					this.value += text;
				}
			});        
			return this;
		}
		function showCategorys(){
			var page = arguments[0]?arguments[0]:0;
			if(page < 0 || page >= categorys.length / 5){
				return;
			}
			$('#emotions .categorys').html('');
			cat_page = page;
			for(var i = page * 5; i < (page + 1) * 5 && i < categorys.length; ++i){
				$('#emotions .categorys').append($('<a href="javascript:void(0);">' + categorys[i] + '</a>'));
			}
			$('#emotions .categorys a').click(function(){
				showEmotions($(this).text());
			});
			$('#emotions .categorys a').each(function(){
				if($(this).text() == cat_current){
					$(this).addClass('current');
				}
			});
		}
		function showEmotions(){
			var category = arguments[0]?arguments[0]:'默认';
			var page = arguments[1]?arguments[1] - 1:0;
			$('#emotions .container').html('');
			$('#emotions .page').html('');
			cat_current = category;
			for(var i = page * 72; i < (page + 1) * 72 && i < emotions[category].length; ++i){
				$('#emotions .container').append($('<a href="javascript:void(0);" title="' + emotions[category][i].name + '"><img src="' + emotions[category][i].icon + '" alt="' + emotions[category][i].name + '" width="22" height="22" /></a>'));
			}
			$('#emotions .container a').click(function(){
				target.insertText($(this).attr('title'));
				$('#emotions').remove();
			});
			for(var i = 1; i < emotions[category].length / 72 + 1; ++i){
				$('#emotions .page').append($('<a href="javascript:void(0);"' + (i == page + 1?' class="current"':'') + '>' + i + '</a>'));
			}
			$('#emotions .page a').click(function(){
				showEmotions(category, $(this).text());
			});
			$('#emotions .categorys a.current').removeClass('current');
			$('#emotions .categorys a').each(function(){
				if($(this).text() == category){
					$(this).addClass('current');
				}
			});
		}
	}
})(jQuery);
