

function Gurg()
{
	this.color = "blue";

	this.x = 400;
	this.y = 400;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.maxSpeed = 7;

	this.height = 30;
	this.width = 30;
}


function drawGurg(x,y,height,width,color)
{
	ctx.fillStyle = color;
	ctx.fillRect(x,y,height,width);
}


Gurg.prototype.moveLeft = function() 
{
	this.xSpeed = -this.maxSpeed;
}
Gurg.prototype.moveRight = function() 
{
	this.xSpeed = this.maxSpeed;
}
Gurg.prototype.moveUp = function() 
{
	this.ySpeed = -this.maxSpeed;
}
Gurg.prototype.moveDown = function() 
{
	this.ySpeed = this.maxSpeed;
}
Gurg.prototype.xStop = function() 
{
	this.xSpeed = 0;
}
Gurg.prototype.yStop = function() 
{
	this.ySpeed = 0;
}

Gurg.prototype.update = function(delta)
{
	if(!delta) return;

	this.x += this.xSpeed;
	this.y += this.ySpeed;
}