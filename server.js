//NPM PACKAGES
var express = require('express');
var socket = require('socket.io');
var reload = require('reload');

//My classes or files
var BaseDefendCoop = require('./serverGameSrc/BaseDefendCoop.js');
var EnergyNode = require('./client/shared/EnergyNode');
let testNode = new EnergyNode.init("stringConstructor");
let testNode2 = new EnergyNode.init("dasfasdf");
console.log(testNode.toString());
console.log(testNode2.toString());

//setup Server
var app = express();
var server = app.listen(3033);
var io = socket(server);
app.use(express.static('./client'));
reload(app);
console.log("BaseDefendCoop server running");


var baseDefenseCoopGame = new BaseDefendCoop();
baseDefenseCoopGame.start();


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
