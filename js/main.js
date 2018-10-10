const width = window.outerWidth;

$(document).ready(function() {
    AOS.init({
        disable: 'phone',
        duration: 500,
    });
});
//PARALLAX
var parallax = (function () {

    var scrolled,
        maxScroll,
        maxScrollItem = document.querySelector(".section__about-me"),
        el = document.querySelectorAll('.parallax-animate'),
        speed = [0.95, 0.85, 0.75, 0.65, 0.4, 0.2],
        scroll = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 1000 / 60) },
        lastPos = 0;


    function moveParallax() {
        scrolled = window.pageYOffset;
        maxScroll = maxScrollItem.offsetTop;

        if (scrolled < maxScroll) {
            for (var i = 0; i < el.length; i++) {
                el[i].style.transform = 'translate3d(0, ' + scrolled * speed[i] + 'px, 0)';
            }
        }
    };

    function loop() {
        var top = window.pageYOffset;
        scroll(loop);

        if (top == lastPos) {
            return
        } else {
            moveParallax();
            lastPos = top;
        }

    };

    var isIE = /*@cc_on!@*/false || !!document.documentMode,
        isEdge = !isIE && !!window.StyleMedia;

    if (isIE || isEdge) {
        return;
    } else {
        loop();
    }

})();

//NAVBAR
var stickyNavbar = (function() {

    const scrollHeight = (height) => {
        if ($(this).scrollTop() >= height) {
          $("nav").addClass("sticky");
        } else {
          $("nav").removeClass("sticky");
        }
    };

    $(window).scroll(() => scrollHeight(800));

    if(width <= 900) {
        $(window).scroll(() => scrollHeight(560));
    };

})();

var mobileNav = (function() {
    const width = window.outerWidth;

    const clicked = function() {
        const nav = $(".main__nav");

        nav.slideToggle(300);
    }

    $('.mobile__nav-icon').click(clicked);

    if(width <= 900) {
        $('.main__nav').click(clicked);
    }
})();


// SMOOTH SCROLL
var smoothScroll = (function() {
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
})();