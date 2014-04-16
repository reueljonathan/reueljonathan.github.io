bulletBrain = gamvas.ActorState.extend({
	update: function (t) {
		if (!gamePaused) {
			this.actor.move(30*this.actor.direction,0);
			this.actor.rect = {x:this.actor.position.x, y:this.actor.position.y, w:17, h:5};
		}
	}
});
bulletActor = gamvas.Actor.extend({
	resource: null,
	create: function(name,x,y, direction, img){
		this._super(name,x,y);
		this.direction = direction;
		this.rect = {x:this.position.x, y:this.position.y, w:17, h:5};
		this.resource = gamvas.state.getCurrentState().resource;
		this.addAnimation(new gamvas.Animation("move",
			img,17,5,2,8));

		this.addState(new bulletBrain("brain"), true);
		this.setAnimation("move");

		this.rect = {x:this.position.x, y:this.position.y, w:17, h:5};
	}
});