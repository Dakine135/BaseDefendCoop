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
    GSM: false,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50RW5naW5lU3JjL2dhbWVTdGF0ZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50RW5naW5lU3JjL2lucHV0LmpzIiwid2VicGFjazovLy8uL2NsaWVudEVuZ2luZVNyYy9tYWluLmpzIiwid2VicGFjazovLy8uL2NsaWVudEVuZ2luZVNyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50R2FtZVNyYy9nYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFlO0FBQ2Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDbkdEO0FBQUE7QUFBQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0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VUFBVSIsImZpbGUiOiJjbGllbnRHYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9jbGllbnRHYW1lU3JjL2dhbWUuanNcIik7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVNYW5hZ2Vye1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cbiAgICAgICAgdGhpcy5vYmplY3RzID0gW107XG5cbiAgICAgICAgLy9Xb3JsZCBTdHVmZlxuICAgICAgICB0aGlzLnRpbGVzUGl4ZWxTaXplID0gY29uZmlnLnRpbGVzUGl4ZWxTaXplO1xuICAgICAgICB0aGlzLndvcmxkUGl4ZWxXaWR0aCA9IGNvbmZpZy53b3JsZFBpeGVsV2lkdGg7XG4gICAgICAgIHRoaXMud29ybGRQaXhlbEhlaWdodCA9IGNvbmZpZy53b3JsZFBpeGVsV2lkdGg7XG4gICAgICAgIHRoaXMubWFyZ2luID0gY29uZmlnLndvcmxkUGl4ZWxXaWR0aDtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVTdGF0ZU1hbmFnZXIgcnVubmluZ1wiKTtcbiAgICB9XG5cbiAgICBpbml0YWxpemUoKXtcblxuICAgIH1cblxuICAgIGluaXRhbGl6ZURlYnVnT2JqZWN0cygpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImZpbmlzaGVkIGNyZWF0aW5nIERlYnVnIGdhbWUgb2JqZWN0c1wiKTtcbiAgICAgICAgLy93b3JsZCBlZGdlXG5cbiAgICAgICAgdGhpcy5hZGRPYmplY3QoXCJPdXRlciBCb3VuZHNcIiwgdGhpcy5tYXJnaW4sIHRoaXMubWFyZ2luLCBcInJlY3RcIiwge1xuICAgICAgICAgICAgY29sb3I6IFwicmVkXCIsXG4gICAgICAgICAgICBzdHJva2VTaXplOiAyLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud29ybGRQaXhlbFdpZHRoIC0gKHRoaXMubWFyZ2luICogMiksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMud29ybGRQaXhlbEhlaWdodCAtICh0aGlzLm1hcmdpbiAqIDIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkT2JqZWN0KFwib3V0IG9mIGJvdW5kc1wiLCAtNTAwLCAtNTAwLCBcImNpcmNsZVwiLCB7XG4gICAgICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgcmFkaXVzOiAodGhpcy50aWxlc1BpeGVsU2l6ZS8yKSxcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiBNYXRoLlBJICogMixcbiAgICAgICAgICAgIHN0cm9rZVNpemU6IDJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRPYmplY3QoXCJmaXJzdFwiLCB0aGlzLm1hcmdpbiwgdGhpcy5tYXJnaW4sIFwiY2lyY2xlXCIsIHtcbiAgICAgICAgICAgIGNvbG9yOiBcImdyZWVuXCIsXG4gICAgICAgICAgICByYWRpdXM6ICh0aGlzLnRpbGVzUGl4ZWxTaXplLzIpLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IE1hdGguUEkgKiAyLFxuICAgICAgICAgICAgc3Ryb2tlU2l6ZTogMlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZE9iamVjdChcInNlY29uZFwiLCAxMDAwLCAxMDAwLCBcImNpcmNsZVwiLCB7XG4gICAgICAgICAgICBjb2xvcjogXCJyZWRcIixcbiAgICAgICAgICAgIHJhZGl1czogKHRoaXMudGlsZXNQaXhlbFNpemUvMiksXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogTWF0aC5QSSAqIDIsXG4gICAgICAgICAgICBzdHJva2VTaXplOiAyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjZW50ZXJYID0gTWF0aC5mbG9vcigodGhpcy53b3JsZFBpeGVsV2lkdGggLyAyKSk7XG4gICAgICAgIGxldCBjZW50ZXJZID0gTWF0aC5mbG9vcigodGhpcy53b3JsZFBpeGVsSGVpZ2h0IC8gMikpO1xuICAgICAgICB0aGlzLmFkZE9iamVjdChcIm1pZGRsZVwiLCBjZW50ZXJYLCBjZW50ZXJZLCBcImNpcmNsZVwiLCB7XG4gICAgICAgICAgICBjb2xvcjogXCJibHVlXCIsXG4gICAgICAgICAgICByYWRpdXM6ICh0aGlzLnRpbGVzUGl4ZWxTaXplLzIpLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IE1hdGguUEkgKiAyLFxuICAgICAgICAgICAgc3Ryb2tlU2l6ZTogMlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZE9iamVjdChcImVuZFwiLCB0aGlzLndvcmxkUGl4ZWxXaWR0aCAtICh0aGlzLm1hcmdpbioyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGRQaXhlbEhlaWdodCAtICh0aGlzLm1hcmdpbioyKSwgXCJjaXJjbGVcIiwge1xuICAgICAgICAgICAgY29sb3I6IFwieWVsbG93XCIsXG4gICAgICAgICAgICByYWRpdXM6ICh0aGlzLnRpbGVzUGl4ZWxTaXplLzIpLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IE1hdGguUEkgKiAyLFxuICAgICAgICAgICAgc3Ryb2tlU2l6ZTogMlxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGFkZE9iamVjdChuYW1lLCB4LCB5LCB0eXBlLCBkcmF3KXtcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGRyYXc6IGRyYXdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0T2JqZWN0c0luUmFuZ2Uoc3RhcnRYLCBlbmRYLCBzdGFydFksIGVuZFkpe1xuICAgICAgICAvL2FkZCBzb21lIGJ1ZmZlciBmb3IgcGFydGlhbCB0aWxlc1xuICAgICAgICBzdGFydFggPSBzdGFydFggLSB0aGlzLnRpbGVzUGl4ZWxTaXplO1xuICAgICAgICBlbmRYID0gZW5kWCArIHRoaXMudGlsZXNQaXhlbFNpemU7XG4gICAgICAgIHN0YXJ0WSA9IHN0YXJ0WSAtIHRoaXMudGlsZXNQaXhlbFNpemU7XG4gICAgICAgIGVuZFkgPSBlbmRZIC0gdGhpcy50aWxlc1BpeGVsU2l6ZTtcbiAgICAgICAgbGV0IHRlbXBSZXR1cm4gPSBbXTtcbiAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goKG9iamVjdCk9PntcbiAgICAgICAgICAgIGlmKHN0YXJ0WCA8IG9iamVjdC54ICYmIG9iamVjdC54IDwgZW5kWCAmJlxuICAgICAgICAgICAgICAgc3RhcnRZIDwgb2JqZWN0LnkgJiYgb2JqZWN0LnkgPCBlbmRZKXtcbiAgICAgICAgICAgICAgICAgICB0ZW1wUmV0dXJuLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0ZW1wUmV0dXJuO1xuICAgIH1cbn0vL2VuZCBjbGFzcyBHYW1lU3RhdGVNYW5hZ2VyXG4iLCIvL1Byb2Nlc3MgdXNlciBpbnB1dFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xzKXtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5zY3JvbGxFdmVudCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlQcmVzc0Rvd25FdmVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5rZXlQcmVzc1VwRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUV2ZW50LmJpbmQodGhpcykpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25FdmVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBFdmVudC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvL2Rpc2FibGVkIHJpZ2h0LWNsaWNrIG1lbnVcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgZXZlbnQgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKSk7XG5cbiAgICAgICAgLy9tb3VzZVxuICAgICAgICB0aGlzLmxlZnRDbGljayA9IDA7XG4gICAgICAgIHRoaXMubWlkZGxlQ2xpY2sgPSAxO1xuICAgICAgICB0aGlzLnJpZ2h0Q2xpY2sgPSAyO1xuICAgICAgICB0aGlzLm1vdXNlID0ge1xuICAgICAgICAgICAgICBrZXk6IFwibW91c2VcIixcbiAgICAgICAgICAgICAgbGVmdERvd246IGZhbHNlLFxuICAgICAgICAgICAgICBtaWRkbGVEb3duOiBmYWxzZSxcbiAgICAgICAgICAgICAgcmlnaHREb3duOiBmYWxzZSxcbiAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgeTogMFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW1lcmFTcGVlZCA9IDEwMDtcblxuICAgICAgICB0aGlzLmJ1dHRvbnNJblVzZSA9IFtdO1xuICAgICAgICB0aGlzLmNvbnRyb2xzID0ge307XG5cbiAgICAgICAgdGhpcy51c2VyQWN0aW9ucyA9IFtdO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwibm93IHByb2Nlc3NpbmcgdXNlciBpbnB1dFwiKTtcbiAgICB9Ly9jb25zdHJ1Y3RvclxuXG4gICAgdXBkYXRlKCl7XG4gICAgICAvL2luY3JlYXNlIGNvdW50IG9mIGhlbGQga2V5c1xuICAgICAgdGhpcy5idXR0b25zSW5Vc2UuZm9yRWFjaCgoa2V5KT0+e1xuICAgICAgICBsZXQgY29udHJvbEtleSA9IHRoaXMuY29udHJvbHNba2V5XTtcbiAgICAgICAgaWYoY29udHJvbEtleS5kb3duKSBjb250cm9sS2V5LmhlbGRDb3VudCsrO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICBQb3NzaWJsZSBhY3Rpb25zOlxuICAgICAgICBwYW5DYW1lcmEgICAgeCx5ICBvbmx5IGFmZmVjdHMgY2xpZW50XG4gICAgKi9cbiAgICBhZGRLZXlNYXBwaW5nKHtcbiAgICAgICAga2V5LFxuICAgICAgICBhY3Rpb24sXG4gICAgICAgIGlucHV0XG4gICAgfSl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWRkS2V5TWFwcGluZzpcIiwga2V5LCBhY3Rpb24sIGlucHV0KTtcbiAgICAgICAgdGhpcy5jb250cm9sc1trZXldID0ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBkb3duOiBmYWxzZSxcbiAgICAgICAgICAgIGhlbGRDb3VudDogMCxcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgaW5wdXQ6IGlucHV0XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idXR0b25zSW5Vc2UucHVzaChrZXkpO1xuICAgIH1cblxuICAgIGFkZFVzZXJBY3Rpb24oe1xuICAgICAgYWN0aW9uLFxuICAgICAgaW5wdXRcbiAgICB9KXtcbiAgICAgIGxldCB1c2VyQWN0aW9uID0ge1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWVcbiAgICAgIH1cbiAgICAgIHRoaXMudXNlckFjdGlvbnMucHVzaCh1c2VyQWN0aW9uKTtcbiAgICB9XG5cbiAgICBnZXRNb3VzZSgpe1xuICAgICAgcmV0dXJuIHRoaXMubW91c2U7XG4gICAgfVxuXG5cbiAgICAvL3JldHVybiB1c2VyQWN0aW9ucyBhbmQgY2xlYXJcbiAgICBnZXRJbnB1dCgpe1xuICAgICAgICBsZXQgdGVtcFJldHVybiA9IHRoaXMudXNlckFjdGlvbnM7XG4gICAgICAgIHRoaXMudXNlckFjdGlvbnMgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRlbXBSZXR1cm47XG4gICAgICAgIC8vdGVzdFxuICAgIH1cblxuICAgIHNjcm9sbEV2ZW50KGUpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNjcm9sbCBldmVudDpcIiwgZSk7XG4gICAgICAgIC8vIHJlbmRlckNhbnZhcy56b29tVmlldyhlLmRlbHRhWSwgZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIH1cblxuICAgIGtleVByZXNzRG93bkV2ZW50KGUpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImtleXByZXNzIERvd246IFwiLCBlLmtleSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwia2V5cHJlc3MgRG93biBldmVudDogXCIsIGUpO1xuICAgICAgICBpZih0eXBlb2YgdGhpcy5jb250cm9sc1tlLmtleV0gPT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS2V5IG5vdCBpbiB1c2VcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGtleVByZXNzZWQgPSB0aGlzLmNvbnRyb2xzW2Uua2V5XTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coa2V5UHJlc3NlZCk7XG4gICAgICAgIC8vdGhpc1trZXlQcmVzc2VkLmFjdGlvbl0oa2V5UHJlc3NlZC5pbnB1dCk7XG4gICAgICAgIGxldCBpbnB1dCA9IGtleVByZXNzZWQuaW5wdXQ7XG4gICAgICAgIGlucHV0WydoZWxkQ291bnQnXSA9IGtleVByZXNzZWQuaGVsZENvdW50O1xuICAgICAgICB0aGlzLmFkZFVzZXJBY3Rpb24oe2FjdGlvbjoga2V5UHJlc3NlZC5hY3Rpb24sIGlucHV0OiBrZXlQcmVzc2VkLmlucHV0fSk7XG4gICAgICAgIHRoaXMudXNlckFjdGlvbnMucHVzaChrZXlQcmVzc2VkKTtcbiAgICAgICAga2V5UHJlc3NlZC5kb3duID0gdHJ1ZTtcbiAgICAgICAga2V5UHJlc3NlZC5oZWxkQ291bnQrKztcbiAgICB9XG5cbiAgICBrZXlQcmVzc1VwRXZlbnQoZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwia2V5cHJlc3MgVXA6IFwiLCBlLmtleSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwia2V5UHJlc3NVcEV2ZW50OiBcIiwgZSk7XG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLmNvbnRyb2xzW2Uua2V5XSA9PT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZXkgbm90IGluIHVzZVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQga2V5UHJlc3NlZCA9IHRoaXMuY29udHJvbHNbZS5rZXldO1xuICAgICAgICAvLyB0aGlzW2tleVByZXNzZWQuYWN0aW9uXShrZXlQcmVzc2VkLmlucHV0KTtcbiAgICAgICAga2V5UHJlc3NlZC5kb3duID0gZmFsc2U7XG4gICAgICAgIGtleVByZXNzZWQuaGVsZENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBtb3VzZU1vdmVFdmVudChlKXtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZS5vZmZzZXRYLCBlLm9mZnNldFkpO1xuICAgICAgICB0aGlzLm1vdXNlLnggPSBlLm9mZnNldFg7XG4gICAgICAgIHRoaXMubW91c2UueSA9IGUub2Zmc2V0WTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5tb3VzZSk7XG4gICAgICAgIC8vIHRoaXMuYWRkVXNlckFjdGlvbih7YWN0aW9uOiBcIm1vdXNlTW92ZVwiLCBpbnB1dDoge3g6IG1vdXNlLngsIHk6IG1vdXNlLnl9fSk7XG4gICAgfVxuXG4gICAgbW91c2VEb3duRXZlbnQoZSl7XG4gICAgICBpZihlLmJ1dHRvbiA9PSB0aGlzLmxlZnRDbGljaykgdGhpcy5tb3VzZS5sZWZ0RG93biA9IHRydWU7XG4gICAgICBlbHNlIGlmKGUuYnV0dG9uID09IHRoaXMubWlkZGxlQ2xpY2spIHRoaXMubW91c2UubWlkZGxlRG93biA9IHRydWU7XG4gICAgICBlbHNlIGlmKGUuYnV0dG9uID09IHRoaXMucmlnaHRDbGljaykgdGhpcy5tb3VzZS5yaWdodERvd24gPSB0cnVlO1xuICAgICAgZWxzZSBjb25zb2xlLmxvZyhcIk1vdXNlIGJ1dHRvblwiLCBlLmJ1dHRvbiwgXCJub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5tb3VzZSk7XG4gICAgfVxuXG4gICAgbW91c2VVcEV2ZW50KGUpe1xuICAgICAgaWYoZS5idXR0b24gPT0gdGhpcy5sZWZ0Q2xpY2spIHRoaXMubW91c2UubGVmdERvd24gPSBmYWxzZTtcbiAgICAgIGVsc2UgaWYoZS5idXR0b24gPT0gdGhpcy5taWRkbGVDbGljaykgdGhpcy5tb3VzZS5taWRkbGVEb3duID0gZmFsc2U7XG4gICAgICBlbHNlIGlmKGUuYnV0dG9uID09IHRoaXMucmlnaHRDbGljaykgdGhpcy5tb3VzZS5yaWdodERvd24gPSBmYWxzZTtcbiAgICAgIGVsc2UgY29uc29sZS5sb2coXCJNb3VzZSBidXR0b25cIiwgZS5idXR0b24sIFwibm90IHN1cHBvcnRlZFwiKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubW91c2UpO1xuICAgIH1cblxuXG59Ly9pbnB1dCBjbGFzc1xuIiwiaW1wb3J0IFJlbmRlckNhbnZhcyBmcm9tICcuL3JlbmRlci5qcyc7XG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9pbnB1dC5qcyc7XG5pbXBvcnQgR2FtZVN0YXRlTWFuYWdlciBmcm9tICcuL2dhbWVTdGF0ZU1hbmFnZXIuanMnO1xuXG5jb25zb2xlLmxvZyhcIkJ1bmRsZSBjbGllbnQgRW5naW5lIExvYWRlZFwiKTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWVudEdhbWVFbmdpbmUge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgICAgICAgdGhpcy5nYW1lU3RhdGVNYW5hZ2VyID0gbmV3IEdhbWVTdGF0ZU1hbmFnZXIoY29uZmlnKTtcbiAgICAgICAgaWYodGhpcy5jb25maWcuREVCVUcgJiYgdGhpcy5jb25maWcuREVCVUcuR1NNKSB0aGlzLmdhbWVTdGF0ZU1hbmFnZXIuaW5pdGFsaXplRGVidWdPYmplY3RzKCk7XG4gICAgICAgIHRoaXMucmVuZGVyID0gbmV3IFJlbmRlckNhbnZhcyhjb25maWcpO1xuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IElucHV0KGNvbmZpZyk7XG5cbiAgICAgICAgLy8gbGV0IHRlc3ROb2RlID0gbmV3IEVuZXJneU5vZGUuaW5pdChcInN0cmluZyBpbiBicm93c2VyXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZXN0Tm9kZS50b1N0cmluZygpKTtcblxuICAgICAgICAvL0xvb3AgU3RhdHNcbiAgICAgICAgdGhpcy5hdmdGUFMgPSAwO1xuICAgICAgICB0aGlzLmZyYW1lcyA9IDA7XG4gICAgICAgIHRoaXMuZXZlcnlTZWNvbmRDb3VudERvd24gPSAxMDAwO1xuICAgICAgICB0aGlzLmxhc3RGcmFtZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSAwO1xuICAgICAgICB0aGlzLnRpbWVzdGVwID0gMjA7IC8vbXMgPSBtaWxsaXNlY29uZHNcblxuICAgICAgICAvL1VzZXJJbnB1dFxuICAgICAgICB0aGlzLnVzZXJJbnB1dCA9IFtdO1xuXG4gICAgICAgIC8vU3RhcnQgTWFpbiBMb29wXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmluaXNoZWQgbG9hZGluZ1wiKTtcbiAgICAgICAgdGhpcy5tYWluTG9vcCgpO1xuICAgIH1cblxuICAgIGFkZEtleU1hcHBpbmcoa2V5cyl7XG4gICAgICAgIHRoaXMuaW5wdXQuYWRkS2V5TWFwcGluZyhrZXlzKTtcbiAgICB9XG5cbiAgICBtYWluTG9vcCgpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tTWFpbmxvb3AtLS0tLS0tLS0tXCIpO1xuICAgICAgICAvL3Byb2Nlc3MgcmVhbC10aW1lIHN0YXRzXG4gICAgICAgIHRoaXMucHJvY2Vzc0RlbHRhVGltZSgpO1xuXG4gICAgICAgIC8vZ2V0IGFuZCBwcm9jZXNzIGNsaWVudCBJbnB1dFxuICAgICAgICB0aGlzLnByb2Nlc3NVc2VyQWN0aW9ucygpO1xuXG4gICAgICAgIC8vdXBkYXRlIGRlYnVnSW5mb1xuICAgICAgICBsZXQgbW91c2VJbmZvID0gdGhpcy5pbnB1dC5nZXRNb3VzZSgpO1xuICAgICAgICBsZXQgZGVidWdJbmZvSW5wdXQgPSB7XG4gICAgICAgICAgbW91c2VYOiBtb3VzZUluZm8ueCxcbiAgICAgICAgICBtb3VzZVk6IG1vdXNlSW5mby55LFxuICAgICAgICAgIGF2Z0ZQUzogdGhpcy5hdmdGUFMsXG4gICAgICAgICAgZGVsdGFUaW1lOiB0aGlzLmRlbHRhVGltZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyLnVwZGF0ZURlYnVnSW5mbyhkZWJ1Z0luZm9JbnB1dCk7XG5cbiAgICAgICAgLy9wcm9jZXNzIGxhdGVzdCBzZXJ2ZXIgdXBkYXRlIGlmIGFueVxuXG4gICAgICAgIC8vc3RlcCBhbmQgZXh0cmFwb2xhdGUgYmV0d2VlbiB1cGRhdGVzL2ZyYW1lc1xuICAgICAgICAgICAgLy90aGlzIHNob3VsZCBiZSBkb25lIGluIGZpeGVkIHRpbWUgc3RlcHMgd2l0aCBhXG4gICAgICAgICAgICAvL2NhbHVsYXRpb24gb24gdGltZSBsb3N0IGJldHdlZW4gdXBkYXRlcyAobGFnKVxuICAgICAgICAgICAgLy90aGVuIGxvb3BlZCB0byBhbGxvdyBtdWx0aXBsZSBiZXR3ZWVuIGZyYW1lIHJlbmRlcnMgaWYgbmVjY2lzc2FyeVxuXG5cblxuXG4gICAgICAgIC8vZ2V0IG9iamVjdHMgdG8gUmVuZGVyIGluIFZpZXdcbiAgICAgICAgbGV0IG9iamVjdHNUb1JlbmRlciA9IHRoaXMuZ2FtZVN0YXRlTWFuYWdlci5nZXRPYmplY3RzSW5SYW5nZShcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmNhbWVyYVgsIHRoaXMucmVuZGVyLmNhbWVyYVggKyB0aGlzLnJlbmRlci52aWV3V2lkdGgsXG4gICAgICAgICAgICB0aGlzLnJlbmRlci5jYW1lcmFZLCB0aGlzLnJlbmRlci5jYW1lcmFZICsgdGhpcy5yZW5kZXIudmlld0hlaWdodCk7XG4gICAgICAgIC8vcmVuZGVyIGZyYW1lXG4gICAgICAgIHRoaXMucmVuZGVyLmRyYXdWaWV3KG9iamVjdHNUb1JlbmRlcik7XG5cblxuICAgICAgICB0aGlzLnJlbmRlci5kcmF3R3VpKCk7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5tYWluTG9vcC5iaW5kKHRoaXMpKTtcbiAgICB9Ly9tYWluTG9vcFxuXG4gICAgcHJvY2Vzc0RlbHRhVGltZSgpe1xuICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5kZWx0YVRpbWUgPSBub3cgLSB0aGlzLmxhc3RGcmFtZVRpbWU7XG4gICAgICB0aGlzLmxhc3RGcmFtZVRpbWUgPSBub3c7XG4gICAgICB0aGlzLmV2ZXJ5U2Vjb25kQ291bnREb3duID0gdGhpcy5ldmVyeVNlY29uZENvdW50RG93biAtIHRoaXMuZGVsdGFUaW1lO1xuICAgICAgdGhpcy5mcmFtZXMrKztcbiAgICAgIGlmKHRoaXMuZXZlcnlTZWNvbmRDb3VudERvd24gPCAwKXtcbiAgICAgICAgICB0aGlzLmF2Z0ZQUyA9IE1hdGgucm91bmQoKHRoaXMuZnJhbWVzICogMC44KSArICh0aGlzLmF2Z0ZQUyAqIDAuMikpO1xuICAgICAgICAgIHRoaXMuZnJhbWVzID0gMDtcbiAgICAgICAgICB0aGlzLmV2ZXJ5U2Vjb25kQ291bnREb3duID0gMTAwMDtcbiAgICAgICAgICAvLyByZW5kZXJDYW52YXMuZHJhd0JhY2tncm91bmQoKTtcbiAgICAgIH1cbiAgICB9Ly9wcm9jZXNzRGVsdGFUaW1lXG5cbiAgICBwcm9jZXNzVXNlckFjdGlvbnMoKXtcbiAgICAgIHRoaXMudXNlcklucHV0ID0gdGhpcy5pbnB1dC5nZXRJbnB1dCgpO1xuICAgICAgdGhpcy51c2VySW5wdXQuZm9yRWFjaCgodXNlckFjdGlvbik9PntcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXNlckFjdGlvbik7XG4gICAgICAgICAgICAgIHN3aXRjaCh1c2VyQWN0aW9uLmFjdGlvbil7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBhbkNhbWVyYVwiOlxuICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIucGFuVmlldyh1c2VyQWN0aW9uLmlucHV0KTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVua25vd24gdXNlciBhY3Rpb25cIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbnB1dC51cGRhdGUoKTtcbiAgICB9XG59Ly9DbGllbnQgR2FtZSBFbmdpbmUgY2xhc3NcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlckNhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKXtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaW5pdENhbnZhcy5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudmlld0NhbnZhcyA9IG51bGw7XG4gICAgICAgIHRoaXMudmlld1JlbmRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENhbnZhcyA9IG51bGw7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuaHVkQ2FudmFzID0gbnVsbDtcbiAgICAgICAgdGhpcy5odWRSZW5kZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnZpZXdXaWR0aCA9IDA7XG4gICAgICAgIHRoaXMudmlld0hlaWdodCA9IDA7XG5cbiAgICAgICAgLy9mb3Igem9vbSBhbmQgcGFubmluZ1xuICAgICAgICB0aGlzLnNjYWxlRmFjdG9yID0gMS4wMDtcbiAgICAgICAgdGhpcy5jYW1lcmFYID0gMDtcbiAgICAgICAgdGhpcy5jYW1lcmFZID0gMDtcbiAgICAgICAgdGhpcy5jYW1lcmFTcGVlZE1heCA9IDIwO1xuXG4gICAgICAgIC8vYmFja2dyb3VuZCBzdGFyc1xuICAgICAgICB0aGlzLnN0YXJzID0gW107XG5cbiAgICAgICAgLy9kZWJ1Z1xuICAgICAgICB0aGlzLmRlYnVnSW5mbyA9IHtcbiAgICAgICAgICAgIG1vdXNlWDogMCxcbiAgICAgICAgICAgIG1vdXNlWTogMCxcbiAgICAgICAgICAgIGF2Z0ZQUzogMCxcbiAgICAgICAgICAgIGRlbHRhVGltZTowXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgICAgICB0aGlzLnJlbmRlcmVkT2JqZWN0cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuaW5pdENhbnZhcygpO1xuICAgIH1cblxuICAgIGluaXRDYW52YXMoKSB7XG4gICAgICAgY29uc29sZS5sb2coXCJpbml0Q2FudmFzXCIpO1xuICAgICAgIHRoaXMudmlld1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgdGhpcy52aWV3SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgIC8vQmFja2dyb3VuZCBsYXllciAxXG4gICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrZ3JvdW5kLWxheWVyXCIpO1xuICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlciA9IHRoaXMuYmFja2dyb3VuZENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzLndpZHRoID0gdGhpcy52aWV3V2lkdGg7XG4gICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzLmhlaWdodCA9IHRoaXMudmlld0hlaWdodDtcbiAgICAgICAvL0dhbWUgVmlldyBtaWRkbGUgbGF5ZXIgMlxuICAgICAgIHRoaXMudmlld0NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlldy1sYXllclwiKTtcbiAgICAgICB0aGlzLnZpZXdSZW5kZXIgPSB0aGlzLnZpZXdDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgIHRoaXMudmlld0NhbnZhcy53aWR0aCA9IHRoaXMudmlld1dpZHRoO1xuICAgICAgIHRoaXMudmlld0NhbnZhcy5oZWlnaHQgPSB0aGlzLnZpZXdIZWlnaHQ7XG4gICAgICAgLy9IVUQgb3ZlcmxvYXkgdG9wIGxheWVyIDNcbiAgICAgICB0aGlzLmh1ZENhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHVkLWxheWVyXCIpO1xuICAgICAgIHRoaXMuaHVkUmVuZGVyID0gdGhpcy5odWRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgIHRoaXMuaHVkQ2FudmFzLndpZHRoID0gdGhpcy52aWV3V2lkdGg7XG4gICAgICAgdGhpcy5odWRDYW52YXMuaGVpZ2h0ID0gdGhpcy52aWV3SGVpZ2h0O1xuICAgICAgIC8vaW5pdGFsaXplIGNhbWVyYSB2aWV3IHRvIGNlbnRlclxuICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2FtZXJhIEJFRk9SRVwiLCB0aGlzLmNhbWVyYVgsIHRoaXMuY2FtZXJhWSk7XG4gICAgICAgLy8gY29uc29sZS5sb2coXCJ3b3JsZDogXCIsIHRoaXMud29ybGRXaWR0aCwgdGhpcy53b3JsZEhlaWdodCk7XG4gICAgICAgLy8gY29uc29sZS5sb2coXCJ2aWV3OiBcIiwgdGhpcy52aWV3V2lkdGgsIHRoaXMudmlld0hlaWdodCk7XG4gICAgICAgLy8gdGhpcy5jYW1lcmFYID0gKHRoaXMud29ybGRXaWR0aCAvIDIpIC0gKHRoaXMudmlld1dpZHRoIC8gMik7XG4gICAgICAgLy8gdGhpcy5jYW1lcmFZID0gKHRoaXMud29ybGRIZWlnaHQgLyAyKSAtICh0aGlzLnZpZXdIZWlnaHQgLyAyKTtcbiAgICAgICBsZXQgbWlkZGxlV29ybGRYID0gTWF0aC5mbG9vcih0aGlzLmNvbmZpZy53b3JsZFBpeGVsV2lkdGggLyAyKTtcbiAgICAgICBsZXQgbWlkZGxlV29ybGRZID0gTWF0aC5mbG9vcih0aGlzLmNvbmZpZy53b3JsZFBpeGVsSGVpZ2h0IC8gMik7XG4gICAgICAgdGhpcy5zZXRDYW1lcmFDZW50ZXIobWlkZGxlV29ybGRYLCBtaWRkbGVXb3JsZFkpO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2FtZXJhOiBcIiwgdGhpcy5jYW1lcmFYLCB0aGlzLmNhbWVyYVkpO1xuICAgICAgIHRoaXMuZ2VuZXJhdGVTdGFycygpO1xuICAgICAgIHRoaXMuZHJhd0JhY2tncm91bmQoKTtcbiAgICB9IC8vZW5kIGluaXRDYW52YXNcblxuICAgIGdlbmVyYXRlU3RhcnMoKXtcbiAgICAgICAgZm9yKHZhciB4PTA7eDx0aGlzLnZpZXdXaWR0aDt4Kyspe1xuICAgICAgICAgICAgdGhpcy5zdGFyc1t4XSA9IFtdO1xuICAgICAgICAgICAgZm9yKHZhciB5PTA7eTx0aGlzLnZpZXdIZWlnaHQ7eSsrKXtcbiAgICAgICAgICAgICAgICBpZihNYXRoLnJhbmRvbSgpIDwgMC4wMDA1KXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemUgPSAoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJzW3hdW3ldID0gc2l6ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgdGhpcy5zdGFyc1t4XVt5XSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB6b29tVmlldyhkaXIsIG1vdXNlWCwgbW91c2VZKXtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLnZpZXdDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciB4ID0gbW91c2VYIC0gcmVjdC5sZWZ0O1xuICAgICAgICB2YXIgeSA9IG1vdXNlWSAtIHJlY3QudG9wO1xuICAgICAgICAvLyB0aGlzLmNhbWVyYVggPSBNYXRoLnJvdW5kKHgvMikgLSB0aGlzLnZpZXdXaWR0aDtcbiAgICAgICAgLy8gdGhpcy5jYW1lcmFZID0gTWF0aC5yb3VuZCh5LzIpIC0gdGhpcy52aWV3SGVpZ2h0O1xuICAgICAgICAvLyB0aGlzLnNjYWxlRmFjdG9yID0gdGhpcy5zY2FsZUZhY3RvciArIChNYXRoLnNpZ24oZGlyKSAqIDAuNSk7XG4gICAgICAgIC8vIHRoaXMuc2NhbGVGYWN0b3IgPSAoTWF0aC5yb3VuZCh0aGlzLnNjYWxlRmFjdG9yICogMTApKS8xMDtcbiAgICAgICAgLy8gaWYodGhpcy5zY2FsZUZhY3RvciA8IDAuMykgdGhpcy5zY2FsZUZhY3RvciA9IDAuMztcbiAgICAgICAgLy8gaWYodGhpcy5zY2FsZUZhY3RvciA+IDMpIHRoaXMuc2NhbGVGYWN0b3IgPSAzO1xuICAgICAgICAvLyB0aGlzLmNhbWVyYVggPSB0aGlzLnZpZXdXaWR0aCAvIDI7XG4gICAgICAgIC8vIHRoaXMuY2FtZXJhWSA9IHRoaXMudmlld0hlaWdodCAvIDI7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLkRFQlVHICYmIHRoaXMuY29uZmlnLkRFQlVHLnJlbmRlcikgY29uc29sZS5sb2coXCJ6b29tOiBcIixcbiAgICAgICAgICAgIHRoaXMuc2NhbGVGYWN0b3IsIHRoaXMuY2FtZXJhWCwgdGhpcy5jYW1lcmFZKTtcbiAgICAgICAgLy8gdGhpcy5kcmF3QmFja2dyb3VuZCgpO1xuICAgIH1cblxuICAgIHBhblZpZXcoe3gseSxoZWxkQ291bnR9KXtcbiAgICAgICAgbGV0IHBhblNwZWVkID0gTWF0aC5mbG9vcigoaGVsZENvdW50LzEwKSk7XG4gICAgICAgIGlmKHBhblNwZWVkIDwgMikgcGFuU3BlZWQgPSAyO1xuICAgICAgICBlbHNlIGlmKHBhblNwZWVkID4gdGhpcy5jYW1lcmFTcGVlZE1heCkgcGFuU3BlZWQgPSB0aGlzLmNhbWVyYVNwZWVkTWF4O1xuICAgICAgICBjb25zb2xlLmxvZyhwYW5TcGVlZCwgaGVsZENvdW50KTtcbiAgICAgICAgaWYodGhpcy5jb25maWcuREVCVUcgJiYgdGhpcy5jb25maWcuREVCVUcucmVuZGVyKSBjb25zb2xlLmxvZyhcInBhblZpZXc6IFwiLHgseSxwYW5TcGVlZCk7XG4gICAgICAgIGxldCBtb3ZlVG9YID0gTWF0aC5mbG9vcih0aGlzLmNhbWVyYVggKyAoeCAqIHBhblNwZWVkKSk7XG4gICAgICAgIGxldCBtb3ZlVG9ZID0gTWF0aC5mbG9vcih0aGlzLmNhbWVyYVkgKyAoeSAqIHBhblNwZWVkKSk7XG4gICAgICAgIGxldCBtYXJnaW5XID0gTWF0aC5mbG9vcigodGhpcy52aWV3V2lkdGgpICsgdGhpcy5jb25maWcubWFyZ2luKTtcbiAgICAgICAgbGV0IG1hcmdpbkggPSBNYXRoLmZsb29yKCh0aGlzLnZpZXdIZWlnaHQpICsgdGhpcy5jb25maWcubWFyZ2luKTtcbiAgICAgICAgbGV0IHdpZHRoVXBwZXJCb3VuZCA9IHRoaXMuY29uZmlnLndvcmxkUGl4ZWxXaWR0aCAtIG1hcmdpblc7XG4gICAgICAgIGxldCBoZWlnaHRVcHBlckJvdW5kID0gdGhpcy5jb25maWcud29ybGRQaXhlbEhlaWdodCAtIG1hcmdpbkg7XG4gICAgICAgIGlmKG1vdmVUb1ggPCB0aGlzLmNvbmZpZy5tYXJnaW4pIG1vdmVUb1ggPSB0aGlzLmNvbmZpZy5tYXJnaW47XG4gICAgICAgIGlmKG1vdmVUb1ggPiB3aWR0aFVwcGVyQm91bmQpIG1vdmVUb1ggPSB3aWR0aFVwcGVyQm91bmQ7XG4gICAgICAgIGlmKG1vdmVUb1kgPCB0aGlzLmNvbmZpZy5tYXJnaW4pIG1vdmVUb1kgPSB0aGlzLmNvbmZpZy5tYXJnaW47XG4gICAgICAgIGlmKG1vdmVUb1kgPiBoZWlnaHRVcHBlckJvdW5kKSBtb3ZlVG9ZID0gaGVpZ2h0VXBwZXJCb3VuZDtcbiAgICAgICAgdGhpcy5zZXRDYW1lcmEobW92ZVRvWCwgbW92ZVRvWSk7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLkRFQlVHICYmIHRoaXMuY29uZmlnLkRFQlVHLnJlbmRlcikgY29uc29sZS5sb2coXCJwYW5WaWV3OlwiLFxuICAgICAgICAgICAgdGhpcy5jYW1lcmFYLCB0aGlzLmNhbWVyYVksIFwic2NhbGU6XCIsIHRoaXMuc2NhbGVGYWN0b3IpO1xuICAgICAgICAvLyB0aGlzLmRyYXdCYWNrZ3JvdW5kKCk7XG4gICAgfVxuXG4gICAgLy9TZXRzIGNhbWVyYSBjZW50ZXIgYXQgcG9zaXRpb24gaW4gZ2FtZVdvcmxkXG4gICAgc2V0Q2FtZXJhQ2VudGVyKHgsIHkpe1xuICAgICAgaWYodGhpcy5jb25maWcuREVCVUcgJiYgdGhpcy5jb25maWcuREVCVUcucmVuZGVyKSBjb25zb2xlLmxvZyhcInNldCBDYW1lcmEgQkVGT1JFXCIsIHRoaXMuY2FtZXJhWCwgdGhpcy5jYW1lcmFZKTtcbiAgICAgIGlmKHRoaXMuY29uZmlnLkRFQlVHICYmIHRoaXMuY29uZmlnLkRFQlVHLnJlbmRlcikgY29uc29sZS5sb2coXCJzZXRDYW1lcmE6XCIsIHgsIHkpO1xuICAgICAgbGV0IGNlbnRlclggPSBNYXRoLmZsb29yKHggLSAodGhpcy52aWV3V2lkdGggLyAyKSk7XG4gICAgICBsZXQgY2VudGVyWSA9IE1hdGguZmxvb3IoeSAtICh0aGlzLnZpZXdIZWlnaHQgLyAyKSk7XG4gICAgICB0aGlzLmNhbWVyYVggPSBjZW50ZXJYO1xuICAgICAgdGhpcy5jYW1lcmFZID0gY2VudGVyWTtcbiAgICAgIGlmKHRoaXMuY29uZmlnLkRFQlVHICYmIHRoaXMuY29uZmlnLkRFQlVHLnJlbmRlcikgY29uc29sZS5sb2coXCJzZXQgQ2FtZXJhIEFGVEVSXCIsIHRoaXMuY2FtZXJhWCwgdGhpcy5jYW1lcmFZKTtcbiAgICB9XG5cbiAgICBzZXRDYW1lcmEoeCx5KXtcbiAgICAgICAgdGhpcy5jYW1lcmFYID0geDtcbiAgICAgICAgdGhpcy5jYW1lcmFZID0geTtcbiAgICB9XG5cbiAgICBnZXRDYW1lcmFDZW50ZXIoKXtcbiAgICAgICAgbGV0IGNlbnRlclggPSBNYXRoLmZsb29yKHRoaXMuY2FtZXJhWCAtICh0aGlzLnZpZXdXaWR0aCAvIDIpKTtcbiAgICAgICAgbGV0IGNlbnRlclkgPSBNYXRoLmZsb29yKHRoaXMuY2FtZXJhWSAtICh0aGlzLnZpZXdIZWlnaHQgLyAyKSk7XG4gICAgICAgIHJldHVybiB7eDogY2VudGVyWCwgeTogY2VudGVyWX07XG4gICAgfVxuXG4gICAgdHJhbnNXb3JsZFBvc1RvU2NyZWVuUG9zKHgseSl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB4IC0gdGhpcy5jYW1lcmFYLFxuICAgICAgICAgICAgeTogeSAtIHRoaXMuY2FtZXJhWVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TW91c2VQb3MoZXZ0KSB7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy52aWV3Q2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgICAgICAgIHk6IGV2dC5jbGllbnRZIC0gcmVjdC50b3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB1cGRhdGVEZWJ1Z0luZm8oaW5wdXQpe1xuICAgICAgLy8gY29uc29sZS5sb2coaW5wdXQpO1xuICAgICAgaWYoaW5wdXQubW91c2VYKSB0aGlzLmRlYnVnSW5mby5tb3VzZVggPSBpbnB1dC5tb3VzZVg7XG4gICAgICBpZihpbnB1dC5tb3VzZVkpIHRoaXMuZGVidWdJbmZvLm1vdXNlWSA9IGlucHV0Lm1vdXNlWTtcbiAgICAgIGlmKGlucHV0LmF2Z0ZQUykgdGhpcy5kZWJ1Z0luZm8uYXZnRlBTID0gaW5wdXQuYXZnRlBTO1xuICAgICAgaWYoaW5wdXQuZGVsdGFUaW1lKSB0aGlzLmRlYnVnSW5mby5kZWx0YVRpbWUgPSBpbnB1dC5kZWx0YVRpbWU7XG4gICAgfVxuXG4gICAgZHJhd0JhY2tncm91bmQoKXtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJkcmF3aW5nIEJhY2tncm91bmRcIik7XG4gICAgICAgIC8vY2xlYXIgdGhlIGdhbWUgY2FudmFzXG4gICAgICAgIC8vIHRoaXMuYmFja2dyb3VuZFJlbmRlci5zYXZlKCk7XG4gICAgICAgIC8vIHRoaXMuYmFja2dyb3VuZFJlbmRlci5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgICAgIC8vIHRoaXMuYmFja2dyb3VuZFJlbmRlci5jbGVhclJlY3QoMCwgMCwgdGhpcy52aWV3V2lkdGgsdGhpcy52aWV3SGVpZ2h0KTtcbiAgICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLmJlZ2luUGF0aCgpO1xuICAgICAgICAvLyB0aGlzLmJhY2tncm91bmRSZW5kZXIucmVzdG9yZSgpO1xuXG4gICAgICAgIC8vZHJhdyBiYWNrZ3JvdW5kIGZpcnN0XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5zYXZlKCk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5maWxsUmVjdCgwLDAsdGhpcy52aWV3V2lkdGgsdGhpcy52aWV3SGVpZ2h0KTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLnJlc3RvcmUoKTtcblxuICAgICAgICAvLyBmb3IodmFyIHg9MDt4PHRoaXMud29ybGRXaWR0aDt4Kyspe1xuICAgICAgICAvLyAgICAgZm9yKHZhciB5PTA7eTx0aGlzLndvcmxkSGVpZ2h0O3krKyl7XG4gICAgICAgIGZvcih2YXIgeD0wO3g8dGhpcy52aWV3V2lkdGg7eCsrKXtcbiAgICAgICAgICAgIGZvcih2YXIgeT0wO3k8dGhpcy52aWV3SGVpZ2h0O3krKyl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5zdGFyc1t4XVt5XSA+IDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmJhY2tncm91bmRSZW5kZXIudHJhbnNsYXRlKHRoaXMuY2FtZXJhWCwgdGhpcy5jYW1lcmFZKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLnNjYWxlKHRoaXMuc2NhbGVGYWN0b3IsIHRoaXMuc2NhbGVGYWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5hcmMoeCwgeSwgdGhpcy5zdGFyc1t4XVt5XSwgMCwgMipNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLmZpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLnJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gLy9zdGFyIGRyYXcgYmFja2dyb3VuZFxuICAgIH1cblxuICAgIGRyYXdWaWV3KG9iamVjdHNUb1JlbmRlcil7XG5cbiAgICAgICAgLy9jbGVhciB0aGUgZ2FtZSBjYW52YXNcbiAgICAgICAgdGhpcy52aWV3UmVuZGVyLnNhdmUoKTtcbiAgICAgICAgdGhpcy52aWV3UmVuZGVyLnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICAgICAgdGhpcy52aWV3UmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB0aGlzLnZpZXdXaWR0aCx0aGlzLnZpZXdIZWlnaHQpO1xuICAgICAgICB0aGlzLnZpZXdSZW5kZXIuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMudmlld1JlbmRlci5yZXN0b3JlKCk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlZE9iamVjdHMgPSBvYmplY3RzVG9SZW5kZXI7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlZE9iamVjdHMuZm9yRWFjaCgob2JqZWN0KSA9PiB7XG4gICAgICAgICAgbGV0IHRyYW5zUG9zID0ge307XG4gICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC50eXBlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2lyY2xlXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRHJhd2luZzpcIixvYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1JlbmRlci5maWxsU3R5bGUgPSBvYmplY3QuZHJhdy5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UmVuZGVyLmxpbmVXaWR0aCA9IG9iamVjdC5kcmF3LnN0cm9rZVNpemU7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zUG9zID0gdGhpcy50cmFuc1dvcmxkUG9zVG9TY3JlZW5Qb3Mob2JqZWN0Lngsb2JqZWN0LnkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIuYXJjKHRyYW5zUG9zLngsIHRyYW5zUG9zLnksIG9iamVjdC5kcmF3LnJhZGl1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QuZHJhdy5zdGFydCwgb2JqZWN0LmRyYXcuZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UmVuZGVyLmZpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJlY3RcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJEcmF3aW5nOlwiLG9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1JlbmRlci5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UmVuZGVyLmZpbGxTdHlsZSA9IG9iamVjdC5kcmF3LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIuc3Ryb2tlU2l6ZSA9IG9iamVjdC5kcmF3LnN0cm9rZVNpemU7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zUG9zID0gdGhpcy50cmFuc1dvcmxkUG9zVG9TY3JlZW5Qb3Mob2JqZWN0Lngsb2JqZWN0LnkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIuYXJjKHRyYW5zUG9zLngsIHRyYW5zUG9zLnksIG9iamVjdC5kcmF3LnJhZGl1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QuZHJhdy5zdGFydCwgb2JqZWN0LmRyYXcuZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UmVuZGVyLmZpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvbnQga25vdyBob3cgdG8gZHJhdyBvYmplY3RcIiwgb2JqZWN0LnR5cGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5jbGVhclJlY3QoMCwgMCwgdGhpcy52aWV3V2lkdGgsIHRoaXMudmlld0hlaWdodCk7XG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5zYXZlKCk7XG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci50cmFuc2xhdGUoLXRoaXMuY2FtZXJhWCwgLXRoaXMuY2FtZXJhWSk7XG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5zY2FsZSh0aGlzLnNjYWxlRmFjdG9yLCB0aGlzLnNjYWxlRmFjdG9yKTtcbiAgICAgICAgLy93b3JsZCBlZGdlXG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5zdHJva2VTaXplID0gXCIyXCI7XG4gICAgICAgIC8vIGxldCBzaXplID0gdGhpcy5jb25maWcud29ybGRQaXhlbFdpZHRoIC0gKHRoaXMuY29uZmlnLm1hcmdpbioyKTtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLnJlY3QoMTAwICwxMDAsIHNpemUsIHNpemUpO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuc3Ryb2tlKCk7XG5cbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmJlZ2luUGF0aCgpO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFJlY3QoLTUwMCAsLTUwMCwgdGhpcy5jb25maWcudGlsZXNQaXhlbFNpemUsIHRoaXMuY29uZmlnLnRpbGVzUGl4ZWxTaXplKTtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmZpbGxTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmZpbGxSZWN0KDEwMCAsMTAwLCB0aGlzLmNvbmZpZy50aWxlc1BpeGVsU2l6ZSwgdGhpcy5jb25maWcudGlsZXNQaXhlbFNpemUpO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmZpbGxSZWN0KDEwMDAgLCAxMDAwLCB0aGlzLmNvbmZpZy50aWxlc1BpeGVsU2l6ZSwgdGhpcy5jb25maWcudGlsZXNQaXhlbFNpemUpO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFN0eWxlID0gXCJibHVlXCI7XG4gICAgICAgIC8vIGxldCByZWNYID0gTWF0aC5mbG9vcigodGhpcy5jb25maWcud29ybGRQaXhlbFdpZHRoIC8gMikgLSAodGhpcy5jb25maWcudGlsZXNQaXhlbFNpemUvMikpO1xuICAgICAgICAvLyBsZXQgcmVjWSA9IE1hdGguZmxvb3IoKHRoaXMuY29uZmlnLndvcmxkUGl4ZWxIZWlnaHQgLyAyKSAtICh0aGlzLmNvbmZpZy50aWxlc1BpeGVsU2l6ZS8yKSk7XG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5maWxsUmVjdChyZWNYICwgcmVjWSwgdGhpcy5jb25maWcudGlsZXNQaXhlbFNpemUsIHRoaXMuY29uZmlnLnRpbGVzUGl4ZWxTaXplKTtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmZpbGxTdHlsZSA9IFwieWVsbG93XCI7XG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5maWxsUmVjdCh0aGlzLmNvbmZpZy53b3JsZFBpeGVsV2lkdGggLSAodGhpcy5jb25maWcubWFyZ2luKjIpICxcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNvbmZpZy53b3JsZFBpeGVsSGVpZ2h0IC0gKHRoaXMuY29uZmlnLm1hcmdpbioyKSwgdGhpcy5jb25maWcudGlsZXNQaXhlbFNpemUsIHRoaXMuY29uZmlnLnRpbGVzUGl4ZWxTaXplKTtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmNsb3NlUGF0aCgpO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIGRyYXdHdWkoKXtcbiAgICAgICAgLy9jbGVhciB0aGUgZ2FtZSBjYW52YXNcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuc2F2ZSgpO1xuICAgICAgICAvLyB0aGlzLmh1ZFJlbmRlci5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgICAgIHRoaXMuaHVkUmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB0aGlzLnZpZXdXaWR0aCx0aGlzLnZpZXdIZWlnaHQpO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5odWRSZW5kZXIucmVzdG9yZSgpO1xuXG4gICAgICAgIC8vY2VudGVyIG9mIHZpZXdcbiAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLnZpZXdXaWR0aCAvIDI7XG4gICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy52aWV3SGVpZ2h0IC8gMjtcbiAgICAgICAgbGV0IHNpemUgPSAyMDtcbiAgICAgICAgdGhpcy5kcmF3Q3Jvc3NoYWlyKGNlbnRlclgsIGNlbnRlclksIHNpemUpO1xuICAgICAgICB0aGlzLmRyYXdDcm9zc2hhaXIodGhpcy5kZWJ1Z0luZm8ubW91c2VYLCB0aGlzLmRlYnVnSW5mby5tb3VzZVksIDEwKTtcblxuICAgICAgICAvL3VwcGVyTGVmdCBEZWJ1ZyBTdGF0c1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5zYXZlKCk7XG4gICAgICAgIGxldCBzcGFjZWluZyA9IDIwO1xuICAgICAgICBsZXQgY3VycmVudFlGb250ID0gMjA7XG4gICAgICAgIHRoaXMuaHVkUmVuZGVyLmZvbnQgPSBcIjIwcHggQXJpYWxcIjtcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFN0eWxlID0gXCJvcmFuZ2VcIjtcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJGUFM6XCIrdGhpcy5kZWJ1Z0luZm8uYXZnRlBTLCAwLCBjdXJyZW50WUZvbnQpO1xuICAgICAgICBjdXJyZW50WUZvbnQgPSBjdXJyZW50WUZvbnQgKyBzcGFjZWluZztcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJEZWx0YVRpbWU6XCIrdGhpcy5kZWJ1Z0luZm8uZGVsdGFUaW1lLCAwLCBjdXJyZW50WUZvbnQpO1xuICAgICAgICBjdXJyZW50WUZvbnQgPSBjdXJyZW50WUZvbnQgKyBzcGFjZWluZztcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJQaW5nOiBwaW5nXCIsIDAsIGN1cnJlbnRZRm9udCk7XG4gICAgICAgIGN1cnJlbnRZRm9udCA9IGN1cnJlbnRZRm9udCArIHNwYWNlaW5nO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5maWxsVGV4dChcIk1vdXNlVmlldzpcIit0aGlzLmRlYnVnSW5mby5tb3VzZVgrXCIsXCIrdGhpcy5kZWJ1Z0luZm8ubW91c2VZLCAwLCBjdXJyZW50WUZvbnQpO1xuICAgICAgICBjdXJyZW50WUZvbnQgPSBjdXJyZW50WUZvbnQgKyBzcGFjZWluZztcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJNb3VzZVdvcmxkOlwiKyh0aGlzLmRlYnVnSW5mby5tb3VzZVggKyB0aGlzLmNhbWVyYVgpK1wiLFwiK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmRlYnVnSW5mby5tb3VzZVkgKyB0aGlzLmNhbWVyYVkpLCAwLCBjdXJyZW50WUZvbnQpO1xuICAgICAgICBjdXJyZW50WUZvbnQgPSBjdXJyZW50WUZvbnQgKyBzcGFjZWluZztcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJWaWV3U2l6ZTpcIit0aGlzLnZpZXdXaWR0aCtcIixcIit0aGlzLnZpZXdIZWlnaHQsIDAsIGN1cnJlbnRZRm9udCk7XG4gICAgICAgIGN1cnJlbnRZRm9udCA9IGN1cnJlbnRZRm9udCArIHNwYWNlaW5nO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5maWxsVGV4dChcIkNhbWVyYTpcIit0aGlzLmNhbWVyYVgrXCIsXCIrdGhpcy5jYW1lcmFZLCAwLCBjdXJyZW50WUZvbnQpO1xuICAgICAgICBjdXJyZW50WUZvbnQgPSBjdXJyZW50WUZvbnQgKyBzcGFjZWluZztcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJSZW5kZXJlZE9iamVjdHM6XCIrdGhpcy5yZW5kZXJlZE9iamVjdHMubGVuZ3RoLCAwLCBjdXJyZW50WUZvbnQpO1xuICAgICAgICBjdXJyZW50WUZvbnQgPSBjdXJyZW50WUZvbnQgKyBzcGFjZWluZztcbiAgICAgICAgdGhpcy5odWRSZW5kZXIucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIGRyYXdDcm9zc2hhaXIoeCx5LHNpemUpe1xuICAgICAgdGhpcy5odWRSZW5kZXIuc3Ryb2tlU2l6ZSA9IDI7XG4gICAgICB0aGlzLmh1ZFJlbmRlci5zdHJva2VTdHlsZSA9IFwicGlua1wiO1xuICAgICAgdGhpcy5odWRSZW5kZXIuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmh1ZFJlbmRlci5tb3ZlVG8oeCArIHNpemUsIHkpO1xuICAgICAgdGhpcy5odWRSZW5kZXIubGluZVRvKHggLSBzaXplLCB5KTtcbiAgICAgIHRoaXMuaHVkUmVuZGVyLnN0cm9rZSgpO1xuICAgICAgdGhpcy5odWRSZW5kZXIuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmh1ZFJlbmRlci5tb3ZlVG8oeCwgeSArIHNpemUpO1xuICAgICAgdGhpcy5odWRSZW5kZXIubGluZVRvKHgsIHkgLSBzaXplKTtcbiAgICAgIHRoaXMuaHVkUmVuZGVyLnN0cm9rZSgpO1xuICAgIH1cblxufS8vUmVuZGVyQ2FudmFzIGNsYXNzXG4iLCJpbXBvcnQgQ2xpZW50R2FtZUVuZ2luZSBmcm9tICcuLi9jbGllbnRFbmdpbmVTcmMvbWFpbi5qcyc7XG5cbmxldCBudW1PZlRpbGVzWCA9IDEwMjQ7XG5sZXQgbnVtT2ZUaWxlc1kgPSAxMDI0O1xubGV0IHRpbGVzUGl4ZWxTaXplID0gMzI7XG5sZXQgd29ybGRQaXhlbFdpZHRoID0gbnVtT2ZUaWxlc1ggKiB0aWxlc1BpeGVsU2l6ZTsgLy8zMiw3NjggbWlkZGxlIGlzIDE2Mzg0XG5sZXQgd29ybGRQaXhlbEhlaWdodCA9IG51bU9mVGlsZXNZICogdGlsZXNQaXhlbFNpemU7XG5sZXQgbWFyZ2luID0gdGlsZXNQaXhlbFNpemUgKiAyO1xuXG5sZXQgREVCVUcgPSB7XG4gICAgaW5wdXQ6IHRydWUsXG4gICAgcmVuZGVyOiBmYWxzZSxcbiAgICBHU006IGZhbHNlLFxufTtcblxudmFyIGNvbmZpZyA9IHtcbiAgICB3b3JsZFBpeGVsV2lkdGg6IHdvcmxkUGl4ZWxXaWR0aCxcbiAgICB3b3JsZFBpeGVsSGVpZ2h0OiB3b3JsZFBpeGVsSGVpZ2h0LFxuICAgIHRpbGVzUGl4ZWxTaXplOiB0aWxlc1BpeGVsU2l6ZSxcbiAgICBtYXJnaW46IG1hcmdpbixcbiAgICBERUJVRzogREVCVUdcbn1cblxudmFyIEVuZ2luZSA9IG5ldyBDbGllbnRHYW1lRW5naW5lKGNvbmZpZyk7XG5cbkVuZ2luZS5hZGRLZXlNYXBwaW5nKHtrZXk6IFwid1wiLCBhY3Rpb246IFwicGFuQ2FtZXJhXCIsIGlucHV0OiB7eDowLCB5Oi0xfX0pO1xuRW5naW5lLmFkZEtleU1hcHBpbmcoe2tleTogXCJhXCIsIGFjdGlvbjogXCJwYW5DYW1lcmFcIiwgaW5wdXQ6IHt4Oi0xLCB5OjB9fSk7XG5FbmdpbmUuYWRkS2V5TWFwcGluZyh7a2V5OiBcInNcIiwgYWN0aW9uOiBcInBhbkNhbWVyYVwiLCBpbnB1dDoge3g6MCwgeToxfX0pO1xuRW5naW5lLmFkZEtleU1hcHBpbmcoe2tleTogXCJkXCIsIGFjdGlvbjogXCJwYW5DYW1lcmFcIiwgaW5wdXQ6IHt4OjEsIHk6MH19KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=