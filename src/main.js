let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 720,
    autoCenter: true,
    scene: [Title,],
};

let keyLEFT, keyRIGHT, spacebar; 

let game = new Phaser.Game(config);
