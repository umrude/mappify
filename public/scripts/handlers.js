/* eslint-disable no-undef */
$(document).ready(function() {

  // $('.create-map-button').click(createMap);

  $('.create-map-button').click(function() {
    $('.title-form').addClass('hidden');
    $('.to-grey').removeClass('grey-screen');
    createMap();
  });
  // toggles list window when my maps is clicked
  // sends request to DB to dynamically up date the my list map
  $('.discover').click(function() {
    toggleListMapClass();
    getDiscoverMaps();
  });

  // gets maps for a specific user
  $('.my-maps').click(function() {
    toggleListMapClass();
    getUserMaps();
  });

  // SAVE... MAP'S MARKERS TO DATABASE
  $(".save").click(saveMapMarkers);

  // CLICK favorite button
  $('.fav-button').click(function() {
    addFavoriteMap();
  });

  $('.favorites').click(function() {
    console.log('clicked');
    toggleListMapClass();
    getFavoriteMaps();
  });

  // GET... MY MAPS LIST (RETURNS ARRAY OF PLACE IDS)
  $(".links").on('click', 'button', function(eventObj) {
    toggleListMapClass();
    repopulateSavedMarkersByMapId(eventObj);
    map.setZoom(11);
    $('.list-maps').removeClass('visible');
    $('.to-grey').removeClass('grey-screen');
  });

  $('.show-form').click(function() {
    $('.title-form').removeClass('hidden');
    $('.to-grey').addClass('grey-screen');

  });

  $('#map').click(function() {
    $('.list-maps').removeClass('visible');
    $('.to-grey').removeClass('grey-screen');
  });

  $(".contributions").click(function() {
    console.log("clicked");
    toggleListMapClass();
    getContributions();
  });
});
