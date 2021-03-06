const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

start.addEventListener('click',startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
};

const setting = {
    start: false,
    score: 0,
    speed: 5,
    traffic: 2
};

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement ;
}

console.log(getQuantityElements(100))

function startGame(){
    start.classList.add('hide');
    gameArea.classList.remove('hide');
    for(let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }
    for(let i = 0; i < getQuantityElements(100 * setting.traffic); i++){
        const enemy = document.createElement('div');
        enemy.classList.add("enemy")
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url(./image/enemy.png) center / cover no-repeat';
        gameArea.appendChild(enemy);
    }
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

function playGame(){
    moveRoad();
    moveEnemy();
    if(setting.start){
        if(keys.ArrowLeft && setting.x > 0){
            setting.x -=setting.speed;
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
            setting.x +=setting.speed;
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y +=setting.speed;
        }
        if(keys.ArrowUp && setting.y > 0){
            setting.y -=setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        
        requestAnimationFrame(playGame);
    }
};

function startRun(event){
    event.preventDefault();
    keys[event.key] = true;
};

function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
};

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if(line.y > document.documentElement.clientHeight){
            line.y = -50;
        }
    })
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(enemyCar){
        enemyCar.y += setting.speed / 3;
        enemyCar.style.top = enemyCar.y + 'px';

        if (enemyCar.y > document.documentElement.clientHeight){
            enemyCar.y = -100 * setting.traffic;
            enemyCar.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}