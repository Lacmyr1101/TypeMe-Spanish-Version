//Moverse entre Menus

const titleCont = document.querySelector('.title-container')
const btnCont = document.querySelector('.botones')
const btnOP = document.getElementById('btn-op')
const btnIns = document.getElementById('btn-ins')
const opPanel = document.querySelector('.option-panel')
const infoPanel = document.querySelector('.info-panel')

btnOP.addEventListener('click', () => {
    btnOP.classList.toggle('actived')
    if (document.querySelector('.actived')) {
        btnCont.style.left = '1100px'
        if (window.innerWidth <= 1024) btnCont.style.left = '850px'
        titleCont.style.left = '2000px'
        btnOP.innerHTML = "<span><img class='backrow' src='Menu-img/Flecha-der.png' alt='atras'></span>"
        opPanel.style.left = '200px'

    } else {
        titleCont.style.left = '0'
        btnCont.style.left = '20%'
        btnOP.innerHTML = '<span><img src="Menu-img/gear-config.png" alt="opciones"></span>'
        opPanel.style.left = '-1600px'
    }
})

btnIns.addEventListener('click', () => {
    btnIns.classList.toggle('actived')
    if (document.querySelector('.actived')) {
        btnCont.style.left = 'calc(-1100px + 40%)'
        if (window.innerWidth <= 1024) btnCont.style.left = 'calc(-850px + 40%)'
        titleCont.style.left = '-2000px'
        btnIns.innerHTML = "<span><img class='backrow' src='Menu-img/Flecha-izq.png' alt='atras'></span>"
        infoPanel.style.left = '-200px'
    } else {
        titleCont.style.left = '0'
        btnCont.style.left = '20%'
        btnIns.innerHTML = '<span><img class="backrow" src="Menu-img/info.png" alt="info"></span>'
        infoPanel.style.left = '1600px'
    }
})

// Seleccionar Dificultad
document.addEventListener('DOMContentLoaded', () => {
    const difficult = document.querySelectorAll('input[name="difficult"]')
    const imgKeyboard = document.getElementById('imgKeyboard')
    difficult.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                switch (this.value) {
                    case "easy":
                        imgKeyboard.src = 'Menu-img/Teclado-difficult/Facil.png'
                        keys = [..."ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"]
                        break

                    case "normal":
                        imgKeyboard.src = 'Menu-img/Teclado-difficult/Normal.png'
                        keys = [..."ABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890"]
                        break

                    case "hard":
                        imgKeyboard.src = 'Menu-img/Teclado-difficult/Dificil.png'
                        keys = [..."ABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890|'¿´+{}<,.-"]
                        break

                    case "impo":
                        imgKeyboard.src = 'Menu-img/Teclado-difficult/Coming Soon.png'
                        keys = [..."ABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890|'¿´+{}<,.-"]
                        break
                }
            }
        })
    })
})

// Entrar al juego
const bloqueo = document.querySelector('.bloqueo')
const btnPlay = document.getElementById('btn-play')
const body = document.querySelector('BODY')
const menuInicio = document.querySelector('.menuInicio')
const game = document.querySelector('.game')
const play = () => {
    body.style.animation = 'none';
    body.offsetHeight;
    bloqueo.style.display = 'block'
    body.style.animation = 'play 3s ease 2 alternate'

    setTimeout(() => {
        menuInicio.style.display = 'none'
        game.style.display = 'flex'
        // bloqueo.style.display = 'none'
    }, 3000)
    setTimeout(() => {
        getReady()
    }, 5000)
}

// Teclado
var keys = [..."ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"];

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
    return keys[getRandomNumber(0, keys.length - 1)]
}


var permiso = true
const targetRandomKey = () => {
    const key = document.getElementById(getRandomKey());
    if (permiso) {
        key.classList.add('selected')
    } else return

}

//Puntaje
const score = document.getElementById('score')
var puntos = 0

document.addEventListener('keyup', event => {
    let keyPressed = event.key.toUpperCase();
    if (event.key == 'Dead') keyPressed = "´";
    const keyElement = document.getElementById(keyPressed);
    const highlightedKey = document.querySelector(".selected");
    keyElement.classList.add('hit');
    keyElement.addEventListener('animationend', () => {
        keyElement.classList.remove("hit");
    });
    if (keyPressed === highlightedKey.innerHTML) {
        highlightedKey.classList.remove('selected');
        segundo = 3
        puntos++
        score.innerHTML = `Puntaje: ${puntos}`
        temp.innerHTML = segundo
        targetRandomKey();
    } else {
        segundo = 0
        highlightedKey.classList.remove('selected');
        lostAnim()
    }


})

//Animacion de fallar
const lostAnim = () => {
    document.getElementById('lost').style.display = 'block'
    document.getElementById('lost').style.animation = 'perdiste 1s ease-out'
}

// Temporizador
const temp = document.getElementById('temp')
var segundo = 3
const temporizadorJuego = () => {
    const tempo = setInterval(function () {
        segundo--
        temp.innerHTML = segundo

        if (segundo <= 0) {
            clearInterval(tempo)
            lostAnim()
            permiso = false
            bloqueo.style.display = 'none'
            if (document.querySelector(".selected")) {
                document.querySelector(".selected").classList.remove('selected')
            }
            setTimeout(function () {
                document.getElementById('lost').style.display = 'none'
                document.querySelector('.game').style.display = 'none'
                document.getElementById('lostMenu').style.display = 'flex'
                document.getElementById('puntos').innerHTML = puntos
            }, 500)
        }
    }, 1000)
}


const readyBar = document.getElementById('ready')
const readyNum = document.getElementById('readyNum')
var readySeg = 4
const getReady = () => {
    const ready = setInterval(function () {
        readySeg--
        readyNum.innerHTML = readySeg
        if (readySeg == 3) {
            readyBar.style.display = 'flex'
        } else if (readySeg == 0) {
            readyNum.innerHTML = 'YA!!'
            clearInterval(ready)
            setTimeout(() => {
                readyBar.style.display = 'none'
                targetRandomKey()
                temporizadorJuego()
            }, 1000)
        }
    }, 1000)
}



//Botones
const reiniciar = () => {
    segundo = 3
    puntos = 0
    readySeg = 4
    permiso = true
    document.querySelector('.game').style.display = 'flex'
    document.getElementById('lostMenu').style.display = 'none'
    bloqueo.style.display = 'block'
    temp.innerHTML = segundo
    score.innerHTML = `Puntaje: ${puntos}`

    getReady()
}

const volverMenu = () => {
    segundo = 3
    puntos = 0
    readySeg = 4
    permiso = true
    body.style.animation = 'none';
    body.offsetHeight;
    bloqueo.style.display = 'block'
    body.style.animation = 'play 3s ease 2 alternate'
    setTimeout(() => {
        document.querySelector('.menuInicio').style.display = 'flex'
        document.getElementById('lostMenu').style.display = 'none'
        temp.innerHTML = segundo
        score.innerHTML = `Puntaje: ${puntos}`
    }, 3000)
    setTimeout(() => {
        bloqueo.style.display = 'none'
    }, 5000)
}