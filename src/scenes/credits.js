class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    create() {
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.enabled = true;
        this.credits = this.add.sprite(0, 0, 960, 720, 'creditsScreen').setOrigin(0, 0);
        this.credits.anims.create({
            key: 'creditsAnim',
            frames: this.anims.generateFrameNumbers('creditsScreen', { start: 0, end: 3, }),
            repeat: -1,
            frameRate: 5,
        })
        this.credits.play('creditsAnim');
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(spacebar)) this.scene.start('title');
    }

}