import wordBank from "./word-Bank.js";
import prompt from "readline-sync";

/****************************************************
/* Call a function that starts the game */
/* Initialize variables, generate a random word, display instructions, object of game, how to stop */
const startGame = () => {
  
  hanged=false;
  solved=false;
  numGuesses=0;
  mysteryWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  console.log("Mystery word is "+ mysteryWord);

  /* -> Break the word down to letters and store in an array*/
  mysteryWordArray = mysteryWord.split("");
  console.log("Mystery word array is " +mysteryWordArray);

  /* -> Create an array of underscores to hold the guesses*/
  lettersFound = Array.from('_' .repeat(mysteryWord.length));
  console.log("Letters Found Array = " +lettersFound);

  displayWelcome();
  displayGallows(0);
};

const displayWelcome = () => {
  let msg = "\n\nWELCOME TO HANGMAN!  \n\nThe object of this game is to guess the letters of a mystery word.";
  msg += "\nIf you guess wrong, your man will have an appendage added. ";
  msg += "\nWhen the full person is on the gallows, the game is over.  \nYou only get 6 wrong answers before your man is hanged, and then the game is over.";
  msg += "\nPress CTRL + C to stop the game."
  console.log(msg);
};

/**** This function recieves a number represented the number of wrong gueeses and constructs a gallows accordingly  ****/
const displayGallows = (num) => {
 console.log("________\n|\t!\n|" + HANGMAN_ARRAY[num]); 
};


/* * -> Initialize variables  ( hangMan T/F, maxGuesses=6, numGuesses, mysteryWord array?, lettersFound array?, playAgain) */
let hanged=false;                                      // true or false
let solved;
const MAX_GUESSES = 6;
const HANGMAN_ARRAY = [
  '\n| \n| \n| \n|________\n',                         //0  Empty Gallows
  '\tO\n| \n| \n| \n|________\n',                      //1  Head
  '\tO\n|  \t|\n|  \n| \n|________\n',                 //2  Head & Body
  '\tO\n|      /|\n|\n| \n|________\n',                //3  Head, Body & Right Arm
  '\tO\n|      /|\\\n|  \n| \n|________\n',            //4  Head, Body, and Both Arms
  '\tO\n|      /|\\\n|      /\n|________\n',           //5  Head, Body, and Both Arms & Right Leg
  '\tO\n|      /|\\\n|      / \\\n|________\n'         //6  Head, Body, and Both Arms & Legs
]

let numGuesses;         // number of letters the user has guessed
let mysteryWord;            // randomly selected word from the word bank
let mysteryWordArray = [];  // the mystery word broken down into letters.
let lettersFound = [];      // letters that have been found, initially each element will be _
let xLetters = [];          // an array of incorrect letters to display to user
let allLetters = [];        // an array of all the letters guessed
let letterIndex;


/* -> Randomly select a word from the word bank */
//mysteryWord = wordBank[Math.floor(Math.random() * wordBank.length)];
//console.log(mysteryWord);

/* -> Break the word down to letters and store in an array*/
//mysteryWordArray = mysteryWord.split("");
//console.log(mysteryWordArray);

/* -> Create an array of underscores to hold the guesses*/
//lettersFound= Array.from('_' .repeat(mysteryWord.length));
//console.log(lettersFound); 

//displayGallows(0);


startGame(0);

// While the man is not hung and the word is not solved and guesses != MaxGuesses
while( !hanged && !solved && numGuesses!=MAX_GUESSES){
  /* Prompt the user to select a letter & store the guess in a variable */ 
  let letterGuessed = prompt.question("Please guess a letter:  ");
  letterGuessed = letterGuessed.toLowerCase();
  console.log("Letter Guessed is: " + letterGuessed);
  numGuesses++;
  console.log("Number of Guesses is: " + numGuesses);

  
  promptif( lettersFound.includes(letterGuessed)){
    console.log("You've already guessed that letter.  Try again!");
    numGuesses--;       
  } else {
    if(mysteryWordArray.includes(letterGuessed)){

      for(let i=0; i < mysteryWordArray.length; i++){
        letterIndex = mysteryWordArray.indexOf(letterGuessed, i);
        console.log( "Letter Index is:" +letterIndex);
        lettersFound[letterIndex] = letterGuessed;
        console.log("LettersFound array contains: " + lettersFound)  
      }    
    }

    if (numGuesses > MAX_GUESSES) {
      hanged=true;
      console.log("Hanged!");
    } else {
      if(lettersFound === mysteryWordArray) {
        solved = true;
        console.log("Solved is: " + solved);
      }
    }
  }

}
 /* -> Prompt the user to guess a letter
 * -> numGuesses ++;
 * -> Evaluate the letterGuessed, 
 *    -> compare the letterGuessed with the letters in the mysteryWordArray, return true or false
 *        -> for loop: is letterGuessed = mysteryWord[i]? *        
 *        -> return the place number;
 *        -> return true or false
 * -> if true (the letterGuessed is in the word) then call the function to update the lettersFound array (pass letter and place number)
 *     -> replace the _ with the letterGuessed in the lettersFound array
 *     -> display the gallows (?)
 *     -> display the updated "word"   _ _ M _ R 
 *     -> is the man complete? (array will not have _ )       
 * -> if false (the guess is not in the word) then call the function to update the letterBank array (pass the letter)   
 *     -> push the letter onto the letter bank array
 *     -> display the letter in the letter bank
 *     -> add an appendage to the hangman Array
 *     -> display the updated hangman
 *     -> 
 * -> ask for another letter ?
 * END OF WHILE LOOP
 * 
 * If word is solved
 *  -> display You won! (make the man jump?)
 *  -> Would you like to play again
 * else if the man isHung
 *  -> display You lost! (show a dead man )    (xx) (skull?)
 *  -> would you like to play again?
 * 
 * If playAgain = Y, call function to restart game
 * else display better luck next time.
 * 
 * 
 * 
 *        ______      
 *        |     !
 *        |     O
 *        |    /|\            
 *        |    / \
 *      __|_______
 *   __|
 *  |
 //* 
 * 
 * ****************************************************/