/**
 * Created by xux on 14-7-29.
 */
var Apollo = {};

Apollo.ajax = function(url,type,data,dataType){
    var _result = {};
    $.ajax( {
            "dataType": dataType,
            async:false,
            "type": type,
            "url": url,
            "data": data,
//            "headers":{
//                'Content-Type':'application/json;charset=UTF-8'
//            },
            "success": function(data,status,xhr){
                _result = data;
            },
            error:function(xhr,status,error){
                var fb = eval('('+xhr.responseText+')');
                console.error(fb);

            }}
    );
    return _result;
}
Apollo.put = function(url,data){
    return this.ajax(url,'PUT',data,"json");
};
Apollo.post = function(url,data){
    return this.ajax(url,'POST',data,"json");
};
Apollo.get = function(url,data){
    return this.ajax(url,'GET',data,"json");
};
Apollo.html = function(url,data){
    return this.ajax(url,'GET',data,"HTML");
};

