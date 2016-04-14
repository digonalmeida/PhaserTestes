function SpaceInvaders(){
	this.game = null;
	this.width = 200;
	this.height = 250;
	this.player = null;
    this.enemies = [];
    this.walls = [];
	this.init();
    
    this.scoreText = null;
    this.highScoreText = null;
    
}

SpaceInvaders.prototype.init = function(){
	this.game = new Phaser.Game(this.width, 
								this.height, 
								Phaser.AUTO, 
								"PhaserInvaders",
								{
									preload: this.preload.bind(this),
									create: this.create.bind(this),
									update: this.update.bind(this),
								} );
}

SpaceInvaders.prototype.preload = function(){
	this.game.load.spritesheet('player', 'player.png', 16, 8);
	this.game.load.image('shot', 'shot.png');
    this.game.load.image('wall', 'wall.png');
	this.game.load.atlasJSONHash('enemy', 'enemySprites.png', 'enemySprites.json');
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
SpaceInvaders.prototype.create = function(){
    var game = this.game;
    this.addGuiText(0,0, "SCORE             HI-SCORE");
    this.scoreText = this.addGuiText(0,10, "0000");
    this.highScoreText = this.addGuiText(75, 10, "0000");
    this.addGuiText(140,this.height-12, "CREDIT 04")
    var graphics = game.add.graphics(0, this.height-10);
    graphics.lineStyle(2, 0x33FF00);
    graphics.lineTo(300,0);
    //this.addGuiText(0,0,"SCORE    HI-SCORE");
    
    
	this.player = new Player(this);
	for(var i = 0; i < 5; i++){
        for(var j = 0; j < 9; j++){
            var enemy =  new Enemy(this);
            enemy.x =(20) + (20 * j) + ( 0.7 * i);
            enemy.y =(75) + (12 * i);
            this.enemies.push(enemy);
        }
    }
    
    for(var i = 0; i < 4; i++){
        var wall = this.game.add.sprite(0,0,'wall');
        wall.x = (i * 40) + 20;
        wall.y = this.game.height - 60;
        wall.tint=0x00ff00;
    }

}

SpaceInvaders.prototype.update = function(){
    for(var i = 0; i < this.enemies.length; i++){
      //  console.log(this.enemies[i].x);
        
    }
}