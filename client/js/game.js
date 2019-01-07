var DEBUG = {
    input: true,
    render: false,
    GSM: true,
};
var renderCanvas = null;
var input = null;
var gameStateManager = null;

function runWhenReady(){
    console.log("Run when Ready");
    if(typeof RenderCanvas === 'undefined' ||
       typeof Input === 'undefined' ||
       typeof GameStateManager === 'undefined'){
        console.log("Not ready Yet");
        readyFlag = setTimeout(function(){
            runWhenReady();
        },100);
    } else {
        console.log("Finished loading");
        gameStateManager = new GameStateManager();
        if(DEBUG && DEBUG.GSM) gameStateManager.initalizeDebugObjects();
        renderCanvas = new RenderCanvas();
        input = new Input();
        mainLoop();
    }
} //run when ready

runWhenReady();

let testNode = new EnergyNode.init("string in browser");
console.log(testNode.toString());


var avgFPS = 0;
var frames = 0;
var everySecondCountDown = 1000;
var lastFrameTime = new Date().getTime();
var deltaTime = 0;
var timestep = 20; //ms = milliseconds
function mainLoop(){
    // console.log("Mainloop");
    let now = new Date().getTime();
    deltaTime = now - lastFrameTime;
    lastFrameTime = now;
    everySecondCountDown = everySecondCountDown - deltaTime;
    frames++;
    if(everySecondCountDown < 0){
        avgFPS = Math.round((frames * 0.8) + (avgFPS * 0.2));
        frames = 0;
        everySecondCountDown = 1000;
        // renderCanvas.drawBackground();
    }

    //process cleint Input
    //process latest server update if any

    //step and extrapolate between updates/frames
        //this should be done in fixed time steps with a
        //calulation on time lost between updates (lag)
        //then looped to allow multiple between frame renders if neccissary

    //render frame
    // if(newSecond)
    // renderCanvas.drawBackground();
    renderCanvas.drawView();
    renderCanvas.drawGui();
    window.requestAnimationFrame(mainLoop);
}
