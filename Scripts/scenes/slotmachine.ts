// MENU SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _bet50Btn: objects.Button;
        private _bet100Btn: objects.Button;
        private _bet500Btn: objects.Button;
        private _spinButton: objects.Button;
        private _exitButton: objects.Button;
        private _resetButton: objects.Button;
        private _reels: createjs.Bitmap[];

        private _grapes = 0;
        private _bananas = 0;
        private _oranges = 0;
        private _cherries = 0;
        private _bars = 0;
        private _bells = 0;
        private _sevens = 0;
        private _blanks = 0;
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {   
            
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
            this._reels = new Array<createjs.Bitmap>();
            for (var reel: number = 0; reel < 3; reel++) {
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
        }

        // SLOT_MACHINE Scene updates here
        public update(): void {

        }
        
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value: number, lowerBounds: number, upperBounds: number): number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }
        
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        private _spinReels(): string[] {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];

            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):  // 41.5% probability
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37): // 15.4% probability
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = "Banana";
                        this._bananas++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54): // 12.3% probability
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59): //  7.7% probability
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62): //  4.6% probability
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64): //  3.1% probability
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65): //  1.5% probability
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        }
        
        //EVENT HANDLERS ++++++++++++++++++++
        private _bet50BtnClick(event: createjs.MouseEvent): void {
            console.log("Bet 50 Credit");
        }
        private _bet100BtnClick(event: createjs.MouseEvent): void {
            console.log("Bet 100 Credit");
        }
        private _bet500BtnClick(event: createjs.MouseEvent): void {
            console.log("Bet 500 Credit");
        }
        private _spinButtonClick(event: createjs.MouseEvent): void {

            var bitmap: string[] = this._spinReels();
            for (var reel: number = 0; reel < 3; reel++) {
                this._reels[reel].image = assets.getResult(bitmap[reel]);
            }
            //this.addChild(this._reels[0]);
            // console.log(this.numChildren);
            
        }
        private _resetButtonClick(event: createjs.MouseEvent): void {
            console.log("Credit reset");
        }

        private _exitButtonClick(event: createjs.MouseEvent): void {
            console.log("Exit Game");
        }
        //  }
    }
}
