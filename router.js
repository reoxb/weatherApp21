const url = require('url');
const fs = require('fs');
const path = require('path');

const Profile = require("./profile.js");
const renderer = require("./renderer.js");
const querystring = require("querystring");

const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
};

var commonHeaders = {'Content-Type': 'text/html'};

//Handle HTTP route GET / and POST / i.e. Home
function init(req, res) {

  const parsedUrl = url.parse(req.url);
  const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');

  if(sanitizePath == '/' && req.method.toLowerCase() == 'get'){
    let pathname = path.join(__dirname, 'www', sanitizePath);
    console.log(pathname);

    var stream = fs.createReadStream(pathname);
    stream.on('error', function() {
        res.writeHead(404);
        res.end();
    });
    stream.pipe(res);

    /*
    fs.exists(pathname, function (exist) {

      if(!exist) {
        // if the file is not found, return 404
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
      }

      // if is a directory, then look for index.html
      if (fs.statSync(pathname).isDirectory()) {
        pathname += 'index.html';
      }

      // read file from file system
      fs.readFile(pathname, function(err, data){
        if(err){
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          // based on the URL path, extract the file extention. e.g. .js, .doc, ...
          const ext = path.parse(pathname).ext;
          // if the file is found, set Content-type and send data
          res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
          res.end(data);
        }
      });
    }); // end pathname exist
    */
  } else { // redirige al inicio
    res.writeHead(303, {"Location": "/"});
    res.end();
  }// fin del if
} // fin de la funcion home

//Handle HTTP route GET /:query i.e. /Mexico
function query(request, response) {
  var query = request.url.replace("/", "");

   if((query.length > 0) && request.method.toLowerCase() === "post") {
     if(query == 'makeQuery'){
       console.log('Entro al makeQuery method :3\n');
       
      var body = '';

      request.on('data', function(data){
        body += data;
      });

      request.on('end', function(){
        var post = querystring.parse(body);
        //  console.log(post);
        console.log(post.username);
      });
     }
   }

  /*
    response.writeHead(200, commonHeaders);  
    renderer.view("header", {}, response);    
  
    var studentProfile = new Profile(query);
    studentProfile.on("end", function(profileJSON){

      var values = {
        avatarUrl: profileJSON.gravatar_url, 
        query: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }

      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    });
        
    studentProfile.on("error", function(error){
      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });
  } // fin if
  */
}

module.exports.init = init;
module.exports.query = query;