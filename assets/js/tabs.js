const initTabs = () => {
  const tabGroups = document.querySelectorAll('[data-tabs]')
  if (!tabGroups.length) return

  tabGroups.forEach((group) => {
    const triggers = group.querySelectorAll('[data-tab-trigger]')
    const panels = group.querySelectorAll('[data-tab-panel]')
    if (!triggers.length || !panels.length) return

    const activate = (index) => {
      triggers.forEach((t, i) => {
        const active = i === index
        t.classList.toggle('is-active', active)
        t.setAttribute('aria-selected', String(active))
        t.setAttribute('tabindex', active ? '0' : '-1')
      })
      panels.forEach((p, i) => {
        p.classList.toggle('is-active', i === index)
      })
    }

    activate(0)

    triggers.forEach((trigger, i) => {
      trigger.addEventListener('click', () => activate(i))
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') activate(Math.min(i + 1, triggers.length - 1))
        if (e.key === 'ArrowLeft') activate(Math.max(i - 1, 0))
        if (e.key === 'Home') activate(0)
        if (e.key === 'End') activate(triggers.length - 1)
      })
    })

    const select = group.querySelector('[data-tabs-select]')
    if (select) {
      select.addEventListener('change', () => activate(Number(select.value)))
    }
  })
}

export default initTabs
