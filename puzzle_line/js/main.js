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
	update: function(){
		if(this.actor.scaleFactor < 1){
			this.actor.scale(0.1);
		}

		if(this.actor.position.x > this.actor.newPos.x){
			this.actor.move(-20,0);
		}
		if(this.actor.position.x < this.actor.newPos.x){
			this.actor.move(20,0);
		}
		if(this.actor.position.y > this.actor.newPos.y){
			this.actor.move(0,-20);
		}
		if(this.actor.position.y < this.actor.newPos.y){
			this.actor.move(0,20);
		}
	}
});
circle = gamvas.Actor.extend({
	create: function(name,x,y,file, type){
		this._super(name,x,y);
		this.setCenter(40,40);
		this.setScale(0);
		this.resource = gamvas.state.getCurrentState().resource;
		this.setFile(file,80,80,1,1);
		this.rect = {x:this.position.x-40, y:this.position.y-40, w:80, h:80};
		this.addState(new circleBrain("b"), true);
		this.newPos = {x: x, y: y};
	}
});


gameplay = gamvas.State.extend({
	init: function(){
		this.camera.setPosition(300,300);
		this.clearColor = "rgba(0,0,0,0)";
		this.table = new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array());
		this.numPieces = 0;
		
		for(var i =0; i<6; i++){
			for(var j =0; j<6; j++){
					this.table[i].push({x: i*100, y:j*100, w:100, h:100, c:null, active: false});
			}			
		}
		this.table[0][0] = this.table[0][5] = this.table[5][0] = this.table[5][5] = null;

		this.back = new gamvas.Image(this.resource.getImage("./img/table.png"));

		this.one = this.resource.getImage("./img/1.svg");
		this.two = this.resource.getImage("./img/2.svg");
		this.tree = this.resource.getImage("./img/3.svg");
		this.four = this.resource.getImage("./img/4.svg");

		this.active = new gamvas.Image(this.resource.getImage("./img/active.png"),0,0);
		
		this.circle = new circle("c",150,150,this.one,1);
		this.table[1][1].c = this.circle;
		this.addActor(this.circle);
		this.registerInputEvents(this.circle);

		this.circle2 = new circle("c2",150,350,this.two,2);
		this.table[1][3].c = this.circle2;
		this.addActor(this.circle2);
		this.registerInputEvents(this.circle2);
	},
	preDraw: function(){
		this.back.draw();
		

		for(var i = 0; i<6; i++){
			for(var j = 0; j<6;j++){
				if ( this.table[i][j]!= null && this.table[i][j].active) {
					this.active.setPosition(i*100,j*100);
					this.active.draw();
				}
			}
		}

		pointsHud.innerHTML = gamvas.screen.getFPS();
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
							this.actualPiece.newPos.x = this.table[i][j].x+50;
							this.actualPiece.newPos.y = this.table[i][j].y+50;
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