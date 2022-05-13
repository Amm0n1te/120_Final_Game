class Title extends Phaser.Scene { //we can use menu to load all the assets for now
    constructor() {
        super("title");
    }

    preload() {
        this.load.image('background', 'assets/placeholderBG.png')
        this.load.image('hugh', 'assets/hugh.png');
    }

    create(){
        this.scene.start('play');
        //this.testRect = this.add.rectangle(100, 300, 80, 130, 0xffffff);
    }
}