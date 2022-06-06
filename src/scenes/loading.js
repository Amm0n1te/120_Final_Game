class Loading extends Phaser.Scene {
    preload() {

        this.progress = 0;

        this.load.on('progress', function (value) {
            this.progress = value;
        });
        this.add.text(game.config.width/2, game.config.height/2, this.progress).setOrigin(0.5,0.5);
                    
        //title stuff
        this.load.image('titleScreen', 'assets/placeholderTitle.png');
        this.load.image('keysImage', 'assets/controls.png');
        this.load.image('space', 'assets/space.png');
        this.load.image('crazy_cat', 'assets/crazy_cat_3.png');
        this.load.image('harold', 'assets/harold.png');


        //level 1
        this.load.spritesheet('hughWalkSheet', 'assets/hughWalkSheet.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 4});
        this.load.spritesheet('hughWalkSheetGray', 'assets/hughWalkSheetGray.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 4});
        this.load.image('background', 'assets/placeholderGray.png')
        this.load.spritesheet('hugh', 'assets/hugh.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 0});
        this.load.image('hughGray', 'assets/hughDarkGrey.png');
        this.load.spritesheet('hughGrayIdleSheet', 'assets/hughDarkGrey.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 0});
        this.load.spritesheet('hughJump', 'assets/hughJump.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 9});
        this.load.spritesheet('hughJumpGray', 'assets/hughJumpGray.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 9});
        this.load.spritesheet('hughHit', 'assets/hughHitSheet.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 8});
        this.load.spritesheet('hughHitGray', 'assets/hughHitSheetGray.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 8});
        this.load.audio('hitSound', 'assets/hugh_slash.mp3');
        this.load.spritesheet('hughDeath', 'assets/hughDeathSheet.png', {frameWidth:80, frameHeight: 130, startFrame: 0, endFrame: 22});
        this.load.audio('wind', 'assets/wind.wav');
        this.load.audio('death', 'assets/reverse_bubbling.mp3');
        this.load.image('floor', 'assets/ground.png');
        this.load.image('hands', 'assets/hands1.png');
        this.load.image('mist', 'assets/mist.png');
        this.load.image('door', 'assets/door.png');
        this.load.image('eyeDown', 'assets/eyedown.png');
        this.load.spritesheet('cairn', 'assets/cairnSheet.png', {frameWidth:87, frameHeight: 62, startFrame: 0, endFrame: 8});
        this.load.spritesheet('shrine', 'assets/shrineSheet.png', {frameWidth:87, frameHeight: 44, startFrame: 0, endFrame: 8});

        //level 2
        this.load.image('rightHand', 'assets/rightHand.png');
        this.load.image('rightHandGray', 'assets/rightHandGray.png');
        this.load.image('leftHand', 'assets/leftHand.png');
        this.load.image('leftHandGray', 'assets/leftHandGray.png');

        //level 3: Crevice
        this.load.spritesheet('blackPlatform', 'assets/shadowPlatformSheet.png', {frameWidth: 700, frameHeight: 28, startFrame: 0, endFrame: 2});
        this.load.spritesheet('moonPlatform', 'assets/moonPlatformSheet.png', {frameWidth: 700, frameHeight: 28, startFrame: 0, endFrame: 2});
        this.load.image('sideeye', 'assets/sideeye.png');
        this.load.image('sideeyebeam', 'assets/sideeyebeam.png');
        this.load.spritesheet('sideeyeBlink', 'assets/sideeyeBlink.png', {frameWidth: 120, frameHeight: 120, startFrame: 0, endFrame: 7})
        this.load.image('ledge', 'assets/ledge.png');
        this.load.image('creviceBG', 'assets/creviceBG.png');

        //level 4: Canyon
        this.load.image('wall', 'assets/wall1.png');
        this.load.image('wall2', 'assets/wall2.png');
        this.load.image('ledgeCollider', 'assets/ledgeCollider.png');
        this.load.spritesheet('eyeDownSheet', 'assets/eyeDownSheetPlaceholder.png', {frameWidth: 120, frameHeight: 120, startFrame: 0, endFrame: 10});
        this.load.image('blackBeam', 'assets/blackBeam.png');
        this.load.image('grayBeam', 'assets/grayBeam.png');

        //endings
        this.load.spritesheet('hughHandSheet', 'assets/hughHandSheet.png', {frameWidth: 80, frameHeight: 130, startFrame: 0, endFrame: 31});

        //text transitions
        this.load.spritesheet('level1text', 'assets/level1Text.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});
        this.load.spritesheet('level2text', 'assets/level2Text.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});
        this.load.spritesheet('level3text', 'assets/level3Text.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});
        //this.load.spritesheet('level4text', 'assets/level4Text.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});
        this.load.spritesheet('creditsScreen', 'assets/creditsScreen.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 3})
    }

    create() {
        this.scene.start('title');
    }

    update(){
        
    }

}