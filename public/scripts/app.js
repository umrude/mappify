
$(document).ready(function () {



  $('.create-map-button').click(function () {
    $.ajax({
      method: "POST",
      url: "/maps"
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



