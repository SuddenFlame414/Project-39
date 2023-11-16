var ghost, ghostImg;
var boulder, boulderImg, boulderGroup;
var road, roadImg, invisibleRoad;
var gameOver, gameOverImg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  roadImg = loadImage("road.jpg");
  boulderImg = loadImage("Boulder.png");
  ghostImg = loadImage("Ghost.png");
  gameOverImg = loadImage("gameOver.jpg");
}

function setup() {
  createCanvas(600, 500);

  road = createSprite(300, 300, 600, 10)
  road.addImage(roadImg);
  road.scale = 3;
  road.velocityX = 5;

  ghost = createSprite(450, 430, 20, 20)
  ghost.addImage(ghostImg);
  ghost.scale = 0.3

  invisibleRoad = createSprite(300, 450, 600, 10);
  invisibleRoad.visible = false;
  invisibleRoad.velocityX = road.velocityX;
  
  boulderGroup = new Group();
  
}

function draw() {
  background("white");
  
  if(gameState === PLAY) {
  stroke("black");
  fill("black");
  textSize(25);
  text("Score = " + score, 225, 25);
  
  ghost.collide(invisibleRoad);

  if (road.x > 400) {
    road.x = 300;
  }
  if (invisibleRoad.x > 200) {
    invisibleRoad.x = 300;
  }
  
  score += 1; 
  spawnBoulder();
  
  ghost.velocityY += 1;
  
  if (keyDown("space") &&  ghost.y !== 450) {
    ghost.velocityY = -5;
    camera.position.y = ghost.y;
  }
  
  
  
  if(boulderGroup.isTouching(ghost)) {
   gameState = END;
  }
    drawSprites();
  }
  if(gameState === END) {
  background("black");
    boulderGroup.visible = false;
   ghost.visible = false;
   road.visible = false;
   textSize(30);
   stroke("white");
   text("Game Over", 200, 200);
    gameOver = createSprite(300,200,20,20);
    gameOver.addImage(gameOverImg);
    score = 0;
  }
}

function spawnBoulder() {
  if (frameCount % 90 === 0) {
    boulder = createSprite(50, 410, 20, 20);
    boulder.velocityX = 5;
    boulder.addImage(boulderImg);
    boulder.scale = 0.4;
    
    boulderGroup.add(boulder);
  }
}