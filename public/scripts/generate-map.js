/* eslint-disable no-undef */
/* eslint-disable func-style */


function initAutocomplete() {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 49.2827,
      lng: -123.1207
    },
    zoom: 10,
    mapTypeId: 'roadmap'
  });
  // Create the search box and link it to the UI element.
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  //every search object is here, maybe connect to an event handler so only locations that user WANTS saved is added to this array
  let allPlaces = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();

    //Here we can see the full name of location, images, ect!! might be more useful than geocoding!!!!!!
    console.log("places", places);

    if (places.length === 0) {
      return;
    }

    let bounds = new google.maps.LatLngBounds();

    //peep the console here after every search
    console.log("all Places ", allPlaces, allPlaces.length);


    places.forEach(function(place) {
      //saves each search to the array, maybe connect to an event handler so only locations that user WANTS saved is added to this array
      allPlaces.push(places[0]);


      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);

    displayLocations(allPlaces, map);

  });
}

function displayLocations(locations, map) {
  //displays info-window on all locations on click
  locations.forEach(function(place) {

    let placeAddress = place.formatted_address;
    let name = place.name;

    let contentString = `
        <h1>${name}</h1>
        <p>${placeAddress}</p>
        <button>Add location</button>`;

    //creates info marker for each location
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    //creates a marker for each location
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: name
    });

    //event listener for each marker
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
  });
}



