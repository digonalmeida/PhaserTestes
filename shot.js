function Shot(siGame){
	this.siGame = siGame;
	this.game = siGame.game;
	Phaser.Sprite.call(this, this.game, 0, 0, 'shot');

	this.game.physics.arcade.enable(this);
	this.game.add.existing(this);
    this.body.velocity.y = -600;
}

Shot.prototype = Object.create(Phaser.Sprite.prototype);
Shot.prototype.constructor = Shot;

Shot.prototype.update = function(){
	//this.y -= 10;
	if(this.x > this.game.width){
		this.destroy();
	}
	if(this.y < 0){
		console.log("destroy");
		this.destroy();
	}
}