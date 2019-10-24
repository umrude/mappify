/* eslint-disable no-undef */
$(document).ready(function () {

  // getCurrentUserId()

  $('.create-map-button').click(function () {
    $('.title-form').addClass('hidden');
    $('.to-grey').removeClass('grey-screen');
    createMap();
  });
  // toggles list window when my maps is clicked
  // sends request to DB to dynamically up date the my list map
  $('.my-maps').click(function () {
    toggleListMapClass();
    getUsersMaps();
  });

  // SAVE... MAP'S MARKERS TO DATABASE
  $(".save").click(saveMapMarkers);

  // GET... MY MAPS LIST (RETURNS ARRAY OF PLACE IDS)
  $(".links").on('click', 'button', function (eventObj) {
    toggleListMapClass();
    repopulateSavedMarkersByMapId(eventObj);
  });

  $('');

  $('.show-form').click(function () {
    $('.title-form').removeClass('hidden');
    $('.to-grey').addClass('grey-screen');
  })
});

