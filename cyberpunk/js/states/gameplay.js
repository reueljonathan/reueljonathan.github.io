var time = 10,
	preCounterHud = doc.getElementById("preCounter"),
	preCounterMsg = ["3","2","1","GO", ""],
	gamePaused= true;

function preCounter(i){
	if(i<preCounterMsg.length){
		preCounterHud.innerHTML = preCounterMsg[i];
		i++;

		setTimeout(function(){
			preCounter(i);
		}, 1000);
	}else{
		gamePaused = false;
	}
}

var gravity = 1;
gameplay = gamvas.State.extend({
	preCounter: 3,
	time: 10,
	grounds:[],
	init: function(){
		this.camera.setPosition(400,400);
		/*/this.door = new doorActor("door", 368, 716);

		this.door = new doorActor("door", 368, 35);
		this.addActor(this.door);*/

		this.grounds = [
			new groundActor("g1",100,100),
			new groundActor("g2",300,300),
			new groundActor("g3",500,500),
			new groundActor("g4",700,70),
			new groundActor("g5",900,800),
			new groundActor("g6",100,800),
			new groundActor("g7",800,600),
			new groundActor("g8",600,400),
			new groundActor("g9",400,300),
			new groundActor("g10",200,200)
		];

		for(var i =0; i< this.grounds.length; i++){
			this.addActor(this.grounds[i]);
		}

		this.bluePlayer = new bluePlayerActor("bluePlayer", 400,0);
		this.redPlayer = new redPlayerActor("redPlayer", 450,0);

		this.bluePlayer.enemy = this.redPlayer;
		this.redPlayer.enemy = this.bluePlayer;
		
		this.addActor(this.redPlayer);
		this.registerInputEvents(this.redPlayer);
		this.addActor(this.bluePlayer);
		this.registerInputEvents(this.bluePlayer);

		//this.ground = new groundActor("g",50,400);
		//this.addActor(this.ground);


		preCounter(0);


		
	},
	onKeyUp: function(k){
		if(k == gamvas.key.P){
			gamePaused = !gamePaused;
		}
	},
	draw: function(){
		if(!gamePaused){
			this.camera.move(0,1);
		}
	},
	collide: function(a, b){
		return !(a.x > b.x+b.w ||
				a.x+a.w < b.x ||
				a.y > b.y+b.h ||
				a.y+a.h < b.y);
	}
});

gamvas.event.addOnLoad(function(){
	gamvas.state.addState(new gameplay("gameplay"));

	gamvas.start("gameCanvas", false);
});