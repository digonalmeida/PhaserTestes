
function Player(spaceInvadersGame){
	this.siGame = spaceInvadersGame;
	this.game = this.siGame.game;
	Phaser.Sprite.call(this, this.game, 0, 0, 'player');
	this.game.add.existing(this);

	this.x  = 0;
	this.y = this.game.height-30;
	this.speed = 1;
	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;

	this.animations.add('normal',[0], 30, true);
	this.animations.add('exploding', [1, 2, 3], 5, false);
	this.animations.play('normal');
	this.exploded = false;
	this.shotInterval = 0.25;
	this.shotTimeout = 0;
    this.tint=0x00ff00;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){

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
		this.exploded = true;
		this.animations.play('exploding');

	}
}

Player.prototype.shoot = function(){
	if(this.shotTimeout > 0){
		return;
	}
	var shot = new Shot(this.siGame);
	shot.x = this.x + (this.width/2);
	shot.y = this.y;
	this.shotTimeout = this.shotInterval;
}

