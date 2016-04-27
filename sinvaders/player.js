
function Player(state){
	this.gameState = state;
	this.siGame = state.siGame;
	this.game = this.siGame.game;
	Phaser.Sprite.call(this, this.game, 0, 0, 'player');
	this.game.add.existing(this);

	this.x  = 50;
	this.y = this.game.height - 80;
	this.speed = 2;
	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;

	this.animations.add('normal',[0], 30, true);
	this.animations.add('exploding', [1, 2], 5, false);
	this.animations.play('normal');
	this.exploded = false;
	this.shotInterval = 0.5;
	this.shotTimeout = 0;
    this.tint=0x00ff00;
    
    this.respawnTimeout = 1;
    this.invencibleTimeout = 1;
    this.shotSound = this.game.add.audio("playerShot");
    this.explosionSound = this.game.add.audio("playerExplosion");
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){

	if(!this.alive){
		this.respawnTimeout -= this.game.time.physicsElapsed;
		if(this.respawnTimeout <= 0){
			this.revive();
			this.animations.play('normal');
			this.invencibleTimeout = 1;
		}
		return;
	}
	if(this.invencibleTimeout > 0){
		this.alpha = Math.random() * 0.2 + (0.1);
		this.invencibleTimeout -= this.game.time.physicsElapsed;
		if(this.invencibleTimeout <= 0){
			this.alpha = 1;
			this.invencibleTimeout = -1;
			this.exploded = false;
		}
	}
	if(this.shotTimeout > 0){
		this.shotTimeout -= this.game.time.physicsElapsed;
	}

	var game = this.game;

	if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		this.x += this.speed;
	}

	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		this.x -= this.speed;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.K)){
		this.explode();
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		this.shoot();
	}

}

Player.prototype.explode = function(){
	if(!this.exploded){
        this.explosionSound.play();
		this.exploded = true;
		this.animations.play('exploding', null, false, true);
	}
}

Player.prototype.shoot = function(){
	if(this.shotTimeout > 0){
		return;
	}
    this.shotSound.play();
	var shot = new Shot(this.gameState, 'shot');
	shot.x = this.x + (this.width/2);
	shot.y = this.y;
	shot.body.velocity.y = -800;
	this.shotTimeout = this.shotInterval;
	this.gameState.playerShots.add(shot);
}

Player.prototype.hit = function(shot){
	if(this.invencibleTimeout >= 0){
		return;
	}
	this.explode();
	this.gameState.removeLife();
	shot.kill();
	this.respawnTimeout = 1;
}

