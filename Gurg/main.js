const cvs = document.getElementById("gurg");
const ctx = cvs.getContext("2d");

const boardHeight = 800;
const boardWidth = 800;

ctx.fillStyle = "white";
ctx.fillRect(0,0,boardWidth,boardHeight);


let g = new Gurg();
let chopper = new Chopper();
let shots = [];
//let r = new Rascal();
let baddies = [];
baddies.push(new Rascal(300, 300, path1));
baddies.push(new Rascal(200, 400, path1));
baddies.push(new Rascal(500, 700, path1));

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


	chopper.update();
	for(i=0; i < shots.length; i++)
	{
		shotRemoved = 0;
		shotRemoved = shots[i].update(delta, i);
		if(shotRemoved == 0)
		{
			drawShot(shots[i].x, shots[i].y, shots[i].size, shots[i].size, shots[i].color);
		}
		else
		{
			i--;
		}
	}
	for(i=0; i < baddies.length; i++)
	{
		baddies[i].update(delta);
		drawRascal(baddies[i].x, baddies[i].y, baddies[i].width, baddies[i].height, baddies[i].color);
	}
	drawGurg(g.x,g.y,g.width,g.height,g.color);
	drawChopper();

	collisionP();
	if(!gameOver)
	{
		requestAnimationFrame(gameLoop);
	}

	//"unchop" so that the player can't leave their weapon activated indefinitely
	//chop = NotPressed;
}
gameLoop();


