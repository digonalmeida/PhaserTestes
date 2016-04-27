
function GameplayState(game){
	this.game = game;

	this.group1 = null;
	this.group2 = null;

	this.color1 = 0xff0000;
	this.color2 = 0x0000ff;

	this.spritesPerGroup = 2;

	this.score = 0;
	this.highScore = 0;
	this.scoreText = null;
	this.highScoreText = null;
    
    this.gamePrefix = "phaser.ex2"
    
    this.music = null;
    this.explosion = null;
    this.spawnSound = null;
}

GameplayState.prototype.preload = function(){
	this.game.load.spritesheet("squid", "squid.png", 14,8);
    this.game.load.audio("music", "earth.mp3");
    this.game.load.audio("spawn", "invaderkilled.wav");
    this.game.load.audio("explosion", "explosion.wav");
}
GameplayState.prototype.create = function(){
    this.music = this.game.add.audio("music");
    
    this.spawnSound = this.game.add.audio("spawn");
    this.music.play();
    console.log(this.highScore);
    this.highScore = localStorage.getItem(this.gamePrefix+".highscore");
    if(this.highScore == null){
        this.highScore = 0;
    }
    console.log("%o", localStorage);
	this.group1 = this.game.add.group();
    this.group2 = this.game.add.group();
    
    for(var i = 0; i < this.spritesPerGroup; i++){
       this.spawnSprites();
    }

    this.game.input.keyboard.onDownCallback = this.onKeyDown;

    var style = { font: "12px Arial", fill: "#ffffff"};

	this.scoreText = this.game.add.text( 0,0, "Score: ", style);
	this.highScoreText = this.game.add.text( 0, 15, "HighScore: ", style);
    this.game.time.events.loop(3* Phaser.Timer.SECOND, this.spawnSprites, this);
    
}
GameplayState.prototype.spawnSprites = function(){
    this.group1.add(new Ex2Sprite(this.game, this.color1));
    this.group2.add(new Ex2Sprite(this.game, this.color2));
    this.spawnSound.play();
}
GameplayState.prototype.setHighScore = function(val){
    this.highScore = val;
    localStorage.setItem(this.gamePrefix+".highscore", val);
}
GameplayState.prototype.onKeyDown = function(key){
	if(key.keyCode == 27){
		this.game.state.start("menu");
	}
}
GameplayState.prototype.update = function(){
    this.score = this.group1.countLiving() +
        this.group2.countLiving();
    if(this.score > this.highScore)
        {
            this.setHighScore(this.score);
        }
	this.game.physics.arcade.collide(this.group1, this.group2, this.onCollide, null, this);
    
    this.scoreText.text= "Score: " + this.score;
    this.highScoreText.text = "HighScore: " + this.highScore;
}
GameplayState.prototype.onCollide = function(sprite1, sprite2){
    sprite1.explode();
    sprite2.explode();
}