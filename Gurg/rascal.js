
function Rascal(x,y,path)
{
	this.color = "green";

	this.path = path;
	this.pathState = 0;
	this.xPathDistance = 0;
	this.yPathDistance = 0;
	this.x = x;
	this.y = y;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.maxSpeed = 7;

	this.height = 30;
	this.width = 30;
}


function drawRascal(x,y,height,width,color)
{
	ctx.fillStyle = color;
	ctx.fillRect(x,y,height,width);
}


Rascal.prototype.checkPath = function()
{

	if((this.xPathDistance >= this.path[this.pathState][xPathMax]) && 
		(this.yPathDistance >= this.path[this.pathState][yPathMax]))
	{
		this.pathState = (this.pathState + 1)%this.path.length;

		this.xPathDistance = 0;
		this.yPathDistance = 0;

	}
	this.xSpeed = this.path[this.pathState][xPathSpeed];
	this.ySpeed = this.path[this.pathState][yPathSpeed];
}


Rascal.prototype.update = function(delta)
{
	if(!delta) return;

	this.checkPath();

	this.x += this.xSpeed*delta; 
	this.y += this.ySpeed*delta; 

	this.xPathDistance += Math.abs(this.xSpeed*delta);
	this.yPathDistance += Math.abs(this.ySpeed*delta);
}


