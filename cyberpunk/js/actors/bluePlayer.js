bluePlayerBrain = gamvas.ActorState.extend({
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
					/*if(this.actor.lastDirection == 1){
						this.actor.setAnimation("defeat");
					}else if(this.actor.lastDirection == -1){
						this.actor.setAnimation("defeat");
					}*/
					this.actor.setAnimation("rest");
				}
			}
		}

		if(gamvas.key.isPressed(gamvas.key.D)){
			this.actor.rect.w = 42;
			this.actor.rect.h = 55;
			this.actor.speedX = 8;
			//this.actor.setAnimation("runningRight");

			this.actor.lastDirection = 1;

			this.actor.defeatAnimation.setFrameList([
				0,1,2,3,4,5,6,7,8,9]);

			this.actor.jumpAnimation.setFrameList([0,1]);
			this.actor.runAnimation.setFrameList(
				[0,1,2,3,4,5,6,7]);
			this.actor.restAnimation.setFrameList([0]);

			if(!this.actor.jumping){
				this.actor.setAnimation("run");
			}
		}
		if(gamvas.key.isPressed(gamvas.key.A)){
			this.actor.rect.w = 42;
			this.actor.rect.h = 55;
			this.actor.speedX = -8;
			//this.actor.setAnimation("runningLeft");
			this.actor.lastDirection = -1;

			this.actor.defeatAnimation.setFrameList([
				10,11,12,13,14,15,16,17,18,19]);

			this.actor.jumpAnimation.setFrameList([2,3]);
			this.actor.runAnimation.setFrameList(
				[8,9,10,11,12,13,14,15]);
			this.actor.restAnimation.setFrameList([1]);

			if(!this.actor.jumping){
				this.actor.setAnimation("run");
			}
		}
		if(gamvas.key.isPressed(gamvas.key.W) &&
			!this.actor.jumping){
			this.actor.speedY = -15;
			this.actor.jumping = true;
			this.actor.isOnGround = false;

			this.actor.setAnimation("jump");

		}

		if(this.actor.jumping){
			this.actor.speedY += gravity;
			this.actor.rect.w = 28;
			this.actor.rect.h = 59;
			/*if(this.actor.lastDirection == 1){
				this.actor.setAnimation("jumpRight");
			}else if(this.actor.lastDirection == -1){
				this.actor.setAnimation("jumpLeft");
			}*/
			
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
		if(k == gamvas.key.D ||
			k == gamvas.key.A){
			this.actor.speedX = 0;
			this.actor.rect.w = 32;
			this.actor.rect.h = 55;
			//if(this.actor.lastDirection == 1){
			//	this.actor.setAnimation("rest");
			//}else if(this.actor.lastDirection == -1){
			if(!this.actor.jumping){
				this.actor.setAnimation("rest");
			}
			//}

		}

		if(k == gamvas.key.J && this.actor.numBullets < 5){
			
			this.actor.fireLightAnimation.position.y = this.actor.position.y +15;
			
			this.actor.numBullets++;
			var x , b;
			if(this.actor.lastDirection == 1){
				this.actor.fireLightAnimation.position.x = this.actor.position.x + this.actor.rect.w;
				this.actor.fireLightAnimation.setFile(this.actor.shootLightImageR,19,13,2,8);
				x = 32;
				b = new bulletActor("b"+this.actor.numBullets,
				  this.actor.position.x + x,this.actor.position.y + 21, this.actor.lastDirection,
				  this.actor.blueBulletImageR);
			}else if(this.actor.lastDirection == -1){
				this.actor.fireLightAnimation.position.x = this.actor.position.x-17;
				this.actor.fireLightAnimation.setFile(this.actor.shootLightImageL,19,13,2,8);
				x = 0;
				b = new bulletActor("b"+this.actor.numBullets,
				  this.actor.position.x + x,this.actor.position.y + 21, this.actor.lastDirection,
				  this.actor.blueBulletImageL);
			}
			this.actor.bullets.push(b);
			this.state.addActor(b);
			this.state.registerInputEvents(b);
			this.actor.fired = true;
			this.actor.fireLightAnimation.currentFrame =0;

		}
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

bluePlayerActor = gamvas.Actor.extend({
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

		this.defeatAnimation = new gamvas.Animation("defeat",
			this.resource.getImage("./img/game/blueDefeat.png"), 57,55,20,4);
		this.addAnimation(this.defeatAnimation);

		this.runAnimation = new gamvas.Animation("run",
			this.resource.getImage("./img/game/blueRun.png"), 42,55,16,12);
		this.addAnimation(this.runAnimation);

		this.restAnimation = new gamvas.Animation("rest",
			this.resource.getImage("./img/game/blueRest.png"), 32,55,2,1);
		this.addAnimation(this.restAnimation);
		this.restAnimation.setFrameList([0]);

		this.jumpAnimation = new gamvas.Animation("jump",
			this.resource.getImage("./img/game/blueJump.png"), 28,59,4,1);
		this.addAnimation(this.jumpAnimation);

		
		
		

		this.blueBulletImageR = this.resource.getImage("./img/game/blueShootRight.png");
		this.blueBulletImageL = this.resource.getImage("./img/game/blueShootLeft.png");

		this.shootLightImageR = this.resource.getImage("./img/game/shootLightBlueR.png");
		this.shootLightImageL = this.resource.getImage("./img/game/shootLightBlueL.png");

		this.addState(new bluePlayerBrain("brain"), true);

		this.rect = {x:this.position.x, y:this.position.y-55, w:32, h:55};
		this.fireLightAnimation = new uniqueAnimation("fireLight",
			this.resource.getImage("./img/game/shootLightBlueR.png"),
			19,13,2,8);
	}
});