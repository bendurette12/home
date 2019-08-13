

function Rascal(x,y)
{
	this.color = "orange";

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


Rascal.prototype.moveLeft = function() 
{
	this.xSpeed = -this.maxSpeed;
}
Rascal.prototype.moveRight = function() 
{
	this.xSpeed = this.maxSpeed;
}
Rascal.prototype.moveUp = function() 
{
	this.ySpeed = -this.maxSpeed;
}
Rascal.prototype.moveDown = function() 
{
	this.ySpeed = this.maxSpeed;
}
Rascal.prototype.xStop = function() 
{
	this.xSpeed = 0;
}
Rascal.prototype.yStop = function() 
{
	this.ySpeed = 0;
}

Rascal.prototype.update = function(delta)
{
	if(!delta) return;

	this.x += this.xSpeed;
	this.y += this.ySpeed;
}