class RenderCanvas {
    constructor(){
        window.addEventListener('resize', this.initCanvas, false);
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
        this.initCanvas();

        //background stars
        this.worldWidth = 3000;
        this.worldHeight = 3000;
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
    }

    initCanvas() {
       console.log("initCanvas");
       //Background layer 0
       this.backgroundCanvas = document.getElementById("background-layer");
       this.backgroundRender = this.viewCanvas.getContext("2d", { alpha: false });
       this.backgroundCanvas.width = this.viewWidth;
       this.backgroundCanvas.height = this.viewHeight;
       //Game View middle layer 1
       this.viewCanvas = document.getElementById("view-layer");
       this.viewRender = this.viewCanvas.getContext("2d");
       this.viewWidth = window.innerWidth;
       this.viewHeight = window.innerHeight;
       this.viewCanvas.width = this.viewWidth;
       this.viewCanvas.height = this.viewHeight;
       //HUD overloay top layer 2
       this.hudCanvas = document.getElementById("hud-layer");
       this.hudRender = this.viewCanvas.getContext("2d");
       this.hudCanvas.width = this.viewWidth;
       this.hudCanvas.height = this.viewHeight;
       //initalize camera view to center
       this.cameraX = (this.worldWidth / 2) - (this.viewWidth / 2);
       this.cameraY = (this.worldHeight / 2) - (this.viewHeight / 2);
    } //end initCanvas

    zoomView(dir, mouseX, mouseY){
        var rect = this.viewCanvas.getBoundingClientRect();
        var x = mouseX - rect.left;
        var y = mouseY - rect.top;
        // console.log("mouse: %s,%s",x,y);
        // this.cameraX = Math.round(x/2) - this.viewWidth;
        // this.cameraY = Math.round(y/2) - this.viewHeight;
        this.cameraX = this.viewWidth / 2;
        this.cameraY = this.viewHeight / 2;
        this.scaleFactor = this.scaleFactor + (Math.sign(dir) * 0.5);
        this.scaleFactor = (Math.round(this.scaleFactor * 10))/10;
        if(this.scaleFactor < 0.3) this.scaleFactor = 0.3;
        if(this.scaleFactor > 3) this.scaleFactor = 3;
        console.log("zoom: ", this.scaleFactor, this.cameraX, this.cameraY);
    }

    panView(x,y,panSpeed){
        console.log("panView: ",x,y,panSpeed);
        this.cameraX = this.cameraX + (x * panSpeed);
        this.cameraY = this.cameraY + (y * panSpeed);
    }

    getMousePos(evt) {
        var rect = this.viewCanvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }

    drawBackground(){
        //draw background first
        this.backgroundRender.fillStyle = "black";
        this.backgroundRender.fillRect(0,0,this.viewWidth,this.viewHeight);

        // for(var x=0;x<this.worldWidth;x++){
        //     for(var y=0;y<this.worldHeight;y++){
        //         if(this.stars[x][y] > 0){
        //             this.renderBackground.save();
        //             this.renderBackground.translate(this.cameraX, this.cameraY);
        //             this.renderBackground.scale(this.scaleFactor, this.scaleFactor);
        //             this.renderBackground.beginPath();
        //             this.renderBackground.arc(x, y, this.stars[x][y], 0, 2*Math.PI, false);
        //             this.renderBackground.closePath();
        //             this.renderBackground.fillStyle = "white";
        //             this.renderBackground.fill();
        //             this.renderBackground.restore();
        //         }
        //     }
        // } //star draw background
    }

    drawView(){

        //clear the game canvas
        // this.viewRender.save();
        // this.viewRender.setTransform(1, 0, 0, 1, 0, 0);
        // this.viewRender.clearRect(0, 0, 100, 50);
        // this.viewRender.beginPath();
        // this.viewRender.restore();

        var recSize = 100;
        var recX = Math.floor((this.worldWidth / 2) - (recSize/2));
        var recY = Math.floor((this.worldHeight / 2) - (recSize/2));

        // this.viewRender.clearRect(0, 0, this.viewWidth, this.viewHeight);
        this.viewRender.save();
        this.viewRender.translate(this.cameraX, this.cameraY);
        this.viewRender.scale(this.scaleFactor, this.scaleFactor);
        this.viewRender.beginPath();
        this.viewRender.rect(recX , recY, recSize, recSize);
        this.viewRender.closePath();
        this.viewRender.fillStyle = "blue";
        this.viewRender.fill();
        this.viewRender.restore();
    }

    drawGui(){
        this.hudRender.save();
        this.hudRender.font = "20px Arial";
        this.hudRender.fillStyle = "orange";
        this.hudRender.fillText("FPS:"+avgFPS, 0, 20);
        this.hudRender.fillText("DeltaTime:"+deltaTime, 0, 40);
        this.hudRender.restore();
    }

}//RenderCanvas class
