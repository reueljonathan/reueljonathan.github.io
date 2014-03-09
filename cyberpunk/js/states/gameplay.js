var time = 10,
	timerHud = doc.getElementById("time"),
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
		countdown();
		gamePaused = false;
	}
}

function countdown(){
	if(time > 0){
		time--;
		timerHud.innerHTML = time;
		setTimeout(function(){
			return countdown(time, timerHud);
		}, 1000);		
	}else{
		return time;
	}
}

var gravity = 1;
gameplay = gamvas.State.extend({
	preCounter: 3,
	time: 10,
	timerHud: null,
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
		this.addActor(this.bluePlayer);
		this.registerInputEvents(this.bluePlayer);

		//this.redPlayer = new redPlayerActor("redPlayer", 450,0);
		//this.addActor(this.redPlayer);
		//this.registerInputEvents(this.redPlayer);

		//this.ground = new groundActor("g",50,400);
		//this.addActor(this.ground);

		timerHud.innerHTML = time;

		preCounter(0);


		
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