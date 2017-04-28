import $ from 'jquery'

$(document).ready(() => {
  const slides = [
    {
      image: '/static/images/trood.png',
      desc: 'Сайт компании TROOD',
      link: 'http://www.trood.ru',
    },
    {
      image: '/static/images/bino.png',
      desc: 'Сайт компании BINO',
      link: 'http://www.getbino.com',
    },
    {
      image: '/static/images/mirror.png',
      desc: 'Сайт компании MIRROR CX',
      link: 'http://www.mirrorcx.com',
    },
  ]

  const description = $('.slider__title .bernier__title')
  const link = $('.slider__link')
  const activeImage = $('.slider__main-image')
  const leftSlide = $('.slider__sides-left')
  const rightSlide = $('.slider__sides-right')

  const initialStep = 0
  const lastStep = slides.length - 1
  let currStep = initialStep

  const slideOnChange = (currStep, nextStep, prevStep) => {
    description.html(slides[currStep].desc)
    link.attr('href', slides[currStep].link)
    activeImage.fadeIn(1000).css('background-image', `url(${slides[currStep].image})`)
    rightSlide.css('background-image', `url(${slides[nextStep].image})`)
    leftSlide.css('background-image', `url(${slides[prevStep].image})`)
  }

  const goPrev = () => {
    if (currStep > initialStep) {
      currStep--
      const prevStep = currStep - 1 < initialStep ? lastStep : currStep - 1
      slideOnChange(currStep, currStep + 1, prevStep)
    } else {
      currStep = lastStep
      slideOnChange(currStep, initialStep, currStep - 1)
    }
    leftSlide.bind('click', slideToLeft)
  }

  const goNext = () => {
    if (currStep < lastStep) {
      currStep++
      const nextStep = currStep + 1 > lastStep ? initialStep : currStep + 1
      slideOnChange(currStep, nextStep, currStep - 1)
    } else {
      currStep = initialStep
      slideOnChange(currStep, currStep + 1, lastStep)
    }
    rightSlide.bind('click', slideToRight)
  }

  const slideToLeft = () => {
    leftSlide.unbind()
    activeImage.fadeOut(500, goPrev)
  }

  const slideToRight = () => {
    rightSlide.unbind()
    activeImage.fadeOut(500, goNext)
  }


  leftSlide.bind('click', slideToLeft)

  rightSlide.bind('click', slideToRight)

  slideOnChange(currStep, currStep + 1, lastStep)

})