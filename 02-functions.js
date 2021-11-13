

function iAmFunction(parameter){
    //Do the thing
    console.warn( "I warned you! " + parameter);
}

let argument = 'is the value passed to the function'
iAmFunction(argument);

//Functions are objects with pre-configured properites. The implication of this is, it stores in the HEAP, they're reference types.


const startGameBtn = document.getElementById('start-game-btn');


// Typically JS would register and make this function/object in a global scope so script is aware of it, and we can use it within the js file.

 
/* 
    FUNCTION DECLARATION/ FUNCTION STATEMENT.
    Hoisted to top, can be declared anywhere in the file, global scoped
*/

start(); // -> would console.log() because the function declaration is hoisted and global scoped. 

function startGame(){
    console.log('Game is starting...');
}

startGameBtn.addEventListener('click', startGame);

/*
    FUNCTION EXPRESSION: If we store it as a variable we assign reference to the function. We are now using the function as an expression, the variable 'start' is stored in the global scope, the function is not.
    Hoisted to top, but not initialized/defined, can't be declared anywhere in the file.
*/ 

start(); // -> Uncaught ReferenceError: Cannot access before intialization because start is a function expression. 

const start = function secondStartGame(){
    console.log('Set Function As Variable');
}

/*
    ANONYMOUS FUNCTIONS: On-the-fly uses. One time use functions. () => { } 

    helps with readability of code, user won't have to track down a function when reading our code. 

    function() <-- Defines an anonymous function.

    can use these when adding eventListeners.
*/ 
const anonymousFunction = function() {
    console.log( ' I am an anonymous function');
}

// Eventlistener on the fly.

const aButton = document.getElementById('identifier'); 

aButton.addEventListener( 'click', function() {
    console.log('Show UncaughtReferenceError', undefinedVariable);
});

// will return uncaught reference error <anonymous> in debug. Add a name to functions if you want better debugging.

 
