/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

//OLD
//var client_id = '0125e3c5896e451a8be63da932a70d44'; // Your client id
//var client_secret = '2fe8265bd1044151b08967ea53acc4f6'; // Your secret
//var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

//NEW
var client_id = '8dbf3f5775814b0ab7fa1ac8ca7811d1'; // Your client id
var client_secret = '1828bc46e5cc46f7b534ed92c2a5f483'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; //the path after :8888 literally doesn't matter from a file system standpoint, it refers to the URI that gets called below 

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

//Ben: tell it to start at the directory above where the node.js file is running from
//I run it from one sub folder deep from the home folder in a folder called NodeStuff, so I tell it to start one folder above 
//This should work from either personal machine or Pi since it is a relative path 
//Everything else in here uses the folder set in static as the root folder, so it is now all relative to the normal root folder in the file system
app.use(express.static(__dirname + '/../'))
   .use(cors())
   .use(cookieParser());
   console.log(__dirname + '/../Lyrics/SpotifyAPI/authorization_code/public');

app.get('/login', function(req, res) {
  console.log('made it to login request');

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  //Ben: added the third scope for access to user's currently playing song during authentication
  var scope = 'user-read-private user-read-email user-read-currently-playing';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter
console.log('req: ' + req); 
console.log('res: ' + res); 
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
//    res.redirect('/#' +
    res.redirect('/Lyrics/SpotifyAPI/authorization_code/public/#' +  //not sure if this is necessary, but adding due to the change to the redirect in the /callback URI
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("status 200");

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        //added this to get current playing song, but I don't think it does anything
        var options = {
          url: 'https://api.spotify.com/v1/me/player/currently-playing',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          //console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        //This is necessary, otherwise after authorizing you it sends you back to the "static" path, which is the home directory
        res.redirect('/Lyrics/SpotifyAPI/authorization_code/public/#' +
//        res.redirect('/#' +  //don't know 
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else if (response.statusCode === 401) { //if access token is expired, request new one with refresh token
          console.log("status code 401");
          var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
            form: {
              grant_type: 'refresh_token',
              refresh_token: refresh_token
            },
            json: true
          };

          request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
              var access_token = body.access_token;
              res.send({
                'access_token': access_token
              });
            }
          });

          //added this to get current playing song, but I don't think it does anything
          var options = {
            url: 'https://api.spotify.com/v1/me/player/currently-playing',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };

          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            //console.log(body);
          });          
      } else {
//        res.redirect('/#' +
        res.redirect('/Lyrics/SpotifyAPI/authorization_code/public/#' + //not sure if this is necessary, but adding due to the change to the redirect in the /callback URI
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

  
app.listen(80);