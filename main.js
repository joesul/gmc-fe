$(document).ready( function() {
console.log("J-E-T-S! JETS! JETS! JETS!");

  var localHostUrl = 'http://localhost:3000';
  var herokuURL = 'https://floating-taiga-62407.herokuapp.com';

  $.ajax({
    url: localHostUrl + '/jmc/search',
    // url: herokuURL + '/jmc/search',
    method: 'POST',
    dataType: 'json'
  })
  .done(function(data) {
    console.log("touchdown!");
    console.log(data);
  })
  .fail(function() {
    console.log("erroar");
  });
});
