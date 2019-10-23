
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
    $.ajax({
      method: "GET",
      url: "/maps"
    })
      .then((idArray) => {

        for (let item of idArray) {
          let mapListId = `
          <div class="list-of-links">
          <p>${item.id}</p>
          <h1>${item.title}Titile</h1>
          <p>${item.description}Description</p>
          <button type="button" id="data-map-id${item.id}" class="btn btn-primary ">Load Map</button>
        </div>`;
          $('.links').prepend(mapListId);

        }
      });
  });


  // SKELETON EXAMPLE

  // $(() => {
  //   $.ajax({
  //     method: "POST",
  //     url: "/maps"
  //   }).done((result) => {
  //     for (user of users) {
  //       $("<div>").text(user.name).appendTo($("body"));
  //     }
  //   });

});



