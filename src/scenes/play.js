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
        this.hugh = new Player(this, 290, 300, 'hugh').setOrigin(0,0);
        
        this.testPlatform = this.physics.add.sprite(game.config.width/2, 640, 'floor');
        this.testPlatform.body.immovable = true;
        this.testPlatform.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.testPlatform);
        //this.testPlatform.debug = false;

        this.frontGround = this.add.sprite(game.config.width/2, 610, 'floor');
        console.log("in play");


    }

    update() {
        this.hugh.update();
    }
}