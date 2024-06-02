// swiper
function swiperCustom({
  customClassName,
  slidesPerView,
  slidesPerView1,
  slidesPerView2,
  centeredSlides,
  bannerAutoplay,
  spaceBetween,
  loop,
}) {
  const customSwiper = new Swiper('.swiper' + customClassName, {
    // Optional parameters
    // direction: 'vertical',
    centeredSlides: centeredSlides,
    // observer: true,
    // observeParents: true,
    spaceBetween: spaceBetween,
    slidesPerView,
    loop: loop,

    // If we need pagination
    pagination: {
      el: customClassName + ' .swiper-pagination',
      clickable: true,
      bulletElement: 'a',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      // when window width is >= 720px
      720: {
        slidesPerView: slidesPerView1,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: slidesPerView2,
        slidesPerGroup: 1,
        spaceBetween: 12,
      },
    },

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    on: {
      init: function () {
        console.log('xxxxx');
        // customClassName + ' .swiper-container';
      },
      slideChangeTransitionEnd: function () {
        console.log('ccccc');
      },
    },

    // And if we need scrollbar
    // scrollbar: {
    // 	el: '.swiper-scrollbar',
    // },
  });
  // console.log(customClassName);

  // Auto Play Option
  if (bannerAutoplay === false) {
    customSwiper.autoplay.stop();
    // $(bannerClass + " .swiper_auto")
    //   .addClass("_start")
    //   .removeClass("_stop");
    // $(bannerClass + " .swiper_auto")
    //   .find(".swiper-pagination-bullet.swiper-pagination-bullet-active")
    //   .attr("title", "선택됨");
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // swiperCustom('content1');
  // swiperCustom('content2');
});
