var map;
function initMap() {
  var myLatLng = { lat: 59.333420, lng: 18.054479 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 8
  });

  function addMarker(prop) {
    var marker = new google.maps.Marker({
      position: prop.position,
      map: map,
      title: prop.name
    });
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
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
    if (prop.iconImage) {
      marker.setIcon(prop.iconImage);
    }
  };

  $.getJSON("assets/data/events.json", function (fileEvents) {
    for (var i = 0; i < fileEvents.length; i++) {
      addMarker(fileEvents[i]);
    }
  });

}