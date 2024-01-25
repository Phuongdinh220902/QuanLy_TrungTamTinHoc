import $ from 'jquery';

// Tiếp theo, bạn có thể sử dụng $ như bình thường
$(document).ready(function () {
    if (window.matchMedia("(min-width: 992px)").matches) {
        $('.mega-menu, .mega-title, .mega-no-sub, .mega-gioithieu').hover(function () {
            $('.mega-sub-menu').hide();
            $('.menu-gioi-thieu').show();
            $(this).parent().css('height', 'auto');
        })
        $(".mega-has-sub").hover(function () {
            $('.menu-gioi-thieu').hide();
            $('.mega-sub-menu').hide();
            $('#' + $(this).data("id")).show();
            $(this).parent().css('min-height', 'calc(100vh - 200px)');
            $('div.mega-sub-menu > ul.sub-menu').css('height', $(this).parent().css('height'));
        }, function () {
        });
    } else {
        $(".mega-has-sub a").click(function (event) {
            $('.menu-gioi-thieu').hide();
            $('.mega-sub-menu').hide();
            //alert($(this).parent().data("id"));
            $('.mega-sub-mobile').html("");
            $(this).parent().find('div.mega-sub-mobile').html($('#' + $(this).parent().data("id")).html());
            $(this).parent().find('ul.sub-menu').show();
            event.preventDefault();
        });
    }

});
