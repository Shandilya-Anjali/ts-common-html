const initFooterAccordion = () => {
  const cols = document.querySelectorAll('[data-footer-col]')
  if (!cols.length) return

  const BREAKPOINT = 768

  const isMobile = () => window.innerWidth < BREAKPOINT

  const sync = () => {
    cols.forEach((col) => {
      const trigger = col.querySelector('[data-footer-toggle]')
      if (isMobile()) {
        if (!col.classList.contains('is-open')) {
          trigger?.setAttribute('aria-expanded', 'false')
        }
      } else {
        col.classList.add('is-open')
        trigger?.setAttribute('aria-expanded', 'true')
      }
    })
  }

  sync()

  let resizeTimer
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(sync, 100)
  })

  cols.forEach((col) => {
    const trigger = col.querySelector('[data-footer-toggle]')
    if (!trigger) return
    trigger.addEventListener('click', () => {
      if (!isMobile()) return
      const isOpen = col.classList.contains('is-open')
      col.classList.toggle('is-open', !isOpen)
      trigger.setAttribute('aria-expanded', String(!isOpen))
    })
  })
}

export default initFooterAccordion
