var PLAY = 1;
var END = 0;
var monkey,monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var obstacleGroup;
var score,ground,invinsibleGround,jungle,jungleImage;
var gameState=PLAY;

function preload(){

monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 jungleImage=loadImage("jungle.jpg")
  
}



function setup() {
   createCanvas(600, 400);

 
  monkey = createSprite(50,380,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(200,390,1000,20);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  ground.visible=false;
  
  jungle = createSprite(300,200,1000,20);
  jungle.addImage("jungle",jungleImage );
  jungle.velocityX=-4;
  jungle.scale=1;
  

 

  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bannanaGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,10,500);
  monkey.debug = true;
 
  
  score = 0;
  
 // invinsibleGround.visible=false;

  
}


function draw() {
  background(180);
  //displaying score
  
  obstaclesGroup.depth=monkey.depth;
  monkey.depth=monkey.depth+1;
  
 
  
  if(gameState === PLAY){
    
    

    jungle.velocityX = -(4 + 3* score/100)
    //scoring
    
    
    if (jungle.x < 100){
      jungle.x = jungle.width/2;
    }
    
    
    if (ground.x < 100){
      ground.x = ground.width/2;
    }
    
   
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y>300) {
      monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
    //spawn the clouds
    spawnbannana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
   monkey.scale=0.1;
   gameState = END; 
    }
    
    
       for(var i = 0;i<bannanaGroup.length;i++)
     {
       if(bannanaGroup.get(i).isTouching(monkey))
         {
           bannanaGroup.get(i).destroy();
           
       switch(score){
         case 10:monkey.scale=0.12;
           break;
            case 20:monkey.scale=0.14;
           break;
            case 30:monkey.scale=0.16;
           break;
            case 40:monkey.scale=0.18;
           break;
           default:break;
       }
       score=score+2; 
     
         }
     }
    
    
    
  }
   else if (gameState === END) {

     
      jungle.velocityX = 0;
      
      monkey.velocityY=0;     
    
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bannanaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bannanaGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  monkey.collide(ground);

  drawSprites();
  text("Score: "+ score, 500,50);
}

function reset(){
  gameState=PLAY;
  score=0;
  obstaclesGroup.destroyEach();
  bannanaGroup.destroyEach();
   jungle.velocityX = -(4 + 3* score/100)

 

}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,380,10,40);
   obstacle.velocityX = -(6 + score/100);
     obstacle.addImage("obstacle",obstacleImage);
  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
    

   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
 }
}

function spawnbannana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,320));
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    banana.velocityX =-5;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bannanaGroup.add(banana);
  }



 
 
  



}






