const holstered = 0;
const up = 1;
const down = 2;
const left = 3;
const right = 4;


function Chopper()
{
	this.color = "black";
	this.length = 50;
	this.width = 5;
	this.x = null;
	this.y = null;
	this.direction = holstered;
}

function drawChopper(x,y,length,width,color,direction)
{
	console.log(x,y,length,width,color,direction);
	if(chopper.direction == 0)
	{
		console.log("returning");
		return;
	}
	else if(chopper.direction == up)
	{
		console.log("drawing up");
		ctx.fillStyle = color;
		ctx.fillRect(x-width,y-length,width,length);
	}

	else if(chopper.direction == down)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x,y,width,length);
	}

	else if(chopper.direction == left)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x-length,y-width,length,width);
	}

	else if(chopper.direction == right)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x,y,length,width);
	}
}

Chopper.prototype.chopUp = function()
{
	this.x = g.x;
	this.y = g.y;
	this.direction = up;
}

Chopper.prototype.chopDown = function()
{
	this.x = g.x;
	this.y = g.y;
	this.direction = down;
}

Chopper.prototype.chopLeft = function()
{
	this.x = g.x;
	this.y = g.y;
	this.direction = left;
}

Chopper.prototype.chopRight = function()
{
	this.x = g.x;
	this.y = g.y;
	this.direction = right;
}