//Process user input
export default class Input {
    constructor(controls){
        window.addEventListener('wheel', this.scrollEvent);
        window.addEventListener('keydown', this.keyPressDownEvent.bind(this));
        window.addEventListener('keyup', this.keyPressUpEvent.bind(this));
        window.addEventListener('mousemove', this.mouseMoveEvent.bind(this));
        window.addEventListener('mousedown', this.mouseDownEvent.bind(this));
        window.addEventListener('mouseup', this.mouseUpEvent.bind(this));

        //disabled right-click menu
        window.addEventListener('contextmenu', event => event.preventDefault());

        //mouse
        this.leftClick = 0;
        this.middleClick = 1;
        this.rightClick = 2;
        this.mouse = {
              key: "mouse",
              leftDown: false,
              middleDown: false,
              rightDown: false,
              x: 0,
              y: 0
        }

        this.cameraSpeed = 100;

        this.buttonsInUse = [];
        this.controls = {};

        this.userActions = [];

        console.log("now processing user input");
    }//constructor

    update(){
      //increase count of held keys
      this.buttonsInUse.forEach((key)=>{
        let controlKey = this.controls[key];
        if(controlKey.down) controlKey.heldCount++;
      });
    }

    /*
    Possible actions:
        panCamera    x,y  only affects client
    */
    addKeyMapping({
        key,
        action,
        input
    }){
        // console.log("addKeyMapping:", key, action, input);
        this.controls[key] = {
            key: key,
            down: false,
            heldCount: 0,
            action: action,
            input: input
        }
        this.buttonsInUse.push(key);
    }

    addUserAction({
      action,
      input
    }){
      let userAction = {
        action: action,
        input: input,
        time: new Date().getTime
      }
      this.userActions.push(userAction);
    }

    getMouse(){
      return this.mouse;
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
        let input = keyPressed.input;
        input['heldCount'] = keyPressed.heldCount;
        this.addUserAction({action: keyPressed.action, input: keyPressed.input});
        this.userActions.push(keyPressed);
        keyPressed.down = true;
        keyPressed.heldCount++;
    }

    keyPressUpEvent(e){
        console.log("keypress Up: ", e.key);
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
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        // console.log(this.mouse);
        // this.addUserAction({action: "mouseMove", input: {x: mouse.x, y: mouse.y}});
    }

    mouseDownEvent(e){
      if(e.button == this.leftClick) this.mouse.leftDown = true;
      else if(e.button == this.middleClick) this.mouse.middleDown = true;
      else if(e.button == this.rightClick) this.mouse.rightDown = true;
      else console.log("Mouse button", e.button, "not supported");
      // console.log(this.mouse);
    }

    mouseUpEvent(e){
      if(e.button == this.leftClick) this.mouse.leftDown = false;
      else if(e.button == this.middleClick) this.mouse.middleDown = false;
      else if(e.button == this.rightClick) this.mouse.rightDown = false;
      else console.log("Mouse button", e.button, "not supported");
      // console.log(this.mouse);
    }


}//input class
