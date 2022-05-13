class Play extends Phaser.Scene {
    constructor () {
        super('play');
    }


    create() {
        this.background = this.add.tileSprite(0,0, 960, 720, 'background').setOrigin(0, 0);
        this.hugh = new Player(this, 300, 450, 'hugh').setOrigin(0,0);
        console.log("in play");
    }
}