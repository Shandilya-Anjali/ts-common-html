const initFaq = () => {
  const items = document.querySelectorAll('[data-faq-item]')
  if (!items.length) return

  const open = (item) => {
    item.classList.add('is-open')
    item.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'true')
  }

  const closeAll = () => {
    items.forEach((i) => {
      i.classList.remove('is-open')
      i.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false')
    })
  }

  open(items[0])

  items.forEach((item) => {
    const trigger = item.querySelector('.faq-item__trigger')
    if (!trigger) return
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open')
      closeAll()
      if (!isOpen) open(item)
    })
  })
}

export default initFaq
