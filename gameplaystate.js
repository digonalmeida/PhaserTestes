function GameplayState(siGame){
	this.siGame = siGame;
	this.game = siGame.game;
	
	this.player = null;
    this.enemies = null;
    this.walls = null;
    this.playerShots = null;
    this.enemyShots = null;
    this.lifes = 3;
    this.lifeSprites = [];
    this.invencibleTimeout = 1;
    this.respawnTimeout = -1;
    
}
GameplayState.prototype.preload = function(){
	this.game.load.spritesheet('player', 'player.png', 16, 8);
	this.game.load.image('shot', 'shot.png');
	this.game.load.spritesheet('enemyShot', 'enemyShot.png',4, 9);
    this.game.load.image('wall', 'wall.png');
	this.game.load.atlasJSONHash('enemy', 'enemySprites.png', 'enemySprites.json');
}

GameplayState.prototype.removeLife = function(){
	if(this.lifes == 0){
		this.gameOver();
		return;
	}
	this.lifeSprites[this.lifes-1].kill();
	this.lifes--;
	
}

GameplayState.prototype.gameOver = function(){
	this.game.state.start("menu");
}

GameplayState.prototype.create = function(){
	this.lifes = 3;
    this.lifeSprites = [];
    this.invencibleTimeout = 1;
    this.respawnTimeout = -1;
	
	
	var lifesLabel = this.siGame.addGuiText(0, this.game.height - 12, "LIFES");
	lifesLabel.anchor.setTo(0,0);
	for(var i = 0; i < this.lifes; i++){
		var lifeSprite = this.game.add.sprite(30 + (16 *i), this.game.height - 2, 'player');
		lifeSprite.tint = "0x00ff00";
		lifeSprite.anchor.setTo(0,1);
		this.lifeSprites.push(lifeSprite);
	}
	
    var game = this.game;
    this.siGame.createGui();
    
    this.enemies = game.add.group();
    this.playerShots = game.add.group();
    this.enemyShots = game.add.group();
    this.walls = game.add.group();
    
	this.player = new Player(this);
	for(var i = 0; i < 5; i++){
		var enemyType = 0;
		switch(i){
			case 0:
				enemyType = Enemy.EnemyType.SQUID2;
				break;
			case 1:
			case 2:
				enemyType = Enemy.EnemyType.BIRD;
				break;
			default:
				enemyType = Enemy.EnemyType.SQUID;
				break;
		}
        for(var j = 0; j < 9; j++){
            var enemy =  new Enemy(this, enemyType);
            enemy.x =(20) + (20 * j) + ( 0.7 * i);
            enemy.y =(75) + (12 * i);
        }
    }
    
    for(var i = 0; i < 4; i++){
        var wall = this.game.add.sprite(0,0,'wall');
        wall.x = (i * 40) + 20;
        wall.y = this.game.height - 60;
        wall.tint=0x00ff00;
        this.game.physics.arcade.enable(wall);
        this.walls.add(wall);
    }
}

GameplayState.prototype.hitEnemy = function(enemy, bullet){
	enemy.hit(bullet);
}
GameplayState.prototype.hitWall = function(wall, shot){
	shot.kill();
}
GameplayState.prototype.hitPlayer = function(player, shot){
	console.log("%o", shot);
	this.player.hit(shot);
}
GameplayState.prototype.update = function(){
	
	this.siGame.scoreText.text = this.siGame.score;
	this.game.physics.arcade.overlap(this.enemies, this.playerShots,  this.hitEnemy.bind(this), null, this);
	this.game.physics.arcade.overlap(this.walls, this.playerShots,  this.hitWall.bind(this), null, this);
    this.game.physics.arcade.overlap(this.walls, this.enemyShots,  this.hitWall.bind(this), null, this);
	this.game.physics.arcade.overlap(this.player, this.enemyShots, this.hitPlayer.bind(this), null, this);
}
