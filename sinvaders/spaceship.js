function Spaceship(gameState){
    GameStateObject.call(this, gameState, 'enemy');
    this.enablePhysics();
    this.speed = 50;
    this.body.velocity.x = this.speed;
    this.x = -10;
    this.y = 30;
    
    this.animations.add("exploding", ["explosion"], 10, false, true);
    this.animations.add("fly", ["spaceship"], 2, true);
    this.animations.play("fly");
    this.explosionSound = this.game.add.audio("enemyExplosion");
    
    
}
GameStateObject.extend(Spaceship);

Spaceship.prototype.update = function()
{
    if(this.x > this.game.width+ 10)
    {
        this.body.velocity.x = - this.speed; 
    }
    if(this.x + this.width < -10)
    {
        this.body.velocity.x = this.speed; 
    }
}

Spaceship.prototype.explode = function()
{
    console.log("explode");
    this.explosionSound.play();
    this.animations.play("exploding", null, false, true);
    this.siGame.addScore(Enemy.getHitScore(Enemy.EnemyType.SPACESHIP));
}

Spaceship.prototype.hit = function(shot)
{
    console.log("hit");
    shot.kill();
    this.explode();
}