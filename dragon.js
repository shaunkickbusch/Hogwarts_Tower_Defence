class Dragon{

  constructor(){

    this.pos = createVector(path[0].x, path[0].y);
    this.originalhealth = 70;
    this.currentHealth = 70;
    this.width = dragonPics[0].width;
    this.height = dragonPics[0].height;
    this.trajectoryIndex = 1;
    this.frameNum = 0;
    this.hasPassed = false;
    this.hasDied = false;
  }

  move(){

    var target = createVector(path[this.trajectoryIndex].x, path[this.trajectoryIndex].y);
    var distance = target.dist(this.pos);
    target.sub(this.pos);
    target.normalize();
    //Set the speed the epider movies
    target.mult(DRAGON_SPEED);
    this.pos.add(target);


    if(distance <= 20 && this.trajectoryIndex < path.length){
      this.trajectoryIndex++;
    }
    else if(this.trajectoryIndex === path.length - 1){
      this.hasPassed = true;
    }

    //Change framerate of the spider sprite
    if (!(frameCount % 10)){
      this.frameNum = (this.frameNum + 1) % dragonPics.length;
    }
  }

  display(){

    if (this.currentHealth === 20)
    {
      fill(255, 0, 0);
    }
    else if (this.currentHealth > 20)
    {
      fill(0, 255, 0);
    }
    else
    {
      this.hasDied = true;
    }

    stroke(0);
    let ratio = (this.currentHealth / this.originalHealth) * this.width;
    rect(this.pos.x - this.width / 2, this.pos.y - 40, ratio, 100);
    image(dragonPics[this.frameNum], this.pos.x, this.pos.y);
  }
}
