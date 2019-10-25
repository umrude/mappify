/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable func-style */
let map;
let allPlaces = [];
let storedPlaceIds = [];
let markers = [];
let currentMapId;

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

// FOCUS ON CURRENT MAP ON LOAD...
function resetBounds() {
  map.setZoom(10);
  map.setCenter(allPlaces[0].geometry.location);
}


//retrieves location id's from the database to repopulate saved maps
function findPlaceId() {
  let markersPlaceIds = [];
  for (const place of allPlaces) {
    console.log(place);
    markersPlaceIds.push(place.place_id);
    console.log("Place IDs For Database: ", markersPlaceIds);

  }
  return markersPlaceIds;
}

function toggleMapDesc(title, description) {
  $('.map-desc').empty();
  $('.map-desc').append(`
  <h3 class='title-overlay'>${title}</h3>
  <p class='desc-overlay'>${description}</p>
`);
  $('.map-desc').removeClass('hide-desc')
}

//clears current markers on map and creates a new map in the DB
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

      toggleMapDesc(title, description);

    })
    .catch((error) => {
      console.log("ERROR CREATING MAP", error);
    });
}

//route to send current map id to favourites table in the DB
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

//toggles visibility of map list aside
function toggleListMapClass() {
  $('.list-maps').addClass('visible').addClass('slide');
  $('.to-grey').addClass('grey-screen');
  $('.links').empty();
}

//updates map lists dynamically when user creates new maps or favourites etc.
function dynamicHtmlMapList(mapIdArray) {
  for (let item of mapIdArray) {
    let mapListId = `
    <br>
    <div class="list-of-links">
    <h3 class='list-map-card-title'>${item.title}</h3>
    <p style="word-wrap: break-word;">${item.description}</p>
    <button type="button" data-map-id="${item.id}" class="load-map btn btn-primary">Load Map</button>
    <br><br>

    ${item.name ? `<p>Created By: ${item.name}</p>` : ''}

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
      $('.list-maps').children('h2').html('All Maps');
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
      $('.list-maps').children('h2').html('My Maps');
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
      $('.list-maps').children('h2').html('My Favorites');
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

//toggles the loading spinner when user clicks save
function loadingSpinner() {
  $(".loading").toggleClass('hide-load');
}

//saves locations to database
function saveMapMarkers() {
  loadingSpinner();
  const placeIds = findPlaceId();
  $.ajax({
    method: "POST",
    url: "/markers",
    data: { placeIds: placeIds, mapId: currentMapId }
  })
    .then(res => {
      setTimeout(() => {
        loadingSpinner();
      }, 2000);

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
      let title = placeIds[0].title;
      let description = placeIds[0].description;

      console.log('ARRAY: PLACE IDs --> Success! ✅ \n\n', storedPlaceIds);
      locationsFromDatabase(storedPlaceIds, map);

      toggleMapDesc(title, description);
    })
    .catch(err => console.error(err));
}
