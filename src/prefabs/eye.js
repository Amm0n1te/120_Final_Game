class Eye extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        scene.add.existing(this);
        this.spottedDuration = 0;
        this.maxSpotted = 20;
        this.eyeStatus = -1;
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
            key: 'stayopen',
            frames: this.anims.generateFrameNumbers('sideeyeBlink', { start: 0, end: 0, }),
            repeat: -1,
            frameRate: 7
        })
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('sideeyeBlink', { start: 4, end: 0, }),
            repeat: 0,
            frameRate: 9
        })
        this.anims.create({
            key: 'close',
            frames: this.anims.generateFrameNumbers('sideeyeBlink', { start: 0, end: 4, }),
            repeat: 0,
            frameRate: 5
        })
    }

    //use only with side facing eye
    create(startDelay, blinkInterval) {
        if (this.texture.key == 'sideeye'){
            this.play('closed');
        } 
        this.startDelay = startDelay;
        this.blinkInterval = blinkInterval;
        this.scene.time.delayedCall(startDelay, () => {
            this.blink();
        }, null, this.scene);
    }

    blink() {
        this.eyeStatus *= -1;
        if(this.eyeStatus == 1){
            this.play("open");
        }else{
            this.play("close");
        }
        //console.log("blink from ", this.texture.key);
        //this.play("open");
        //this.on('animationcomplete', () => {
        //    this.play("close");
        //});
        this.scene.time.delayedCall(this.blinkInterval, () => {
            this.blink();
        })
    }


    update(Player) {
        //eye collision
        if(((Player.x > this.x && Player.x < this.x + this.width) || //checking x collision
        (Player.x+Player.width > this.x && Player.x+Player.width < this.x+this.width)) 
        && ((Player.y > this.y-this.height && Player.y < this.y+this.height))) {

            console.log("eye collision")
            Player.die()
        }

        this.checkSight(Player);
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
        else if (this.texture.key == 'sideeye' || this.texture.key == 'sideeyeBlink') {
            if (this.start) {
                //check collision for y axis eye
            }
        }
    }

}