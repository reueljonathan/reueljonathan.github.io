doorActor = gamvas.Actor.extend({
	resource: null,
	closedAnimation:null,
	openingAnimation:null,
	openAnimation:null,
	create: function(name,x,y){



		this._super(name,x,y);
		this.resource = gamvas.state.getCurrentState().resource;

		this.closedAnimation = new gamvas.Animation("closed",
		this.resource.getImage("./img/game/door.png"), 64, 60, 1,0);


		

		this.addAnimation(this.closedAnimation);
		this.setAnimation("closed");

	}
});