var botao = document.querySelector('#search');
var input = document.querySelector('#input-busca');
const video = document.querySelector('#video-source');
const apiKey = '5617350ff586f587ba6a60fede7c5aee';
const clientID = 'f7480e41db6b46fdab90516f60f67396';
const clientSecret = '96add259cbf847bdafe224d58e44d24a';
const videos = [];
for (i = 1; i <= 12; i++) {
    videos.push(`video/video${i}.mp4`);
}

let musicas = [
    {
        titulo: 'Musica 1',
        nome_artista: 'Jaja',
        src: 'musics/All I Am - Dyalla.mp3',
        img: 'assets/hiphop.jpg'
    },
    {
        titulo: 'Musica 2',
        nome_artista: 'Jeje',
        src: 'musics/Palindrome - Alex Hamlin.mp3',
        img: 'assets/jazz.jpg'
    },
    {
        titulo: 'Musica 3',
        nome_artista: 'Jojo',
        src: 'musics/Panpsychic - Alex Hamlin.mp3',
        img: 'assets/eletronic.jpg'
    }
];

let indexMusica = 0;
let audio = document.querySelector('audio');
audio.addEventListener('timeupdate', atualizarBarra);
let tituloMusica = document.querySelector('.nome-musica');
let artistaMusica = document.querySelector('.artista');
let imgMusica = document.querySelector('.icone-musica');
let botaoPlay = document.querySelector('.botao-play');
let botaoPause = document.querySelector('.botao-pause');
let botaoAnterior = document.querySelector('.anterior');
let botaoProximo = document.querySelector('.proximo');
let tempoDecorrido = document.querySelector('.inicio');
let tempoTotal = document.querySelector('.fim');

// Função para converter segundos em minutos
function toMinute(num) {
    let campoMinuto = Math.floor(num / 60);
    let campoSegundo = num % 60;
    if (campoSegundo < 10) {
        campoSegundo = '0' + campoSegundo;
    }
    return campoMinuto + ':' + campoSegundo;
}

// Função para tocar a música
function tocarMusica() {
    audio.play();
    botaoPlay.style.display = 'none';
    botaoPause.style.display = 'inline';
}

// Função para pausar a música
function pausarMusica() {
    audio.pause();
    botaoPlay.style.display = 'inline';
    botaoPause.style.display = 'none';
}

// Função para atualizar a música no player
function atualizarMusica() {
    let musicaAtual = musicas[indexMusica];
    audio.src = musicaAtual.src;
    tituloMusica.textContent = musicaAtual.titulo;
    artistaMusica.textContent = musicaAtual.nome_artista;
    imgMusica.src = musicaAtual.img;
    tocarMusica();

    // Espera os metadados carregarem para atualizar a duração
    audio.addEventListener('loadedmetadata', () => {
        tempoTotal.textContent = toMinute(Math.floor(audio.duration));
    });
}

// Função para avançar a música
function avancarMusica() {
    indexMusica = (indexMusica + 1) % musicas.length;
    atualizarMusica();
}

// Função para atualizar a barra de progresso da música
function atualizarBarra() {
    let barra = document.querySelector('progress');
    let porcentagem = Math.floor((audio.currentTime / audio.duration) * 100) + '%';
    barra.style.width = porcentagem;
    tempoDecorrido.textContent = toMinute(Math.floor(audio.currentTime));
}


// Função para voltar a música
function voltarMusica() {
    indexMusica = (indexMusica - 1 + musicas.length) % musicas.length;
    atualizarMusica();
}

// Adicionando eventos aos botões
botaoPlay.addEventListener('click', tocarMusica);
botaoPause.addEventListener('click', pausarMusica);
botaoProximo.addEventListener('click', avancarMusica);
botaoAnterior.addEventListener('click', voltarMusica);

// Atualizar a primeira música ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarMusica();
    pausarMusica(); // Garante que o áudio comece pausado
});


// FUNÇÕES DO BOTÃO DE BUSCA

function botaoDeBusca() {
    const inputValue = input.value;
    movimentoInput(inputValue);
    
}

// Funções de abrir e fechar a aba de pesquisa
function fecharInput() {
    input.style.visibility = 'hidden';
    input.style.width = '40px';
    input.style.padding = '0.5rem 0.5rem 0.5rem 2.6rem';
    input.style.transition = 'all 0.5s ease-in-out 0s';
    input.style.value = '';
    mudarVideo();
}

function abrirInput() {
    input.style.visibility = 'visible';
    input.style.width = '300px';
    input.style.padding = '0.5rem 0.5rem 0.5rem 3.1rem';
    input.style.transition = 'all 0.5s ease-in-out 0s';
    input.style.value = '';
}

function mudarVideo() {

    const videoElement = document.querySelector('.video'); // Seleciona o elemento <video>
    const sourceElement = document.querySelector('#video-source'); // Seleciona o <source>

    if (sourceElement && videoElement) {
        // Escolhe um vídeo aleatório da lista
        const novoVideo = videos[Math.floor(Math.random() * videos.length)];

        sourceElement.src = novoVideo;

        videoElement.load();
        videoElement.play();
    }
}

function movimentoInput(inputValue) {
    const visibility = input.style.visibility;

    if (visibility === 'hidden') {
        abrirInput()
    }

    else {
        fecharInput();
    }

    if (inputValue){
        procurarCidade(inputValue);   
    }
}

// Função do Enter
input.addEventListener('keyup', function(event){
    if(event.keyCode === 13){
        const valorInput = input.value;
        movimentoInput(valorInput);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    fecharInput();
})

async function procurarCidade(city) {
    try {
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
        
        // Se a consulta foi bem sucedida
        if (dados.status === 200){
            const result = await dados.json();
            mostrarClimaNaTela(result);
        } else {
            throw new Error
        }

    }
    catch {
        alert('A pesquisa por cidade deu errado!');
    }


}


function mostrarClimaNaTela(result) {
    document.querySelector('.icone-tempo').src = `./assets/${result.weather[0].icon}.png`;
    document.querySelector('.nome-cidade').innerHTML = `${result.name}`;
    document.querySelector('.temperatura').innerHTML = `${result.main.temp.toFixed(0)}ºC`;
    document.querySelector('.max-temperatura').innerHTML = `máx: ${result.main.temp_max.toFixed(0)}ºC`;
    document.querySelector('.min-temperatura').innerHTML = `mín: ${result.main.temp_min.toFixed(0)}ºC`;
}
