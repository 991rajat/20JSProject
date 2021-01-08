//Game Values

let min = 1, 
    max = 10,
    winningNum = getWinning(min,max);
    guessLeft = 3;

//UI Ele

const game = document.getElementById('game');
const minnum = document.querySelector('.min-num');
const maxnum = document.querySelector('.max-num');
const guessbtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

minnum.textContent = min;
maxnum.textContent = max;

//Play Again
game.addEventListener('mousedown', (e)=>{
   if(e.target.className === 'play-again'){
       window.location.reload();
   } 
});

//Listen for guess
guessbtn.addEventListener('click',()=>{
    let num = parseInt(guessInput.value);

    if(isNaN(num) || num < min || num > max){
        setMessage(`Please Enter a number between ${min} and ${max}`,'red');
    }

    if(num === winningNum){
        guessInput.disabled = true;
        guessInput.style.borderColor = 'green';
        setMessage(`${winningNum} is correct! YOU WIN`, 'green');
        playAgain();
    }else{

        guessLeft -= 1;
        if(guessLeft === 0){

            guessInput.disabled = true;
            guessInput.style.borderColor = 'red';
            setMessage(`Game Over! You lost. The correct number was ${winningNum}`, 'red');
            playAgain();

        }else{
            guessInput.value='';
            setMessage(`${num} is not correct ${guessLeft}, guesses left`, 'red');
        }
    }
});

function getWinning(min, max){
    return Math.floor(Math.random()*(max-min+1) + min);
  }

function setMessage(msg,color){
    message.style.color = color;
    message.textContent = msg;

}

function playAgain(){

    guessbtn.value = 'Play Again';
    guessbtn.className +='play-again'
}