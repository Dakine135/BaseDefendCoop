//Process user input
export default class Input {
    constructor(controls){
        window.addEventListener('wheel', this.scrollEvent);
        window.addEventListener('keydown', this.keyPressDownEvent.bind(this));
        window.addEventListener('keyup', this.keyPressUpEvent.bind(this));
        window.addEventListener('mousemove', this.mouseMoveEvent.bind(this));

        //mouse
        this.mouseX = null;
        this.mouseY = null;

        this.cameraSpeed = 100;

        this.controls = {};

        this.userActions = [];

        console.log("now processing user input");
    }//constructor

    addKeyMapping({
        key,
        action,
        input
    }){
        // console.log("addKeyMapping:", key, action, input);
        this.controls[key] = {
            down: false,
            heldCount: 0,
            action: action,
            input: input
        }
    }

    panCamera({
        x, y
    }){
        console.log("panCamera", x, y);
    }


    //return userActions and clear
    getInput(){
        let tempReturn = this.userActions;
        this.userActions = [];
        return tempReturn;
        //test
    }

    scrollEvent(e){
        // console.log("scroll event:", e);
        // renderCanvas.zoomView(e.deltaY, e.clientX, e.clientY);
    }

    keyPressDownEvent(e){
        // console.log("keypress Down: ", e.key);
        // console.log("keypress Down event: ", e);
        if(typeof this.controls[e.key] === 'undefined'){
            console.log("Key not in use");
            return;
        }
        let keyPressed = this.controls[e.key];
        // console.log(keyPressed);
        //this[keyPressed.action](keyPressed.input);
        this.userActions.push(keyPressed);
        keyPressed.down = true;
        keyPressed.heldCount++;
    }

    keyPressUpEvent(e){
        // console.log("keypress Up: ", e.key);
        // console.log("keyPressUpEvent: ", e);
        if(typeof this.controls[e.key] === 'undefined'){
            console.log("Key not in use");
            return;
        }
        let keyPressed = this.controls[e.key];
        // this[keyPressed.action](keyPressed.input);
        keyPressed.down = false;
        keyPressed.heldCount = 0;
    }

    mouseMoveEvent(e){
        // console.log(e.offsetX, e.offsetY);
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
        // renderCanvas.debug.mouseX = this.mouseX;
        // renderCanvas.debug.mouseY = this.mouseY;
    }

}//input class
