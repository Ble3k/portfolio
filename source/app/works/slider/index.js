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
  const activeImageChanged = $('.slider__main-image_changed')
  const leftSlide = $('.slider__sides-left')
  const rightSlide = $('.slider__sides-right')

  const initialStep = 0
  const lastStep = slides.length - 1
  let currStep = initialStep

  const slideToLeft = () => {
    bindAction('unbind')
    goPrev()
  }

  const slideToRight = () => {
    bindAction('unbind')
    goNext()
  }

  const setBackground = (selector, step) => selector.css('background-image', `url(${slides[step].image})`)

  const bindAction = action => {
    if (action === 'unbind') {
      leftSlide.unbind()
      rightSlide.unbind()
    } else {
      leftSlide.on('click', slideToLeft)
      rightSlide.on('click', slideToRight)
    }
  }

  const clearPos = (slideToRight) => {
    const clearObj = {
      'left': 'auto',
      'right': 'auto',
    }

    activeImage.css({
      ...clearObj,
    })
    activeImageChanged.css({
      ...clearObj,
      'right': slideToRight ? '200%' : 'auto'
    })
  }

  const setMainImage = (side, duration, cb, currStep, nextStep) => {
    if (side) {
      const slideToRight = side === 'right'
      const definePosition = () => {
        const defered = $.Deferred()
        clearPos(slideToRight)
        defered.resolve()

        return defered
      }

      definePosition().then(() => {
        activeImage.animate({ [side]: '-100%' }, duration)
        activeImageChanged
          .animate({ [side]: slideToRight ? '100%' : '-100%' }, duration, () => {
            setBackground(activeImage, currStep)
            cb()
          })
        setBackground(activeImageChanged, currStep)
      })
    } else {
      setBackground(activeImage, currStep)
      setBackground(activeImageChanged, nextStep)
      bindAction()
    }
  }

  const slideOnChange = (currStep, nextStep, prevStep, side, cb, duration = 700) => {
    description.html(slides[currStep].desc)
    link.attr('href', slides[currStep].link)
    setMainImage(side, duration, cb, currStep, nextStep)
    setBackground(rightSlide, nextStep)
    setBackground(leftSlide, prevStep)
  }

  const goPrev = () => {
    if (currStep > initialStep) {
      currStep--
      const prevStep = currStep - 1 < initialStep ? lastStep : currStep - 1
      slideOnChange(currStep, currStep + 1, prevStep, 'left', bindAction)
    } else {
      currStep = lastStep
      slideOnChange(currStep, initialStep, currStep - 1, 'left', bindAction)
    }
  }

  const goNext = () => {
    if (currStep < lastStep) {
      currStep++
      const nextStep = currStep + 1 > lastStep ? initialStep : currStep + 1
      slideOnChange(currStep, nextStep, currStep - 1, 'right', bindAction)
    } else {
      currStep = initialStep
      slideOnChange(currStep, currStep + 1, lastStep, 'right', bindAction)
    }
  }

  slideOnChange(currStep, currStep + 1, lastStep)

  const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const sliderLeft = $('.slider__left')
  const sliderMain = $('.slider__main')

  if (viewportWidth <= 960) {
    sliderLeft.detach()
    sliderLeft.insertAfter(sliderMain)
  }

})