function displayTitle(title){
    title == null ? console.log(' \n ') : console.log( ` \n///// ${title} ///// \n`);
}

function log(string){
    string == null ? console.log('\n') : console.log(` ${string}  \n`);
}



//Functions are objects with pre-configured properites. The implication of this is, it stores in the HEAP, they're reference types.

function iAmAFunction(parameter){
    //Do the thing
    log(`Hi, iAmAFunction, ${parameter}`)
};

let argument = "arguments are what are passed to the parameter of a function";
iAmAFunction(argument);

/*
assigning a function to a button.
    
    const startGameBtn = document.getElementById('start-game-btn');
    startGameBtn.addEventListener('click', iAmAFunction);

*/ 


/* ////////////////////////// FUNCTION DECLARATION/ FUNCTION STATEMENT.//////////////////////////

    Typically JS would register and make this function/object in a global scope so the script is aware of it, and we can use it within the js file.
    Hoisted to top, can be declared anywhere in the file, globally scoped, so you can actually decalre variables below the function, without getting a ReferenceError.

*/

startGame(); // -> would console.log() because the function declaration is hoisted and globally scoped. 

function startGame(){
    log('Game is starting...');
}

//startGameBtn.addEventListener('click', startGame);

/*////////////////////////// FUNCTION EXPRESSION: //////////////////////////

    If we store functions as a variable we assign reference to that function. We are now using the function as an expression, the variable 'start' is stored in the global scope, the function is not.
    Hoisted to top, but not initialized/defined, can't be declared anywhere in the file.

*/ 


const start = function secondStartGame(){
    log('Set Function As Variable');
}
start(); // -> Uncaught ReferenceError: Cannot access before intialization because start is a function expression. 



/*////////////////////////// ANONYMOUS FUNCTIONS: //////////////////////////
    On-the-fly uses. One time use functions. () => { } 

    helps with readability of code, user won't have to track down a function when reading code. 

    function() <-- Defines an anonymous function.

    typically use these when adding eventListeners, or Angular observables.... subjects...etc.
*/ 
const anonymousFunction = function() {
    console.log( ' I am an anonymous function');
}

/*// Eventlistener on the fly.

const aButton = document.getElementById('identifier'); 

aButton.addEventListener( 'click', function() {
    console.log('Show UncaughtReferenceError', undefinedVariable);
});

// will return uncaught reference error <anonymous> in debug. Add a name to functions if you want better debugging.
*/

/*//////////////////////////FUNCTIONS AS VALUE://////////////////////////
    Since a function is an object, you can treat it as such, and pass it into other functions. Cool!
*/
displayTitle('FUNCTIONS AS VALUES');

let equations = {
 add:  (x,y) => { return x+y},
 subtract: function sub(x,y){ return x - y},
 multiply: function (x,y){ return x * y},
 divide: function (x,y){ return x/y },
 power: function(x,y){ return x**y}
}

function equate( operation, firstOperand, secondOperand){
    if( typeof equations[operation] === 'function'){
        result = equations[operation](firstOperand, secondOperand);
        console.log(result);
        return result
    }else throw 'Not a valid operation';
}


equate('add', 31, 2);
// equate('cake', 1,2);
 
/*////////////////////////// DEFINING FUNCTION PROPERTIES //////////////////////////
    *IMPORTANT: When a function needs a 'static' variable whose value persis across invocations it is convenient to " USE A PROPERTY OF THE FUNCTION ITSELF"

    This is particularily useful when you want to keep a reference to a value that persists throughout your application, and changes each time that function is called.
    Example: A counter for each time the function is called. How would you not define a globally scoped variable to store this data? 

    You can do this by storing the data within a PROPERTY OF THE FUNCTION OBJECT.
*/

displayTitle('FUNCTIONS AS PROPERTIES');


uniqueInteger.counter = 0;

function uniqueInteger(){
    
    console.log(uniqueInteger.counter++);  //access a property of the function.
}

uniqueInteger();
uniqueInteger();


functionProperty.wordBank = ['InitialValues....'];
functionProperty.wordBankIndex=0;

//Example storing an array of data each time a function is called. I.E backend, session management of users. Might be costly.... possibly better use would be page navigation of user. 
function functionProperty(char){
    functionProperty.wordBank[functionProperty.wordBankIndex] = char;
    functionProperty.wordBankIndex++;
    console.log(functionProperty.wordBank);
}

functionProperty('example');
functionProperty('accessing');
functionProperty('property of a function');


////////////////////////// CACHE RESULTS WITHIN A FUNCTION //////////////////////////
displayTitle( 'CACHE RESULTS WITHIN A FUNCTION');

function factorial(n){
    if( Number.isInteger(n) && n > 0 ) {
        if( !( n in factorial) ) {  //if not cached results do the thing
            factorial[n] = n * factorial(n-1);  // computer and caches result, recursively calls factorial. 
        }
        console.log(factorial[n]);
        return factorial[n];  // returns cached result.
    } else {
        return NaN;
    }
}

factorial[1] = 1; //Initializes the cache.
factorial(5); // note how all 5 factorials are printed the first time, but not the second time executed. 
log();
factorial(4); // data already cached, so it calls on it. 
log();
factorial(10); // should skip 1-120
log();
factorial[11]='cheese';
factorial(11);


////////////////////////// FUNCTIONS AS NAMESPACES //////////////////////////
displayTitle('Functions as Namespaces | 8.5');
log('Comeback to this, DNU');

////////////////////////// CLOSURES //////////////////////////
/*
    Lexical scoping: Functions are executed using the variable scope that was in effect when defined, not the variable scope that is in effect when invoked. 

    To implement lexical scoping, INTERNAL STATE OF A JS FUNCTION OBJECT MUST INCLUDE the code of the fucntion and a REFERENCE TO THE SCOPE in which the function definition appears. 

    Closure: is a combination of a function object and a scope (a set of variable bindings) in which the function's variables are resolved.

    Technically, all JS functions are closures, most functions are invoked in the same scope they were defined, so it doesn't matter.  

    Closure's importance can be seen when functions are invoked from a different scope than where they were defined. 
*/
displayTitle('CLOSURES')
log("Closure: is a combination of a function object and a scope (a set of variable bindings) in which the function's variables are resolved. ");

let scope = "global";

function checkscope() {
    let scope = "local";
    function f() {
        return scope;
    }
    return f;
}
log(scope);
let scopeResult = checkscope();
log(scopeResult); //logs the function itself
log(scopeResult()); //executes the nested function

// Let's look at the uniqueInteger example again. The shortfall of the code under FUNCTIONS AS A PROPERTY is buggy code/malicious code can reset these variables.

// You can use immediately invoked function expressions to define a namespace and a closure that uses that namespace to keep its state private.

let anotherUniqueInteger = ( function(){ //1st parenthesis is defining and invoking a function so it is the retun value of the function that is being assigned to 'anotherUniqueInteger'
    //outer function
    let counter = 0; //private state of function below.
    return function() { return counter++; }; //This is the 'nested function object' within the 'outer function object'. This is what actually gets assigned to 'anotherUniqueInteger'.
    // The nested function has access to the 'counter' variable which is in the 'outer function'. Once the outer function returns. no other code can see the counter variable.
} () ); 

// You can define more than one nested function within the same outer function, and share the same scope.

displayTitle('Multi Nested Functions');

function multiNestedFunction() {
    let n = 0;
    return {
        count: function() { return n++ },
        reset: function() { n = 0 },
    }
}

let c = multiNestedFunction(), d = multiNestedFunction();

log('X: ' + c.count());
log('Y: ' + d.count());
log('X: '+ c.count());
log('Y: '+ d.count());
log('X: '+ c.count());
log('Y: '+ d.count());
c.reset();
log('Reset X');
log('X: '+ c.count());
log('Y: '+ d.count());
log('X: '+ c.count());
log('Y: '+ d.count());
log('X: '+ c.count());
log('Y: '+ d.count());
