uniqueAnimation = gamvas.Animation.extend({
	drawFixed: function(t, c, x, y, offX, offY, rot, scale) {
        if (this.needInit) {
            if ( (typeof this.sprite.width == 'undefined') || (this.sprite.width === 0) ) {
                return;
            }
            this.width = this.sprite.width;
            this.height = this.sprite.height;
            this.needInit = false;
        }
        this.currentFrameTime += t;
        if (this.currentFrameTime > this.fDur) {
            while (this.currentFrameTime > this.fDur) {
                this.currentFrameTime -= this.fDur;
            }
            this.currentFrame++;
            //if (this.currentFrame >= this.numberOfFrames) {
            //    this.currentFrame = 0;
           // }
        }
        this.drawFrame(c, this.currentFrame, x, y, offX, offY, rot, scale);
    },
});
