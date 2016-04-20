var group1 = null;
var group2 = null;

var color1 = 0xff0000;
var color2 = 0x0000ff;

var spritesPerGroup = 5;

function preload(){
    ex2Game.load.spritesheet("squid", "squid.png", 15,8);
}

function onCollide(sprite1, sprite2){
    sprite1.explode();
    sprite2.explode();
}

function create(){
    group1 = ex2Game.add.group();
    group2 = ex2Game.add.group();
    
    for(var i = 0; i < spritesPerGroup; i++){
        group1.add(new Ex2Sprite(ex2Game, color1));
        group2.add(new Ex2Sprite(ex2Game, color2));
    }
    
}

function update(){
    ex2Game.physics.arcade.collide(group1, group2, onCollide, null, this)
}

var ex2Game = new Phaser.Game(300,
                           200,
                           Phaser.AUTO,
                           'phaser-ex2',
                           {preload: preload,
                            create: create,
                            update:update});