/* eslint-disable no-undef */

$(document).ready(function () {

  $('.create-map-button').click(function () {
    $.ajax({
      method: "POST",
      url: "/maps"
    });
  });


  // toggles list window when my maps is clicked
  // sends request to DB to dynamically up date the my list map
  

  $('.my-maps').click(function () {
    $('.list-my-maps').toggleClass('visible').toggleClass('slide');
    $('.to-grey').toggleClass('grey-screen');
    $('.list-my-maps').empty();
    $.ajax({
      method: "GET",
      url: "/maps"
    })
      .then((idArray) => {

        for (let item of idArray) {
          let mapListId = `
          <div class="list-of-links load-map">
          <h1>Title: ${item.title}</h1>
          <p>Description: ${item.description}</p>
          <p>ID: ${item.id}</p>
          <button type="button" id="${item.id}" class="btn btn-primary load-map">Load Map</button>
        </div>`;
          $('.list-my-maps').prepend(mapListId);

        }
      });
  });
});



