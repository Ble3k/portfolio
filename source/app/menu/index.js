import $ from 'jquery'

$(document).ready(() => {
  const openBtn = $('.header-top__menu-btn')
  const closeBtn = $('.main-menu__svg-container')
  const menu = $('.main-menu')
  const leftSide = $('.main-menu__left')
  const rightSide = $('.main-menu__right')
  const menuLinks = $('.main-menu__link')
  const body = $('body')

  const MENU_ACTIONS = {
    open: 'open',
    close: 'close',
  }

  const animation = (selector, props, duration, cb) => selector.animate({ ...props }, duration, cb)

  const bindAction = action => {
    if (action === 'unbind') {
      openBtn.unbind()
      closeBtn.unbind()
    } else {
      openBtn.on('click', () => manageMenu(MENU_ACTIONS.open))
      closeBtn.on('click', () => manageMenu(MENU_ACTIONS.close))
    }
  }

  const showMenuItems = (index = 0) => {
    const lastLink = menuLinks.length - 1
    if (index <= lastLink) {
      $(menuLinks[index]).fadeIn(200, () => showMenuItems(index + 1))
    } else {
      bindAction()
    }
  }

  const manageMenu = action => {
    bindAction('unbind')
    if (action === MENU_ACTIONS.open) {
      menu.css('display', 'flex')
      body.css('overflow', 'hidden')
      animation(leftSide, {'left': 0}, 500)
      animation(rightSide, {'left': '50%'}, 500, showMenuItems)
    } else if (action === MENU_ACTIONS.close) {
      const menuCloseCb = () => {
        leftSide.css('left', '-50%')
        rightSide.css('left', '100%')
        menuLinks.fadeOut()
        bindAction()
      }

      menu.fadeOut(200, menuCloseCb)
      body.css('overflow', 'visible')
    }
  }

  bindAction()
})