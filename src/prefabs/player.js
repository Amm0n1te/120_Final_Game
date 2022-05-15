class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 1;
        this.color = 1;
    }

    create() {
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.setAllowGravity(true);
        this.body.immovable = false;
    }

    update() {
        //movement controls
        if (keyLEFT.isDown && this.x > 0) {
            this.flipX = true;
            this.x -= this.speed;
        }
        else if (keyRIGHT.isDown && this.x < game.config.width-this.width) {
            this.flipX = false;
            this.x += this.speed;
        }
        
        if (this.body.touching.down && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.body.setVelocityY(-700);
        }

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