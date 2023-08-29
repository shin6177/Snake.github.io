let inputDir = {x: 0, y: 0};
const gameOverSound = new Audio('./music/gameover.mp3')
const moveSound = new Audio('./music/move.mp3')
const foodSound = new Audio('food.mp3')
const musicSound = new Audio('./music/music.mp3')
let HighscoreBox = document.querySelector("#HiscoreBox")
let Score = document.querySelector("#score")
let board = document.querySelector("#board")
let speed = 4;
let score = 0;
let lastPaintTime = 0;

let snakeArr = [
    {x:13, y:15}
]

let food =  {x:6, y:7 };

let Hiscoreval;

// Game functions 

function main(curTime){
    window.requestAnimationFrame(main)            //it will keep work better than setinterval 
     if((curTime - lastPaintTime)/1000 < 1/speed){
        return;
     }
     lastPaintTime = curTime
     gameEngine()   
}


 function isCollide (sarr){
      //if you bump your head into yourself.
      for(let i = 1; i < snakeArr.length; i++){
                if(snakeArr[i].x ===snakeArr[0].x  && snakeArr[i].y ===snakeArr[0].y){
                      return true;
                }}

                //If you bump into the wall 
                if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y<= 0){
                    return true    
                   }}


function gameEngine(){
    //Part 1 :  updating the snack array & food 
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause()
        inputDir = {x: 0, y: 0};
        alert("Game is over, ")
        snakeArr =  [{x:13, y:15}];
        musicSound.play()
        score = 0;
    }
  




//If you have eaten the food, increment the score and regenerate the food 
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play()
     score += 1;
     if(score>Hiscoreval){
        Hiscoreval = score
        localStorage.setItem("hiscore", JSON.stringify(Hiscoreval))
        HighscoreBox.innerHTML = "HiScore: " + Hiscoreval
     }
     scoreBox.innerHTML = "Score: " +  score 
     snakeArr.unshift({x: snakeArr[0].x  + inputDir.x, y: snakeArr[0].y  + inputDir.y})
     let a = 2;
     let b = 16;
     food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
}


// Moving the snack 
for(let i = snakeArr.length-2; i >= 0; i-- ){
     snakeArr[i+1] = {...snakeArr[i]}
}


snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;





    //Part 2 :  display the snack  
    board.innerHTML = "",
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head')
        }else{
            snakeElement.classList.add('snake')
        }
        
        board.appendChild(snakeElement)

    })
  //Display the food Element 
  foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food')
        board.appendChild(foodElement)

}





// Main logic starts here  
 let HiscoreBoxi = localStorage.getItem("hiscore")
 if(HiscoreBoxi === null){
     Hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(Hiscoreval))
 }else{
    Hiscoreval = JSON.parse(HiscoreBoxi)
    HighscoreBox.innerHTML = "Hiscore: " + Hiscoreval
    localStorage.setItem("hiscore", JSON.stringify(Hiscoreval))
 }

window.requestAnimationFrame(main)
window.addEventListener('keydown', e=>{
    musicSound.play()
    moveSound.play();
    inputDir = {x:0, y:1}  //Start the game
     switch(e.key){
         case "ArrowUp":
           inputDir.x =  0;
           inputDir.y = -1;
          break;

         case "ArrowDown":
         inputDir.x =  0;
           inputDir.y =  1;
          break;

         case "ArrowLeft":
         inputDir.x =  -1;
           inputDir.y =  0;
          break;

         case "ArrowRight":
          inputDir.x =  1;
           inputDir.y =  0;
          break;

          default:
          break;
     } 

})