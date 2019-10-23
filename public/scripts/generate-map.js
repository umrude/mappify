/* eslint-disable no-undef */
/* eslint-disable func-style */
//all styling
let stylesArray = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e"
      }
    ]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563"
      }
    ]
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c"
      }
    ]
  }
];
//initializes map
function initMap() {
  //new instance of map
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 49.2827,
      lng: -123.1207
    },
    zoom: 10,
    // mapTypeId: 'roadmap',
    styles: stylesArray
  });
  //initializes autocomplete via places API
  initAutocomplete(map);
}
//sets up search bar with places api
function initAutocomplete(map) {
  // Create the search box and link it to the UI element.
  let input = document.getElementById("pac-input");
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function () {
    searchBox.setBounds(map.getBounds());
  });
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", function () {
    let places = searchBox.getPlaces();
    if (places.length === 0) {
      return;
    }
    let bounds = new google.maps.LatLngBounds();


    places.forEach(function (place) {

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
      map.fitBounds(bounds);
      console.log(allPlaces);
    });
    //if allplaces contains 0 elements OR if the element doesn't already exist in the array, push the element to array
    if (allPlaces.length === 0) {
      allPlaces.push(places[0]);
      displayLocations(allPlaces, map);
    } else if (!checkLocations(allPlaces, places)) {
      allPlaces.push(places[0]);
      displayLocations([allPlaces[allPlaces.length - 1]], map);
    }
  });
}
//checks allPlaces and makes sure current entry doesn't already exist in the array
function checkLocations(allPlace, currentCheck) {
  let result = false;
  allPlace.forEach(function (place) {
    if (place.place_id === currentCheck[0].place_id) {
      console.log(
        "in array",
        place.name,
        place.place_id,
        "input",
        currentCheck[0].name,
        currentCheck[0].place_id
      );
      result = true;
    }
  });
  return result;
}
//pass all places in and generates markers and info-windows
function displayLocations(locations, map) {
  //displays info-window on all locations on click
  locations.forEach(function (place) {

    let placeAddress = place.formatted_address;
    let name = place.name;
    let contentString = $(`<div class="text-center">
      <h1 class='info-title'>${name}</h1>
      <p class='info-address'>${placeAddress}</p>
      <button type="button" class="btn btn-outline-danger btn-sm">Remove Location</button>
      </div>`);
    //creates info marker for each location
    let infowindow = new google.maps.InfoWindow({
      content: contentString.get(0)
    });
    //creates a marker for each location
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: name,
      icon: "https://i.ibb.co/qYvvDXn/red-marker.png",
      animation: google.maps.Animation.BOUNCE
    });
    markers.push(marker);
    //event listener for each marker
    marker.addListener("click", function () {
      infowindow.open(map, marker);
    });
    //gets the remove button and location name from marker
    let removeButton = contentString[0].childNodes[5];
    let locationName = contentString[0].childNodes[1].innerHTML;
    //removes location from display and array
    removeButton.addEventListener("click", function () {
      for (let [i, place] of allPlaces.entries()) {
        if (place.name === locationName) {
          allPlaces.splice(i, 1);
          console.log("removed items array", allPlaces);
        }
      }
      //removes instance of marker
      marker.setMap(null);
    });
  });
}
