/* Weather Current weather and forecast	Free plan
Threshold: 7,200
Hourly forecast: 5
Daily forecast: 0
Calls per minut: 60
*/
const weather = require('./weather');
const query = process.arg.slice(2).join("_").replace(' ', '_');

weather.get(query);
