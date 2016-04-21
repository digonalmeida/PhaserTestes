function GameplayState(game){
	this.game = game;

	this.group1 = null;
	this.group2 = null;

	this.color1 = 0xff0000;
	this.color2 = 0x0000ff;

	this.spritesPerGroup = 5;

	this.score = 0;
	this.highScore = 0;
	this.scoreText = null;
	this.highScoreText = null;
}

GameplayState.prototype.preload = function(){
	this.game.load.spritesheet("squid", "squid.png", 14,8);
}
GameplayState.prototype.create = function(){
	this.group1 = this.game.add.group();
    this.group2 = this.game.add.group();
    
    for(var i = 0; i < this.spritesPerGroup; i++){
       this.group1.add(new Ex2Sprite(this.game, this.color1));
       this.group2.add(new Ex2Sprite(this.game, this.color2));
    }

    this.game.input.keyboard.onDownCallback = this.onKeyDown;

    var style = { font: "12px Arial", fill: "#ffffff"};

	this.scoreText = game.add.text( 0,0, "Score: ", style);
	this.highScoreText = game.add.text( 0, 40, "HighScore: ", style);
}

GameplayState.prototype.onKeyDown = function(key){
	if(key.keyCode == 27){
		this.game.state.start("menu");
	}
}
GameplayState.prototype.update = function(){
	this.game.physics.arcade.collide(this.group1, this.group2, this.onCollide, null, this);
}
GameplayState.prototype.onCollide = function(sprite1, sprite2){
    sprite1.explode();
    sprite2.explode();
}