redPlayerBrain = gamvas.ActorState.extend({
	init: function(){
		this.state =  gamvas.state.getCurrentState();
	},
	update: function(t){
		if(!this.actor.isOnGround){
			for(var i = 0; i<this.state.grounds.length; i++){
				if(this.state.collide(this.actor.rect, this.state.grounds[i].rect)){
					this.actor.position.y = this.state.grounds[i].position.y - 55;
					this.actor.jumping = false;
					this.actor.speedY = 0;
					this.actor.isOnGround= true;
					this.actor.lastGroundIndex = i;
					i= this.state.grounds.length;

					this.actor.rect.w = 32;
					this.actor.rect.h = 55;
					if(this.actor.lastDirection == 1){
						this.actor.setAnimation("restRight");
					}else if(this.actor.lastDirection == -1){
						this.actor.setAnimation("restLeft");
					}
				}
			}
		}

		if(gamvas.key.isPressed(gamvas.key.RIGHT)){
			this.actor.rect.w = 42;
			this.actor.rect.h = 55;
			this.actor.speedX = 8;
			this.actor.setAnimation("runningRight");
			this.actor.lastDirection = 1;
		}
		if(gamvas.key.isPressed(gamvas.key.LEFT)){
			this.actor.rect.w = 42;
			this.actor.rect.h = 55;
			this.actor.speedX = -8;
			this.actor.setAnimation("runningLeft");
			this.actor.lastDirection = -1;
		}
		if(gamvas.key.isPressed(gamvas.key.UP) &&
			!this.actor.jumping){
			this.actor.speedY = -15;
			this.actor.jumping = true;
			this.actor.isOnGround = false;

		}

		if(this.actor.jumping){
			this.actor.speedY += gravity;
			this.actor.rect.w = 28;
			this.actor.rect.h = 59;
			if(this.actor.lastDirection == 1){
				this.actor.setAnimation("jumpRight");
			}else if(this.actor.lastDirection == -1){
				this.actor.setAnimation("jumpLeft");
			}
		}		
		this.actor.move(this.actor.speedX,this.actor.speedY);

		if(!this.state.collide(this.actor.rect, this.state.grounds[this.actor.lastGroundIndex].rect)){
			this.actor.jumping = true;
			this.actor.isOnGround = false;
		}
		this.actor.rect = {x:this.actor.position.x, y:this.actor.position.y, w:32, h:55};

		for (var i = 0; i < this.actor.bullets.length; i++) {
			if(this.outOfScreen(this.actor.bullets[i].rect)){
				this.state.removeActor(this.actor.bullets[i]);
				this.actor.numBullets--;
			}
		}
	},
	onKeyUp: function (k) {
		if(k == gamvas.key.LEFT ||
			k == gamvas.key.RIGHT){
			this.actor.speedX = 0;
			this.actor.rect.w = 32;
			this.actor.rect.h = 55;
			if(this.actor.lastDirection == 1){
				this.actor.setAnimation("restRight");
			}else if(this.actor.lastDirection == -1){
				this.actor.setAnimation("restLeft");
			}

		}

		if(k == gamvas.key.NUMPAD_5 && this.actor.numBullets < 5){
			
			this.actor.fireLightAnimation.position.y = this.actor.position.y +15;
			
			this.actor.numBullets++;
			var x , b;
			if(this.actor.lastDirection == 1){
				this.actor.fireLightAnimation.position.x = this.actor.position.x + this.actor.rect.w;
				this.actor.fireLightAnimation.setFile(this.actor.shootLightImageR,19,13,2,8);
				x = 32;
				b = new bulletActor("b"+this.actor.numBullets,
				  this.actor.position.x + x,this.actor.position.y + 21, this.actor.lastDirection,
				  this.actor.redBulletImageR);
			}else if(this.actor.lastDirection == -1){
				this.actor.fireLightAnimation.position.x = this.actor.position.x-17;
				this.actor.fireLightAnimation.setFile(this.actor.shootLightImageL,19,13,2,8);
				x = 0;
				b = new bulletActor("b"+this.actor.numBullets,
				  this.actor.position.x + x,this.actor.position.y + 21, this.actor.lastDirection,
				  this.actor.redBulletImageL);
			}
			this.actor.bullets.push(b);
			this.state.addActor(b);
			this.state.registerInputEvents(b);
			this.actor.fired = true;
			this.actor.fireLightAnimation.currentFrame =0;

		}
	},
	postDraw: function(t){
		this.actor.fireLightAnimation.draw(t);	
	},
	outOfScreen: function(r){
		return (
				(r.x > 800) ||
				(r.x + r.w < 0) ||
				(r.y > 800) ||
				(r.y + r.h < 0)
			);
	}
});

redPlayerActor = gamvas.Actor.extend({
	hp: 100,
	isOnGround: false,
	jumping: true,
	speedY: 0,
	speedX: 0,
	lastGroundIndex: 0,
	bullets:[],
	numBullets:0,
	lastDirection: 1,
	fired: false,
	create: function(name, x, y){
		this._super(name,x,y);

		this.resource = gamvas.state.getCurrentState().resource;
		this.addAnimation(new gamvas.Animation("runningRight",
			this.resource.getImage("./img/game/runBlueRight.png"), 42,55,8,12));
		this.addAnimation(new gamvas.Animation("runningLeft",
			this.resource.getImage("./img/game/runBlueLeft.png"), 42,55,8,12));
		this.addAnimation(new gamvas.Animation("restRight",
			this.resource.getImage("./img/game/restBlueRight.png"), 32,55,1,1));
		this.addAnimation(new gamvas.Animation("restLeft",
			this.resource.getImage("./img/game/restBlueLeft.png"), 32,55,1,1));
		
		this.addAnimation(new gamvas.Animation("jumpLeft",
			this.resource.getImage("./img/game/jumpBlueLeft.png"), 28,59,2,1));
		
		this.addAnimation(new gamvas.Animation("jumpRight",
			this.resource.getImage("./img/game/jumpBlueRight.png"), 28,59,2,1));
		
		this.redBulletImageR = this.resource.getImage("./img/game/redShootRight.png");
		this.redBulletImageL = this.resource.getImage("./img/game/redShootLeft.png");

		this.shootLightImageR = this.resource.getImage("./img/game/shootLightRedR.png");
		this.shootLightImageL = this.resource.getImage("./img/game/shootLightRedL.png");

		this.addState(new redPlayerBrain("brain"), true);

		this.rect = {x:this.position.x, y:this.position.y, w:32, h:55};
		this.fireLightAnimation = new uniqueAnimation("fireLight",
			this.resource.getImage("./img/game/shootLightRedR.png"),
			19,13,2,8);
	}
});