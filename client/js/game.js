var renderCanvas = null;
var input = null;

function runWhenReady(){
    console.log("Run when Ready");
    if(typeof RenderCanvas === 'undefined' || typeof Input === 'undefined'){
        console.log("Not ready Yet");
        readyFlag = setTimeout(function(){
            runWhenReady();
        },100);
    } else {
        console.log("Finished loading");
        renderCanvas = new RenderCanvas();
        input = new Input(renderCanvas);
        mainLoop();
    }
} //run when ready

runWhenReady();


var avgFPS = 0;
var frames = 0;
var everySecond = 1000;
var lastFrameTime = new Date().getTime();
var deltaTime = 0;
function mainLoop(){
    // console.log("Mainloop");
    let now = new Date().getTime();
    deltaTime = now - lastFrameTime;
    lastFrameTime = now;
    everySecond = everySecond - deltaTime;
    frames++;
    if(everySecond < 0){
        avgFPS = Math.round((frames * 0.8) + (avgFPS * 0.2));
        frames = 0;
        everySecond = 1000;
    }


    //process latest server update
    //step and interpolate objects betweem frames

    //render frame
    renderCanvas.draw(avgFPS);
    window.requestAnimationFrame(mainLoop);
}
