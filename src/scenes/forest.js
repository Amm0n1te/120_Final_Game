class Forest extends Phaser.Scene {
    constructor() {
        super('forest');
    }

    create() {
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.MAX_VELOCITY = 300;
        this.physics.world.gravity.y = 2000;
        this.background = this.add.tileSprite(0,0, 960, 720, 'background').setOrigin(0, 0);
        this.mist = this.add.tileSprite(0, 0, 960, 720, 'mist').setOrigin(0, 0);

        this.hugh = new Player(this, 290, 445, 'hugh').setOrigin(0,0);


        this.frontGround = this.add.sprite(game.config.width/2, 610, 'floor');
        this.bottomGround = this.physics.add.sprite(game.config.width/2, 640, 'floor');
        this.bottomGround.body.immovable = true;
        this.bottomGround.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.bottomGround);

        this.groundground = this.add.sprite(game.config.width/2, 700, 'floor');

        this.frameTime = 0;
    }

    update(time, delta) {
        this.frameTime += delta;
        if (this.frameTime > 16.5) {

            this.frameTime = 0;

            this.hugh.update();
            this.mist.tilePositionX += 100;
        }
    }
}