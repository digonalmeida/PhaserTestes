
function Enemy(state, enemyType){
	this.gameState = state;
	this.siGame = this.gameState.siGame;
	this.game = this.siGame.game;
	this.enemyType = enemyType;
	Phaser.Sprite.call(this, this.game, 10, 100, 'enemy');
	this.game.add.existing(this);


	this.speed = 0.08;
	this.game.physics.arcade.enable(this);
	//this.body.collideWorldBounds = true;
	this.exploded = false;
	
	this.animations.add("exploding", ["explosion"], 10, false, true);
	

    this.animations.add("fly", Enemy.getAnimArray(this.enemyType), 2, true);
    
    
    this.animations.play("fly");
    this.dir = 1;
    this.shotTimeout = 1;
    this.gameState.enemies.add(this);
    
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.EnemyType = {
	SQUID:0,
	BIRD:1,
	SQUID2:2,
	SPACESHIP:3
}
Enemy.prototype.update = function(){
	if(!this.alive){
		return;
	}
    this.shotTimeout -= this.game.time.physicsElapsed;
    if(this.shotTimeout < 0){
        if(Math.random() < 0.08){
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
    for(var i = 0; i < this.gameState.enemies.children.length; i++){
        var enemy = this.gameState.enemies.children[i];
        enemy.dir = dir;
        enemy.y += 5;
        enemy.animations.currentAnim.speed += 0.5;
        enemy.speed += 0.03;
    }
}

Enemy.prototype.explode = function(){
	if(!this.exploded){
         console.log("here");
		this.exploded = true;
		this.animations.play("exploding", null, false, true);
	}
}

Enemy.prototype.shoot = function(){
    var shot = new Shot(this.gameState, 'enemyShot');
    shot.x = this.x;
    shot.y = this.y;
    shot.body.velocity.y = 100;
    this.gameState.enemyShots.add(shot);
}
Enemy.getAnimArray = function (enemyType) {
	switch(enemyType){
		case Enemy.EnemyType.SQUID: 
			return ["squid1", "squid11"];
			break;
		case Enemy.EnemyType.BIRD: 
			return ["bird", "bird2"];
			break;
		case Enemy.EnemyType.SQUID2: 
			return ["squid2", "squid22"];
			break;
		case Enemy.EnemyType.SPACESHIP: 
			return ["spaceship"];
			break;
	}
}
Enemy.getHitScore = function(enemyType){
	switch(enemyType){
		case Enemy.EnemyType.SQUID: 
			return 10;
			break;
		case Enemy.EnemyType.BIRD: 
			return 20;
			break;
		case Enemy.EnemyType.SQUID2: 
			return 30;
			break;
		case Enemy.EnemyType.SPACESHIP: 
			return 100;
			break;
	}
}
Enemy.prototype.hit = function(shot){
	console.log('teste');
	this.explode();
	shot.kill();
	
	this.siGame.addScore(Enemy.getHitScore(this.enemyType));
	//this.kill();
}
