const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.currentOperationText = currentOperationText
        this.previousOperationText = previousOperationText
        this.currentOperation = ""
    }
    // ADICIONA O NUMERO PARA A TELA DA CALCULADORA
    addNum(num){
        // CHECA SE A POERAÇÃO ATUAL JA TEM UM PONTO
        if(num === "." && this.currentOperationText.innerText.includes(".")){
            return
        }
        this.currentOperation = num
        this.updateTela()
    }

    // PROCESSO DE TODAS AS OPERAÇÕES DA CALCULADORA
    processOperation(operation){
        // VE SE O VALOR ATUAL ESTAVAZIO
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            // MUDA A OPERAÇÃO
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation)
            }
            return
        }

        // PEGA VALORES ATUAIS E ANTERIORES
        let operationValue
        let previous = +this.previousOperationText.innerText.split(" ")[0]
        let current = +this.currentOperationText.innerText

        switch(operation){
            case"+":
                operationValue = previous + current
                this.updateTela(operationValue, operation, current, previous)
                break
            case"-":
                operationValue = previous - current
                this.updateTela(operationValue, operation, current, previous)
                break
            case"/":
                operationValue = previous / current
                this.updateTela(operationValue, operation, current, previous)
                break
            case"*":
                operationValue = previous * current
                this.updateTela(operationValue, operation, current, previous)
                break
            case"DEL":
                this.processDelOperator()
                break
            case"CE":
                this.processClearCurrentOperation()
                break
            case"C":
                this.processClearOperation()
                break
            case"=":
                this.processEqualOperator()
                break
            default:
                return
        }
    }

    // MUDA O VALOR DA TELA DA CALCULADORA
    updateTela(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
        ){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation
        }else{
            // VE SE O VALOR É ZERO, SE FOR ADICIONA O VALOR ATUAL
            if(previous === 0){
                operationValue = current
            }
            // ADICIONA O VALOR ATUAL AO VALOR ANTERIOR
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }
    // MUDA A OPERAÇÃO MATEMATICA
    changeOperation(operation){
        const mathOperations = ["/", "*", "-", "+"]
        if(!mathOperations.includes(operation)){
            return
        }
        this.previousOperationText.innerText = 
            this.previousOperationText.innerText.slice(0, -1) + operation
    }

    // APAGA O ULTIMO DIGITO
    processDelOperator(){
        this.currentOperationText.innerText = 
            this.currentOperationText.innerText.slice(0, -1)
    }
    // LIMPA A OPERAÇÃO ATUAL
    processClearCurrentOperation(){
        this.currentOperationText.innerText = ""
    }
    // LIMPA TODAS AS OPERAÇÕES
    processClearOperation(){
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }
    // REALIZA UMA OPERAÇÃO
    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        const value = e.target.innerText
        
        if(+value >=0 || value === "."){
            calc.addNum(value)
        }else{
            calc.processOperation(value)
        }
    })
})