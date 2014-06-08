//Constants

var constants = {
	SIDE:0,
	DEFINE: function(){
		if(window.innerWidth < 240 || window.innerHeight < 240){
			this.SIDE = 220;
		}else if(window.innerWidth < 320  || window.innerHeight < 320){
			this.SIDE = 300;
		}else if(window.innerWidth < 480  || window.innerHeight < 480){
			this.SIDE = 460;
		}else if(window.innerWidth < 720  || window.innerHeight < 720){
			this.SIDE = 700;
		}else if(window.innerWidth < 768  || window.innerHeight < 768){
			this.SIDE = 750;
		}else if(window.innerWidth < 800  || window.innerHeight < 800){
			this.SIDE = 780;
		}else{
			this.SIDE = 1060;
		}

		alert(this.SIDE);

		var tag = document.getElementById("game");
		tag.innerHTML = '<div id="gameCanvas" class="center"><canvas id="c" width='+this.SIDE+' height='+this.SIDE+'></canvas></div>';
	}
}

constants.DEFINE();

//Variables
var doc=document,
	time = 300,
	points = 0,
	pointsHud = doc.getElementById("points"),
	timeHud = doc.getElementById("time"),
	numCalls = 0;
//timeHud.innerHTML = time;
//pointsHud.innerHTML = points;

//Event Listeners
window.addEventListener("load", function(){
		document.getElementById("game").setAttribute("class", "screen screen-true center");
	}, false);
window.addEventListener("transitionend", function () {
		
}, false);


function counter(){
	if(time>0){
		time--;
		timeHud.innerHTML = time;
		setTimeout(function(){
			counter();
		}, 1000);
	}else{
		timeHud.innerHTML = time;
	}
}

//Gamvas
circleBrain = gamvas.ActorState.extend({
	value: 0,
	update: function(){
		if(!this.actor.alive){
			if(this.actor.scaleFactor > 0){
				this.actor.scale(-0.05);
			}else{
				this.actor.setScale(0);
				this.actor.state.removeActor(this);
				
			}	
		}else{
			if(this.actor.scaleFactor < 1){
				this.actor.scale(0.025);
			}
		}
		

		if(this.actor.isMoving && this.actor.position.x > this.actor.newPos.x ){
			this.actor.move(-10,0);
		}else if(this.actor.isMoving && this.actor.position.x < this.actor.newPos.x ){
			this.actor.move(10,0);
		}else if(this.actor.isMoving && this.actor.position.y > this.actor.newPos.y ){
			this.actor.move(0,-10);
		}else if(this.actor.isMoving && this.actor.position.y < this.actor.newPos.y ){
			this.actor.move(0,10);
		}else{
			this.actor.isMoving = false;
		}

		if (this.actor.position.x > 240) {
			if (this.actor.position.y < 240) { //1º Quadrante
				this.actor.rotation = Math.PI + Math.atan((this.actor.position.x-240)/(240-this.actor.position.y));
			}else{ //4º Quadrante
				this.actor.rotation = -Math.atan((this.actor.position.x-240)/(this.actor.position.y-240));
			}
		}else{
			if (this.actor.position.y < 240) { //2º Quadrante
				this.actor.rotation = Math.PI - Math.atan((240-this.actor.position.x)/(240-this.actor.position.y));
			}else{ //3º Quadrante
				this.actor.rotation = Math.atan((240-this.actor.position.x)/(this.actor.position.y-240));
			}
		}
	},
});
circle = gamvas.Actor.extend({
	create: function(name,x,y,file, type){
		this._super(name,x,y);
		this.setCenter(30,30);
		//this.setCenter(35,30);
		this.setScale(0);
		this.resource = gamvas.state.getCurrentState().resource;
		this.rotation = this.position.y > 240 ? Math.atan((240-this.position.x)/(240-this.position.y))*-1 : Math.PI-Math.atan((240-this.position.x)/(240-this.position.y));	
		this.type = type;
		this.isMoving = false;
		this.alive = true;
		//this.setFile(file,70,73,10,1);
		this.setFile(file,60,60,10,1);
		this.setFrameList([type]);
		this.state = gamvas.state.getCurrentState();
		this.rect = {x:this.position.x-30, y:this.position.y-30, w:60, h:60};
		this.addState(new circleBrain("b"), true);
		this.newPos = {x: x, y: y};
		this.resource = gamvas.state.getCurrentState().resource;
		//this.shadow = new gamvas.Image(this.resource.getImage("./img/shadow.png"));
		//this.shadow.position = new gamvas.Vector2D(this.position.x + 5, this.position.y + 5);*/
		this.setScale(1); //Se não der certo, tira a linha
	}
});


gameplay = gamvas.State.extend({
	init: function(){
		this.sideSize = gamvas.getCanvasDimension().w; // size of one canvas' side, that is square. i.e., width == height
		this.camera.setPosition(this.resize(2),this.resize(2));
		this.clearColor = "rgba(0,0,0,0)";
		this.table = new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array());
		this.level = 1;
		this.numPieces = 0;
		this.creationTime = 1500;
		this.elapsedTime = 0;
		this.back = new gamvas.Image(this.resource.getImage("./img/table.png"));
		this.pieces = this.resource.getImage("./img/pieces.png");
		this.active = new gamvas.Image(this.resource.getImage("./img/active.png"),0,0);
		//this.sd = false;

		//this.addActor(new circle("",0,0, this.pieces,3))

		this.back.setScale(1);
		//this.pieces.setScale(1);
		this.active.setScale(1);

		for(var i =0; i<6; i++){
			for(var j =0; j<6; j++){
				this.table[i].push({x: i*this.resize(6), y:j*this.resize(6), w:this.resize(6), h:this.resize(6), c:null, active: false});
			}			
		}
		this.table[0][0] = this.table[0][5] = this.table[5][0] = this.table[5][5] = null;

	},
	preDraw: function(){
		this.back.draw(); //Draws the table

		for(var i = 0; i<6; i++){ //loop to draw the red square (houses for player's choose)
			for(var j = 0; j<6;j++){
				if ( this.table[i][j]!= null && this.table[i][j].active) {
					this.active.setPosition(
						i*this.resize(6),
						j*this.resize(6));
					this.active.draw();
				}
			}
		}
	},
	draw:function(t){
		if(this.elapsedTime >= this.creationTime){ // Time to create new pieces
			var i=0,j=0;

			if(this.numPieces < 25){ 
				while((i==0 && j==0) ||
						(i==5 && j==0) ||
						(i==0 && j==5) ||
						(i==5 && j==5) ||
						this.table[i][j].c != null){
					i = (Math.round(Math.random()*10))%6;
					j = (Math.round(Math.random()*10))%6;	
				}
				this.numPieces++;
				this.table[i][j].c = new circle("", 
					((i*this.resize(6))+this.resize(12)),
					((j*this.resize(6))+this.resize(12)),
					this.pieces,
					Math.round(Math.random()*10)%10/*this.level*/);
				this.addActor(this.table[i][j].c);
			}
			this.elapsedTime = 0;
		}else{
			this.elapsedTime+=10;
		}

		this.verifyLine();
		//numCalls++;

	},
	collide: function(a, b){
		return !(a.x > b.x+b.w ||
				a.x+a.w < b.x ||
				a.y > b.y+b.h ||
				a.y+a.h < b.y);
	},

	verifyLine: function(){

		var equal; //bool to verify if the line is formed
		for(var i = 1; i<5; i++){
			equal = true;
			for(var j = 1; j<4; j++){
				if(this.table[i][j].c != null && this.table[i][j+1].c != null && !this.table[i][j].c.isMoving){
					if(this.table[i][j].c.type != this.table[i][j+1].c.type){
						equal = false;
						j=4;
					}
				}else{
					j = 4;
					equal = false;
				}
			}

			if(equal){
				this.numPieces-=4;
				for(var j = 1; j<5; j++){
					this.table[i][j].c.alive = false;
					this.table[i][j].c = null;
				}
			}
		}

		for(var j = 1; j<5; j++){
			equal = true;
			for(var i = 1; i<4; i++){
				if(this.table[i][j].c != null && this.table[i+1][j].c != null && !this.table[i][j].c.isMoving){
					if(this.table[i][j].c.type != this.table[i+1][j].c.type){
						equal = false;
						i=4;
					}
				}else{
					i = 4;
					equal = false;
				}
			}

			if(equal){
				this.numPieces-=4;
				for(var i = 1; i<5; i++){
					this.table[i][j].c.alive = false;
					this.table[i][j].c = null;
				}
			}
		}

	},
	
	// helper to return the size of something :D
	// proportional to the canvas dimensions
	resize: function(numTimes){ 
		return Math.floor(this.sideSize/numTimes);
	},

	onMouseUp: function(b){
		if(b == gamvas.mouse.LEFT){
			for(var i = 0; i<6; i++){
				for(var j = 0; j<6;j++){
					if(this.table[i][j]!= null){
						if (this.table[i][j].c!=null &&							
							!this.table[i][j].c.isMoving &&
							this.collide(this.table[i][j],{x:gamvas.mouse.getX(), y:gamvas.mouse.getY(), w:1, h:1}))
						{
							if(this.actualPiece != null){
								this.lastHouse.c = this.actualPiece;
								for(var a = 0; a<6; a++){
									for(var b = 0; b<6;b++){
										if( this.table[a][b]!= null && this.table[a][b].active){
											this.table[a][b].active = false;
										}
									}
								}
								//this.actualPiece = this.table[i][j].c;
							}	

							this.actualPiece = this.table[i][j].c;
							this.table[i][j].c = null;								
							this.lastHouse = this.table[i][j];						

							for(var h = i+1; h<6; h++){
									if(this.table[h][j] != null &&this.table[h][j].c == null){
										this.table[h][j].active = true;
									}else{
										h=6;
									}
								}
								for(var h = i-1; h>-1; h--){
									if(this.table[h][j] != null &&this.table[h][j].c == null){
										this.table[h][j].active = true;
									}else{
										h=-1;
									}
								}
								for(var h = j+1; h<6; h++){
									if(this.table[i][h] != null &&this.table[i][h].c == null){
										this.table[i][h].active = true;
									}else{
										h=6;
									}
								}
								for(var h = j-1; h>-1; h--){
									if(this.table[i][h] != null && this.table[i][h].c == null){
										this.table[i][h].active = true;
									}else{
										h=-1;
									}
								}

								j=6;
								i=6;
								
						}else if(this.table[i][j].active && 
							this.collide(this.table[i][j],{x:gamvas.mouse.getX(), y:gamvas.mouse.getY(), w:1, h:1})){
							this.actualPiece.newPos.x = this.table[i][j].x+this.resize(12);
							this.actualPiece.newPos.y = this.table[i][j].y+this.resize(12);
							this.actualPiece.isMoving = true;
							//this.actualPiece.setPosition(this.table[i][j].x+50,this.table[i][j].y+50);
							this.table[i][j].c = this.actualPiece;
							this.actualPiece = null;

							for(var a = 0; a<6; a++){
								for(var b = 0; b<6;b++){
									if( this.table[a][b]!= null && this.table[a][b].active){
										this.table[a][b].active = false;
									}
								}
							}
						}
					}					
				}
			}
		}
	}
});

gamvas.event.addOnLoad(function () {
	gamvas.state.addState(new gameplay("gameplay"));
	gamvas.start("c");
})