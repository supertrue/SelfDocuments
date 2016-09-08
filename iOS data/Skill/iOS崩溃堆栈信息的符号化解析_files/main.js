requirejs.config({
    baseUrl: 'dist/js',
    urlArgs: 'bust=1471917607606',
    waitSeconds: 0,

    paths: {
        jquery: 'jquery.min',
        doT: 'doT.min',
        uploadify: 'jquery.uploadify',
        "jquery-mousewheel": 'jquery.mousewheel',
        "moment": "moment.min",
        "daterangepicker": "dateRangePicker/jquery.daterangepicker",
        datetimepicker: 'datetimepicker/build/jquery.datetimepicker.full.min',
        'ckeditor-jquery': 'ckeditor/adapters/jquery',
        'ckeditor-core' : 'ckeditor/ckeditor',
        'zeroClipboard' : 'zeroclipboard/dist/ZeroClipboard.min',
        'echarts' : 'echarts/echarts.common.min',
        'echarts-theme' : 'echarts/echarts.theme.macarons',
        'slick' : 'slick/slick.min'
    },

    shim: {
        "uploadify": ["jquery"],
        "datetimepicker": ["jquery"],
        "marquee": ["jquery"],
        "daterangepicker": ["moment", "jquery"],
        "ckeditor-jquery": ['jquery', 'ckeditor-core']
    }
    /*

    packages: [
        {
            name: 'echarts',
            location: 'echarts/src',
            main: 'echarts'
        },
        {
            name: 'zrender',
            location: 'zrender/src',
            main: 'zrender'
        }
    ]
    */
});

requirejs(['jquery', 'MobileAppSafety'], function ($, MAS) {
    $(document).ready(function () {
        window.MAS = MAS;
        MAS.init();
        MAS.Widget.Nav.init(".m-nav");
    });
});

// polyfill
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

if ( !Date.prototype.toISOString ) {
    ( function() {

        function pad(number) {
            if ( number < 10 ) {
                return '0' + number;
            }
            return number;
        }

        Date.prototype.toISOString = function() {
            return this.getUTCFullYear() +
                '-' + pad( this.getUTCMonth() + 1 ) +
                '-' + pad( this.getUTCDate() ) +
                'T' + pad( this.getUTCHours() ) +
                ':' + pad( this.getUTCMinutes() ) +
                ':' + pad( this.getUTCSeconds() ) +
                '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
                'Z';
        };

    }() );
}

if ( !Array.prototype.forEach ) {

    Array.prototype.forEach = function forEach( callback, thisArg ) {

        var T, k;

        if ( this == null ) {
            throw new TypeError( "this is null or not defined" );
        }

        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if ( typeof callback !== "function" ) {
            throw new TypeError( callback + " is not a function" );
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if ( arguments.length > 1 ) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while( k < len ) {

            var kValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if ( k in O ) {

                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[ k ];

                // ii. Call the Call internal method of callback with T as the this value and
                // argument list containing kValue, k, and O.
                callback.call( T, kValue, k, O );
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}

/*
(function(window) { // hashchange

    // 如果浏览器原生支持该事件,则退出
    if ( "onhashchange" in window.document.body ) { return; }

    var location = window.location,
        oldURL = location.href,
        oldHash = location.hash;

    // 每隔100ms检测一下location.hash是否发生变化
    setInterval(function() {
        var newURL = location.href,
            newHash = location.hash;

        // 如果hash发生了变化,且绑定了处理函数...
        if ( newHash != oldHash && typeof window.onhashchange === "function" ) {
            // execute the handler
            window.onhashchange({
                type: "hashchange",
                oldURL: oldURL,
                newURL: newURL
            });

            oldURL = newURL;
            oldHash = newHash;
        }
    }, 100);

})(window);
*/