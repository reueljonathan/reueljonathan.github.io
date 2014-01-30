/*
	Criado por Reuel Jonathan
	MicSummer 2014 - MICETEPAM

	Workshop: jogos em HTML5 com gamvas 2D
*/

// ********************************* ActorStates ou cérebros ****************************
snakeBrain = gamvas.ActorState.extend({
	lastHorizontal: true, //Variáveis pra armazenar a última direção do jogador
	lastVertical: false,

	update: function(t){
		//Se o tempo de espera para andar for maior que o tempo mínimo, faz o snake andar
		if(this.actor.elapsedTime > this.actor.timeToWalk){ 
			this.actor.move(
				this.actor.dirX * 20,
				this.actor.dirY * 20); //Move o jogador 20 pixels na direção certa

			for (var i = this.actor.tail.length-1; i > 0; i--) {
				this.actor.tail[i].x = this.actor.tail[i-1].x;
				this.actor.tail[i].y = this.actor.tail[i-1].y;
			};


			this.actor.tail[0].x = this.actor.position.x;
			this.actor.tail[0].y = this.actor.position.y;

			//Verificando a posição em relação aos limites da tela
			if(this.actor.position.x > 800){
				this.actor.position.x = -20;
			}else if(this.actor.position.x < 0){
				this.actor.position.x = 800;
			}else if(this.actor.position.y > 600){
				this.actor.position.y = -20;
			}else if(this.actor.position.y < 0){
				this.actor.position.y = 600;
			}

			this.actor.elapsedTime = 0; //zera o contador para começar de novo
		} else{ //senão, aumenta o tempo
			this.actor.elapsedTime++; //Também pode ser escrito this.actor.elapsedTime += 1;
		}

		//posSnake.x = this.actor.x; //Atribuindo a posição do jogador à nossa variável global
		//posSnake.y = this.actor.y;
	}, 


	onKeyUp: function(key){
		if(key == gamvas.key.UP){ //Para cima
			this.actor.dirX = 0;
			this.actor.dirY = -1;
		}

		if(key == gamvas.key.DOWN){ //Para baixo
			this.actor.dirX = 0;
			this.actor.dirY = 1;

		}

		if(key == gamvas.key.LEFT){ //Para esquerda
			this.actor.dirX = -1;
			this.actor.dirY = 0;
		}

		if(key == gamvas.key.RIGHT){ //Para direita
			this.actor.dirX = 1;
			this.actor.dirY = 0;
		}
	}
});

// ********************************* Criando Atores ****************************
snakeActor = gamvas.Actor.extend({
	st: null,
	squareImg: null,

	create: function(name,x,y){
		this._super(name,x,y);  //Função para criar o objeto snake

		this.st = gamvas.state.getCurrentState(); //Pegando o estado atual do jogo

		this.squareImg = this.st.resource.getImage("img/snake.png"); //Imagem do quadrado
		//Definindo a imagem do nosso personagem snake
		this.setFile(this.st.resource.getImage("img/snake.png"), 20, 20, 1, 1); 

		this.addState(new snakeBrain("snakeBrain")); //Adicionando um novo "cerebro" ao nosso jogador
		this.setState("snakeBrain"); //Definindo o estado ativo

		
	},

	dirX: 1, //Direção no eixo x
	dirY: 0, //Direção no eixo y

	timeToWalk: 2, //Tempo nessessário para andar novamente
	elapsedTime: 0, //Tempo passado desde a última vez que o snake andou 

	tail: [ //Array pra representar o "rabo da cobra"
		{x:20, y: 0},
		{x:0, y: 0},
	],

	

	postDraw: function(t){
		for(var i = 0; i< this.tail.length; i++){
			this.st.c.drawImage(this.squareImg, this.tail[i].x, this.tail[i].y);
		}
	}
});


itemActor = gamvas.Actor.extend({
	create: function(name,x,y){
		this._super(name,x,y);

		var st = gamvas.state.getCurrentState(); //Pegando o estado atual do jogo

		//Definindo a imagem do nosso personagem item
		this.setFile(st.resource.getImage("img/item.png"), 20, 20, 1, 1);
	}
})


// ********************************* Adicionando estados ****************************

//Declarando o estado do nosso jogo
gamePlay = gamvas.State.extend({
	points: 0, //A quantidade de pontos do jogador
	
	//Definindo atores, sem gambiarra ;D
	player: null,
	item: null,

	init: function(){
		this.camera.setPosition(400,300); //Manda a camera para o ponto superior esquerdo

		this.item = new itemActor("item",400,300);
		this.addActor(this.item);


		this.player = new snakeActor("player",40,0);
		this.addActor(this.player);
		this.registerInputEvents(this.player);
	},

	draw: function(t){


		if(this.player.position.x == this.item.position.x &&
			this.player.position.y == this.item.position.y){ //Se a posição do item e do snake for igual
			this.points++; //Aumentamos um ponto do nosso jogador

			document.getElementById("points").innerText = this.points; //Mostrando os pontos para nosso jogador

			var positionX = Math.round(Math.random()* 700); // Sorteamos um novo número "aleatoriamente"
			
			//E equanto o resto dessa divisão for diferente de zero
			// (ou enquanto o número não for múltiplo de 20)
			while(positionX % 20 != 0){ 
				positionX = Math.round(Math.random()* 700); //Sorteamos mais uma vez	
			}


			//O mesmo para y
			var positionY = Math.round(Math.random()* 500); // Sorteamos um novo número "aleatoriamente"
			
			//E equanto o resto dessa divisão for diferente de zero
			// (ou enquanto o número não for múltiplo de 10)
			while(positionY % 20 != 0){ 
				positionY = Math.round(Math.random()* 500); //Sorteamos mais uma vez	
			}


			this.item.position.x = positionX;
			this.item.position.y = positionY;


			this.player.tail.push({
				x: this.player.tail[this.player.tail.length-1].x,
				y: this.player.tail[this.player.tail.length-1].y,
			});
		}
	}
});

gamvas.event.addOnLoad(function(){
	gamvas.state.addState(new gamePlay("gamePlay")); //Adiciona um novo estado de jogo ao nosso game

	gamvas.start("game"); // Inicia o jogo no canvas
});