//Collision


function collisionP()
{
	//gNextX = g.x + (delta * g.xSpeed);
	//gNextY = g.y + (delta * g.ySpeed);
	//rNextX = r.x + (delta * r.xSpeed);
	//rNextY = r.y + (delta * r.ySpeed);

	console.log(g.x < (r.x + r.width));
	console.log(g.x > (r.x - g.width));
	console.log("bop");

	if((g.x > (r.x - g.width)) && (g.x < (r.x + r.width)))
	{
		alert("You Dead :(");
		gameOver = true;
	}

}

//alert("Game Over");