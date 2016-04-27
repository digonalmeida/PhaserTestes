function MenuState(siGame){
	this.siGame = siGame;
	this.game = siGame.game;
    this.instructions = null;
}
MenuState.prototype.preload = function(){
    
	this.game.load.atlasJSONHash('enemy', 'enemySprites.png', 'enemySprites.json');
}

MenuState.prototype.scoreInfo = function(){
	
}

MenuState.prototype.create = function(){
    
	this.siGame.createGui();
	var title = this.siGame.addGuiText(this.game.width/2, 40, "THE SPACE INVADERS");
    title.desiredText = title.text;

	title.anchor.setTo(0.5,0);
	title.fontSize = 12;
	var presents = this.siGame.addGuiText(this.game.width/2, 55, "PRESENTS");
	presents.anchor.setTo(0.5,0);
	presents.textSize = 9;
	var part4 = this.siGame.addGuiText(this.game.width/2, 70, "PART FOUR");
	part4.anchor.setTo(0.5,0);
	var scores = this.siGame.addGuiText(this.game.width/2, 110, "*SCORE ADVANCE TABLE*");
	scores.anchor.setTo(0.5,0);
	for(var i = 3; i >=0; i--){
		var enemyType = i;
		var y = 125+ (i * 15);
		var enemySprite = this.game.add.sprite(70, y, 'enemy');
		enemySprite.animations.add('fly', Enemy.getAnimArray(i), 5, true);
		enemySprite.animations.play('fly');
		enemySprite.anchor.setTo(0.5,0);
		
		var pointsLabel = this.siGame.addGuiText(80, y," =  " + Enemy.getHitScore(i) + " points");
	}
	
	console.log("teste");
	var instructions = this.siGame.addGuiText(10, this.game.height-30, "Press [SPACEBAR] to start");
	instructions.fontSize = 12;

}

MenuState.prototype.update = function(){
	if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		this.game.state.start('game');
	}
}
