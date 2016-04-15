function SpaceInvaders(){
	this.game = null;
	this.width = 210;
	this.height = 250;
	
	this.init();
    
    this.scoreText = null;
    this.highScoreText = null;
    this.score = 0;
    
}


SpaceInvaders.prototype.init = function(){
	this.game = new Phaser.Game(this.width, 
								this.height, 
								Phaser.AUTO, 
								"PhaserInvaders",
								{
									create: this.create.bind(this),
								} );
}

SpaceInvaders.prototype.preload = function(){
	
}

SpaceInvaders.prototype.addGuiText = function(x,y, text){
    var game = this.game;
    
    var t = this.game.add.text(x,y, text);
    t.font = 'Arial Black';
    t.fill = 'white'
    t.fontSize = 9;
    t.textAlign = 'center';
    //t.anchor.setTo(0.5,0);
    t.x = Math.round(t.x);
    t.y = Math.round(t.y);
    return t;
}

SpaceInvaders.prototype.addScore = function(score){
	this.score += score;
	if(this.score >= this.getHighScore()){
		this.setHighScore(this.score);
		this.highScoreText.text = this.score;
	}
	
}
SpaceInvaders.prototype.createGui = function(){
	var game = this.game;
    this.addGuiText(0,0, "SCORE             HI-SCORE");
    this.scoreText = this.addGuiText(0,10, "0000");
    this.highScoreText = this.addGuiText(75, 10, this.getHighScore());
    this.addGuiText(140,this.height-12, "CREDIT 04")
    var graphics = game.add.graphics(0, this.height-12);
    graphics.lineStyle(2, 0x33FF00);
    graphics.lineTo(300,0);
}
SpaceInvaders.prototype.create = function(){
	this.game.state.add('menu', new MenuState(this));
	this.game.state.add('game', new GameplayState(this));
	this.game.state.start('menu');
}

SpaceInvaders.prototype.setHighScore = function(score){
	localStorage.setItem("highscore", score);
}
SpaceInvaders.prototype.getHighScore = function(score){
	var score = localStorage.getItem("highscore");
	if(score == null){
		score = 0;
	}
	try{
		score = parseInt(score);
	}
	catch(e){
		score = 0;
	}
	return score;
}

