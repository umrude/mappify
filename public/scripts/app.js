// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for (user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });
$('.create-map').click(function () {
  $.ajax({
    url: '/',
    method: 'POST'
  });
});

