//Process user input
class Input {
    constructor(){
        window.addEventListener('wheel', this.scrollEvent);
        window.addEventListener('keydown', this.keyPressDownEvent.bind(this));
        window.addEventListener('keyup', this.keyPressUpEvent.bind(this));

        //keypresses
        this.controls = {
            w: (speed)=>{renderCanvas.panView(0,1,speed);},
            a: (speed)=>{renderCanvas.panView(1,0,speed);},
            s: (speed)=>{renderCanvas.panView(0,-1,speed);},
            d: (speed)=>{renderCanvas.panView(-1,0,speed);}
        };
        this.cameraSpeed = 1;

        console.log("now processing user input");
    }//constructor

    scrollEvent(e){
        // console.log("scroll event:", e);
        renderCanvas.zoomView(e.deltaY, e.clientX, e.clientY);
    }

    keyPressDownEvent(e){
        // console.log("keypress Down: ", e.key);
        // console.log("keypress Down event: ", e);
        if(typeof this.controls[e.key] === 'undefined'){
            console.log("Key not in use");
            return;
        }
        if(e.repeat) this.cameraSpeed = this.cameraSpeed + 2;
        else this.cameraSpeed = 1;
        this.controls[e.key](this.cameraSpeed);
    }

    keyPressUpEvent(e){
        // console.log("keypress Up: ", e.key);
        // console.log("keyPressUpEvent: ", e);
    }

}//input class
