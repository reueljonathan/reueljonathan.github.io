
groundActor = gamvas.Actor.extend({
	resource: null,
	rect: null,
	create: function(name,x,y){
		this._super(name,x,y);
		this.resource = gamvas.state.getCurrentState().resource;
		this.setFile(this.resource.getImage("./img/game/ground.png"),100,10,1,1);
		this.rect = {x:this.position.x, y:this.position.y, w:100, h:10};
	}
});