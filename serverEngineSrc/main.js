//Game Engine Main loop
// const gameloop = require('node-gameloop');

class Engine {
  constructor({
    ticRate=20
  }){
    console.log("create game instance tickRate is %s",ticRate);
    this.id = null;
    this.tickCount = 0;
    this.timeStep = 1000 / this.ticRate;
    this.running = false;

    this.secondsIntoNanoseconds = 1e9;
    this.nanosecondsIntoSeconds = 1 / this.secondsIntoNanoseconds;
    this.millisecondsIntoNanoseconds = 1e6;
    this.nanosecondsIntoMiliseconds = 1/this.millisecondsIntoNanoseconds;

    //for MainLoop
    this.ticRate = ticRate * this.millisecondsIntoNanoseconds;
    this.previousTime = this.getCurrentTimeInNanoseconds();
    this.targertNextTickTime = this.getCurrentTimeInNanoseconds();
    this.acumulatedTime = 0;
  }

  getCurrentTimeInNanoseconds() {
    //see https://nodejs.org/api/process.html#process_process_hrtime_time
    var hrtime = process.hrtime();
    return (+hrtime[0]) * this.secondsIntoNanoseconds + (+hrtime[1]);
  }

  mainLoop(){
    if(!this.running) return;

    let now = this.getCurrentTimeInNanoseconds();
    this.acumulatedTime = this.acumulatedTime + now;


    if(now >= this.targertNextTickTime){
      let deltaTime = now - this.previousTime;
      if((this.tickCount % 100) == 0){
        console.log('GameTick=%s, acumulatedTime=%s', this.tickCount, (this.acumulatedTime * this.nanosecondsIntoMiliseconds));
      }
      this.previousTime = now;
      this.targertNextTickTime = now + this.ticRate;
      //run update
      while(this.acumulatedTime >= this.ticRate){
        this.tickCount++;
        this.update();
        this.acumulatedTime = this.acumulatedTime - this.ticRate;
      }
    }

    let remainingTimeInTick = this.targertNextTickTime - this.getCurrentTimeInNanoseconds();
		setTimeout(this.mainLoop.bind(this), (this.tickRate * this.nanosecondsIntoMiliseconds));

  }//end mainLoop

  start(){
    this.running = true;
    this.mainLoop();

    // this.id = gameloop.setGameLoop(function(lastTickDelta) {
    //     // `delta` is the delta time from the last frame
    //     delta += (lastTickDelta * 1000);
    //     this.tickCount++;
    //
    //     if(this.tickCount % (this.ticRate * 10) == 0){
    //       //every 10 seconds
    //       console.log('GameTick=%s, deltaTime=%s', this.tickCount, delta);
    //     }
    //
    //     // Simulate the total elapsed time in fixed-size chunks
    //     while (delta >= TIMESTEP) {
    //         // GAMESTATE.update(TIMESTEP);
    //         delta -= TIMESTEP;
    //     }
    //
    // }.bind(this), TIMESTEP);


  }//end start function

  stop(){
    //stop the loop
    this.running = false;
    // gameloop.clearGameLoop(this.id);
  }

  update(){
    // console.log("No update function defined yet");
  }

}//end class Engine

module.exports = Engine;
