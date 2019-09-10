//install express
//need nodemon running

var fs = require('fs');
var data = fs.readFileSync('HighScore.json');
var scores = JSON.parse(data);
console.log('scores from json into server code: ' + scores['highScores'][0]['name']);


console.log('server is starting');
var express = require('express');
var app = express();

// taken from https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = app.listen(2323, listening);

function listening(){
    console.log('listening...');
}

app.use(express.static('website'));

//app.use(express.static('website'));
//can use this to have localhost:<port> connect to an html file
//https://www.youtube.com/watch?v=6oiabY1xpBo&feature=youtu.be&list=PLRqwX-V7Uu6Yyn-fBtGHfN0_xCtBwUkBp


//look for call from client code to store new score
app.get('/save/:name/:score/:day/:month/:year/:spot/',addScore);

function addScore(request, response) {
    var data = request.params;
    var name = data.name;
    var score = data.score;
    var day = data.day;
    var month = data.month;
    var year = data.year;
    var spot = data.spot;

    var date = day + '/' + month + '/' + year;
    var newScore = {"name":name, "score":score, "date": date};

    console.log(name);
    console.log(score);
    console.log(date);
    console.log(spot);

    scores['highScores'].splice(spot,0,newScore);
        if(scores['highScores'].length > 10)
        {
            scores['highScores'].pop();
        }
    

    console.log('scores getting sent back to json file: ' + scores);
    console.log(scores['highScores']);
    console.log(scores['highScores'][1]);
    var reply = 'oops, server reply not updated';
    var data = JSON.stringify(scores, null, 2);
    fs.writeFile('HighScore.json', data, finished);

    function finished(err) {
        console.log('all set');
        reply = {
            status: "Success"
            }
        response.send(reply);
    }
}


// app.get('/all', sendAll);

// function sendAll(request, response) {
//     response.send(words);
// }



app.get('/get', getScores);

function getScores(request, response) {
    response.send(scores);
}