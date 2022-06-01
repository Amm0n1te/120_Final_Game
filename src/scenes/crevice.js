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
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.ledge = this.physics.add.sprite(0, 170, "ledge").setOrigin(0,0);
        this.ledge.body.immovable = true;
        this.ledge.body.allowGravity = false;
        

        this.blackPlatform1 = this.physics.add.sprite(0, 530, "blackPlatform").setOrigin(0,0);
        this.blackPlatform1.anims.create({
            key: 'shadow',
            frames: this.anims.generateFrameNumbers('blackPlatform', { start: 0, end: 2, }),
            repeat: -1,
            frameRate: 7
        })
        this.blackPlatform1.play('shadow');
        this.blackPlatform1.setScale(1.37);
        
        
        this.grayPlatform1 = this.physics.add.sprite(0, 310, "moonPlatform").setOrigin(0,0);
        this.grayPlatform1.anims.create({
            key: 'moon',
            frames: this.anims.generateFrameNumbers('moonPlatform', { start: 0, end: 2, }),
            repeat: -1,
            frameRate: 7
        })
        this.grayPlatform1.play('moon');
        this.grayPlatform1.setScale(1.37);
        
        this.blackPlatform1.body.immovable = true;
        this.blackPlatform1.body.allowGravity = false;
        this.grayPlatform1.body.immovable = true;
        this.grayPlatform1.body.allowGravity = false;

        this.shrine = this.add.sprite(450, 250, 'shrine').setOrigin(0, 0);
        this.shrine.setScale(1.2);
        this.cairn = this.add.sprite(450, 470, 'cairn').setOrigin(0, 0);
        this.cairn.setScale(1.2);

        this.hugh = new Player(this, 20, 0, 'hugh').setOrigin(0,0);
        this.strikeDistance = 40;
        this.physics.add.collider(this.hugh, this.grayPlatform1);
        this.physics.add.collider(this.hugh, this.blackPlatform1);
        this.physics.add.collider(this.hugh, this.ledge);

        this.groundground = this.add.sprite(game.config.width/2, 757, 'floor');
        this.bottomGround = this.physics.add.sprite(game.config.width/2, 780, 'floor');
        this.bottomGround.body.immovable = true;
        this.bottomGround.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.bottomGround);
    }


    update(time, delta) {
        this.frameTime += delta;
        if (this.frameTime > 16.5) {
            this.frameTime = 0;
            
            //update code here
            this.mist.tilePositionX += 1;
            
            //hugh shrine hit checking
            if (Phaser.Input.Keyboard.JustDown(spacebar) && !keyLEFT.isDown && !keyRIGHT.isDown) {
                this.ybound = this.shrine.y;
                if (this.hugh.color == 1) {//if hugh color is black, check for hitting shrine
                    if (this.hugh.flipX == false) { //check if he hit something when he's facing right
                        //console.log(this.hugh.x+this.hugh.width+this.strikeDistance, " > ", this.shrine.x);
                        //console.log(this.hugh.x, " < ", this.shrine.x+this.shrine.width)
                        if ((this.hugh.x+this.hugh.width+this.strikeDistance > this.shrine.x && this.hugh.x < this.shrine.x+this.shrine.width)
                        && this.hugh.y < this.ybound) {
                            console.log("joaisdf");
                            this.hugh.color = -1;
                            this.physics.remove.collider(this.hugh, this.grayPlatform1);
                        }
                    }
                    else if (this.hugh.flipX == true) { //check if he hit something when he's facing left
                        if ((this.hugh.x-this.strikeDistance < this.shrine.x+this.shrine.width && this.hugh.x > this.shrine.x)
                        && this.hugh.y < this.ybound) {
                            this.hugh.color = -1;
                        }
                    }
                    console.log("this.hugh.color = ", this.hugh.color);
                } else if (this.hugh.color == -1) { //if hugh is grey, check if he is hitting a cairn
                    if (this.hugh.flipX == false) { //check if he hit something when he's facing right
                        if ((this.hugh.x+this.hugh.width+this.strikeDistance > this.cairn.x && this.hugh.x < this.cairn.x+this.cairn.width)
                        && this.hugh.y > this.ybound) {
                            this.hugh.color = 1;
                        }
                    }
                    else if (this.hugh.flipX == true) { //check if he hit something when he's facing left
                        if ((this.hugh.x-this.strikeDistance < this.cairn.x+this.cairn.width && this.hugh.x > this.cairn.x)
                        && this.hugh.y > this.ybound) {
                            this.hugh.color = 1; 
                        }
                    }
                }

                console.log("hugh color is ", this.hugh.color);
                if (this.hugh.color == 1) {
                    this.hugh.play('idle');
                }
                else if (this.hugh.color == -1) {
                    this.hugh.play('grayIdle');
                }
            } //shrine collision if bracket

            this.hugh.update();

        }//frametime bracket
    }//update bracket
}