class Title extends Phaser.Scene { //we can use menu to load all the assets for now
    constructor() {
        super("title");
    }

    create(){
        this.testRect = this.add.rectangle(100, 300, 80, 130, 0xffffff);
    }
}