class Test extends Phaser.Scene {
    constructor() {
        super('test');
    }
    
    create ()
    {
        this.MAX_VELOCITY = 300;
        this.physics.world.gravity.y = 2000;

        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.background = this.add.tileSprite(0,0, 960, 720, 'background').setOrigin(0, 0);
        this.mist = this.add.tileSprite(0, 0, 960, 720, 'mist').setOrigin(0, 0);
        this.hugh = new testPlayer(this, game.config.width/2, 445, 'hugh', 0).setOrigin(0,0);
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

        //
        this.rightWallBound = this.physics.add.sprite(900, 400, 'floor');
        this.rightWallBound.body.immovable = true;
        this.rightWallBound.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.rightWallBound);
        this.rightWallBound.body.checkCollision.left = true;
        this.rightWallBound.flipX = true;

        /*this.platform = this.physics.add.sprite(400, 400, 'floor');
        this.platform.setScale(0.4);
        this.platform.setImmovable(true);
        this.platform.body.allowGravity = false;*/
    
        this.player = this.physics.add.sprite(100, 450, 'hughGray');
        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.player, this.bottomGround);
        this.physics.add.collider(this.player, this.rightWallBound);
        this.rightWallBound.body.checkCollision.left = true;
        this.rightWallBound.body.checkCollision.right = true;

        this.frameTime = 0;
        //========================================================

        /*this.add.image(400, 300, 'background');
    
        this.ground = this.physics.add.staticImage(400, 568, 'floor').setScale(0.8).refreshBody();
    
        this.platform = this.physics.add.sprite(400, 400, 'floor');
        this.platform.setScale(0.4);
    
        this.platform.setImmovable(true);
        this.platform.body.allowGravity = false;
    
        this.player = this.physics.add.sprite(100, 450, 'hughGray');*/

    
        this.cursors = this.input.keyboard.createCursorKeys();
    
        /*this.physics.add.collider(this.player, this.platform);
    
        this.physics.add.collider(this.player, this.ground);*/
    
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

        //=============================================================
        if (Phaser.Input.Keyboard.JustDown(spacebar)) {
            this.player.body.setVelocityY(-900);
            
            //stop all running animations
            //start jump animations
            //this.jumpControl = true;
        }


        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-180);
    
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(180);
    
        }
        else
        {
            this.player.setVelocityX(0);
    
        }
    
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-900);
        }

    }


}



class testPlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 6;
    }

    create() {
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.setAllowGravity(true);
        this.body.immovable = false;
    }

    update() {
        if (keyLEFT.isDown) {
            this.setVelocityX(-180);
        }
        else if (keyRIGHT.isDown) {
            this.setVelocityX(180);
        }

        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.body.setVelocityY(-900);
        }


    }



}