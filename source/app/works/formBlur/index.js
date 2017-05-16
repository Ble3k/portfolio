import $ from 'jquery'

$(document).ready(() => {
  const formBg = $('.form__blur-bg')
  const reviews = $('.reviews')

  const positionateBg = () => {
    const posLeft = -formBg.offset().left
    const reviewsBgPosY = +reviews.css('backgroundPositionY').replace('px', '')
    const posTop = -(formBg.offset().top - reviews.offset().top - reviewsBgPosY)

    formBg.css({ 'background-position': `${posLeft}px ${posTop}px` })
  }

  $(window).on('load', positionateBg)
  $(window).on('scroll', positionateBg)
  $(window).on('resize', positionateBg)
})