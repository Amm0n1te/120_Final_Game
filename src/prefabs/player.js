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
            frameRate: 2,
        })
        this.isWalking = false;
    }

    create() {
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.setAllowGravity(true);
        this.body.immovable = false;
    }

    update() {
        //movement controls
        if (keyLEFT.isDown && this.x > 0) {
            if(!(this.anims.isPlaying && this.anims.currentAnim.key === 'walking')){
                this.anims.play('walking');
            }
            
            this.flipX = true;
            this.x -= this.speed;
        }
        else if (keyRIGHT.isDown && this.x < game.config.width-this.width) {
            if(!(this.anims.isPlaying && this.anims.currentAnim.key === 'walking')){
                this.anims.play('walking');
            }
            
            this.flipX = false;
            this.x += this.speed;
        }
        
        if (this.body.touching.down && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.body.setVelocityY(-900);
        }
        /*if (this.body.touching.down && Phaser.Input.Keyboard.DownDuration(keyUP, 150)) {
            this.body.setVelocityY(-400);
        }
        else if (this.body.touching.down && keyUP.isDown) {
            this.body.setVelocityY(-700);
        }*/

        //color changing
        if (Phaser.Input.Keyboard.JustDown(spacebar)) {
            console.log("spacebar detected");
            this.color *= -1;
        }
        if (this.color == 1) {
            this.setTexture('hugh');
        }
        if (this.color == -1) {
            this.setTexture('hughGray');
        }

        if (this.y > game.config.height) this.y = -100;
    }

}