class RenderCanvas {
    constructor(){
        window.addEventListener('resize', this.initCanvas, false);
        this.canvas = null;
        this.render = null;
        this.cWidth = 0;
        this.cHeight = 0;
        this.canvasOffset = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.scrollX = 0;
        this.scrollY = 0;

        //for zoom and panning
        this.scaleFactor = 1.00;
        this.panX = 0;
        this.panY = 0;
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
       this.canvas = document.getElementById("game-layer");
       this.render = this.canvas.getContext("2d");
       this.cWidth = window.innerWidth;
       this.cHeight = window.innerHeight;
       // this.canvasOffset = this.canvas.offset();
       // this.offsetX = this.canvasOffset.left;
       // this.offsetY = this.canvasOffset.top;
       // this.scrollX = this.canvas.scrollLeft();
       // this.scrollY = this.canvas.scrollTop();
       this.canvas.width = this.cWidth;
       this.canvas.height = this.cHeight;

       this.canvasBackground = document.getElementById("background-layer");
       this.renderBackground = this.canvas.getContext("2d", { alpha: false });
       //draw background first
       this.renderBackground.fillStyle = "black";
       this.renderBackground.fillRect(0, 0,
           this.canvasBackground.width,
           this.canvasBackground.height);
       // for(var x=0;x<this.worldWidth;x++){
       //     for(var y=0;y<this.worldHeight;y++){
       //         if(this.stars[x][y] > 0){
       //             this.renderBackground.save();
       //             this.renderBackground.translate(this.panX, this.panY);
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
    } //end initCanvas

    zoomView(dir, mouseX, mouseY){
        var rect = this.canvas.getBoundingClientRect();
        var x = mouseX - rect.left;
        var y = mouseY - rect.top;
        // console.log("mouse: %s,%s",x,y);
        // this.panX = Math.round(x/2) - this.cWidth;
        // this.panY = Math.round(y/2) - this.cHeight;
        this.panX = this.cWidth / 2;
        this.panY = this.cHeight / 2;
        this.scaleFactor = this.scaleFactor + (Math.sign(dir) * 0.5);
        this.scaleFactor = (Math.round(this.scaleFactor * 10))/10;
        if(this.scaleFactor < 0.3) this.scaleFactor = 0.3;
        if(this.scaleFactor > 3) this.scaleFactor = 3;
        console.log("zoom: ", this.scaleFactor, this.panX, this.panY);
    }

    panView(x,y,panSpeed){
        console.log("panView: ",x,y,panSpeed);
        this.panX = this.panX + (x * panSpeed);
        this.panY = this.panY + (y * panSpeed);
    }

    getMousePos(evt) {
        var rect = this.canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }


    draw(fps){
        //clear the game canvas
        this.render.save();
        this.render.setTransform(1, 0, 0, 1, 0, 0);
        this.render.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.render.restore();

        this.debugText(fps);


        var recX = this.worldWidth / 2;
        var recY = this.worldHeight / 2;
        var size = 30;

        // this.render.clearRect(0, 0, this.cWidth, this.cHeight);
        this.render.save();
        this.render.translate(this.panX, this.panY);
        this.render.scale(this.scaleFactor, this.scaleFactor);
        this.render.beginPath();
        this.render.rect(recX - size, recY - size, size * 2, size * 2);
        this.render.closePath();
        this.render.fillStyle = "blue";
        this.render.fill();
        this.render.restore();
    }

    debugText(fps){
        this.render.save();
        this.render.font = "20px Arial";
        this.render.fillStyle = "orange";
        this.render.fillText("FPS:"+fps, 0, 20);
        this.render.restore();
    }

}//RenderCanvas class
