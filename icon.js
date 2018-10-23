// Poner la funcion en un modulo para crear un identificador de iconos
request.then(function(response) {
  var prefix = 'wi wi-';
  var code = resp.weather[0].id;
  var icon = weatherIcons[code].icon;

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'day-' + icon;
  }

  // Finally tack on the prefix.
  icon = prefix + icon;
});

var dorn= "";

rq =$.getJSON(queryTxt);

rq.then(function(rsp){
   var prefix = "wi wi-";

   var today = new Date();
var hour = today.getHours();

if (hour > 6 && hour < 20) {
    //Day time
   dorn = "day-";

} else {
    //Night time
   dorn ="night-";
}
   console.log(dorn);
   var code = rsp.weather[0].id;
   iconD = prefix + "owm-" +dorn+ code;
