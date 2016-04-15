function GameplayState(siGame){
	this.siGame = siGame;
	this.game = siGame.game;
	
	this.player = null;
    this.enemies = null;
    this.walls = null;
    this.playerShots = null;
    this.enemyShots = null;
    this.lifes = 0;
    this.lifeSprites = [];
    this.invencibleTimeout = 0;
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
    this.game.time.events.add(Phaser.Timer.SECOND * 4, function(){
     this.game.state.start("menu");   
    }.bind(this), this);
    var t = this.siGame.addGuiText(this.game.width/2, 50, "Game Over");
    t.alpha = 0;
    t.anchor.setTo(0.5,1);
    this.game.add.tween(t).to( { alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
}

GameplayState.prototype.createGui = function(){
    var game = this.game;
    var siGame = this.siGame;
    
    var lifesLabel = siGame.addGuiText(0, game.height - 12, "LIFES");
	lifesLabel.anchor.setTo(0,0);
    
	for(var i = 0; i < this.lifes; i++){
        var x = 30 + (16 * i);
        var y = game.height - 2);
		var lifeSprite = game.add.sprite(x, y, 'player');
		lifeSprite.tint = "0x00ff00";
		lifeSprite.anchor.setTo(0,1);
		this.lifeSprites.push(lifeSprite);
	}
	
    siGame.createGui();
}

GameplayState.prototype.createEnemies = function(){
    var game = this.game;
    var siGame = this.siGame;
    
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
        for(var j = 0; j < 11; j++){
            var enemy =  new Enemy(this, enemyType);
            enemy.x =(0) + (16 * j) + ( 0.7 * i);
            enemy.y =(75) + (12 * i);
        }
    }
    
}

GameplayState.prototype.createWalls = function(){
    var game = this.game;
    var siGame = this.siGame;
    
    for(var i = 0; i < 4; i++){
        var wall = game.add.sprite(0,0,'wall');
        wall.x = (i * 45) + 25;
        wall.y = game.height - 60;
        wall.tint=0x00ff00;
        game.physics.arcade.enable(wall);
        this.walls.add(wall);
    }
}

GameplayState.prototype.create = function(){
    var game = this.game;
    var siGame = this.siGame;
    
	this.lifes = 3;
    this.lifeSprites = [];
    this.invencibleTimeout = 1;
    this.respawnTimeout = -1;
    
    this.enemies = game.add.group();
    this.playerShots = game.add.group();
    this.enemyShots = game.add.group();
    this.walls = game.add.group();
    
	this.player = new Player(this);
    this.createGui();
    
    this.createEnemies();
    this.createWalls();
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
