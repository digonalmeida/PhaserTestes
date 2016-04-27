function MenuState(game){
	this.game = game;
}
MenuState.prototype.preload = function(){
    this.game.load.spritesheet("squid", "squid.png", 28, 16);
}
MenuState.prototype.createSprites = function(){
    var s = new Ex2Sprite(this.game, 0x0000FF);
    s.alpha = 0.3;
    s.tint = 0xFF0000; 
    if(Math.random() > 0.5){
        s.tint = 0x0000FF; 
    }
    
    var scale = (Math.random() * 3) + 1;
    s.scale.setTo(scale, scale);
    
}

MenuState.prototype.create = function(){
	var game = this.game;
    for(var i = 0; i < 30; i++){
        this.createSprites();
    }
    
    
	var titleStyle = { font: "46px Arial", fill: "#ffffff", align: "center"};
    
	var title = game.add.text(game.width/2, 30, "DON'T LET THEM TOUCH", titleStyle);
    title.anchor.setTo(0.5,0);
    
    var style = { font: "25px Arial", fill: "#ffffff"};
    
    //draw lines
    var graphics = game.add.graphics(0, 0);
    
    graphics.lineStyle(10, 0xffffff, 1);
    

    graphics.beginFill(0x000000);
    graphics.moveTo(80,game.height-120);
    graphics.lineTo(520, game.height-120);
    graphics.lineTo(520, 120);
    graphics.lineTo(80, 120);
    graphics.endFill();
    
    var instructions = [
        "- Dont let different sprites collide",
        "- More sprites = More points",
        "- Sprites that dont move will grow",
        "- You can drag and throw sprites",
        ];
    for(var i = 0; i < instructions.length; i++){
        var instruction = instructions[i];
        game.add.text(100, 133 + (33*i), instruction, style);
    }
    
	var clickToStart = game.add.text(game.width/2, game.height-30, "CLICK TO START", titleStyle);
    clickToStart.anchor.setTo(0.5,1);

	game.input.onDown.add(function(){
		game.state.start("gameplay");
	});
}

MenuState.prototype.update = function(){
	if(this.game.input.keyboard.isDown(Phaser.Key.SPACEBAR)){
		alert("teste");
	}
}