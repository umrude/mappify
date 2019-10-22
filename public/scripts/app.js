
$(document).ready(function () {



  $('.create-map-button').click(function () {
    $.ajax({
      method: "POST",
      url: "/maps"
    });
  });


  $('.my-map-click').click(function () {
    $('.list-my-maps').toggleClass('visible').toggleClass('slide')
    $('.to-grey').toggleClass('grey-screen');

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



