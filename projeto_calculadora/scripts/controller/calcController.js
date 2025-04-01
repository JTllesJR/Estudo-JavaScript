class CalcController {

    constructor(){
        
        this._locale = "pt-BR"; 
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this._operation = [];
        this.initialize();
        this.initButtonsEvents();
    }

    // Método para mostrar o horário no display a cada segundo
    initialize(){

        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

        
    }


    // Método que mostra o horário no display
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }


    
    initButtonsEvents(){
        
        // Seleciona todos os botões da calculadora
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");


        // Percorre todos os botões
        buttons.forEach(btn =>{

            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = btn.className.baseVal.replace("btn-", ""); // Esse trecho limpa o nome do botão
                

            })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{
                btn.style.cursor = "pointer";
            })
        })

    }

    
    addEventListenerAll(element, events, fn){

        events.split(" ").forEach(event =>{

            element.addEventListener(event, fn, false);
        })
    }


    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1];
    }

    addOperation(value){
        if (isNaN(this.getLastOperation())){ // Se for um sinal
            
        }
        // Se a última entrada for um número
        let newValue = this.getLastOperation().toString() + value.toString();

        this._operation.push(newValue);
    }

    setError(){
        this.displayCalc = "ERROR";
    }


    execBtn(value){

        switch(value) {

            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':

                break;

            case 'subtracao':

                break;

            case 'divisao':

                break;

            case 'multiplicacao':

                break;

            case 'porcento':

                break;

            case 'igual':

                break;

            case 'ponto':

                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;


            default:
                this.setError();
        }
    }




    // Getters and Setters

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(valor){
        this._displayCalcEl.innerHTML = valor;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
}