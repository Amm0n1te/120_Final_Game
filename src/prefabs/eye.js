class Eye extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    create() {
        console.log('eye created');
        this.physics.add.collider(this, Player);
    }

    update() {
        this.checkSight(Player);
    }

    checkSight(Player) {
        //console.log(Player.x, " > ", this.x, "   &&   ", Player.x, " < ", this.x+this.width);
        /*if ((Player.x > this.x && Player.x < this.x+this.width) || (Player.x+Player.width > this.x && Player.x < this.x+width)) {
            console.log("collision detected");
        }*/
    }

}