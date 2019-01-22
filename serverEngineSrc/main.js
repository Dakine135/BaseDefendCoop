// var Engine = require('./serverGameEngine.js');

class GameManager{
    constructor(){
        console.log("Starting Game Manager");


        /*
        --Events--
        disconnect    parent process manually calls the child.disconnect function
        error         process could not be spawned or killed
        close         stdio streams of a child process get closed
        message       process.send()
        exit

        --stdio streams--
         child.stdin,
         child.stdout, and
         child.stderr
        */
        const { fork } = require('child_process');
        const child = fork('serverGameEngine.js');

        child.on('message', (msg) => {
          console.log('Message from child', msg);
        });

        child.send({ hello: 'world' });


        // child.stdout.on('data', (data) => {
        //   console.log(`child stdout:\n${data}`);
        // });
        //
        // // child.stderr.on('data', (data) => {
        // //   console.error(`child stderr:\n${data}`);
        // // });
        // child.on('exit', function (code, signal) {
        //   console.log('child process exited with ' +
        //               `code ${code} and signal ${signal}`);
        // });

        //setup game instance
        // let serverEngineOptions = {
        //   tickRate: 20
        // }
        // var game = new Engine(serverEngineOptions);
        // game.start();



    }//end constructor

}

module.exports = GameManager;
