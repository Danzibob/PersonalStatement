function node(){
	this.x = random(0,width);
	this.y = random(0,height);
	this.Vx = random(-100,100)/50;
	this.Vy = random(-100,100)/50;
	this.Fx = 0;
	this.Fy = 0;
	this.mass = random(60,200);
	this.color = random(0,100);
	this.selected = false;
	this.applyForce = function(addX, addY){
		this.Fx += addX;	
		this.Fy += addY;
	}
	this.update = function(){
		this.Vx += this.Fx/this.mass;
		this.Vy += this.Fy/this.mass;
		var totV = Math.pow(Math.pow(this.Vx,2)+Math.pow(this.Vy,2),0.5);
		if(totV > 1){
			var scl = 1/totV;
			this.Vx = this.Vx*scl
			this.Vy = this.Vy*scl
		}
		this.Fx = 0;
		this.Fy = 0;
		if(this.x >= width || this.x <= 0){
			this.Vx = -0.8*this.Vx;
			this.x += this.Vx*2
		}
		if(this.y >= height || this.y <= 0){
			this.Vy = -0.8*this.Vy;
			this.y += this.Vy*2
		}
		this.x += this.Vx;
		this.y += this.Vy;
	}
	this.show = function(){
		stroke(this.color,100,100);
		strokeWeight(int(this.mass/4));
		point(this.x,this.y);
	}
	
}