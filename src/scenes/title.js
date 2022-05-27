class Title extends Phaser.Scene { //we can use menu to load all the assets for now
    constructor() {
        super("title");
    }
    
    //bojken 3
    preload() {
        this.load.spritesheet('hughWalkSheet', 'assets/hughWalkSheet.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 4});
        this.load.spritesheet('hughWalkSheetGray', 'assets/hughWalkSheetGray.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 4});
        this.load.image('background', 'assets/placeholderGray.png')
        this.load.spritesheet('hugh', 'assets/hugh.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 0});
        this.load.image('hughGray', 'assets/hughDarkGrey.png');
        this.load.spritesheet('hughGrayIdleSheet', 'assets/hughDarkGrey.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 0});
        this.load.spritesheet('hughJump', 'assets/hughJump.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 9});
        this.load.spritesheet('hughHit', 'assets/hughHitSheet.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 8});
        this.load.spritesheet('hughHitGray', 'assets/hughHitSheetGray.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 8});
        this.load.image('titleScreen', 'assets/placeholderTitle.png');
        this.load.audio('wind', 'assets/wind.wav');
        this.load.image('floor', 'assets/ground.png');
        this.load.image('hands', 'assets/hands1.png');
        this.load.image('mist', 'assets/mist.png');
        this.load.image('door', 'assets/door.png');
        this.load.image('eyeDown', 'assets/eyedown.png');
        this.load.image('cairn', 'assets/cairn.png');
    }

    create(){
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.tileSprite(0, 0, 960, 720, 'titleScreen').setOrigin(0, 0);
    }

    update() {
        //this.scene.start('play');
        if (Phaser.Input.Keyboard.JustDown(spacebar)) {
            this.scene.start('play');
        }
    }
}