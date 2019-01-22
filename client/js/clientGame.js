/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./clientGameSrc/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./clientEngineSrc/gameStateManager.js":
/*!*********************************************!*\
  !*** ./clientEngineSrc/gameStateManager.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameStateManager; });
class GameStateManager{
    constructor(config){

        this.objects = [];

        //World Stuff
        this.tilesPixelSize = config.tilesPixelSize;
        this.worldPixelWidth = config.worldPixelWidth;
        this.worldPixelHeight = config.worldPixelWidth;
        this.margin = config.worldPixelWidth;

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

        let centerX = Math.floor((this.worldPixelWidth / 2));
        let centerY = Math.floor((this.worldPixelHeight / 2));
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


/***/ }),

/***/ "./clientEngineSrc/input.js":
/*!**********************************!*\
  !*** ./clientEngineSrc/input.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Input; });
//Process user input
class Input {
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


/***/ }),

/***/ "./clientEngineSrc/main.js":
/*!*********************************!*\
  !*** ./clientEngineSrc/main.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClientGameEngine; });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ "./clientEngineSrc/render.js");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.js */ "./clientEngineSrc/input.js");
/* harmony import */ var _gameStateManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameStateManager.js */ "./clientEngineSrc/gameStateManager.js");




console.log("Bundle client Engine Loaded");
class ClientGameEngine {
    constructor(config){

        this.config = config;

        this.gameStateManager = new _gameStateManager_js__WEBPACK_IMPORTED_MODULE_2__["default"](config);
        if(this.config.DEBUG && this.config.DEBUG.GSM) this.gameStateManager.initalizeDebugObjects();
        this.render = new _render_js__WEBPACK_IMPORTED_MODULE_0__["default"](config);
        this.input = new _input_js__WEBPACK_IMPORTED_MODULE_1__["default"](config);

        // let testNode = new EnergyNode.init("string in browser");
        // console.log(testNode.toString());

        //Loop Stats
        this.avgFPS = 0;
        this.frames = 0;
        this.everySecondCountDown = 1000;
        this.lastFrameTime = new Date().getTime();
        this.deltaTime = 0;
        this.timestep = 20; //ms = milliseconds

        //UserInput
        this.userInput = [];

        //Start Main Loop
        console.log("Finished loading");
        this.mainLoop();
    }

    addKeyMapping(keys){
        this.input.addKeyMapping(keys);
    }

    mainLoop(){
        // console.log("-----------Mainloop----------");
        //process real-time stats
        this.processDeltaTime();

        //get and process client Input
        this.processUserActions();

        //update debugInfo
        let mouseInfo = this.input.getMouse();
        let debugInfoInput = {
          mouseX: mouseInfo.x,
          mouseY: mouseInfo.y,
          avgFPS: this.avgFPS,
          deltaTime: this.deltaTime
        }
        this.render.updateDebugInfo(debugInfoInput);

        //process latest server update if any

        //step and extrapolate between updates/frames
            //this should be done in fixed time steps with a
            //calulation on time lost between updates (lag)
            //then looped to allow multiple between frame renders if neccissary




        //get objects to Render in View
        let objectsToRender = this.gameStateManager.getObjectsInRange(
            this.render.cameraX, this.render.cameraX + this.render.viewWidth,
            this.render.cameraY, this.render.cameraY + this.render.viewHeight);
        //render frame
        this.render.drawView(objectsToRender);


        this.render.drawGui();
        window.requestAnimationFrame(this.mainLoop.bind(this));
    }//mainLoop

    processDeltaTime(){
      let now = new Date().getTime();
      this.deltaTime = now - this.lastFrameTime;
      this.lastFrameTime = now;
      this.everySecondCountDown = this.everySecondCountDown - this.deltaTime;
      this.frames++;
      if(this.everySecondCountDown < 0){
          this.avgFPS = Math.round((this.frames * 0.8) + (this.avgFPS * 0.2));
          this.frames = 0;
          this.everySecondCountDown = 1000;
          // renderCanvas.drawBackground();
      }
    }//processDeltaTime

    processUserActions(){
      this.userInput = this.input.getInput();
      this.userInput.forEach((userAction)=>{
              // console.log(userAction);
              switch(userAction.action){
                case "panCamera":
                  this.render.panView(userAction.input);
                  break;
                default:
                  console.log("unknown user action");
              }
              this.render
      });
      this.input.update();
    }
}//Client Game Engine class


/***/ }),

/***/ "./clientEngineSrc/render.js":
/*!***********************************!*\
  !*** ./clientEngineSrc/render.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RenderCanvas; });
class RenderCanvas {
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
        this.cameraSpeedMax = 20;

        //background stars
        this.stars = [];

        //debug
        this.debugInfo = {
            mouseX: 0,
            mouseY: 0,
            avgFPS: 0,
            deltaTime:0
        }

        this.config = config;

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
       let middleWorldX = Math.floor(this.config.worldPixelWidth / 2);
       let middleWorldY = Math.floor(this.config.worldPixelHeight / 2);
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
        if(this.config.DEBUG && this.config.DEBUG.render) console.log("zoom: ",
            this.scaleFactor, this.cameraX, this.cameraY);
        // this.drawBackground();
    }

    panView({x,y,heldCount}){
        let panSpeed = Math.floor((heldCount/10));
        if(panSpeed < 2) panSpeed = 2;
        else if(panSpeed > this.cameraSpeedMax) panSpeed = this.cameraSpeedMax;
        console.log(panSpeed, heldCount);
        if(this.config.DEBUG && this.config.DEBUG.render) console.log("panView: ",x,y,panSpeed);
        let moveToX = Math.floor(this.cameraX + (x * panSpeed));
        let moveToY = Math.floor(this.cameraY + (y * panSpeed));
        let marginW = Math.floor((this.viewWidth) + this.config.margin);
        let marginH = Math.floor((this.viewHeight) + this.config.margin);
        let widthUpperBound = this.config.worldPixelWidth - marginW;
        let heightUpperBound = this.config.worldPixelHeight - marginH;
        if(moveToX < this.config.margin) moveToX = this.config.margin;
        if(moveToX > widthUpperBound) moveToX = widthUpperBound;
        if(moveToY < this.config.margin) moveToY = this.config.margin;
        if(moveToY > heightUpperBound) moveToY = heightUpperBound;
        this.setCamera(moveToX, moveToY);
        if(this.config.DEBUG && this.config.DEBUG.render) console.log("panView:",
            this.cameraX, this.cameraY, "scale:", this.scaleFactor);
        // this.drawBackground();
    }

    //Sets camera center at position in gameWorld
    setCameraCenter(x, y){
      if(this.config.DEBUG && this.config.DEBUG.render) console.log("set Camera BEFORE", this.cameraX, this.cameraY);
      if(this.config.DEBUG && this.config.DEBUG.render) console.log("setCamera:", x, y);
      let centerX = Math.floor(x - (this.viewWidth / 2));
      let centerY = Math.floor(y - (this.viewHeight / 2));
      this.cameraX = centerX;
      this.cameraY = centerY;
      if(this.config.DEBUG && this.config.DEBUG.render) console.log("set Camera AFTER", this.cameraX, this.cameraY);
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

    updateDebugInfo(input){
      // console.log(input);
      if(input.mouseX) this.debugInfo.mouseX = input.mouseX;
      if(input.mouseY) this.debugInfo.mouseY = input.mouseY;
      if(input.avgFPS) this.debugInfo.avgFPS = input.avgFPS;
      if(input.deltaTime) this.debugInfo.deltaTime = input.deltaTime;
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
        // let size = this.config.worldPixelWidth - (this.config.margin*2);
        // this.viewRender.rect(100 ,100, size, size);
        // this.viewRender.stroke();

        // this.viewRender.beginPath();
        // this.viewRender.fillStyle = "white";
        // this.viewRender.fillRect(-500 ,-500, this.config.tilesPixelSize, this.config.tilesPixelSize);
        // this.viewRender.fillStyle = "green";
        // this.viewRender.fillRect(100 ,100, this.config.tilesPixelSize, this.config.tilesPixelSize);
        // this.viewRender.fillStyle = "red";
        // this.viewRender.fillRect(1000 , 1000, this.config.tilesPixelSize, this.config.tilesPixelSize);
        // this.viewRender.fillStyle = "blue";
        // let recX = Math.floor((this.config.worldPixelWidth / 2) - (this.config.tilesPixelSize/2));
        // let recY = Math.floor((this.config.worldPixelHeight / 2) - (this.config.tilesPixelSize/2));
        // this.viewRender.fillRect(recX , recY, this.config.tilesPixelSize, this.config.tilesPixelSize);
        // this.viewRender.fillStyle = "yellow";
        // this.viewRender.fillRect(this.config.worldPixelWidth - (this.config.margin*2) ,
        //         this.config.worldPixelHeight - (this.config.margin*2), this.config.tilesPixelSize, this.config.tilesPixelSize);
        // this.viewRender.closePath();
        // this.viewRender.restore();
    }

    drawGui(){
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
        this.drawCrosshair(centerX, centerY, size);
        this.drawCrosshair(this.debugInfo.mouseX, this.debugInfo.mouseY, 10);

        //upperLeft Debug Stats
        this.hudRender.save();
        let spaceing = 20;
        let currentYFont = 20;
        this.hudRender.font = "20px Arial";
        this.hudRender.fillStyle = "orange";
        this.hudRender.fillText("FPS:"+this.debugInfo.avgFPS, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("DeltaTime:"+this.debugInfo.deltaTime, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("Ping: ping", 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("MouseView:"+this.debugInfo.mouseX+","+this.debugInfo.mouseY, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("MouseWorld:"+(this.debugInfo.mouseX + this.cameraX)+","+
                                              (this.debugInfo.mouseY + this.cameraY), 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("ViewSize:"+this.viewWidth+","+this.viewHeight, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("Camera:"+this.cameraX+","+this.cameraY, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("RenderedObjects:"+this.renderedObjects.length, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.restore();
    }

    drawCrosshair(x,y,size){
      this.hudRender.strokeSize = 2;
      this.hudRender.strokeStyle = "pink";
      this.hudRender.beginPath();
      this.hudRender.moveTo(x + size, y);
      this.hudRender.lineTo(x - size, y);
      this.hudRender.stroke();
      this.hudRender.beginPath();
      this.hudRender.moveTo(x, y + size);
      this.hudRender.lineTo(x, y - size);
      this.hudRender.stroke();
    }

}//RenderCanvas class


/***/ }),

/***/ "./clientGameSrc/game.js":
/*!*******************************!*\
  !*** ./clientGameSrc/game.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clientEngineSrc_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../clientEngineSrc/main.js */ "./clientEngineSrc/main.js");


let numOfTilesX = 1024;
let numOfTilesY = 1024;
let tilesPixelSize = 32;
let worldPixelWidth = numOfTilesX * tilesPixelSize; //32,768 middle is 16384
let worldPixelHeight = numOfTilesY * tilesPixelSize;
let margin = tilesPixelSize * 2;

let DEBUG = {
    input: true,
    render: false,
    GSM: true,
};

var config = {
    worldPixelWidth: worldPixelWidth,
    worldPixelHeight: worldPixelHeight,
    tilesPixelSize: tilesPixelSize,
    margin: margin,
    DEBUG: DEBUG
}

var Engine = new _clientEngineSrc_main_js__WEBPACK_IMPORTED_MODULE_0__["default"](config);

Engine.addKeyMapping({key: "w", action: "panCamera", input: {x:0, y:-1}});
Engine.addKeyMapping({key: "a", action: "panCamera", input: {x:-1, y:0}});
Engine.addKeyMapping({key: "s", action: "panCamera", input: {x:0, y:1}});
Engine.addKeyMapping({key: "d", action: "panCamera", input: {x:1, y:0}});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50RW5naW5lU3JjL2dhbWVTdGF0ZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50RW5naW5lU3JjL2lucHV0LmpzIiwid2VicGFjazovLy8uL2NsaWVudEVuZ2luZVNyYy9tYWluLmpzIiwid2VicGFjazovLy8uL2NsaWVudEVuZ2luZVNyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50R2FtZVNyYy9nYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFlO0FBQ2Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDbkdEO0FBQUE7QUFBQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0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VUFBVSIsImZpbGUiOiJjbGllbnRHYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9jbGllbnRHYW1lU3JjL2dhbWUuanNcIik7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVNYW5hZ2Vye1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKXtcclxuXHJcbiAgICAgICAgdGhpcy5vYmplY3RzID0gW107XHJcblxyXG4gICAgICAgIC8vV29ybGQgU3R1ZmZcclxuICAgICAgICB0aGlzLnRpbGVzUGl4ZWxTaXplID0gY29uZmlnLnRpbGVzUGl4ZWxTaXplO1xyXG4gICAgICAgIHRoaXMud29ybGRQaXhlbFdpZHRoID0gY29uZmlnLndvcmxkUGl4ZWxXaWR0aDtcclxuICAgICAgICB0aGlzLndvcmxkUGl4ZWxIZWlnaHQgPSBjb25maWcud29ybGRQaXhlbFdpZHRoO1xyXG4gICAgICAgIHRoaXMubWFyZ2luID0gY29uZmlnLndvcmxkUGl4ZWxXaWR0aDtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHYW1lU3RhdGVNYW5hZ2VyIHJ1bm5pbmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGFsaXplKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXRhbGl6ZURlYnVnT2JqZWN0cygpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmluaXNoZWQgY3JlYXRpbmcgRGVidWcgZ2FtZSBvYmplY3RzXCIpO1xyXG4gICAgICAgIC8vd29ybGQgZWRnZVxyXG5cclxuICAgICAgICB0aGlzLmFkZE9iamVjdChcIk91dGVyIEJvdW5kc1wiLCB0aGlzLm1hcmdpbiwgdGhpcy5tYXJnaW4sIFwicmVjdFwiLCB7XHJcbiAgICAgICAgICAgIGNvbG9yOiBcInJlZFwiLFxyXG4gICAgICAgICAgICBzdHJva2VTaXplOiAyLFxyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy53b3JsZFBpeGVsV2lkdGggLSAodGhpcy5tYXJnaW4gKiAyKSxcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLndvcmxkUGl4ZWxIZWlnaHQgLSAodGhpcy5tYXJnaW4gKiAyKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFkZE9iamVjdChcIm91dCBvZiBib3VuZHNcIiwgLTUwMCwgLTUwMCwgXCJjaXJjbGVcIiwge1xyXG4gICAgICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICByYWRpdXM6ICh0aGlzLnRpbGVzUGl4ZWxTaXplLzIpLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICAgICAgZW5kOiBNYXRoLlBJICogMixcclxuICAgICAgICAgICAgc3Ryb2tlU2l6ZTogMlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFkZE9iamVjdChcImZpcnN0XCIsIHRoaXMubWFyZ2luLCB0aGlzLm1hcmdpbiwgXCJjaXJjbGVcIiwge1xyXG4gICAgICAgICAgICBjb2xvcjogXCJncmVlblwiLFxyXG4gICAgICAgICAgICByYWRpdXM6ICh0aGlzLnRpbGVzUGl4ZWxTaXplLzIpLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICAgICAgZW5kOiBNYXRoLlBJICogMixcclxuICAgICAgICAgICAgc3Ryb2tlU2l6ZTogMlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFkZE9iamVjdChcInNlY29uZFwiLCAxMDAwLCAxMDAwLCBcImNpcmNsZVwiLCB7XHJcbiAgICAgICAgICAgIGNvbG9yOiBcInJlZFwiLFxyXG4gICAgICAgICAgICByYWRpdXM6ICh0aGlzLnRpbGVzUGl4ZWxTaXplLzIpLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICAgICAgZW5kOiBNYXRoLlBJICogMixcclxuICAgICAgICAgICAgc3Ryb2tlU2l6ZTogMlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgY2VudGVyWCA9IE1hdGguZmxvb3IoKHRoaXMud29ybGRQaXhlbFdpZHRoIC8gMikpO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gTWF0aC5mbG9vcigodGhpcy53b3JsZFBpeGVsSGVpZ2h0IC8gMikpO1xyXG4gICAgICAgIHRoaXMuYWRkT2JqZWN0KFwibWlkZGxlXCIsIGNlbnRlclgsIGNlbnRlclksIFwiY2lyY2xlXCIsIHtcclxuICAgICAgICAgICAgY29sb3I6IFwiYmx1ZVwiLFxyXG4gICAgICAgICAgICByYWRpdXM6ICh0aGlzLnRpbGVzUGl4ZWxTaXplLzIpLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICAgICAgZW5kOiBNYXRoLlBJICogMixcclxuICAgICAgICAgICAgc3Ryb2tlU2l6ZTogMlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFkZE9iamVjdChcImVuZFwiLCB0aGlzLndvcmxkUGl4ZWxXaWR0aCAtICh0aGlzLm1hcmdpbioyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZFBpeGVsSGVpZ2h0IC0gKHRoaXMubWFyZ2luKjIpLCBcImNpcmNsZVwiLCB7XHJcbiAgICAgICAgICAgIGNvbG9yOiBcInllbGxvd1wiLFxyXG4gICAgICAgICAgICByYWRpdXM6ICh0aGlzLnRpbGVzUGl4ZWxTaXplLzIpLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICAgICAgZW5kOiBNYXRoLlBJICogMixcclxuICAgICAgICAgICAgc3Ryb2tlU2l6ZTogMlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZGRPYmplY3QobmFtZSwgeCwgeSwgdHlwZSwgZHJhdyl7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2goe1xyXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICBkcmF3OiBkcmF3XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T2JqZWN0c0luUmFuZ2Uoc3RhcnRYLCBlbmRYLCBzdGFydFksIGVuZFkpe1xyXG4gICAgICAgIC8vYWRkIHNvbWUgYnVmZmVyIGZvciBwYXJ0aWFsIHRpbGVzXHJcbiAgICAgICAgc3RhcnRYID0gc3RhcnRYIC0gdGhpcy50aWxlc1BpeGVsU2l6ZTtcclxuICAgICAgICBlbmRYID0gZW5kWCArIHRoaXMudGlsZXNQaXhlbFNpemU7XHJcbiAgICAgICAgc3RhcnRZID0gc3RhcnRZIC0gdGhpcy50aWxlc1BpeGVsU2l6ZTtcclxuICAgICAgICBlbmRZID0gZW5kWSAtIHRoaXMudGlsZXNQaXhlbFNpemU7XHJcbiAgICAgICAgbGV0IHRlbXBSZXR1cm4gPSBbXTtcclxuICAgICAgICB0aGlzLm9iamVjdHMuZm9yRWFjaCgob2JqZWN0KT0+e1xyXG4gICAgICAgICAgICBpZihzdGFydFggPCBvYmplY3QueCAmJiBvYmplY3QueCA8IGVuZFggJiZcclxuICAgICAgICAgICAgICAgc3RhcnRZIDwgb2JqZWN0LnkgJiYgb2JqZWN0LnkgPCBlbmRZKXtcclxuICAgICAgICAgICAgICAgICAgIHRlbXBSZXR1cm4ucHVzaChvYmplY3QpO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRlbXBSZXR1cm47XHJcbiAgICB9XHJcbn0vL2VuZCBjbGFzcyBHYW1lU3RhdGVNYW5hZ2VyXHJcbiIsIi8vUHJvY2VzcyB1c2VyIGlucHV0XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xzKXtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLnNjcm9sbEV2ZW50KTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5UHJlc3NEb3duRXZlbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5rZXlQcmVzc1VwRXZlbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlRXZlbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duRXZlbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBFdmVudC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy9kaXNhYmxlZCByaWdodC1jbGljayBtZW51XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgZXZlbnQgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKSk7XHJcblxyXG4gICAgICAgIC8vbW91c2VcclxuICAgICAgICB0aGlzLmxlZnRDbGljayA9IDA7XHJcbiAgICAgICAgdGhpcy5taWRkbGVDbGljayA9IDE7XHJcbiAgICAgICAgdGhpcy5yaWdodENsaWNrID0gMjtcclxuICAgICAgICB0aGlzLm1vdXNlID0ge1xyXG4gICAgICAgICAgICAgIGtleTogXCJtb3VzZVwiLFxyXG4gICAgICAgICAgICAgIGxlZnREb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICBtaWRkbGVEb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICByaWdodERvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgeTogMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jYW1lcmFTcGVlZCA9IDEwMDtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zSW5Vc2UgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzID0ge307XHJcblxyXG4gICAgICAgIHRoaXMudXNlckFjdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJub3cgcHJvY2Vzc2luZyB1c2VyIGlucHV0XCIpO1xyXG4gICAgfS8vY29uc3RydWN0b3JcclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgLy9pbmNyZWFzZSBjb3VudCBvZiBoZWxkIGtleXNcclxuICAgICAgdGhpcy5idXR0b25zSW5Vc2UuZm9yRWFjaCgoa2V5KT0+e1xyXG4gICAgICAgIGxldCBjb250cm9sS2V5ID0gdGhpcy5jb250cm9sc1trZXldO1xyXG4gICAgICAgIGlmKGNvbnRyb2xLZXkuZG93bikgY29udHJvbEtleS5oZWxkQ291bnQrKztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIFBvc3NpYmxlIGFjdGlvbnM6XHJcbiAgICAgICAgcGFuQ2FtZXJhICAgIHgseSAgb25seSBhZmZlY3RzIGNsaWVudFxyXG4gICAgKi9cclxuICAgIGFkZEtleU1hcHBpbmcoe1xyXG4gICAgICAgIGtleSxcclxuICAgICAgICBhY3Rpb24sXHJcbiAgICAgICAgaW5wdXRcclxuICAgIH0pe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWRkS2V5TWFwcGluZzpcIiwga2V5LCBhY3Rpb24sIGlucHV0KTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzW2tleV0gPSB7XHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICBkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgaGVsZENvdW50OiAwLFxyXG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcclxuICAgICAgICAgICAgaW5wdXQ6IGlucHV0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnV0dG9uc0luVXNlLnB1c2goa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRVc2VyQWN0aW9uKHtcclxuICAgICAgYWN0aW9uLFxyXG4gICAgICBpbnB1dFxyXG4gICAgfSl7XHJcbiAgICAgIGxldCB1c2VyQWN0aW9uID0ge1xyXG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxyXG4gICAgICAgIGlucHV0OiBpbnB1dCxcclxuICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWVcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnVzZXJBY3Rpb25zLnB1c2godXNlckFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TW91c2UoKXtcclxuICAgICAgcmV0dXJuIHRoaXMubW91c2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vcmV0dXJuIHVzZXJBY3Rpb25zIGFuZCBjbGVhclxyXG4gICAgZ2V0SW5wdXQoKXtcclxuICAgICAgICBsZXQgdGVtcFJldHVybiA9IHRoaXMudXNlckFjdGlvbnM7XHJcbiAgICAgICAgdGhpcy51c2VyQWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHJldHVybiB0ZW1wUmV0dXJuO1xyXG4gICAgICAgIC8vdGVzdFxyXG4gICAgfVxyXG5cclxuICAgIHNjcm9sbEV2ZW50KGUpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2Nyb2xsIGV2ZW50OlwiLCBlKTtcclxuICAgICAgICAvLyByZW5kZXJDYW52YXMuem9vbVZpZXcoZS5kZWx0YVksIGUuY2xpZW50WCwgZS5jbGllbnRZKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlQcmVzc0Rvd25FdmVudChlKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImtleXByZXNzIERvd246IFwiLCBlLmtleSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJrZXlwcmVzcyBEb3duIGV2ZW50OiBcIiwgZSk7XHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuY29udHJvbHNbZS5rZXldID09PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS2V5IG5vdCBpbiB1c2VcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGtleVByZXNzZWQgPSB0aGlzLmNvbnRyb2xzW2Uua2V5XTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhrZXlQcmVzc2VkKTtcclxuICAgICAgICAvL3RoaXNba2V5UHJlc3NlZC5hY3Rpb25dKGtleVByZXNzZWQuaW5wdXQpO1xyXG4gICAgICAgIGxldCBpbnB1dCA9IGtleVByZXNzZWQuaW5wdXQ7XHJcbiAgICAgICAgaW5wdXRbJ2hlbGRDb3VudCddID0ga2V5UHJlc3NlZC5oZWxkQ291bnQ7XHJcbiAgICAgICAgdGhpcy5hZGRVc2VyQWN0aW9uKHthY3Rpb246IGtleVByZXNzZWQuYWN0aW9uLCBpbnB1dDoga2V5UHJlc3NlZC5pbnB1dH0pO1xyXG4gICAgICAgIHRoaXMudXNlckFjdGlvbnMucHVzaChrZXlQcmVzc2VkKTtcclxuICAgICAgICBrZXlQcmVzc2VkLmRvd24gPSB0cnVlO1xyXG4gICAgICAgIGtleVByZXNzZWQuaGVsZENvdW50Kys7XHJcbiAgICB9XHJcblxyXG4gICAga2V5UHJlc3NVcEV2ZW50KGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwia2V5cHJlc3MgVXA6IFwiLCBlLmtleSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJrZXlQcmVzc1VwRXZlbnQ6IFwiLCBlKTtcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5jb250cm9sc1tlLmtleV0gPT09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZXkgbm90IGluIHVzZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQga2V5UHJlc3NlZCA9IHRoaXMuY29udHJvbHNbZS5rZXldO1xyXG4gICAgICAgIC8vIHRoaXNba2V5UHJlc3NlZC5hY3Rpb25dKGtleVByZXNzZWQuaW5wdXQpO1xyXG4gICAgICAgIGtleVByZXNzZWQuZG93biA9IGZhbHNlO1xyXG4gICAgICAgIGtleVByZXNzZWQuaGVsZENvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBtb3VzZU1vdmVFdmVudChlKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhlLm9mZnNldFgsIGUub2Zmc2V0WSk7XHJcbiAgICAgICAgdGhpcy5tb3VzZS54ID0gZS5vZmZzZXRYO1xyXG4gICAgICAgIHRoaXMubW91c2UueSA9IGUub2Zmc2V0WTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1vdXNlKTtcclxuICAgICAgICAvLyB0aGlzLmFkZFVzZXJBY3Rpb24oe2FjdGlvbjogXCJtb3VzZU1vdmVcIiwgaW5wdXQ6IHt4OiBtb3VzZS54LCB5OiBtb3VzZS55fX0pO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdXNlRG93bkV2ZW50KGUpe1xyXG4gICAgICBpZihlLmJ1dHRvbiA9PSB0aGlzLmxlZnRDbGljaykgdGhpcy5tb3VzZS5sZWZ0RG93biA9IHRydWU7XHJcbiAgICAgIGVsc2UgaWYoZS5idXR0b24gPT0gdGhpcy5taWRkbGVDbGljaykgdGhpcy5tb3VzZS5taWRkbGVEb3duID0gdHJ1ZTtcclxuICAgICAgZWxzZSBpZihlLmJ1dHRvbiA9PSB0aGlzLnJpZ2h0Q2xpY2spIHRoaXMubW91c2UucmlnaHREb3duID0gdHJ1ZTtcclxuICAgICAgZWxzZSBjb25zb2xlLmxvZyhcIk1vdXNlIGJ1dHRvblwiLCBlLmJ1dHRvbiwgXCJub3Qgc3VwcG9ydGVkXCIpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1vdXNlKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3VzZVVwRXZlbnQoZSl7XHJcbiAgICAgIGlmKGUuYnV0dG9uID09IHRoaXMubGVmdENsaWNrKSB0aGlzLm1vdXNlLmxlZnREb3duID0gZmFsc2U7XHJcbiAgICAgIGVsc2UgaWYoZS5idXR0b24gPT0gdGhpcy5taWRkbGVDbGljaykgdGhpcy5tb3VzZS5taWRkbGVEb3duID0gZmFsc2U7XHJcbiAgICAgIGVsc2UgaWYoZS5idXR0b24gPT0gdGhpcy5yaWdodENsaWNrKSB0aGlzLm1vdXNlLnJpZ2h0RG93biA9IGZhbHNlO1xyXG4gICAgICBlbHNlIGNvbnNvbGUubG9nKFwiTW91c2UgYnV0dG9uXCIsIGUuYnV0dG9uLCBcIm5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubW91c2UpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0vL2lucHV0IGNsYXNzXHJcbiIsImltcG9ydCBSZW5kZXJDYW52YXMgZnJvbSAnLi9yZW5kZXIuanMnO1xyXG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9pbnB1dC5qcyc7XHJcbmltcG9ydCBHYW1lU3RhdGVNYW5hZ2VyIGZyb20gJy4vZ2FtZVN0YXRlTWFuYWdlci5qcyc7XHJcblxyXG5jb25zb2xlLmxvZyhcIkJ1bmRsZSBjbGllbnQgRW5naW5lIExvYWRlZFwiKTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpZW50R2FtZUVuZ2luZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpe1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVNYW5hZ2VyID0gbmV3IEdhbWVTdGF0ZU1hbmFnZXIoY29uZmlnKTtcclxuICAgICAgICBpZih0aGlzLmNvbmZpZy5ERUJVRyAmJiB0aGlzLmNvbmZpZy5ERUJVRy5HU00pIHRoaXMuZ2FtZVN0YXRlTWFuYWdlci5pbml0YWxpemVEZWJ1Z09iamVjdHMoKTtcclxuICAgICAgICB0aGlzLnJlbmRlciA9IG5ldyBSZW5kZXJDYW52YXMoY29uZmlnKTtcclxuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IElucHV0KGNvbmZpZyk7XHJcblxyXG4gICAgICAgIC8vIGxldCB0ZXN0Tm9kZSA9IG5ldyBFbmVyZ3lOb2RlLmluaXQoXCJzdHJpbmcgaW4gYnJvd3NlclwiKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZXN0Tm9kZS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgLy9Mb29wIFN0YXRzXHJcbiAgICAgICAgdGhpcy5hdmdGUFMgPSAwO1xyXG4gICAgICAgIHRoaXMuZnJhbWVzID0gMDtcclxuICAgICAgICB0aGlzLmV2ZXJ5U2Vjb25kQ291bnREb3duID0gMTAwMDtcclxuICAgICAgICB0aGlzLmxhc3RGcmFtZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLmRlbHRhVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lc3RlcCA9IDIwOyAvL21zID0gbWlsbGlzZWNvbmRzXHJcblxyXG4gICAgICAgIC8vVXNlcklucHV0XHJcbiAgICAgICAgdGhpcy51c2VySW5wdXQgPSBbXTtcclxuXHJcbiAgICAgICAgLy9TdGFydCBNYWluIExvb3BcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZpbmlzaGVkIGxvYWRpbmdcIik7XHJcbiAgICAgICAgdGhpcy5tYWluTG9vcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEtleU1hcHBpbmcoa2V5cyl7XHJcbiAgICAgICAgdGhpcy5pbnB1dC5hZGRLZXlNYXBwaW5nKGtleXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW5Mb29wKCl7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLU1haW5sb29wLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAvL3Byb2Nlc3MgcmVhbC10aW1lIHN0YXRzXHJcbiAgICAgICAgdGhpcy5wcm9jZXNzRGVsdGFUaW1lKCk7XHJcblxyXG4gICAgICAgIC8vZ2V0IGFuZCBwcm9jZXNzIGNsaWVudCBJbnB1dFxyXG4gICAgICAgIHRoaXMucHJvY2Vzc1VzZXJBY3Rpb25zKCk7XHJcblxyXG4gICAgICAgIC8vdXBkYXRlIGRlYnVnSW5mb1xyXG4gICAgICAgIGxldCBtb3VzZUluZm8gPSB0aGlzLmlucHV0LmdldE1vdXNlKCk7XHJcbiAgICAgICAgbGV0IGRlYnVnSW5mb0lucHV0ID0ge1xyXG4gICAgICAgICAgbW91c2VYOiBtb3VzZUluZm8ueCxcclxuICAgICAgICAgIG1vdXNlWTogbW91c2VJbmZvLnksXHJcbiAgICAgICAgICBhdmdGUFM6IHRoaXMuYXZnRlBTLFxyXG4gICAgICAgICAgZGVsdGFUaW1lOiB0aGlzLmRlbHRhVGltZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlci51cGRhdGVEZWJ1Z0luZm8oZGVidWdJbmZvSW5wdXQpO1xyXG5cclxuICAgICAgICAvL3Byb2Nlc3MgbGF0ZXN0IHNlcnZlciB1cGRhdGUgaWYgYW55XHJcblxyXG4gICAgICAgIC8vc3RlcCBhbmQgZXh0cmFwb2xhdGUgYmV0d2VlbiB1cGRhdGVzL2ZyYW1lc1xyXG4gICAgICAgICAgICAvL3RoaXMgc2hvdWxkIGJlIGRvbmUgaW4gZml4ZWQgdGltZSBzdGVwcyB3aXRoIGFcclxuICAgICAgICAgICAgLy9jYWx1bGF0aW9uIG9uIHRpbWUgbG9zdCBiZXR3ZWVuIHVwZGF0ZXMgKGxhZylcclxuICAgICAgICAgICAgLy90aGVuIGxvb3BlZCB0byBhbGxvdyBtdWx0aXBsZSBiZXR3ZWVuIGZyYW1lIHJlbmRlcnMgaWYgbmVjY2lzc2FyeVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvL2dldCBvYmplY3RzIHRvIFJlbmRlciBpbiBWaWV3XHJcbiAgICAgICAgbGV0IG9iamVjdHNUb1JlbmRlciA9IHRoaXMuZ2FtZVN0YXRlTWFuYWdlci5nZXRPYmplY3RzSW5SYW5nZShcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIuY2FtZXJhWCwgdGhpcy5yZW5kZXIuY2FtZXJhWCArIHRoaXMucmVuZGVyLnZpZXdXaWR0aCxcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIuY2FtZXJhWSwgdGhpcy5yZW5kZXIuY2FtZXJhWSArIHRoaXMucmVuZGVyLnZpZXdIZWlnaHQpO1xyXG4gICAgICAgIC8vcmVuZGVyIGZyYW1lXHJcbiAgICAgICAgdGhpcy5yZW5kZXIuZHJhd1ZpZXcob2JqZWN0c1RvUmVuZGVyKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyLmRyYXdHdWkoKTtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubWFpbkxvb3AuYmluZCh0aGlzKSk7XHJcbiAgICB9Ly9tYWluTG9vcFxyXG5cclxuICAgIHByb2Nlc3NEZWx0YVRpbWUoKXtcclxuICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICB0aGlzLmRlbHRhVGltZSA9IG5vdyAtIHRoaXMubGFzdEZyYW1lVGltZTtcclxuICAgICAgdGhpcy5sYXN0RnJhbWVUaW1lID0gbm93O1xyXG4gICAgICB0aGlzLmV2ZXJ5U2Vjb25kQ291bnREb3duID0gdGhpcy5ldmVyeVNlY29uZENvdW50RG93biAtIHRoaXMuZGVsdGFUaW1lO1xyXG4gICAgICB0aGlzLmZyYW1lcysrO1xyXG4gICAgICBpZih0aGlzLmV2ZXJ5U2Vjb25kQ291bnREb3duIDwgMCl7XHJcbiAgICAgICAgICB0aGlzLmF2Z0ZQUyA9IE1hdGgucm91bmQoKHRoaXMuZnJhbWVzICogMC44KSArICh0aGlzLmF2Z0ZQUyAqIDAuMikpO1xyXG4gICAgICAgICAgdGhpcy5mcmFtZXMgPSAwO1xyXG4gICAgICAgICAgdGhpcy5ldmVyeVNlY29uZENvdW50RG93biA9IDEwMDA7XHJcbiAgICAgICAgICAvLyByZW5kZXJDYW52YXMuZHJhd0JhY2tncm91bmQoKTtcclxuICAgICAgfVxyXG4gICAgfS8vcHJvY2Vzc0RlbHRhVGltZVxyXG5cclxuICAgIHByb2Nlc3NVc2VyQWN0aW9ucygpe1xyXG4gICAgICB0aGlzLnVzZXJJbnB1dCA9IHRoaXMuaW5wdXQuZ2V0SW5wdXQoKTtcclxuICAgICAgdGhpcy51c2VySW5wdXQuZm9yRWFjaCgodXNlckFjdGlvbik9PntcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VyQWN0aW9uKTtcclxuICAgICAgICAgICAgICBzd2l0Y2godXNlckFjdGlvbi5hY3Rpb24pe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInBhbkNhbWVyYVwiOlxyXG4gICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlci5wYW5WaWV3KHVzZXJBY3Rpb24uaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidW5rbm93biB1c2VyIGFjdGlvblwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaW5wdXQudXBkYXRlKCk7XHJcbiAgICB9XHJcbn0vL0NsaWVudCBHYW1lIEVuZ2luZSBjbGFzc1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJDYW52YXMge1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKXtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5pbml0Q2FudmFzLmJpbmQodGhpcyksIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnZpZXdDYW52YXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmlld1JlbmRlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaHVkQ2FudmFzID0gbnVsbDtcclxuICAgICAgICB0aGlzLmh1ZFJlbmRlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy52aWV3V2lkdGggPSAwO1xyXG4gICAgICAgIHRoaXMudmlld0hlaWdodCA9IDA7XHJcblxyXG4gICAgICAgIC8vZm9yIHpvb20gYW5kIHBhbm5pbmdcclxuICAgICAgICB0aGlzLnNjYWxlRmFjdG9yID0gMS4wMDtcclxuICAgICAgICB0aGlzLmNhbWVyYVggPSAwO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhWSA9IDA7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFTcGVlZE1heCA9IDIwO1xyXG5cclxuICAgICAgICAvL2JhY2tncm91bmQgc3RhcnNcclxuICAgICAgICB0aGlzLnN0YXJzID0gW107XHJcblxyXG4gICAgICAgIC8vZGVidWdcclxuICAgICAgICB0aGlzLmRlYnVnSW5mbyA9IHtcclxuICAgICAgICAgICAgbW91c2VYOiAwLFxyXG4gICAgICAgICAgICBtb3VzZVk6IDAsXHJcbiAgICAgICAgICAgIGF2Z0ZQUzogMCxcclxuICAgICAgICAgICAgZGVsdGFUaW1lOjBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVkT2JqZWN0cyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRDYW52YXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q2FudmFzKCkge1xyXG4gICAgICAgY29uc29sZS5sb2coXCJpbml0Q2FudmFzXCIpO1xyXG4gICAgICAgdGhpcy52aWV3V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgIHRoaXMudmlld0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgIC8vQmFja2dyb3VuZCBsYXllciAxXHJcbiAgICAgICB0aGlzLmJhY2tncm91bmRDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tncm91bmQtbGF5ZXJcIik7XHJcbiAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIgPSB0aGlzLmJhY2tncm91bmRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzLndpZHRoID0gdGhpcy52aWV3V2lkdGg7XHJcbiAgICAgICB0aGlzLmJhY2tncm91bmRDYW52YXMuaGVpZ2h0ID0gdGhpcy52aWV3SGVpZ2h0O1xyXG4gICAgICAgLy9HYW1lIFZpZXcgbWlkZGxlIGxheWVyIDJcclxuICAgICAgIHRoaXMudmlld0NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlldy1sYXllclwiKTtcclxuICAgICAgIHRoaXMudmlld1JlbmRlciA9IHRoaXMudmlld0NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICB0aGlzLnZpZXdDYW52YXMud2lkdGggPSB0aGlzLnZpZXdXaWR0aDtcclxuICAgICAgIHRoaXMudmlld0NhbnZhcy5oZWlnaHQgPSB0aGlzLnZpZXdIZWlnaHQ7XHJcbiAgICAgICAvL0hVRCBvdmVybG9heSB0b3AgbGF5ZXIgM1xyXG4gICAgICAgdGhpcy5odWRDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1ZC1sYXllclwiKTtcclxuICAgICAgIHRoaXMuaHVkUmVuZGVyID0gdGhpcy5odWRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgdGhpcy5odWRDYW52YXMud2lkdGggPSB0aGlzLnZpZXdXaWR0aDtcclxuICAgICAgIHRoaXMuaHVkQ2FudmFzLmhlaWdodCA9IHRoaXMudmlld0hlaWdodDtcclxuICAgICAgIC8vaW5pdGFsaXplIGNhbWVyYSB2aWV3IHRvIGNlbnRlclxyXG4gICAgICAgLy8gY29uc29sZS5sb2coXCJDYW1lcmEgQkVGT1JFXCIsIHRoaXMuY2FtZXJhWCwgdGhpcy5jYW1lcmFZKTtcclxuICAgICAgIC8vIGNvbnNvbGUubG9nKFwid29ybGQ6IFwiLCB0aGlzLndvcmxkV2lkdGgsIHRoaXMud29ybGRIZWlnaHQpO1xyXG4gICAgICAgLy8gY29uc29sZS5sb2coXCJ2aWV3OiBcIiwgdGhpcy52aWV3V2lkdGgsIHRoaXMudmlld0hlaWdodCk7XHJcbiAgICAgICAvLyB0aGlzLmNhbWVyYVggPSAodGhpcy53b3JsZFdpZHRoIC8gMikgLSAodGhpcy52aWV3V2lkdGggLyAyKTtcclxuICAgICAgIC8vIHRoaXMuY2FtZXJhWSA9ICh0aGlzLndvcmxkSGVpZ2h0IC8gMikgLSAodGhpcy52aWV3SGVpZ2h0IC8gMik7XHJcbiAgICAgICBsZXQgbWlkZGxlV29ybGRYID0gTWF0aC5mbG9vcih0aGlzLmNvbmZpZy53b3JsZFBpeGVsV2lkdGggLyAyKTtcclxuICAgICAgIGxldCBtaWRkbGVXb3JsZFkgPSBNYXRoLmZsb29yKHRoaXMuY29uZmlnLndvcmxkUGl4ZWxIZWlnaHQgLyAyKTtcclxuICAgICAgIHRoaXMuc2V0Q2FtZXJhQ2VudGVyKG1pZGRsZVdvcmxkWCwgbWlkZGxlV29ybGRZKTtcclxuICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2FtZXJhOiBcIiwgdGhpcy5jYW1lcmFYLCB0aGlzLmNhbWVyYVkpO1xyXG4gICAgICAgdGhpcy5nZW5lcmF0ZVN0YXJzKCk7XHJcbiAgICAgICB0aGlzLmRyYXdCYWNrZ3JvdW5kKCk7XHJcbiAgICB9IC8vZW5kIGluaXRDYW52YXNcclxuXHJcbiAgICBnZW5lcmF0ZVN0YXJzKCl7XHJcbiAgICAgICAgZm9yKHZhciB4PTA7eDx0aGlzLnZpZXdXaWR0aDt4Kyspe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJzW3hdID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgeT0wO3k8dGhpcy52aWV3SGVpZ2h0O3krKyl7XHJcbiAgICAgICAgICAgICAgICBpZihNYXRoLnJhbmRvbSgpIDwgMC4wMDA1KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IChNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFyc1t4XVt5XSA9IHNpemU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgdGhpcy5zdGFyc1t4XVt5XSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgem9vbVZpZXcoZGlyLCBtb3VzZVgsIG1vdXNlWSl7XHJcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLnZpZXdDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdmFyIHggPSBtb3VzZVggLSByZWN0LmxlZnQ7XHJcbiAgICAgICAgdmFyIHkgPSBtb3VzZVkgLSByZWN0LnRvcDtcclxuICAgICAgICAvLyB0aGlzLmNhbWVyYVggPSBNYXRoLnJvdW5kKHgvMikgLSB0aGlzLnZpZXdXaWR0aDtcclxuICAgICAgICAvLyB0aGlzLmNhbWVyYVkgPSBNYXRoLnJvdW5kKHkvMikgLSB0aGlzLnZpZXdIZWlnaHQ7XHJcbiAgICAgICAgLy8gdGhpcy5zY2FsZUZhY3RvciA9IHRoaXMuc2NhbGVGYWN0b3IgKyAoTWF0aC5zaWduKGRpcikgKiAwLjUpO1xyXG4gICAgICAgIC8vIHRoaXMuc2NhbGVGYWN0b3IgPSAoTWF0aC5yb3VuZCh0aGlzLnNjYWxlRmFjdG9yICogMTApKS8xMDtcclxuICAgICAgICAvLyBpZih0aGlzLnNjYWxlRmFjdG9yIDwgMC4zKSB0aGlzLnNjYWxlRmFjdG9yID0gMC4zO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuc2NhbGVGYWN0b3IgPiAzKSB0aGlzLnNjYWxlRmFjdG9yID0gMztcclxuICAgICAgICAvLyB0aGlzLmNhbWVyYVggPSB0aGlzLnZpZXdXaWR0aCAvIDI7XHJcbiAgICAgICAgLy8gdGhpcy5jYW1lcmFZID0gdGhpcy52aWV3SGVpZ2h0IC8gMjtcclxuICAgICAgICBpZih0aGlzLmNvbmZpZy5ERUJVRyAmJiB0aGlzLmNvbmZpZy5ERUJVRy5yZW5kZXIpIGNvbnNvbGUubG9nKFwiem9vbTogXCIsXHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGVGYWN0b3IsIHRoaXMuY2FtZXJhWCwgdGhpcy5jYW1lcmFZKTtcclxuICAgICAgICAvLyB0aGlzLmRyYXdCYWNrZ3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFuVmlldyh7eCx5LGhlbGRDb3VudH0pe1xyXG4gICAgICAgIGxldCBwYW5TcGVlZCA9IE1hdGguZmxvb3IoKGhlbGRDb3VudC8xMCkpO1xyXG4gICAgICAgIGlmKHBhblNwZWVkIDwgMikgcGFuU3BlZWQgPSAyO1xyXG4gICAgICAgIGVsc2UgaWYocGFuU3BlZWQgPiB0aGlzLmNhbWVyYVNwZWVkTWF4KSBwYW5TcGVlZCA9IHRoaXMuY2FtZXJhU3BlZWRNYXg7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFuU3BlZWQsIGhlbGRDb3VudCk7XHJcbiAgICAgICAgaWYodGhpcy5jb25maWcuREVCVUcgJiYgdGhpcy5jb25maWcuREVCVUcucmVuZGVyKSBjb25zb2xlLmxvZyhcInBhblZpZXc6IFwiLHgseSxwYW5TcGVlZCk7XHJcbiAgICAgICAgbGV0IG1vdmVUb1ggPSBNYXRoLmZsb29yKHRoaXMuY2FtZXJhWCArICh4ICogcGFuU3BlZWQpKTtcclxuICAgICAgICBsZXQgbW92ZVRvWSA9IE1hdGguZmxvb3IodGhpcy5jYW1lcmFZICsgKHkgKiBwYW5TcGVlZCkpO1xyXG4gICAgICAgIGxldCBtYXJnaW5XID0gTWF0aC5mbG9vcigodGhpcy52aWV3V2lkdGgpICsgdGhpcy5jb25maWcubWFyZ2luKTtcclxuICAgICAgICBsZXQgbWFyZ2luSCA9IE1hdGguZmxvb3IoKHRoaXMudmlld0hlaWdodCkgKyB0aGlzLmNvbmZpZy5tYXJnaW4pO1xyXG4gICAgICAgIGxldCB3aWR0aFVwcGVyQm91bmQgPSB0aGlzLmNvbmZpZy53b3JsZFBpeGVsV2lkdGggLSBtYXJnaW5XO1xyXG4gICAgICAgIGxldCBoZWlnaHRVcHBlckJvdW5kID0gdGhpcy5jb25maWcud29ybGRQaXhlbEhlaWdodCAtIG1hcmdpbkg7XHJcbiAgICAgICAgaWYobW92ZVRvWCA8IHRoaXMuY29uZmlnLm1hcmdpbikgbW92ZVRvWCA9IHRoaXMuY29uZmlnLm1hcmdpbjtcclxuICAgICAgICBpZihtb3ZlVG9YID4gd2lkdGhVcHBlckJvdW5kKSBtb3ZlVG9YID0gd2lkdGhVcHBlckJvdW5kO1xyXG4gICAgICAgIGlmKG1vdmVUb1kgPCB0aGlzLmNvbmZpZy5tYXJnaW4pIG1vdmVUb1kgPSB0aGlzLmNvbmZpZy5tYXJnaW47XHJcbiAgICAgICAgaWYobW92ZVRvWSA+IGhlaWdodFVwcGVyQm91bmQpIG1vdmVUb1kgPSBoZWlnaHRVcHBlckJvdW5kO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FtZXJhKG1vdmVUb1gsIG1vdmVUb1kpO1xyXG4gICAgICAgIGlmKHRoaXMuY29uZmlnLkRFQlVHICYmIHRoaXMuY29uZmlnLkRFQlVHLnJlbmRlcikgY29uc29sZS5sb2coXCJwYW5WaWV3OlwiLFxyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYVgsIHRoaXMuY2FtZXJhWSwgXCJzY2FsZTpcIiwgdGhpcy5zY2FsZUZhY3Rvcik7XHJcbiAgICAgICAgLy8gdGhpcy5kcmF3QmFja2dyb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vU2V0cyBjYW1lcmEgY2VudGVyIGF0IHBvc2l0aW9uIGluIGdhbWVXb3JsZFxyXG4gICAgc2V0Q2FtZXJhQ2VudGVyKHgsIHkpe1xyXG4gICAgICBpZih0aGlzLmNvbmZpZy5ERUJVRyAmJiB0aGlzLmNvbmZpZy5ERUJVRy5yZW5kZXIpIGNvbnNvbGUubG9nKFwic2V0IENhbWVyYSBCRUZPUkVcIiwgdGhpcy5jYW1lcmFYLCB0aGlzLmNhbWVyYVkpO1xyXG4gICAgICBpZih0aGlzLmNvbmZpZy5ERUJVRyAmJiB0aGlzLmNvbmZpZy5ERUJVRy5yZW5kZXIpIGNvbnNvbGUubG9nKFwic2V0Q2FtZXJhOlwiLCB4LCB5KTtcclxuICAgICAgbGV0IGNlbnRlclggPSBNYXRoLmZsb29yKHggLSAodGhpcy52aWV3V2lkdGggLyAyKSk7XHJcbiAgICAgIGxldCBjZW50ZXJZID0gTWF0aC5mbG9vcih5IC0gKHRoaXMudmlld0hlaWdodCAvIDIpKTtcclxuICAgICAgdGhpcy5jYW1lcmFYID0gY2VudGVyWDtcclxuICAgICAgdGhpcy5jYW1lcmFZID0gY2VudGVyWTtcclxuICAgICAgaWYodGhpcy5jb25maWcuREVCVUcgJiYgdGhpcy5jb25maWcuREVCVUcucmVuZGVyKSBjb25zb2xlLmxvZyhcInNldCBDYW1lcmEgQUZURVJcIiwgdGhpcy5jYW1lcmFYLCB0aGlzLmNhbWVyYVkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENhbWVyYSh4LHkpe1xyXG4gICAgICAgIHRoaXMuY2FtZXJhWCA9IHg7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFZID0geTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYW1lcmFDZW50ZXIoKXtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IE1hdGguZmxvb3IodGhpcy5jYW1lcmFYIC0gKHRoaXMudmlld1dpZHRoIC8gMikpO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gTWF0aC5mbG9vcih0aGlzLmNhbWVyYVkgLSAodGhpcy52aWV3SGVpZ2h0IC8gMikpO1xyXG4gICAgICAgIHJldHVybiB7eDogY2VudGVyWCwgeTogY2VudGVyWX07XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNXb3JsZFBvc1RvU2NyZWVuUG9zKHgseSl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogeCAtIHRoaXMuY2FtZXJhWCxcclxuICAgICAgICAgICAgeTogeSAtIHRoaXMuY2FtZXJhWVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNb3VzZVBvcyhldnQpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IHRoaXMudmlld0NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgeDogZXZ0LmNsaWVudFggLSByZWN0LmxlZnQsXHJcbiAgICAgICAgICB5OiBldnQuY2xpZW50WSAtIHJlY3QudG9wXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEZWJ1Z0luZm8oaW5wdXQpe1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dCk7XHJcbiAgICAgIGlmKGlucHV0Lm1vdXNlWCkgdGhpcy5kZWJ1Z0luZm8ubW91c2VYID0gaW5wdXQubW91c2VYO1xyXG4gICAgICBpZihpbnB1dC5tb3VzZVkpIHRoaXMuZGVidWdJbmZvLm1vdXNlWSA9IGlucHV0Lm1vdXNlWTtcclxuICAgICAgaWYoaW5wdXQuYXZnRlBTKSB0aGlzLmRlYnVnSW5mby5hdmdGUFMgPSBpbnB1dC5hdmdGUFM7XHJcbiAgICAgIGlmKGlucHV0LmRlbHRhVGltZSkgdGhpcy5kZWJ1Z0luZm8uZGVsdGFUaW1lID0gaW5wdXQuZGVsdGFUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdCYWNrZ3JvdW5kKCl7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJkcmF3aW5nIEJhY2tncm91bmRcIik7XHJcbiAgICAgICAgLy9jbGVhciB0aGUgZ2FtZSBjYW52YXNcclxuICAgICAgICAvLyB0aGlzLmJhY2tncm91bmRSZW5kZXIuc2F2ZSgpO1xyXG4gICAgICAgIC8vIHRoaXMuYmFja2dyb3VuZFJlbmRlci5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XHJcbiAgICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB0aGlzLnZpZXdXaWR0aCx0aGlzLnZpZXdIZWlnaHQpO1xyXG4gICAgICAgIC8vIHRoaXMuYmFja2dyb3VuZFJlbmRlci5iZWdpblBhdGgoKTtcclxuICAgICAgICAvLyB0aGlzLmJhY2tncm91bmRSZW5kZXIucmVzdG9yZSgpO1xyXG5cclxuICAgICAgICAvL2RyYXcgYmFja2dyb3VuZCBmaXJzdFxyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5zYXZlKCk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIuZmlsbFJlY3QoMCwwLHRoaXMudmlld1dpZHRoLHRoaXMudmlld0hlaWdodCk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLnJlc3RvcmUoKTtcclxuXHJcbiAgICAgICAgLy8gZm9yKHZhciB4PTA7eDx0aGlzLndvcmxkV2lkdGg7eCsrKXtcclxuICAgICAgICAvLyAgICAgZm9yKHZhciB5PTA7eTx0aGlzLndvcmxkSGVpZ2h0O3krKyl7XHJcbiAgICAgICAgZm9yKHZhciB4PTA7eDx0aGlzLnZpZXdXaWR0aDt4Kyspe1xyXG4gICAgICAgICAgICBmb3IodmFyIHk9MDt5PHRoaXMudmlld0hlaWdodDt5Kyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zdGFyc1t4XVt5XSA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLnRyYW5zbGF0ZSh0aGlzLmNhbWVyYVgsIHRoaXMuY2FtZXJhWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLnNjYWxlKHRoaXMuc2NhbGVGYWN0b3IsIHRoaXMuc2NhbGVGYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIuYXJjKHgsIHksIHRoaXMuc3RhcnNbeF1beV0sIDAsIDIqTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5maWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLnJlc3RvcmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gLy9zdGFyIGRyYXcgYmFja2dyb3VuZFxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdWaWV3KG9iamVjdHNUb1JlbmRlcil7XHJcblxyXG4gICAgICAgIC8vY2xlYXIgdGhlIGdhbWUgY2FudmFzXHJcbiAgICAgICAgdGhpcy52aWV3UmVuZGVyLnNhdmUoKTtcclxuICAgICAgICB0aGlzLnZpZXdSZW5kZXIuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudmlld1JlbmRlci5jbGVhclJlY3QoMCwgMCwgdGhpcy52aWV3V2lkdGgsdGhpcy52aWV3SGVpZ2h0KTtcclxuICAgICAgICB0aGlzLnZpZXdSZW5kZXIuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy52aWV3UmVuZGVyLnJlc3RvcmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlZE9iamVjdHMgPSBvYmplY3RzVG9SZW5kZXI7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyZWRPYmplY3RzLmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgbGV0IHRyYW5zUG9zID0ge307XHJcbiAgICAgICAgICAgIHN3aXRjaCAob2JqZWN0LnR5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImNpcmNsZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRHJhd2luZzpcIixvYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1JlbmRlci5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIuZmlsbFN0eWxlID0gb2JqZWN0LmRyYXcuY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UmVuZGVyLmxpbmVXaWR0aCA9IG9iamVjdC5kcmF3LnN0cm9rZVNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNQb3MgPSB0aGlzLnRyYW5zV29ybGRQb3NUb1NjcmVlblBvcyhvYmplY3QueCxvYmplY3QueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UmVuZGVyLmFyYyh0cmFuc1Bvcy54LCB0cmFuc1Bvcy55LCBvYmplY3QuZHJhdy5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QuZHJhdy5zdGFydCwgb2JqZWN0LmRyYXcuZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIuZmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInJlY3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRyYXdpbmc6XCIsb2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UmVuZGVyLmZpbGxTdHlsZSA9IG9iamVjdC5kcmF3LmNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1JlbmRlci5zdHJva2VTaXplID0gb2JqZWN0LmRyYXcuc3Ryb2tlU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc1BvcyA9IHRoaXMudHJhbnNXb3JsZFBvc1RvU2NyZWVuUG9zKG9iamVjdC54LG9iamVjdC55KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIuYXJjKHRyYW5zUG9zLngsIHRyYW5zUG9zLnksIG9iamVjdC5kcmF3LnJhZGl1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5kcmF3LnN0YXJ0LCBvYmplY3QuZHJhdy5lbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1JlbmRlci5maWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvbnQga25vdyBob3cgdG8gZHJhdyBvYmplY3RcIiwgb2JqZWN0LnR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuY2xlYXJSZWN0KDAsIDAsIHRoaXMudmlld1dpZHRoLCB0aGlzLnZpZXdIZWlnaHQpO1xyXG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5zYXZlKCk7XHJcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLnRyYW5zbGF0ZSgtdGhpcy5jYW1lcmFYLCAtdGhpcy5jYW1lcmFZKTtcclxuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuc2NhbGUodGhpcy5zY2FsZUZhY3RvciwgdGhpcy5zY2FsZUZhY3Rvcik7XHJcbiAgICAgICAgLy93b3JsZCBlZGdlXHJcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcclxuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuc3Ryb2tlU2l6ZSA9IFwiMlwiO1xyXG4gICAgICAgIC8vIGxldCBzaXplID0gdGhpcy5jb25maWcud29ybGRQaXhlbFdpZHRoIC0gKHRoaXMuY29uZmlnLm1hcmdpbioyKTtcclxuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIucmVjdCgxMDAgLDEwMCwgc2l6ZSwgc2l6ZSk7XHJcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLnN0cm9rZSgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFJlY3QoLTUwMCAsLTUwMCwgdGhpcy5jb25maWcudGlsZXNQaXhlbFNpemUsIHRoaXMuY29uZmlnLnRpbGVzUGl4ZWxTaXplKTtcclxuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFN0eWxlID0gXCJncmVlblwiO1xyXG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5maWxsUmVjdCgxMDAgLDEwMCwgdGhpcy5jb25maWcudGlsZXNQaXhlbFNpemUsIHRoaXMuY29uZmlnLnRpbGVzUGl4ZWxTaXplKTtcclxuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFN0eWxlID0gXCJyZWRcIjtcclxuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFJlY3QoMTAwMCAsIDEwMDAsIHRoaXMuY29uZmlnLnRpbGVzUGl4ZWxTaXplLCB0aGlzLmNvbmZpZy50aWxlc1BpeGVsU2l6ZSk7XHJcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xyXG4gICAgICAgIC8vIGxldCByZWNYID0gTWF0aC5mbG9vcigodGhpcy5jb25maWcud29ybGRQaXhlbFdpZHRoIC8gMikgLSAodGhpcy5jb25maWcudGlsZXNQaXhlbFNpemUvMikpO1xyXG4gICAgICAgIC8vIGxldCByZWNZID0gTWF0aC5mbG9vcigodGhpcy5jb25maWcud29ybGRQaXhlbEhlaWdodCAvIDIpIC0gKHRoaXMuY29uZmlnLnRpbGVzUGl4ZWxTaXplLzIpKTtcclxuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFJlY3QocmVjWCAsIHJlY1ksIHRoaXMuY29uZmlnLnRpbGVzUGl4ZWxTaXplLCB0aGlzLmNvbmZpZy50aWxlc1BpeGVsU2l6ZSk7XHJcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmZpbGxTdHlsZSA9IFwieWVsbG93XCI7XHJcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmZpbGxSZWN0KHRoaXMuY29uZmlnLndvcmxkUGl4ZWxXaWR0aCAtICh0aGlzLmNvbmZpZy5tYXJnaW4qMikgLFxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jb25maWcud29ybGRQaXhlbEhlaWdodCAtICh0aGlzLmNvbmZpZy5tYXJnaW4qMiksIHRoaXMuY29uZmlnLnRpbGVzUGl4ZWxTaXplLCB0aGlzLmNvbmZpZy50aWxlc1BpeGVsU2l6ZSk7XHJcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0d1aSgpe1xyXG4gICAgICAgIC8vY2xlYXIgdGhlIGdhbWUgY2FudmFzXHJcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuc2F2ZSgpO1xyXG4gICAgICAgIC8vIHRoaXMuaHVkUmVuZGVyLnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcclxuICAgICAgICB0aGlzLmh1ZFJlbmRlci5jbGVhclJlY3QoMCwgMCwgdGhpcy52aWV3V2lkdGgsdGhpcy52aWV3SGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmh1ZFJlbmRlci5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmh1ZFJlbmRlci5yZXN0b3JlKCk7XHJcblxyXG4gICAgICAgIC8vY2VudGVyIG9mIHZpZXdcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMudmlld1dpZHRoIC8gMjtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMudmlld0hlaWdodCAvIDI7XHJcbiAgICAgICAgbGV0IHNpemUgPSAyMDtcclxuICAgICAgICB0aGlzLmRyYXdDcm9zc2hhaXIoY2VudGVyWCwgY2VudGVyWSwgc2l6ZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3Q3Jvc3NoYWlyKHRoaXMuZGVidWdJbmZvLm1vdXNlWCwgdGhpcy5kZWJ1Z0luZm8ubW91c2VZLCAxMCk7XHJcblxyXG4gICAgICAgIC8vdXBwZXJMZWZ0IERlYnVnIFN0YXRzXHJcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuc2F2ZSgpO1xyXG4gICAgICAgIGxldCBzcGFjZWluZyA9IDIwO1xyXG4gICAgICAgIGxldCBjdXJyZW50WUZvbnQgPSAyMDtcclxuICAgICAgICB0aGlzLmh1ZFJlbmRlci5mb250ID0gXCIyMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFN0eWxlID0gXCJvcmFuZ2VcIjtcclxuICAgICAgICB0aGlzLmh1ZFJlbmRlci5maWxsVGV4dChcIkZQUzpcIit0aGlzLmRlYnVnSW5mby5hdmdGUFMsIDAsIGN1cnJlbnRZRm9udCk7XHJcbiAgICAgICAgY3VycmVudFlGb250ID0gY3VycmVudFlGb250ICsgc3BhY2Vpbmc7XHJcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJEZWx0YVRpbWU6XCIrdGhpcy5kZWJ1Z0luZm8uZGVsdGFUaW1lLCAwLCBjdXJyZW50WUZvbnQpO1xyXG4gICAgICAgIGN1cnJlbnRZRm9udCA9IGN1cnJlbnRZRm9udCArIHNwYWNlaW5nO1xyXG4gICAgICAgIHRoaXMuaHVkUmVuZGVyLmZpbGxUZXh0KFwiUGluZzogcGluZ1wiLCAwLCBjdXJyZW50WUZvbnQpO1xyXG4gICAgICAgIGN1cnJlbnRZRm9udCA9IGN1cnJlbnRZRm9udCArIHNwYWNlaW5nO1xyXG4gICAgICAgIHRoaXMuaHVkUmVuZGVyLmZpbGxUZXh0KFwiTW91c2VWaWV3OlwiK3RoaXMuZGVidWdJbmZvLm1vdXNlWCtcIixcIit0aGlzLmRlYnVnSW5mby5tb3VzZVksIDAsIGN1cnJlbnRZRm9udCk7XHJcbiAgICAgICAgY3VycmVudFlGb250ID0gY3VycmVudFlGb250ICsgc3BhY2Vpbmc7XHJcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJNb3VzZVdvcmxkOlwiKyh0aGlzLmRlYnVnSW5mby5tb3VzZVggKyB0aGlzLmNhbWVyYVgpK1wiLFwiK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuZGVidWdJbmZvLm1vdXNlWSArIHRoaXMuY2FtZXJhWSksIDAsIGN1cnJlbnRZRm9udCk7XHJcbiAgICAgICAgY3VycmVudFlGb250ID0gY3VycmVudFlGb250ICsgc3BhY2Vpbmc7XHJcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJWaWV3U2l6ZTpcIit0aGlzLnZpZXdXaWR0aCtcIixcIit0aGlzLnZpZXdIZWlnaHQsIDAsIGN1cnJlbnRZRm9udCk7XHJcbiAgICAgICAgY3VycmVudFlGb250ID0gY3VycmVudFlGb250ICsgc3BhY2Vpbmc7XHJcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJDYW1lcmE6XCIrdGhpcy5jYW1lcmFYK1wiLFwiK3RoaXMuY2FtZXJhWSwgMCwgY3VycmVudFlGb250KTtcclxuICAgICAgICBjdXJyZW50WUZvbnQgPSBjdXJyZW50WUZvbnQgKyBzcGFjZWluZztcclxuICAgICAgICB0aGlzLmh1ZFJlbmRlci5maWxsVGV4dChcIlJlbmRlcmVkT2JqZWN0czpcIit0aGlzLnJlbmRlcmVkT2JqZWN0cy5sZW5ndGgsIDAsIGN1cnJlbnRZRm9udCk7XHJcbiAgICAgICAgY3VycmVudFlGb250ID0gY3VycmVudFlGb250ICsgc3BhY2Vpbmc7XHJcbiAgICAgICAgdGhpcy5odWRSZW5kZXIucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdDcm9zc2hhaXIoeCx5LHNpemUpe1xyXG4gICAgICB0aGlzLmh1ZFJlbmRlci5zdHJva2VTaXplID0gMjtcclxuICAgICAgdGhpcy5odWRSZW5kZXIuc3Ryb2tlU3R5bGUgPSBcInBpbmtcIjtcclxuICAgICAgdGhpcy5odWRSZW5kZXIuYmVnaW5QYXRoKCk7XHJcbiAgICAgIHRoaXMuaHVkUmVuZGVyLm1vdmVUbyh4ICsgc2l6ZSwgeSk7XHJcbiAgICAgIHRoaXMuaHVkUmVuZGVyLmxpbmVUbyh4IC0gc2l6ZSwgeSk7XHJcbiAgICAgIHRoaXMuaHVkUmVuZGVyLnN0cm9rZSgpO1xyXG4gICAgICB0aGlzLmh1ZFJlbmRlci5iZWdpblBhdGgoKTtcclxuICAgICAgdGhpcy5odWRSZW5kZXIubW92ZVRvKHgsIHkgKyBzaXplKTtcclxuICAgICAgdGhpcy5odWRSZW5kZXIubGluZVRvKHgsIHkgLSBzaXplKTtcclxuICAgICAgdGhpcy5odWRSZW5kZXIuc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG59Ly9SZW5kZXJDYW52YXMgY2xhc3NcclxuIiwiaW1wb3J0IENsaWVudEdhbWVFbmdpbmUgZnJvbSAnLi4vY2xpZW50RW5naW5lU3JjL21haW4uanMnO1xyXG5cclxubGV0IG51bU9mVGlsZXNYID0gMTAyNDtcclxubGV0IG51bU9mVGlsZXNZID0gMTAyNDtcclxubGV0IHRpbGVzUGl4ZWxTaXplID0gMzI7XHJcbmxldCB3b3JsZFBpeGVsV2lkdGggPSBudW1PZlRpbGVzWCAqIHRpbGVzUGl4ZWxTaXplOyAvLzMyLDc2OCBtaWRkbGUgaXMgMTYzODRcclxubGV0IHdvcmxkUGl4ZWxIZWlnaHQgPSBudW1PZlRpbGVzWSAqIHRpbGVzUGl4ZWxTaXplO1xyXG5sZXQgbWFyZ2luID0gdGlsZXNQaXhlbFNpemUgKiAyO1xyXG5cclxubGV0IERFQlVHID0ge1xyXG4gICAgaW5wdXQ6IHRydWUsXHJcbiAgICByZW5kZXI6IGZhbHNlLFxyXG4gICAgR1NNOiB0cnVlLFxyXG59O1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIHdvcmxkUGl4ZWxXaWR0aDogd29ybGRQaXhlbFdpZHRoLFxyXG4gICAgd29ybGRQaXhlbEhlaWdodDogd29ybGRQaXhlbEhlaWdodCxcclxuICAgIHRpbGVzUGl4ZWxTaXplOiB0aWxlc1BpeGVsU2l6ZSxcclxuICAgIG1hcmdpbjogbWFyZ2luLFxyXG4gICAgREVCVUc6IERFQlVHXHJcbn1cclxuXHJcbnZhciBFbmdpbmUgPSBuZXcgQ2xpZW50R2FtZUVuZ2luZShjb25maWcpO1xyXG5cclxuRW5naW5lLmFkZEtleU1hcHBpbmcoe2tleTogXCJ3XCIsIGFjdGlvbjogXCJwYW5DYW1lcmFcIiwgaW5wdXQ6IHt4OjAsIHk6LTF9fSk7XHJcbkVuZ2luZS5hZGRLZXlNYXBwaW5nKHtrZXk6IFwiYVwiLCBhY3Rpb246IFwicGFuQ2FtZXJhXCIsIGlucHV0OiB7eDotMSwgeTowfX0pO1xyXG5FbmdpbmUuYWRkS2V5TWFwcGluZyh7a2V5OiBcInNcIiwgYWN0aW9uOiBcInBhbkNhbWVyYVwiLCBpbnB1dDoge3g6MCwgeToxfX0pO1xyXG5FbmdpbmUuYWRkS2V5TWFwcGluZyh7a2V5OiBcImRcIiwgYWN0aW9uOiBcInBhbkNhbWVyYVwiLCBpbnB1dDoge3g6MSwgeTowfX0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9