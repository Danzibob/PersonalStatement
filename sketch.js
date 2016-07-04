var frame = 0;
var p;
var anySelected = false;
  function setup(){
    createCanvas(600, 600);
	colorMode(HSB, 100);
	p = [];
	for(i = 0; i < 40; i++){
		p.push(new node());
	}
  }
  function draw(){
	frame += 0.01;
    background(0);
	//p.applyForce(noise(frame)-0.5,noise(frame+300)-0.5);
	for(i = 0; i < p.length; i++){
		if(!p[i].selected){
			for(j = 0; j < p.length; j++){
				if(j != i){
					var r = dist(p[i].x,p[i].y,p[j].x,p[j].y)
					var mag = (p[i].mass * p[j].mass)/(Math.pow(r,2));
					var Xprop = (p[i].x-p[j].x)/r;
					var Yprop = (p[i].y-p[j].y)/r;
					p[i].applyForce(mag*Xprop,mag*Yprop);
				}
			}
			var r = dist(p[i].x,p[i].y,width/2,height/2)
			var mag = ((p[i].mass * 50)/r) - ((p[i].mass * 5000)/Math.pow(r,2));
			var Xprop = -(p[i].x-width/2)/r;
			var Yprop = -(p[i].y-height/2)/r;
			p[i].applyForce(mag*Xprop,mag*Yprop);
		} else {
			p[i].x = width/2;
			p[i].y = height/2;
		}
		p[i].update();
		p[i].show();
	}
	
 }
 
 function mousePressed(){
	for(i = 0; i < p.length; i++){
		if(dist(mouseX,mouseY,p[i].x,p[i].y) < p[i].mass/8){
			if(!anySelected && !p[i].selected){
				p[i].selected = true;
				anySelected = true;
			} else if (p[i].selected) {
				p[i].selected = false;
				anySelected = false;
			}
			break
		}
	}
 }
 
 