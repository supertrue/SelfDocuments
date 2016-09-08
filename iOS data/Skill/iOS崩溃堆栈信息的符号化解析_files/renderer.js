define(["jquery","doT","apkpack/utils/listener","apkpack/utils/utils","apkpack/utils/renderUtils"],function(e,t,a,r,n){function i(){this.toggleBanner=function(t){var a=e(".g-bn");void 0===t?a.is(":visible")?(a.hide(),e(".g-hd").removeClass("hasbn")):(a.show(),e(".g-hd").addClass("hasbn")):t?(a.show(),e(".g-hd").addClass("hasbn")):(a.hide(),e(".g-hd").removeClass("hasbn"))}}function s(t,a,r){e(".content").removeClass("visible"),t.html(a(r)).addClass("visible")}return i.prototype.login=function(){var t=this;return requirejs(["text!../html/userCenter/login.html"],function(t){e("body").append(t),a.bindLogin()}),t},i.prototype.showErrorPage=function(a){var r=this;switch(a){default:r.toggleBanner(!1),requirejs(["text!../html/404.html"],function(a){var r=t.template(a);e(".content").removeClass("visible"),e(".content.errorPage").html(r()).addClass("visible")})}},i.prototype.apkpack=function(){var a=this;return this.renderFeature=function(){a.toggleBanner(!0),requirejs(["text!../html/apkpack/feature.html"],function(a){var r=t.template(a);MAS&&MAS.Widget&&MAS.Widget.Nav&&MAS.Widget.Nav.changeActive("#apkpack/feature"),s(e(".content.apkpack"),r,null)})},this},i.prototype.dumply={crash:function(){requirejs(["text!../html/dumply/crash.html"],function(i){var s=r.parseDumplyParam(),d=s.appId||MAS.User.currentApp.appId,o=t.template(i),l={currentApp:MAS.User.currentApp,settings:r.getUserSettings("crash")};e(".dashmn").html(o(l)),e(".dashsd a").removeClass("act").parent().find(".crash").addClass("act");var p={type:"post",data:{appId:d}};e.ajax("version/queryallversion.do",p).then(function(a){if(a&&a.success){var n=a.data&&a.data.list||[],i=e("#appVersionSelector").parents(".m-select3"),d="{{~it:version:index}}<li data-option-index='{{!version}}' title='{{!version}}'>{{!version}}</li>{{~}}",o=t.template(d),l=o(n);i.find("ul").append(l),s&&s.version&&(i.find("span.selected-ctn").html(s.version),i.find("input[name=version]").val(s.version))}else r.showAjaxError(a)}).then(function(){var t={appId:MAS.User.currentApp.appId};e.ajax("/crash/getrealtimecrashnum.do",{type:"POST",data:t}).then(function(t){t&&t.success&&t.data&&(e("#crashNum").html(t.data.crashNum).attr("title",t.data.crashNum),e("#crashUserNum").html(t.data.userNum).attr("title",t.data.userNum),e("#crashRate").html(t.data.crashRate).attr("title",t.data.crashRate),e("#totalUserNum").html(t.data.totalUserNum).attr("title",t.data.totalUserNum))}),requirejs(["echarts","echarts-theme"],function(a,r){t.chartType="rate",t.time="day",t.version=JSON.stringify([""]);var i={dataUrl:"crash/getcrashtrend.do",ajaxParam:{data:t},chartContainer:e("#trendToday .chart")[0],tooltipFormatter:"时间点：{b}<br>Crash 率 {c}%"};n.dumply.showTrendChart(i)}),n.dumply.showDumpList(),a.dumply.bindDumpList()}).always(function(){a.dumply.bindCrashLog()})})},anr:function(){requirejs(["text!../html/dumply/anr.html"],function(i){var s=e(".m-dash .dashsd a.anr");s.hasClass("new-feature")&&(s.removeClass("new-feature"),localStorage.setItem("isReadAnr",!0));var d=r.parseDumplyParam(),o=d.appId||MAS.User.currentApp.appId,l={currentApp:MAS.User.currentApp,settings:r.getUserSettings("anr")},p=t.template(i);e(".dashmn").html(p(l)),e(".dashsd a").removeClass("act").parent().find(".anr").addClass("act");var c={type:"post",data:{appId:o}};e.ajax("version/queryallversion.do",c).then(function(a){if(a&&a.success){var n=a.data&&a.data.list||[],i=e("#appVersionSelector").parents(".m-select3"),s="{{~it:version:index}}<li data-option-index='{{!version}}' title='{{!version}}'>{{!version}}</li>{{~}}",d=t.template(s),o=d(n);i.find("ul").append(o)}else r.showAjaxError(a)}).then(function(){var t={appId:MAS.User.currentApp.appId};e.ajax("anr/getRealtimeNum.do",{type:"POST",data:t}).then(function(t){t&&t.success&&t.data&&(e("#anrNum").html(t.data.anrNum).attr("title",t.data.anrNum),e("#anrUserNum").html(t.data.userNum).attr("title",t.data.userNum),e("#anrRate").html(t.data.anrRate).attr("title",t.data.anrRate),e("#anrTotalUserNum").html(t.data.totalUserNum).attr("title",t.data.totalUserNum))}),requirejs(["echarts","echarts-theme"],function(a,r){var i=a.init(e("#anrTrend .chart")[0],r);MAS.echarts?MAS.echarts.anr=i:MAS.echarts={anr:i},i.showLoading(),t.chartType="rate",t.time="day",t.version=JSON.stringify([""]);var s={dataUrl:"anr/trend.do",ajaxParam:{data:t},chartContainer:e("#anrTrend .chart")[0],tooltipFormatter:"时间点：{b}<br>"+("android"===MAS.User.currentApp.os?"ANR ":"卡顿")+"率 {c}%"};n.dumply.showTrendChart(s)}),n.dumply.showAnrList(),a.dumply.bindAnrList()}).always(function(){}).always(function(){a.dumply.bindAnr()})})},realTime:function(){requirejs(["text!../html/dumply/realTime.html"],function(i){e(".dashmn").html(i),e(".dashsd a").removeClass("act").parent().find(".now").addClass("act");var s=e("input[name=version]"),d=e(".version-select"),o=r.parseDumplyParam(),l=o.id||MAS.User.currentApp.appId,p={type:"post",data:{appId:l}};e.ajax("version/queryallversion.do",p).then(function(e){if(e&&e.success){var a=e.data&&e.data.list||[],n="{{~it:version:index}}<li data-option-index='{{!version}}' title='{{!version}}'>{{!version}}</li>{{~}}",i=t.template(n),s=i(a);d.find("ul").append(s),o&&o.version&&(d.find("span.selected-ctn").html(o.version),d.find("input[name=version]").val(o.version))}else r.showAjaxError(e)}).then(function(){requirejs(["datetimepicker"],function(){var a=o.version||s.val(),i=o.date||(new Date).dateFormat("Y-m-d"),d={dataUrl:"crash/getrealtimecrashtrend.do",time:"day",ajaxParam:{type:"POST",data:{appId:l,version:a,date:i}},chartContainer:e("div.trend-chart")[0]};e.datetimepicker.setLocale("zh"),e("#realTimeDatePicker").datetimepicker({format:"Y-m-d",timepicker:!1,maxDate:0,defaultDate:new Date,minDate:"-1970/01/61",onSelectDate:function(e,t){var n=e.dateFormat("Y-m-d");r.createHash("#dumply/crashLog/realTime/#id="+l+"&version="+a+"&date="+n)}}).val(i),n.dumply.showTrendChart(d),e.ajax("crash/gettop3list.do",d.ajaxParam).then(function(n){if(n&&n.success){var i=t.template(e("#top3Tpl").text()),s=n.data&&n.data||{};s.version=a,e(".m-table3 tbody").html(i(s)).parents(".top3-container").removeClass("loading")}else r.showAjaxError(n)})})}).always(function(){a.dumply.bindRealtime()})})},trend:function(){requirejs(["text!../html/dumply/trend.html"],function(i){var s=MAS.User.currentApp,d=t.template(i);e(".dashmn").html(d(s.os)),e(".dashsd a").removeClass("act").parent().find(".trend").addClass("act");var o=r.parseDumplyParam(),l=o.id||MAS.User.currentApp.appId,p={type:"post",data:{appId:l}};e.ajax("version/queryallversion.do",p).then(function(a){if(a&&a.success){var n=a.data&&a.data.list||[],i="{{~it:version:index}}<li data-option-index='{{!version}}' title='{{!version}}'>{{!version}}</li>{{~}}",s=t.template(i),d=s(n);if(e(".version-list").append(d),o&&o.version&&(e("input[name='version']").val(o.version),e(".version-content .selected-ctn").text(e("li[data-option-index='"+o.version+"']").text())),o&&o.period){e("input[name='period']").val(o.period);var l="custom"!=o.period?e("li[data-option-index='"+o.period+"']").text():o.startDate+" to "+o.endDate;e(".period-content .selected-ctn").text(l)}}else r.showAjaxError(a)}).then(function(){requirejs(["daterangepicker","moment"],function(t,r){var n=e("#dateRange").data("dateRangePicker");n||e("#dateRange").dateRangePicker({startDate:r().subtract(2,"months").format(),endDate:r().format(),getValue:function(){return this.innerHTML},setValue:function(e){this.innerHTML=e}}).bind("datepicker-open",function(){var t=e(".period-content:visible").offset();e(".date-picker-wrapper").css({top:t.top+50+"px",left:t.left+"px"})}).bind("datepicker-apply",function(e,t){a.dumply.bindTrendSelectDateRange.call(this,t)});var i=e("#dateRangeAnr").data("dateRangePicker");i||e("#dateRangeAnr").dateRangePicker({startDate:r().subtract(2,"months").format(),endDate:r().format(),getValue:function(){return this.innerHTML},setValue:function(e){this.innerHTML=e}}).bind("datepicker-open",function(){var t=e(".period-content:visible").offset();e(".date-picker-wrapper").css({top:t.top+50+"px",left:t.left+"px"})}).bind("datepicker-apply",function(e,t){a.dumply.bindAnrTrendSelectDateRange.call(this,t)})}),n.dumply.showTrend(),n.dumply.showAnrTrend()}).always(function(){a.dumply.bindTrend()})})},setting:function(i){var s=MAS.User.currentApp;requirejs(["text!../html/dumply/setting.html","apkpack/utils/data"],function(d,o){e(".dashmn").html(d),e(".dashsd a").removeClass("act").parent().find(".setting").addClass("act");var l=i&&i.subTab||"app-info",p=e("#"+l+"TabTpl").text(),c=t.template(p);switch(e(".tvhd li").on("click",function(){var t=e(this).attr("class").replace("act","").trim();r.createHash("#dumply/crashLog/setting/#subTab="+t+"&id="+MAS.User.currentApp.appId)}),e(".m-tabview li").removeClass("act"),e(".m-tabview li."+l).addClass("act"),l){case"version-manager":n.dumply.showVersionList(),a.dumply.bindSettingVersion();break;case"member":var m={type:"POST",data:{queryMemberInfo:JSON.stringify({appId:s.appId})}};i.notab&&(e(".m-tabview .tvhd").hide(),e(".dashsd a").removeClass("act").parent().find(".user").addClass("act")),e.ajax("member/querylist.do",m).then(function(t){if(t&&t.success){var n=t.data&&t.data.list||[];e("#memberContainer").html(c(n)).removeClass("loading"),a.dumply.bindSettingMember()}else e("#memberContainer").removeClass("loading"),r.showAjaxError(t)});break;case"alert":var m={type:"POST",data:{queryMemberInfo:JSON.stringify({appId:s.appId})}};e.ajax("member/querylist.do",m).then(function(t){if(t&&t.success){var n={};n.list=t.data&&t.data.list||[],n.userRole=MAS.User.role,e("#alertContainer").html(c(n)),a.dumply.bindSettingAlert()}else r.showAjaxError(t)});break;case"app-info":default:var m={type:"POST",data:{appId:s.appId}};e.ajax("app/querybyid.do",m).then(function(t){t&&t.success?requirejs(["moment","zeroClipboard"],function(r,n){var i={};t.data&&(i=t.data.object),i.createTime=r(i.createTime).format("YYYY-MM-DD HH:mm:ss"),i.subTypeArr=o.subType[i.type],i.appKeyPartial=i.appKey.substr(0,20)+"********************",e("#appInfoContainer").html(c(i));var s=new n(e(".copy-settings").get(0)),d='<meta-data android:name="BUGRPT_APPID" android:value="${appId}"></meta-data>'.replace("${appId}",i.appId);s.on("error",function(){s.destroy(),e(".copy-settings").off().on("click",function(){prompt("未检测到flash，请按 Ctrl + c 手动复制",d)})}),s.on("ready",function(){s.on("copy",function(e){e.clipboardData.setData("text/plain",d)}).on("aftercopy",function(t){e(".copy-tip").text("复制成功").fadeIn().fadeOut(1e3)})}),i&&i.logo&&e(".uplogo .applogo").css({background:"url("+i.logo.replace("\\","/")+") no-repeat left top"});var l=i&&i.subType||0;e(".app-sub-type").find(".selected-ctn").text(i.subTypeArr[l]),a.dumply.bindSettingAppInfo()}):r.showAjaxError(t)})}})},alert:function(){var n=e(".m-dash .dashsd a.alert");n.hasClass("new-feature")&&(n.removeClass("new-feature"),localStorage.setItem("isReadAlert",!0)),requirejs(["text!../html/dumply/alert.html"],function(n){e(".dashmn").html(n).closest(".m-dash").find(".dashsd a").removeClass("act").parent().find("a.alert").addClass("act");var i,s=r.parseDumplyParam().subTab||"normal-alert",d={appId:MAS.User.currentApp.appId};switch(e("#alertSettingContent.m-tabview .tvhd li").removeClass("act").filter("[data-tab-index="+s+"]").addClass("act").parents(".m-tabview").find(".tvbd > ul > li").removeClass("act").filter("."+s).addClass("act"),s){case"special-alert":i=e("#specialAlertTpl").text(),d.warnType=1;break;case"daily-report":i=e("#dailyReportTpl").text(),d.warnType=2;break;case"normal-alert":default:i=e("#normalAlertTpl").text(),d.warnType=0}e.ajax("warn/query.do",{data:{warnJson:JSON.stringify(d)}}).then(function(a){if(a&&a.success===!0){var n=t.template(i),d=a.data&&a.data.warnJson||{};if(d.userRole=MAS.User.role,e("#"+s+"Container").html(n(d)).removeClass("loading"),0!==MAS.User.currentApp.role){var o=e("#alertSettingContent");o.find(".u-btn-save-alert, .btn-add-alert, input[type=checkbox], input[type=radio], input[data-validate]").attr("disabled",!0),o.find(".m-radio:visible").append("<span class='form-tip'>若需要修改配置，请联系当前APP的管理员</span>").find("span.form-tip").show()}"daily-report"===s&&require(["datetimepicker"],function(t){e.datetimepicker.setLocale("zh"),e("#dailyReportPicker").datetimepicker({datepicker:!1,format:"H:i",step:30,defaultTime:d.sendTime})}),e(".m-select3.multi.version-list span.f-usn.selected-ctn").each(function(t,a){var r=e(a);""===r.text()&&r.text(r.data("defaultText"))})}else r.showAjaxError(a)},function(e){r.niceAlert("网路错误，请稍候重试")}).always(function(){a.dumply.bindSettingAlert()})})},user:function(){requirejs(["text!../html/dumply/user.html"],function(t){e(".dashmn").html(t)})},detail:function(){require(["text!../html/dumply/detail.html"],function(i){e(".dashmn").html(i);var s=r.parseDumplyParam();e.ajax("crash/getcrashtype.do",{type:"POST",data:{queryCrashType:JSON.stringify(s)}}).then(function(i){if(i&&i.success){s.crashType=i.data.object.crashType,s.version=i.data.object.version,s.time=s.time||"twoMonths",requirejs(["echarts","echarts-theme"],function(t,a){function r(t){var a="crash/"+t+"NumByDump.do";s.crashType=i.data.object.crashType,e.ajax({url:a,data:s,type:"POST",success:function(a){var r=a,i=[],s=[];e.isArray(r)&&r.forEach(function(e){if(e.sdkLevel&&(i.push(e.sdkLevel),s.push({value:e.num,name:e.sdkLevel})),e.model){var t=e.manufacturer+" - "+e.model;i.push(t),s.push({value:e.num,name:t})}});var l=e.extend(!0,{},o);l.legend.data=i,l.series[0].data=s,"os"===t?(l.title.text="系统版本分布",d.hideLoading(),d.setOption(l)):(l.title.text="设备型号分布",n.hideLoading(),n.setOption(l))}})}var n=t.init(e("#deviceChart")[0],a),d=t.init(e("#osChart")[0],a);n.showLoading({effect:"whirling"}),d.showLoading({effect:"whirling"});var o={title:{text:"",x:94,y:"bottom"},tooltip:{trigger:"item",showDelay:0,formatter:"{b}<br/>{c} ({d}%)"},legend:{orient:"vertical",left:"right",top:"middle",itemGap:8,data:[]},series:[{name:"崩溃设备分布",type:"pie",radius:"80%",center:["30%","45%"],selectedMode:"single",selectedOffset:10,itemStyle:{normal:{label:{show:!1,position:"inner"},labelLine:{show:!1}}},data:[]}]};r("os"),r("device")}),requirejs(["daterangepicker","moment"],function(t,r){var n=e("#dateRange").data("dateRangePicker");n||e("#dateRange").dateRangePicker({startDate:r().subtract(2,"months").format(),endDate:r().format(),getValue:function(){return this.innerHTML},setValue:function(e){this.innerHTML=e}}).bind("datepicker-open",function(){var t=e(".show-select-ctn").offset();e(".date-picker-wrapper").css({top:t.top+50+"px",left:t.left+e("#dumpDetailCtn").find(".show-select-ctn").outerWidth()-453+"px"})}).bind("datepicker-apply",function(t,n){var i=e("#dumpDetailCtn").find(".m-select3.mini .selected-ctn"),s="YYYY-MM-DD";n.startDate=r(n.date1).format(s),n.endDate=r(n.date2).format(s),"1970-01-01 to 1970-01-01"==n.value?(n.startDate=r().subtract(6,"days").format(s),n.endDate=r().format(s)):"invalid date"==n.endDate.toLowerCase()&&(n.endDate=n.startDate),a.dumply.bindDetailSelectDateRange.call(this,n),i.text(n.startDate+" to "+n.endDate)})});var d=t.template(e("#dumpDetailHeaderTpl").text()),o=i.data&&i.data.object.crashType;e(".dump-header").html(d(i.data.object)).data("crashType",o);var l=s.version||e("#appVersion").text(),p={type:"POST",data:{appId:s.appId||MAS.User.currentApp.appId,version:JSON.stringify([l]),crashType:o,chartType:"num",time:"week"}},c={dataUrl:"crash/getcrashtrend.do",time:s.period||p.data.time,ajaxParam:p,chartContainer:e(".trend-chart-container")[0]};n.dumply.showTrendChart(c),s.offset=0,s.crashType=i.data.object.crashType;var m=i.data.object.reportNum;if(5>m){e("#recentCrashTitle").text("最近"+m+"次 Crash");for(var u=m+1;5>=u;u++)e(".tvhd.recentCrash").find("li:nth-child("+u+")").hide()}s.version=s.version?s.version:i.data.object.version.trim(),n.dumply.showRecentCrash(s)}else r.showAjaxError(crasshTypeData)}),a.dumply.bindDetail()})},anrDetail:function(){require(["text!../html/dumply/anrDetail.html"],function(i){e(".dashmn").html(i);var s=r.parseDumplyParam();e.ajax("anr/getType.do",{type:"POST",data:{queryAnrType:JSON.stringify(s)}}).then(function(i){if(i&&i.success){var d=i.data.object.type;s.anrType=d,s.anrTypeId=s.typeId,s.version=i.data.object.version,s.time=s.time||"twoMonths",requirejs(["echarts","echarts-theme"],function(t,a){function r(t){var a="anr/"+t+"Num.do";s.anrType=d,e.ajax({url:a,data:s,type:"POST",success:function(a){var r=a,s=[],d=[];e.isArray(r)&&r.forEach(function(e){if(e.sdkLevel&&(s.push(e.sdkLevel),d.push({value:e.num,name:e.sdkLevel})),e.model){var t=e.manufacturer+" - "+e.model;s.push(t),d.push({value:e.num,name:t})}});var l=e.extend(!0,{},o);l.legend.data=s,l.series[0].data=d,"os"===t?(l.title.text="系统版本分布",i.hideLoading(),i.setOption(l)):(l.title.text="设备型号分布",n.hideLoading(),n.setOption(l))}})}var n=t.init(e("#deviceChart")[0],a),i=t.init(e("#osChart")[0],a);n.showLoading({effect:"whirling"}),i.showLoading({effect:"whirling"});var o={title:{text:"",x:94,y:"bottom"},tooltip:{trigger:"item",showDelay:0,formatter:"{b}<br/>{c} ({d}%)"},legend:{orient:"vertical",left:"right",top:"middle",itemGap:8,data:[]},series:[{name:"卡顿设备分布",type:"pie",radius:"80%",center:["30%","45%"],selectedMode:"single",selectedOffset:10,itemStyle:{normal:{label:{show:!1,position:"inner"},labelLine:{show:!1}}},data:[]}]};r("os"),r("device")}),requirejs(["daterangepicker","moment"],function(t,r){var n=e("#dateRange").data("dateRangePicker");n||e("#dateRange").dateRangePicker({startDate:r().subtract(2,"months").format(),endDate:r().format(),getValue:function(){return this.innerHTML},setValue:function(e){this.innerHTML=e}}).bind("datepicker-open",function(){var t=e(".show-select-ctn").offset();e(".date-picker-wrapper").css({top:t.top+50+"px",left:t.left+e("#dumpDetailCtn").find(".show-select-ctn").outerWidth()-453+"px"})}).bind("datepicker-apply",function(t,n){var i=e("#anrDetailCtn").find(".m-select3.mini .selected-ctn"),s="YYYY-MM-DD";n.startDate=r(n.date1).format(s),n.endDate=r(n.date2).format(s),"1970-01-01 to 1970-01-01"==n.value?(n.startDate=r().subtract(6,"days").format(s),n.endDate=r().format(s)):"invalid date"==n.endDate.toLowerCase()&&(n.endDate=n.startDate),a.dumply.bindAnrDetailSelectDateRange.call(this,n),i.text(n.startDate+" to "+n.endDate)})});var o=t.template(e("#anrDetailHeaderTpl").text());e(".dump-header").data("anrType",d).html(o(i.data.object));var l=s.version||e("#appVersion").text(),p={type:"POST",data:{appId:s.appId||MAS.User.currentApp.appId,version:JSON.stringify([l]),anrType:d,time:"week",chartType:"num"}},c={dataUrl:"anr/trend.do",time:s.period||p.data.time,ajaxParam:p,chartContainer:e(".trend-chart-container")[0]};n.dumply.showTrendChart(c),s.offset=0,s.anrType=d;var m=i.data.object.anrNum,u="A"===i.data.object.appId[0]?"android":"ios";if(5>m){e("#recentCrashTitle").text("最近"+m+"次"+("android"===u?" ANR":"卡顿"));for(var h=m+1;5>=h;h++)e(".tvhd.recentCrash").find("li:nth-child("+h+")").hide()}else"ios"===u&&(e("#recentCrashTitle").text("最近5次卡顿"),e(".titleIsAnr").text("启动 / 卡顿时间"));s.version=s.version?s.version:i.data.object.version.trim(),s.by="recent",n.dumply.showAnrDetail(s)}else r.showAjaxError(i)}),a.dumply.bindAnrDetail()})},detailList:function(){var a=r.parseDumplyParam(),n={type:"POST",data:{queryCrashType:JSON.stringify(a)}};e.ajax("crash/getcrashtype.do",n).then(function(n){if(n&&n.success){var i=t.template(e("#dumpDetailHeaderTpl").text());e(".dump-header").html(i(n.data.object)),a.crashType=n.data.object.crashType,a.version=n.data.object.version;var s={type:"POST",data:{queryCrashInfo:JSON.stringify(a)}};e.ajax("crash/getcrashinfolist.do",s).then(function(i){i&&i.success?requirejs(["moment"],function(r){var s=t.template(e("#dumpListTpl").html()),d=i.data&&i.data.list||[];d.forEach(function(e){e.reportTime=r(e.reportTime).format("YYYY-MM-DD HH:mm:ss")}),e(".dump-list ul").html(s(d)),e(".dump-list li").first().click();var o={count:n.data.object.reportNum||0,page:a.page||1,limit:a.limit||20};o.offset=(o.page-1)*o.limit,o.totalPage=Math.ceil(o.count/o.limit);var l=t.template(e("#paginatorTpl").text());e(".dump-list ul").append(l(o))}):r.shwoAjaxError()})}else r.showAjaxError(n)})},anrDetailList:function(){var a=r.parseDumplyParam(),n={type:"POST",data:{queryAnrType:JSON.stringify(a)}};e.ajax("anr/getType.do",n).then(function(n){if(n&&n.success){var i="A"===n.data.object.appId[0]?"android":"ios";"ios"===i&&e(".titleIsAnr").text("启动 / 卡顿时间");var s=t.template(e("#anrHeaderTpl").text());e(".dump-header").html(s(n.data.object)),a.anrType=n.data.object.type,a.version=n.data.object.version;var d={type:"POST",data:{queryAnrInfo:JSON.stringify(a)}};e.ajax("anr/getInfoList.do",d).then(function(i){i&&i.success?requirejs(["moment"],function(r){var s=t.template(e("#dumpListTpl").html()),d=i.data&&i.data.list||[];d.forEach(function(e){e.insertTime=r(e.insertTime).format("YYYY-MM-DD HH:mm:ss")});var o=e(".dump-list ul");o.html(s(d)),o.find("li").first().click();var l={count:n.data.object.anrNum||0,page:a.page||1,limit:a.limit||20};l.offset=(l.page-1)*l.limit,l.totalPage=Math.ceil(l.count/l.limit);var p=t.template(e("#paginatorTpl").text());o.append(p(l))}):r.shwoAjaxError()})}else r.showAjaxError(n)})}},i});