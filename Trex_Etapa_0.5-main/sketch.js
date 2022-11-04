var trex ,trex_running,cloudImage,trex_collided;
var PLAY=1
var GAMEOVER=0
var gameState=PLAY
function preload(){
  //para que sea un trex o un dragon etc.
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
groundImage=loadImage("ground2.png")
cloudImage=loadImage("cloud.png")
obstaculo1=loadImage("obstacle1.png")
obstaculo2=loadImage("obstacle2.png")
obstaculo3=loadImage("obstacle3.png")
obstaculo4=loadImage("obstacle4.png")
obstaculo5=loadImage("obstacle5.png")
obstaculo6=loadImage("obstacle6.png")
trex_collided=loadAnimation("trex_collided.png")
}
 


function setup(){
  createCanvas(600,200)
  trex=createSprite(50,160,20,50);
trex.addAnimation("running",trex_running);
edges=createEdgeSprites();
trex.scale=0.5;
trex.x=50;
trex.addAnimation("collided",trex_collided)
ground=createSprite(200,180,400,20);
 ground.addImage("ground",groundImage);
ground.x=ground.width/2;

invisibleGround=createSprite(200,190,400,10);
invisibleGround.visible=false;
var rand = Math.round(random(10,60))
console.log(rand)
score=0;
//crear sprite del t-rex.
trex.setCollider("circle",0,0,40) 
trex.debug=true

obstaculosGroup = new Group()
nubesGroup = new Group()
}

function draw(){


//console.log(trex.y);

  background("white")
console.log ("Esto es ",gameState)
  text("Puntuación: "+ score,500,50)
  //ground.velocityX=-2;
if(gameState===PLAY){
  ground.velocityX=-2;
  score=score+Math.round(frameCount / 60)
  if(ground.x<0){
    ground.x=ground.width/2
  }
  if(keyDown("space")){
    trex.velocityY= -5;
  }
  if(keyDown("RIGHT")){
    trex.velocityY= -2
    }
    trex.velocityY=trex.velocityY=0.5;
    aparecernubes();
    aparecerobstaculos();
    if(obstaculosGroup.isTouching(trex)){
    gameState=GAMEOVER;
    }
}
else if(gameState===GAMEOVER){
  ground.velocityX=0
  trex.changeAnimation("collided",trex_collided)
  obstaculosGroup.setLifetimeEach(-1)
  nubesGroup.setLifetimeEach(-1)
  obstaculosGroup.setVelocityXEach(0)
  nubesGroup.setVelocityXEach(0)
}

  //variable para que trex disminuya su velocidad (que no se vaya volando)
 
  //Para poder volar 




  //velocidad de salto del trex
  
  //trex.collide(edges[3]);
  //trex.collide(ground);
trex.collide(invisibleGround);


//console.log(frameCount)


  drawSprites();
  
}

function aparecernubes(){
  if(frameCount % 80===0){
    cloud = createSprite (600,100,40,10)
    cloud.addImage(cloudImage)
    cloud.scale = 0.75
    cloud.velocityX = -2
    cloud.lifetime = 315
    cloud.y=Math.round(random(10,60))
    console.log(trex.depth)
    console.log(cloud.depth)
    cloud.depth=trex.depth
    trex.depth=trex.depth+1
    nubesGroup.add(cloud);
  }

}
function aparecerobstaculos(){
if(frameCount % 60===0){
  var obstaculo=createSprite(600,165,10,40)
  obstaculo.velocityX = -6
  var rand=Math.round(random(1,6));
  switch(rand){
    case 1:obstaculo.addImage(obstaculo1)
    break;
    case 2:obstaculo.addImage(obstaculo2)
    break;
    case 3:obstaculo.addImage(obstaculo3)
    break;
    case 4:obstaculo.addImage(obstaculo4)
    break;
    case 5:obstaculo.addImage(obstaculo5)
    break;
    case 6:obstaculo.addImage(obstaculo6)
    break;
    default:
      break;

  }
  obstaculo.scale=0.5
  obstaculo.lifetime = 105
  obstaculosGroup.add(obstaculo);
}

}

