let turnOn = document.querySelector('#turnOn');
let turnOff = document.querySelector('#turnOff');
let lamp = document.querySelector('#lamp');


function isLampBroken(){
    return lamp.src.indexOf ('quebrada') > -1;
}

function lampOn(){
    if (isLampBroken()){
        return;
    } else {
        lamp.src = 'img/ligada.jpg';
    }
}

function lampOff(){
    if (isLampBroken()){
        return;
    } else {
        lamp.src = 'img/desligada.jpg';
    }
}

function lampBroken(){
    lamp.src = 'img/quebrada.jpg';
}

turnOn.addEventListener('click', lampOn);
turnOff.addEventListener('click', lampOff);
lamp.addEventListener('mouseover', lampOn);
lamp.addEventListener('mouseleave', lampOff);
lamp.addEventListener('dblclick', lampBroken);