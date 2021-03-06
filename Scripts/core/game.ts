﻿/// <reference path = "_reference.ts" />

// global variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;
var stats: Stats;

var currentScene: objects.Scene;
var scene: number;

// Game Scenes
var menu: scenes.Menu;
var slotMachine: scenes.SlotMachine;
var gameOver: scenes.GameOver;

var assetData: objects.Asset[] = [
    { id: "BackButton", src: "../../Assets/images/BackButton.png" },
    { id: "Nextbutton", src: "../../Assets/images/Nextbutton.png" },
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "StartOverButton", src: "../../Assets/images/StartOverButton.png" },
    { id: "SlotMachine", src: "../../Assets/images/SlotMachine1.gif" },
    { id: "Bet50Btn", src: "../../Assets/images/Bet50Btn.png" },
    { id: "Bet100Btn", src: "../../Assets/images/Bet100Btn.png" },
    { id: "Bet500Btn", src: "../../Assets/images/Bet500Btn.png" },
    { id: "SpinButton", src: "../../Assets/images/SpinButton.png" },
    { id: "BlackBackground", src: "../../Assets/images/BlackBackground.png" },
    { id: "ExitButton", src: "../../Assets/images/ExitButton.png" },
    { id: "ResetButton", src: "../../Assets/images/ResetButton.png" },
    { id: "WhiteBackground", src: "../../Assets/images/WhiteBackground.png" },
    { id: "Blank", src: "../../Assets/images/Blank.png" },
    { id: "TrueTulip", src: "../../Assets/images/Grapes.png" },
    { id: "HorseConch", src: "../../Assets/images/Banana.png" },
    { id: "RockSnail", src: "../../Assets/images/Cherry.png" },
    { id: "Oursin", src: "../../Assets/images/Orange.png" },
    { id: "RougeScallop", src: "../../Assets/images/Bar.png" },
    { id: "StarFish", src: "../../Assets/images/Bell.png" },
    { id: "Beau", src: "../../Assets/images/Seven.png" }
];

function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function init(): void {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    
    // create our main display list container
    stage = new createjs.Stage(canvas);
    
    // Enable mouse events
    stage.enableMouseOver(20);
    
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    
    // sets up our stats counting workflow
    setupStats(); 
    
    // set initial scene
    scene = config.Scene.MENU;
    changeScene();
}

// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event: createjs.Event): void {
    // start collecting stats for this frame
    stats.begin(); 
    
    // calling State's update method
    currentScene.update(); 
    
    // redraw/refresh stage every frame
    stage.update();
    
    // stop collecting stats for this frame
    stats.end();
}

// Setup Game Stats
function setupStats(): void {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}

// Finite State Machine used to change Scenes
function changeScene(): void {
    
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.SLOT_MACHINE:
            // show the PLAY scene
            stage.removeAllChildren();
            slotMachine = new scenes.SlotMachine();
            currentScene = slotMachine;
            console.log("Starting SLOT_MACHINE Scene");
            break;
        case config.Scene.GAME_OVER:
            // show the game OVER scene
            stage.removeAllChildren();
            gameOver = new scenes.GameOver();
            currentScene = gameOver;
            console.log("Starting GAME_OVER Scene");
            break;
    }
    console.log(currentScene.numChildren);
}
    window.onload = preload;
