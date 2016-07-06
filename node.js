function node(info){
	this.x = random(0,width);
	this.y = random(0,height);
	this.Vx = random(-100,100)/50;
	this.Vy = random(-100,100)/50;
	this.Fx = 0;
	this.Fy = 0;
	this.color = random(0,100);
	this.selected = false;
	this.visited = false;
	this.name = info.name;
	this.links = info.links;
	this.content = info.content;
	this.mass = random(100,200);
	this.alpha = 100;
	this.applyForce = function(addX, addY){
		this.Fx += addX;	
		this.Fy += addY;
	}
	
	this.update = function(){
		if(!this.selected){
			this.Vx += this.Fx/this.mass;
			this.Vy += this.Fy/this.mass;
			var totV = Math.pow(Math.pow(this.Vx,2)+Math.pow(this.Vy,2),0.5);
			if(totV > 4){
				var scl = 4/totV;
				this.Vx = this.Vx*scl
				this.Vy = this.Vy*scl
			} 
			if(totV > 0.2){
				this.Vx = this.Vx * 0.985;
				this.Vy = this.Vy * 0.985;
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
		} else{
			if(!(abs(this.x - width/2) < 5 && abs(this.y - height/2) < 5)){
				this.x += (width/2 - this.x)/8;
				this.y += (height/2 - this.y)/8;
			}
			this.visited = true;
		}
	}
	
	this.show = function(){
		if(this.visited && !this.selected){
			this.alpha = 50;
		} else {
			this.alpha = 100;
		}
		stroke(this.color,100,100,this.alpha);
		strokeWeight(int(this.mass/4));
		point(this.x,this.y);
	}
	
}