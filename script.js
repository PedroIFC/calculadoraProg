// seleção dos elementos//
const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

//logica de aplicação da calculadora//

class Calculator {
    //constructor é uma função que inicializa propriedades//
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    //adicionar digito na tela da calculadora
    addDigit(digit) {
        //checar se ja tem algum ponto
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }
    //processos de operação da calculadora
    processOperation(operation) {

        //checando se o currentValue esta vazio pra trocar operacao
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            if (this.previousOperationText.innerText !== "") {
                //mudanca de operacao
                this.changeOperation(operation)
            }
            return;
        }

        // recendo valores atuais e do previous
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    // mudanca de valores na tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null) {
        console.log(operationValue, operation, current, previous);
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //verificação se valor é 0, se for adicionar current value
            if (previous === 0) {
                operationValue = current;
            }

            // add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";

        }
    }

    //change math operation
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]
        if (!mathOperations.includes(operation)) {
            return;
        }
        this.previousOperationText.innerText = previousOperationText.innerText.slice(0, -1) + operation;
    }
    //apagar ultimo digito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    //apagar operação atual
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }
    //apagar tudo
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    // executar operação
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)


buttons.forEach((btn) => {
    // quando usamos eventos temos acesso ao "e" que significa logicamente evento, onde podemos extrair varias informações, por exemplo o valor do botao que o usuario clicou
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value)
        }
        else {
            calc.processOperation(value)

        }

    })
})



//código para lidar com eventos de teclado
window.addEventListener('keydown', (e) => {
    const keyValue = e.key;

    if (!isNaN(keyValue) || keyValue === '.') {
        // se a tecla pressionada for um número ou ponto decimal
        calc.addDigit(keyValue);
    } else if (['+', '-', '*', '/'].includes(keyValue)) {
        // se a tecla pressionada for uma operação
        calc.processOperation(keyValue);
    } else if (keyValue === 'Enter') {
        // se a tecla pressionada for Enter
        calc.processEqualOperator();
    } else if (keyValue === 'Backspace') {
        // se a tecla pressionada for Backspace
        calc.processDelOperator();
    }
});
