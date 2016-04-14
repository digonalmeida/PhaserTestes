function Shot(state, spriteName){
	this.gameState = state;
	this.siGame = this.gameState.siGame;
	this.game = this.siGame.game;
	Phaser.Sprite.call(this, this.game, 0, 0, spriteName);

	this.game.physics.arcade.enable(this);
	this.game.add.existing(this);
	
	this.animations.add('fly', null, 15, true);
	this.animations.play('fly');
}

Shot.prototype = Object.create(Phaser.Sprite.prototype);
Shot.prototype.constructor = Shot;

Shot.prototype.update = function(){

	if(this.x > this.game.width){
		this.destroy();
	}
	if(this.y < 0){
		console.log("destroy");
		this.destroy();
	}
}
