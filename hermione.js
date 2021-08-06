class Hermione{

  constructor(positionX, positionY){
    this.type = 'HERMIONE';
    this.pos = createVector(positionX, positionY);
    this.attackingFrameCounter = 0;
    this.idleFrameCounter = 0;
    this.enemiesKilled = 0;
    this.attack = new Projectile(positionX, positionY, 0, color("#FF00FF"), HERMIONE_ATTACK_SPEED);
    this.currentEnemyIndex = 0;
    this.areWeAttacking = false;
    this.sellPrice = HERMIONE_SELL_PRICE;
  }

  attackMove(){

    //Change framerate of the spider sprite
    if (!(frameCount % 10)){
      this.attackingFrameCounter = (this.attackingFrameCounter + 1) % hermioneAttack.length;
    }

    //Ensure the game doesn't freeze because there's currently no enemies in the array
    if(enemies.length > 0){
      this.attack.move();
      if(this.attack.successfullHit === true){
        hitAudio.play();
        enemies[this.currentEnemyIndex].currentHealth -= 10;
        this.attack.successfullHit = false;
        if(enemies[this.currentEnemyIndex].hasDied === true){
          moneyAmount += 20;
          //Remove the enemy from the array
          enemies.splice(this.currentEnemyIndex, 1);
          totalEnemiesDead++;
          //this.currentEnemyIndex++;
          //Move the projectile onto the next target
          this.attack = new Projectile(this.pos.x, this.pos.y, 0, color("#FF00FF"), HERMIONE_ATTACK_SPEED);
        }
      }
    }
  }

  attackDisplay(){
    if(enemies.length > 0){
      this.attack.display();
      image(hermioneAttack[this.attackingFrameCounter], this.pos.x, this.pos.y);
    }
  }

  moveIdle(){
    if (!(frameCount % 10)){
      this.idleFrameCounter = (this.idleFrameCounter + 1) % hermioneIdle.length;
    }
  }

  displayIdle(){
    image(hermioneIdle[this.idleFrameCounter], this.pos.x, this.pos.y);
  }
}
