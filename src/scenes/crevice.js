class Crevice extends Phaser.Scene {
    constructor(){
        super('crevice');
    }


    create() {
        this.add.sprite(0, 0, 'creviceBG').setOrigin(0, 0);
        //this.background = this.add.tileSprite(0,0, 960, 720, 'creviceBG').setOrigin(0, 0);
        //this.mist = this.add.tileSprite(0, 0, 960, 720, 'mist').setOrigin(0, 0);
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

        this.shrine = this.add.sprite(550, 250, 'shrine').setOrigin(0, 0);
        this.shrine.setScale(1.2);
        this.shrine.anims.create({
            key: 'shrineAnim',
            frames: this.anims.generateFrameNumbers('shrine', { start: 0, end: 8, }),
            repeat: -1,
            frameRate: 6
        })
        this.shrine.play('shrineAnim');

        this.tweens.add({
            targets: this.shrine,
            y: { value: this.shrine.y + 5, duration: 900, ease: "Sine.easeInOut"},
            yoyo: true,
            loop: -1
        })
        
        this.cairn = this.add.sprite(350, 470, 'cairn').setOrigin(0, 0);
        this.cairn.setScale(1.2);
        this.cairn.anims.create({
            key: 'cairnAnim',
            frames: this.anims.generateFrameNumbers('cairn', { start: 0, end: 8, }),
            repeat: -1,
            frameRate: 6
        })
        this.cairn.play('cairnAnim');

        this.hugh = new Player(this, 20, 0, 'hugh').setOrigin(0,0);
        this.strikeDistance = 40;
        this.grayCollider = this.physics.add.collider(this.hugh, this.grayPlatform1);
        this.blackCollider = this.physics.add.collider(this.hugh, this.blackPlatform1);
        this.physics.add.collider(this.hugh, this.ledge);
        this.door = this.add.sprite(game.config.width, 430, 'door').setOrigin(1, 0);

        this.groundground = this.add.sprite(game.config.width/2, 757, 'floor');
        this.bottomGround = this.physics.add.sprite(game.config.width/2, 780, 'floor');
        this.bottomGround.body.immovable = true;
        this.bottomGround.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.bottomGround);

        this.eye1 = new Eye(this,180, 180, 'sideeyeBlink', 4).setOrigin(0,0);
        this.eye1.flipX = true;
        this.eye1.create(1000, 3000);
        this.eye2 = new Eye(this, game.config.width-130, 380, 'sideeyeBlink', 4).setOrigin(0,0);
        this.eye2.create(2000, 3000);
        this.eye3 = new Eye(this,40, 580, 'sideeyeBlink', 4).setOrigin(0,0);
        this.eye3.flipX = true;
        this.eye3.create(3000, 3000);
        
        this.beam1 = this.add.sprite(170+this.eye1.width, 180, "sideeyebeam").setOrigin(0,0);
        this.beam1.flipX = true;
        this.beam2 = this.add.sprite(110-this.eye2.width, 380, "sideeyebeam").setOrigin(0,0);
        this.beam3 = this.add.sprite(34+this.eye3.width, 580, "sideeyebeam").setOrigin(0,0);
        this.beam3.flipX = true;

        this.beam1.alpha = 0;
        this.beam2.alpha = 0;
        this.beam3.alpha = 0;

    
        
    }


    update(time, delta) {
        this.frameTime += delta;
        if (this.frameTime > 16.5) {
            this.frameTime = 0;


            //if(this.hugh.y > 180 && this.hugh.y < 210 && this.beam1.alpha == 1){
            //    this.hugh.die();
            //}


            this.eye1.update(this.hugh);
            this.eye2.update(this.hugh);
            this.eye3.update(this.hugh);
            

            //console.log(this.hugh.camo);
            if(this.eye1.frame.name == 0){
                this.beam1.alpha = 1;
                this.hugh.camo = false;
            }else{
                //console.log(this.eye1.frame);
                this.beam1.alpha = 0;
                this.hugh.camo = true;
            }
            this.checkBeam(this.hugh, this.beam1);

            if(this.eye2.frame.name == 0){
                this.beam2.alpha = 1;
                this.hugh.camo = false;
            }else{
                //console.log(this.eye1.frame);
                this.beam2.alpha = 0;
                this.hugh.camo = true;
            }
            this.checkBeam(this.hugh, this.beam2);

            if(this.eye3.frame.name == 0){
                this.beam3.alpha = 1;
                this.hugh.camo = false;
            }else{
                //console.log(this.eye1.frame);
                this.beam3.alpha = 0;
                this.hugh.camo = true;
            }
            this.checkBeam(this.hugh, this.beam3);
            
            
            //hugh shrine hit checking
            if (Phaser.Input.Keyboard.JustDown(spacebar) && !keyLEFT.isDown && !keyRIGHT.isDown) {
                this.ybound = this.shrine.y;
                if (this.hugh.color == 1) {//if hugh color is black, check for hitting shrine
                    if (this.hugh.flipX == false) { //check if he hit something when he's facing right
                        if ((this.hugh.x+this.hugh.width+this.strikeDistance > this.shrine.x && this.hugh.x < this.shrine.x+this.shrine.width)
                        && this.hugh.y < this.ybound) {
                            this.hugh.color = -1
                            this.grayCollider.active = false;
                        }
                    }
                    else if (this.hugh.flipX == true) { //check if he hit something when he's facing left
                        if ((this.hugh.x-this.strikeDistance < this.shrine.x+this.shrine.width && this.hugh.x > this.shrine.x)
                        && this.hugh.y < this.ybound) {
                            this.hugh.color = -1;
                            this.grayCollider.active = false;
                        }
                    }
                } else if (this.hugh.color == -1) { //if hugh is grey, check if he is hitting a cairn
                    if (this.hugh.flipX == false) { //check if he hit something when he's facing right
                        if ((this.hugh.x+this.hugh.width+this.strikeDistance > this.cairn.x && this.hugh.x < this.cairn.x+this.cairn.width)
                        && this.hugh.y > this.ybound) {
                            this.hugh.color = 1;
                            this.blackCollider.active = false;
                        }
                    }
                    else if (this.hugh.flipX == true) { //check if he hit something when he's facing left
                        if ((this.hugh.x-this.strikeDistance < this.cairn.x+this.cairn.width && this.hugh.x > this.cairn.x)
                        && this.hugh.y > this.ybound) {
                            this.hugh.color = 1;
                            this.blackCollider.active = false; 
                        }
                    }
                }

                if (this.hugh.color == 1) {
                    this.hugh.play('idle');
                }
                else if (this.hugh.color == -1) {
                    this.hugh.play('grayIdle');
                }
            } //shrine collision if bracket

            this.hugh.update();

            if(this.hugh.x+this.hugh.width >= game.config.width && this.hugh.y > this.blackPlatform1.y){
                this.scene.start('textTransition');
            }

        }//frametime bracket
    }//update bracket

    checkBeam(hugh, beam){
        if(!hugh.dying && ((hugh.y > beam.y-beam.height && hugh.y < beam.y+beam.height)) && beam.alpha == 1){
            hugh.die();
        }
    }
}