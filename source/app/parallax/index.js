import $ from 'jquery'

$(document).ready(() => {
  const parallaxContainer = $('.parallax')
  const layers = [...parallaxContainer.children()]
  const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

  const moveLayers = e => {
    const initX = (window.innerWidth / 2) - e.pageX
    const initY = (window.innerHeight / 2) - e.pageY

    layers.forEach((layer, i) => {
      const divider = i / 100
      const posX = initX * divider
      const posY = initY * divider
      const transform = `translate3d(${posX}px, ${posY}px, 0)`

      $(layer).css({ transform })
    })
  }

  viewportWidth >= 1200 && $(window).on('mousemove', e => moveLayers(e))


  const parallaxScrollLayers = [...$('.parallax__scroll')]

  const parallaxOnScroll = () => {
    if (parallaxScrollLayers.length !== 0) {
      parallaxScrollLayers.forEach((layer, i) =>{
        const posY = window.pageYOffset / ((i + 1) * 2)
        const transform = `translate3d(0, ${posY}px, 0)`

        $(layer).css({ transform })
      })
    }
  }

  $(window).on('scroll', parallaxOnScroll)

})