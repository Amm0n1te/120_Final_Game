class Forest extends Phaser.Scene {
    constructor() {
        super('forest');
    }

    create() {
        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.MAX_VELOCITY = 300;
        this.physics.world.gravity.y = 2000;
        
        this.background = this.add.tileSprite(0,0, 960, 720, 'background').setOrigin(0, 0);
        this.mist = this.add.tileSprite(0, 0, 960, 720, 'mist').setOrigin(0, 0);


        this.frameTime = 0;

        //add background elements
        //MAKE SURE TO SWITCH POSITIONS OF BLACK AND GRAY HANDS!
        this.rightHand = this.add.sprite(750, 400, 'rightHand').setOrigin(0.5,0.5);
        this.leftHand = this.add.sprite(650, 400, 'leftHand').setOrigin(0.5,0.5);

        this.rightHandGray = this.add.sprite(130, 400, 'rightHandGray');//600 750
        this.leftHandGray = this.add.sprite(300, 500, 'leftHandGray');

        this.cairn = this.add.sprite(420, 500, 'cairn').setOrigin(0, 0);
        this.cairn.setScale(1.2);

        this.hugh = new Player(this, 20, 445, 'hugh').setOrigin(0,0);
        this.hugh.color = -1;
        this.hugh.play('grayIdle');
        this.strikeDistance = 40;
        this.eye = new Eye(this, 655, 11, 'eyeDown').setOrigin(0,0);
        this.eye.maxSpotted = 10;
        this.frontGround = this.add.sprite(game.config.width/2, 610, 'floor');
        this.bottomGround = this.physics.add.sprite(game.config.width/2, 640, 'floor');
        this.bottomGround.body.immovable = true;
        this.bottomGround.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.bottomGround);
        this.groundground = this.add.sprite(game.config.width/2, 700, 'floor');
    }

    update(time, delta) {
        this.frameTime += delta;
        if (this.frameTime > 16.5) {
            this.frameTime = 0;
            
            //Setting and checking Hugh camo for black hands
            if (this.hugh.x > this.leftHand.x - 80 && this.hugh.x < this.rightHand.x - 40 && this.hugh.color == 1){
                this.hugh.camo = true;
                console.log("camo");
            } else if (this.hugh.x > this.rightHandGray.x - 80 && this.hugh.x < this.leftHandGray.x - 40 && this.hugh.color == -1){
                this.hugh.camo = true;
                console.log("grayCamo");
            }else{
                this.hugh.camo = false;
                console.log("no camo");
            }


            
            //hugh hitting checking
            if (Phaser.Input.Keyboard.JustDown(spacebar) && !keyLEFT.isDown && !keyRIGHT.isDown) {
                console.log(this.hugh.color)
                if (this.hugh.flipX == false) { //check if he hit something when he's facing right
                    if ((this.hugh.x+this.hugh.width+this.strikeDistance >= this.cairn.x && this.hugh.x < this.cairn.x+this.cairn.width)) {
                        this.hugh.color = 1;
                    }
                }
                else if (this.hugh.flipX == true) { //check if he hit something when he's facing left
                    if ((this.hugh.x-this.strikeDistance > this.cairn.x && this.hugh.x-this.strikeDistance < this.cairn.x+this.cairn.width)) {
                        this.hugh.color = 1;
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


            this.eye.x -= 7;
            if (this.eye.x < -200) this.eye.x = game.config.width + 200;
            
            this.hugh.update();
            this.eye.update(this.hugh);
            this.mist.tilePositionX += 1;

            if(this.hugh.x+this.hugh.width >= game.config.width){
                this.scene.start('crevice');
            }
        }

    }
}