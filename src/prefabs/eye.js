class Eye extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        scene.add.existing(this);
        this.spottedDuration = 0;
    }

    create() {
        console.log('eye created');
        this.physics.add.collider(this, Player);
    }

    update(Player) {
        this.checkSight(Player);
    }

    checkSight(Player) {
        //console.log(Player.x, " > ", this.x, "   &&   ", Player.x, " < ", this.x+this.width);
        if (Player.camo == false &&
            ((Player.x > this.x && Player.x < this.x+this.width) || (Player.x+Player.width > this.x && Player.x+Player.width < this.x+this.width))) {
            console.log("collision detected");
            this.spottedDuration++;
            if (this.spottedDuration > 20) this.scene.scene.restart();
        } else this.spottedDuration = 0;

    }

}