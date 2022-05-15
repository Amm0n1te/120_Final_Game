class Title extends Phaser.Scene { //we can use menu to load all the assets for now
    constructor() {
        super("title");
    }

    preload() {
        this.load.image('background', 'assets/placeholderGray.png')
        this.load.image('hugh', 'assets/hugh.png');
        this.load.image('hughGray', 'assets/hughDarkGrey.png');
        this.load.image('titleScreen', 'assets/placeholderTitle.png');
        this.load.audio('wind', 'assets/wind.wav');
        this.load.image('floor', 'assets/ground.png');
        this.load.image('hands', 'assets/hands1.png');
        this.load.image('mist', 'assets/mist.png');
        this.load.image('door', 'assets/door.png');
        this.load.image('eyeDown', 'assets/eyedown.png');
    }

    create(){
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.tileSprite(0, 0, 960, 720, 'titleScreen').setOrigin(0, 0);
    }

    update() {
        this.scene.start('play');
        if (Phaser.Input.Keyboard.JustDown(spacebar)) {
            this.scene.start('play');
        }
    }
}