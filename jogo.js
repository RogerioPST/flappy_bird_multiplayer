console.log('> Flappy bird')

let frames = 0;

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

const sprites = new Image()

sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

function criaChao(){
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura:224,
        altura: 112,
        x:0,
        y:canvas.height - 112,
        atualiza(){
//para o chao se mover infinitamente            
            const movimentoDoChao = 1
            const repete_Em = chao.largura / 2
            const movimentacao = chao.x - movimentoDoChao
            chao.x = movimentacao % repete_Em

        },
        desenha(){ //mesma coisa q desenha: function(){
            contexto.drawImage(
                sprites, 
                chao.spriteX,chao.spriteY, //sx, sy - posicao do sprite x, sprite y no arquivo png
                chao.largura, chao.altura, //sWidth, sHeight- tamanho do recorte na sprite,
                chao.x,chao.y, //dx, dy,- dentro do canvas, onde quero desenhar
                chao.largura, chao.altura, //dWidth, dHeight - dentro do canvas, qual o tamanho
            )
    //como a img n eh tao grande, para continuar, duplicamos a partir do ponto final da largura da anterior
            contexto.drawImage(
                sprites, 
                chao.spriteX,chao.spriteY, //sx, sy - posicao do sprite x, sprite y no arquivo png
                chao.largura, chao.altura, //sWidth, sHeight- tamanho do recorte na sprite,
                chao.x + chao.largura,chao.y, //dx, dy,- dentro do canvas, onde quero desenhar
                chao.largura, chao.altura, //dWidth, dHeight - dentro do canvas, qual o tamanho
            )
        }   
    } 
    return chao
}

function fazColisao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura
    const chaoY = chao.y

    if (flappyBirdY >= chaoY){
        return true
    } else{
        return false
    }
}
function criaFlappyBird(){

    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura:33,
        altura: 24,
        x:10,
        y:50,
        velocidade: 0,
        gravidade: 0.25,
        pulo:4.6,
        movimentos:[
            {spriteX:0, spriteY:0, }, //asa p cima
            {spriteX:0, spriteY:26, }, //asa no meio
            {spriteX:0, spriteY:52, }, //asa p baixo
        ],
        frameAtual: 0,
        atualiza_O_FrameAtual(){
            const intervaloDeFrames = 10
            const passou_O_Intervalo = frames % intervaloDeFrames === 0

            if(passou_O_Intervalo){            
                const baseDoIncremento =1
                const incremento = baseDoIncremento + flappyBird.frameAtual
                const baseRepeticao = flappyBird.movimentos.length
                flappyBird.frameAtual = incremento % baseRepeticao
            }

        },
        desenha(){ //mesma coisa q desenha: function(){
            flappyBird.atualiza_O_FrameAtual()
            const {spriteX, spriteY} = flappyBird.movimentos[this.frameAtual]
            contexto.drawImage(
                sprites, 
                spriteX,spriteY, //sx, sy - posicao do sprite x, sprite y no arquivo png
                flappyBird.largura, flappyBird.altura, //sWidth, sHeight- tamanho do recorte na sprite,
                flappyBird.x,flappyBird.y, //dx, dy,- dentro do canvas, onde quero desenhar
                flappyBird.largura, flappyBird.altura, //dWidth, dHeight - dentro do canvas, qual o tamanho
            )
        },
        atualiza(){
            if(fazColisao(flappyBird, globais.chao)){
                som_HIT.play()

                setTimeout(() =>{
                    mudaParaTela(Telas.INICIO)
                }, 500)

                return        
            }
            console.log('[atualiza] velocidade antes', flappyBird.velocidade)
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            console.log('[atualiza] velocidade depois', flappyBird.velocidade)
            flappyBird.y = flappyBird.y + flappyBird.velocidade
        },
        pula(){
            console.log('[pulo] velocidade antes', flappyBird.velocidade)
            flappyBird.velocidade = - flappyBird.pulo
            console.log('[pulo] velocidade depois', flappyBird.velocidade)

        }
    }
    return flappyBird
}

//background
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura:275,
    altura: 204,
    x:0,
    y:canvas.height - 204,
    desenha(){ //mesma coisa q desenha: function(){   
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0,canvas.width, canvas.height)
        
        contexto.drawImage(
            sprites, 
            planoDeFundo.spriteX,planoDeFundo.spriteY, //sx, sy - posicao do sprite x, sprite y no arquivo png
            planoDeFundo.largura, planoDeFundo.altura, //sWidth, sHeight- tamanho do recorte na sprite,
            planoDeFundo.x,planoDeFundo.y, //dx, dy,- dentro do canvas, onde quero desenhar
            planoDeFundo.largura, planoDeFundo.altura, //dWidth, dHeight - dentro do canvas, qual o tamanho
        )
//como a img n eh tao grande, para continuar, duplicamos a partir do ponto final da largura da anterior
        contexto.drawImage(
            sprites, 
            planoDeFundo.spriteX,planoDeFundo.spriteY, //sx, sy - posicao do sprite x, sprite y no arquivo png
            planoDeFundo.largura, planoDeFundo.altura, //sWidth, sHeight- tamanho do recorte na sprite,
            planoDeFundo.x + planoDeFundo.largura,planoDeFundo.y, //dx, dy,- dentro do canvas, onde quero desenhar
            planoDeFundo.largura, planoDeFundo.altura, //dWidth, dHeight - dentro do canvas, qual o tamanho
        )
    }
}

//tela de inicio
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura:174,
    altura: 152,
    x:(canvas.width / 2) - 174 /2,
    y: 50,
    desenha(){ //mesma coisa q desenha: function(){           
        contexto.drawImage(
            sprites, 
            mensagemGetReady.spriteX,mensagemGetReady.spriteY, //sx, sy - posicao do sprite x, sprite y no arquivo png
            mensagemGetReady.largura, mensagemGetReady.altura, //sWidth, sHeight- tamanho do recorte na sprite,
            mensagemGetReady.x,mensagemGetReady.y, //dx, dy,- dentro do canvas, onde quero desenhar
            mensagemGetReady.largura, mensagemGetReady.altura, //dWidth, dHeight - dentro do canvas, qual o tamanho
        )
    }
}

//telas
const globais ={}    
let telaAtiva = {}
function mudaParaTela(novaTela){
    telaAtiva = novaTela

    if (telaAtiva.inicializa){
        telaAtiva.inicializa()
    }

}
const Telas ={
    INICIO:{
        inicializa(){
            globais.flappyBird = criaFlappyBird()
            globais.chao = criaChao()
        },
        desenha(){
            planoDeFundo.desenha()
            globais.chao.desenha()
            globais.flappyBird.desenha()        
            mensagemGetReady.desenha()            
        },
        atualiza(){
            globais.chao.atualiza()

        },
        click(){
            mudaParaTela(Telas.JOGO)
        }
    }
}

//mesma coisa q Telas = {
    ///JOGO:{

    //}
//}
Telas.JOGO ={
    inicializa(){        
        globais.chao = criaChao()
    },
    desenha(){
        planoDeFundo.desenha()
        globais.chao.desenha()
        globais.flappyBird.desenha()        
    },
    atualiza(){
        globais.flappyBird.atualiza()   
        globais.chao.atualiza() 
    },
    click(){
        globais.flappyBird.pula()
    }
}

function loop(){               
    telaAtiva.desenha()
    telaAtiva.atualiza()

    frames = frames +1
    requestAnimationFrame(loop)

}

//para saber qdo houve um click na janela
window.addEventListener('click', function(){
    //se a tela ativa tiver funcao de click
    if(telaAtiva.click){
        telaAtiva.click()
    }
})

mudaParaTela(Telas.INICIO)
loop()
