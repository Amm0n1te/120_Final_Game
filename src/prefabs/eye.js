class Eye extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        scene.add.existing(this);
        this.spottedDuration = 0;
        this.maxSpotted = 20;
        this.anims.create({
            key: 'blink',
            frames: this.anims.generateFrameNumbers('sideeyeBlink', { start: 0, end: 4, }),
            repeat: -1,
            frameRate: 7
        })
        this.anims.create({
            key: 'closed',
            frames: this.anims.generateFrameNumbers('sideeyeBlink', { start: 4, end: 4, }),
            repeat: -1,
            frameRate: 7
        })
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('sideeyeBlink', { start: 0, end: 0, }),
            repeat: -1,
            frameRate: 7
        })
    }

    create() {
        if (this.texture.key == 'sideeye'){
            this.play('closed');
        } 
    }


    update(Player) {
        this.checkSight(Player);
        //console.log(this.texture.key);
    }

    checkSight(Player) {
        if(this.texture.key == 'eyeDown'){
            if (Player.camo == false &&
                ((Player.x > this.x && Player.x < this.x+this.width) || (Player.x+Player.width > this.x && Player.x+Player.width < this.x+this.width))) {
                this.spottedDuration++;
                if (this.spottedDuration == this.maxSpotted){
                    Player.die();
                } 
            } else this.spottedDuration = 0;
        }
        else if (this.texture.key == 'sideeye') {
            //check collision for y axis eye
            //console.log("SDLFKIJSDFOI");
        }
    }

}