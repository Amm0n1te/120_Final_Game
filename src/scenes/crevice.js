class Crevice extends Phaser.Scene {
    constructor(){
        super('crevice');
    }


    create() {
        this.background = this.add.tileSprite(0,0, 960, 720, 'background').setOrigin(0, 0);
        this.mist = this.add.tileSprite(0, 0, 960, 720, 'mist').setOrigin(0, 0);
        this.frameTime = 0;
        this.physics.world.gravity.y = 2000;
        this.MAX_VELOCITY = 300;
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.blackPlatform1 = this.physics.add.sprite(0, 530, "blackPlatform").setOrigin(0,0);
        this.grayPlatform1 = this.physics.add.sprite(0, 310, "grayPlatform").setOrigin(0,0);
        this.blackPlatform1.body.immovable = true;
        this.blackPlatform1.body.allowGravity = false;
        this.grayPlatform1.body.immovable = true;
        this.grayPlatform1.body.allowGravity = false;

        this.shrine = this.add.sprite(100, 200, 'shrine').setOrigin(0, 0);
        this.shrine.setScale(1.2);

        this.hugh = new Player(this, 20, 0, 'hugh').setOrigin(0,0);
        this.physics.add.collider(this.hugh, this.grayPlatform1);
    }


    update(time, delta) {
        this.frameTime += delta;
        if (this.frameTime > 16.5) {
            this.frameTime = 0;
            
            //update code here
            this.mist.tilePositionX += 1;

            this.hugh.update();
        }

    }


}