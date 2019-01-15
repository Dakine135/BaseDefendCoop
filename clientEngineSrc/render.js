export default class RenderCanvas {
    constructor(config){
        window.addEventListener('resize', this.initCanvas.bind(this), false);
        this.viewCanvas = null;
        this.viewRender = null;
        this.backgroundCanvas = null;
        this.backgroundRender = null;
        this.hudCanvas = null;
        this.hudRender = null;
        this.viewWidth = 0;
        this.viewHeight = 0;

        //for zoom and panning
        this.scaleFactor = 1.00;
        this.cameraX = 0;
        this.cameraY = 0;

        //background stars
        this.stars = [];

        //debug
        this.debug = {
            mouseX: 0,
            mouseY: 0
        }

        this.DEBUG = config.DEBUG;

        this.worldPixelWidth = config.worldPixelWidth;
        this.worldPixelHeight = config.worldPixelHeight;

        this.renderedObjects = [];

        this.initCanvas();
    }

    initCanvas() {
       console.log("initCanvas");
       this.viewWidth = window.innerWidth;
       this.viewHeight = window.innerHeight;
       //Background layer 1
       this.backgroundCanvas = document.getElementById("background-layer");
       this.backgroundRender = this.backgroundCanvas.getContext("2d");
       this.backgroundCanvas.width = this.viewWidth;
       this.backgroundCanvas.height = this.viewHeight;
       //Game View middle layer 2
       this.viewCanvas = document.getElementById("view-layer");
       this.viewRender = this.viewCanvas.getContext("2d");
       this.viewCanvas.width = this.viewWidth;
       this.viewCanvas.height = this.viewHeight;
       //HUD overloay top layer 3
       this.hudCanvas = document.getElementById("hud-layer");
       this.hudRender = this.hudCanvas.getContext("2d");
       this.hudCanvas.width = this.viewWidth;
       this.hudCanvas.height = this.viewHeight;
       //initalize camera view to center
       // console.log("Camera BEFORE", this.cameraX, this.cameraY);
       // console.log("world: ", this.worldWidth, this.worldHeight);
       // console.log("view: ", this.viewWidth, this.viewHeight);
       // this.cameraX = (this.worldWidth / 2) - (this.viewWidth / 2);
       // this.cameraY = (this.worldHeight / 2) - (this.viewHeight / 2);
       let middleWorldX = Math.floor(this.worldPixelWidth / 2);
       let middleWorldY = Math.floor(this.worldPixelHeight / 2);
       this.setCameraCenter(middleWorldX, middleWorldY);
       // console.log("Camera: ", this.cameraX, this.cameraY);
       this.generateStars();
       this.drawBackground();
    } //end initCanvas

    generateStars(){
        for(var x=0;x<this.viewWidth;x++){
            this.stars[x] = [];
            for(var y=0;y<this.viewHeight;y++){
                if(Math.random() < 0.0005){
                    let size = (Math.random() * 2);
                    this.stars[x][y] = size;
                } else this.stars[x][y] = 0;
            }
        }
    }

    zoomView(dir, mouseX, mouseY){
        var rect = this.viewCanvas.getBoundingClientRect();
        var x = mouseX - rect.left;
        var y = mouseY - rect.top;
        // this.cameraX = Math.round(x/2) - this.viewWidth;
        // this.cameraY = Math.round(y/2) - this.viewHeight;
        // this.scaleFactor = this.scaleFactor + (Math.sign(dir) * 0.5);
        // this.scaleFactor = (Math.round(this.scaleFactor * 10))/10;
        // if(this.scaleFactor < 0.3) this.scaleFactor = 0.3;
        // if(this.scaleFactor > 3) this.scaleFactor = 3;
        // this.cameraX = this.viewWidth / 2;
        // this.cameraY = this.viewHeight / 2;
        if(this.DEBUG && this.DEBUG.render) console.log("zoom: ",
            this.scaleFactor, this.cameraX, this.cameraY);
        // this.drawBackground();
    }

    panView(x,y){
        let panSpeed = 100;
        if(this.DEBUG && this.DEBUG.render) console.log("panView: ",x,y,panSpeed);
        // let cameraCenter = this.getCameraCenter();
        let moveToX = this.cameraX + (x * panSpeed);
        let moveToY = this.cameraY + (y * panSpeed);
        let marginW = Math.floor((this.viewWidth) + gameStateManager.margin);
        let marginH = Math.floor((this.viewHeight) + gameStateManager.margin);
        let widthUpperBound = this.worldPixelWidth - marginW;
        let heightUpperBound = this.worldPixelHeight - marginH;
        if(moveToX < gameStateManager.margin) moveToX = gameStateManager.margin;
        if(moveToX > widthUpperBound) moveToX = widthUpperBound;
        if(moveToY < gameStateManager.margin) moveToY = gameStateManager.margin;
        if(moveToY > heightUpperBound) moveToY = heightUpperBound;
        this.setCamera(moveToX, moveToY);
        if(this.DEBUG && this.DEBUG.render) console.log("panView:",
            this.cameraX, this.cameraY, "scale:", this.scaleFactor);
        // this.drawBackground();
    }

    //Sets camera center at position in gameWorld
    setCameraCenter(x, y){
      if(this.DEBUG && this.DEBUG.render) console.log("set Camera BEFORE", this.cameraX, this.cameraY);
      if(this.DEBUG && this.DEBUG.render) console.log("setCamera:", x, y);
      let centerX = Math.floor(x - (this.viewWidth / 2));
      let centerY = Math.floor(y - (this.viewHeight / 2));
      this.cameraX = centerX;
      this.cameraY = centerY;
      if(this.DEBUG && this.DEBUG.render) console.log("set Camera AFTER", this.cameraX, this.cameraY);
    }

    setCamera(x,y){
        this.cameraX = x;
        this.cameraY = y;
    }

    getCameraCenter(){
        let centerX = Math.floor(this.cameraX - (this.viewWidth / 2));
        let centerY = Math.floor(this.cameraY - (this.viewHeight / 2));
        return {x: centerX, y: centerY};
    }

    transWorldPosToScreenPos(x,y){
        return {
            x: x - this.cameraX,
            y: y - this.cameraY
        }
    }

    getMousePos(evt) {
        var rect = this.viewCanvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }

    drawBackground(){
        // console.log("drawing Background");
        //clear the game canvas
        // this.backgroundRender.save();
        // this.backgroundRender.setTransform(1, 0, 0, 1, 0, 0);
        // this.backgroundRender.clearRect(0, 0, this.viewWidth,this.viewHeight);
        // this.backgroundRender.beginPath();
        // this.backgroundRender.restore();

        //draw background first
        this.backgroundRender.save();
        this.backgroundRender.fillStyle = "black";
        this.backgroundRender.fillRect(0,0,this.viewWidth,this.viewHeight);
        this.backgroundRender.restore();

        // for(var x=0;x<this.worldWidth;x++){
        //     for(var y=0;y<this.worldHeight;y++){
        for(var x=0;x<this.viewWidth;x++){
            for(var y=0;y<this.viewHeight;y++){
                if(this.stars[x][y] > 0){
                    this.backgroundRender.save();
                    // this.backgroundRender.translate(this.cameraX, this.cameraY);
                    // this.backgroundRender.scale(this.scaleFactor, this.scaleFactor);
                    this.backgroundRender.beginPath();
                    this.backgroundRender.arc(x, y, this.stars[x][y], 0, 2*Math.PI, false);
                    this.backgroundRender.closePath();
                    this.backgroundRender.fillStyle = "white";
                    this.backgroundRender.fill();
                    this.backgroundRender.restore();
                }
            }
        } //star draw background
    }

    drawView(objectsToRender){

        //clear the game canvas
        this.viewRender.save();
        this.viewRender.setTransform(1, 0, 0, 1, 0, 0);
        this.viewRender.clearRect(0, 0, this.viewWidth,this.viewHeight);
        this.viewRender.beginPath();
        this.viewRender.restore();

        this.renderedObjects = objectsToRender;

        this.renderedObjects.forEach((object) => {
          let transPos = {};
            switch (object.type){
                case "circle":
                    // console.log("Drawing:",object);
                    this.viewRender.beginPath();
                    this.viewRender.fillStyle = object.draw.color;
                    this.viewRender.lineWidth = object.draw.strokeSize;
                    transPos = this.transWorldPosToScreenPos(object.x,object.y);
                    this.viewRender.arc(transPos.x, transPos.y, object.draw.radius,
                                        object.draw.start, object.draw.end);
                    this.viewRender.fill();
                    break;
                case "rect":
                    // console.log("Drawing:",object);
                    this.viewRender.beginPath();
                    this.viewRender.fillStyle = object.draw.color;
                    this.viewRender.strokeSize = object.draw.strokeSize;
                    transPos = this.transWorldPosToScreenPos(object.x,object.y);
                    this.viewRender.arc(transPos.x, transPos.y, object.draw.radius,
                                        object.draw.start, object.draw.end);
                    this.viewRender.fill();
                    break;

                default:
                    console.log("Dont know how to draw object", object.type);
            }

        });

        // this.viewRender.clearRect(0, 0, this.viewWidth, this.viewHeight);
        // this.viewRender.save();
        // this.viewRender.translate(-this.cameraX, -this.cameraY);
        // this.viewRender.scale(this.scaleFactor, this.scaleFactor);
        //world edge
        // this.viewRender.strokeStyle = "red";
        // this.viewRender.strokeSize = "2";
        // let size = this.worldPixelWidth - (gameStateManager.margin*2);
        // this.viewRender.rect(100 ,100, size, size);
        // this.viewRender.stroke();

        // this.viewRender.beginPath();
        // this.viewRender.fillStyle = "white";
        // this.viewRender.fillRect(-500 ,-500, gameStateManager.tilesPixelSize, gameStateManager.tilesPixelSize);
        // this.viewRender.fillStyle = "green";
        // this.viewRender.fillRect(100 ,100, gameStateManager.tilesPixelSize, gameStateManager.tilesPixelSize);
        // this.viewRender.fillStyle = "red";
        // this.viewRender.fillRect(1000 , 1000, gameStateManager.tilesPixelSize, gameStateManager.tilesPixelSize);
        // this.viewRender.fillStyle = "blue";
        // let recX = Math.floor((this.worldPixelWidth / 2) - (gameStateManager.tilesPixelSize/2));
        // let recY = Math.floor((this.worldPixelHeight / 2) - (gameStateManager.tilesPixelSize/2));
        // this.viewRender.fillRect(recX , recY, gameStateManager.tilesPixelSize, gameStateManager.tilesPixelSize);
        // this.viewRender.fillStyle = "yellow";
        // this.viewRender.fillRect(this.worldPixelWidth - (gameStateManager.margin*2) ,
        //         this.worldPixelHeight - (gameStateManager.margin*2), gameStateManager.tilesPixelSize, gameStateManager.tilesPixelSize);
        // this.viewRender.closePath();
        // this.viewRender.restore();
    }

    drawGui(info){
        //clear the game canvas
        this.hudRender.save();
        // this.hudRender.setTransform(1, 0, 0, 1, 0, 0);
        this.hudRender.clearRect(0, 0, this.viewWidth,this.viewHeight);
        this.hudRender.beginPath();
        this.hudRender.restore();

        //center of view
        let centerX = this.viewWidth / 2;
        let centerY = this.viewHeight / 2;
        let size = 20;
        this.hudRender.strokeSize = 2;
        this.hudRender.strokeStyle = "pink";
        this.hudRender.beginPath();
        this.hudRender.moveTo(centerX + size, centerY);
        this.hudRender.lineTo(centerX - size, centerY);
        this.hudRender.stroke();
        this.hudRender.beginPath();
        this.hudRender.moveTo(centerX, centerY + size);
        this.hudRender.lineTo(centerX, centerY - size);
        this.hudRender.stroke();

        //upperLeft Debug Stats
        this.hudRender.save();
        let spaceing = 20;
        let currentYFont = 20;
        this.hudRender.font = "20px Arial";
        this.hudRender.fillStyle = "orange";
        this.hudRender.fillText("FPS:"+info.avgFPS, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("DeltaTime:"+info.deltaTime, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("Ping: ping", 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("MouseView:"+this.debug.mouseX+","+this.debug.mouseY, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("MouseWorld:"+(this.debug.mouseX + this.cameraX)+","+
                                              (this.debug.mouseY + this.cameraY), 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("ViewSize:"+this.viewWidth+","+this.viewHeight, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("Camera:"+this.cameraX+","+this.cameraY, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("RenderedObjects:"+this.renderedObjects.length, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.restore();
    }

}//RenderCanvas class
