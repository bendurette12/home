const cvs = document.getElementById("gurg");
const ctx = cvs.getContext("2d");

const boardHeight = 800;
const boardWidth = 800;

ctx.fillStyle = "white";
ctx.fillRect(0,0,boardWidth,boardHeight);


let g = new Gurg();
let r = new Rascal(50,300,path1);

drawGurg(g.x,g.y,g.height,g.width,g.color);
drawRascal(r.x, r.y ,r.height,r.width, r.color);




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
	r.update(delta);
	drawRascal(r.x,r.y,r.height,r.width,r.color);
	drawGurg(g.x,g.y,g.height,g.width,g.color);

	requestAnimationFrame(gameLoop);
	
}
gameLoop();


