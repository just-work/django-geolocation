(function($, exports) {
    'use strict';

    function setLoc(a){
        if (a.length > 40) {
            $('#location__text').html(a.substr(0, 40) + "...").attr("title", a);
        } else {
            $('#location__text').html(a);
        }
    }

    function setUndefinedLoc(){
        $('#location__text').html('Не определён');
        showLinks(true);
    }

    function setLocCookie(a) {
        var now = new Date();
        // cookie will expire after 24 hours
        now.setTime(now.getTime() + 24 * 3600 * 1000);
        Cookies.set('location', a, { expires: now });
    }

    function showLinks(approved) {
        if (approved) {
            $('#location__change_link').removeClass('hidden');
            $('#location__yes_link').addClass('hidden');
            $('#location__no_link').addClass('hidden');
        } else {
            $('#location__yes_link').removeClass('hidden');
            $('#location__change_link').addClass('hidden');
            $('#location__no_link').removeClass('hidden');
        }
    }

    function setLocation(result) {
        var loc = result.geoObjects.get(0).properties.get('text');
        var ar = ['AdministrativeArea', 'SubAdministrativeArea', 'Locality', 'LocalityName'];
        var c = result.geoObjects.get(0).properties.get('metaDataProperty.GeocoderMetaData.AddressDetails.Country');
        for (var i = 0; i < ar.length; i++) {
            if (typeof c[ar[i]] != 'undefined') {
                c = c[ar[i]];
            }
        }
        if (typeof c != 'undefined') {
            setLoc(c);
            setLocCookie(c + " " + loc);
            showLinks(false);
        } else {
            setUndefinedLoc();
        }
    }

    function init(){
        ymaps.geolocation.get({
            'provider': 'auto',
        }).then(setLocation,
        function (err) {
            console.log('Ошибка: ' + err);
            ymaps.geolocation.get({
                'provider': 'yandex',
            }).then(setLocation,
                function(err) {
                    console.log('Ошибка: ' + err);
                    setUndefinedLoc();
                }
            )
        });
    }

    var a = Cookies.get('location');
    if (typeof a == 'undefined') {
        if (ymaps) {
            ymaps.ready(init);
        } else {
            setUndefinedLoc();
        }
    } else {
        var spl = a.split(" ");
        setLoc(spl[0]);
        showLinks((spl[spl.length - 1] == "approved"));
    }

    $('.location__popover_link').fancybox({
        closeBtn: false,
        margin: 0,
        padding: 0,
        maxWidth: 400
    });

    $('#location__yes_link').on('click', function(e){
        e.preventDefault();
        var a = Cookies.get('location');
        var spl = a.split(" ");
        if (spl[spl.length - 1] != "approved") {
            a = a + " approved";
            setLocCookie(a);
            showLinks(true);
        }
    });

    $('.close-location-popup').on('click', function(e){
        $.fancybox.close();
    });

    $('#location__button').on('click', function(){
        var reg = $('#location__region_select').val();
        var loc = $('#location__city_input').val();
        if (loc) {
            setLoc(loc);
            setLocCookie(loc + " " + reg + ", " + loc);
            showLinks(true);
        }
        $.fancybox.close();
    })

})(jQuery, window);
