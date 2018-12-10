class RenderCanvas {
    constructor(){
        window.addEventListener('resize', this.initCanvas, false);
        this.canvas = null;
        this.render = null;
        this.width = 0;
        this.height = 0;
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
    }

    initCanvas() {
       console.log("initCanvas");
       this.canvas = document.getElementById("gameCanvas");
       this.render = this.canvas.getContext("2d");
       this.width = window.innerWidth;
       this.height = window.innerHeight;
       // this.canvasOffset = this.canvas.offset();
       // this.offsetX = this.canvasOffset.left;
       // this.offsetY = this.canvasOffset.top;
       // this.scrollX = this.canvas.scrollLeft();
       // this.scrollY = this.canvas.scrollTop();
       this.canvas.width = this.width;
       this.canvas.height = this.height;
    } //end initCanvas

    draw(){
        this.render.clearRect(0, 0, cw, ch);
        this.render.save();
        this.render.translate(panX, panY);
        this.render.scale(scaleFactor, scaleFactor);
        this.render.beginPath();
        this.render.rect(circleX - radius, circleY - radius, radius * 2, radius * 2);
        this.render.closePath();
        this.render.fillStyle = "blue";
        this.render.fill();
        this.render.restore();
    }
}//RenderCanvas class
