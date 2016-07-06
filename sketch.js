//node([name,links,content,weight])

var node_details = JSON.parse(nodes);
var frame = 0;
var hoverText,nameText,contentText;
var g;

function setup(){
    cnv = createCanvas(600, 600);
	cnv.parent("#cnvContainer");
	colorMode(HSB, 100);
	g = new graph(node_details);
	hoverText = select("#hover");
	nameText = select("#name");
	contentText = select("#content");
	
}
  
function draw(){
    background(0);
	g.update();
	g.show();
	hoverText.html(g.hover(mouseX,mouseY));
	nameText.html(g.nameSelected);
	contentText.html(g.contentSelected);
}
 
 function mousePressed(){
	g.click(mouseX,mouseY);
 }
 
 