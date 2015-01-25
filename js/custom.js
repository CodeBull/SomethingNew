$(function() {

    // Scroll spy
    $('a.scrollto, .nav-link').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // Scroll to Top
    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000, 'easeInCubic');
        return false;
    });

    // Adding semi-transparent black background on scroll
    $(window).scroll(function() {
        if($(this).scrollTop() > 20) {
            $('.navbar-transparent').css({
                'background': 'rgba(0, 0, 0, 0.8)',
                'transition': 'background 0.3s linear 0s, border 0.3s linear 0s, opacity 1s linear 0s, transform 0.5s ease 0s'
            });
        } else {
            $('.navbar-transparent').css({'background': 'transparent'});
        }
    });

    // Adding semi-transparent black background on nav-bar collapse
    $('.navbar-collapse').on('show.bs.collapse', function () {
        $('.navbar-transparent').css({
            'background': 'rgba(0, 0, 0, 0.8)',
            'transition': 'background 0.3s linear 0s, border 0.3s linear 0s, opacity 1s linear 0s, transform 0.5s ease 0s'
        });
    });

    // Removing semi-transparent black background if not scrolled
    $('.navbar-collapse').on('hide.bs.collapse', function () {
        if($(window).scrollTop() < 20) {
            $('.navbar-transparent').css({'background': 'transparent'});
        }
    });

    // Closing navbar collapse on a link click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-collapse').collapse('hide');
    });
});

$(document).ready(function() {
    $('#contact_form').submit(function(e) {
        e.preventDefault();
        var name = $("input[name='name']");
        var email = $("input[name='email']");
        var phone = $("input[name='phone']");
        var msg = $("textarea[name='message']");

        if (name.val() == "") {
            name.closest(".form-group").addClass("has-error");
            name.focus();
            return false;
        } else {
            name.closest(".form-group").removeClass("has-error").addClass("has-success");
        } if (email.val() == "") {
            email.closest(".form-group").addClass("has-error");
            email.focus();
            return false;
        } else {
            email.closest(".form-group").removeClass("has-error").addClass("has-success");
        } if (msg.val() == "") {
            msg.closest(".form-group").addClass("has-error");
            msg.focus();
            return false;
        } else {
            msg.closest(".form-group").removeClass("has-error").addClass("has-success");
        }
        $.ajax({
            url: 'contact.php',
            cache: false,
            type: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                $(".form-group").removeClass("has-success");
                if(data == 'success') {
                    console.log('success');
                    $('#validation_msg').html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>Thank you for emailing us. We will in touch shortly.</div>');
                }
            },
            error: function() {
                console.log('error');
            }
        });
    });
});