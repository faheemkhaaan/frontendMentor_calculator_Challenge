class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operations = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number === '.'&& this.currentOperand.includes('.'))return;
        this.currentOperand = this.currentOperand.toString()+number.toString();
    }
    chooseOperations(operations){
        if(this.currentOperand == '')return;
        if(this.previousOperand != ''){
            this.compute();
        }
        this.operations = operations;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute(){
    let computation
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(current) || isNaN(prev))return;

    switch(this.operations){
        case '+':
            computation  = prev + current;
            break;
        case '-':
            computation  = prev - current;
            break;
        case '÷':
            computation  = prev / current;
            break;
        case '✗':
            computation  = prev * current;
            break;
        default: 
            return
    }
    this.currentOperand = computation;
    this.operations = undefined;
    this.previousOperand = '';
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString("en",{maximumFractionDigits: 0})
        }

        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay;
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber( this.currentOperand);
        if(this.operations != undefined){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operations}`
        }else{
            this.previousOperandTextElement.innerText  = ''
        }
    }
}

const numberButtons= document.querySelectorAll("[data-number]")
const operationsButtons = document.querySelectorAll("[data-operations]")
const equalButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]")
const deleteButton = document.querySelector("[data-delete]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener("click",()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

operationsButtons.forEach(button =>{
    button.addEventListener("click",()=>{
        calculator.chooseOperations(button.innerText);
        calculator.updateDisplay()
    })
})

equalButton.addEventListener("click",button =>{
    calculator.compute();
    calculator.updateDisplay();
});
allClearButton.addEventListener("click",button =>{
    calculator.clear();
    calculator.updateDisplay();
});
deleteButton.addEventListener("click",button =>{
    calculator.delete();
    calculator.updateDisplay();
});


const themeChanger = document.querySelector(".theme");
const buttonChanger = document.createElement("div");
const calculatorBackground = document.querySelector(".buttons");
const outputBackground = document.querySelector(".output")
const theme = document.querySelector(".theme");
buttonChanger.className = 'themeButton'
themeChanger.appendChild(buttonChanger);
let movedX = 0;
themeChanger.addEventListener("click",()=>{
    movedX = (17 + movedX) % 51;
    if(movedX == 17){
        document.body.style.backgroundColor = 'hsl(0, 0%, 90%)'
        calculatorBackground.style.backgroundColor = 'hsl(0, 5%, 81%)'
        outputBackground.style.backgroundColor = 'hsl(0, 0%, 93%)'
        theme.style.color = "black"
    }
    buttonChanger.style.transform = `translate(${movedX}px,19px)`
});