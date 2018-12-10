function runWhenReady(){
    console.log("Run when Ready");
    if(typeof RenderCanvas === 'undefined'){
        console.log("Not ready Yet");
        readyFlag = setTimeout(function(){
            runWhenReady();
        },100);
    } else {
        console.log("Finished loading");
        var renderCanvas = new RenderCanvas();



        //process latest server update
        //interpolate objects betweem frames
        //render frame




    }
} //run when ready

runWhenReady();
