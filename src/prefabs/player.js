class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.breathe = scene.tweens.add({
            targets: this,
            scale: 1.05,
            duration: 900,
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1,
        });
        this.deathSound = this.scene.sound.add('death', {volume: 0.3});
        this.hitSound = this.scene.sound.add('hitSound', {volume: 0.5});
        scene.physics.add.existing(this);
        this.speed = 260;
        this.color = 1;  //1 is black, -1 is gray
        this.camo = false;
        this.dying = false;
        this.walking = this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('hughWalkSheet', { start: 0, end: 4, }),
            repeat: -1,
            frameRate: 10,
        })
        this.grayWalking = this.anims.create({
            key: 'grayWalking',
            frames: this.anims.generateFrameNumbers('hughWalkSheetGray', { start: 0, end: 4, }),
            repeat: -1,
            frameRate: 10
        })
        this.idle = this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('hugh', { start: 0, end:0, }),
            repeat: -1,
            frameRate: 0,
        })
        this.grayIdle = this.anims.create({
            key: 'grayIdle',
            frames: this.anims.generateFrameNumbers('hughGrayIdleSheet', { start: 0, end: 0 }),
            repeat: -1,
            frameRate: 0
        })
        this.jumping = this.anims.create({
            key: 'hughJump',
            frames: this.anims.generateFrameNumbers('hughJump', { start: 0, end: 9 }),
            repeat: 0,
            frameRate: 10
        })
        this.jumpingGray = this.anims.create({
            key: 'hughJumpGray',
            frames: this.anims.generateFrameNumbers('hughJumpGray', { start: 0, end: 9 }),
            repeat: 0,
            frameRate: 10
        })
        this.hitting = this.anims.create({
            key: 'hughHit',
            frames: this.anims.generateFrameNumbers('hughHit', {start: 0, end: 8}),
            repeat: 0,
            frameRate: 60
        })
        this.hittingGray = this.anims.create({
            key: 'hughHitGray',
            frames: this.anims.generateFrameNumbers('hughHitGray', {start: 0, end: 8}),
            repeat: 0,
            frameRate: 60
        })
        this.death = this.anims.create({
            key: 'hughDeath',
            frames: this.anims.generateFrameNumbers('hughDeath', {start: 0, end: 22}),
            repeat: 0,
            frameRate: 30
        })
        this.handmorph = this.anims.create({
            key: 'handmorph',
            frames: this.anims.generateFrameNumbers('hughHandSheet', {start: 0, end: 31}),
            repeat: 0,
            frameRate: 30
        })

        this.strikeDistance = 40;
        
        this.isWalking = false;
        this.isJumping = false;
        this.jumpControl = false;
        this.leftWalking = false;
        this.rightWalking = false;
        this.spacebools = false;
    }

    create() {
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.setAllowGravity(true);
        this.body.immovable = false;
    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && this.dying == false){
            this.leftWalking = true;
            if (this.color == 1) this.play('walking');
            else if (this.color == -1) this.play('grayWalking');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)&& this.dying == false){
            this.rightWalking = true;
            if (this.color == 1) this.play('walking');
            else if (this.color == -1) this.play('grayWalking');
        }

        if(Phaser.Input.Keyboard.JustUp(keyRIGHT)&& this.dying == false){
            this.rightWalking = false;
            if (!this.leftWalking) {
                if (this.color == 1) this.play('idle');
                else if (this.color == -1) this.play('grayIdle');
            }
        }
        if(Phaser.Input.Keyboard.JustUp(keyLEFT)&& this.dying == false){
            this.leftWalking = false;
            if (!this.rightWalking) {
                if (this.color == 1) this.play('idle');
                else if (this.color == -1) this.play('grayIdle');
            }
        }

        //movement controls
        if (keyLEFT.isDown && this.x > 0 && this.dying == false) {
            this.flipX = true;
            this.body.setVelocityX(-this.speed);
        }
        else if (keyRIGHT.isDown && this.x < game.config.width-this.width && this.dying == false) {
            
            this.flipX = false;
            this.body.setVelocityX(this.speed);
        }
        if ((!this.leftWalking && !this.rightWalking) || this.dying) this.body.setVelocityX(0);

        if (this.body.touching.down && Phaser.Input.Keyboard.JustDown(keyUP)&& this.dying == false) {
            this.body.setVelocityY(-900);
            this.isJumping = true;
            if(this.color == 1){
                this.play('hughJump');
            }else if(this.color == -1) {
                this.play('hughJumpGray');
            }
            
        }

        //color changing
        //apparently, Phaser.Input.Keyboard.JustDown(spacebar) only works once in the same tick.  I've used it once in Play update, so 
        //I resort to using a bool to make it trigger once for each button press.
        if (spacebar.isDown && !keyLEFT.isDown && !keyRIGHT.isDown && this.spacebools == false && !this.dying && this.body.touching.down) {
            this.spacebools = true;
            this.hitSound.play();
            if (this.color == 1) { //1 is black
                this.play('hughHit');
            }
            if (this.color == -1) { //-1 is grey
                this.play('hughHitGray'); //replace this with hughHitGrey
            }
        }
        if (!spacebar.isDown) this.spacebools = false;



        if (this.y > game.config.height) this.y = -100;
    }

    die(){
        this.dying = true;
        this.scene.input.keyboard.enabled = false;
        this.play('hughDeath');
        this.deathSound.play();
        this.on('animationcomplete', () => {
                this.scene.input.keyboard.enabled = true;
                this.scene.scene.restart();
        });
    }

}