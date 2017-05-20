import $ from 'jquery'

$(document).ready(() => {
  const preloader = $('.preloader')
  const preloaderPercents = $('.preloader__percents')
  const allElems = [...$('*')]
  const imgs = []
  let percents = 1

  const setPercents = (total = 1, current = 1) => {
    const percent = Math.ceil(current / total * 100)

    if (percent >= 10) {
      preloader.css({
        'background-image': 'url(/static/images/preloader-bg.jpg)',
        'background-size': 'cover'
      });
    }

    if (percent >= 100) {
      preloader.fadeOut(500)
    }

    preloaderPercents.text(percent + '%');
  };

  allElems.forEach(elem => {
    const background = $(elem).css('background-image')
    const img = $(elem).is('img')

    if (background !== 'none') {
      let path = background.slice(4, -1)
      for (let i = 0; i < 2; i++) {
        path = path.replace('"', '')
      }

      imgs.push(path)

    }

    if (img) {
      const path = $(elem).attr('src')

      if (path) {
        imgs.push(path)
      }
    }
  })

  if (imgs.length) {
    for (let i = 0; i < imgs.length; i++) {
      const image = $('<img>', { attr: {src: imgs[i]} })

      image.on({
        load: () => {
          setPercents(imgs.length, percents)
          percents++
        },
        error: () => {
          setPercents(imgs.length, percents)
          percents++
          console.warn(`${image.attr('src')} has not been loaded`)
        }
      })
    }
  } else {
    setPercents()
  }
})