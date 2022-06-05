class Title extends Phaser.Scene { //we can use menu to load all the assets for now
    constructor() {
        super("title");
    }
    
    //bojken 3
    preload() {

    }

    create(){
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.titlescreen = this.add.tileSprite(0, 0, 960, 720, 'titleScreen').setOrigin(0, 0);
        this.spaceImage = this.add.sprite(game.config.width/2, 550, 'space').setOrigin(0.5, 0);
        this.spaceImage.setScale(0.7);
        this.spaceImage.alpha = 0;
        this.keysImage = this.add.sprite(0, 0, 'keysImage').setOrigin(0,0);
        this.keysImage.alpha = 0;
        this.showKeys = false;

        this.tweens.add({
            targets: this.spaceImage,
            alpha: { value: 1, duration: 4000, ease: 'Power1', delay: 2000},
            yoyo: false,
            loop: 0

        });
    }

    update() {
        this.scene.start('canyon');
        /*this.time.delayedCall(6000, () => {
            this.spaceImage.alpha = 1;
        }, null, this);*/

        //finished is a variable that keeps track of whether or not the player has played through the game once already.
        //we don't want to show the controls to a player who has already beaten the game.
        if (!finished) {
            if (this.showKeys == false && Phaser.Input.Keyboard.JustDown(spacebar)) {
                this.titlescreen.alpha = 0;
                this.keysImage.alpha = 1;
                this.showKeys = true;
            }
            if (this.showKeys == true) {
                if (Phaser.Input.Keyboard.JustDown(spacebar)) this.scene.start('play');
            }
        } else if (finished) {
            if (Phaser.Input.Keyboard.JustDown(spacebar)) this.scene.start('play');
        }
    }
}