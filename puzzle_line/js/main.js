//Variables
var doc=document,
	scripts=["transitions.js"],
	time = 300,
	points = 0,
	pointsHud = doc.getElementById("points"),
	timeHud = doc.getElementById("time");


timeHud.innerHTML = time;
pointsHud.innerHTML = points;
//Scripts load
for(var i=0;i<scripts.length;i++){
	doc.writeln("<scripts src='js/"+scripts[i]+"'></scripts>");
}

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
		if(this.actor.scaleFactor < 1){
			this.actor.scale(0.1);
		}

		if(this.actor.position.x > this.actor.newPos.x){
			this.actor.move(-10,0);
			//this.actor.rotation = this.actor.position.y > 240 ? Math.atan((240-this.actor.position.x)/(240-this.actor.position.y))*-1 : Math.PI-Math.atan((240-this.actor.position.x)/(240-this.actor.position.y));
		}
		if(this.actor.position.x < this.actor.newPos.x){
			this.actor.move(10,0);
			//this.actor.rotation = this.actor.position.y > 240 ? Math.atan((240-this.actor.position.x)/(240-this.actor.position.y))*-1 : Math.PI-Math.atan((240-this.actor.position.x)/(240-this.actor.position.y));
		}
		if(this.actor.position.y > this.actor.newPos.y){
			this.actor.move(0,-10);
			//this.actor.rotation = this.actor.position.y > 240 ? Math.atan((240-this.actor.position.x)/(240-this.actor.position.y))*-1 : Math.PI-Math.atan((240-this.actor.position.y)/(240-this.actor.position.x));
		}
		if(this.actor.position.y < this.actor.newPos.y){
			this.actor.move(0,10);
			//this.actor.rotation = this.actor.position.y > 240 ? Math.atan((240-this.actor.position.x)/(240-this.actor.position.y))*-1 : Math.PI-Math.atan((240-this.actor.position.x)/(240-this.actor.position.y));
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
		//this.setCenter(30,30);
		this.setCenter(35,30);
		this.setScale(0);
		this.resource = gamvas.state.getCurrentState().resource;
		this.rotation = this.position.y > 240 ? Math.atan((240-this.position.x)/(240-this.position.y))*-1 : Math.PI-Math.atan((240-this.position.x)/(240-this.position.y));	
		this.type = type;
		this.setFile(file,70,73,10,1);
		this.setFrameList([type]);
		this.rect = {x:this.position.x-30, y:this.position.y-30, w:60, h:60};
		this.addState(new circleBrain("b"), true);
		this.newPos = {x: x, y: y};
		this.resource = gamvas.state.getCurrentState().resource;
		//this.shadow = new gamvas.Image(this.resource.getImage("./img/shadow.png"));
		//this.shadow.position = new gamvas.Vector2D(this.position.x + 5, this.position.y + 5);*/
	}
});


gameplay = gamvas.State.extend({
	init: function(){
		this.camera.setPosition(240,240);
		this.clearColor = "rgba(0,0,0,0)";
		this.table = new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array());
		this.numPieces = 0;
		this.shadow = new gamvas.Image(this.resource.getImage("./img/shadow.png"));
		this.back = new gamvas.Image(this.resource.getImage("./img/table.png"));
		this.pieces = this.resource.getImage("./img/ball.svg");
		
		for(var i =0; i<6; i++){
			for(var j =0; j<6; j++){
				this.table[i].push({x: i*80, y:j*80, w:80, h:80, c:null, active: false});
			}			
		}
		this.table[0][0] = this.table[0][5] = this.table[5][0] = this.table[5][5] = null;

		this.active = new gamvas.Image(this.resource.getImage("./img/active.png"),0,0);

		this.circle = new circle("c",120,120,this.pieces,Math.round(Math.random()*10)%10);
		this.table[1][1].c = this.circle;
		this.addActor(this.circle);
		this.registerInputEvents(this.circle);

		this.circle2 = new circle("c2",120,280,this.pieces,Math.round(Math.random()*10)%10);
		this.table[1][3].c = this.circle2;
		this.addActor(this.circle2);
		this.registerInputEvents(this.circle2);

		this.circle3 = new circle("c3",(3*80)+40,(1*80)+40,this.pieces,Math.round(Math.random()*10)%10);
		this.table[3][1].c = this.circle3;
		this.addActor(this.circle3);
		this.registerInputEvents(this.circle3);

		this.circle4 = new circle("c4",(4*80)+40,(4*80)+40,this.pieces,Math.round(Math.random()*10)%10);
		this.table[4][4].c = this.circle4;
		this.addActor(this.circle4);
		this.registerInputEvents(this.circle4);
	},
	preDraw: function(){
		this.back.draw();
		

		for(var i = 0; i<6; i++){
			for(var j = 0; j<6;j++){
				if ( this.table[i][j]!= null && this.table[i][j].active) {
					this.active.setPosition(i*80,j*80);
					this.active.draw();
				}
			}
		}

		pointsHud.innerHTML = gamvas.screen.getFPS();
	},
	postDraw: function(){
		this.shadow.draw();
	},
	collide: function(a, b){
		return !(a.x > b.x+b.w ||
				a.x+a.w < b.x ||
				a.y > b.y+b.h ||
				a.y+a.h < b.y);
	},

	onMouseUp: function(b){
		if(b == gamvas.mouse.LEFT){
			for(var i = 0; i<6; i++){
				for(var j = 0; j<6;j++){
					if(this.table[i][j]!= null){
						if (this.table[i][j].c!=null &&							
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
							this.actualPiece.newPos.x = this.table[i][j].x+40;
							this.actualPiece.newPos.y = this.table[i][j].y+40;
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