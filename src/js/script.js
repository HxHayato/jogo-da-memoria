const containerInfo = document.querySelector('.container-informacoes')
const botaoStart = document.querySelector('.botao-start')

let carta = document.querySelectorAll('.carta')
let carta1, carta2

//CONTADORES
let contMoves = 0
let contFlip = 1
let score = 0

carta.forEach(element => {
    element.addEventListener('click', (e) => {
        virarCarta(element)
    })
})

//FUNÇÕES E MUDANÇAS AO APERTAR START
botaoStart.addEventListener('click', (e) => {
    iniciarTempo()
    abrirFecharImpedeJogo(1)
    embaralharCartas()
})

//IMPEDE QUE O JOGADOR INICIE O JOGO SEM APERTAR O STAR
let impedeJogo = document.querySelector('.impede-jogo')

function abrirFecharImpedeJogo(n) {
    //Vai verificar se é a primeira vez ou a segunda
    if (n == 1){
        impedeJogo.classList.toggle('ativo')
    } else {
        const res = impedeJogo.querySelector('.resultado')
        let pInicial = res.querySelector('.pRes')
        let h1 = document.createElement('h1')
        let pEstat = document.createElement('p')

        res.removeChild(pInicial)

        h1.classList.add('parabens')
        h1.innerHTML = 'Parabéns!'
        res.appendChild(h1)

        pEstat.classList.add('estatistica')
        res.appendChild(pEstat)

        if (tempoMin > 0) {
            pEstat.innerHTML = `Você levou ${tempoMin}m${tempoSeg}s e realizou ${contMoves} movimentos. Que tal jogar novamente?`
        } else {
            pEstat.innerHTML = `Você levou ${tempoSeg}s e realizou ${contMoves} movimentos. Que tal jogar novamente?`
        }

        botaoStart.innerHTML = 'Jogar novamente'

        impedeJogo.classList.toggle('ativo')
    }
}

//PARTE REFERENTE AO TEMPO
const tempo = document.querySelector('.tempo')
let intervalo = ''
let tempoMin = 00
let tempoSeg = 00

function iniciarTempo () {
    intervalo = setInterval(atualizarTempo, 1000)
}

function atualizarTempo () {
    if (tempoSeg === 60) {
        tempoSeg = 0
        tempoMin++
    }
    
    tempoSeg++

    if(tempoSeg < 10){
        tempo.innerHTML = `0${tempoMin}:0${tempoSeg}`
    } else {
        tempo.innerHTML = `${tempoMin}:${tempoSeg}`
    }
}

//INCREMENTA O NÚMERO DE MOVIMENTOS
const mov = document.querySelector('.movimento')

function incrementarMoves () {
    contMoves++
    if (contMoves < 10) {
        mov.innerHTML = `0${contMoves}`
    } else {
        mov.innerHTML = contMoves
    }
}

function embaralharCartas () {
    let indiceAtual = carta.length - 1
    let pote, indiceRandom

    while (indiceAtual >= 0) {
        indiceRandom = Math.floor(Math.random() * indiceAtual)

        //Troca o conteúdo
        pote = carta[indiceAtual].innerHTML
        carta[indiceAtual].innerHTML = carta[indiceRandom].innerHTML
        carta[indiceRandom].innerHTML = pote

        //Troca o data-card
        pote = carta[indiceAtual].dataset.card
        carta[indiceAtual].dataset.card = carta[indiceRandom].dataset.card
        carta[indiceRandom].dataset.card = pote

        indiceAtual--
    }
}

function virarCarta (element) {
    let temFlip = element.classList.contains('flip')
    
    if(!temFlip && contFlip == 1 && carta1 == null) {
        element.classList.toggle('flip')
        carta1 = element
        contFlip++
    } else if (!temFlip && contFlip == 2 && carta2 == null){
        element.classList.toggle('flip')
        carta2 = element
        contFlip--
        incrementarMoves()
        setTimeout(verificarPares, 1000)
    }
}

function verificarPares () {
    let carta1dado = carta1.dataset.card
    let carta2dado = carta2.dataset.card

    if (carta1dado == carta2dado) {
        if(score == 7) {
            //mostrar o modal final
            clearInterval(intervalo)
            abrirFecharImpedeJogo(0)
        } else {
            score++
        }
    } else {
        carta1.classList.remove('flip')
        carta2.classList.remove('flip')
    }

    carta1 = null
    carta2 = null
}