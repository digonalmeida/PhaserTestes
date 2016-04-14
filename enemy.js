
function Enemy(siGame){
	this.siGame = siGame;
	this.game = this.siGame.game;
	Phaser.Sprite.call(this, this.game, 10, 100, 'enemy');
	this.game.add.existing(this);


	this.speed = 0.05;
	//this.game.physics.arcade.enable(this);
	//this.body.collideWorldBounds = true;
	this.exploded = false;
	this.animations.add("exploding", ["explosion", ""], 2, true);
    this.animations.add("fly", ["bird", "bird2"], 2, true);
    this.animations.play("fly");
    this.dir = 1;
    this.shotTimeout = 1;
    
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(){
    this.shotTimeout -= this.game.time.physicsElapsed;
    if(this.shotTimeout < 0){
        if(Math.random() < 0.05){
            this.shoot();
        }
        this.shotTimeout = 1;
    }
    
	//this.x =0;
    //this.y = 0;
   // console.log("%o", this);
	if(this.x >= this.game.width - this.width){
		this.changeDirection(-1);
	}

	if(this.x <= 0){
		this.changeDirection(1);
    }
	
	this.x += (this.speed * this.dir);

	if(this.game.input.keyboard.isDown(Phaser.Keyboard.K)){
		this.explode();
       
	}
}
Enemy.prototype.changeDirection = function(dir){
    for(var i = 0; i < this.siGame.enemies.length; i++){
        var enemy = this.siGame.enemies[i];
        enemy.dir = dir;
        enemy.y += 5;
        enemy.animations.currentAnim.speed += 0.25;
        enemy.speed += 0.03;
    }
}

Enemy.prototype.explode = function(){
	if(!this.exploded){
         console.log("here");
		this.exploded = true;
		this.animations.play("exploding");
	}
}

Enemy.prototype.shoot = function(){
    var shot = new Shot(this.siGame);
    shot.x = this.x;
    shot.y = this.y;
    shot.body.velocity.y = 100;
}