import initSliders from './slider.js'
import initHeaderMenu from './header.js'
import initNavigations from './navigation.js'
import initFaq from './faq.js'
import initTabs from './tabs.js'
import initFooterAccordion from './footer.js'

document.addEventListener('DOMContentLoaded', () => {
  initHeaderMenu()
  initSliders()
  initNavigations()
  initFaq()
  initTabs()
  initFooterAccordion()

  const fancyboxConfig = {
    animated: true,
    showClass: 'f-fadeIn',
    hideClass: 'f-fadeOut',
    Html: { videoAutoplay: true },
    Toolbar: {
      display: { left: [], middle: [], right: ['close'] }
    },
    Thumbs: { type: 'classic', showOnStart: true },
    caption: function (fancybox, slide) {
      return slide.el ? slide.el.dataset.caption : '';
    }
  };

  Fancybox.bind('[data-fancybox="tour-gallery"]', fancyboxConfig);
  Fancybox.bind('[data-fancybox="tour-photos"]', fancyboxConfig);
})
