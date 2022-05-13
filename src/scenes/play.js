class Play extends Phaser.Scene {
    constructor () {
        super('play');
    }


    create() {
        this.MAX_VELOCITY = 300;
        this.physics.world.gravity.y = 1000;
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.wind = this.sound.add('wind', {volume: 1.5});
        this.wind.play({loop: true});

        this.background = this.add.tileSprite(0,0, 960, 720, 'background').setOrigin(0, 0);
        this.hugh = new Player(this, 290, 445, 'hugh').setOrigin(0,0);
        //this.hugh.setCollideWorldBounds(true);
        console.log("in play");


    }

    update() {
        this.hugh.update();
    }
}