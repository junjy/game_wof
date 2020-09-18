'use strict'
// SEIF3 - PROJECT #1 - WOF
console.log('linked main.js');

//--------- PUZZLE & WHEEL SETUP ---------//


// For Intro Page
const introPg = document.querySelector('#intro-page');
const introFooter = document.querySelector('#intro-footer');

// For Modal
const modalTriggerElem = document.querySelector('.modal-trigger');
const modalCoverElem = document.querySelector('.modal-cover');
const modalPopUpElem = document.querySelector('.modal-popup');
const modalCloseBtn = document.querySelector('.modal-close-btn');

// For Game Page
const gamePg = document.querySelector('#game-page');
const timerDiv = document.querySelector('#timer-display');
const progDiv = document.querySelector('#progress-display');

const sectionMid = document.querySelector('#section-middle');
const puzzleDiv = document.querySelector('#puzzle-div');
const wheelDiv = document.querySelector('#wheel-div');
const wheelImg = document.querySelector('#wheel-img');
const wheelActual = document.querySelector('#chart');

const scoreDiv = document.querySelector('#score-div');
const inputDiv = document.querySelector('#input-div');
const buttonsDiv = document.querySelector('#buttons-div');

// to check if vowel or consonant
const vowelsRegex = /^[aeiou]$/i; 
const consonantsRegex = /^[bcdfghjklmnpqrstvwxyz]$/i; 

// To amend later
timerDiv.innerHTML = '';

// Transferred puzzleArray to puzzles.js

const wheelValues = [300, 400, 500, 600, 700, 800, 900, 1000, 2500, 300, 400, 500, 600, 700, 800, 900, 1000];
const vowelCost = 250;

// For Game Timer Functions
let isTimerOn = false; // set option for player at start of game
let countdownTimer; // for checkTime function
const timerSpinWheel = 4;
// const timerBtn = 10; // timer to select buttons
const timerLetter = 10;
const timerSolve = 12;

// For Msg Display Timer
const typMsgDelay = 1000; // 1 sec
const spinMsgDelay = 3000; // 3 sec
const dispLetterDelay = 100; 


// To check if needed
let tempInput = ""; //for name, guess letter, vowel, puzzle

// Initialize player data
let playerCurrent = {
    name: "",
    earnedTotal: 0,   // total for all games
    earnedCurrent: 0, // for current game only
    round: 0,
    earnings: []
}

let puzzleCurrent = {
    text: "",
    split: [],
    vowels: [],
    consonants: []
};

let hiddenArr = [];
let wordArr = [];

// letters guessed for current game only
let guessLettersCurrent = {
    vowels: [],
    consonants: []
};

// Reset player data for subseq games
const playerReset = {
    name: "",
    earnedTotal: 0,   // total for all games
    earnedCurrent: 0,  // for current game only
    round: 0,
    earnings: []
}

const puzzleReset = {
    text: "",
    split: [],
    vowels: [],
    consonants: []
};

const guessLettersCurrentReset = {
    vowels: [],
    consonants: []
};


// Set up buttons 1.Spin Wheel 2.Buy a vowel 3.Solve It! 4.Exit Game
let lineBreak = document.createElement('br');

let btnNewGame = document.createElement('button');
    btnNewGame.setAttribute('id', 'btn-new-game');
    btnNewGame.innerHTML = 'startGame';
    btnNewGame.setAttribute('class', 'btn btn-outline-success');

let btnInfo = document.createElement('button');
    btnInfo.setAttribute('id', 'btn-info');
    btnInfo.innerHTML = 'howToPlay';
    btnInfo.setAttribute('class', 'btn btn-outline-warning');
    // btnInfo.classList.add('modal-trigger');

    modalCloseBtn.setAttribute('class', 'btn btn-outline-warning');

// NOTE: COMMENT OUT THIS PART IF USING ACTUAL WHEEL TO SPIN
let btnSpinWheel = document.createElement('button');
    btnSpinWheel.setAttribute('id', 'btn-spin-wheel');
    btnSpinWheel.innerHTML = 'spinWheel';
    btnSpinWheel.setAttribute('class', 'btn btn-outline-success');

let btnBuyVowel = document.createElement('button');
    btnBuyVowel.setAttribute('id', 'btn-buy-vowel');
    btnBuyVowel.innerHTML = 'buyVowel';
    btnBuyVowel.setAttribute('class', 'btn btn-outline-success');

let btnSolvePuzzle = document.createElement('button');
    btnSolvePuzzle.setAttribute('id', 'btn-solve-puzzle');    
    btnSolvePuzzle.innerHTML = 'solveIt';
    btnSolvePuzzle.setAttribute('class', 'btn btn-outline-success');

let btnNextRound = document.createElement('button');
    btnNextRound.setAttribute('id', 'btn-next-round');    
    btnNextRound.innerHTML = 'nextRound';
    btnNextRound.setAttribute('class', 'btn btn-outline-success');

let btnExitGame = document.createElement('button');
    btnExitGame.setAttribute('id', 'btn-exit-game');  
    btnExitGame.innerHTML = 'exitGame';
    btnExitGame.setAttribute('class', 'btn btn-outline-danger'); 

let btnTimerOn = document.createElement('button');
    btnTimerOn.setAttribute('id', 'btn-timer-on');    
    btnTimerOn.innerHTML = 'YES';
    btnTimerOn.setAttribute('class', 'btn btn-outline-success');

let btnTimerOff = document.createElement('button');
    btnTimerOff.setAttribute('id', 'btn-timer-off');  
    btnTimerOff.innerHTML = 'NO';
    btnTimerOff.setAttribute('class', 'btn btn-outline-danger'); 

// ------ TEST INPUT FIELD ------//

let inputName = document.createElement('input');
    inputName.setAttribute('id', 'input-name')
    inputName.setAttribute('type', 'text');
    // inputName.setAttribute('class', 'form-control');

let inputConsonant = document.createElement('input');
    inputConsonant.setAttribute('id', 'input-consonant')
    inputConsonant.setAttribute('type', 'text');
    // inputConsonant.setAttribute('class', 'form-control');

let inputVowel = document.createElement('input');
    inputVowel.setAttribute('id', 'input-vowel')
    inputVowel.setAttribute('type', 'text');
    // inputVowel.setAttribute('class', 'form-control');

let inputSolve = document.createElement('input');
    inputSolve.setAttribute('id', 'input-solve')
    inputSolve.setAttribute('type', 'text');
    // inputSolve.setAttribute('class', 'form-control');


// add timelimit msgs later
const msgGameOver = {
    spinBankrupt: 'GAME OVER: Sorry, you spinned BANKRUPT. Better luck next time!',
    noInput: 'GAME OVER: You did not enter/select anything!',
    noInputLetter: 'GAME OVER: You did not enter a letter!',
    invalidLetter: 'GAME OVER: You entered an invalid letter!',
    invalidConsonant: 'GAME OVER: No such consonant in puzzle.',
    invalidVowel: 'GAME OVER: No such vowel in puzzle.',
    repeatedConsonant: 'GAME OVER: You entered a repeated consonant.',
    repeatedVowel: 'GAME OVER: You entered a repeated vowel.',
    noMoneyForVowel: 'GAME OVER: Sorry, you do not have enough money to buy a vowel.',
    noInputGuess: 'GAME OVER: You did not enter anything to solve the puzzle!',
    invalidGuess: 'GAME OVER: Sorry, wrong guess on the puzzle! Better luck next time!'
}


//--------- SOUND EFFECTS ---------//

function audioBankrupt() {
    let bankruptSfx = document.getElementById("sound-bankrupt");
    bankruptSfx.play();

}

function audioIncorrectGuess() {
    let incorrectSfx = document.getElementById("sound-buzzer");
    incorrectSfx.play();

}

function audioCorrectGuess() {
    let correctSfx = document.getElementById("sound-ding");
    correctSfx.play();

}

function audioNewPuzzle() {
    let newPuzzleSfx = document.getElementById("sound-reveal");
    newPuzzleSfx.play();

}

function audioSolve() {
    let solveSfx = document.getElementById("sound-solve");
    solveSfx.play();

}


//--------- CHECK TIME FUNCTIONS ---------//

// TO SWITCH ON TIMER
// Check how to exitGame if time is up

function showTime(input) {

    timerDiv.innerHTML = 'Time left: ' + input + ' sec';
}


function checkTime(time) {

    countdownTimer = setInterval(timerDisplay, 1000);

    function timerDisplay() {
        console.log(time);
        // timerDiv.innerHTML = 'Time left: ' + time + 's';
        showTime(time);
        time--;

        if (time < 0) {
            console.log('end countdown timer');
            clearInterval(countdownTimer);
            inputConsonant.remove();
            timerDiv.innerHTML = "";

            // update msg to be more specific later
            exitGame(msgGameOver.noInput);
        }
    }
}


//--------- CHECK LETTER FUNCTIONS ---------//
// 1. Check vowel, consonant or other
// 2. Check if letter exists in array
// 3. Check if letter is unique/not repeated
// 4. Check letter count in puzzle


function isVowelOrConsonant(input) {
    if (vowelsRegex.test(input) === true) {
        return 'vowel';
    } else if (consonantsRegex.test(input) === true) {
        return 'consonant';
    } else {
        return false;
    }

}

// refine function later
function checkIfLetterExist(array, input) {
    let count = 0;
    array.forEach((element) => {
        if (input === element) {
            count += 1;
        }
    })

    if (count > 0) {
        return true;
    } else {
        return false;
    }
}

// Check if input letter is repeated in array
function checkIfLetterUnique(array, input) {
    let count = 0;

    if (array !== []) {
        array.forEach((element) => {
            if (input === element) {
                count += 1;
            }
        })

        if (count === 0) {
            return true;
        } else {
            return false;
        }
    }

}

function letterCount(array, input) {
    let count = 0;

    array.forEach((element) => {
        if (input === element) {
            count += 1;
        }
    })
    return count;
}


function checkNoMoreVowels() {
    if (puzzleCurrent.vowels.length === guessLettersCurrent.vowels.length) {
        return true;
    } else {
        return false;
    }
}

function checkNoMoreConsonants() {
    if (puzzleCurrent.consonants.length === guessLettersCurrent.consonants.length) {
        return true;
    } else {
        return false;
    }
}

function checkNoMoreLetters() {
    if (checkNoMoreVowels() && checkNoMoreConsonants()) {
        return true;

    } else {
        return false;
    }
}

function checkValidConsonant(spinValue, input) {

    let letter = input.toUpperCase();
    let letterCheck = isVowelOrConsonant(letter);
    let doesLetterExist = checkIfLetterExist(puzzleCurrent.consonants, letter);
    let isLetterUnique = checkIfLetterUnique(guessLettersCurrent.consonants, letter);

    // Check for vowels or special char
    if (letterCheck !== 'consonant'){

        audioIncorrectGuess();
        exitGame(msgGameOver.invalidLetter);

    } // Check if consonant, exists in puzzle & if repeated
    else {

        if (doesLetterExist ===  true) {

            if (isLetterUnique === true) {  
                
                // update puzzle board
                showCorrectLetters(input);

                let numLetters = letterCount(puzzleCurrent.splitText, letter);
                guessLettersCurrent.consonants.push(letter);
                
                // update player earnings, delay msg display
                let thisSpin = spinValue * numLetters;
                playerCurrent.earnedCurrent += thisSpin;

                if (numLetters === 1) {                     

                    setTimeout(function() {
                        showMsg('Current guess:  ' + letter + '.<br>There is 1 ' + letter + '.<br> You earned $' + thisSpin);

                        if (checkNoMoreLetters()) {
                            winGame();

                        } else if (checkNoMoreConsonants()) {
                            scoreDiv.innerHTML += ' There are no more consonants left.';
                        }
                        
                        enableButtons();

                    }, typMsgDelay)
                } 
                else {

                    setTimeout(function() {
                        showMsg('Current guess:  ' + letter + '.<br>There are ' + numLetters + ' ' + letter + 's.<br> You earned $' + thisSpin);

                        if (checkNoMoreLetters()) {

                            winGame();

                        } else if (checkNoMoreConsonants()) {
                            scoreDiv.innerHTML += ' There are no more consonants left.';
                        }
                        enableButtons();

                    }, typMsgDelay)

                }
                
                showProgress(playerCurrent.round, playerCurrent.earnedCurrent, playerCurrent.earnedTotal);

                // if (isTimerOn === true) {
                //     checkTime(timerBtn);
                // }

                
                console.log('Guessed consonants to-date: ' + guessLettersCurrent.consonants);
                console.log('Current Earnings: $' + playerCurrent.earnedCurrent);

            } else {
                audioIncorrectGuess();
                exitGame(msgGameOver.repeatedConsonant);  
            }

        } else {

            audioIncorrectGuess();
            exitGame(msgGameOver.invalidConsonant);
        }

    }

}


function checkValidVowel(input) {
    let letter = input.toUpperCase();
    let letterCheck = isVowelOrConsonant(letter);
    let doesLetterExist = checkIfLetterExist(puzzleCurrent.vowels, letter);
    let isLetterUnique = checkIfLetterUnique(guessLettersCurrent.vowels, letter);

    // Check for consonants or special char
    if (letterCheck !== 'vowel'){
        audioIncorrectGuess();
        exitGame(msgGameOver.invalidLetter);

    } // Check if vowel, exists in puzzle & if repeated
    else {  
        console.log('you entered a vowel');

        if (doesLetterExist ===  true) {

            if (isLetterUnique === true) {

                // update puzzle board
                showCorrectLetters(input);

                let numLetters = letterCount(puzzleCurrent.splitText, letter);
                guessLettersCurrent.vowels.push(letter);

                // update player earnings, delay msg display
                playerCurrent.earnedCurrent -= vowelCost;

                if (numLetters === 1) {

                    setTimeout(function() {
                        showMsg('Current guess:  ' + letter + '. There is 1 ' + letter + '.<br>Deduct: $' + vowelCost + '.');
                       
                        if (checkNoMoreLetters()) {
                            winGame();

                        } else if (checkNoMoreVowels()) {
                            scoreDiv.innerHTML += ' There are no more vowels left.';
                        }

                        enableButtons();

                    }, typMsgDelay);

                } else {

                    setTimeout(function() {
                        showMsg('Current guess:  ' + letter + '. There are ' + numLetters + ' ' + letter + 's.<br>Deduct: $' + vowelCost + '.');
                       
                        if (checkNoMoreLetters()) {
                            winGame();

                        } else if (checkNoMoreVowels()) {
                            scoreDiv.innerHTML += ' There are no more vowels left.';

                        }


                        enableButtons();

                    }, typMsgDelay)

                }
                
                showProgress(playerCurrent.round, playerCurrent.earnedCurrent, playerCurrent.earnedTotal);

                // if (isTimerOn === true) {
                //     checkTime(timerBtn);
                // }

                console.log('Guessed vowels to-date: ' + guessLettersCurrent.vowels);
                console.log('Current Earnings: ' + playerCurrent.earnedCurrent);       

            } else {

                audioIncorrectGuess();
                exitGame(msgGameOver.repeatedVowel);  
            }

        }  
        else {
            audioIncorrectGuess();
            exitGame(msgGameOver.invalidVowel);
        }

    }

}


//--------- MAIN GAME FUNCTIONS ---------//
// 1. Start New Game
// 2. Initialize Player (single-player)
// 3. Initialize Puzzle
// 4. Reset player earnings upon bankrupt or gameover


function initGame() {
    introPg.style.display = 'inline';
    introFooter.append(btnInfo, btnNewGame);

}


// Refine function later
function startNewGame() {
    btnNewGame.remove(); 
    introPg.style.display = 'none';
    gamePg.style.display = 'inline';
    sectionMid.style.display = 'none';

    // ask buyer if want to turn on
    showMsg('Play game with timer?');
    scoreDiv.append(lineBreak, btnTimerOn, btnTimerOff);

    // initPlayer();


}

// check variables
function startNewRound() {

    let roundNum = playerCurrent.round + 1;

    btnNextRound.remove();
    btnExitGame.remove();


    // remove previous player info
    playerCurrent.round += 1;
    puzzleCurrent = puzzleReset;
    playerCurrent.earnedCurrent = 0;
    puzzleCurrent.vowels = [];
    puzzleCurrent.consonants = [];
    guessLettersCurrent.consonants = [];
    guessLettersCurrent.vowels = [];
    hiddenArr = [];

    // remove previous puzzle
    let puzzlePrev = document.querySelectorAll('.square-box');
    for (let i = 0; i < puzzlePrev.length; i++) {
        puzzlePrev[i].remove();
    }

    initPuzzle();
    introPg.style.display = 'none';
    gamePg.style.display = 'inline';
    enableButtons;
    wheelTurnOn();

    // if (isTimerOn === true) {
    //     checkTime(timerBtn);
    // }

    showMsg('Welcome!<br> Please spin the wheel to proceed.');

    showProgress(playerCurrent.round, 0, playerCurrent.earnedTotal);

}


function initPlayer(name) {

    sectionMid.style.display = 'inline-block';
    initPuzzle();
    enableButtons;
    wheelTurnOn();
    showMsg('Welcome!<br> Please spin the wheel to proceed.');
    showProgress(1, 0, 0);

}


function initPuzzle() {

    let randNum = Math.floor(Math.random() * puzzleArray.length);
    puzzleCurrent.text = puzzleArray[randNum];

    puzzleCurrent.splitText = puzzleCurrent.text.toUpperCase().split('');
    console.log('split text: ' + puzzleCurrent.splitText);
    let puzzleCharLen = puzzleCurrent.splitText.length;

    audioNewPuzzle();

    // // REVISED CODE TO PREVENT WORD WRAP
    // // generate squares
    // wordArr = puzzleCurrent.text.toUpperCase().split(' ');
    // // console.log('word array: ' + wordArr);
    // let wordCount = 0;

    // // split puzzle into words and assign div container
    // wordArr.forEach((word) => {
        
    //     let letterArr = word.split('');
    //     let letterArrLen = letterArr.length;
    //     // console.log('letter array: ' + letterArr);

    //     let wordSpan = document.createElement('span');
    //         wordSpan.setAttribute('class', 'word-span');

    //     puzzleDiv.append(wordSpan);
    //     wordCount += 1;
        
    // // within each div container, split word into letters
    //     for (let i = 0; i < letterArrLen; i++) {

    //         let letter = letterArr[i];
    //         // console.log('letter :' + letter + ', index no.: ' + i);
    //         let sqDiv = document.createElement('div');
    //         sqDiv.setAttribute('class', 'square-box');

    //         // Check if letter is vowel or consonant
    //         let letterCheck = isVowelOrConsonant(letter);
    //         let isVowelUnique = checkIfLetterUnique(puzzleCurrent.vowels, letter);
    //         let isConsonantUnique = checkIfLetterUnique(puzzleCurrent.consonants, letter);

    //         if (letterCheck === 'vowel' && isVowelUnique === true) {
    //             puzzleCurrent.vowels.push(letter);
    //         } else if (letterCheck === 'consonant' && isConsonantUnique === true) {
    //             puzzleCurrent.consonants.push(letter);
    //         }

    //         if (letter === '-' || letter === "'" || letter === '.' || letter === '&' ){
    //             sqDiv.classList.add('square-display');

    //         } else {
    //             letter = '_'; // ADD to vert align squares
    //             sqDiv.classList.add('square-text');
    //         }

    //         hiddenArr.push(letter);
    //         let letterText = document.createTextNode(letter);
    //         sqDiv.append(letterText);
    //         wordSpan.append(sqDiv);
    //     }

    //     // add space between words, except lastoftype
    //     if (wordCount < wordArr.length) {
    //         let space = "*";
    //         hiddenArr.push(space);

    //         let spaceSpan = document.createElement('span');
    //             spaceSpan.setAttribute('class', 'space');
    //             spaceSpan.classList.add('square-blank');
    //         // let sqDiv = document.createElement('div');
    //         //     sqDiv.setAttribute('class', 'square-blank');
    //         let spaceText = document.createTextNode(space);
    //             spaceSpan.append(spaceText);
    //             // spaceSpan.append(sqDiv);

    //         puzzleDiv.append(spaceSpan);
    //     }
    
    // })

    // // ORIGINAL CODE
    // // Generate squares for each letter
    for (let i = 0; i < puzzleCharLen; i++) {

        let element = puzzleCurrent.splitText[i];
        // console.log('element :' + element + ', index no.: ' + i);

        let sqDiv = document.createElement('div');
        sqDiv.setAttribute('class', 'square-box');

        // Check if letter is vowel or consonant
        let letterCheck = isVowelOrConsonant(element);
        let isVowelUnique = checkIfLetterUnique(puzzleCurrent.vowels, element);
        let isConsonantUnique = checkIfLetterUnique(puzzleCurrent.consonants, element);

        if (letterCheck === 'vowel' && isVowelUnique === true) {
            puzzleCurrent.vowels.push(element);

        } else if (letterCheck === 'consonant' && isConsonantUnique === true) {
            puzzleCurrent.consonants.push(element);

        }

        if (element === ' ') {
            element = '*'; // ADD to vert align squares
            sqDiv.classList.add('square-blank');            
            console.log('space index no.: ' + i);

            // // ERROR
            // if (i > 10 || i > 20 || i > 30 || i > 40 || i > 50 || i > 60) {
            //     // puzzleDiv.append(lineBreak);

            // }

        } else if (element === '-' || element === "'" || element === '.' || element === '&' ){
            sqDiv.classList.add('square-display');

        } else {
            element = '_'; // ADD to vert align squares
            sqDiv.classList.add('square-text');
        }

        hiddenArr.push(element);
        let letter = document.createTextNode(element);
        sqDiv.append(letter);
        puzzleDiv.append(sqDiv);

    }

    console.log(puzzleCurrent);
    console.log('hidden array: ' + hiddenArr);
    // puzzleBoard.append(puzzleDiv);
    console.log('Current Puzzle (vowels): ' + puzzleCurrent.vowels);
    console.log('Current Puzzle (consonants): ' + puzzleCurrent.consonants);

}


function resetBoard() {

    // btnSpinWheel.remove();
    btnBuyVowel.remove();
    btnSolvePuzzle.remove();
    btnExitGame.remove();
    btnInfo.remove();

    inputName.remove();
    inputConsonant.remove();
    inputVowel.remove();
    inputSolve.remove();

    progDiv.innerHTML = "";
    scoreDiv.innerHTML = "";

    // remove previous player info
    playerCurrent = playerReset;
    puzzleCurrent = puzzleReset;
    playerCurrent.earnedCurrent = 0;
    playerCurrent.round = 1;
    playerCurrent.earnedTotal = 0;
    playerCurrent.earnings = [];
    // guessLettersCurrent = guessLettersCurrentReset;
    puzzleCurrent.vowels = [];
    puzzleCurrent.consonants = [];
    guessLettersCurrent.consonants = [];
    guessLettersCurrent.vowels = [];
    hiddenArr = [];
    // console.log('Guessed letters current:' + guessLettersCurrent.consonants + guessLettersCurrent.vowels);

    // remove previous puzzle
    let puzzlePrev = document.querySelectorAll('.square-box');
    for (let i = 0; i < puzzlePrev.length; i++) {
        puzzlePrev[i].remove();
    }

}


function showMsg(input) {
    scoreDiv.innerHTML = input;

}

function showProgress(roundNum, currEarned, earnedTotal) {
    progDiv.innerHTML = 'Round: ' + roundNum + '\/3\nCurrent: $' + currEarned + '\nTotal: $' + earnedTotal;

}

function resetEarnings() {
    playerCurrent.earnedCurrent = 0;
    showProgress(playerCurrent.round, playerCurrent.earnedCurrent, playerCurrent.earnedTotal);

}


function showCorrectLetters(letter) {

    // update hidden array with guessed letters
    for (let i = 0; i < puzzleCurrent.splitText.length; i++) {
        if (letter === puzzleCurrent.splitText[i]) {
            hiddenArr[i] = letter;
            console.log('hidden array letter: ' + hiddenArr[i]);
        }
    };

    // span span elements with word span
    // push updated blank array into sqDiv

    // let spanElem = document.querySelectorAll('word');

    // console.log(spanElem);

        // if span class = word, to find children

            // let tempSqText = puzzleDiv.children[j].innerHTML;
            // let tempGuessArray = hiddenArr[j];
            // console.log('tempSqText: ' + tempSqText + 'tempGuessArray: ' + tempGuessArray);

    

    // ORIGINAL CODE
    // push updated blank array into sqDiv
    let puzzleLength = puzzleCurrent.splitText.length;

    for (let j = 0; j < puzzleLength; j++) {

        let tempSqText = puzzleDiv.children[j].innerHTML;
        let tempGuessArray = hiddenArr[j];

        // check for guessed letters only
        // * double-check on animation timing later
        if (tempSqText !== tempGuessArray) {

            // stagger light effect of each guessed letter
            setTimeout(function() {
                puzzleDiv.children[j].classList.add('square-light');
                puzzleDiv.children[j].innerHTML = hiddenArr[j];

                audioCorrectGuess();

            }, (dispLetterDelay * j));

        }

    }

}

// if puzzle solved correctly, show all letters at once
function showAllLetters() {

    // push puzzleCurrent into sqDiv
    let puzzleLength = puzzleCurrent.splitText.length;
    
    for (let i = 0; i < puzzleLength; i++) {

        let tempSqText = puzzleDiv.children[i].innerHTML;
        let puzzleText = puzzleCurrent.splitText[i];

        // * double-check on animation timing later
        if (tempSqText !== puzzleText && tempSqText !== '*' && tempSqText !== "'" && tempSqText !== '-' && tempSqText !== '.') {

            // stagger light effect of each guessed letter
                puzzleDiv.children[i].classList.add('square-display', 'square-light');
                puzzleDiv.children[i].innerHTML = puzzleCurrent.splitText[i];

        }

    }

    audioSolve();

}


function wheelTurnOn() {
    wheelActual.style.display = 'inline';
    wheelImg.style.display = 'none';

}

function wheelTurnOff() {
    wheelActual.style.display = 'none';
    wheelImg.style.display = 'inline';

}

function disableButtons() {
    btnBuyVowel.remove();
    btnSolvePuzzle.remove();
    btnExitGame.remove();
}

function enableButtons() {
    buttonsDiv.append(btnBuyVowel, btnSolvePuzzle, btnExitGame);

}


//--------- PLAYER FUNCTIONS ---------//
// 1. Spin Wheel
// 2. Guess Letter
// 3. Buy Vowel
// 4. Solve Puzzle
// 5. Exit Game


function spinWheel() {

    disableButtons();

    // set to spin value from wheel.js
    let spinValueCurrent = spinValueFrWheel;
    console.log('Spin Value Fr Wheel: ' + spinValueCurrent);

    let wheelText = document.createTextNode('Current Spin Fr Wheel: $' + spinValueCurrent);

    if (spinValueCurrent != 'BANKRUPT') {
        // delay msg display until spin over
        setTimeout(function() {
            showMsg('You spinned $' + spinValueCurrent + '!<br \>Guess a consonant.');
            guessLetter(spinValueCurrent);
        
        }, spinMsgDelay);

    } else {

        // if (isTimerOn === true) {
            clearInterval(countdownTimer);
        // }
        resetEarnings();
        btnBuyVowel.disabled = false;
        btnSolvePuzzle.disabled = false;
        btnExitGame.disabled = false;

        // delay msg display until spin over
        setTimeout(function(){

            audioBankrupt();
            exitGame(msgGameOver.spinBankrupt);

        }, spinMsgDelay);

    }


}

// ORIGINAL SPIN WHEEL RANDOM FUNCTION
// function spinWheel() {
//     let randNum = Math.floor(Math.random() * wheelValues.length);
//     let spinValueCurrent = wheelValues[randNum];
//     //OR SET TO SPIN VALUE FROM WHEEL:
//     // let spinValueCurrent = spinValueFrWheel;
//     let wheelText = document.createTextNode('Current Spin: $' + spinValueCurrent); 
//     // let wheelText = document.createTextNode('Current Spin Fr Wheel: $' + spinValueCurrent);      
//     wheelDiv.append(wheelText);
//     wheelBoard.append(wheelDiv);
//     if (spinValueCurrent != 'BANKRUPT') {
//         scoreDiv.innerHTML = 'You spinned $' + spinValueCurrent + '! Guess a letter (consonant).';
//         guessLetter(spinValueCurrent);
//     } else {
//         resetEarnings();
//         exitGame(msgGameOver.spinBankrupt);
//     }
// }

function guessLetter(spinValue) {

    inputDiv.append(inputConsonant);
    inputConsonant.focus();

    if (isTimerOn === true) {
        checkTime(timerSpinWheel + timerLetter);
    }

    inputConsonant.onkeydown = function(event) {

        if (event.keyCode === 13) { // 13 refers to 'ENTER' key

        // if (isTimerOn === true) {
            clearInterval(countdownTimer);
        // }
            timerDiv.innerHTML = "";

            tempInput = inputConsonant.value.toUpperCase();
            console.log('Temp Input Consonant: ' + tempInput);

            if (tempInput === '') {
                exitGame(msgGameOver.noInputLetter);

            }
            else {

                clearInterval(countdownTimer);
                inputConsonant.remove();
                checkValidConsonant(spinValue, tempInput);
                // tempInput === '';
                inputConsonant.value = '';

            }

        } 
    }

} // END of function guessLetter


function buyVowel() {

    disableButtons();

    // Check if earnings > 250
    if (playerCurrent.earnedCurrent >= vowelCost) {

        inputDiv.append(inputVowel);
        inputVowel.focus();

        if (isTimerOn === true) {
            checkTime(timerLetter);
        }

        inputVowel.onkeydown = function(event) {
    
            if (event.keyCode === 13) { // 13 refers to 'ENTER' key

                // if (isTimerOn === true) {
                    clearInterval(countdownTimer);
                // }
                timerDiv.innerHTML = "";

                tempInput = inputVowel.value.toUpperCase();
                console.log('Temp Input Vowel: ' + tempInput);
    
                if (tempInput === '') {

                    audioIncorrectGuess();
                    exitGame(msgGameOver.noInputLetter);
    
                }
                else {

                    clearInterval(countdownTimer);
                    inputVowel.remove();
                    checkValidVowel(tempInput);
                    inputVowel.value = '';
    
                }
    
            } 

        }
      
    } // if player has less than $250
    else {

        audioIncorrectGuess();
        exitGame(msgGameOver.noMoneyForVowel);

    }

} // END of function buyVowel


function solvePuzzle() {

    disableButtons();
    showMsg('Type your guess answer to solve the puzzle!');
    inputSolve.value = '';

    inputDiv.append(inputSolve);
    inputSolve.focus();

    if (isTimerOn === true) {
        checkTime(timerSolve);
    }

    inputSolve.onkeydown = function(event) {

        if (event.keyCode === 13) { // 13 refers to 'ENTER' key

            // if (isTimerOn === true) {
                clearInterval(countdownTimer);
            // }
            timerDiv.innerHTML = "";

            tempInput = inputSolve.value.toUpperCase();
            console.log('Temp Input Solve: ' + tempInput);

            if (tempInput === '') {

                audioIncorrectGuess();
                exitGame(msgGameOver.noInputGuess);
                inputSolve.remove();
                inputSolve.value = '';
            }

            else if (tempInput !== puzzleCurrent.text) {

                audioIncorrectGuess();
                exitGame(msgGameOver.invalidGuess);
                inputSolve.remove();
                inputSolve.value = '';
        
            } else {

               winGame();

            }

        } 
    }

}


function winGame() {

    inputSolve.remove();

    if (playerCurrent.earnedCurrent === 0) {
        playerCurrent.earnedCurrent = 1000; // min earning

    }

    playerCurrent.earnings.push(playerCurrent.earnedCurrent);
    playerCurrent.earnedTotal += playerCurrent.earnedCurrent;

    setTimeout(function() {
        
        // display letters on board
        showAllLetters();
        inputSolve.value = '';

        if (playerCurrent.round < 3) {
            showMsg('Congrats! You solved the puzzle!<br \>You\'ve earned $' + playerCurrent.earnedCurrent + ' for this round! Play next round?');
            buttonsDiv.append(btnNextRound, btnExitGame);

        } else {
            showMsg('Congrats! You solved the puzzle! You\'ve earned $' + playerCurrent.earnedCurrent + ' for this round and $' + playerCurrent.earnedTotal + ' in total! See you again!'); 

            buttonsDiv.append(btnNewGame);
        }

        showProgress(playerCurrent.round, playerCurrent.earnedCurrent, playerCurrent.earnedTotal);

    }, typMsgDelay);
    
}


function exitGame(msg) {

    // clear UI
    // btnSpinWheel.remove();
    // if (isTimerOn === true) {
        clearInterval(countdownTimer);
    // }
    btnNextRound.remove();
    btnBuyVowel.remove();
    btnSolvePuzzle.remove();
    btnExitGame.remove();
    // playerCurrent.earnedCurrent = 0;

    // resetBoard();
    buttonsDiv.append(btnInfo, btnNewGame);
    // buttonsDiv.append(btnNewGame);
    wheelTurnOff();
    timerDiv.innerHTML = ""; 

    if (msg === 'default') {

        showMsg('Bye, ' + playerCurrent.name + '! See you next time!');
        showMsg('Bye, see you next time!');

    } 
    else {

        showMsg(msg);
        resetEarnings();
    
    }

}


//--------- INITIALIZE GAME ---------//

initGame();



//--------- BUTTON EVENT LISTENERS ---------//

btnNewGame.addEventListener('click', (event) => {
    console.log('start new game btn clicked');
    resetBoard();
    startNewGame();
})

// NOTE: COMMENT OUT THIS PART IF USING ACTUAL WHEEL TO SPIN
// btnSpinWheel.addEventListener('click', (event) => {
//     console.log('spin wheel btn clicked');
//     // clearInterval(countdownTimer);
//     timerDiv.innerHTML = "";
//     // wheelDiv.innerHTML = "";
//     spinWheel();
    
// })

btnBuyVowel.addEventListener('click', (event) => {
    console.log('buy vowel btn clicked');
    // if (isTimerOn === true) {
        clearInterval(countdownTimer);
    // }
    timerDiv.innerHTML = "";
    buyVowel();
})

btnSolvePuzzle.addEventListener('click', (event) => {
    console.log('solve puzzle btn clicked');

    // if (isTimerOn === true) {
        clearInterval(countdownTimer);
    // }
    timerDiv.innerHTML = "";
    solvePuzzle();
})

btnNextRound.addEventListener('click', (event) => {
    console.log('next round btn clicked');
    // if (isTimerOn === true) {
        clearInterval(countdownTimer);
    // }
    timerDiv.innerHTML = "";
    startNewRound();
})

btnExitGame.addEventListener('click', (event) => {
    console.log('exit game btn clicked');

    // if (isTimerOn === true) {
        clearInterval(countdownTimer);
    // }
    timerDiv.innerHTML = "";
    // checkIfExitGame();
    exitGame('default');
})


btnInfo.addEventListener('click', (event) => {
    console.log('info btn clicked');

    modalCoverElem.style.display = 'block';
    modalPopUpElem.style.display = 'block';

})


// Open Modal
// modalTriggerElem.addEventListener('click', (event) => {
//     // console.log('modal open');
//     modalCoverElem.style.display = 'block';
//     modalPopUpElem.style.display = 'block';
// })

// Close Modal
modalCloseBtn.addEventListener('click', (event) => {
    // console.log('modal close');
    modalCoverElem.style.display = 'none';
    modalPopUpElem.style.display = 'none';
})


btnTimerOn.addEventListener('click', (event) => {
    console.log('timer on btn clicked');
    isTimerOn = true;
    btnTimerOn.remove();
    btnTimerOff.remove();

    initPlayer();
})

btnTimerOff.addEventListener('click', (event) => {
    console.log('timer off btn clicked');
    isTimerOn = false;
    btnTimerOn.remove();
    btnTimerOff.remove();

    initPlayer();
})