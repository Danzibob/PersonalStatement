function graph(details){
	this.n = details.length;
	this.p = [];
	this.l = [];
	this.anySelected = false;
	this.currentSelected = "none";
	this.nameSelected = "...";
	this.contentSelected = "...";
	for(i = 0; i< this.n; i++){
		this.p.push(new node(details[i]));
		for(j = 0; j < this.p[i].links.length; j++){
			this.l.push([i,this.p[i].links[j]])
		}
	}
	
	this.update = function(){
		for(i = 0; i < this.p.length; i++){
			if(!this.p[i].selected){
				for(j = 0; j < this.p.length; j++){
					if(j != i){
						var r = dist(this.p[i].x,this.p[i].y,this.p[j].x,this.p[j].y)
						var mag = (this.p[i].mass * this.p[j].mass)/(Math.pow(r,2));
						var Xprop = (this.p[i].x-this.p[j].x)/r;
						var Yprop = (this.p[i].y-this.p[j].y)/r;
						this.p[i].applyForce(mag*Xprop,mag*Yprop);
					}
				}
				var r = dist(this.p[i].x,this.p[i].y,width/2,height/2)
				var mag = ((this.p[i].mass * 50)/r) - ((this.p[i].mass * 5000)/Math.pow(r,2));
				var Xprop = -(this.p[i].x-width/2)/r;
				var Yprop = -(this.p[i].y-height/2)/r;
				this.p[i].applyForce(mag*Xprop,mag*Yprop);
			}
		this.p[i].update();
	}
	
	this.show = function(){
		strokeWeight(4);
		var a;
		var b;
		for(i = 0; i < this.l.length; i++){
			a = this.p[this.l[i][0]]
			b = this.p[this.l[i][1]]
			if(a.selected || b.selected){
				stroke(100,0,100,80);
				strokeWeight(6);
			} else {
				stroke(100,0,100,20);
				strokeWeight(3);
			}
			line(a.x,a.y,b.x,b.y);
		}
		for(i = 0; i < this.p.length; i++){
			this.p[i].show();
		}
	}
	
	this.click = function(x,y){
		for(i = 0; i < this.p.length; i++){
			if(dist(x,y,this.p[i].x,this.p[i].y) < this.p[i].mass/8){
				if(!this.anySelected && !this.p[i].selected){
					this.p[i].selected = true;
					this.anySelected = true;
					this.currentSelected = i;
					this.nameSelected = this.p[i].name;
					this.contentSelected = this.p[i].content;
				} else if (this.p[i].selected) {
					this.p[i].selected = false;
					this.anySelected = false;
					this.currentSelected = "none";
					this.nameSelected = "...";
					this.contentSelected = "...";
				} else if (this.anySelected && !this.p[i].selected){
					this.p[this.currentSelected].selected = false;
					this.p[i].selected = true;
					this.currentSelected = i;
					this.nameSelected = this.p[i].name;
					this.contentSelected = this.p[i].content;
				}
				break;
			}
		}
	}
	
	this.hover = function(x,y){
		for(i = 0; i < this.p.length; i++){
			if(dist(x,y,this.p[i].x,this.p[i].y) < this.p[i].mass/8){
				return this.p[i].name;
			}
		}
		return "...";
	}
	
	}
}