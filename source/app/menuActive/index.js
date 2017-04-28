import $ from 'jquery'

$(document).ready(() => {
  const linkTypes = {
    about: 'about',
    projects: 'projects',
  }

  const path = window.location.pathname.split('/')[1]

  const activeLinking = link => {
    $('a').removeClass('footer-menu__item-link_active')
    $(`a.${link}`).addClass('footer-menu__item-link_active');
  }

  switch (path) {
  case linkTypes.about: activeLinking(linkTypes.about); break
  case linkTypes.projects: activeLinking(linkTypes.projects); break
  default:
  }
})