function MenuState(game){
	this.game = game;
}

MenuState.prototype.create = function(){
	var game = this.game;
	var style = { font: "18px Arial", fill: "#ffffff"};

	game.add.text( 10, 10, "Dont let different sprites collide", style);
	game.add.text( 10, 40, "More sprites = More points", style);
	game.add.text(10, 70, "Sprites that dont move will grow", style);
	game.add.text(10, 110, "You can drag sprites", style);
	game.add.text(10, 150, "Click to start", style);

	game.input.onDown.add(function(){
		game.state.start("gameplay");
	});
}

MenuState.prototype.update = function(){
	if(this.game.input.keyboard.isDown(Phaser.Key.SPACEBAR)){
		alert("teste");
	}
}