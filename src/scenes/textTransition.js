nextScene = "play";

//TextTransition is called at the end of each level.  
class TextTransition extends Phaser.Scene {
    constructor() { //pass scene as a string
        super('textTransition');
    }

    create() {
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        console.log("textTransition ", nextScene);

        this.playAnim = this.anims.create({
            key: 'playAnim',
            frames: this.anims.generateFrameNumbers('level1text', { start: 0, end: 1, }),
            repeat: -1,
            frameRate: 7,
        })
        this.forestAnim = this.anims.create({
            key: 'forestAnim',
            frames: this.anims.generateFrameNumbers('level2text', { start: 0, end: 1, }),
            repeat: -1,
            frameRate: 7,
        })
        this.creviceAnim = this.anims.create({
            key: 'creviceAnim',
            frames: this.anims.generateFrameNumbers('level3text', { start: 0, end: 1, }),
            repeat: -1,
            frameRate: 7,
        })
        /*this.endingAnim = this.anims.create({
            key: 'endingAnim',
            frames: this.anims.generateFrameNumbers('level4text', { start: 0, end: 1, }),
            repeat: -1,
            frameRate: 7,
        })*/

        //this.crazycat = this.add.sprite(0,0, 'crazy_cat').setOrigin(0,0);

        if (nextScene == "play") {
            //display lore text for play scene
            this.playText = this.add.sprite(0,0, 'level1text').setOrigin(0, 0);
            this.playText.play('playAnim');

            nextScene = "forest";
        } 
        else if (nextScene == "forest") {
            //display lore text for forest scene
            this.forestText = this.add.sprite(0,0, 'level2text').setOrigin(0, 0);
            this.forestText.play('forestAnim').setOrigin(0,0);

            nextScene = "crevice";
        } 
        else if (nextScene == "crevice") {
            
            //display lore text for crevice scene
            this.creviceText = this.add.sprite(0,0, 'level3text').setOrigin(0, 0);
            this.creviceText.play('creviceAnim').setOrigin(0,0);
            //this.crazycat = this.add.sprite(0,0, 'crazy_cat').setOrigin(0,0);
            nextScene = "canyon";
        } 
        else if (nextScene == "ending") {
            //display lore text for ending scene
            //this.endingText = this.add.sprite(0,0, 'level4text').setOrigin(0, 0);
            //this.endingText.play('endingAnim').setOrigin(0,0);
            this.crazycat = this.add.sprite(0,0, 'crazy_cat').setOrigin(0,0);
            nextScene = "play";
        }
    }



    update() {
        if (Phaser.Input.Keyboard.JustDown(spacebar)) this.scene.start(nextScene);
    }

}