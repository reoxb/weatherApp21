//Programa que conecta con una API 
const http = require('http');
const weather_api = require('./api.json');

function getWeatherQuery(place){

  const query = `q=${place},mx&units=metric&APPID=${weather_api.key}&lang=es`;

  try {
    const request = http.get(`http://api.openweathermap.org/data/2.5/weather?${query}`, (response) => {

      //response recibe una cabecera
      const statusCode = response.statusCode; // 200
      const contentType = response.headers['content-type']; //application/json
      //const header = response.headers; //application/json

      let error;

      //valida si se pudo conectar codigo 200
      if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` + `Status Code: ${statusCode}`);
        //si se pudo conectar y es no es un json
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` + `Expected application/JSON but received ${contentType}`);
      }

      //si hubo error muestra el mensaje
      if (error) {
        console.log(error.message);
        // libera la memoria
        response.resume();
        return;
      }

      // si no hubo error establece la codificacion utf8
      response.setEncoding('utf8');
      // declara una variable donde se concatenara todo el json
      let rawData = '';
      // el json es recibido en forma de cadenas hexadecimales a tramos
      response.on('data', (chunk) => rawData += chunk);

      //se concatenan las cadenas
      response.on('end', () => {
        try {
          //se convierten a formato json
          let parsedData = JSON.parse(rawData);
          //aqui ya podemos trabajar con el objeto json
          console.log(parsedData);
        } catch (e) {
          //si no se puede castear a json
          console.log(e.message);
        }
      });
    });

    //si hubo error al conectar con el servidor
    request.on('error', (e) => {
      console.log(`Got error: ${e.message}`);
    });

  } catch (e) {
    // si existe algo malo en la url
    console.log(`URL error: ${e.message}`);
  }
} // fin de la funcion 

module.exports.queryWeather = getWeatherQuery;