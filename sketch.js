var towerImg, tower;
var kunaiImg, kunai, kunaisGroup;
var climberImg, climber, climbersGroup;
var Naruto, NarutoImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0
function preload(){
  towerImg = loadImage("download.jpeg");
  kunaiImg = loadImage("kunai.png");
  climberImg = loadImage("climber.png");
  NarutoImg = loadImage("Naruto.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.scale = 5
  kunaisGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  Naruto = createSprite(200,200,50,50);
  Naruto.scale = 0.3;
  Naruto.addImage("Naruto", NarutoImg);
  Naruto.setCollider("rectangle",0,0,120,500)
  
}

function draw(){
  background(0);
  textSize(25)
  text("SCORE "+score,400,50)
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      Naruto.x = Naruto.x - 3;
    }
    
    if(keyDown("right_arrow")){
      Naruto.x = Naruto.x + 3;
    }
    
    if(keyDown("up_arrow")){
      Naruto.velocityY = -10;
    }
    
    Naruto.velocityY = Naruto.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnkunais();
    for (let i = 0; i < kunaisGroup.length; i++) {
      const element = kunaisGroup.get(i);
      if(element.isTouching(Naruto)){
        element.destroy()
        score++
      }
    }
    
    
    //climbersGroup.collide(Naruto);
    if(climbersGroup.isTouching(Naruto)){
      Naruto.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(Naruto) || Naruto.y > 600){
      Naruto.destroy();
      gameState = "end"
    }
    
    drawSprites();
    textSize(25)
  text("SCORE "+score,400,50)
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnkunais() {
  //write code here to spawn the kunais in the tower
  if (frameCount % 240 === 0) {
    var kunai = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    kunai.x = Math.round(random(120,400));
    climber.x = kunai.x;
    invisibleBlock.x = kunai.x;
    
    kunai.addImage(kunaiImg);
    kunai.scale = 0.55
    climber.addImage(climberImg);
    
    kunai.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    Naruto.depth = kunai.depth;
    Naruto.depth +=1;
   
    //assign lifetime to the variable
    kunai.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each kunai to the group
    kunaisGroup.add(kunai);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

