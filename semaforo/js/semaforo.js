const buttons = document.getElementById('buttons');
const traffic = document.getElementById('img');
let colorIndex = 0;
let intervalId;


turnRed = () => {
    traffic.src = 'img/vermelho.png';
}

turnYellow = () => {
    traffic.src = 'img/amarelo.png';
}

turnGreen = () => {
    traffic.src = 'img/verde.png';
}

const nextIndex = () => {
    if (colorIndex < 2){
        colorIndex++;
    } else {
        colorIndex = 0;
    }
}

const stopAutomatic = () => {
    clearInterval(intervalId);
}


const changeColor = () => {
    
    const colors = ['red', 'yellow', 'green'];
    const color = colors[colorIndex];
    if (color == 'red'){
        turnRed();
    } else if (color == 'yellow'){
        turnYellow();
    } else if (color == 'green'){
        turnGreen();
    }
    
    nextIndex();
    
}

const trafficLight = (event) => {
    stopAutomatic();
    if (event.target.id == 'red'){
        turnRed();
    } else if (event.target.id == 'yellow'){
        turnYellow();
    } else if (event.target.id == 'green'){
        turnGreen();
    } else if (event.target.id == 'automatic'){
        intervalId = setInterval(changeColor, 1000);
    }
    
}



buttons.addEventListener('click', trafficLight);