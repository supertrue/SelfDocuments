define(["jquery", "apkpack/widget/nav", "apkpack/utils/router", "apkpack/utils/utils", "apkpack/utils/listener"], function ($, Nav, router, utils, masListener) {
    return {

        init: function () {
            initBaseEvent();

            router.router(window.location.hash);
        },

        Widget: {
            // Carousel: new Carousel().init(".m-slide"),
            Nav: new Nav()
        },

        User: utils.getCurrentUser(),
        Dumply: {},
        env: 'prod'
    };

    function initBaseEvent() {
        masListener.index.common();

        $(window).on('hashchange', function () {
            // tmp
            $(".xdsoft_datetimepicker").hide();
            utils.hideRightSideBtns();

            router.router(window.location.hash);
        }).on("click", function (e) {

            setTimeout(function () {
                if ($(e.target).parents(".m-select-ctn:visible").length == 0) {
                    $(".m-select-ctn:visible").fadeOut();
                }

                if($(e.target).parents(".search-tooltip:visible").length == 0) {

                    $(".search-tooltip:visible").fadeOut();
                }
            })
        });
    }
});
