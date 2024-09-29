const input = document.getElementById('input-number');
const currentBase = document.getElementById('options');
const output = document.getElementById('output-section');
const buttonSection = document.getElementById('button-section');

//Determine the current base
let thisbase;
function determineCurrentBase(base){
    switch(base){
        case 'decimal':
            thisbase = 10;
            break;
        case 'binary':
            thisbase = 2;
            break;
        case 'octal':
            thisbase = 8;
            break;
        case 'hexadecimal':
            thisbase = 16;
            break;
            
        default:
            output.textcontext = "invalid base";
            return;
    }
}

//function to handle validation and conversion
function convertNumber(base,num,targetBase){
    const isValidInput = validateInput(num,base);
    if(!isValidInput){
        return;
    }
    const parsedNum =parseInt(num, base);
    let convertedvalue;

    switch(targetBase){
        case 'decimal':
            convertedvalue = convertToDecimal(parsedNum);
            break;
            
        case 'binary':
            convertedvalue = convertToBinary(parsedNum);
            break;
            
        case 'octal':
            convertedvalue = convertToOctal(parsedNum);
            break;
            
        case 'hexadecimal':
            convertedvalue = convertToHexadecimal(parsedNum);
            break;
            
        default:
            console.error('unsupported target base: ${targetBase}');
            return;

    }
    output.textContent =  convertedvalue;
}

//function to validate input based on current base

function validateInput(num, base){
  //check for empty input
  if(num.trim() === ''){
    output.textContent = "Input cannot be empty";
    return false;
  }
  
  //check for invalid characters based on current base
  const validchars = base === 10 ? '0123456789' : (base === 8 ? '1234567' : (base === 16 ? '0123456789ABCDEF' : '01'));
  for (let char of num){
    if(!validchars.includes(char.toUpperCase())){
      output.textContent = `Invalid number of base`;
      return false;
    }
  }
  return true;//input is valid

}

//function to convert to decimal(from any base)

function convertToDecimal(num, thisbase){
  return parseInt(num, thisbase);
}


//function to convert to binary(from decimal)  

function convertToBinary(num){
  return num.toString(2);
}

//function to convert to octal(from decimal)

function convertToOctal(num){
  return num.toString(8);
}

//function to convert to hexadecimal(from decimal)

function convertToHexadecimal(num){
  return num.toString(16).toUpperCase();
}

//Event listeners for button click

buttonSection.addEventListener('click', (event) => {
    const clickedButton = event.target;
    if (clickedButton.classList.contains('input-btn')){
    const buttonId = clickedButton.id;
    const inputValue = input.value;
    
    //determine the target base based on the button ID
    let targetBase;
    switch(buttonId){
        case 'decimal':
            targetBase = 'decimal';
            break;
        case 'binary':
            targetBase = 'binary';
            break;
        case 'octal':
            targetBase = 'octal';
            break;
        case 'hexadecimal':
            targetBase = 'hexadecimal';
            break;
            
        default:
            console.error('unsupported button : ${buttonId}');
            return;
    }
    
    //convert the input number to the target base
    determineCurrentBase(currentBase.value);
    convertNumber(thisbase, inputValue,  targetBase);
     }
    });