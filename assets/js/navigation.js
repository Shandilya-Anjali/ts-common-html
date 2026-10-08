const initNavigations = () => {
  const header = document.querySelector('.header')

  window.addEventListener('scroll', function () {
    const announcement = document.querySelector('.announcement')
    const scrollPosition = window.scrollY

    if (scrollPosition >= 50) {
      header.classList.add('is-sticky')
      announcement?.classList.add('up')
    } else {
      header.classList.remove('is-sticky')
      announcement?.classList.remove('up')
    }
  })

  if (header) {
    let searchManuallyOpened = false
    const btnSearch = document.querySelector('.btn-search')
    const searchBar = document.querySelector('.search-bar')
    const searchInput = document.getElementById('search')
    const body = document.body
    const btnCloseSearch = document.querySelector('.btn-close-search')

    const closeSearch = () => {
      searchBar.classList.remove('active')
      btnSearch.classList.remove('active')
      body.classList.remove('search-open')
      searchInput.value = ''
      searchManuallyOpened = false
    }

    if (btnSearch && searchBar && searchInput) {
      btnSearch.addEventListener('click', function (event) {
        event.stopPropagation()
        if (!searchBar.classList.contains('active')) {
          searchBar.classList.add('active')
          btnSearch.classList.add('active')
          body.classList.add('search-open')
          searchManuallyOpened = true
          setTimeout(() => searchInput.focus(), 100)
        } else {
          closeSearch()
        }
      })

      document.addEventListener('click', function (event) {
        if (!event.target.closest('.search-bar, .btn-search')) {
          closeSearch()
        }
      })

      searchInput.addEventListener('click', function (event) {
        event.stopPropagation()
      })

      window.addEventListener('scroll', function () {
        if (header.classList.contains('is-sticky')) {
          if (!searchManuallyOpened) {
            closeSearch()
          }
        } else {
          searchManuallyOpened = false
        }
      })

      if (btnCloseSearch) {
        btnCloseSearch.addEventListener('click', closeSearch)
      }
    }
  }
}

export default initNavigations
