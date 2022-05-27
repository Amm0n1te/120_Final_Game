class Forest extends Phaser.Scene {
    constructor() {
        super('forest');
    }

    create() {
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.MAX_VELOCITY = 300;
        this.physics.world.gravity.y = 2000;
        
        this.background = this.add.tileSprite(0,0, 960, 720, 'background').setOrigin(0, 0);
        this.mist = this.add.tileSprite(0, 0, 960, 720, 'mist').setOrigin(0, 0);


        this.frameTime = 0;

        //add background elements
        MAKE SURE TO SWITCH POSITIONS OF BLACK AND GRAY HANDS!
        this.rightHand = this.add.sprite(300, 400, 'rightHand').setOrigin(0.5,0.5);
        this.leftHand = this.add.sprite(200, 400, 'leftHand').setOrigin(0.5,0.5);

        this.rightHandGray = this.add.sprite(600, 400, 'rightHandGray');
        this.leftHandGray = this.add.sprite(750, 500, 'leftHandGray');

        this.cairn = this.add.sprite(420, 500, 'cairn').setOrigin(0, 0);
        this.cairn.setScale(1.2);

        this.hugh = new Player(this, 290, 445, 'hugh').setOrigin(0,0);
        this.hugh.color = -1;
        this.hugh.play('grayIdle');
        this.eye = new Eye(this, 655, 11, 'eyeDown').setOrigin(0,0);

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
            } else if (this.hugh.x > this.leftHandGray.x - 80 && this.hugh.x < this.rightHandGray.x - 40 && this.hugh.color == 1){
                this.hugh.camo = true;
                console.log("grayCamo");
            }else{
                this.hugh.camo = false;
                console.log("no camo");
            }


            this.eye.x -= 8;
            if (this.eye.x < -200) this.eye.x = game.config.width + 200;
            
            this.hugh.update();
            this.mist.tilePositionX += 1;
        }

    }
}