

function Gurg()
{
	this.color = "blue";

	this.x = 400;
	this.y = 400;
	this.height = 30;
	this.width = 30;
}


function drawGurg(x,y,height,width,color)
{
	ctx.fillStyle = color;
	ctx.fillRect(x,y,height,width);
}
