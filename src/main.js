let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 720,
    autoCenter: true,
    physics: {
        default: 'arcade',
        fps: 60,
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Loading, Title, TextTransition, Play, Forest, Crevice, Canyon, Ending, Test],
};

let keyLEFT, keyRIGHT, keyUP, spacebar; 
let finished = false;

let game = new Phaser.Game(config);