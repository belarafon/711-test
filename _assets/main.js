;(function ($) {
    function isMobile() {    // preve
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobile()) {
        return;
    }


    var btnSelector = '.promo__btn',
        blockSelector = '.promo__col',
        imageSelector = '.promo__image',
        focusClass = 'focused',
        blurClass = 'blured';

    $(document).on('mouseenter mouseleave', btnSelector, function (e) {
        var btn = $(this),
            scope = btn.closest(blockSelector),
            img = scope.find(imageSelector),
            siblingImg = scope.siblings(blockSelector).find(imageSelector);

        if (e.type === 'mouseenter') {
            img.addClass(focusClass);
            siblingImg.addClass(blurClass);
        } else {
            $(imageSelector).removeClass(focusClass + ' ' + blurClass)
        }
    });
})(jQuery);