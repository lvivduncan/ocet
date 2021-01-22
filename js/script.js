// parallax banner
$('#banner').parallax({imageSrc: 'images/banner.jpg'});

$('#motto').parallax({imageSrc: 'images/motto.jpg'});

// animation
new WOW().init();

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:4
        }
    }
});

$(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $('#up').fadeIn();
    } else {
        $('#up').fadeOut();
}});
    
$('#up').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
});