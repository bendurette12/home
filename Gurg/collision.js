

function collisionP()
{
	//gNextX = g.x + (delta * g.xSpeed);
	//gNextY = g.y + (delta * g.ySpeed);
	//rNextX = r.x + (delta * r.xSpeed);
	//rNextY = r.y + (delta * r.ySpeed);

	//console.log(g.x < (r.x + r.width));
	//console.log(g.x > (r.x - g.width));
	//console.log("bop");

	for(i=0; i < baddies.length; i++)
	{
		if((g.x > (baddies[i].x - g.width)) && (g.x < (baddies[i].x + baddies[i].width))  &&  (g.y > (baddies[i].y - g.height)) && (g.y < (baddies[i].y + baddies[i].height)))
		{
			alert("You Dead :(");
			gameOver = true;
		}
	}
	

}

//alert("Game Over");