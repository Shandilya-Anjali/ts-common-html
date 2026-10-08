/* global Swiper */

const initSliders = () => {
  
  if (document.querySelector('.announcement')) {
    new Swiper('.announcement-bar', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 4000,
      },
      effect: 'slide',
    })
  }

  if (document.querySelector('.herobanner-wrapper')) {
    new Swiper('.herobanner-slider', {
      loop: false,
      speed: 1000,
      autoplay: {
        delay: 4000,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: '.hero-pagination',
        clickable: true,
      },
    })
  }

  if (document.querySelector('.services-slider')) {
    new Swiper('.services-slider', {
      slidesPerView: 1.15,
      spaceBetween: 16,
      navigation: {
        prevEl: '.services-nav--prev',
        nextEl: '.services-nav--next',
      },
      breakpoints: {
        575:{
          slidesPerView: 2,
          spaceBetween: 20, 
        },
        800: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
       
        1200: {
          slidesPerView: 4,
          spaceBetween: 24,
          allowTouchMove: false,
        },
      },
    })
  }

  if (document.querySelector('.feat-slider')) {
    new Swiper('.feat-slider', {
      slidesPerView: 1.15,
      spaceBetween: 20,
      pagination: {
        el: '.feat-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 28,
          allowTouchMove: false,
        },
      },
    })
  }

  var gallerySwiper = null;
  var thumbs = document.querySelectorAll('.stewardship-thumb');

  if (document.getElementById('stewardship-gallery-swiper') && thumbs.length) {
    var featured = document.getElementById('stewardship-gallery-featured');
    var galleryLink = document.getElementById('stewardship-gallery-link');
    var activeIndex = 0;

    function activateThumb(thumb, index) {
      var src = thumb.dataset.src;
      if (!src || !featured) return;
      featured.style.opacity = '0';
      setTimeout(function () {
        featured.src = src;
        featured.style.opacity = '1';
        if (galleryLink) galleryLink.href = src;
      }, 150);
      thumbs.forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
      activeIndex = index;
    }

    gallerySwiper = new Swiper('#stewardship-gallery-swiper', {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 12,
      watchSlidesProgress: true,
      centeredSlides: false,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      navigation: {
        prevEl: '#stewardship-gallery-prev',
        nextEl: '#stewardship-gallery-next',
      },
      breakpoints: {
        426: { slidesPerView: 3, slidesPerGroup: 1 },
        576: { slidesPerView: 4, slidesPerGroup: 1 },
        768: { slidesPerView: 4, slidesPerGroup: 1 },
        990: { slidesPerView: 5, slidesPerGroup: 1 },
        1200: { slidesPerView: 7, slidesPerGroup: 1 },
      },
      on: {
        slideChange: function () {
          var slide = this.slides[this.activeIndex];
          if (slide) activateThumb(slide, this.activeIndex);
        },
      },
    });

    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () {
        activateThumb(thumb, i);
      });
    });

    if (galleryLink) {
      galleryLink.addEventListener('click', function (e) {
        e.preventDefault();
        var FB = window.Fancybox;
        if (!FB) return;
        var items = Array.from(thumbs).map(function (t) {
          return { src: t.dataset.src, type: 'image' };
        });
        FB.show(items, { startIndex: activeIndex });
      });
    }

    window.addEventListener('load', function () {
      if (gallerySwiper && gallerySwiper.update) gallerySwiper.update();
    });
    window.addEventListener('resize', function () {
      if (gallerySwiper && gallerySwiper.update) gallerySwiper.update();
    });
  }

  // Tour photo gallery
    const galleryThumbsEl = document.querySelector('.tour-gallery-thumbs');

    if (!galleryThumbsEl) return;

    const slideCount = galleryThumbsEl.querySelectorAll('.swiper-slide').length;

    const thumbsSwiper = new Swiper('.tour-gallery-thumbs', {
        direction: window.innerWidth >= 1200 ? 'vertical' : 'horizontal',
        slidesPerView: 3,
        spaceBetween: 10,
        slideToClickedSlide: true,
        loop: true,
    });

    const mainSwiper = new Swiper('.tour-gallery-main', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        speed: 500,
        effect: "fade"
    });

    // Thumbnail click -> Main slide
    thumbsSwiper.on('tap', function () {

        const clickedSlide = thumbsSwiper.clickedSlide;

        if (!clickedSlide) return;

        const realIndex = parseInt(
            clickedSlide.getAttribute('data-swiper-slide-index'),
            10
        );

        mainSwiper.slideToLoop(realIndex);

    });

    function setActiveThumb(index) {

        thumbsSwiper.slides.forEach((slide) => {

            const slideIndex = parseInt(
                slide.getAttribute('data-swiper-slide-index'),
                10
            );

            slide.classList.toggle(
                'swiper-slide-thumb-active',
                slideIndex === index
            );

        });

    }

    mainSwiper.on('slideChange', () => {
        setActiveThumb(mainSwiper.realIndex);
    });

    setActiveThumb(0);


}

export default initSliders
