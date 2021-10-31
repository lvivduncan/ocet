// parallax banner
// $('#banner').parallax({imageSrc: 'images/banner.jpg'});

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

$('#menu-button').on('click', function(){
    $('#nav').toggleClass('mobile');
    $('#menu-button').toggleClass('white');
    $('body').toggleClass('fixed');
});







// замовлення 
let localContent;
let localPrice;

upgradeCheckout();



// клік на кнопку замовлення
$('.dish button').on('click', function(){

    // перевіряємо чи є дані у базі
    if(localStorage.getItem('order-content') !== null){

        // отримуємо дані з бази
        localContent = localStorage.getItem('order-content');
        localPrice = localStorage.getItem('order-price');
    }


    // назва страви 
    let content = $(this).data('content');

    // вартість
    let price = $(this).data('price');

    // якщо прийшли дані з бази
    if(localContent !== undefined){

        localContent += ';' + content;
        localPrice += ';' + price;

    } else {

        localContent = content;
        localPrice = price;
    }

    // надсилаємо дані в базу після обробки
    localStorage.setItem('order-content', localContent);
    localStorage.setItem('order-price', localPrice);

    // оновлюємо дані кошика
    upgradeCheckout();
});

$('#checkout-goods').on('click', function(event){

    // номер товару у кошикові
    const id = event.target.dataset.id;

    let localContent1 = localStorage.getItem('order-content').split(';');
    let localPrice1 = localStorage.getItem('order-price').split(';');

    localContent1.splice(id, 1);
    localPrice1.splice(id, 1);

    // надсилаємо дані в базу після обробки
    localStorage.setItem('order-content', localContent1.join(';'));
    localStorage.setItem('order-price', localPrice1.join(';'));

    // оновлюємо дані кошика
    upgradeCheckout();
});

// оновлення даних кошика
function upgradeCheckout(){

    // смикаємо базу, обробляємо дані і виводимо
    if(localStorage.getItem('order-content') !== null){

        // показати кошик, якщо є дані
        $('#checkout').addClass('active');

        let localContent = localStorage.getItem('order-content').split(';');
        let localPrice = localStorage.getItem('order-price').split(';');
    
        let content = '';
        let price = 0;

        for(let i = 0; i<localContent.length; i++){

            content += '<li data-id="' + i + '">' + i + ' - ' + localContent[i] + '</li>';
            price += +localPrice[i];
        }

        // додаємо дані
        $('#checkout-goods').html(content);

        $('#checkout-price strong').html(price);
    } else {

        // ховаємо кошик, якщо даних немає 
        $('#checkout').removeClass('active');
    }
}

// видаляємо дані з кошика (по 1 ітему)
function deleteGoods(){


}