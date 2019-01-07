class GameStateManager{
    constructor(){

        this.objects = [];

        //World Stuff
        this.numOfTilesX = 1024;
        this.numOfTilesY = 1024;
        this.tilesPixelSize = 32;
        this.worldPixelWidth = this.numOfTilesX * this.tilesPixelSize; //32,768
        this.worldPixelHeight = this.numOfTilesY * this.tilesPixelSize;
        this.margin = this.tilesPixelSize * 2;

        console.log("GameStateManager running");
    }

    initalize(){

    }

    initalizeDebugObjects(){
        console.log("finished creating Debug game objects");
        //world edge

        this.addObject("Outer Bounds", this.margin, this.margin, "rect", {
            color: "red",
            strokeSize: 2,
            width: this.worldPixelWidth - (this.margin * 2),
            height: this.worldPixelHeight - (this.margin * 2)
        });

        this.addObject("out of bounds", -500, -500, "circle", {
            color: "white",
            radius: (this.tilesPixelSize/2),
            start: 0,
            end: Math.PI * 2,
            strokeSize: 2
        });

        this.addObject("first", this.margin, this.margin, "circle", {
            color: "green",
            radius: (this.tilesPixelSize/2),
            start: 0,
            end: Math.PI * 2,
            strokeSize: 2
        });

        this.addObject("second", 1000, 1000, "circle", {
            color: "red",
            radius: (this.tilesPixelSize/2),
            start: 0,
            end: Math.PI * 2,
            strokeSize: 2
        });

        let centerX = Math.floor((this.worldPixelWidth / 2) - (this.tilesPixelSize/2));
        let centerY = Math.floor((this.worldPixelHeight / 2) - (this.tilesPixelSize/2));
        this.addObject("middle", centerX, centerY, "circle", {
            color: "blue",
            radius: (this.tilesPixelSize/2),
            start: 0,
            end: Math.PI * 2,
            strokeSize: 2
        });

        this.addObject("end", this.worldPixelWidth - (this.margin*2),
                              this.worldPixelHeight - (this.margin*2), "circle", {
            color: "yellow",
            radius: (this.tilesPixelSize/2),
            start: 0,
            end: Math.PI * 2,
            strokeSize: 2
        });

    }

    addObject(name, x, y, type, draw){
        this.objects.push({
            name: name,
            x: x,
            y: y,
            type: type,
            draw: draw
        });
    }

    getObjectsInRange(startX, endX, startY, endY){
        //add some buffer for partial tiles
        startX = startX - this.tilesPixelSize;
        endX = endX + this.tilesPixelSize;
        startY = startY - this.tilesPixelSize;
        endY = endY - this.tilesPixelSize;
        let tempReturn = [];
        this.objects.forEach((object)=>{
            if(startX < object.x && object.x < endX &&
               startY < object.y && object.y < endY){
                   tempReturn.push(object);
               }
        });
        return tempReturn;
    }
}//end class GameStateManager
