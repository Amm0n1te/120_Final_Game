class Ending extends Phaser.Scene {
    constructor() {
        super('ending');
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
        this.hugh = new Player(this, 88, 445, 'hugh', 0).setOrigin(0,0);
        
        this.shrine = this.add.sprite(460, 500, 'shrine').setOrigin(0, 0);
        this.shrine.setScale(1.2);

        this.testPlatform = this.physics.add.sprite(game.config.width/2, 640, 'floor');
        this.testPlatform.body.immovable = true;
        this.testPlatform.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.testPlatform);

        this.frontGround = this.add.sprite(game.config.width/2, 610, 'floor');
        this.bottomGround = this.add.sprite(game.config.width/2, 730, 'floor');

        
        this.cat = this.add.sprite(100, 20, 'crazy_cat').setOrigin(0,0);
        this.cat.alpha = 0;

        this.frameTime = 0;
    }

    update(time, delta) {
        this.frameTime += delta;
        if (this.frameTime > 16.5) {
            this.frameTime = 0;

            //hugh input checking
            if (Phaser.Input.Keyboard.JustDown(spacebar) && !keyLEFT.isDown && !keyRIGHT.isDown && this.hugh.body.touching.down) {
                console.log(this.hugh.color)
                if (this.hugh.flipX == false) { //check if he hit something when he's facing right
                    if ((this.hugh.x+this.hugh.width+this.hugh.strikeDistance > this.shrine.x && this.hugh.x < this.shrine.x+this.shrine.width)) {
                        console.log("ending triggered");
                        this.cat.alpha = 1;
                        finished = true;
                        this.time.delayedCall(4000, () => {
                            this.scene.start("title");
                        }, null, this);
                    }
                }
                else if (this.hugh.flipX == true) { //check if he hit something when he's facing left
                    if ((this.hugh.x-this.strikeDistance < this.shrine.x+this.shrine.width && this.hugh.x > this.shrine.x)) {
                        console.log("ending triggered");
                        this.cat.alpha = 1;
                        finished = true;
                        this.time.delayedCall(4000, () => {
                            this.scene.start("title");
                        }, null, this);
                    }
                }
                console.log("hugh color is ", this.hugh.color);
                if (this.hugh.color == 1) {
                    this.hugh.play('idle');
                }
                else if (this.hugh.color == -1) {
                    this.hugh.play('grayIdle');
                }
            }

            this.hugh.update();
            this.mist.tilePositionX += 1;

        }
    }
}