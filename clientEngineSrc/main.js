import RenderCanvas from './render.js';
import Input from './input.js';
import GameStateManager from './gameStateManager.js';

console.log("Bundle client Engine Loaded");
export default class ClientGameEngine {
    constructor(config){

        this.config = config;

        this.gameStateManager = new GameStateManager(config);
        if(this.config.DEBUG && this.config.DEBUG.GSM) this.gameStateManager.initalizeDebugObjects();
        this.renderCanvas = new RenderCanvas(config);
        this.input = new Input(config);

        // let testNode = new EnergyNode.init("string in browser");
        // console.log(testNode.toString());

        //Loop Stats
        this.avgFPS = 0;
        this.frames = 0;
        this.everySecondCountDown = 1000;
        this.lastFrameTime = new Date().getTime();
        this.deltaTime = 0;
        this.timestep = 20; //ms = milliseconds

        //UserInput
        this.userInput = [];

        //Start Main Loop
        console.log("Finished loading");
        this.mainLoop();
    }

    addKeyMapping(keys){
        this.input.addKeyMapping(keys);
    }

    mainLoop(){
        // console.log("-----------Mainloop----------");
        //process real-time stats
        let now = new Date().getTime();
        this.deltaTime = now - this.lastFrameTime;
        this.lastFrameTime = now;
        this.everySecondCountDown = this.everySecondCountDown - this.deltaTime;
        this.frames++;
        if(this.everySecondCountDown < 0){
            this.avgFPS = Math.round((this.frames * 0.8) + (this.avgFPS * 0.2));
            this.frames = 0;
            this.everySecondCountDown = 1000;
            // renderCanvas.drawBackground();
        }

        //get and process client Input
        this.userInput = this.input.getInput();
        this.userInput.forEach((UserAction)=>{
                console.log(UserAction);
                // this.rendeUserAction

        });

        //process latest server update if any

        //step and extrapolate between updates/frames
            //this should be done in fixed time steps with a
            //calulation on time lost between updates (lag)
            //then looped to allow multiple between frame renders if neccissary




        //get objects to Render in View
        let objectsToRender = this.gameStateManager.getObjectsInRange(
            this.renderCanvas.cameraX, this.renderCanvas.cameraX + this.renderCanvas.viewWidth,
            this.renderCanvas.cameraY, this.renderCanvas.cameraY + this.renderCanvas.viewHeight);
        //render frame
        this.renderCanvas.drawView(objectsToRender);


        this.renderCanvas.drawGui({
            avgFPS: this.avgFPS,
            deltaTime: this.deltaTime
        });
        window.requestAnimationFrame(this.mainLoop.bind(this));
    }
}
