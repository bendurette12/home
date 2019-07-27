const cvs = document.getElementById("gurg");
const ctx = cvs.getContext("2d");

const boardHeight = 800;
const boardWidth = 800;

ctx.fillStyle = "white";
ctx.fillRect(0,0,boardWidth,boardHeight);


let g = new Gurg();

drawGurg(g.x,g.y,g.width,g.height,g.color);





let lastTime = 0;
function gameLoop(timestamp)
{
	let delta = timestamp - lastTime;
	lastTime = timestamp;

	if (g.x > boardWidth)
	{
		g.x = -30;
	}

// 	drawGurg(g.x,g.y,g.width,g.height,"white");
	ctx.clearRect(0,0,boardWidth,boardHeight);
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,boardWidth,boardHeight);
	g.update(delta);
	drawGurg(g.x,g.y,g.width,g.height,g.color);

	requestAnimationFrame(gameLoop);
	
}
gameLoop();


