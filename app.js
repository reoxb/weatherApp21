const http = require('http');
const weather = require('./weather');
const router = require("./router");
/* Weather Current weather and forecast	Free plan
Threshold: 7,200
Hourly forecast: 5
Daily forecast: 0
Calls per minut: 60
*/

const hostname = '127.0.0.1';
const port = process.argv[2] || 3000;
// pasa los espacios en el parametro con guiones bajos
const query = process.argv.slice(2).join("_").replace(' ', '_') || '';

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  router.init(req, res);
  // router.query(req, res);
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});


// recibe parametros desde la linea de comando para realizar la busqueda

// weather.queryWeather(query);
// const weather = require('./weather');