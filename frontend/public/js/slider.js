/* main slider */
$('.main-banner__slider').slick({
    dots: true,
    arrows: true,
    responsive: [
        {
            breakpoint: 769,
            settings: {
                arrows: false
            }
        }
    ]
});

/* map info slider */
$('.map-info--slider').slick({
    dots: false,
    arrows: true,
    responsive: [
        {
            breakpoint: 990,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                swipe: false
            }
        }
    ]
});

/* news slider */
$('.news-slider').slick({
    dots: false,
    arrows: true,
    fade: true
});
$('.news-list-slider').slick({
	dots: true,
	arrows: true,
	adaptiveHeight: true
});
$('.discounts-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    fade: false,
    asNavFor: '.discounts-nav'
});
$('.discounts-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.discounts-for',
    arrows: true,
    infinite: false,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false
            }
        }, {
            breakpoint: 770,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: false
            }
        }
    ]
});