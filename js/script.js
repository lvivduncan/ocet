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







////////////////
// замовлення //
////////////////

// оновлення кошика
upgradeCheckout();

// клік на кнопку замовлення
$('.dish button').on('click', function(){

    let localContent;
    let localPrice;

    // перевіряємо чи є дані у базі
    if(localStorage.getItem('order-content') !== null){

        // отримуємо дані з бази
        localContent = localStorage.getItem('order-content');
        localPrice = localStorage.getItem('order-price');
    }

    // якщо прийшли дані з бази
    if(localContent !== undefined){

        // назва страви
        localContent += ';' + $(this).data('content');

        // ціна
        localPrice += ';' + $(this).data('price');

    } else {

        // назва страви
        localContent = $(this).data('content');

        // ціна
        localPrice = $(this).data('price');
    }

    // надсилаємо дані в базу після обробки
    localStorage.setItem('order-content', localContent);
    localStorage.setItem('order-price', localPrice);

    // оновлюємо дані кошика
    upgradeCheckout();
});

// видаляємо дані з кошика (по 1 ітему)
$('#checkout-goods').on('click', function(event){

    // номер товару у кошикові
    const id = event.target.dataset.id;

    const localContent = localStorage.getItem('order-content').split(';');
    const localPrice = localStorage.getItem('order-price').split(';');

    if(localContent.length == 1){

        localStorage.clear();
    } else {
        
        localContent.splice(id, 1);
        localPrice.splice(id, 1);

        // надсилаємо дані в базу після обробки
        localStorage.setItem('order-content', localContent.join(';'));
        localStorage.setItem('order-price', localPrice.join(';'));
    }

    // оновлюємо дані кошика
    upgradeCheckout();
});

/////////////////////
// відправка форми //
/////////////////////

// після відправки очищаємо базу
$('#order form').submit(function() {
    
    $('#order').html('<p style="text-align:center">Замовлення надіслано!</p>');

    localStorage.clear();
});

// оновлення даних кошика (у тому числі і у формі)
function upgradeCheckout(){

    // смикаємо базу, обробляємо дані і виводимо
    if(localStorage.getItem('order-content') !== null){

        // показати кошик, якщо є дані
        $('#checkout').addClass('active');

        let localContent = localStorage.getItem('order-content').split(';');
        let localPrice = localStorage.getItem('order-price').split(';');
    
        let content = '';
        let price = 0;
        // content for input[type="hidden"]
        let hidden = '';

        for(let i = 0; i<localContent.length; i++){

            content += `<p data-id="${i}">${localContent[i]}</p>`;
            hidden += localContent[i] + ', ';
            price += +localPrice[i];
        }

        // додаємо дані
        $('#checkout-goods').html(content);
        // сума
        $('#checkout-price strong').html(price);

        // блок, який генерується і вставляється на сторінці оформлення
        const orderContent = `
            <h1>Ви замовили: </h1>            
            <div id="checkout-goods">${content}</div>
            <div id="checkout-price">На суму: <strong>${price}</strong></div>
            <p>Поля зі зірочкою (*) обов'язкові до заповнення</p>
            <form method="post">
                <input type="text" name="name" placeholder="Ваше ім'я *" required>
                <input type="text" name="phone" placeholder="Ваш телефон *" required>
                <input type="text" name="mail" placeholder="Ваш email *" required>
                <input type="hidden" name="dish" value="${hidden}">
                <input type="hidden" name="price" value="${price}">
                <textarea name="message" placeholder="Примітка"></textarea>
                <button id="form-send">Підтвердити замовлення!</button>
            </form>
        `;

        // сторінка оформлення
        $('#order').html(orderContent);

    } else {

        // ховаємо кошик, якщо даних немає 
        $('#checkout').removeClass('active');

        // додатково очищаємо блок з виводом товарів
        $('#checkout-goods').html('');

        // і ціну
        $('#checkout-price strong').html('');

        // очищаємо контент на сторінці оформлення
        $('#order').html('');
    }
}