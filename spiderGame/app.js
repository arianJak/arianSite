'use strict';

const spider = document.getElementById('spider');
const spiderSkin = document.querySelector('.spider__photo');
const apple = document.querySelector('.apple');
const goldApple = document.querySelector('.goldPapple');
const changeButton = document.querySelector('.button');
const goldButton = document.querySelector('.button-gold');
const step = 10; // spider's speed
const win = document.querySelector('.win');
const body = document.querySelector('body');    

let appleTopPosition = 1;
let appleLeftPosition = 1;
let appleSize = 50;
let appleCounter = 0;

let appleGoldTopPosition = 1;
let appleGoldLeftPosition = 1;
let appleGoldSize = 10;
let isAppleGold = false;
let appleGoldCounter = 0;

let spiderTopPosition = 550;
let spiderLeftPosition = 400;
let spiderSize = 40;
let isSpiderNerd = false;
const standartBoost = 2;
const goldBoost = 10;

let windowHeight = window.innerHeight - spiderSize;
let windowWidht = window.innerWidth - spiderSize;

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        spider.style.transform = 'rotate(0deg)';
        spiderTopPosition -= step;
    } else if (event.key ===  'ArrowDown') {
        spider.style.transform = 'rotate(180deg)';
        spiderTopPosition += step;
    } else if (event.key === 'ArrowLeft') {
        spider.style.transform = 'rotate(-90deg)';
        spiderLeftPosition -= step;
    } else if (event.key === 'ArrowRight') {
        spider.style.transform = 'rotate(90deg)';
        spiderLeftPosition += step;
    }

    if (spiderTopPosition > windowHeight) {
        spiderTopPosition = 0;
    } else if (spiderTopPosition < 0) {
        spiderTopPosition = windowHeight;
    } else if (spiderLeftPosition > windowWidht){
        spiderLeftPosition = 0;
    }else if (spiderLeftPosition < 0) {
        spiderLeftPosition = windowWidht;
    }

    spider.style.top = spiderTopPosition + 'px';
    spider.style.left = spiderLeftPosition + 'px';
    getApple(spiderTopPosition, spiderLeftPosition, standartBoost);

    if (appleCounter % 6 === 0 && appleCounter >=6 && !isAppleGold) {
        visibleGoldApple();
    }

    if (isAppleGold) {
        getGoldApple(spiderTopPosition, spiderLeftPosition, goldBoost);
    }

    if (appleGoldCounter > 2) {
        goldButton.classList.add('button-gold--active');
    }

    buttonChanger(spiderSize)
});

goldButton.addEventListener('click', () => {
    spiderSkin.src = 'gold-spider.png';
    goldButton.classList.remove('button-gold--active');
    appleGoldCounter = 0;
});

changeButton.addEventListener('click', () => { 
    if (spiderSize > 200) {
        if (isSpiderNerd) {
            spiderSkin.src = 'classic-spider.png';
            isSpiderNerd = false;
        } else {
            spiderSkin.src = 'nerd-spider.png';
            isSpiderNerd = true;
        }
        spiderSize -= 180;
        spider.style.width = spiderSize + 'px';
        spider.style.height = spiderSize + 'px';
    }
});
win.addEventListener('click', () => {
    body.style.backgroundColor = 'black';
    spider.style.display = 'none';
    apple.style.display = 'none';
    goldApple.style.display = 'none';
    changeButton.style.display = 'none';
    goldButton.style.display = 'none';
    win.style.display = 'none';
    const winText = document.getElementById('win-text');
    winText.style.display = 'block';
    spiderSize = 0;
});

function buttonChanger(size) {
    if (size > 200) {
        changeButton.style.backgroundColor = '#69b3f0';
    } else if (size < 200) {
        changeButton.style.backgroundColor = '#bebebe';
    }
}

function getApple(top, left, boost) {
    if (
        top > appleTopPosition - spiderSize &&
        top < appleTopPosition + appleSize &&
        left > appleLeftPosition - spiderSize &&
        left < appleLeftPosition + appleSize
    ) {
        randomApplePosition();
        bigerSpider(boost);
        appleCounter++;
    }
}

function getGoldApple(top, left, boost) {
    if (
        top > appleGoldTopPosition - spiderSize &&
        top < appleGoldTopPosition + appleSize &&
        left > appleGoldLeftPosition - spiderSize &&
        left < appleGoldLeftPosition + appleSize
    ) {
        bigerSpider(boost);
        invisibleGoldApple();
        appleCounter++;
        appleGoldCounter++;
        playGoldSound();
    }
}

function bigerSpider(boost) {
    spiderSize += boost;
    spider.style.width = spiderSize + 'px';
    spider.style.height = spiderSize + 'px';
    console.log('Actual spider`s size: ' + spiderSize);
    if (spiderSize >= 499) {
        win.style.display = 'block';
    }
}

function  randomApplePosition() {
    playSound();
    appleTopPosition = Math.floor(Math.random() * (windowHeight - appleSize));
    appleLeftPosition = Math.floor(Math.random() * (windowWidht - appleSize));
    apple.style.top = appleTopPosition + 'px';
    apple.style.left = appleLeftPosition + 'px';
}

function playSound() {
    const audio = new Audio('499fe33297885e4.mp3');
    audio.play();
}

function visibleGoldApple(){
    appleGoldTopPosition = Math.floor(Math.random() * (windowHeight - appleSize));
    appleGoldLeftPosition = Math.floor(Math.random() * (windowWidht - appleSize));
    goldApple.style.top = appleGoldTopPosition + 'px';
    goldApple.style.left = appleGoldLeftPosition + 'px';
    goldApple.classList.add('goldPapple--active');
    isAppleGold = true;
}

function invisibleGoldApple(){
    goldApple.classList.remove('goldPapple--active');
    isAppleGold = false;
}

function playGoldSound() {
    const audio = new Audio('animal_bird_duck_quack_003.mp3');
    audio.play();
}