class Play extends Phaser.Scene {
    constructor () {
        super('play');
    }


    create() {
        this.handEyeOffset = 30;
        this.MAX_VELOCITY = 300;
        this.physics.world.gravity.y = 2000;
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.wind = this.sound.add('wind', {volume: 1.5});
        this.wind.play({loop: true});

        this.background = this.add.tileSprite(0,0, 960, 720, 'background').setOrigin(0, 0);
        this.mist = this.add.tileSprite(0, 0, 960, 720, 'mist').setOrigin(0, 0);
        this.hands = this.add.sprite(0, 0, 'hands').setOrigin(0, 0);
        this.hugh = new Player(this, 290, 300, 'hugh').setOrigin(0,0);
        this.eye = new Eye(this, 655, 11, 'eyeDown').setOrigin(0,0);
        this.door = this.add.sprite(game.config.width, 250, 'door').setOrigin(1, 0);

        
        this.testPlatform = this.physics.add.sprite(game.config.width/2, 640, 'floor');
        this.testPlatform.body.immovable = true;
        this.testPlatform.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.testPlatform);

        this.frontGround = this.add.sprite(game.config.width/2, 610, 'floor');
        this.bottomGround = this.add.sprite(game.config.width/2, 730, 'floor');
        console.log("in play");

        this.frameTime = 0;
        //this.physics.world.setFPS(60);
    }

    update(time, delta) {
        this.frameTime += delta;
        if (this.frameTime > 16.5) {
            this.frameTime = 0;
            //console.log(delta);
            this.hugh.update();
            this.eye.update();
            this.eye.checkSight(this.hugh);
            this.mist.tilePositionX += 1;
        }
    }
}