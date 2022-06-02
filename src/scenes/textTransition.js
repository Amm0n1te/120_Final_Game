nextScene = "play";

//TextTransition is called at the end of each level.  
class TextTransition extends Phaser.Scene {
    constructor() { //pass scene as a string
        super('textTransition');
    }

    create() {
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        if (nextScene == "play") {
            //display lore text for play scene
            console.log("textTransition ", nextScene);
            nextScene = "forest";
        } 
        else if (nextScene == "forest") {
            //display lore text for forest scene
            console.log("textTransition ", nextScene);
            nextScene = "crevice";
        } 
        else if (this.nextScene == "crevice") {
            //display lore text for crevice scene
            console.log("textTransition ", nextScene);
            nextScene = "play";
        }
    }



    update() {
        if (Phaser.Input.Keyboard.JustDown(spacebar)) this.scene.start(nextScene);
    }

}