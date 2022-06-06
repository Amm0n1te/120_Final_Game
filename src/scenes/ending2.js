class Ending2 extends Phaser.Scene {
    constructor() {
        super('ending2');
    }

    create() {
        this.MAX_VELOCITY = 300;
        this.physics.world.gravity.y = 2000;

        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.background = this.add.tileSprite(0,0, 960, 720, 'background').setOrigin(0, 0);
        this.mist = this.add.tileSprite(0, 0, 960, 720, 'mist').setOrigin(0, 0);

        this.hands = this.add.sprite(0, 0, 'hands').setOrigin(0,0);
        this.hands.flipX = true;
        //

        
        this.hugh = new Player(this, 88, 445, 'hugh', 0).setOrigin(0,0);
        this.deathPlayed = false;

        


        this.testPlatform = this.physics.add.sprite(game.config.width/2, 640, 'floor');
        this.testPlatform.body.immovable = true;
        this.testPlatform.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.testPlatform);

        this.frontGround = this.add.sprite(game.config.width/2, 610, 'floor');
        this.bottomGround = this.add.sprite(game.config.width/2, 730, 'floor');

        
        //this.checkpoint1 = this.add.sprite(400, 650, 'crazy_cat').setScale(0.4);
        //this.checkpoint2 = this.add.sprite(600, 650, 'crazy_cat').setScale(0.3);

        
        this.cat = this.add.sprite(100, 20, 'harold').setOrigin(0,0);
        this.cat.alpha = 0;

        this.frameTime = 0;
    }

    update(time, delta) {
        this.frameTime += delta;
        if (this.frameTime > 16.5) {
            this.frameTime = 0;

            
            this.hugh.update();
            this.mist.tilePositionX += 1;
            if (this.hugh.x >= 240 && this.hugh.x <= 260) {
                this.hugh.speed = 180
            }
            if (this.hugh.x >= 400 && this.hugh.x <= 420) {
                this.hugh.speed = 120;
            }
            if (this.hugh.x >= 600 && this.hugh.x <= 620) {
                this.hugh.speed = 30;
            }
            

            if(this.hugh.x >= 650){
                this.hugh.body.setVelocity(0);
                this.input.keyboard.enabled = false;
                if(!this.deathPlayed){
                    this.deathPlayed = true;
                    this.hugh.anims.play('handmorph');
                    this.hugh.breathe.stop();
                }
                
            }

        }
    }
}