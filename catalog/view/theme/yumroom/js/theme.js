$(function () {
    // Купить в один клик
    $('.product-layout > .product-thumb').each(function (i) {
        i++;
        var imgUrl = $(this).find('.img-responsive').attr('src');
        var itemName = $(this).find('h4 a').text();
        var itemPrice = $(this).find('.price').html();
        var adminEmail = $('#callback [name="admin_email"]').val();

        $(this).after(
                    '<div id="pp-item-'+ i +'" class="product-popup">' +
                        '<h2>Купить в один клик</h2>' +
                        '<div class="pp-img-wrap"><img src="'+ imgUrl +'" alt="'+ itemName +'"></div>' +
                        '<div class="pp-content">' +
                            '<h3>'+ itemName +'</h3>' +
                            '<p>'+ itemPrice +'</p>' +
                            '<form class="ajax-form">' +
                                '<input type="hidden" name="project_name" value="Юмрум">' +
                                '<input type="hidden" name="admin_email" value="'+ adminEmail +'">' +
                                '<input type="hidden" name="form_subject" value="Заявка с сайта Юмрум">' +
                                '<input type="hidden" name="product" value="'+ itemName +'">' +
                                '<input class="form-control" type="text" name="Телефон" placeholder="Введите ваш телефон..." required>' +
                                '<button class="btn btn-primary">Заказать</button>' +
                            '</form>' +
                            '<div class="success">Спасибо за заявку!</div>' +
                        '</div>' +
                    '</div>'
                );

        $(this).find('.button-group').append('<a href="#pp-item-'+ i +'" class="button toclick">Купить в один клик</a>')
        $(this).parent().attr({
            'class': 'product-layout col-lg-4 col-md-4 col-sm-6 col-xs-12'
        });
    });

    $('.product-thumb .caption h4').matchHeight();

    $('.toclick, .callback').magnificPopup({
        mainClass: 'mfp-zoom-in',
        removalDelay: 500
    });

    $('.ajax-form').on('submit', function() {
        var th = $(this);
        $.ajax({
            type: 'POST',
            url: '/catalog/view/theme/yumroom/mail.php',
            data: th.serialize()
        }).done(function() {
            var callSuccess = th.closest('.product-popup').find('.success');
            callSuccess.fadeIn();
            setTimeout(function() {
                th.trigger('reset');
                callSuccess.fadeOut();
                $.magnificPopup.close();
            }, 3000);
        });
        return false;
    });
});