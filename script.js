// const allOptions = document.querySelectorAll('.option');
// const optionsContainer = document.querySelector('.selection .inside');
// const cpuOption = document.querySelector('.cpu__option');
// const rockPaperSicors = ['rock.png', 'paper.png', 'scissor.png'];
// const score = document.querySelector('.scoreboard .score');
// const background = document.querySelector('.background');
// const playerOutcome = document.querySelector('.outCome');
// let circleRotation = 0;
// const cpuImageDOM = cpuOption.querySelector('.img__container img');
// let userImageDOM;
// const playAgainbtn = document.querySelector('.background .play');
// const rootGameDOM = document.querySelector('.selection');


let allOptions;
let optionsContainer;
let cpuOption ;
let rockPaperSicors = ['rock.png', 'paper.png', 'scissor.png'];
let score;
let background;
let playerOutcome;
let circleRotation = 0;
let cpuImageDOM;
let userImageDOM;
let playAgainbtn;
let rootGameDOM;


const initDOM = function(){
    allOptions = document.querySelectorAll('.option');
    optionsContainer = document.querySelector('.selection .inside');
    cpuOption = document.querySelector('.cpu__option');
    score = document.querySelector('.scoreboard .score');
    background = document.querySelector('.background');
    playerOutcome = document.querySelector('.outCome');
    cpuImageDOM = cpuOption.querySelector('.img__container img');
    playAgainbtn = document.querySelector('.background .play');
    rootGameDOM = document.querySelector('.selection');
}

initDOM();



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}




const opponentSelection = function(){
    const randomIndex = getRandomInt(3);
    const image = rockPaperSicors[randomIndex];
    cpuImageDOM.src = image;

}


const startGame = function(){
        allOptions.forEach((option)=>{
        option.addEventListener('click', (e)=>{
            const selectedOption = e.target.closest('.option');
            userImageDOM = selectedOption.querySelector('.img__container img');
            if (selectedOption.classList.contains("right")) rightItemSelected();
            else if (selectedOption.classList.contains("left")) leftItemSelected();
            removeNonUsedOptions();
            cpuOptionActivate();

        });

    });
}

startGame();





const rightItemSelected = function(){
    // select all options:
    const leftItem = document.querySelector('.left');
    const topItem = document.querySelector('.top');
    const rightItem = document.querySelector('.right');

    // remove all positions :
    leftItem.classList.remove('left');
    topItem.classList.remove('top');
    rightItem.classList.remove('right');

    // assign new positions
    leftItem.classList.add('right');
    topItem.classList.add('left');
    rightItem.classList.add('top');
    const degree = 244;

    circleRotation += degree;

    optionsContainer.style.transform = `rotate(${circleRotation}deg)`;
    rotateOptions(244);

}



const leftItemSelected = function(){
    // select all options:
    const leftItem = document.querySelector('.left');
    const topItem = document.querySelector('.top');
    const rightItem = document.querySelector('.right');

    // remove all positions :
    leftItem.classList.remove('left');
    topItem.classList.remove('top');
    rightItem.classList.remove('right');

    // assign new positions
    leftItem.classList.add('top');
    topItem.classList.add('right');
    rightItem.classList.add('left');
    const degree =  120;

    circleRotation += degree;

    optionsContainer.style.transform = `rotate(${circleRotation}deg)`;
    rotateOptions(90);

}







const rotateOptions = function(degree){
    allOptions.forEach((option)=>{
        const optionImage = option.querySelector('img');
        optionImage.style.transform = `rotate(${degree}deg)`;
    })
}



const removeAllDomFromContainer = function(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }

}




const removeNonUsedOptions = function(){
    allOptions.forEach((option)=>{
        if (!option.classList.contains("top")){
            option.style.transition = "3s";
            option.style.opacity = "0";

            setTimeout(() => {
                optionsContainer.removeChild(option);
              }, "4000");
        }

    });

}


const makeBackgroundAppear = function(){
    background.style.display = "grid";
}


const activateAfterUserSelection = function(){
    cpuOptionActivate();
}


const cpuActivities = function(){
    cpuOption.style.opacity = "1";
    cpuOption.style.right = "30%";
    cpuOption.style.transform = `translateX(-50%)`;
    opponentSelection();
}


const didAnyoneWin = function(){
    checkForWinner();
    makeBackgroundAppear();
}



const cpuOptionActivate = function(){
    setTimeout(cpuActivities, "4000");
    setTimeout(didAnyoneWin, "8000");
}



const userIsRock = function(cpuImage){
    if (cpuImage  == "rock.png") playerOutcome.textContent = "Draw";
    else if (cpuImage == "paper.png") playerOutcome.textContent = "Lose";
    else playerOutcome.textContent = "Win";
}


const userIsPaper = function(cpuImage){
    if (cpuImage  == "rock.png") playerOutcome.textContent = "Win";
    else if (cpuImage == "paper.png") playerOutcome.textContent = "Draw"
    else playerOutcome.textContent = "Lose";
}


const userIsSicsors = function(cpuImage){
    if (cpuImage  == "scissor.png") playerOutcome.textContent = "Draw";
    else if (cpuImage == "paper.png") playerOutcome.textContent = "Win"
    else playerOutcome.textContent = "Lose";
}



// make this wait within async function to get accurate cpu image src
const checkForWinner = () =>{
    // get user image in string form
   const myArray = userImageDOM.src.split('/');
   const userImage = myArray[myArray.length-1];

    // get cpu image in string form
    const myArray2 = cpuImageDOM.src.split('/');
    const cpuImage = myArray2[myArray2.length-1];

    if (userImage == "paper.png") userIsPaper(cpuImage);
    else if (userImage == "rock.png") userIsRock(cpuImage);
    else if (userImage == "scissor.png") userIsSicsors(cpuImage);

    if (playerOutcome.textContent == "Win") {
        let currentScore = parseInt(score.textContent);
        currentScore++;
        score.textContent = currentScore;
    }

}


const restoreGame = function(){
    rootGameDOM.insertAdjacentHTML('beforeend', 
    `
    <div class="cpu__option">
                <div class="img__container"><img src="scissor.png" alt=""></div>
            </div>

            <div class="inside">
                <div class="sisors option top">
                
                    <div class="img__container"><img src="scissor.png" alt=""></div>
                    
                </div>


                <div class="rock option left">
                    <div class="img__container"><img src="rock.png" alt=""></div>
                    
                </div>

                <div class="paper option right">
                
                    <div class="img__container"><img src="paper.png" alt=""></div>
                    
                </div>    
    
    `
    
    
    );
}








playAgainbtn.addEventListener('click', (e)=>{
    removeAllDomFromContainer(rootGameDOM);
    restoreGame();
    background.style.display = "none";
    initDOM();
    circleRotation = 0;
    startGame();

});




