


var group1 = null;
var group2 = null;

var color1 = 0xff0000;
var color2 = 0x0000ff;

var spritesPerGroup = 5;

function preload(){
    game.load.spritesheet("squid", "squid.png", 15,8);
}


function onCollide(sprite1, sprite2){
     sprite1.explode();
    sprite2.explode();
}

function Ex2Sprite(color){
    Phaser.Sprite.call(this, game, 0, 0, "squid");
    game.add.existing(this);
    this.tint = color;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5,0.5);
    
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1,1);
    
    this.x = Math.random() * (game.width - this.width);
    this.y = Math.random() * (game.height - this.height);
    this.lastPositions = [];
    this.maxPositions = 3;
    var maxVelocity = 50;//pra cada eixo
    this.lastVelocity = 0;
    this.body.velocity.x = (Math.random() * (maxVelocity*2)) - maxVelocity;
    this.body.velocity.y = (Math.random() * (maxVelocity*2)) - maxVelocity; 
    
    this.inputEnabled = true;
    this.input.enableDrag();
    this.input.useHandCursor = true;
    this.dragStarted = false;
    this.events.onDragStart.add(this.onDragStart, this);
    this.events.onDragStop.add(this.onDragStop, this);
}

Ex2Sprite.prototype = Object.create(Phaser.Sprite.prototype);
Ex2Sprite.prototype.constructor= Ex2Sprite;

Ex2Sprite.prototype.updateLastPos = function(){
    if(this.lastPositions.length > this.maxPositions){
        this.lastPositions.shift();
    }
    this.lastPositions.push({x:this.x, y: this.y});
}
Ex2Sprite.prototype.update = function(){
    
    if(!this.input.isDragged){
        if(Math.abs(this.body.velocity.x) + Math.abs(this.body.velocity.y) <= 0.5){
            this.scale.x *= 1.005;
            this.scale.y *= 1.005;
        }
 
    }
    else{
       // this.body.velocity.setTo(0,0);
    }
    
    this.updateLastPos();
    
}
Ex2Sprite.prototype.onDragStart = function(){
    this.lastVelocity = {x: this.body.velocity.x,
                         y: this.body.velocity.y};
    this.body.velocity.setTo(0,0);
}
Ex2Sprite.prototype.onDragStop = function(){
    var startPos = this.lastPositions[0];
    var deltaX = this.x - startPos.x;
    var deltaY = this.y - startPos.y;
    
    this.body.velocity.setTo(deltaX * 10,
                             deltaY * 10);
    
    console.log("stop: %o" , this.body.velocity);
}
Ex2Sprite.prototype.explode = function(){
    var t = game.add.tween(this).to({width: 30,
                                        height: 16,
                                        alpha: 0}, 
                                      400);
    t.onComplete.add(function(){
        this.kill(); 
    }.bind(this));
    t.start();
}



function followMouse(){
 //   console.log("followMouse");
}

function onMouseDown(){
    
}
function create(){
    group1 = game.add.group();
    group2 = game.add.group();
    for(var i = 0; i < spritesPerGroup; i++){
        group1.add(new Ex2Sprite(color1));
        group2.add(new Ex2Sprite(color2));
    }
    
}

function update(){
    game.physics.arcade.collide(group1, group2, onCollide, null, this)
}

var game = new Phaser.Game(300,
                           200,
                           Phaser.AUTO,
                           'phaser-ex2',
                           {preload: preload,
                            create: create,
                            update:update});