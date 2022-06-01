class Play extends Phaser.Scene {
    constructor () {
        super('play');
    }


    create() {
        this.handEyeOffset = 30;
        this.MAX_VELOCITY = 300;
        this.physics.world.gravity.y = 2000;
        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.wind = this.sound.add('wind', {volume: 1.5});
        this.wind.play({loop: true});

        this.background = this.add.tileSprite(0,0, 960, 720, 'background').setOrigin(0, 0);
        this.mist = this.add.tileSprite(0, 0, 960, 720, 'mist').setOrigin(0, 0);
        this.hands = this.add.sprite(0, 0, 'hands').setOrigin(0, 0);
        this.shrine = this.add.sprite(460, 500, 'shrine').setOrigin(0, 0);
        this.shrine.setScale(1.2);
        //this.cairn.name = 'cairn';
        this.hugh = new Player(this, 88, 445, 'hugh', 0).setOrigin(0,0);
        this.eye = new Eye(this, 655, 11, 'eyeDown').setOrigin(0,0);
        this.door = this.add.sprite(game.config.width, 250, 'door').setOrigin(1, 0);

        
        this.testPlatform = this.physics.add.sprite(game.config.width/2, 640, 'floor');
        this.testPlatform.body.immovable = true;
        this.testPlatform.body.allowGravity = false;
        this.physics.add.collider(this.hugh, this.testPlatform);

        this.frontGround = this.add.sprite(game.config.width/2, 610, 'floor');
        this.bottomGround = this.add.sprite(game.config.width/2, 730, 'floor');

        this.frameTime = 0;
        this.strikeDistance = 40;
    }//bootyassbuttballspeenischeekspoopoopeepeecacadoodoosheissekusocoulemerdemierdacolanaalgasarschloechleanusnostaobojken

    update(time, delta) {
        this.frameTime += delta;
        if (this.frameTime > 16.5) {
            this.frameTime = 0;
            //collision with eye's cone of vision
            if(((this.hugh.x > this.eye.x && this.hugh.x+this.hugh.width < this.eye.x+this.eye.width) 
            || (this.hugh.x+this.hugh.width > this.eye.x && this.hugh.x < this.eye.x+this.eye.width))
            && (this.hugh.color == -1)){
                this.hugh.camo = true;
            }else{
                this.hugh.camo = false;
            }

            //hugh hitting checking
            if (Phaser.Input.Keyboard.JustDown(spacebar) && !keyLEFT.isDown && !keyRIGHT.isDown) {
                console.log(this.hugh.color)
                if (this.hugh.flipX == false) { //check if he hit something when he's facing right
                    if ((this.hugh.x+this.hugh.width+this.strikeDistance > this.shrine.x && this.hugh.x < this.shrine.x+this.shrine.width)) {
                        this.hugh.color = -1;
                    }
                }
                else if (this.hugh.flipX == true) { //check if he hit something when he's facing left
                    if ((this.hugh.x-this.strikeDistance > this.shrine.x && this.hugh.x-this.strikeDistance < this.shrine.x+this.shrine.width)) {
                        this.hugh.color = -1;
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
            this.eye.update(this.hugh);
            this.mist.tilePositionX += 1;

            //go to next scene
            if(this.hugh.x+this.hugh.width >= game.config.width){
                this.scene.start('forest');
            }

        }

    }
}