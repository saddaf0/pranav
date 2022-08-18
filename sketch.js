var PLAY = 1;
var END = 0;
var gameState = PLAY;
var meat,meatImage

var lion, lion_running, lion_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2

var score;

var gameOverImg,restartImg
var jumpSound,dieSound
var l1,l2,l3,l4,l5


function preload(){
    lion_running = loadAnimation("l1.png","l2.png","l3.png","l4.png","l5.png")
groundImage = loadImage("g.jpg")
obstacle1 = loadImage("obstacle1.png")
obstacle2 = loadImage("obstacle2.png")
restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  lion_collided= loadImage("l1.png")
  meat = loadImage("meat.png")
}

function setup() {
 createCanvas(windowWidth-100,windowHeight-100)


 ground = createSprite(width/2,height/2,width+300,height);
 ground.addImage("ground",groundImage);
 ground.scale=4.8

 ground.x = ground.width /2;


 lion = createSprite(50,height-25,20,50)
 lion.addAnimation("running",lion_running)
 lion.debug=false
 lion.setCollider("rectangle",0,0,100,40)
 //lion.addAnimation("collided",lion_collided)
 lion.scale = 1.2
 
 gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.6;
  restart.scale = 0.6;
  
  invisibleGround = createSprite(200,height-20,400,10);
  invisibleGround.visible = false
  
  
  obstaclesGroup = createGroup()
  
  
  console.log("Hello" + 5)
  
  
  score = 0;
  
 }

 function draw() {
  
    background(180)
   
    
    console.log("this is ",gameState)
    
    
    if(gameState === PLAY){
      gameOver.visible = false
      restart.visible = false
      
    ground.velocityX = -4
      
      score = score + Math.round(frameCount/60);
      
      if (ground.x < 0){
        ground.x = ground.width/2
      }
      
      
      if(keyDown("up_arrow")&& lion.y >= 100) {
        jumpSound.play ()
          lion.velocityY = -12
      }
      
      
      lion.velocityY = lion.velocityY + 0.8
    
     
      
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(lion)){
         
         lion.velocityY = -10
          dieSound.play()
      }
    }
     else if (gameState === END) {
       console.log("hey")
        gameOver.visible = true;
        restart.visible = true;
       
        ground.velocityX = 0;
        trex.velocityY = 0
       
        
        lion.changeAnimation("collided", lion_collided);
       
        
      obstaclesGroup.setLifetimeEach(-1);
      
       
       obstaclesGroup.setVelocityXEach(0);
       
     }
    
   
    
    lion.collide(invisibleGround);
    
    
    
    drawSprites();

    fill("black")
    textSize(50)
    text("Score: "+ score, width-300,100)
  }
  function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(400,height-50,10,40);
      obstacle.velocityX = -6
      

       var rand = Math.round(random(1,2))
       switch(rand) {
         case 1: obstacle.addImage(obstacle1)
                 break
         case 2: obstacle.addImage(obstacle2)
         break
         default:break
                
       }
          obstacle.lifetime = 300
          obstaclesGroup.add(obstacle)
          obstacle.scale = 1.2

          obstacle.depth=lion.depth
          lion.depth+=1
              }
             } 