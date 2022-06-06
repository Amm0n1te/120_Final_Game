

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

        //ground
        this.groundground = this.add.sprite(game.config.width/2, 757, 'floor');
        this.bottomGround = this.physics.add.sprite(game.config.width/2, 780, 'floor');
        this.bottomGround.body.immovable = true;
        this.bottomGround.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.bottomGround);

        //shrines and cairn
        this.anims.create({
            key: 'shrineAnim',
            frames: this.anims.generateFrameNumbers('shrine', { start: 0, end: 8, }),
            repeat: -1,
            frameRate: 6
        })
        this.shrine1 = this.add.sprite(360, 480, 'shrine').setOrigin(0, 0);
        this.shrine1.setScale(1.2);
        this.shrine1.play('shrineAnim');

        this.cairn = this.add.sprite(580, 320, 'cairn').setOrigin(0, 0);
        this.cairn.setScale(1.2);
        this.anims.create({
            key: 'cairnAnim',
            frames: this.anims.generateFrameNumbers('cairn', { start: 0, end: 8, }),
            repeat: -1,
            frameRate: 6
        })
        this.cairn.play('cairnAnim');


        //ledges
        this.ledge1 = this.add.sprite(1.2*game.config.width/5, 550, "ledge").setOrigin(0,0);
        this.ledge1Collider = this.physics.add.sprite(1.2*game.config.width/5, 555, "ledgeCollider").setOrigin(0,0);
        this.ledge1Collider.body.immovable = true;
        this.ledge1Collider.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.ledge1Collider);
        this.ledge2 = this.add.sprite(3*game.config.width/5, 380, "ledge").setOrigin(0,0);
        this.ledge2.flipX = true;
        this.ledge2Collider = this.physics.add.sprite(3*game.config.width/5, 385, "ledgeCollider").setOrigin(0,0);
        this.ledge2Collider.body.immovable = true;
        this.ledge2Collider.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.ledge2Collider);
        this.ledge3 = this.add.sprite(1.2*game.config.width/5, 200, "ledge").setOrigin(0,0);
        this.ledge3Collider = this.physics.add.sprite(1.2*game.config.width/5, 205, "ledgeCollider").setOrigin(0,0);
        this.ledge3Collider.body.immovable = true;
        this.ledge3Collider.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.ledge3Collider);

        
        this.door = this.add.sprite(game.config.width+50, -220, 'door').setOrigin(1, 0);

        //canyon walls
        this.leftWallVisual = this.add.sprite(1.2*game.config.width/6, game.config.height/2, 'wall');
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

            //console.log(this.hugh.y+this.hugh.height, " >= ", this.ledge1Collider.y)
            /*this.beam1.y = this.eye.y + 100;

            if(this.eye.frame == 10){
                console.log('gray');
                this.beam1.alpha = 1;
                this.beam1.setTexture('grayBeam');
            }else if(this.eye.frame == 0){
                console.log('black');
                this.beam1.alpha = 1;
                this.beam1.setTexture('blackBeam');
            } //else this.beam1.alpha = 0;*/
            
            //hugh input checking
            if (Phaser.Input.Keyboard.JustDown(spacebar) && !keyLEFT.isDown && !keyRIGHT.isDown && this.hugh.body.touching.down) {
               if (this.hugh.y+this.hugh.height > this.ledge2Collider.y) {this.checkHit(this.shrine1)}
               else if (this.hugh.y+this.hugh.height > this.ledge3Collider.y) {this.checkHit(this.cairn)}
               //else {this.checkHit(this.shrine2)}

                if (this.hugh.color == 1) {
                    this.hugh.play('idle');
                }
                else if (this.hugh.color == -1) {
                    this.hugh.play('grayIdle');
                }
            }
            //this.eye.y = this.hugh.y-300;
            //this.eye.update(this.hugh);

            this.hugh.update();
            this.mist.tilePositionX += 1;
            if (this.hugh.y >= this.rightWallBound.y-this.rightWallBound.height && this.hugh.x+this.hugh.width >= game.config.width) {
                if (this.hugh.color == 1) endingColor = "black";
                else if (this.hugh.color == -1) endingColor = "gray";
                this.scene.start("ending");
            }

        }
    }




    checkHit(object) {
        if (this.hugh.flipX == false) { //check if he hit something when he's facing right
            if ((this.hugh.x+this.hugh.width+this.hugh.strikeDistance > object.x && this.hugh.x < object.x)) {
                if (object.texture.key == 'shrine'){
                    this.hugh.color = -1; 
                    ending = -1;
                }else{
                    this.hugh.color = 1;
                    ending = 1;
                } 
                
            }
        }
        else if (this.hugh.flipX == true) { //check if he hit something when he's facing left
            if ((this.hugh.x-this.hugh.strikeDistance < object.x+object.width && this.hugh.x+this.hugh.width > object.x)) {
                if (object.texture.key == 'shrine') this.hugh.color = -1;
                else this.hugh.color = 1;
                
            }
        }
    }

    
}


