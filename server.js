const http = require('http');
const fs = require('fs');
const path = require('path');
const change_blank = require('./public/js/change_blank.js');
var XMLHttpRequest = require('xhr2');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    filePath = path.resolve('./public/404.html');
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filePath).pipe(res);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else if (fileExt == '.css') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            fs.createReadStream(filePath).pipe(res);
        }
        else {
            filePath = path.resolve('./public/404.html');
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
        }
    }
    else {
        filePath = path.resolve('./public/404.html');
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
    }
});


var url = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=random&grnnamespace=0&prop=revisions%7Cimages&rvprop=title&grnlimit=10"

var titleToUse;
var xhr = new XMLHttpRequest();
xhr.open('GET',url,true)
xhr.onload = function() {
    console.log("finishingAddTitles")
    var title
    var data = JSON.parse(this.response)
    for (var key in data.query.pages) {
            title = data.query.pages[key].title
            title = new String(title)
            title = new String(title.replaceAll(' ','_'))
            console.log(title);
            titleToUse = title;
            break;
    }
    return true
}
xhr.send()

var request = require('request');
var query = 'english';
var wikiBody = '';
var charsToGet = 1200;
var exLimit = "max";
var url = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&formatversion=2"
    + "&exlimit="
    + exLimit.toString()
    + "&explaintext=1&titles="
    + titleToUse;
request(url, function (err, response, body) {
 if(err){
 var error = "cannot connect to the server";
 console.log(error);
} else {
wikiBody = body;
 console.log('body:', body);
 }
});

wikiBody.replace("\n", "\r\n");
fs.readFile('./public/index.html', function (err, html) {
    if (err) {
        throw err; 
    }
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(wikiBody);
        console.log(typeof(wikiBody))
        response.write(html);  
        response.end();  
    }).listen(8000);
});