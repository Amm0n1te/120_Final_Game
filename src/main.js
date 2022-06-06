let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 720,
    autoCenter: true,
    physics: {
        default: 'arcade',
        fps: 60,
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Loading, Title, TextTransition, Play, Forest, Crevice, Canyon, Ending, Ending2, Test, Credits],
};

let keyLEFT, keyRIGHT, keyUP, spacebar; 
let finished = false;
let endingColor = "black";
let game = new Phaser.Game(config);