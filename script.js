class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        //slice last value in the current operand
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        //check if decimal already exists or not
        if (number === '.' && this.currentOperand.includes('.')) {
            return //stop function
        }
        //convert to string to append not added
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        //if current operand is empty exit function
        if (this.currentOperand === '') {
            return
        }
        //if previous operand is not empty compute numbers first
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand) //convert to a float
        const current = parseFloat(this.currentOperand) //covert to a float

        //if no prev or current exit function
        if (isNaN(prev) || isNaN(current)) {
            return
        }

        //compute according to operation
        switch (this.operation) {
            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break

            case '*':
                computation = prev * current
                break

            case '÷':
                computation = prev / current
                break

            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()

        //split number (before decimal point)
        const integerDigits = parseFloat(stringNumber.split('.')[0])

        //split number (after decimal point)
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay

        //if input is nothing or just .
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        //format number
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }) //no decimal places after string
        }

        //if number includes decimal digits
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        //if no decimal digits
        else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } 
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

//query all elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//instantiate object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

//number clicked
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//operation clicked
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

//compute when equals button is clicked
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

//AC button clicked
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

//del button clicked
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

