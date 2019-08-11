const sheathed = 0;
const up = 1;
const down = 2;
const left = 3;
const right = 4;


function Chopper()
{
	this.color = "black";
	this.length = 40;
	this.width = 5;
	this.x = null;
	this.y = null;
	this.direction = sheathed;
}

function drawChopper()
{
	if(chopper.direction == sheathed)
	{
		return;
	}

	if(chopper.direction == up || chopper.direction == down)
	{
		ctx.fillStyle = chopper.color;
		ctx.fillRect(chopper.x,chopper.y,chopper.width,chopper.length);
	}

	if(chopper.direction == left || chopper.direction == right)
	{
		ctx.fillStyle = chopper.color;
		ctx.fillRect(chopper.x,chopper.y,chopper.length,chopper.width);
	}
}

Chopper.prototype.chopUp = function()
{
	this.direction = up;
}

Chopper.prototype.chopDown = function()
{
	this.direction = down;
}

Chopper.prototype.chopLeft = function()
{
	this.direction = left;
}

Chopper.prototype.chopRight = function()
{
	this.direction = right;
}

Chopper.prototype.sheath = function()
{
	this.direction = sheathed;
}

Chopper.prototype.update = function()
{
	if(chopper.direction == sheathed)
	{
		return;
	}

	else if(chopper.direction == up)
	{
		chopper.x = g.x + g.width/2 - chopper.width/2;
		chopper.y = g.y - chopper.length;
	}

	else if(chopper.direction == down)
	{
		chopper.x = g.x + g.width/2 - chopper.width/2;
		chopper.y = g.y + g.height;
	}

	else if(chopper.direction == left)
	{
		chopper.x = g.x - chopper.length;
		chopper.y = g.y + g.width/2 - chopper.width/2;
	}

	else if(chopper.direction == right)
	{
		chopper.x = g.x + g.width;
		chopper.y = g.y + g.width/2 - chopper.width/2;
	}
}