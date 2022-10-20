'use strict';
const http = require('http');
const express = require('express');
const app = express();
const fs = require("fs");
const { parse } = require("csv-parse");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const port = 4000;
const host = "localhost";

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/dist/app'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

var server = http.createServer(app).listen(process.env.PORT || port, function () { console.log(`Server started on ${port}`) });
console.log('****************** SERVER STARTED ************************');
console.log('*************** Open the application at  http://%s:%s  ******************', host, port);
server.timeout = 240000;

// read from file
var data = fs.readFileSync("./src/assets/dictionary.csv", "utf8");

// split data each rows
data = data.split("\n");
// console.log(data[110]);

// split each column in rows
for(let i in data){
    // split by "," p.s. not comma
    data[i] = data[i].split("\",\"");

    // clean the output
    data[i][0] = data[i][0].replace('"', '');
    data[i][2] = data[i][2].replace('"', '');
}

//group same word together (use map)\
let map = {};
let word = "";
let i = 0;

for(let eachData of data){
    word = eachData[0].toLowerCase(); 

    // if map available, push to the map, else create the map with current definition
    map[word] ? map[word].push(eachData[2]) : map[word] = [eachData[2]];
}

// console.log(map);

function searchDefinition(input){
    let output = [];

    // no loops, O(1)
    output = map[input];
    console.log(output);

    return output;
}

// searchDefinition();

app.post('/searchWord', async function (req, res) {
    try{
        var input = req.body.input;
        console.log(input);

        if (!input || input === "") {
            res.json({output: "No Input"});
            return;
        }

        let output = searchDefinition(input);
        console.log(output);
        res.json({output: output});

    
    }catch(error){
        console.log(error);
        res.json({output: "error"});
    }
});

