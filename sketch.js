//Estados de Jogo
var PLAY=1;
var END=0;
var gameState=1;
var life=3
var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;
var vida1
var vida2
var vida3

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("fimdeJogo.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
  vidas = loadImage ("vidas.png")
}



function setup() {
  createCanvas(600, 600);
  
  //criando espada
  knife=createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.7
  
  vida1=createSprite(520,45,17,17)
  vida2=createSprite(540,45,17,17)
  vida3=createSprite(560,45,17,17)
  vida1.addImage(vidas)
  vida1.scale=0.03
  vida2.addImage(vidas)
  vida2.scale=0.03
  vida3.addImage(vidas)
  vida3.scale=0.03
  //definir colisor para espada
  knife.setCollider("rectangle",0,0,40,40);

  //Variáveis de pontuação e Grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Chamar função de frutas e função de monstro
    fruits();
    Monster();
    
    //mover espada com o mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    //Aumenta a pontuação se a espada tocar na fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      // knifeSwooshSound.play;
      // knifeSwooshSound();
      // knifeSwooshSoundplay();
      
      score+=2;
      
      // score=score+2;
      
    }
    else
    {
      //Vá para o estado final se a espada tocar o inimigo
      if(monsterGroup.isTouching(knife)){
        monsterGroup.destroyEach();
        life-=1
        if(life==2){
          vida3.visible=false;
        }
        else if(life==1){
          vida2.visible=false;
        }
        else if(life==0){
          vida1.visible=false;
        }
        else {
        gameState=END;
        //som de fim de jogo/gameover
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        //Mude a animação da espada para fim de jogo e redefina sua posição
        knife.addImage(gameOverImage);
        knife.scale=1;
        knife.x=300;
        knife.y=300;
        }
      }
    }
  }
  
  drawSprites();
  //exibir pontuação
  textSize(25);
  text("Pontuação: "+ score,200,50);
  textSize(18)
  text("LIFEPOINTS",400,50)
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(0,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=(7+(score/4));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    
  //aumentar a velocidade das frutas após a pontuação 4 

      // fruit.velocityX= (7+(score/4));
      // fruit.velocityY= (7+(score));
      // fruit.velocity= (7+(score/4));
      fruit.velocityX= (7+(score));
    
    fruit.scale=0.2;
    fruit.debug=true;
    r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
  
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
