const initHeaderMenu = () => {
  const navbarToggler = document.querySelector('.navbar-toggler')
  const navbar = document.querySelector('.nav-list')

  if (navbarToggler) {
    navbarToggler.addEventListener('click', function () {
      if (navbar) {
        navbar.classList.toggle('active')
      }
      document.documentElement.classList.toggle('menu-open')
    })
  }

  const initMenuMaker = (selector) => {
    const menu = document.querySelector(selector)
    if (!menu) return

    menu.querySelectorAll('li').forEach((li) => {
      if (li.querySelector('ul')) {
        li.classList.add('has-sub', 'has-dropdown')
      }
    })

    multiToggle(menu)
  }

  const multiToggle = (menu) => {
    menu.querySelectorAll('.has-sub').forEach((li) => {
      const submenuButton = document.createElement('span')
      submenuButton.classList.add('submenu-button')
      submenuButton.innerHTML = `<svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.75728 8.96753L0.307708 2.51777C-0.102775 2.10748 -0.102775 1.44228 0.307708 1.0322C0.717825 0.62208 1.383 0.62208 1.79308 1.0322L7.49997 6.73924L13.2067 1.03236C13.6169 0.622246 14.282 0.622246 14.6922 1.03236C15.1024 1.44248 15.1024 2.10765 14.6922 2.51793L8.24249 8.96769C8.03733 9.17275 7.76873 9.27516 7.5 9.27516C7.23114 9.27516 6.96234 9.17255 6.75728 8.96753Z" fill="black"/>
      </svg>`
      li.insertBefore(submenuButton, li.firstChild)

      li.addEventListener('click', () => {
        const submenu = li.querySelector('ul')
        const isOpen = li.classList.contains('active')

        menu.querySelectorAll('.has-sub').forEach((el) => {
          el.classList.remove('active')
          const sub = el.querySelector('ul')
          if (sub) sub.classList.remove('show')
          const btn = el.querySelector('.submenu-button')
          if (btn) btn.classList.remove('submenu-opened')
        })

        if (!isOpen) {
          li.classList.add('active')
          submenu.classList.add('show')
          submenuButton.classList.add('submenu-opened')
        }
      })
    })

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (link.getAttribute('href') === '#') {
          event.preventDefault()
          const parentLi = link.closest('.has-sub')
          const submenu = link.nextElementSibling

          menu.querySelectorAll('.has-sub').forEach((el) => el !== parentLi && el.classList.remove('active'))
          menu.querySelectorAll('.has-sub ul').forEach((el) => el !== submenu && el.classList.remove('open'))
          menu.querySelectorAll('.submenu-button').forEach((el) => {
            if (el !== link.nextElementSibling) el.classList.remove('submenu-opened')
          })

          parentLi.classList.toggle('active')
          submenu.classList.toggle('open')
          if (link.nextElementSibling?.classList.contains('submenu-button')) {
            link.nextElementSibling.classList.toggle('submenu-opened')
          }
        }
      })
    })
  }

  const initMegaMenuHover = () => {
    const mediaQuery = window.matchMedia('(min-width: 1199px)')
    const megaMenus = document.querySelectorAll('.has-dropdown')

    megaMenus.forEach((menu) => {
      menu.removeEventListener('mouseenter', menu._hoverEnter)
      menu.removeEventListener('mouseleave', menu._hoverLeave)
      menu.classList.remove('active')
    })

    if (mediaQuery.matches) {
      megaMenus.forEach((menu) => {
        const onMouseEnter = () => menu.classList.add('active')
        const onMouseLeave = () => menu.classList.remove('active')

        menu._hoverEnter = onMouseEnter
        menu._hoverLeave = onMouseLeave

        menu.addEventListener('mouseenter', onMouseEnter)
        menu.addEventListener('mouseleave', onMouseLeave)
      })
    }
  }

  const resetMenuState = () => {
    document.documentElement.classList.remove('menu-open')
    document.body.classList.remove('menu-is-open')

    if (navbar) navbar.classList.remove('active')

    const mainMenu = document.getElementById('mobile-menu-main')
    if (mainMenu) {
      mainMenu.classList.remove('open')
      mainMenu.style.display = ''
    }

    document.querySelectorAll('.has-sub').forEach((el) => {
      el.classList.remove('active')
      const sub = el.querySelector('ul')
      if (sub) {
        sub.classList.remove('show')
        sub.classList.remove('open')
      }
      const btn = el.querySelector('.submenu-button')
      if (btn) btn.classList.remove('submenu-opened')
    })
  }

  initMenuMaker('.nav-list')
  initMegaMenuHover()

  let resizeTimer
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      resetMenuState()
      initMegaMenuHover()
    }, 200)
  })
}

export default initHeaderMenu
