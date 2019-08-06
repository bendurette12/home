

function Rascal()
{
	this.color = "orange";

	this.path = path1;

	this.x = 50;
	this.y = 300;
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


var distance = 0;

Rascal.prototype.checkPath = function()
{
/*
	if(this.path[0][0] == 0) //circle pattern
	{

	}
	else if(this.path[0][0] == 1) //oscillate pattern
	{
		add loop for oscillating 
		check xMax and yMax elements, if greater than both then increment state 
	}
*/


	if(distance > 700)
	{
		this.xSpeed = this.path[1][0];
	}
	else if(distance < 100)
	{
		this.xSpeed = this.path[0][0];
	}
}


Rascal.prototype.update = function(delta)
{
	if(!delta) return;

	this.checkPath();

	this.x += this.xSpeed*delta;

	distance += this.xSpeed*delta;
}


