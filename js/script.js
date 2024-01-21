const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button');

class Calculator{
    constructor(previousOperationtext, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = '';

    }
    //adicionar dígito à tela da calculadora
    addDigit(digit){
        // verifique se a operação atual já possui um ponto

        if(digit === '.' && this.currentOperationText.innerText.includes('.')){
            return;
        }
        
        this.currentOperation = digit;
        this.updateScreen();
    }

    // Processe todas as operações da calculadora
    processOperation(operation){
        // Verifique se a tela está vazia
        if (this.currentOperationText.innerText ==="" && operation !== 'C'){
                // Alterar operação
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }
        
        // Obtenha o valor atual e anterior
        let operationvalue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationvalue = previous + current;
                this.updateScreen(operationvalue,operation,current,previous);
                break;
            case "-":
                operationvalue = previous - current;
                this.updateScreen(operationvalue,operation,current,previous);
                break;
            case "/":
                operationvalue = previous / current;
                this.updateScreen(operationvalue,operation,current,previous);
                break;
            case "*":
                operationvalue = previous * current;
                this.updateScreen(operationvalue,operation,current,previous);
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.processClearCurretOperation();
                break;

            case "C":
                this.processClearOperation();
                break;
            case "=":
            this.processEqualOperation();
            break;
            default:
                return;
        }
    }

    // Alterar valor da tela da calculadora
    updateScreen(
        operationvalue = null, 
        operation = null,
        current = null,
        previous = null
    ) {

        if(operationvalue === null){
            this.currentOperationText.innerText +=this.currentOperation;
        }else{
             // Verifique se o valor é zero, se for apenas adicione o valor atual
            if (previous === 0) {
                 operationvalue = current
             }

                // Adicione o valor atual ao anterior
                this.previousOperationText.innerText = `${operationvalue} ${operation}`
                this.currentOperationText.innerText = ""
            }
    }

    // Alterar operação matemática
    changeOperation(operation){
        const mathOperation = ['*','/','+','-']

        if (!mathOperation.includes(operation)){ // abortar lógica caso não receba a operação que não está esperando
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;// método slice retira o ultimo caracter caso seja um espaço
    }
      // Deletar último dígito
        processDelOperation(){
            this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
        }
        // Limpar tela de operação
        processClearCurretOperation(){
            this.currentOperationText.innerText ='';
        }

        // Limpar toda a operação
        processClearOperation(){
            this.currentOperationText.innerText ='';
            this.previousOperationText.innerText ='';
        }

        // Função igual
        processEqualOperation(){
            const operation = previousOperationText.innerText.split(' ')[1];
            this.processOperation(operation);
        }


}

const calc = new Calculator (previousOperationText,currentOperationText);



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