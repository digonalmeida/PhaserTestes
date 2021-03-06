function Ex2Sprite(game, color){
    
    Phaser.Sprite.call(this, game, 0, 0, "squid");
    this.game.add.existing(this);
    
    this.anchor.setTo(0.5,0.5);
    this.tint = color;

    this.scale.setTo(2,2);
    
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1,1);
    
    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.input.enableDrag();
    this.events.onDragStart.add(this.onDragStart, this);
    this.events.onDragStop.add(this.onDragStop, this);
    
    this.x = Math.random() * (this.game.width);
    this.y = Math.random() * (this.game.height);
    
    var maxVelocity = 25;//pra cada eixo
    this.body.velocity.x = (Math.random() * (maxVelocity*2)) - maxVelocity;
    this.body.velocity.y = (Math.random() * (maxVelocity*2)) - maxVelocity; 
    
    this.lastVelocity = 0;
    this.lastPositions = [];
    this.maxPositions = 3;

    this.animations.add("fly",[0,1], 2, true);
    this.animations.play("fly", null, 100, true);
    this.explosion = this.game.add.audio("explosion");
    this.exploded = false;
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
        //should be = sqrt( ( velocity.x ^ 2 ) + ( velocity.y ^2 ) )
        //but i think abs(x) + abs(y) is good enough in this situation
        var totalVelocity = Math.abs(this.body.velocity.x) + Math.abs(this.body.velocity.y);
        this.animations.currentAnim.speed = totalVelocity* 0.03;
        
        if(totalVelocity <= 0.5){ // if it stops moving, it'll start growing!
            this.scale.x *= 1.005;
            this.scale.y *= 1.005;
        }
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
}

Ex2Sprite.prototype.explode = function(){
    this.explosion.play();
    if(this.exploded){
        return;
    }
    this.exploded = true; 
    
    var tween = this.game.add.tween(this.scale).to({x:3,
                                        y:3}, 
                                      400);
                                                //null = linear
    this.game.add.tween(this).to({alpha:0}, 400, null, true);
    
    tween.onComplete.add(function(){
        this.kill(); 
    }.bind(this));
    
    tween.start();
}