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

        //ledges
        this.ledge1 = this.physics.add.sprite(1.2*game.config.width/5, 550, "ledge").setOrigin(0,0);
        this.ledge1.body.immovable = true;
        this.ledge1.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.ledge1);
        this.ledge2 = this.physics.add.sprite(3*game.config.width/5, 380, "ledge").setOrigin(0,0);
        this.ledge2.flipX = true;
        this.ledge2.body.immovable = true;
        this.ledge2.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.ledge2);
        this.ledge3 = this.physics.add.sprite(1.2*game.config.width/5, 200, "ledge").setOrigin(0,0);
        this.ledge3.body.immovable = true;
        this.ledge3.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.ledge3);

        
        this.door = this.add.sprite(game.config.width, -30, 'door').setOrigin(1, 0);

        //canyon walls
        this.leftWallVisual = this.add.sprite(0.9*game.config.width/6, game.config.height/2, 'wall');
        this.rightWallVisual = this.add.sprite(6.4*game.config.width/6, 2.7*game.config.height/4, 'wall2');
        this.leftWallBound = this.physics.add.sprite(game.config.width/6-10, game.config.height/2, 'wall');
        this.leftWallBound.body.immovable = true;
        this.leftWallBound.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.leftWallBound);
        this.leftWallBound.body.checkCollision.right = true;
        this.rightWallBound = this.physics.add.sprite(5.1*game.config.width/6+10, 2.6*game.config.height/4, 'wall2');
        this.rightWallBound.body.immovable = true;
        this.rightWallBound.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.rightWallBound);
        this.rightWallBound.body.checkCollision.left = true;
        

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