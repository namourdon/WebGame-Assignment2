var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            // add Bet50Btn to the scene
            this._bet50Btn = new objects.Button("Bet50Btn", 200, 375, false);
            this.addChild(this._bet50Btn);
            this._bet50Btn.on("click", this._bet50BtnClick, this);
            // add Bet100Btn to the scene
            this._bet100Btn = new objects.Button("Bet100Btn", 290, 375, false);
            this.addChild(this._bet100Btn);
            this._bet100Btn.on("click", this._bet100BtnClick, this);
            // add Bet500Btn to the scene
            this._bet500Btn = new objects.Button("Bet500Btn", 380, 375, false);
            this.addChild(this._bet500Btn);
            this._bet500Btn.on("click", this._bet500BtnClick, this);
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 380, 430, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);
            // add ResetButton to the scene
            this._resetButton = new objects.Button("ResetButton", 200, 430, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);
            // add ExitButton to the scene
            this._exitButton = new objects.Button("ExitButton", 290, 430, false);
            this.addChild(this._exitButton);
            this._exitButton.on("click", this._exitButtonClick, this);
            //Initialise array of Bitmaps
            this._reels = new Array();
            for (var reel = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                this._reels[reel].x = 220 + (reel * 80);
                this._reels[reel].y = 210;
                this.addChild(this._reels[reel]);
                console.log("reel" + reel + " " + this._reels[reel]);
            }
            // Setup Background
            this._setupBackground("WhiteBackground");
            // FadeIn
            this._fadeIn(500);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._spinReels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Banana";
                        this._bananas++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._bet50BtnClick = function (event) {
            console.log("Bet 50 Credit");
        };
        SlotMachine.prototype._bet100BtnClick = function (event) {
            console.log("Bet 100 Credit");
        };
        SlotMachine.prototype._bet500BtnClick = function (event) {
            console.log("Bet 500 Credit");
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            console.log(this._spinReels());
            var bitmap = this._spinReels();
            //this._reels[0]= new createjs.Bitmap(assets.getResult(seashells[0]));
            for (var reel = 0; reel < 3; reel++) {
                this._reels[0].image = assets.getResult(bitmap[0]);
            }
            //this.addChild(this._reels[0]);
            // console.log(this.numChildren);
        };
        SlotMachine.prototype._resetButtonClick = function (event) {
            console.log("Credit reset");
        };
        SlotMachine.prototype._exitButtonClick = function (event) {
            console.log("Exit Game");
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map