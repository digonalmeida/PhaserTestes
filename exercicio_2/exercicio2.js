function create(){
    ex2Game.state.add("menu", new MenuState(ex2Game));
    ex2Game.state.add("gameplay", new GameplayState(ex2Game));
    ex2Game.state.start("menu");
    return;   
}

var ex2Game = new Phaser.Game(600,
                           400,
                           Phaser.AUTO,
                           'phaser-ex2',
                           {create: create});