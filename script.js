// Created by Sword 🛡

//alert("Wait for Few second")
alert("Powerup == Yellow circle")

window.onload = () => {

/*
let audio = new Audio('https://dl.dropbox.com/scl/fi/jtw4gl2nz9xiiu89jonl5/alex-productions-epic-cinematic-trailer-elite-chosic.com.mp3?rlkey=p8ybm5ylb5ut9ywtt540xter8&dl=1');
*/            
            
var url = 'https://dl.dropbox.com/scl/fi/jtw4gl2nz9xiiu89jonl5/alex-productions-epic-cinematic-trailer-elite-chosic.com.mp3?rlkey=p8ybm5ylb5ut9ywtt540xter8&dl=1';
    window.AudioContext = window.AudioContext||window.webkitAudioContext; //fix up prefixing
    var context = new AudioContext(); //context
    var source = context.createBufferSource(); //source node
    source.connect(context.destination); //connect source to speakers so we can hear it
    var request = new XMLHttpRequest();
    request.open('GET', url, true); 
    request.responseType = 'arraybuffer'; //the  response is an array of bits
    request.onload = function() {
        context.decodeAudioData(request.response, function(response) {
            source.buffer = response;
            source.start(0); //play audio immediately
            source.loop = true;
        }, function () { console.error('The request failed.'); } );
    }
    request.send();
//__________________________________

document.getElementById("loading").style.display = 'none'
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const button = document.getElementById('button')

button.addEventListener("click" , restart)

function restart(){
    gameOver = false;
    group = []
    enemyArrow = []
    playerBullate = []
    powers = []
    ctx.fillStyle = "#fff"
    ctx.font = '10px Impact'
    score = 0
    button.style.display = 'none'
    animate(0)
}

class Stars{
    constructor(){
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height;
        this.vy = 0.5;
        this.r = 1;
    }
    update(){
        this.draw();
        this.y += this.vy;
        if(this.y > canvas.height){
            this.y = -2;
            this.x = Math.random() * canvas.width;
        }
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = "#fff"
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }
}

let star = []

for(let i = 0 ; i < 100; i++){
    star.push(new Stars())
}

///console.log(star.length )

let score = 0;
///////enemy bullate///
let enemyArrow = []
class EnemyBullate{
    
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.r = 7
        this.color = 'white'
        this.velocity = 5
        
    }
    update(){
        this.draw()
        this.y += this.velocity 
    
        if(this.x > player.x
                && this.x < player.x + player.width
                && this.y < player.y + player.height
                && this.y > player.y
                
                ){
                    gameOver = true;
                }
        
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }
}

//////enemy//////////

class Enemy{
    constructor(x,y){
        this.x = x
        this.y = y
        this.height = 20;
        this.width = 20
        this.vx = 0;
        this.vy = 0
        
        this.image = enemyShip;
        
    }
    update(){
        this.draw()
        this.x += this.vx;
        this.y += this.vy;
        
        if(this.y > canvas.height ){
            gameOver = true;
        }
        
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = "#fff"
        ctx.drawImage(this.image, this.x, this.y, this.height , this.width)
        ctx.fill()
        ctx.closePath()
        
    }   
}

//////////enemy Groop ////////

class Group{
    constructor(){
        this.x = 0;
        this.y = 0
        this.vx = 2;
        this.vy = 0
        this.enemyHolder = []
        
        let colom = Math.floor(Math.random() * 10) + 8
        let row = Math.floor(Math.random() * 6) + 2
        this.width = colom * 20
        for(let x = 0; x < colom ;x++){
            for(let y = 0; y < row; y++){
                this.enemyHolder.push(new Enemy(22 * x, 22 * y));
            }
        }
    }
    
    update(){
        this.x += this.vx;
        this.enemyHolder.forEach((enemy , i)=>{
            enemy.x += this.vx;
            enemy.y += this.vy;
            enemy.update()
            
            //collision 
            playerBullate.forEach((arrow, j) =>{
                if(arrow.x > enemy.x
                && arrow.x < enemy.x + enemy.width
                && arrow.y < enemy.y + enemy.height
                && arrow.y > enemy.y
                
                )
                {
                    let x = enemy.x;
                    let y = enemy.y
                    effect(x, y)
                    this.enemyHolder.splice(i, 1)
                    playerBullate.splice(j, 1)
                    score += 100
                    
                }
            })
            
        })
        if(nextEnemyArrow < nowEnemyArrow ){
            let a = this.enemyHolder[Math.floor(Math.random() * this.enemyHolder.length)]
            
            this.shoot(a.x, a.y)
            nowEnemyArrow = 0;
            nextEnemyArrow = Math.floor(Math.random() * 500) + 500
        }
        
        this.vy = 0;
        
        
        if(this.x + this.width > canvas.width || this.x < 0){
            this.vx = - this.vx
            this.vy = 30
        }
    }
    shoot(x, y){
        enemyArrow.push(new EnemyBullate(x,y))
    }
}
let group = []
class Partile{
    constructor(x, y){
        this.x = x;
        this.y = y
        this.r = 3
        this.color = 'blue'
        this.vx = 2;
        this.vy = 2
    }
    
    update(){
        this.x += this.vx;
        this.y += this.vy
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }
    
}

let particle = []

function effect(x, y){
    for(let i = 0; i < 10; i++){
        particle.push(new Partile(x, y))
    }
}

/////plyer Bullate /////////
let playerBullate = []
class Bullate{
    
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.r = 3
        this.color = 'red'
        this.velocity = -3
        
    }
    update(){
        this.draw()
        this.y += this.velocity 
        
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }
}

/////player Class//////
class Player{
    constructor(){
        this.height = 50
        this.width = 50
        this.x = canvas.width / 2 - this.width / 2
        this.y = canvas.height - 70
        this.velocity = 0;
        this.shootGap = 200;
        this.nextShoot = 0;
        this.image = playerShip;
    }
    update(){
        this.draw()
        this.x += this.velocity ;
        
        if(this.nextShoot > this.shootGap ){
            this.shoot(this.x + this.width /2 , this.y )
            this.nextShoot = 0
        }
        this.nextShoot += deltaTime ;
        if(this.x < 0){
            this.x = 0
        }
        if(this.x + this.width> canvas.width){
            this.x = canvas.width - this.width
        }
        
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.fill()
        ctx.closePath()
    }
     
     shoot(x, y){
         playerBullate.push(new Bullate(x, y))
     }
    
}
      
const player = new Player() 

/////////player Movement//////////
let start = 0
let move = 0;
addEventListener('touchstart', touchStart)
addEventListener('touchmove', touchMove)
addEventListener('touchend', touchEnd)

function touchStart(event){
    start = event.touches[0].clientX
}
function touchMove(event){
    move = event.touches[0].clientX;
    player.velocity = (move - start) * 1
    start = move
}
function touchEnd(event){
    start = 0;
    touchEnd = 0;
    player.velocity = 0
}


/////power Up /////////
class PoweeUp{
    constructor(){
        this.x = 100 +  Math.random() * canvas.width/2
        this.y = 100 + Math.random() * canvas.height/2
        this.vy = 2;
        this.vx = 2;
        this.r = 4
    }
    update(){
        this.x += this.vx;
        this.y += this.vy;
        this.draw()
        if(this.x + this.r > canvas.width || this.x < 0){
            this.vx = -this.vx
        }
        if(this.y + this.r > canvas.height || this.y < 0){
            this.vy = -this.vy
        }   
    }
    
    draw(){
        ctx.beginPath()
        ctx.fillStyle = "yellow"
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    } 
}

let powers = []
let hardness = 0.75;
let globleTime = 0;

let newGroup = 10000;
let nextGroupIn = 5000;
let powerUp = 25000;
let nextPowerUpIn = 20000;

let lastTime = 0;
let deltaTime = 0;
let gameOver = false;
function animate(timeStamps){
if (gameOver ){
    ctx.font = '100px impact'
    ctx.fillStyle = 'red'
    ctx.fillText(score , 100,200)
    button.style.display = 'block'

    return 
    
} 
particle = []

    ctx.clearRect(0,0,canvas.width, canvas.height)
    deltaTime = timeStamps - lastTime ;
    lastTime = timeStamps ;
    
    ////enemy update
    if(nextGroupIn > newGroup ){
        group.push(new Group())
        nextGroupIn = 0;
    }
    
    group.forEach(g =>{
        g.update()
        if(g.enemyHolder.length == 0){
            group.shift()
        }
        
    })
    
    ///enemy distory particle /////
    particle.forEach(e =>{
        e.update()
    })
    
    
    
    //ctx.fillText(playerBullate.length, 100,100)

    player.update()
    playerBullate.forEach((e, i) =>{
        e.update()
        if(e.y < 0){
            playerBullate.splice(i, 1)
            
        }
    })   
    
    //////powerUp/////////
    if( powerUp < nextPowerUpIn ){
        powers.push(new PoweeUp())
        nextPowerUpIn = 0;
        
    }
    
    powers.forEach((e , i)=>{
        e.update()
        if(e.x > player.x &&
        e.x < player.x + player.width &&
        e.y > player.y && 
        e.y < player.y + player.height
        
        ){
            powers.splice(i, 1);
            makePowerUp();
        }
    })
    
    
    requestAnimationFrame(animate)
    nextGroupIn += deltaTime ;
    nextPowerUpIn += deltaTime 
    
    
    if( uped){
       if(powerTimeEnd > maxTimeForPowerUp ) {
           powerTimeEnd = 0;
           player.shootGap = 200;
           uped = false;
       }
        
        
        powerTimeEnd += deltaTime ;
    }
   //...........enemy arrow.......//
   
   enemyArrow.forEach((e, i) =>{
       e.update()
   }) 
    
    nowEnemyArrow += deltaTime ;
    ctx.fillText(`Score : ${score }` , 50,50)
    
    
    star.forEach(star =>{
        star.update()
    })
    globleTime += deltaTime ;
    
    if(globleTime > 20000){
          
    }   
}
const maxTimeForPowerUp = 5000
let powerTimeEnd = 0;
let uped = false;
function makePowerUp(){
    uped = true;
    player.shootGap = 50;
}  
let nextEnemyArrow = 500;
let nowEnemyArrow = 0;  
animate(0)
}