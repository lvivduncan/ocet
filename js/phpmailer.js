
$('#form').trigger('reset');

$(function () {
    'use strict';
    $('#form').on('submit', function (e) {
        e.preventDefault();
            $.ajax({
                url: 'mail/send.php',
                type: 'POST',
                contentType: false,
                processData: false,
                data: new FormData(this),
                success: function (msg) {
                console.log(msg);
                if (msg == 'ok') {
                    setTimeout(() => {$.fancybox.open(`<p>Лист надіслано!</p>`), 1000});
                    setTimeout(() => $.fancybox.close(), 2000);
                    $('#form').trigger('reset'); // очистка формы
                } else {
                    setTimeout(() => {$.fancybox.open(`<p>Не вдалося надіслати лист!</p>`), 1000});
                    setTimeout(() => $.fancybox.close(), 2000);
                }
            }
        });
    });
});