var map;
var markers = [];
var oms;

function initMap() {
  var myLatLng = { lat: 59.333420, lng: 18.054479 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 8
  });
  var oms = new OverlappingMarkerSpiderfier(map, {
    markersWontMove: true,
    markersWontHide: true,
    //basicFormatEvents: true,
  })
  
  oms.addListener('format', function(marker, status) {
    var iconURL = status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED ? 'assets/img/marker-highlight.svg' :
      (status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE ? 'assets/img/marker-plus.svg' : 
      'assets/img/marker.svg');
    var iconSize = new google.maps.Size(23, 32);
    marker.setIcon({
      url: iconURL,
      size: iconSize,
      scaledSize: iconSize  // makes SVG icons work in IE
    });
  });

  function addMarker(prop) {
    var marker = new google.maps.Marker({
      map: map,
      title: prop.name
    });

    var geocoder = new google.maps.Geocoder();
    if("address" in prop && ! ("position" in prop)){
      geocoder.geocode({'address': prop.address}, function(results, status) {
        if (status === 'OK') {
          marker.setPosition(results[0].geometry.location);
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
    }else{
      marker.setPosition(prop.position);
    }
    var tags="";
    for (var index = 0; index < prop.tags.length; index++) {
      var tags = tags+ '<span class="badge">' + prop.tags[index]+'</span>';
    }
    var content = '<div class="event"><p><a href="' + prop.url + '" ><h4>' + prop.name + "</h4></a></p> " +
      '<h5><span class="label label-success">' + prop.start_time + " " + prop.start_date + "</span></h5></p>" +
      "<p>" + prop.description+ "</p>" +
      "<p>" + tags+ "</p>";
    var infowindow = new google.maps.InfoWindow({
      content: content
    });
    marker.addListener('spider_click', function () {
      infowindow.open(map, marker);
    });
    /* if (prop.iconImage) {
      marker.setIcon(prop.iconImage);
    } */
    markers.push(marker);
    oms.addMarker(marker);
  };

  $.getJSON("assets/data/events.json", function (fileEvents) {
    for (var i = 0; i < fileEvents.length; i++) {
      addMarker(fileEvents[i]);
    }
    //var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/img/m'});    
  });


}