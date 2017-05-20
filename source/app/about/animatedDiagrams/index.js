import $ from 'jquery'

$(document).ready(() => {
  const circleLength = 282.6
  const cirlces = [...$('.circles__second')]
  const aboutContent = $('.about__content')
  let values = []

  const getStrokeDasharrayValue = () => {
    const defered = $.Deferred()
    cirlces.forEach((item, i) => values[i] = $(item).css('stroke-dasharray').split(',')[0].replace('px', ''))
    defered.resolve()

    return defered
  }

  const clearStrokeDasharrayValue = () => {
    getStrokeDasharrayValue().then(() => {
      cirlces.forEach(item => $(item).css({'strokeDasharray': circleLength , 'strokeDashoffset': circleLength}))
    })
  }

  const animateCircles = () => {
    cirlces.forEach((item, i) => $(item).animate({ 'strokeDashoffset': `${circleLength - values[i]}` }, 2000))
    window.cireclesWereAnimated = true
  }

  clearStrokeDasharrayValue()

  $(window).on('scroll', () => {
    if (aboutContent.offset().top <= $(window).scrollTop() && !window.cireclesWereAnimated) animateCircles()
  })
})