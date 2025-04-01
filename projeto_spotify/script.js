let musicas = [
    {
        title: 'Musica 1',
        name_artist: 'Jeje',
        src: 'musics/Palindrome - Alex Hamlin.mp3',
        img: 'imgs/marcela-laskoski-YrtFlrLo2DQ-unsplash.jpg'
    },

    {
        title: 'Musica 2',
        name_artist: 'Jaja',
        src: 'musics/Panpsychic - Alex Hamlin.mp3',
        img: 'imgs/israel-palacio-Y20JJ_ddy9M-unsplash.jpg'
    },

    {
        title: 'Musica 3',
        name_artist: 'Jojo',
        src: 'musics/All I Am - Dyalla.mp3',
        img: 'imgs/hiphop.jpg'
    }
]

let musica = document.querySelector('audio');
let tempoDecorrido = document.querySelector('.inicio'); 
let tempoTotal = document.querySelector('.fim');
tempoTotal.textContent = toMinute(Math.floor(musica.duration));
let img = document.querySelector('img');
let nome_musica = document.querySelector('.description h2');
let nome_artista = document.querySelector('.description i');
let index_musica = 0;
renderizarMusica(index_musica);

let musica_atual = {
    title: musica.src,
    name_artist: nome_artista.textContent,
    src: nome_musica.textContent,
    img: img.src
}

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);
let prox = document.querySelector('.proximo').addEventListener('click', () => {
    index_musica++;
    renderizarMusica(index_musica);
});
document.querySelector('.anterior').addEventListener('click', () => {
    index_musica--;
    if (index_musica < 0) {
        index_musica = 2;
    }
    renderizarMusica(index_musica);
})


function tocarMusica () {
    musica.play();
    document.querySelector('.botao-play').style.display = 'none';
    document.querySelector('.botao-pause').style.display = 'block';
}


function pausarMusica () {
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}


function atualizarBarra() {
    let barra = document.querySelector('progress');
    let porcentagem = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    barra.style.width = porcentagem;
    tempoDecorrido.textContent = toMinute(Math.floor(musica.currentTime));
}


function renderizarMusica (index) {
    musica.setAttribute('src', musicas[index].src);
    // Evento que só irá ocorrer quando a música tiver carregado
    musica.addEventListener('loadeddata', () => {
        nome_musica.textContent = musicas[index].title;
        nome_artista.textContent = musicas[index].name_artist;
        img.src = musicas[index].img;
        tempoTotal.textContent = toMinute(Math.floor(musica.duration));
    })   
}

function toMinute (num) {
    let campoMinuto = Math.floor(num / 60);
    let campoSegundo = num%60;
    if (campoSegundo < 10) {
        campoSegundo = '0' + campoSegundo;
    }

    return campoMinuto + ':' + campoSegundo;
}


