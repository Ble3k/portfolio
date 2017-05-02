/* eslint-disable */
google.maps.event.addDomListener(window, 'load', init);
var map, markersArray = [];

function bindInfoWindow(marker, map, location) {
  google.maps.event.addListener(marker, 'click', function() {
    function close(location) {
      location.ib.close();
      location.infoWindowVisible = false;
      location.ib = null;
    }

    if (location.infoWindowVisible === true) {
      close(location);
    } else {
      markersArray.forEach(function(loc, index){
        if (loc.ib && loc.ib !== null) {
          close(loc);
        }
      });

      var boxText = document.createElement('div');
      boxText.style.cssText = 'background: #fff;';
      boxText.classList.add('md-whiteframe-2dp');

      function buildPieces(location, el, part, icon) {
        if (location[part] === '') {
          return '';
        } else if (location.iw[part]) {
          switch(el){
            case 'photo':
              if (location.photo){
                return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
              } else {
                return '';
              }
              break;
            case 'iw-toolbar':
              return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
              break;
            case 'div':
              switch(part){
                case 'email':
                  return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
                  break;
                case 'web':
                  return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
                  break;
                case 'desc':
                  return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
                  break;
                default:
                  return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
                  break;
              }
              break;
            case 'open_hours':
              var items = '';
              if (location.open_hours.length > 0){
                for (var i = 0; i < location.open_hours.length; ++i) {
                  if (i !== 0){
                    items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours +'</strong></li>';
                  }
                  var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours +'</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
                }
                return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
              } else {
                return '';
              }
              break;
          }
        } else {
          return '';
        }
      }

      boxText.innerHTML =
        buildPieces(location, 'photo', 'photo', '') +
        buildPieces(location, 'iw-toolbar', 'title', '') +
        buildPieces(location, 'div', 'address', 'location_on') +
        buildPieces(location, 'div', 'web', 'public') +
        buildPieces(location, 'div', 'email', 'email') +
        buildPieces(location, 'div', 'tel', 'phone') +
        buildPieces(location, 'div', 'int_tel', 'phone') +
        buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
        buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

      var myOptions = {
        alignBottom: true,
        content: boxText,
        disableAutoPan: true,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-140, -40),
        zIndex: null,
        boxStyle: {
          opacity: 1,
          width: '280px'
        },
        closeBoxMargin: '0px 0px 0px 0px',
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: 'floatPane',
        enableEventPropagation: false
      };

      location.ib = new InfoBox(myOptions);
      location.ib.open(map, marker);
      location.infoWindowVisible = true;
    }
  });
}

function init() {
  var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  var lat = viewportWidth <= 960 ? 55.72757756539090 : 55.72107756539090
  var lng = viewportWidth <= 960 ? 37.78519948260497 : 37.78119948260497
  var mapOptions = {
    center: new google.maps.LatLng(lat,lng),
    zoom: 16,
    gestureHandling: 'auto',
    fullscreenControl: false,
    zoomControl: true,
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    scaleControl: true,
    scrollwheel: false,
    streetViewControl: false,
    draggable : true,
    clickableIcons: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{"featureType":"landscape.natural.landcover","stylers":[{"gamma":0.44},{"hue":"#2bff00"}]},{"featureType":"water","stylers":[{"hue":"#00a1ff"},{"saturation":29},{"gamma":0.74}]},{"featureType":"landscape.natural.terrain","stylers":[{"hue":"#00ff00"},{"saturation":54},{"lightness":-51},{"gamma":0.4}]},{"featureType":"transit.line","stylers":[{"gamma":0.27},{"hue":"#0077ff"},{"saturation":-91},{"lightness":36}]},{"featureType":"landscape.man_made","stylers":[{"saturation":10},{"lightness":-23},{"hue":"#00BFA5"},{"gamma":0.71}]},{"featureType":"poi.business","stylers":[{"hue":"#0055ff"},{"saturation":9},{"lightness":-46},{"gamma":1.05}]},{"featureType":"administrative.country","stylers":[{"gamma":0.99}]},{"featureType":"administrative.province","stylers":[{"lightness":36},{"saturation":-54},{"gamma":0.76}]},{"featureType":"administrative.locality","stylers":[{"lightness":33},{"saturation":-61},{"gamma":1.21}]},{"featureType":"administrative.neighborhood","stylers":[{"hue":"#ff0000"},{"gamma":2.44}]},{"featureType":"road.highway.controlled_access","stylers":[{"hue":"#ff0000"},{"lightness":67},{"saturation":-40}]},{"featureType":"road.arterial","stylers":[{"hue":"#ff6600"},{"saturation":52},{"gamma":0.64}]},{"featureType":"road.local","stylers":[{"hue":"#006eff"},{"gamma":0.46},{"saturation":-3},{"lightness":-10}]},{"featureType":"transit.line","stylers":[{"hue":"#0077ff"},{"saturation":-46},{"gamma":0.58}]},{"featureType":"transit.station","stylers":[{"gamma":0.8}]},{"featureType":"transit.station.rail","stylers":[{"hue":"#ff0000"},{"saturation":-45},{"gamma":0.9}]},{"elementType":"labels.text.fill","stylers":[{"gamma":0.58}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"gamma":2.01},{"hue":"#00BFA5"},{"lightness":22}]},{"featureType":"transit","stylers":[{"saturation":-87},{"lightness":44},{"gamma":1.98},{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"gamma":0.06},{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"hue":"#00aaff"},{"lightness":-6},{"gamma":2.21}]},{"elementType":"labels.text.stroke","stylers":[{"gamma":3.84}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"gamma":9.99}]},{"featureType":"administrative","stylers":[{"gamma":0.01}]}]
  }
  var mapElement = document.getElementById('mapkit');
  var map = new google.maps.Map(mapElement, mapOptions);
  var locations = [
    {"title":"3-я Институтская ул., 17","address":"3-я Институтская ул., 17, Москва, Россия, 109428","desc":"","tel":"","int_tel":"","email":"","web":"","web_formatted":"","open":"","time":"","lat":55.7239334,"lng":37.785223299999984,"vicinity":"Юго-Восточный административный округ","open_hours":"","iw":{"address":true,"desc":true,"email":true,"enable":true,"int_tel":true,"open":true,"open_hours":true,"photo":true,"tel":true,"title":true,"web":true}}
  ];
  for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      icon: '/static/images/map_marker.svg',
      position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
      map: map,
      title: locations[i].title,
      address: locations[i].address,
      desc: locations[i].desc,
      tel: locations[i].tel,
      int_tel: locations[i].int_tel,
      vicinity: locations[i].vicinity,
      open: locations[i].open,
      open_hours: locations[i].open_hours,
      photo: locations[i].photo,
      time: locations[i].time,
      email: locations[i].email,
      web: locations[i].web,
      iw: locations[i].iw
    });
    markersArray.push(marker);

    if (locations[i].iw.enable === true){
      bindInfoWindow(marker, map, locations[i]);
    }
  }
}