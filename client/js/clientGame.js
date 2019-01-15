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
        this.renderCanvas = new _render_js__WEBPACK_IMPORTED_MODULE_0__["default"](config);
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

        //get and process client Input
        this.userInput = this.input.getInput();
        this.userInput.forEach((UserAction)=>{
                console.log(UserAction);
                // this.rendeUserAction

        });

        //process latest server update if any

        //step and extrapolate between updates/frames
            //this should be done in fixed time steps with a
            //calulation on time lost between updates (lag)
            //then looped to allow multiple between frame renders if neccissary




        //get objects to Render in View
        let objectsToRender = this.gameStateManager.getObjectsInRange(
            this.renderCanvas.cameraX, this.renderCanvas.cameraX + this.renderCanvas.viewWidth,
            this.renderCanvas.cameraY, this.renderCanvas.cameraY + this.renderCanvas.viewHeight);
        //render frame
        this.renderCanvas.drawView(objectsToRender);


        this.renderCanvas.drawGui({
            avgFPS: this.avgFPS,
            deltaTime: this.deltaTime
        });
        window.requestAnimationFrame(this.mainLoop.bind(this));
    }
}


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

        //background stars
        this.stars = [];

        //debug
        this.debug = {
            mouseX: 0,
            mouseY: 0
        }

        this.DEBUG = config.DEBUG;

        this.worldPixelWidth = config.worldPixelWidth;
        this.worldPixelHeight = config.worldPixelHeight;

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
       let middleWorldX = Math.floor(this.worldPixelWidth / 2);
       let middleWorldY = Math.floor(this.worldPixelHeight / 2);
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
        if(this.DEBUG && this.DEBUG.render) console.log("zoom: ",
            this.scaleFactor, this.cameraX, this.cameraY);
        // this.drawBackground();
    }

    panView(x,y){
        let panSpeed = 100;
        if(this.DEBUG && this.DEBUG.render) console.log("panView: ",x,y,panSpeed);
        // let cameraCenter = this.getCameraCenter();
        let moveToX = this.cameraX + (x * panSpeed);
        let moveToY = this.cameraY + (y * panSpeed);
        let marginW = Math.floor((this.viewWidth) + gameStateManager.margin);
        let marginH = Math.floor((this.viewHeight) + gameStateManager.margin);
        let widthUpperBound = this.worldPixelWidth - marginW;
        let heightUpperBound = this.worldPixelHeight - marginH;
        if(moveToX < gameStateManager.margin) moveToX = gameStateManager.margin;
        if(moveToX > widthUpperBound) moveToX = widthUpperBound;
        if(moveToY < gameStateManager.margin) moveToY = gameStateManager.margin;
        if(moveToY > heightUpperBound) moveToY = heightUpperBound;
        this.setCamera(moveToX, moveToY);
        if(this.DEBUG && this.DEBUG.render) console.log("panView:",
            this.cameraX, this.cameraY, "scale:", this.scaleFactor);
        // this.drawBackground();
    }

    //Sets camera center at position in gameWorld
    setCameraCenter(x, y){
      if(this.DEBUG && this.DEBUG.render) console.log("set Camera BEFORE", this.cameraX, this.cameraY);
      if(this.DEBUG && this.DEBUG.render) console.log("setCamera:", x, y);
      let centerX = Math.floor(x - (this.viewWidth / 2));
      let centerY = Math.floor(y - (this.viewHeight / 2));
      this.cameraX = centerX;
      this.cameraY = centerY;
      if(this.DEBUG && this.DEBUG.render) console.log("set Camera AFTER", this.cameraX, this.cameraY);
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
        // let size = this.worldPixelWidth - (gameStateManager.margin*2);
        // this.viewRender.rect(100 ,100, size, size);
        // this.viewRender.stroke();

        // this.viewRender.beginPath();
        // this.viewRender.fillStyle = "white";
        // this.viewRender.fillRect(-500 ,-500, gameStateManager.tilesPixelSize, gameStateManager.tilesPixelSize);
        // this.viewRender.fillStyle = "green";
        // this.viewRender.fillRect(100 ,100, gameStateManager.tilesPixelSize, gameStateManager.tilesPixelSize);
        // this.viewRender.fillStyle = "red";
        // this.viewRender.fillRect(1000 , 1000, gameStateManager.tilesPixelSize, gameStateManager.tilesPixelSize);
        // this.viewRender.fillStyle = "blue";
        // let recX = Math.floor((this.worldPixelWidth / 2) - (gameStateManager.tilesPixelSize/2));
        // let recY = Math.floor((this.worldPixelHeight / 2) - (gameStateManager.tilesPixelSize/2));
        // this.viewRender.fillRect(recX , recY, gameStateManager.tilesPixelSize, gameStateManager.tilesPixelSize);
        // this.viewRender.fillStyle = "yellow";
        // this.viewRender.fillRect(this.worldPixelWidth - (gameStateManager.margin*2) ,
        //         this.worldPixelHeight - (gameStateManager.margin*2), gameStateManager.tilesPixelSize, gameStateManager.tilesPixelSize);
        // this.viewRender.closePath();
        // this.viewRender.restore();
    }

    drawGui(info){
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
        this.hudRender.strokeSize = 2;
        this.hudRender.strokeStyle = "pink";
        this.hudRender.beginPath();
        this.hudRender.moveTo(centerX + size, centerY);
        this.hudRender.lineTo(centerX - size, centerY);
        this.hudRender.stroke();
        this.hudRender.beginPath();
        this.hudRender.moveTo(centerX, centerY + size);
        this.hudRender.lineTo(centerX, centerY - size);
        this.hudRender.stroke();

        //upperLeft Debug Stats
        this.hudRender.save();
        let spaceing = 20;
        let currentYFont = 20;
        this.hudRender.font = "20px Arial";
        this.hudRender.fillStyle = "orange";
        this.hudRender.fillText("FPS:"+info.avgFPS, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("DeltaTime:"+info.deltaTime, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("Ping: ping", 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("MouseView:"+this.debug.mouseX+","+this.debug.mouseY, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("MouseWorld:"+(this.debug.mouseX + this.cameraX)+","+
                                              (this.debug.mouseY + this.cameraY), 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("ViewSize:"+this.viewWidth+","+this.viewHeight, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("Camera:"+this.cameraX+","+this.cameraY, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.fillText("RenderedObjects:"+this.renderedObjects.length, 0, currentYFont);
        currentYFont = currentYFont + spaceing;
        this.hudRender.restore();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50RW5naW5lU3JjL2dhbWVTdGF0ZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50RW5naW5lU3JjL2lucHV0LmpzIiwid2VicGFjazovLy8uL2NsaWVudEVuZ2luZVNyYy9tYWluLmpzIiwid2VicGFjazovLy8uL2NsaWVudEVuZ2luZVNyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50R2FtZVNyYy9nYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFlO0FBQ2Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDbkdEO0FBQUE7QUFBQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDM0ZEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBdUM7QUFDUjtBQUNzQjs7QUFFckQ7QUFDZTtBQUNmOztBQUVBOztBQUVBLG9DQUFvQyw0REFBZ0I7QUFDcEQ7QUFDQSxnQ0FBZ0Msa0RBQVk7QUFDNUMseUJBQXlCLGlEQUFLOztBQUU5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckZBO0FBQUE7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsa0JBQWtCO0FBQ3pDLDJCQUEyQixtQkFBbUI7QUFDOUMsb0JBQW9CLGlCQUFpQjtBQUNyQyx3QkFBd0Isa0JBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3BURDtBQUFBO0FBQTBEOztBQUUxRDtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixnRUFBZ0I7O0FBRWpDLHNCQUFzQix1Q0FBdUMsV0FBVztBQUN4RSxzQkFBc0IsdUNBQXVDLFdBQVc7QUFDeEUsc0JBQXNCLHVDQUF1QyxVQUFVO0FBQ3ZFLHNCQUFzQix1Q0FBdUMsVUFBVSIsImZpbGUiOiJjbGllbnRHYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9jbGllbnRHYW1lU3JjL2dhbWUuanNcIik7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVNYW5hZ2Vye1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cbiAgICAgICAgdGhpcy5vYmplY3RzID0gW107XG5cbiAgICAgICAgLy9Xb3JsZCBTdHVmZlxuICAgICAgICB0aGlzLnRpbGVzUGl4ZWxTaXplID0gY29uZmlnLnRpbGVzUGl4ZWxTaXplO1xuICAgICAgICB0aGlzLndvcmxkUGl4ZWxXaWR0aCA9IGNvbmZpZy53b3JsZFBpeGVsV2lkdGg7XG4gICAgICAgIHRoaXMud29ybGRQaXhlbEhlaWdodCA9IGNvbmZpZy53b3JsZFBpeGVsV2lkdGg7XG4gICAgICAgIHRoaXMubWFyZ2luID0gY29uZmlnLndvcmxkUGl4ZWxXaWR0aDtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVTdGF0ZU1hbmFnZXIgcnVubmluZ1wiKTtcbiAgICB9XG5cbiAgICBpbml0YWxpemUoKXtcblxuICAgIH1cblxuICAgIGluaXRhbGl6ZURlYnVnT2JqZWN0cygpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImZpbmlzaGVkIGNyZWF0aW5nIERlYnVnIGdhbWUgb2JqZWN0c1wiKTtcbiAgICAgICAgLy93b3JsZCBlZGdlXG5cbiAgICAgICAgdGhpcy5hZGRPYmplY3QoXCJPdXRlciBCb3VuZHNcIiwgdGhpcy5tYXJnaW4sIHRoaXMubWFyZ2luLCBcInJlY3RcIiwge1xuICAgICAgICAgICAgY29sb3I6IFwicmVkXCIsXG4gICAgICAgICAgICBzdHJva2VTaXplOiAyLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud29ybGRQaXhlbFdpZHRoIC0gKHRoaXMubWFyZ2luICogMiksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMud29ybGRQaXhlbEhlaWdodCAtICh0aGlzLm1hcmdpbiAqIDIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkT2JqZWN0KFwib3V0IG9mIGJvdW5kc1wiLCAtNTAwLCAtNTAwLCBcImNpcmNsZVwiLCB7XG4gICAgICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgcmFkaXVzOiAodGhpcy50aWxlc1BpeGVsU2l6ZS8yKSxcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgZW5kOiBNYXRoLlBJICogMixcbiAgICAgICAgICAgIHN0cm9rZVNpemU6IDJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRPYmplY3QoXCJmaXJzdFwiLCB0aGlzLm1hcmdpbiwgdGhpcy5tYXJnaW4sIFwiY2lyY2xlXCIsIHtcbiAgICAgICAgICAgIGNvbG9yOiBcImdyZWVuXCIsXG4gICAgICAgICAgICByYWRpdXM6ICh0aGlzLnRpbGVzUGl4ZWxTaXplLzIpLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IE1hdGguUEkgKiAyLFxuICAgICAgICAgICAgc3Ryb2tlU2l6ZTogMlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZE9iamVjdChcInNlY29uZFwiLCAxMDAwLCAxMDAwLCBcImNpcmNsZVwiLCB7XG4gICAgICAgICAgICBjb2xvcjogXCJyZWRcIixcbiAgICAgICAgICAgIHJhZGl1czogKHRoaXMudGlsZXNQaXhlbFNpemUvMiksXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogTWF0aC5QSSAqIDIsXG4gICAgICAgICAgICBzdHJva2VTaXplOiAyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjZW50ZXJYID0gTWF0aC5mbG9vcigodGhpcy53b3JsZFBpeGVsV2lkdGggLyAyKSk7XG4gICAgICAgIGxldCBjZW50ZXJZID0gTWF0aC5mbG9vcigodGhpcy53b3JsZFBpeGVsSGVpZ2h0IC8gMikpO1xuICAgICAgICB0aGlzLmFkZE9iamVjdChcIm1pZGRsZVwiLCBjZW50ZXJYLCBjZW50ZXJZLCBcImNpcmNsZVwiLCB7XG4gICAgICAgICAgICBjb2xvcjogXCJibHVlXCIsXG4gICAgICAgICAgICByYWRpdXM6ICh0aGlzLnRpbGVzUGl4ZWxTaXplLzIpLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IE1hdGguUEkgKiAyLFxuICAgICAgICAgICAgc3Ryb2tlU2l6ZTogMlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZE9iamVjdChcImVuZFwiLCB0aGlzLndvcmxkUGl4ZWxXaWR0aCAtICh0aGlzLm1hcmdpbioyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGRQaXhlbEhlaWdodCAtICh0aGlzLm1hcmdpbioyKSwgXCJjaXJjbGVcIiwge1xuICAgICAgICAgICAgY29sb3I6IFwieWVsbG93XCIsXG4gICAgICAgICAgICByYWRpdXM6ICh0aGlzLnRpbGVzUGl4ZWxTaXplLzIpLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBlbmQ6IE1hdGguUEkgKiAyLFxuICAgICAgICAgICAgc3Ryb2tlU2l6ZTogMlxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGFkZE9iamVjdChuYW1lLCB4LCB5LCB0eXBlLCBkcmF3KXtcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGRyYXc6IGRyYXdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0T2JqZWN0c0luUmFuZ2Uoc3RhcnRYLCBlbmRYLCBzdGFydFksIGVuZFkpe1xuICAgICAgICAvL2FkZCBzb21lIGJ1ZmZlciBmb3IgcGFydGlhbCB0aWxlc1xuICAgICAgICBzdGFydFggPSBzdGFydFggLSB0aGlzLnRpbGVzUGl4ZWxTaXplO1xuICAgICAgICBlbmRYID0gZW5kWCArIHRoaXMudGlsZXNQaXhlbFNpemU7XG4gICAgICAgIHN0YXJ0WSA9IHN0YXJ0WSAtIHRoaXMudGlsZXNQaXhlbFNpemU7XG4gICAgICAgIGVuZFkgPSBlbmRZIC0gdGhpcy50aWxlc1BpeGVsU2l6ZTtcbiAgICAgICAgbGV0IHRlbXBSZXR1cm4gPSBbXTtcbiAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goKG9iamVjdCk9PntcbiAgICAgICAgICAgIGlmKHN0YXJ0WCA8IG9iamVjdC54ICYmIG9iamVjdC54IDwgZW5kWCAmJlxuICAgICAgICAgICAgICAgc3RhcnRZIDwgb2JqZWN0LnkgJiYgb2JqZWN0LnkgPCBlbmRZKXtcbiAgICAgICAgICAgICAgICAgICB0ZW1wUmV0dXJuLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0ZW1wUmV0dXJuO1xuICAgIH1cbn0vL2VuZCBjbGFzcyBHYW1lU3RhdGVNYW5hZ2VyXG4iLCIvL1Byb2Nlc3MgdXNlciBpbnB1dFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xzKXtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5zY3JvbGxFdmVudCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlQcmVzc0Rvd25FdmVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5rZXlQcmVzc1VwRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUV2ZW50LmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vbW91c2VcbiAgICAgICAgdGhpcy5tb3VzZVggPSBudWxsO1xuICAgICAgICB0aGlzLm1vdXNlWSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jYW1lcmFTcGVlZCA9IDEwMDtcblxuICAgICAgICB0aGlzLmNvbnRyb2xzID0ge307XG5cbiAgICAgICAgdGhpcy51c2VyQWN0aW9ucyA9IFtdO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwibm93IHByb2Nlc3NpbmcgdXNlciBpbnB1dFwiKTtcbiAgICB9Ly9jb25zdHJ1Y3RvclxuXG4gICAgYWRkS2V5TWFwcGluZyh7XG4gICAgICAgIGtleSxcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICBpbnB1dFxuICAgIH0pe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFkZEtleU1hcHBpbmc6XCIsIGtleSwgYWN0aW9uLCBpbnB1dCk7XG4gICAgICAgIHRoaXMuY29udHJvbHNba2V5XSA9IHtcbiAgICAgICAgICAgIGRvd246IGZhbHNlLFxuICAgICAgICAgICAgaGVsZENvdW50OiAwLFxuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBpbnB1dDogaW5wdXRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhbkNhbWVyYSh7XG4gICAgICAgIHgsIHlcbiAgICB9KXtcbiAgICAgICAgY29uc29sZS5sb2coXCJwYW5DYW1lcmFcIiwgeCwgeSk7XG4gICAgfVxuXG5cbiAgICAvL3JldHVybiB1c2VyQWN0aW9ucyBhbmQgY2xlYXJcbiAgICBnZXRJbnB1dCgpe1xuICAgICAgICBsZXQgdGVtcFJldHVybiA9IHRoaXMudXNlckFjdGlvbnM7XG4gICAgICAgIHRoaXMudXNlckFjdGlvbnMgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRlbXBSZXR1cm47XG4gICAgICAgIC8vdGVzdFxuICAgIH1cblxuICAgIHNjcm9sbEV2ZW50KGUpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNjcm9sbCBldmVudDpcIiwgZSk7XG4gICAgICAgIC8vIHJlbmRlckNhbnZhcy56b29tVmlldyhlLmRlbHRhWSwgZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIH1cblxuICAgIGtleVByZXNzRG93bkV2ZW50KGUpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImtleXByZXNzIERvd246IFwiLCBlLmtleSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwia2V5cHJlc3MgRG93biBldmVudDogXCIsIGUpO1xuICAgICAgICBpZih0eXBlb2YgdGhpcy5jb250cm9sc1tlLmtleV0gPT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS2V5IG5vdCBpbiB1c2VcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGtleVByZXNzZWQgPSB0aGlzLmNvbnRyb2xzW2Uua2V5XTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coa2V5UHJlc3NlZCk7XG4gICAgICAgIC8vdGhpc1trZXlQcmVzc2VkLmFjdGlvbl0oa2V5UHJlc3NlZC5pbnB1dCk7XG4gICAgICAgIHRoaXMudXNlckFjdGlvbnMucHVzaChrZXlQcmVzc2VkKTtcbiAgICAgICAga2V5UHJlc3NlZC5kb3duID0gdHJ1ZTtcbiAgICAgICAga2V5UHJlc3NlZC5oZWxkQ291bnQrKztcbiAgICB9XG5cbiAgICBrZXlQcmVzc1VwRXZlbnQoZSl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwia2V5cHJlc3MgVXA6IFwiLCBlLmtleSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwia2V5UHJlc3NVcEV2ZW50OiBcIiwgZSk7XG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLmNvbnRyb2xzW2Uua2V5XSA9PT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZXkgbm90IGluIHVzZVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQga2V5UHJlc3NlZCA9IHRoaXMuY29udHJvbHNbZS5rZXldO1xuICAgICAgICAvLyB0aGlzW2tleVByZXNzZWQuYWN0aW9uXShrZXlQcmVzc2VkLmlucHV0KTtcbiAgICAgICAga2V5UHJlc3NlZC5kb3duID0gZmFsc2U7XG4gICAgICAgIGtleVByZXNzZWQuaGVsZENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBtb3VzZU1vdmVFdmVudChlKXtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZS5vZmZzZXRYLCBlLm9mZnNldFkpO1xuICAgICAgICB0aGlzLm1vdXNlWCA9IGUub2Zmc2V0WDtcbiAgICAgICAgdGhpcy5tb3VzZVkgPSBlLm9mZnNldFk7XG4gICAgICAgIC8vIHJlbmRlckNhbnZhcy5kZWJ1Zy5tb3VzZVggPSB0aGlzLm1vdXNlWDtcbiAgICAgICAgLy8gcmVuZGVyQ2FudmFzLmRlYnVnLm1vdXNlWSA9IHRoaXMubW91c2VZO1xuICAgIH1cblxufS8vaW5wdXQgY2xhc3NcbiIsImltcG9ydCBSZW5kZXJDYW52YXMgZnJvbSAnLi9yZW5kZXIuanMnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vaW5wdXQuanMnO1xuaW1wb3J0IEdhbWVTdGF0ZU1hbmFnZXIgZnJvbSAnLi9nYW1lU3RhdGVNYW5hZ2VyLmpzJztcblxuY29uc29sZS5sb2coXCJCdW5kbGUgY2xpZW50IEVuZ2luZSBMb2FkZWRcIik7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnRHYW1lRW5naW5lIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpe1xuXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlTWFuYWdlciA9IG5ldyBHYW1lU3RhdGVNYW5hZ2VyKGNvbmZpZyk7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLkRFQlVHICYmIHRoaXMuY29uZmlnLkRFQlVHLkdTTSkgdGhpcy5nYW1lU3RhdGVNYW5hZ2VyLmluaXRhbGl6ZURlYnVnT2JqZWN0cygpO1xuICAgICAgICB0aGlzLnJlbmRlckNhbnZhcyA9IG5ldyBSZW5kZXJDYW52YXMoY29uZmlnKTtcbiAgICAgICAgdGhpcy5pbnB1dCA9IG5ldyBJbnB1dChjb25maWcpO1xuXG4gICAgICAgIC8vIGxldCB0ZXN0Tm9kZSA9IG5ldyBFbmVyZ3lOb2RlLmluaXQoXCJzdHJpbmcgaW4gYnJvd3NlclwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGVzdE5vZGUudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgLy9Mb29wIFN0YXRzXG4gICAgICAgIHRoaXMuYXZnRlBTID0gMDtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSAwO1xuICAgICAgICB0aGlzLmV2ZXJ5U2Vjb25kQ291bnREb3duID0gMTAwMDtcbiAgICAgICAgdGhpcy5sYXN0RnJhbWVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuZGVsdGFUaW1lID0gMDtcbiAgICAgICAgdGhpcy50aW1lc3RlcCA9IDIwOyAvL21zID0gbWlsbGlzZWNvbmRzXG5cbiAgICAgICAgLy9Vc2VySW5wdXRcbiAgICAgICAgdGhpcy51c2VySW5wdXQgPSBbXTtcblxuICAgICAgICAvL1N0YXJ0IE1haW4gTG9vcFxuICAgICAgICBjb25zb2xlLmxvZyhcIkZpbmlzaGVkIGxvYWRpbmdcIik7XG4gICAgICAgIHRoaXMubWFpbkxvb3AoKTtcbiAgICB9XG5cbiAgICBhZGRLZXlNYXBwaW5nKGtleXMpe1xuICAgICAgICB0aGlzLmlucHV0LmFkZEtleU1hcHBpbmcoa2V5cyk7XG4gICAgfVxuXG4gICAgbWFpbkxvb3AoKXtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLU1haW5sb29wLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgLy9wcm9jZXNzIHJlYWwtdGltZSBzdGF0c1xuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuZGVsdGFUaW1lID0gbm93IC0gdGhpcy5sYXN0RnJhbWVUaW1lO1xuICAgICAgICB0aGlzLmxhc3RGcmFtZVRpbWUgPSBub3c7XG4gICAgICAgIHRoaXMuZXZlcnlTZWNvbmRDb3VudERvd24gPSB0aGlzLmV2ZXJ5U2Vjb25kQ291bnREb3duIC0gdGhpcy5kZWx0YVRpbWU7XG4gICAgICAgIHRoaXMuZnJhbWVzKys7XG4gICAgICAgIGlmKHRoaXMuZXZlcnlTZWNvbmRDb3VudERvd24gPCAwKXtcbiAgICAgICAgICAgIHRoaXMuYXZnRlBTID0gTWF0aC5yb3VuZCgodGhpcy5mcmFtZXMgKiAwLjgpICsgKHRoaXMuYXZnRlBTICogMC4yKSk7XG4gICAgICAgICAgICB0aGlzLmZyYW1lcyA9IDA7XG4gICAgICAgICAgICB0aGlzLmV2ZXJ5U2Vjb25kQ291bnREb3duID0gMTAwMDtcbiAgICAgICAgICAgIC8vIHJlbmRlckNhbnZhcy5kcmF3QmFja2dyb3VuZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9nZXQgYW5kIHByb2Nlc3MgY2xpZW50IElucHV0XG4gICAgICAgIHRoaXMudXNlcklucHV0ID0gdGhpcy5pbnB1dC5nZXRJbnB1dCgpO1xuICAgICAgICB0aGlzLnVzZXJJbnB1dC5mb3JFYWNoKChVc2VyQWN0aW9uKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFVzZXJBY3Rpb24pO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMucmVuZGVVc2VyQWN0aW9uXG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9wcm9jZXNzIGxhdGVzdCBzZXJ2ZXIgdXBkYXRlIGlmIGFueVxuXG4gICAgICAgIC8vc3RlcCBhbmQgZXh0cmFwb2xhdGUgYmV0d2VlbiB1cGRhdGVzL2ZyYW1lc1xuICAgICAgICAgICAgLy90aGlzIHNob3VsZCBiZSBkb25lIGluIGZpeGVkIHRpbWUgc3RlcHMgd2l0aCBhXG4gICAgICAgICAgICAvL2NhbHVsYXRpb24gb24gdGltZSBsb3N0IGJldHdlZW4gdXBkYXRlcyAobGFnKVxuICAgICAgICAgICAgLy90aGVuIGxvb3BlZCB0byBhbGxvdyBtdWx0aXBsZSBiZXR3ZWVuIGZyYW1lIHJlbmRlcnMgaWYgbmVjY2lzc2FyeVxuXG5cblxuXG4gICAgICAgIC8vZ2V0IG9iamVjdHMgdG8gUmVuZGVyIGluIFZpZXdcbiAgICAgICAgbGV0IG9iamVjdHNUb1JlbmRlciA9IHRoaXMuZ2FtZVN0YXRlTWFuYWdlci5nZXRPYmplY3RzSW5SYW5nZShcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ2FudmFzLmNhbWVyYVgsIHRoaXMucmVuZGVyQ2FudmFzLmNhbWVyYVggKyB0aGlzLnJlbmRlckNhbnZhcy52aWV3V2lkdGgsXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNhbnZhcy5jYW1lcmFZLCB0aGlzLnJlbmRlckNhbnZhcy5jYW1lcmFZICsgdGhpcy5yZW5kZXJDYW52YXMudmlld0hlaWdodCk7XG4gICAgICAgIC8vcmVuZGVyIGZyYW1lXG4gICAgICAgIHRoaXMucmVuZGVyQ2FudmFzLmRyYXdWaWV3KG9iamVjdHNUb1JlbmRlcik7XG5cblxuICAgICAgICB0aGlzLnJlbmRlckNhbnZhcy5kcmF3R3VpKHtcbiAgICAgICAgICAgIGF2Z0ZQUzogdGhpcy5hdmdGUFMsXG4gICAgICAgICAgICBkZWx0YVRpbWU6IHRoaXMuZGVsdGFUaW1lXG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubWFpbkxvb3AuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpe1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5pbml0Q2FudmFzLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgdGhpcy52aWV3Q2FudmFzID0gbnVsbDtcbiAgICAgICAgdGhpcy52aWV3UmVuZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzID0gbnVsbDtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5odWRDYW52YXMgPSBudWxsO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlciA9IG51bGw7XG4gICAgICAgIHRoaXMudmlld1dpZHRoID0gMDtcbiAgICAgICAgdGhpcy52aWV3SGVpZ2h0ID0gMDtcblxuICAgICAgICAvL2ZvciB6b29tIGFuZCBwYW5uaW5nXG4gICAgICAgIHRoaXMuc2NhbGVGYWN0b3IgPSAxLjAwO1xuICAgICAgICB0aGlzLmNhbWVyYVggPSAwO1xuICAgICAgICB0aGlzLmNhbWVyYVkgPSAwO1xuXG4gICAgICAgIC8vYmFja2dyb3VuZCBzdGFyc1xuICAgICAgICB0aGlzLnN0YXJzID0gW107XG5cbiAgICAgICAgLy9kZWJ1Z1xuICAgICAgICB0aGlzLmRlYnVnID0ge1xuICAgICAgICAgICAgbW91c2VYOiAwLFxuICAgICAgICAgICAgbW91c2VZOiAwXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLkRFQlVHID0gY29uZmlnLkRFQlVHO1xuXG4gICAgICAgIHRoaXMud29ybGRQaXhlbFdpZHRoID0gY29uZmlnLndvcmxkUGl4ZWxXaWR0aDtcbiAgICAgICAgdGhpcy53b3JsZFBpeGVsSGVpZ2h0ID0gY29uZmlnLndvcmxkUGl4ZWxIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlZE9iamVjdHMgPSBbXTtcblxuICAgICAgICB0aGlzLmluaXRDYW52YXMoKTtcbiAgICB9XG5cbiAgICBpbml0Q2FudmFzKCkge1xuICAgICAgIGNvbnNvbGUubG9nKFwiaW5pdENhbnZhc1wiKTtcbiAgICAgICB0aGlzLnZpZXdXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgIHRoaXMudmlld0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAvL0JhY2tncm91bmQgbGF5ZXIgMVxuICAgICAgIHRoaXMuYmFja2dyb3VuZENhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja2dyb3VuZC1sYXllclwiKTtcbiAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIgPSB0aGlzLmJhY2tncm91bmRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgIHRoaXMuYmFja2dyb3VuZENhbnZhcy53aWR0aCA9IHRoaXMudmlld1dpZHRoO1xuICAgICAgIHRoaXMuYmFja2dyb3VuZENhbnZhcy5oZWlnaHQgPSB0aGlzLnZpZXdIZWlnaHQ7XG4gICAgICAgLy9HYW1lIFZpZXcgbWlkZGxlIGxheWVyIDJcbiAgICAgICB0aGlzLnZpZXdDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZXctbGF5ZXJcIik7XG4gICAgICAgdGhpcy52aWV3UmVuZGVyID0gdGhpcy52aWV3Q2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICB0aGlzLnZpZXdDYW52YXMud2lkdGggPSB0aGlzLnZpZXdXaWR0aDtcbiAgICAgICB0aGlzLnZpZXdDYW52YXMuaGVpZ2h0ID0gdGhpcy52aWV3SGVpZ2h0O1xuICAgICAgIC8vSFVEIG92ZXJsb2F5IHRvcCBsYXllciAzXG4gICAgICAgdGhpcy5odWRDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1ZC1sYXllclwiKTtcbiAgICAgICB0aGlzLmh1ZFJlbmRlciA9IHRoaXMuaHVkQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICB0aGlzLmh1ZENhbnZhcy53aWR0aCA9IHRoaXMudmlld1dpZHRoO1xuICAgICAgIHRoaXMuaHVkQ2FudmFzLmhlaWdodCA9IHRoaXMudmlld0hlaWdodDtcbiAgICAgICAvL2luaXRhbGl6ZSBjYW1lcmEgdmlldyB0byBjZW50ZXJcbiAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNhbWVyYSBCRUZPUkVcIiwgdGhpcy5jYW1lcmFYLCB0aGlzLmNhbWVyYVkpO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKFwid29ybGQ6IFwiLCB0aGlzLndvcmxkV2lkdGgsIHRoaXMud29ybGRIZWlnaHQpO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmlldzogXCIsIHRoaXMudmlld1dpZHRoLCB0aGlzLnZpZXdIZWlnaHQpO1xuICAgICAgIC8vIHRoaXMuY2FtZXJhWCA9ICh0aGlzLndvcmxkV2lkdGggLyAyKSAtICh0aGlzLnZpZXdXaWR0aCAvIDIpO1xuICAgICAgIC8vIHRoaXMuY2FtZXJhWSA9ICh0aGlzLndvcmxkSGVpZ2h0IC8gMikgLSAodGhpcy52aWV3SGVpZ2h0IC8gMik7XG4gICAgICAgbGV0IG1pZGRsZVdvcmxkWCA9IE1hdGguZmxvb3IodGhpcy53b3JsZFBpeGVsV2lkdGggLyAyKTtcbiAgICAgICBsZXQgbWlkZGxlV29ybGRZID0gTWF0aC5mbG9vcih0aGlzLndvcmxkUGl4ZWxIZWlnaHQgLyAyKTtcbiAgICAgICB0aGlzLnNldENhbWVyYUNlbnRlcihtaWRkbGVXb3JsZFgsIG1pZGRsZVdvcmxkWSk7XG4gICAgICAgLy8gY29uc29sZS5sb2coXCJDYW1lcmE6IFwiLCB0aGlzLmNhbWVyYVgsIHRoaXMuY2FtZXJhWSk7XG4gICAgICAgdGhpcy5nZW5lcmF0ZVN0YXJzKCk7XG4gICAgICAgdGhpcy5kcmF3QmFja2dyb3VuZCgpO1xuICAgIH0gLy9lbmQgaW5pdENhbnZhc1xuXG4gICAgZ2VuZXJhdGVTdGFycygpe1xuICAgICAgICBmb3IodmFyIHg9MDt4PHRoaXMudmlld1dpZHRoO3grKyl7XG4gICAgICAgICAgICB0aGlzLnN0YXJzW3hdID0gW107XG4gICAgICAgICAgICBmb3IodmFyIHk9MDt5PHRoaXMudmlld0hlaWdodDt5Kyspe1xuICAgICAgICAgICAgICAgIGlmKE1hdGgucmFuZG9tKCkgPCAwLjAwMDUpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IChNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnNbeF1beV0gPSBzaXplO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB0aGlzLnN0YXJzW3hdW3ldID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHpvb21WaWV3KGRpciwgbW91c2VYLCBtb3VzZVkpe1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMudmlld0NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHggPSBtb3VzZVggLSByZWN0LmxlZnQ7XG4gICAgICAgIHZhciB5ID0gbW91c2VZIC0gcmVjdC50b3A7XG4gICAgICAgIC8vIHRoaXMuY2FtZXJhWCA9IE1hdGgucm91bmQoeC8yKSAtIHRoaXMudmlld1dpZHRoO1xuICAgICAgICAvLyB0aGlzLmNhbWVyYVkgPSBNYXRoLnJvdW5kKHkvMikgLSB0aGlzLnZpZXdIZWlnaHQ7XG4gICAgICAgIC8vIHRoaXMuc2NhbGVGYWN0b3IgPSB0aGlzLnNjYWxlRmFjdG9yICsgKE1hdGguc2lnbihkaXIpICogMC41KTtcbiAgICAgICAgLy8gdGhpcy5zY2FsZUZhY3RvciA9IChNYXRoLnJvdW5kKHRoaXMuc2NhbGVGYWN0b3IgKiAxMCkpLzEwO1xuICAgICAgICAvLyBpZih0aGlzLnNjYWxlRmFjdG9yIDwgMC4zKSB0aGlzLnNjYWxlRmFjdG9yID0gMC4zO1xuICAgICAgICAvLyBpZih0aGlzLnNjYWxlRmFjdG9yID4gMykgdGhpcy5zY2FsZUZhY3RvciA9IDM7XG4gICAgICAgIC8vIHRoaXMuY2FtZXJhWCA9IHRoaXMudmlld1dpZHRoIC8gMjtcbiAgICAgICAgLy8gdGhpcy5jYW1lcmFZID0gdGhpcy52aWV3SGVpZ2h0IC8gMjtcbiAgICAgICAgaWYodGhpcy5ERUJVRyAmJiB0aGlzLkRFQlVHLnJlbmRlcikgY29uc29sZS5sb2coXCJ6b29tOiBcIixcbiAgICAgICAgICAgIHRoaXMuc2NhbGVGYWN0b3IsIHRoaXMuY2FtZXJhWCwgdGhpcy5jYW1lcmFZKTtcbiAgICAgICAgLy8gdGhpcy5kcmF3QmFja2dyb3VuZCgpO1xuICAgIH1cblxuICAgIHBhblZpZXcoeCx5KXtcbiAgICAgICAgbGV0IHBhblNwZWVkID0gMTAwO1xuICAgICAgICBpZih0aGlzLkRFQlVHICYmIHRoaXMuREVCVUcucmVuZGVyKSBjb25zb2xlLmxvZyhcInBhblZpZXc6IFwiLHgseSxwYW5TcGVlZCk7XG4gICAgICAgIC8vIGxldCBjYW1lcmFDZW50ZXIgPSB0aGlzLmdldENhbWVyYUNlbnRlcigpO1xuICAgICAgICBsZXQgbW92ZVRvWCA9IHRoaXMuY2FtZXJhWCArICh4ICogcGFuU3BlZWQpO1xuICAgICAgICBsZXQgbW92ZVRvWSA9IHRoaXMuY2FtZXJhWSArICh5ICogcGFuU3BlZWQpO1xuICAgICAgICBsZXQgbWFyZ2luVyA9IE1hdGguZmxvb3IoKHRoaXMudmlld1dpZHRoKSArIGdhbWVTdGF0ZU1hbmFnZXIubWFyZ2luKTtcbiAgICAgICAgbGV0IG1hcmdpbkggPSBNYXRoLmZsb29yKCh0aGlzLnZpZXdIZWlnaHQpICsgZ2FtZVN0YXRlTWFuYWdlci5tYXJnaW4pO1xuICAgICAgICBsZXQgd2lkdGhVcHBlckJvdW5kID0gdGhpcy53b3JsZFBpeGVsV2lkdGggLSBtYXJnaW5XO1xuICAgICAgICBsZXQgaGVpZ2h0VXBwZXJCb3VuZCA9IHRoaXMud29ybGRQaXhlbEhlaWdodCAtIG1hcmdpbkg7XG4gICAgICAgIGlmKG1vdmVUb1ggPCBnYW1lU3RhdGVNYW5hZ2VyLm1hcmdpbikgbW92ZVRvWCA9IGdhbWVTdGF0ZU1hbmFnZXIubWFyZ2luO1xuICAgICAgICBpZihtb3ZlVG9YID4gd2lkdGhVcHBlckJvdW5kKSBtb3ZlVG9YID0gd2lkdGhVcHBlckJvdW5kO1xuICAgICAgICBpZihtb3ZlVG9ZIDwgZ2FtZVN0YXRlTWFuYWdlci5tYXJnaW4pIG1vdmVUb1kgPSBnYW1lU3RhdGVNYW5hZ2VyLm1hcmdpbjtcbiAgICAgICAgaWYobW92ZVRvWSA+IGhlaWdodFVwcGVyQm91bmQpIG1vdmVUb1kgPSBoZWlnaHRVcHBlckJvdW5kO1xuICAgICAgICB0aGlzLnNldENhbWVyYShtb3ZlVG9YLCBtb3ZlVG9ZKTtcbiAgICAgICAgaWYodGhpcy5ERUJVRyAmJiB0aGlzLkRFQlVHLnJlbmRlcikgY29uc29sZS5sb2coXCJwYW5WaWV3OlwiLFxuICAgICAgICAgICAgdGhpcy5jYW1lcmFYLCB0aGlzLmNhbWVyYVksIFwic2NhbGU6XCIsIHRoaXMuc2NhbGVGYWN0b3IpO1xuICAgICAgICAvLyB0aGlzLmRyYXdCYWNrZ3JvdW5kKCk7XG4gICAgfVxuXG4gICAgLy9TZXRzIGNhbWVyYSBjZW50ZXIgYXQgcG9zaXRpb24gaW4gZ2FtZVdvcmxkXG4gICAgc2V0Q2FtZXJhQ2VudGVyKHgsIHkpe1xuICAgICAgaWYodGhpcy5ERUJVRyAmJiB0aGlzLkRFQlVHLnJlbmRlcikgY29uc29sZS5sb2coXCJzZXQgQ2FtZXJhIEJFRk9SRVwiLCB0aGlzLmNhbWVyYVgsIHRoaXMuY2FtZXJhWSk7XG4gICAgICBpZih0aGlzLkRFQlVHICYmIHRoaXMuREVCVUcucmVuZGVyKSBjb25zb2xlLmxvZyhcInNldENhbWVyYTpcIiwgeCwgeSk7XG4gICAgICBsZXQgY2VudGVyWCA9IE1hdGguZmxvb3IoeCAtICh0aGlzLnZpZXdXaWR0aCAvIDIpKTtcbiAgICAgIGxldCBjZW50ZXJZID0gTWF0aC5mbG9vcih5IC0gKHRoaXMudmlld0hlaWdodCAvIDIpKTtcbiAgICAgIHRoaXMuY2FtZXJhWCA9IGNlbnRlclg7XG4gICAgICB0aGlzLmNhbWVyYVkgPSBjZW50ZXJZO1xuICAgICAgaWYodGhpcy5ERUJVRyAmJiB0aGlzLkRFQlVHLnJlbmRlcikgY29uc29sZS5sb2coXCJzZXQgQ2FtZXJhIEFGVEVSXCIsIHRoaXMuY2FtZXJhWCwgdGhpcy5jYW1lcmFZKTtcbiAgICB9XG5cbiAgICBzZXRDYW1lcmEoeCx5KXtcbiAgICAgICAgdGhpcy5jYW1lcmFYID0geDtcbiAgICAgICAgdGhpcy5jYW1lcmFZID0geTtcbiAgICB9XG5cbiAgICBnZXRDYW1lcmFDZW50ZXIoKXtcbiAgICAgICAgbGV0IGNlbnRlclggPSBNYXRoLmZsb29yKHRoaXMuY2FtZXJhWCAtICh0aGlzLnZpZXdXaWR0aCAvIDIpKTtcbiAgICAgICAgbGV0IGNlbnRlclkgPSBNYXRoLmZsb29yKHRoaXMuY2FtZXJhWSAtICh0aGlzLnZpZXdIZWlnaHQgLyAyKSk7XG4gICAgICAgIHJldHVybiB7eDogY2VudGVyWCwgeTogY2VudGVyWX07XG4gICAgfVxuXG4gICAgdHJhbnNXb3JsZFBvc1RvU2NyZWVuUG9zKHgseSl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB4IC0gdGhpcy5jYW1lcmFYLFxuICAgICAgICAgICAgeTogeSAtIHRoaXMuY2FtZXJhWVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TW91c2VQb3MoZXZ0KSB7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy52aWV3Q2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgICAgICAgIHk6IGV2dC5jbGllbnRZIC0gcmVjdC50b3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkcmF3QmFja2dyb3VuZCgpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRyYXdpbmcgQmFja2dyb3VuZFwiKTtcbiAgICAgICAgLy9jbGVhciB0aGUgZ2FtZSBjYW52YXNcbiAgICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLnNhdmUoKTtcbiAgICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB0aGlzLnZpZXdXaWR0aCx0aGlzLnZpZXdIZWlnaHQpO1xuICAgICAgICAvLyB0aGlzLmJhY2tncm91bmRSZW5kZXIuYmVnaW5QYXRoKCk7XG4gICAgICAgIC8vIHRoaXMuYmFja2dyb3VuZFJlbmRlci5yZXN0b3JlKCk7XG5cbiAgICAgICAgLy9kcmF3IGJhY2tncm91bmQgZmlyc3RcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLnNhdmUoKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLmZpbGxSZWN0KDAsMCx0aGlzLnZpZXdXaWR0aCx0aGlzLnZpZXdIZWlnaHQpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIucmVzdG9yZSgpO1xuXG4gICAgICAgIC8vIGZvcih2YXIgeD0wO3g8dGhpcy53b3JsZFdpZHRoO3grKyl7XG4gICAgICAgIC8vICAgICBmb3IodmFyIHk9MDt5PHRoaXMud29ybGRIZWlnaHQ7eSsrKXtcbiAgICAgICAgZm9yKHZhciB4PTA7eDx0aGlzLnZpZXdXaWR0aDt4Kyspe1xuICAgICAgICAgICAgZm9yKHZhciB5PTA7eTx0aGlzLnZpZXdIZWlnaHQ7eSsrKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnN0YXJzW3hdW3ldID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5zYXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYmFja2dyb3VuZFJlbmRlci50cmFuc2xhdGUodGhpcy5jYW1lcmFYLCB0aGlzLmNhbWVyYVkpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmJhY2tncm91bmRSZW5kZXIuc2NhbGUodGhpcy5zY2FsZUZhY3RvciwgdGhpcy5zY2FsZUZhY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlci5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLmFyYyh4LCB5LCB0aGlzLnN0YXJzW3hdW3ldLCAwLCAyKk1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyLmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIuZmlsbCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRSZW5kZXIucmVzdG9yZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAvL3N0YXIgZHJhdyBiYWNrZ3JvdW5kXG4gICAgfVxuXG4gICAgZHJhd1ZpZXcob2JqZWN0c1RvUmVuZGVyKXtcblxuICAgICAgICAvL2NsZWFyIHRoZSBnYW1lIGNhbnZhc1xuICAgICAgICB0aGlzLnZpZXdSZW5kZXIuc2F2ZSgpO1xuICAgICAgICB0aGlzLnZpZXdSZW5kZXIuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgICAgICB0aGlzLnZpZXdSZW5kZXIuY2xlYXJSZWN0KDAsIDAsIHRoaXMudmlld1dpZHRoLHRoaXMudmlld0hlaWdodCk7XG4gICAgICAgIHRoaXMudmlld1JlbmRlci5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy52aWV3UmVuZGVyLnJlc3RvcmUoKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVkT2JqZWN0cyA9IG9iamVjdHNUb1JlbmRlcjtcblxuICAgICAgICB0aGlzLnJlbmRlcmVkT2JqZWN0cy5mb3JFYWNoKChvYmplY3QpID0+IHtcbiAgICAgICAgICBsZXQgdHJhbnNQb3MgPSB7fTtcbiAgICAgICAgICAgIHN3aXRjaCAob2JqZWN0LnR5cGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjaXJjbGVcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJEcmF3aW5nOlwiLG9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1JlbmRlci5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UmVuZGVyLmZpbGxTdHlsZSA9IG9iamVjdC5kcmF3LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIubGluZVdpZHRoID0gb2JqZWN0LmRyYXcuc3Ryb2tlU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNQb3MgPSB0aGlzLnRyYW5zV29ybGRQb3NUb1NjcmVlblBvcyhvYmplY3QueCxvYmplY3QueSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1JlbmRlci5hcmModHJhbnNQb3MueCwgdHJhbnNQb3MueSwgb2JqZWN0LmRyYXcucmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5kcmF3LnN0YXJ0LCBvYmplY3QuZHJhdy5lbmQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIuZmlsbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVjdFwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRyYXdpbmc6XCIsb2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3UmVuZGVyLmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIuZmlsbFN0eWxlID0gb2JqZWN0LmRyYXcuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1JlbmRlci5zdHJva2VTaXplID0gb2JqZWN0LmRyYXcuc3Ryb2tlU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNQb3MgPSB0aGlzLnRyYW5zV29ybGRQb3NUb1NjcmVlblBvcyhvYmplY3QueCxvYmplY3QueSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1JlbmRlci5hcmModHJhbnNQb3MueCwgdHJhbnNQb3MueSwgb2JqZWN0LmRyYXcucmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5kcmF3LnN0YXJ0LCBvYmplY3QuZHJhdy5lbmQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdSZW5kZXIuZmlsbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRG9udCBrbm93IGhvdyB0byBkcmF3IG9iamVjdFwiLCBvYmplY3QudHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB0aGlzLnZpZXdXaWR0aCwgdGhpcy52aWV3SGVpZ2h0KTtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLnNhdmUoKTtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLnRyYW5zbGF0ZSgtdGhpcy5jYW1lcmFYLCAtdGhpcy5jYW1lcmFZKTtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLnNjYWxlKHRoaXMuc2NhbGVGYWN0b3IsIHRoaXMuc2NhbGVGYWN0b3IpO1xuICAgICAgICAvL3dvcmxkIGVkZ2VcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLnN0cm9rZVNpemUgPSBcIjJcIjtcbiAgICAgICAgLy8gbGV0IHNpemUgPSB0aGlzLndvcmxkUGl4ZWxXaWR0aCAtIChnYW1lU3RhdGVNYW5hZ2VyLm1hcmdpbioyKTtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLnJlY3QoMTAwICwxMDAsIHNpemUsIHNpemUpO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuc3Ryb2tlKCk7XG5cbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmJlZ2luUGF0aCgpO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFJlY3QoLTUwMCAsLTUwMCwgZ2FtZVN0YXRlTWFuYWdlci50aWxlc1BpeGVsU2l6ZSwgZ2FtZVN0YXRlTWFuYWdlci50aWxlc1BpeGVsU2l6ZSk7XG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5maWxsU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5maWxsUmVjdCgxMDAgLDEwMCwgZ2FtZVN0YXRlTWFuYWdlci50aWxlc1BpeGVsU2l6ZSwgZ2FtZVN0YXRlTWFuYWdlci50aWxlc1BpeGVsU2l6ZSk7XG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFJlY3QoMTAwMCAsIDEwMDAsIGdhbWVTdGF0ZU1hbmFnZXIudGlsZXNQaXhlbFNpemUsIGdhbWVTdGF0ZU1hbmFnZXIudGlsZXNQaXhlbFNpemUpO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIuZmlsbFN0eWxlID0gXCJibHVlXCI7XG4gICAgICAgIC8vIGxldCByZWNYID0gTWF0aC5mbG9vcigodGhpcy53b3JsZFBpeGVsV2lkdGggLyAyKSAtIChnYW1lU3RhdGVNYW5hZ2VyLnRpbGVzUGl4ZWxTaXplLzIpKTtcbiAgICAgICAgLy8gbGV0IHJlY1kgPSBNYXRoLmZsb29yKCh0aGlzLndvcmxkUGl4ZWxIZWlnaHQgLyAyKSAtIChnYW1lU3RhdGVNYW5hZ2VyLnRpbGVzUGl4ZWxTaXplLzIpKTtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmZpbGxSZWN0KHJlY1ggLCByZWNZLCBnYW1lU3RhdGVNYW5hZ2VyLnRpbGVzUGl4ZWxTaXplLCBnYW1lU3RhdGVNYW5hZ2VyLnRpbGVzUGl4ZWxTaXplKTtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmZpbGxTdHlsZSA9IFwieWVsbG93XCI7XG4gICAgICAgIC8vIHRoaXMudmlld1JlbmRlci5maWxsUmVjdCh0aGlzLndvcmxkUGl4ZWxXaWR0aCAtIChnYW1lU3RhdGVNYW5hZ2VyLm1hcmdpbioyKSAsXG4gICAgICAgIC8vICAgICAgICAgdGhpcy53b3JsZFBpeGVsSGVpZ2h0IC0gKGdhbWVTdGF0ZU1hbmFnZXIubWFyZ2luKjIpLCBnYW1lU3RhdGVNYW5hZ2VyLnRpbGVzUGl4ZWxTaXplLCBnYW1lU3RhdGVNYW5hZ2VyLnRpbGVzUGl4ZWxTaXplKTtcbiAgICAgICAgLy8gdGhpcy52aWV3UmVuZGVyLmNsb3NlUGF0aCgpO1xuICAgICAgICAvLyB0aGlzLnZpZXdSZW5kZXIucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIGRyYXdHdWkoaW5mbyl7XG4gICAgICAgIC8vY2xlYXIgdGhlIGdhbWUgY2FudmFzXG4gICAgICAgIHRoaXMuaHVkUmVuZGVyLnNhdmUoKTtcbiAgICAgICAgLy8gdGhpcy5odWRSZW5kZXIuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5jbGVhclJlY3QoMCwgMCwgdGhpcy52aWV3V2lkdGgsdGhpcy52aWV3SGVpZ2h0KTtcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuaHVkUmVuZGVyLnJlc3RvcmUoKTtcblxuICAgICAgICAvL2NlbnRlciBvZiB2aWV3XG4gICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy52aWV3V2lkdGggLyAyO1xuICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMudmlld0hlaWdodCAvIDI7XG4gICAgICAgIGxldCBzaXplID0gMjA7XG4gICAgICAgIHRoaXMuaHVkUmVuZGVyLnN0cm9rZVNpemUgPSAyO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5zdHJva2VTdHlsZSA9IFwicGlua1wiO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5odWRSZW5kZXIubW92ZVRvKGNlbnRlclggKyBzaXplLCBjZW50ZXJZKTtcbiAgICAgICAgdGhpcy5odWRSZW5kZXIubGluZVRvKGNlbnRlclggLSBzaXplLCBjZW50ZXJZKTtcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMuaHVkUmVuZGVyLmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5tb3ZlVG8oY2VudGVyWCwgY2VudGVyWSArIHNpemUpO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5saW5lVG8oY2VudGVyWCwgY2VudGVyWSAtIHNpemUpO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5zdHJva2UoKTtcblxuICAgICAgICAvL3VwcGVyTGVmdCBEZWJ1ZyBTdGF0c1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5zYXZlKCk7XG4gICAgICAgIGxldCBzcGFjZWluZyA9IDIwO1xuICAgICAgICBsZXQgY3VycmVudFlGb250ID0gMjA7XG4gICAgICAgIHRoaXMuaHVkUmVuZGVyLmZvbnQgPSBcIjIwcHggQXJpYWxcIjtcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFN0eWxlID0gXCJvcmFuZ2VcIjtcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJGUFM6XCIraW5mby5hdmdGUFMsIDAsIGN1cnJlbnRZRm9udCk7XG4gICAgICAgIGN1cnJlbnRZRm9udCA9IGN1cnJlbnRZRm9udCArIHNwYWNlaW5nO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5maWxsVGV4dChcIkRlbHRhVGltZTpcIitpbmZvLmRlbHRhVGltZSwgMCwgY3VycmVudFlGb250KTtcbiAgICAgICAgY3VycmVudFlGb250ID0gY3VycmVudFlGb250ICsgc3BhY2Vpbmc7XG4gICAgICAgIHRoaXMuaHVkUmVuZGVyLmZpbGxUZXh0KFwiUGluZzogcGluZ1wiLCAwLCBjdXJyZW50WUZvbnQpO1xuICAgICAgICBjdXJyZW50WUZvbnQgPSBjdXJyZW50WUZvbnQgKyBzcGFjZWluZztcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJNb3VzZVZpZXc6XCIrdGhpcy5kZWJ1Zy5tb3VzZVgrXCIsXCIrdGhpcy5kZWJ1Zy5tb3VzZVksIDAsIGN1cnJlbnRZRm9udCk7XG4gICAgICAgIGN1cnJlbnRZRm9udCA9IGN1cnJlbnRZRm9udCArIHNwYWNlaW5nO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5maWxsVGV4dChcIk1vdXNlV29ybGQ6XCIrKHRoaXMuZGVidWcubW91c2VYICsgdGhpcy5jYW1lcmFYKStcIixcIitcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5kZWJ1Zy5tb3VzZVkgKyB0aGlzLmNhbWVyYVkpLCAwLCBjdXJyZW50WUZvbnQpO1xuICAgICAgICBjdXJyZW50WUZvbnQgPSBjdXJyZW50WUZvbnQgKyBzcGFjZWluZztcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJWaWV3U2l6ZTpcIit0aGlzLnZpZXdXaWR0aCtcIixcIit0aGlzLnZpZXdIZWlnaHQsIDAsIGN1cnJlbnRZRm9udCk7XG4gICAgICAgIGN1cnJlbnRZRm9udCA9IGN1cnJlbnRZRm9udCArIHNwYWNlaW5nO1xuICAgICAgICB0aGlzLmh1ZFJlbmRlci5maWxsVGV4dChcIkNhbWVyYTpcIit0aGlzLmNhbWVyYVgrXCIsXCIrdGhpcy5jYW1lcmFZLCAwLCBjdXJyZW50WUZvbnQpO1xuICAgICAgICBjdXJyZW50WUZvbnQgPSBjdXJyZW50WUZvbnQgKyBzcGFjZWluZztcbiAgICAgICAgdGhpcy5odWRSZW5kZXIuZmlsbFRleHQoXCJSZW5kZXJlZE9iamVjdHM6XCIrdGhpcy5yZW5kZXJlZE9iamVjdHMubGVuZ3RoLCAwLCBjdXJyZW50WUZvbnQpO1xuICAgICAgICBjdXJyZW50WUZvbnQgPSBjdXJyZW50WUZvbnQgKyBzcGFjZWluZztcbiAgICAgICAgdGhpcy5odWRSZW5kZXIucmVzdG9yZSgpO1xuICAgIH1cblxufS8vUmVuZGVyQ2FudmFzIGNsYXNzXG4iLCJpbXBvcnQgQ2xpZW50R2FtZUVuZ2luZSBmcm9tICcuLi9jbGllbnRFbmdpbmVTcmMvbWFpbi5qcyc7XG5cbmxldCBudW1PZlRpbGVzWCA9IDEwMjQ7XG5sZXQgbnVtT2ZUaWxlc1kgPSAxMDI0O1xubGV0IHRpbGVzUGl4ZWxTaXplID0gMzI7XG5sZXQgd29ybGRQaXhlbFdpZHRoID0gbnVtT2ZUaWxlc1ggKiB0aWxlc1BpeGVsU2l6ZTsgLy8zMiw3NjggbWlkZGxlIGlzIDE2Mzg0XG5sZXQgd29ybGRQaXhlbEhlaWdodCA9IG51bU9mVGlsZXNZICogdGlsZXNQaXhlbFNpemU7XG5sZXQgbWFyZ2luID0gdGlsZXNQaXhlbFNpemUgKiAyO1xuXG5sZXQgREVCVUcgPSB7XG4gICAgaW5wdXQ6IHRydWUsXG4gICAgcmVuZGVyOiBmYWxzZSxcbiAgICBHU006IHRydWUsXG59O1xuXG52YXIgY29uZmlnID0ge1xuICAgIHdvcmxkUGl4ZWxXaWR0aDogd29ybGRQaXhlbFdpZHRoLFxuICAgIHdvcmxkUGl4ZWxIZWlnaHQ6IHdvcmxkUGl4ZWxIZWlnaHQsXG4gICAgdGlsZXNQaXhlbFNpemU6IHRpbGVzUGl4ZWxTaXplLFxuICAgIG1hcmdpbjogbWFyZ2luLFxuICAgIERFQlVHOiBERUJVR1xufVxuXG52YXIgRW5naW5lID0gbmV3IENsaWVudEdhbWVFbmdpbmUoY29uZmlnKTtcblxuRW5naW5lLmFkZEtleU1hcHBpbmcoe2tleTogXCJ3XCIsIGFjdGlvbjogXCJwYW5DYW1lcmFcIiwgaW5wdXQ6IHt4OjAsIHk6LTF9fSk7XG5FbmdpbmUuYWRkS2V5TWFwcGluZyh7a2V5OiBcImFcIiwgYWN0aW9uOiBcInBhbkNhbWVyYVwiLCBpbnB1dDoge3g6LTEsIHk6MH19KTtcbkVuZ2luZS5hZGRLZXlNYXBwaW5nKHtrZXk6IFwic1wiLCBhY3Rpb246IFwicGFuQ2FtZXJhXCIsIGlucHV0OiB7eDowLCB5OjF9fSk7XG5FbmdpbmUuYWRkS2V5TWFwcGluZyh7a2V5OiBcImRcIiwgYWN0aW9uOiBcInBhbkNhbWVyYVwiLCBpbnB1dDoge3g6MSwgeTowfX0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==