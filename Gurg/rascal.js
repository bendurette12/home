

function Rascal()
{
	this.color = "orange";

	this.x = 300;
	this.y = 300;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.maxSpeed = 7;

	this.radius = 20;
}


function drawRascal(x,y,radius,color)
{
	ctx.fillStyle = color;
	ctx.arc(x,y,radius, 2*Math.PI, 0);
	ctx.fill();
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