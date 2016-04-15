
function Enemy(state, enemyType){
	GameStateObject.call(this, state, 'enemy');
    this.enablePhysics();

    this.enemyType = enemyType;
    this.x = 10;
    this.y = 100;
	this.speed = 5;
    this.exploded = false;
	this.dir = 1;
    this.shotTimeout = 0.5;
	this.shootingInterval = 0.8;
    
	this.animations.add("exploding", ["explosion"], 10, false, true);
    this.animations.add("fly", Enemy.getAnimArray(this.enemyType), 2, true);
    this.animations.play("fly");
    
    this.gameState.enemies.add(this);
    
    this.body.velocity.x = this.speed * this.dir;
}
GameStateObject.extend(Enemy);

Enemy.EnemyType = {
	SQUID:0,
	BIRD:1,
	SQUID2:2,
	SPACESHIP:3
}

Enemy.prototype.updateShot = function(){
    this.shotTimeout -= this.game.time.physicsElapsed;
    
    if(this.shotTimeout < 0){
        if(Math.random() < 0.08){
            this.shoot();
        }
        
        this.shotTimeout = this.shootingInterval;
    }
}

Enemy.prototype.update = function(){
    
	if(!this.alive){
		return;
	}
    
    this.updateShot();

	if(this.x >= this.game.width - this.width){
        if(this.dir == 1){
		  this.setGroupDirection(-1);
        }
	}

	if(this.x <= 0){
        if(this.dir == -1){
		  this.setGroupDirection(1);
        }
    }
	
	//this.x += (this.speed * this.dir);

	if(this.game.input.keyboard.isDown(Phaser.Keyboard.K)){
		this.explode();
	}
}

Enemy.prototype.setGroupDirection = function(dir){

    this.gameState.enemies.y += 5;
    
    for(var i = 0; i < this.gameState.enemies.children.length; i++){
        var enemy = this.gameState.enemies.children[i];
        enemy.dir = dir;
        enemy.animations.currentAnim.speed += 0.5;
        enemy.speed += 1;
        enemy.body.velocity.x = enemy.speed * enemy.dir;
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
    shot.x = this.x + (this.width /2);
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
	this.explode();
	shot.kill();
	
	this.siGame.addScore(Enemy.getHitScore(this.enemyType));
}
