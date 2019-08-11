

function collisionP()
{
	//check if Gurg ran into a bad guy
	for(i=0; i < baddies.length; i++)
	{
		if((g.x > (baddies[i].x - g.width)) && (g.x < (baddies[i].x + baddies[i].width))  &&  (g.y > (baddies[i].y - g.height)) && (g.y < (baddies[i].y + baddies[i].height)))
		{
			alert("You Dead :(");
			gameOver = true;
		}
	}

	//check if Gurg made a chop on a baddie	
	for(i=0; i < baddies.length; i++)
	{
		if((g.x > (baddies[i].x - g.width)) && (g.x < (baddies[i].x + baddies[i].width))  &&  (g.y > (baddies[i].y - g.height)) && (g.y < (baddies[i].y + baddies[i].height)))
		{
			alert("You Dead :(");
			gameOver = true;
		}
	}

}