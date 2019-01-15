import ClientGameEngine from '../clientEngineSrc/main.js';

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

var Engine = new ClientGameEngine(config);

Engine.addKeyMapping({key: "w", action: "panCamera", input: {x:0, y:-1}});
Engine.addKeyMapping({key: "a", action: "panCamera", input: {x:-1, y:0}});
Engine.addKeyMapping({key: "s", action: "panCamera", input: {x:0, y:1}});
Engine.addKeyMapping({key: "d", action: "panCamera", input: {x:1, y:0}});
