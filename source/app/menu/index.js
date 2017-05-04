import $ from 'jquery'

$(document).ready(() => {
  const openBtn = $('.header-top__menu-btn')
  const closeBtn = $('.main-menu__svg-container')
  const menu = $('.main-menu')
  const body = $('body')

  const MENU_ACTIONS = {
    open: 'open',
    close: 'close',
  }

  const manageMenu = action => {
    if (action === MENU_ACTIONS.open) {
      menu.slideDown(500).css('display', 'flex')
      body.css('overflow', 'hidden')
    } else if (action === MENU_ACTIONS.close) {
      menu.slideUp(500)
      body.css('overflow', 'visible')
    }
  }

  openBtn.on('click', () => manageMenu(MENU_ACTIONS.open))
  closeBtn.on('click', () => manageMenu(MENU_ACTIONS.close))
})