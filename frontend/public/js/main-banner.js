if ($(window).width() >= 1200) {
    $(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {
        if (!$(this).scrollTop()) {
            $('body').removeClass('fixed-header');
        }
        delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
        if (delta >= 0) {
            $('.slide_animated ').removeClass('active');
        } else {
            $('body ').addClass('fixed-header');
        }
    });

    $('.slide_animated').on('DOMMouseScroll mousewheel', function (ev) {
        $('body').addClass('fixed-header');
        $(this).addClass('active');
        var $this = $(this),
            scrollTop = this.scrollTop,
            scrollHeight = this.scrollHeight,
            height = $this.height(),
            delta = (ev.type == 'DOMMouseScroll' ?
            ev.originalEvent.detail * -40 :
                ev.originalEvent.wheelDelta),
            up = delta > 0;

        var prevent = function () {
            ev.stopPropagation();
            ev.preventDefault();
            ev.returnValue = false;
            return false;
        };

        if (!up && -delta > scrollHeight - height - scrollTop) {
// Scrolling down, but this will take us past the bottom.
            $this.scrollTop(scrollHeight);
            return prevent();
        } else if (up && delta > scrollTop) {
// Scrolling up, but this will take us past the top.
            return prevent();

        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop())
            $('body').addClass('fixed-header');

        var offset = 10;
        if ($(this).scrollTop() > offset) {
            $('.slide_animated').addClass('active');
        }
    });
}
/* scroll to top */
var offset = 300,
    offset_opacity = 1200,
    scroll_top_duration = 500,
    $back_to_top = $('.to-top');

$(window).scroll(function () {
    ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('is-visible') : $back_to_top.removeClass('is-visible fade-out');
    if ($(this).scrollTop() > offset_opacity) {
        $back_to_top.addClass('fade-out');
    }
});

$back_to_top.on('click', function (event) {
    event.preventDefault();
    $('body,html').animate({
            scrollTop: 0,
        }, scroll_top_duration
    );
});

/* Scroll Function */
$(window).scroll(function () {

    /* Fixed Navigation */
    if ($('header').offset().top > 0) {
        $('body').addClass('fixed-header');
    } else {
        $('body').removeClass('fixed-header');
        $('.slide_animated').removeClass('active');
    }
});


if ($(window).width() >= 992) {
    $('.dropdown-toggle').click(function () {
        $('.search-field').addClass('offtop');
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.dropdown-toggle.active').length) {
            $('.search-field').removeClass('offtop');
        }
        e.stopPropagation();
    });
}
if ($(window).width() <= 991) {
    /* news slider */
    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: true
                }
            }
        ]
    });

    $('.photo-gallery').slick({
        dots: false,
        adaptiveHeight: true,
        infinite: false,
        speed: 300,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: true
                }
            }
        ]
    });
}