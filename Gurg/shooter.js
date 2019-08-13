//Shooter

const shotSpeed = .4;
function Shot(xSpeed, ySpeed)
{
	this.color = "black";
	this.x = g.x + g.width/2;
	this.y = g.y + g.height/2;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.size = 3;
}

Shot.prototype.update = function(delta, i)
{
	if(!delta) return;

	this.x += this.xSpeed*delta;
	this.y += this.ySpeed*delta;

	if(this.x > boardWidth || this.y > boardHeight || this.x < 0 || this.y < 0)
	{
		shots.splice(i,1);
		return "1";
	}
	return "0";
}

function drawShot(x,y,height,width,color)
{
	ctx.fillStyle = color;
	ctx.fillRect(x,y,height,width);
}

function shootUp()
{
	shots.push(new Shot(0,-shotSpeed));
}
function shootDown()
{
	shots.push(new Shot(0,shotSpeed));
}

function shootLeft()
{
	shots.push(new Shot(-shotSpeed,0));
}

function shootRight()
{
	shots.push(new Shot(shotSpeed,0));
}

