class Title extends Phaser.Scene { //we can use menu to load all the assets for now
    constructor() {
        super("title");
    }
    
    //bojken 3
    preload() {
        //title stuff
        this.load.image('titleScreen', 'assets/placeholderTitle.png');
        this.load.image('keysImage', 'assets/controls.png');
        this.load.image('crazy_cat', 'assets/crazy_cat_3.png');


        //level 1
        this.load.spritesheet('hughWalkSheet', 'assets/hughWalkSheet.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 4});
        this.load.spritesheet('hughWalkSheetGray', 'assets/hughWalkSheetGray.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 4});
        this.load.image('background', 'assets/placeholderGray.png')
        this.load.spritesheet('hugh', 'assets/hugh.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 0});
        this.load.image('hughGray', 'assets/hughDarkGrey.png');
        this.load.spritesheet('hughGrayIdleSheet', 'assets/hughDarkGrey.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 0});
        this.load.spritesheet('hughJump', 'assets/hughJump.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 9});
        this.load.spritesheet('hughJumpGray', 'assets/hughJumpGray.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 9});
        this.load.spritesheet('hughHit', 'assets/hughHitSheet.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 8});
        this.load.spritesheet('hughHitGray', 'assets/hughHitSheetGray.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 8});
        this.load.spritesheet('hughDeath', 'assets/hughDeathSheet.png', {frameWidth:80, frameHeight: 130, startFrame: 0, endFrame: 22});
        this.load.audio('wind', 'assets/wind.wav');
        this.load.image('floor', 'assets/ground.png');
        this.load.image('hands', 'assets/hands1.png');
        this.load.image('mist', 'assets/mist.png');
        this.load.image('door', 'assets/door.png');
        this.load.image('eyeDown', 'assets/eyedown.png');
        this.load.image('cairn', 'assets/cairn.png');
        this.load.image('shrine', 'assets/shrine.png');

        //level 2
        this.load.image('rightHand', 'assets/rightHand.png');
        this.load.image('rightHandGray', 'assets/rightHandGray.png');
        this.load.image('leftHand', 'assets/leftHand.png');
        this.load.image('leftHandGray', 'assets/leftHandGray.png');
        
        //level 3
        this.load.spritesheet('blackPlatform', 'assets/shadowPlatformSheet.png', {frameWidth: 700, frameHeight: 28, startFrame: 0, endFrame: 2});
        this.load.spritesheet('moonPlatform', 'assets/moonPlatformSheet.png', {frameWidth: 700, frameHeight: 28, startFrame: 0, endFrame: 2});
        this.load.image('sideeye', 'assets/sideeye.png');
        this.load.image('sideeyebeam', 'assets/sideeyebeam.png');
        this.load.spritesheet('sideeyeBlink', 'assets/sideeyeBlink.png', {frameWidth: 120, frameHeight: 120, startFrame: 0, endFrame: 7})
        this.load.image('ledge', 'assets/ledge.png');
        this.load.image('creviceBG', 'assets/creviceBG.png');

        //text transitions
        this.load.spritesheet('level1text', 'assets/level1Text.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});
        this.load.spritesheet('level2text', 'assets/level2Text.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});
        this.load.spritesheet('level3text', 'assets/level3Text.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});
        //this.load.spritesheet('level4text', 'assets/level4Text.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});

    }

    create(){
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.titlescreen = this.add.tileSprite(0, 0, 960, 720, 'titleScreen').setOrigin(0, 0);
        this.keysImage = this.add.sprite(0, 0, 'keysImage').setOrigin(0,0);
        this.keysImage.alpha = 0;
        this.showKeys = false;
    }

    update() {
        //this.scene.start('crevice');

        //finished is a variable that keeps track of whether or not the player has played through the game once already.
        //we don't want to show the controls to a player who has already beaten the game.
        if (!finished) {
            if (this.showKeys == false && Phaser.Input.Keyboard.JustDown(spacebar)) {
                this.titlescreen.alpha = 0;
                this.keysImage.alpha = 1;
                this.showKeys = true;
            }
            if (this.showKeys == true) {
                if (Phaser.Input.Keyboard.JustDown(spacebar)) this.scene.start('play');
            }
        } else if (finished) {
            if (Phaser.Input.Keyboard.JustDown(spacebar)) this.scene.start('play');
        }
    }
}