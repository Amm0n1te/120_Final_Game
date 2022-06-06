class Eye extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        scene.add.existing(this);
        this.spottedDuration = 0;
        this.maxSpotted = 20;
        this.eyeStatus = -1;
        this.canyonColor = 1; //1 for black, -1 for gray
        this.startDelay = 1000;
        this.blinkInterval = 4000;
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
        this.anims.create({   //eyeDown blink, iris changes from black to grey
            key: 'blinkBG',  
            frames: this.anims.generateFrameNumbers('eyeDownSheet', { start: 0, end: 10 }),
            repeat: 0,
            framerate: 20 //this doesn't affect the framerate for some reason
        })
        this.anims.create({
            key: 'blinkGB',
            frames: this.anims.generateFrameNumbers('eyeDownSheet', { start: 10, end: 0 }),
            repeat: 0, 
            frameRate: 20
        })
        this.anims.create({
            key: 'idleBlack',
            frames: this.anims.generateFrameNumbers('eyeDownSheet', { start: 0, end: 0}),
            repeat: 0,
            frameRate: 0
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
            if (this.texture.key == 'sideeye') this.blink();
        }, null, this.scene);
        if (this.texture.key == 'eyeDownSheet') {
            //this.play('idleBlack');
            this.scene.time.delayedCall(this.startDelay, () => {
                this.canyonBlink();
            })
        }
        
    }

    blink() {
        this.eyeStatus *= -1;
        if(this.eyeStatus == 1){
            this.play("open");
        }else{
            this.play("close");
        }
        this.scene.time.delayedCall(this.blinkInterval, () => {
            this.blink();
        })
    }

    canyonBlink() {
        console.log("in canyonBlink");
        this.canyonColor *= -1; //1 for black, -1 for gray
        if (this.canyonColor == 1) this.play("blinkGB");
        else if (this.canyonColor == -1) this.play("blinkBG");
        this.scene.time.delayedCall(this.blinkInterval, () => {
            this.canyonBlink();
        })
    }


    update(Player) {
        //eye collision

        if (this.texture.key == 'eyeDownSheet') this.canyonUpdate(Player);
        else this.checkSight(Player);
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
            if(((Player.x > this.x && Player.x < this.x + this.width) || //checking x collision
            (Player.x+Player.width > this.x && Player.x+Player.width < this.x+this.width)) 
            && ((Player.y > this.y-this.height && Player.y < this.y+this.height))) {
                this.spottedDuration++;
                if (this.spottedDuration == this.maxSpotted){
                    Player.die();
                } 
            }else this.spottedDuration = 0;


        }
    }


    canyonUpdate(Player) {
    }

}