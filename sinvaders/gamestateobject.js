function GameStateObject(gameState, spriteName){
    this.gameState = gameState;
	this.siGame = this.gameState.siGame;
	this.game = this.siGame.game;
    Phaser.Sprite.call(this, this.game, 0, 0, spriteName);
    
    this.game.add.existing(this);
}

GameStateObject.prototype = Object.create(Phaser.Sprite.prototype);
GameStateObject.prototype.constructor = GameStateObject;

GameStateObject.prototype.enablePhysics = function(){
    this.game.physics.arcade.enable(this);
}

GameStateObject.extend = function(ChildClass){
    ChildClass.prototype = Object.create(GameStateObject.prototype);
    ChildClass.prototype.constructor = ChildClass;
}