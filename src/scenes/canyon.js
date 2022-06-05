class Canyon extends Phaser.Scene {

    constructor() {
        super('canyon');
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
        this.hugh = new Player(this, game.config.width/2, 445, 'hugh', 0).setOrigin(0,0);
        this.hugh.body.checkCollision.left = true;
        this.hugh.body.checkCollision.right = true;
        
        
        this.shrine = this.add.sprite(460, 500, 'shrine').setOrigin(0, 0);
        this.shrine.setScale(1.2);

        //ground
        this.groundground = this.add.sprite(game.config.width/2, 757, 'floor');
        this.bottomGround = this.physics.add.sprite(game.config.width/2, 780, 'floor');
        this.bottomGround.body.immovable = true;
        this.bottomGround.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.bottomGround);

        //canyon walls
        this.leftWallVisual = this.add.sprite(game.config.width/5, game.config.height/2, 'wall');
        this.rightWallVisual = this.add.sprite(4*game.config.width/5, game.config.height/2, 'wall');
        this.rightWallVisual.flipX = true;
        this.leftWallBound = this.physics.add.sprite(game.config.width/5-10, game.config.height/2+700, 'wall');
        this.leftWallBound.body.immovable = true;
        this.leftWallBound.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.leftWallBound);
        this.leftWallBound.body.checkCollision.right = true;
        this.rightWallBound = this.physics.add.sprite(4*game.config.width/5+10, game.config.height/2-300, 'wall');
        this.rightWallBound.body.immovable = true;
        this.rightWallBound.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.rightWallBound);
        this.rightWallBound.body.checkCollision.left = true;
        this.rightWallBound.flipX = true;

        

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