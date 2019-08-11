const cvs = document.getElementById("gurg");
const ctx = cvs.getContext("2d");

const boardHeight = 800;
const boardWidth = 800;

ctx.fillStyle = "white";
ctx.fillRect(0,0,boardWidth,boardHeight);


let g = new Gurg();
let chopper = new Chopper();
//let r = new Rascal();
let baddies = [];
baddies.push(new Rascal(300, 300));
baddies.push(new Rascal(200, 400));
baddies.push(new Rascal(500, 700));

drawGurg(g.x,g.y,g.width,g.height,g.color);
//draw bad guys
for(i=0; i < baddies.length; i++)
{
	drawRascal(baddies[i].x, baddies[i].y, baddies[i].width, baddies[i].height, baddies[i].color);
}

let gameOver = false;
let lastTime = 0;
function gameLoop(timestamp)
{
	let delta = timestamp - lastTime;
	lastTime = timestamp;

	if (g.x > boardWidth)
	{
		g.x = -30;
	}
	if (g.x < -30)
	{
		g.x = boardWidth;
	}

	if (g.y > boardHeight)
	{
		g.y = -30;
	}
	if (g.y < -30)
	{
		g.y = boardHeight;
	}
	if (delta > 17) console.log(delta);
// 	drawGurg(g.x,g.y,g.width,g.height,"white");
	ctx.clearRect(0,0,boardWidth,boardHeight);
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,boardWidth,boardHeight);
	g.update(delta);
	//r.update(delta);
	for(i=0; i < baddies.length; i++)
	{
		baddies[i].update(delta);
		drawRascal(baddies[i].x, baddies[i].y, baddies[i].width, baddies[i].height, baddies[i].color);
	}
	drawGurg(g.x,g.y,g.width,g.height,g.color);
	chopper.x = g.x + (g.width/2);
	chopper.y = g.y + (g.height/2);
	drawChopper(chopper.x,chopper.y,chopper.length,chopper.width,chopper.direction,chopper.color);

	collisionP();
	if(!gameOver)
	{
		requestAnimationFrame(gameLoop);
	}

	//"unchop" so that the player can't leave their weapon activated indefinitely
	//chop = NotPressed;
}
gameLoop();


