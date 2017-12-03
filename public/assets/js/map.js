var map;
var markers = [];
var oms;

function bindInfoWindow(marker, map, infowindow) {
    marker.addListener('spider_click', function () {
      infowindow.open(map, marker);
    });
} 

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
    console.log(marker);
    if(marker.icon.url == 'assets/img/marker.svg' || 
        marker.icon.url == 'assets/img/marker-highlight.svg' ||
        marker.icon.url == 'assets/img/marker-plus.svg'){
      var iconURL = status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED ? 'assets/img/marker-highlight.svg' :
      (status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE ? 'assets/img/marker-plus.svg' : 
      'assets/img/marker.svg');
    }else{
      var iconURL = status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED ? 'assets/img/marker-highlight_o.svg' :
      (status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE ? 'assets/img/marker-plus_o.svg' : 
      'assets/img/marker_o.svg');
    }
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
    var iconURL ='assets/img/marker.svg';
    var iconSize = new google.maps.Size(23, 32);
    marker.setIcon({
      url: iconURL,
      size: iconSize,
      scaledSize: iconSize  // makes SVG icons work in IE
    });
    /* if (prop.iconImage) {
      marker.setIcon(prop.iconImage);
    } */
    markers.push(marker);
    oms.addMarker(marker);
  };


  function addOMarker(prop) {
    console.log(prop);
    console.log("prop" + prop.positions);
    for(var pp = 0; pp < prop.positions.length; pp++){
      console.log("yay" + pp + " " + prop.positions[pp]);
      var marker = new google.maps.Marker({
        map: map,
        title: prop.name,
        center: prop.positions[pp]
      });
        marker.setPosition( prop.positions[pp]);
      var tags="";
      for (var index = 0; index < prop.tags.length; index++) {
        var tags = tags+ '<span class="badge">' + prop.tags[index]+'</span>';
      }
      var content = '<div class="event"><img src = "assets/data/img/'+ prop.logo +'" width="280" ><p><a href="' + prop.url + '" ><h4>' + prop.name + "</h4></a></p> " +
        "<p>" + prop.description+ "</p>" +
        "<p>" + tags+ "</p>";
      var infowindow = new google.maps.InfoWindow({
        content: content
      });
      bindInfoWindow(marker, map, infowindow);

      var iconURL ='assets/img/marker_o.svg';
      var iconSize = new google.maps.Size(23, 32);
      marker.setIcon({
        url: iconURL,
        size: iconSize,
        scaledSize: iconSize  // makes SVG icons work in IE
      });
      /* if (prop.iconImage) {
        marker.setIcon(prop.iconImage);
      } */
      markers.push(marker);
      oms.addMarker(marker);
    }
  };

  $.getJSON("assets/data/events.json", function (fileEvents) {
    for (var i = 0; i < fileEvents.length; i++) {
      addMarker(fileEvents[i]);
    }
    //var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/img/m'});    
  });


  $.getJSON("assets/data/orgs.json", function (fileOrgs) {
    for (var i = 0; i < fileOrgs.length; i++) {
      addOMarker(fileOrgs[i]);
    }
    //var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/img/m'});    
  });

}