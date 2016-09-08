/**
 * ucmsg模板
 * 
 */
var CURS_MSG = (function(_window){
    var protocol = 'https://';
    var url = protocol + 'yun.reg.163.com/cloud/out/1.0.0/yun_20160819104659.js';
    var zcUrl = protocol + 'yun.reg.163.com/cloud/out/1.0.0/yun_zc_20160819104659.js';
    var wapUrl = protocol + 'yun.reg.163.com/cloud/out/wap/1.0.0/yun_wap_20160819104659.js'
    var doc = _window.document;
    var isTypeOf = function(_data,_type){
        try{
            _type = _type.toLowerCase();
            if (_data===null) return _type=='null';
            if (_data===undefined) return _type=='undefined';
            return Object.prototype.toString.call(_data).toLowerCase()=='[object '+_type+']';
        }catch(e){
            return !1;
        }
    };
     var _request = function(callback,url,loc){
             if(isTypeOf(callback,'function')){
                var script = doc.createElement("script");
                script.type = "text/javascript";
                // 加载完成回调处理
                // IE
                if(script.readyState){
                    script.onreadystatechange = function(){
                        if(script.readyState == "loaded" || script.readyState == "complete"){
                            script.onreadystatechange = null;
                            callback();
                            return;
                        }
                    }
                } else{
                    // Others
                    script.onload = function(){
                        callback();
                    }
                }
                
                script.src = url;
                if(!loc){
                    loc = 'body';
                }
                var location = doc.getElementsByTagName(loc)[0];
                // doc.body.appendChild(script);
                location.appendChild(script);
            }
        }
    return{
        getJs: function(callback,loc){
            _request(callback,url,loc);
        },
        getZcJs: function(callback,loc){            
            _request(callback,zcUrl,loc);
        },
        getWapJs: function(callback,loc){
            _request(callback,wapUrl,loc);
        }
        
    }
})(window);

