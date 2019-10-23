$(document).ready(function () {
  $('.create-map-button').click(createMap);

  // toggles list window when my maps is clicked
  // sends request to DB to dynamically up date the my list map
  $('.my-maps').click(function () {
    toggleListMapClass()
    getUsersMaps()
  });

  // SAVE... MAP'S MARKERS TO DATABASE
  $(".save").click(saveMapMarkers);

  // GET... MY MAPS LIST (RETURNS ARRAY OF PLACE IDS)
  $(".links").on('click', 'button', function (eventObj) {
    toggleListMapClass();
    repopulateSavedMarkersByMapId(eventObj);
  });
});



