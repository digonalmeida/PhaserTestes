function Shot(state, spriteName){

	Phaser.Sprite.call(this, spriteName);

	this.enablePhysics();
	
	this.animations.add('fly', null, 15, true);
	this.animations.play('fly');
}

GameStateObject.extend(Shot);

Shot.prototype.update = function(){
	if(this.x > this.game.width || this.x < 0){
		this.destroy();
	}
	if(this.y < 0 || this.y > this.game.height){
		this.destroy();
	}
}
