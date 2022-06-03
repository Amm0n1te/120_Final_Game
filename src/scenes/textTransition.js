nextScene = "play";

//TextTransition is called at the end of each level.  
class TextTransition extends Phaser.Scene {
    constructor() { //pass scene as a string
        super('textTransition');
    }

    create() {
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        console.log("textTransition ", nextScene);

        if (nextScene == "play") {
            //display lore text for play scene
            this.playText = this.add.sprite(0,0, 'crazy_cat').setOrigin(0, 0);

            //console.log("textTransition ", nextScene);
            nextScene = "forest";
        } 
        else if (nextScene == "forest") {
            //display lore text for forest scene
            this.forestText = this.add.sprite(0,0, 'crazy_cat').setOrigin(0, 0);

            //console.log("textTransition ", nextScene);
            nextScene = "crevice";
        } 
        else if (nextScene == "crevice") {
            //display lore text for crevice scene
            this.creviceText = this.add.sprite(0,0, 'crazy_cat').setOrigin(0, 0);

            //console.log("textTransition ", nextScene);
            nextScene = "ending";
        } 
        else if (nextScene == "ending") {
            //display lore text for ending scene
            this.endingText = this.add.sprite(0,0, 'crazy_cat').setOrigin(0, 0);

            //console.log("textTransition ", nextScene);
            nextScene = "play";
        }
    }



    update() {
        if (Phaser.Input.Keyboard.JustDown(spacebar)) this.scene.start(nextScene);
    }

}