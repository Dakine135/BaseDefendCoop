//NPM PACKAGES
var express = require('express');
var socket = require('socket.io');
var reload = require('reload');

//my classes or files
// var GameState = require('./serverGameState.js');
// var GLOBALS = require('./GLOBALS.js');
var Engine = require('./serverEngineSrc/main.js');
var EnergyNode = require('./client/shared/EnergyNode');
let testNode = new EnergyNode.init("stringConstructor");
let testNode2 = new EnergyNode.init("dasfasdf");
console.log(testNode.toString());
console.log(testNode2.toString());

var app = express();
var server = app.listen(3033);
var io = socket(server);

// var GAMESTATE = new GameState(paper);
// GAMESTATE.setup();

app.use(express.static('./client'));
reload(app);
console.log("BaseDefendCoop server running");


var ticRate = 20;
var game = new Engine(ticRate);
game.start();


io.sockets.on('connection', newConnection);
function newConnection(socket){
  //Client first connects, create Client object and snake
  console.log("a user connected: ", socket.id);

    socket.on('clientData', clientJoin);
    function clientJoin(clientData){
        console.log("Client Data: ", clientData);
    }

  socket.on('sendPing', ping);
    function ping(){
        var serverTime = new Date().getTime();
        console.log("Server Time: ", serverTime);
        socket.emit('pong', serverTime);
    }

    socket.on('userEvent', function(userEvent){
        console.log("Event: ", userEvent);
        //handle event in server GAMESTATE
    });


    socket.on('disconnecting', clientDisconnected);
    function clientDisconnected(){
        console.log("client disconnected: ", socket.id);
    }

}//new connection "per socket"
