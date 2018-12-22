class RenderCanvas {
    constructor(){
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

        //World Stuff
        this.worldWidth = 3000;
        this.worldHeight = 3000;
        this.margin = 100;

        //background stars
        this.stars = [];
        for(var x=0;x<this.worldWidth;x++){
            this.stars[x] = [];
            for(var y=0;y<this.worldHeight;y++){
                if(Math.random() < 0.0005){
                    let size = (Math.random() * 2);
                    this.stars[x][y] = size;
                } else this.stars[x][y] = 0;
            }
        }
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
       let middleWorldX = Math.floor(this.worldWidth / 2);
       let middleWorldY = Math.floor(this.worldHeight / 2);
       this.setCamera(middleWorldX, middleWorldY);
       console.log("Camera: ", this.cameraX, this.cameraY);
       this.drawBackground();
    } //end initCanvas

    zoomView(dir, mouseX, mouseY){
        var rect = this.viewCanvas.getBoundingClientRect();
        var x = mouseX - rect.left;
        var y = mouseY - rect.top;
        // console.log("mouse: %s,%s",x,y);
        // this.cameraX = Math.round(x/2) - this.viewWidth;
        // this.cameraY = Math.round(y/2) - this.viewHeight;
        this.scaleFactor = this.scaleFactor + (Math.sign(dir) * 0.5);
        this.scaleFactor = (Math.round(this.scaleFactor * 10))/10;
        if(this.scaleFactor < 0.3) this.scaleFactor = 0.3;
        if(this.scaleFactor > 3) this.scaleFactor = 3;
        // this.cameraX = this.viewWidth / 2;
        // this.cameraY = this.viewHeight / 2;
        console.log("zoom: ", this.scaleFactor, this.cameraX, this.cameraY);
        // this.drawBackground();
    }

    panView(x,y,panSpeed){
        // console.log("panView: ",x,y,panSpeed);
        let moveToX = this.cameraX + (x * panSpeed);
        let moveToY = this.cameraY + (y * panSpeed);
        this.setCamera(moveToX, moveToY);
        console.log("panView:",this.cameraX, this.cameraY, "scale:", this.scaleFactor);
        // this.drawBackground();
    }

    //Sets camera center at position in gameWorld
    setCamera(x, y){
      console.log("setCamera:", x, y);
      let centerX = Math.floor(x - (this.viewWidth / 2));
      let centerY = Math.floor(y - (this.viewHeight / 2));
      let marginW = Math.floor((this.viewWidth / 2) + this.margin);
      let marginH = Math.floor((this.viewHeight / 2) + this.margin);
      let widthUpperBound = this.worldWidth - marginW;
      let heightUpperBound = this.worldHeight - marginH;
      if(centerX < marginW) centerX = marginW;
      if(centerX > widthUpperBound) centerX = widthUpperBound;
      if(centerY < marginH) centerY = marginH;
      if(centerY > heightUpperBound) centerY = heightUpperBound;
      this.cameraX = centerX;
      this.cameraY = centerY;
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

    drawView(){

        //clear the game canvas
        this.viewRender.save();
        this.viewRender.setTransform(1, 0, 0, 1, 0, 0);
        this.viewRender.clearRect(0, 0, this.viewWidth,this.viewHeight);
        this.viewRender.beginPath();
        this.viewRender.restore();

        var recSize = 100;

        // this.viewRender.clearRect(0, 0, this.viewWidth, this.viewHeight);
        this.viewRender.save();
        this.viewRender.translate(-this.cameraX, -this.cameraY);
        this.viewRender.scale(this.scaleFactor, this.scaleFactor);
        //world edge
        this.viewRender.strokeStyle = "red";
        this.viewRender.strokeSize = "2";
        let size = this.worldWidth - 200;
        this.viewRender.rect(100 ,100, size, size);
        this.viewRender.stroke();

        this.viewRender.beginPath();
        this.viewRender.fillStyle = "white";
        this.viewRender.fillRect(-500 ,-500, recSize, recSize);
        this.viewRender.fillStyle = "green";
        this.viewRender.fillRect(100 ,100, recSize, recSize);
        this.viewRender.fillStyle = "red";
        this.viewRender.fillRect(1000 , 1000, recSize, recSize);
        this.viewRender.fillStyle = "blue";
        let recX = Math.floor((this.worldWidth / 2) - (recSize/2));
        let recY = Math.floor((this.worldHeight / 2) - (recSize/2));
        this.viewRender.fillRect(recX , recY, recSize, recSize);
        this.viewRender.fillStyle = "yellow";
        this.viewRender.fillRect(this.worldWidth - (this.margin*2) , this.worldHeight - (this.margin*2), recSize, recSize);
        this.viewRender.closePath();
        this.viewRender.restore();
    }

    drawGui(){
        //clear the game canvas
        this.hudRender.save();
        this.hudRender.setTransform(1, 0, 0, 1, 0, 0);
        this.hudRender.clearRect(0, 0, this.viewWidth,this.viewHeight);
        this.hudRender.beginPath();
        this.hudRender.restore();

        this.hudRender.save();
        this.hudRender.font = "20px Arial";
        this.hudRender.fillStyle = "orange";
        this.hudRender.fillText("FPS:"+avgFPS, 0, 20);
        this.hudRender.fillText("DeltaTime:"+deltaTime, 0, 40);
        this.hudRender.fillText("Ping: ping", 0, 60);
        this.hudRender.restore();
    }

}//RenderCanvas class
