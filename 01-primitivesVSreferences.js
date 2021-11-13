///// PRIMITIVES VS. REFERENCE VALUES /////

/* Primitives: 
    - Are strings, boolean, numbers, null, undefined or Symbol.
    - They are typically store on the stack. When you copy a primtive variable, *you are copying the value*
*/

/* Reference Values:
    - All other objects (more expesnive to create 
    - They are stored within the Heap typically. The variable stores a pointer address to location in memory
    - Copying a variable *copies the pointer/reference*
*/


let person =  { age = 30 };

let anotherPerson = person; // creates a reference object 'anotherPerson'.

anotherPerson.age = 32; 

//this changes person.age as well, because they are references values. 

//If you do not want to change the main reference object, you need to use SPREAD OPERATORS ' ... ' 

let yetAnotherPerson =  {...person };  //doing this creates a new address to the object, it does not create a reference address.

// IMPORTANT, when you have a constant, the address never changes, the value can change (like .push() ). This is a no no in angular. You can change the value of an array, but change detection won't occur.
// Example:

const hobbies = [ 'Sports!'];

hobbies.push('Chess');

/* 
    You can change the property data of an object AND IT WILL NOT CHANGE THE REFERENCE ADDRESS of the object. 
    You are changing a part of the object, but not the entire objet, so the address does not change.
    This is a crucial concept that can lead to bugs/confusion.
*/

/*
        STACK: Short lived memory, garbage collection routine

        HEAP: Long lived memory.  How is this memory managed? Do not need to actively manage memory.
*/