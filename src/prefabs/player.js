class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 6;
        this.color = 1;
        this.camo = false;
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
        this.hitting = this.anims.create({
            key: 'hughHit',
            frames: this.anims.generateFrameNumbers('hughHit', {start: 0, end: 8}),
            repeat: 0,
            frameRate: 60
        })
        
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

        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.leftWalking = true;
            if (this.color == 1) this.play('walking');
            else if (this.color == -1) this.play('grayWalking');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.rightWalking = true;
            if (this.color == 1) this.play('walking');
            else if (this.color == -1) this.play('grayWalking');
        }

        if(Phaser.Input.Keyboard.JustUp(keyRIGHT)){
            this.rightWalking = false;
            if (!this.leftWalking) {
                if (this.color == 1) this.play('idle');
                else if (this.color == -1) this.play('grayIdle');
            }
        }
        if(Phaser.Input.Keyboard.JustUp(keyLEFT)){
            this.leftWalking = false;
            if (!this.rightWalking) {
                if (this.color == 1) this.play('idle');
                else if (this.color == -1) this.play('grayIdle');
            }
        }

        //movement controls
        if (keyLEFT.isDown && this.x > 0) {
            this.flipX = true;
            this.x -= this.speed;
        }
        else if (keyRIGHT.isDown && this.x < game.config.width-this.width) {
            
            this.flipX = false;
            this.x += this.speed;
        }
        

        /*if (this.body.touching.down) {
            this.isJumping = false;
            if (this.anims.isPlaying && player.anims.currentAnim.key === 'hughJump') {

            }
        }*/
        if (this.body.touching.down && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.body.setVelocityY(-900);
            this.isJumping = true;
            this.play('hughJump');
            //stop all running animations
            //start jump animations
            //this.jumpControl = true;
        }
        /*if (this.jumpControl == true) {
            this.jumpControl = false;
            this.play('hughJump');
        }*/
        /*if (this.body.touching.down && Phaser.Input.Keyboard.DownDuration(keyUP, 150)) {
            this.body.setVelocityY(-400);
        }
        else if (this.body.touching.down && keyUP.isDown) {
            this.body.setVelocityY(-700);
        }*/

        //color changing
        //apparently, Phaser.Input.Keyboard.JustDown(spacebar) only works once in the same tick.  I've used it once in Play update, so 
        //I resort to using a bool to make it trigger once for each button press.
        if (spacebar.isDown && !keyLEFT.isDown && !keyRIGHT.isDown && this.spacebools == false) {
            this.spacebools = true;
            if (this.color == 1) { //1 is black
                console.log("hit from within player object");
                this.play('hughHit');
            }
            if (this.color == -1) { //-1 is grey
                this.play('hughHit'); //replace this with hughHitGrey
            }
        }
        if (!spacebar.isDown) this.spacebools = false;



        if (this.y > game.config.height) this.y = -100;
    }

}