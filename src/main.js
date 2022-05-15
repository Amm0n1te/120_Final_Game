let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 720,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Title, Play],
};

let keyLEFT, keyRIGHT, keyUP, spacebar; 

let game = new Phaser.Game(config);
