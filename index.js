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
 console.log("Leaving the function");
};

/**** This function compares two arrays, element by element.    ****/
const compareArrays = (a, b) => { return a.length === b.length && a.every((element, index) => element === b[index]);    
};


/* * -> Initialize variables  ( hangMan T/F, maxGuesses=6, numGuesses, mysteryWord array?, lettersFound array?, playAgain) */
let hanged=false;                                      // true or false
let solved;
const WRONG_GUESSES = 6;
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


startGame(0);

// While the man is not hung and the word is not solved and guesses != MaxGuesses
while( !hanged && !solved && xLetters.length !== WRONG_GUESSES ){
  console.log("value of xletters is: " +xLetters);
  console.log("xletters.length="+xLetters.length);

  /* Prompt the user to select a letter & store the guess in a variable */ 
  let letterGuessed = prompt.question("Please guess a letter:  ");
  letterGuessed = letterGuessed.toLowerCase();
  console.log("Letter Guessed is: " + letterGuessed);
  numGuesses++;
  console.log("Number of Guesses is: " + numGuesses);

  
  if( allLetters.includes(letterGuessed)) {                               // Check to see if the letter has been guessed.
    console.log("You've already guessed that letter.  Try again!");
    numGuesses--;       
  } else {
    allLetters.push(letterGuessed);
    
    if( mysteryWordArray.includes(letterGuessed) ){                       // If the letter is correct, get the index and append the lettersFound array

      for(let i=0; i <= mysteryWordArray.length; i++){                     // Loop thru the array in case the letter appears more than once
        letterIndex = mysteryWordArray.indexOf(letterGuessed, i);
        console.log( "Letter Index is:" +letterIndex);
        
        if(letterIndex !== -1){                                            // If the letter is found, add it to the Letters found array
          lettersFound[letterIndex] = letterGuessed;
          console.log("LettersFound array contains: " + lettersFound);
        }
      }

    } else {  // Letter is not in our mystery word
      xLetters.push(letterGuessed);                                 // Add the letter to the incorrect word array
      console.log("Incorrect Letters: " + xLetters);
      console.log(displayGallows(xLetters.length));
    }

    // Check to see if the game has been solved or the man has been hanged
    if (xLetters.length >= WRONG_GUESSES) {
      hanged = true;
      console.log("Hanged!");
    } else {
      console.log("Letters found array: " +lettersFound);
      console.log("MysteryWord array: " +mysteryWordArray);
      console.log("Are they equal?" +compareArrays( mysteryWordArray, lettersFound ));

      if( compareArrays( mysteryWordArray, lettersFound )) {
        solved = true;
        console.log("Solved is: " + solved);
      }
    }
  }

}
 