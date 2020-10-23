// const { parse } = require("query-string");

const displayElement1 = document.querySelector ('.display-1');
const displayElement2 = document.querySelector ('.display-2');
const tempresult = document.querySelector ('.temp-result');
const numberElement = document.querySelectorAll ('.number');
const operationElement = document.querySelectorAll ('.operation');
const equalElement = document.querySelector ('.equal');
const clearElement = document.querySelector ('.all-clear');
const lastClearElement = document.querySelector ('.last-clear');

let displaynumOne = '';
let displaynumTwo = '';
let result = null;
let lastOperation = '';
let theDot = false;

// i will first conver it to an original array before having to use it and iterate through it.
// other examples or approach are below and still gives the same output

// [].slice.call(numberElement).forEach( number => {
//   number.addEventListener('click', (e)=>{
//     if(e.target.innerText === '.' && !theDot){
//       theDot = true;
//     } else if (e.target.innerText === '.' && theDot){
//       return;
//     }
//     displaynumTwo += e.target.innerText;
//     displayElement2.innerText = displaynumTwo;
//     // console.log();
//   })
// })

// Array.from(numberElement).forEach(number => {
//     number.addEventListener('click', (e) => {
//         if (e.target.innerText === '.' && !theDot) {
//             theDot = true;
//         }
//         else if (e.target.innerText === '.' && !theDot) {
//             return;
//         }

//         displaynumTwo += e.target.innerText;
//         displayElement2.innerText = displaynumTwo;
//     })
// })

// iterating through my query selector and listening to the click event in order to return the dot is the user clicks on it

numberElement.forEach (number => {
  number.addEventListener ('click', e => {
    // doing logical statement saying that if there is a dot or once the user clicks on the dot let it return the dot.
    if (e.target.innerText === '.' && !theDot) {
      theDot = true;
    } else if (e.target.innerText === '.' && theDot) {
      return;
    }

    // when the user press the number it will go ahead and display that current number above

    displaynumTwo += e.target.innerText;
    displayElement2.innerText = displaynumTwo;
  });
});

//  now lets iterate through our operation, once any of the operations are being clicked it will be applied to numbers and be displayed on the space above so the user can see the operation they entered

operationElement.forEach (operation => {
  operation.addEventListener ('click', e => {
    //  if there's a number then we display the operation sign
    if (!displaynumTwo) return;
    theDot = false;

    const nameofOperation = e.target.innerText;

    //  logic here says that if user press any operation the display that operation that they entered, and we do have those operations by calling our math operation function that we made below
    if (displaynumOne && displaynumTwo && lastOperation) {
      mathOperation ();
    } else {
      result = parseFloat (displaynumTwo);
    }

    clearValue (nameofOperation);
    lastOperation = nameofOperation;

    console.log (result);
  });
});

//  this function will clear the current display , which is the first display the user enters in this case displaynumTwo and then move it to the other display which is display number One.

function clearValue (name = '') {
  displaynumOne += displaynumTwo + ' ' + name + ' ';
  // this line of code below will sort of update the screen
  displayElement1.innerText = displaynumOne;
  //  now lets clear the display number two by setting it to empty string
  displayElement2.innerText = '';
  displaynumTwo = '';
  // now showing our temp result
  tempresult.innerText = result;
}

// function to apply all our math operations

function mathOperation () {
  if (lastOperation === 'x') {
    result = parseFloat (result) * parseFloat (displaynumTwo);
  } else if (lastOperation === '+') {
    result = parseFloat (result) + parseFloat (displaynumTwo);
  } else if (lastOperation === '-') {
    result = parseFloat (result) - parseFloat (displaynumTwo);
  } else if (lastOperation === '/') {
    result = parseFloat (result) / parseFloat (displaynumTwo);
  } else if (lastOperation === '%') {
    result = parseFloat (result) % parseFloat (displaynumTwo);
  }
}

//  equal event listner

equalElement.addEventListener ('click', e => {
  //  saying that if they click on equal sign let it just display it there , rather than adding another equal sign
  if (!displaynumTwo || !displaynumOne) return;
  theDot = false;
  mathOperation ();
  clearValue ();
  displayElement2.innerText = result;
  tempresult.innerText = '';
  displaynumTwo = result;
  displaynumOne = '';
});

//  clearing all event listener
// technicallys setting all asigned variables to empty strings once the clear button is being clicked on

clearElement.addEventListener ('click', e => {
  displaynumOne = '';
  displaynumTwo = '';
  displayElement1.innerText = '';
  displayElement2.innerText = '';
  result = '';
  tempresult.innerText = '';
});

// last elemnt clear event listener

lastClearElement.addEventListener ('click', e => {
  displayElement2.innerText = '';
  displaynumTwo = '';
});

//  now adding event listener that will enable user to also use their keyboards to type in numbers if they want to

window.addEventListener ('keydown', e => {
  if (
    e.key === '0' ||
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.'
  ) {
    theClickButtonElement (e.key);
  } else if (e.key === '+' || e.key === '-' || e.key === '%' || e.key === '/') {
    theClickButtonOperationElement (e.key);
  } else if (e.key === '*') {
    theClickButtonOperationElement ('x');
  } else if (e.key === 'Enter' || e.key === '=') {
    clickEqual ();
  }
});

// the click button function will permit user to actually input the number sign from their keyboard, this funtion takes one args which is the key and then iterates through our operation elemnt and display the operation that will be entered by the user
function theClickButtonElement (key) {
  numberElement.forEach (button => {
    if (button.innerText === key) {
      button.click ();
    }
  });
}

// the click button function will permit user to actually input the operation sign from their keyboard, this funtion takes one args which is the key and then iterates through our operation elemnt and display the operation that will be entered by the user
function theClickButtonOperationElement (key) {
  operationElement.forEach (operation => {
    if (operation.innerText === key) {
      operation.click ();
    }
  });
}

function clickEqual () {
  equalElement.click ();
}
