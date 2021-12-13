class Snake{
    constructor(x,y,size,color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.tails = [{x:this.x, y:this.y}];
        this.rotateX = 0;
        this.rotateY = 1;
    }

    move(){
        let newRect;
        
        if(this.rotateX == 1){
            newRect = {
                x: this.tails[this.tails.length - 1].x + this.size,
                y: this.tails[this.tails.length - 1].y
            }
        } else if(this.rotateX == -1){
            newRect = {
                x: this.tails[this.tails.length - 1].x - this.size,
                y: this.tails[this.tails.length - 1].y
            }
        } else if(this.rotateY == 1){
            newRect = {
                x: this.tails[this.tails.length - 1].x,
                y: this.tails[this.tails.length - 1].y + this.size
            }
        } else if(this.rotateY == -1){
            newRect = {
                x: this.tails[this.tails.length - 1].x,
                y: this.tails[this.tails.length - 1].y - this.size
            }
        } else if(this.rotateX == 0 && this.rotateY == 0){
            newRect = {
                x: this.tails[this.tails.length - 1].x,
                y: this.tails[this.tails.length - 1].y
            }
        }
        this.tails.shift()
        this.tails.push(newRect)
    }
}

class Apple{
    constructor(){
        var isTouching; 
        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            for(var i = 0; i < snake.tails.length;i++){
                if(this.x == snake.tails[i].x && this.y == snake.tails[i].y){
                    isTouching = true
                }
            }
            this.size = snake.size
            this.color = "red"
            if(!isTouching){
                break;
            }
        }
    }
}

let canvas = document.getElementById('canvas');

let snakeColorBtn = document.getElementById('btnColor');
let snakeColorPicker = document.getElementById('color')
let snakecolorprin;

snakeColorBtn.addEventListener('click', ()=>{
    snakecolorprin = snakeColorPicker.value;
})


let snake = new Snake(20,20,20,"blue")

let apple = new Apple()

let canvasContext = canvas.getContext('2d');

window.onload = () => {
    gameLoop();
};

function gameLoop(){
    setInterval(show, 1000/15);
};

function show(){
    update();
    draw();
    
}

function update(){
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    snake.move()
    eatApple()
    score()
    checkHitWall()
}

function score(){
    let scorePoints = document.getElementById('scorePoints');
    scorePoints.innerHTML = snake.tails.length - 1;
}

function informations(){
    let logs = document.querySelector('.logs')
    let divN = document.createElement('div')
    let content = document.createTextNode('Nova calda gerada nas coordenadas: ' + JSON.stringify(snake.tails))

    divN.appendChild(content)

    logs.appendChild(divN)
}

function checkHitWall(){
    let headTail = snake.tails[snake.tails.length -1]
    if(headTail.x == - snake.size) {
        headTail.x = canvas.width - snake.size
    } else if(headTail.x == canvas.width) {
        headTail.x = 0
    } else if(headTail.y == - snake.size) {
        headTail.y = canvas.height - snake.size
    } else if(headTail.y == canvas.height) {
        headTail.y = 0 
    };


}


function eatApple(){
    if(snake.tails[snake.tails.length - 1].x == apple.x &&
        snake.tails[snake.tails.length - 1].y == apple.y){
            snake.tails[snake.tails.length] = {x:apple.x, y: apple.y}
            apple = new Apple();
            informations()
        }
}

function draw(){
    for(let i = 0; i < snake.tails.length; i++){
        createRect(snake.tails[i].x + 2.5 , snake.tails[i].y + 2.5, snake.size -5 ,snake.size - 5,snakecolorprin)
    }

    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
}

function createRect(x,y,width,height,color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,width,height);
};

window.addEventListener('keydown', (e) => {
    setTimeout(()=>{
        if(e.keyCode == 37 && snake.rotateX != 1){
            snake.rotateX = -1;
            snake.rotateY = 0;
        }else if(e.keyCode == 38 && snake.rotateY != 1){
            snake.rotateX = 0
            snake.rotateY = -1;
        }else if(e.keyCode == 39 && snake.rotateX != -1){
            snake.rotateX = 1
            snake.rotateY = 0;
        }else if(e.keyCode == 40 && snake.rotateY != -1){
            snake.rotateX = 0
            snake.rotateY = 1;
        }else if(e.keyCode == 83){
            snake.rotateY = 0;
            snake.rotateX = 0;
        }
        
    },1)
})