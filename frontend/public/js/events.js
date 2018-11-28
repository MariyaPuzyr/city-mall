/* hover on filters in map section */
$('.map-info__filters').hover(function () {
    if ($('.map-info__type--title').is(':visible') == true) {
        $('.map-info__type--title').hide();
        $('.map-info__filters').removeClass('hover');
    }
    else {
        $(this).children('.map-info__type--title').show();
        $(this).addClass('hover');
    }
});

if ($(window).width() >= 992) {
    /* show description on news block */
    $('.description').hide();
    $('.small-news__info').hover(function () {
        $(this).children('.description').slideToggle();
    });
}

/* show all text on seo */
$(".seo-text__all-text").click(function () {
    var t = this;
    if ($(this).data("temp") || $(this).data("temp", $(this).text()),
    "" != $(this).data("link")) {
        var e = $('[data-id="' + $(this).data("link") + '"]');
        if (0 != e.length)
            if ($(this).hasClass("close"))
                $(this).css("opacity", 0),
                    e.removeClass("open"),
                    e.stop().animate({
                        "max-height": 140
                    }, 500, "linear", function () {
                        $(t).stop().animate({
                            opacity: 1
                        }, 500),
                            $(t).removeClass("close");
                        $('.seo-text__shadow').show();
                    }),
                    $(this).text($(this).data("temp"));
            else {
                $(this).css("opacity", 0),
                    e.addClass("open");
                var n = e.children().eq(0).outerHeight();
                e.stop().animate({
                    "max-height": n
                }, 500, "linear", function () {
                    $(t).stop().animate({
                        opacity: 1
                    }, 500),
                        $(t).addClass("close");
                    $('.seo-text__shadow').hide();
                }),
                    ($(this).text() === "Весь текст") ? $(this).text("Скрыть") : $(this).text("Весь текст");
            }
    }
}),

    /**/
    $('.menu-header').click(function () {
        $(this).children('.btn-nav').toggleClass("animated");
        $(this).parents('header').toggleClass('hover');
        $('.fixed-bg').toggle();
        // $('body').toggleClass('overflow');
    });

jQuery(document).ready(function (e) {
    e(".dropdown-toggle").click(function () {
        var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
        e(".button-dropdown .dropdown-menu").hide();
        e(".button-dropdown .dropdown-toggle").removeClass("active");
        if (t) {
            e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
        }
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
    })
});

/**/
$('.menu-header').click(function () {
    $(this).toggleClass('opened');
    $('.header-body').toggleClass('show');
});

/* tooltip on company page */
if ($(".selectpicker").length > 0) {
    $('.selectpicker').selectpicker();
}
if ($(".progress-bar").length > 0) {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');
    });
    /* progress bar on company page */
    $(window).scroll(function () {
        if ($(window).scrollTop() > 800) {
            $(".progress-bar").each(function () {
                each_bar_width = $(this).attr('aria-valuenow');
                $(this).width(each_bar_width + '%');
            });

        }
    });
}
$(function () {
    $(".expand").on("click", function () {
        $('.panel').removeClass('opened');
        $(this).parents('.panel').toggleClass('opened');
    });
});

/* click on print button */
$('.print').click(function () {
    window.print();
});

/* open full info about rent building */
if ($(".view-layouts").length > 0) {
    $('.view-layouts').click(function (event) {
        event.preventDefault();
        $('.special-list__body').removeClass('opened');
        $(this).parents('.special-list__body').toggleClass('opened');
    });
}

/* filter isotope */
if ($(".special-list").length > 0) {
// init Isotope
    var $grid = $('.special-list').isotope({
        // options
    });
// filter items on button click
    $('.news-list__filter--cover').on('click', 'a', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({filter: filterValue});
    });

    /* ========= */


    var $grid_list = $('.special-list').isotope({
        itemSelector: '.special-list__body',
        masonry: {
            columnWidth: 100
        }
    });

    $grid_list.on('click', '.special-list__body', function () {
        // change size of item by toggling gigante class
        $(this).toggleClass('gigante');
        $grid_list.isotope('layout');
    });

}
if ($(".radio-input").length > 0) {
    $('.radio-input').click(function () {
        var input = $('.radio-input:checked');
        if (input) {
            $(this).next('.form-control').removeAttr('disabled');
            console.log('true');
        } else {
            console.log('false');
        }
    });
}