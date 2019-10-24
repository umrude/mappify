/* eslint-disable no-undef */
/* eslint-disable func-style */
let map;
let allPlaces = [];
let storedPlaceIds = [];
let markers = [];
let currentMapId;
// let currentUserId;

//calls placesAPI with place_id and gets object containing relevent data about place
function locationsFromDatabase(data, map) {

  //calls the PlacesService API
  let service = new google.maps.places.PlacesService(map);
  //sets up the request to the API for each entry in data
  data.forEach(function (id) {
    let request = {
      placeId: id
    };
    //makes request to api and pushs response to allPlaces then displays location
    service.getDetails(request, function (place, status) {
      allPlaces.push(place);
      displayLocations([allPlaces[allPlaces.length - 1]], map);
    });
  });
}

// JACKSON'S EDITS BELOW
function findPlaceId() {
  let markersPlaceIds = [];
  for (const place of allPlaces) {
    console.log(place);
    markersPlaceIds.push(place.place_id);
    console.log("Place IDs For Database: ", markersPlaceIds);

  }
  return markersPlaceIds;
}

function createMap() {
  storedPlaceIds = [];
  allPlaces = [];
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  let title = $('.title').val();
  let description = $('.description').val();


  $.ajax({
    method: "POST",
    url: "/maps",
    data: { title: title, description: description }
  })
    .then((result) => {
      console.log("RESULT FROM CREATE: ", result);
      $('.title').val("");
      $('.description').val("");
      currentMapId = result.id;
    }).catch((error) => {
      console.log("ERROR CREATING MAP", error);
    });
}

function addFavoriteMap() {
  favoriteMapId = currentMapId;
  $.ajax({
    method: 'POST',
    url: '/maps/favorites/' + favoriteMapId
  })
    .then((result) => {
      console.log("Successful Map Favorite ✅", result);
    }).catch((error) => {
      console.log("ERROR CREATING MAP", error);
    });
}

function toggleListMapClass() {

  $('.list-maps').addClass('visible').addClass('slide');
  $('.to-grey').addClass('grey-screen');
  $('.list-of-links').empty();
}

function dynamicHtmlMapList(mapIdArray) {

  for (let item of mapIdArray) {
    let mapListId = `
    <br>
    <div class="list-of-links">
    <h3>${item.title}</h3>
    <p>${item.description}</p>
    <p>ID: ${item.id}</p>
    <button type="button" data-map-id="${item.id}" class="load-map btn btn-primary">Load Map</button>
    <br><br>
  </div>`;
    $('.links').prepend(mapListId);
  }
}

// GET DISCOVER MAPS
function getDiscoverMaps() {
  $.ajax({
    method: "GET",
    url: "/maps"
  })
    .then((mapIdArray) => {
      $('.list-maps').children('h2').html('All Maps')
      dynamicHtmlMapList(mapIdArray);
    });
}

//  GET USER MAPS
function getUserMaps() {
  $.ajax({
    method: "GET",
    url: "/maps/user"
  })
    .then((mapIdArray) => {
      $('.list-maps').children('h2').html('My Maps')
      dynamicHtmlMapList(mapIdArray);
    });
}

// GET FAVORITE MAPS
function getFavoriteMaps() {
  $.ajax({
    method: "GET",
    url: "/maps/favorites"
  })
    .then((mapIdArray) => {
      console.log('mapIdArray: ', mapIdArray);
      $('.list-maps').children('h2').html('My Favorites')
      dynamicHtmlMapList(mapIdArray);
    });
}

function getContributions() {
  $.ajax({
    method: "GET",
    url: "/maps/contributions"
  })
    .then((mapIdArray) => {
      console.log('mapIdArray: ', mapIdArray);
      $('.list-maps').children('h2').html('My Contributions');
      dynamicHtmlMapList(mapIdArray);
    });
}



function saveMapMarkers() {
  const placeIds = findPlaceId();
  $.ajax({
    method: "POST",
    url: "/markers",
    data: { placeIds: placeIds, mapId: currentMapId }
  })
    .then(res => {
      console.log("POST:  NEW MARKERS --> Success! ✅", res);
    })
    .catch(err => console.error(err));
}

// This function is only for when a user selects a new map from the list
// currentMapId is updated after a successful call
function getNewlySelectedMapId(eventObj) {
  return eventObj.currentTarget.dataset.mapId;
}

// Get new map after selecting map from list
// eventObj is an optional parameter that can be passed to the
// event listeners callback function. It contains information about
// the element and the context of which the listener was called.
function repopulateSavedMarkersByMapId(eventObj) {
  storedPlaceIds = [];
  allPlaces = [];
  let mapId = getNewlySelectedMapId(eventObj);
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  $.ajax({
    method: "GET",
    url: "/maps/" + mapId
  })
    .then(placeIds => {
      console.log("GET: PLACE IDs --> Success! ✅ \n\n", placeIds);
      for (const item of placeIds) {
        storedPlaceIds.push(item.place_id);
      }
      currentMapId = mapId;
      console.log('ARRAY: PLACE IDs --> Success! ✅ \n\n', storedPlaceIds);
      locationsFromDatabase(storedPlaceIds, map);
    })
    .catch(err => console.error(err));
}
