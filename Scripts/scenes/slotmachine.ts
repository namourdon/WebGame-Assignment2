//Name:Nashia Amourdon
//Last edited:29/02/2016
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
        private _jackpotText: objects.Label;
        private _creditsText: objects.Label;
        private _betText: objects.Label;
        private _winningsText: objects.Label;

        private playerBet: number;
        private playMoney: number;
        private winnings: number;
        private jackpot: number;
        private _trueTulip = 0;
        private _hourseConch = 0;
        private _oursin = 0;
        private _rockSnail = 0;
        private _rougeScallop = 0;
        private _starFish = 0;
        private _beau = 0;
        private _blanks = 0;
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {   
            //reset back the game
            this._resetAll();
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
            
            //Add Jackpot Text to the scene
            this._jackpotText = new objects.Label(
                this.jackpot.toString(), "18px lucinda", "#022F49", 410, 148, false);
            this._jackpotText.textAlign = "right";
            this.addChild(this._jackpotText);
            
            //Add Credit Text to the scene
            this._creditsText = new objects.Label(this.playMoney.toString(), "18px lucinda", "#022F49", 274, 315, false);
            this._creditsText.textAlign = "right";
            this.addChild(this._creditsText);
            
            //Add Bet Text to the scene
            this._betText = new objects.Label(this.playerBet.toString(), "18px lucinda", "#022F49", 357, 315, false);
            this._betText.textAlign = "right";
            this.addChild(this._betText);
            
            //Add Winning Text to the scene
            this._winningsText = new objects.Label(this.winnings.toString(), "18px lucinda", "#022F49", 440, 315, false);
            this._winningsText.textAlign = "right";
            this.addChild(this._winningsText);
            //Initialise Bitmap array 
            this._initializeBitmapArray();
         
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

        private _resetAll() {
            this.playMoney = 1000;
            this.winnings = 0;
            this.jackpot = 5000;
            this.playerBet = 0;
            this.winnings=0;
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
                        betLine[spin] = "TrueTulip";
                        this._trueTulip++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = "HorseConch";
                        this._hourseConch++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54): // 12.3% probability
                        betLine[spin] = "Oursin";
                        this._oursin++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59): //  7.7% probability
                        betLine[spin] = "RockSnail";
                        this._rockSnail++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62): //  4.6% probability
                        betLine[spin] = "RougeScallop";
                        this._rougeScallop++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64): //  3.1% probability
                        betLine[spin] = "StarFish";
                        this._starFish++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65): //  1.5% probability
                        betLine[spin] = "Beau";
                        this._beau++;
                        break;
                }
            }
            return betLine;
        }
        private _determineWinnings(): void {
            if (this._blanks == 0) {
                if (this._trueTulip == 3) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this._hourseConch == 3) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this._oursin == 3) {
                    this.winnings = this.playerBet * 30;
                }
                else if (this._rockSnail == 3) {
                    this.winnings = this.playerBet * 40;
                }
                else if (this._rougeScallop == 3) {
                    this.winnings = this.playerBet * 50;
                }
                else if (this._starFish == 3) {
                    this.winnings = this.playerBet * 75;
                }
                else if (this._beau == 3) {
                    this.winnings = this.playerBet * 100;
                }
                else if (this._trueTulip == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this._hourseConch == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this._oursin == 2) {
                    this.winnings = this.playerBet * 3;
                }
                else if (this._rockSnail == 2) {
                    this.winnings = this.playerBet * 4;
                }
                else if (this._rougeScallop == 2) {
                    this.winnings = this.playerBet * 5;
                }
                else if (this._starFish == 2) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this._beau == 2) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this._beau == 1) {
                    this.winnings = this.playerBet * 5;
                }
                else {
                    this.winnings = this.playerBet * 1;
                }
                console.log("win");

            }
            else {
                console.log("Loss");
            }
            this._winningsText.text = this.winnings.toString();
            this.playMoney += this.winnings;
            this._creditsText.text = this.playMoney.toString();
            this._resetFruitTally();
            
        }

        private _resetFruitTally(): void {
            this._trueTulip = 0;
            this._hourseConch = 0;
            this._oursin = 0;
            this._rockSnail = 0;
            this._rougeScallop = 0;
            this._starFish = 0;
            this._beau = 0;
            this._blanks = 0;

        }
        private _initializeBitmapArray(): void {
            //Initialise array of Bitmaps
            this._reels = new Array<createjs.Bitmap>();
            for (var reel: number = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                this._reels[reel].x = 220 + (reel * 80);
                this._reels[reel].y = 210;
                this.addChild(this._reels[reel]);
                console.log("reel" + reel + " " + this._reels[reel]);
            }

        }

        private _placeBet(playerBet: number) {
            if (playerBet <= this.playMoney) {
                this.playerBet += playerBet;
                this.playMoney -= playerBet;
                this._creditsText.text = this.playMoney.toString();
                this._betText.text = this.playerBet.toString();
                
            }
        }
        
        //EVENT HANDLERS ++++++++++++++++++++
        private _bet50BtnClick(event: createjs.MouseEvent): void {
            console.log("Bet 50 Credit");
            this._placeBet(50);
        }
        private _bet100BtnClick(event: createjs.MouseEvent): void {
            console.log("Bet 100 Credit");
            this._placeBet(100);
        }
        private _bet500BtnClick(event: createjs.MouseEvent): void {
            console.log("Bet 500 Credit");
            this._placeBet(500);
        }
        private _spinButtonClick(event: createjs.MouseEvent): void {
            //check for enough money
            if (this.playerBet > 0) {
                var bitmap: string[] = this._spinReels();
                for (var reel: number = 0; reel < 3; reel++) {
                    this._reels[reel].image = assets.getResult(bitmap[reel]);
                }
                 
           
                
                this._determineWinnings();
                this.playerBet = 0;
                this.winnings=0;
                //this._winningsText.text= this.winnings.toString();
                this._betText.text = this.playerBet.toString();
               
            }
           if(this.playMoney<=0){
                this._fadeOut(500, () => {
                // Switch to the LEFT_CAVE Scene
                scene = config.Scene.GAME_OVER;
                changeScene();
            });
                
            }
            
            
        }
        private _resetButtonClick(event: createjs.MouseEvent): void {
            this._resetAll();
           this._creditsText.text="1000";
           this._winningsText.text="0";
           this._betText.text="0";
            console.log("Credit reset");
        }

        private _exitButtonClick(event: createjs.MouseEvent): void {
            console.log("Exit Game");
            this._fadeOut(500, () => {
                // Switch to the LEFT_CAVE Scene
                scene = config.Scene.MENU;
                changeScene();
            });
        }
        //  }
    }
}
