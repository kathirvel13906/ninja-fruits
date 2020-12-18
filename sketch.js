//gamestates
var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, swordImage, swordSound;
var fruit, fruitGroup, fruit1, fruit2, fruit3, fruit4;
var monster, monsterImage, monsterGroup;
var gameoverImage, gameoverSound;
var score;
var position, side;


function preload(){
      swordImage = loadImage("sword.png");
      swordSound = loadSound("knifeSwooshSound.mp3");

      fruit1 = loadImage("fruit1.png");
      fruit2 = loadImage("fruit2.png");
      fruit3 = loadImage("fruit3.png");
      fruit4 = loadImage("fruit4.png");

      gameoverImage = loadImage("gameover.png");
      gameoverSound = loadSound("gameover.mp3");

      monsterImage = loadAnimation("alien1.png", "alien2.png");
}

function setup(){
      createCanvas(400,400);

      sword = createSprite(40,200,20,20);
      sword.addImage(swordImage);
      sword.scale = 0.7;
      //sword.debug = true;

      fruitGroup = createGroup();
      monsterGroup = createGroup();
  
      score = 0;

}

function draw(){
      background(200);
  
      text("SCORE: "+score,300,50);

          if(gameState === 1) {
            sword.x = World.mouseX;
            sword.y = World.mouseY;
            
            if(fruitGroup.isTouching(sword)) {
              fruitGroup.destroyEach();
              swordSound.play();
              score = score+1;
            }
  
            if(monsterGroup.isTouching(sword)) {
              gameState = END;
              gameoverSound.play();
            }
            
          }
          else if(gameState === 0) {
            sword.addImage(gameoverImage);
            sword.x = 200;
            sword.y = 200;
            
            fruitGroup.destroyEach();
            monsterGroup.destroyEach();
            
            fruitGroup.setVelocityXEach(0);
            monsterGroup.setVelocityXEach(0);
              
          }

      fruits();
      enemy();

      drawSprites();

}

function fruits() {
  if(frameCount % 80 === 0) {
    fruit = createSprite(400,Math.round(random(50,340)),20,20);
    fruit.scale = 0.2;
    fruit.setCollider("circle",0,0,70);
    //fruit.debug = true;
    
    position = Math.round(random(1,2));
    if(position === 1) {
      fruit.x = 400;
      fruit.velocityX = -(7 + score/4);
    }
    else if(position === 2) {
      fruit.x = 0;
      fruit.velocityX = (7 + score/4);
    }
    
    r = Math.round(random(1,4));
    if(r === 1) {
      fruit.addImage(fruit1);
    }
    else if(r === 2) {
      fruit.addImage(fruit2);
    }
    else if(r === 3) {
      fruit.addImage(fruit3);
    }
    else if(r === 4) {
      fruit.addImage(fruit4);
    }
    
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
  }
}

function enemy() {
  if(frameCount % 200 === 0) {
    monster = createSprite(400,Math.round(random(100,300)),20,20);
    monster.addAnimation("moving", monsterImage);
    monster.velocityX = -(8 + score/10);
    monster.lifetime = 50;
    monster.setCollider("circle",0,0,20);
    
    side = Math.round(random(1,2));
    if(side === 1) {
      monster.x = 400;
      monster.velocityX = -(7 + score/4);
    }
    else if(side === 2) {
      monster.x = 0;
      monster.velocityX = (7 + score/4);
    }
    
    //monster.debug = true;
    monsterGroup.add(monster);
  }
}
