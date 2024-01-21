const previousOperationtext = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button');

class Calculator{
    constructor(previousOperationtext, currentOperationText){
        this.previousOperationtext = previousOperationtext;
        this.currentOperationText = currentOperationText;
        this.currentOperation = '';

    }
    //add digit to calculator screen
    addDigit(digit){
        // check if current operation already has a dot

        if(digit === '.' && this.currentOperationText.innerText.includes('.')){
            return;
        }
        
        this.currentOperation = digit;
        this.updateScreen();
    }

    // Process all calculator operations
    processOperation(operation){
        console.log(operation)
    }

    // Change value of the calculator screen
    updateScreen(){
        this.currentOperationText.innerText += this.currentOperation;
    }
}

const calc = new Calculator (previousOperationtext,currentOperationText);



buttons.forEach((btn)=>{
    btn.addEventListener('click',(e) =>{
        const value = e.target.innerText;

        if(+value >=0 || value === '.'){
            calc.addDigit(value);
        }else{
            calc.processOperation(value);
        }
    });
});