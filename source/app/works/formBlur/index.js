import $ from 'jquery'

$(document).ready(() => {
  const formBg = $('.form__blur-bg')
  const reviews = $('.reviews')

  const positionateBg = () => {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

    const imgWidth = reviews.width()
    const posLeft = reviews.offset().left - formBg.offset().left
    let posTop = reviews.offset().top - formBg.offset().top

    if (viewportWidth >= 760) {
      formBg.css({
        'background-size': `${imgWidth}px auto`,
        'background-position': `${posLeft}px ${posTop}px`
      })
    } else {
      formBg.css('background-position', 'center 100%')
    }
  }

  $(window).on('resize', positionateBg)
  positionateBg()

})