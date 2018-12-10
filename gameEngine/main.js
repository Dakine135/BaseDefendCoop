//Game Engine Main loop
const gameloop = require('node-gameloop');

class Engine {
  constructor(ticRate){
    console.log("create game instance tickRate is %s",ticRate);
    this.id = null;
    this.frameCount = 0;
    this.ticRate = ticRate;
  }

  start(){

    var oneTime = 1;
    // start the loop at 60 fps (1000/60ms per frame) and grab its id
    var TIMESTEP = 1000 / this.ticRate;
    var delta = 0;
    this.id = gameloop.setGameLoop(function(lastTickDelta) {
        // `delta` is the delta time from the last frame
        delta += (lastTickDelta * 1000);
        this.frameCount++;

        if(this.frameCount % (this.ticRate * 10) == 0){
          //every 10 seconds
          console.log('frame=%s, delta=%s', this.frameCount, delta);
        }

        if(oneTime > 0){
          // var point = new GLOBALS.paper.Point(100,100);
          // GAMESTATE.GRAPH.addEnergyNode(point);
          oneTime--;
        }

        // Simulate the total elapsed time in fixed-size chunks
        while (delta >= TIMESTEP) {
            // GAMESTATE.update(TIMESTEP);
            delta -= TIMESTEP;
        }

    }.bind(this), TIMESTEP);
  }//end start function

  stop(){
    //stop the loop
    gameloop.clearGameLoop(this.id);
  }


}//end class Engine

module.exports = Engine;
