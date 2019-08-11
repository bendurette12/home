

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
	if(chopper.direction == sheathed)
	{
		return;
	}
	
	for(i=0; i < baddies.length; i++)
	{
		if(chopper.direction == 1 || chopper.direction == 2)
		{
			if((chopper.x > (baddies[i].x - chopper.width)) && (chopper.x < (baddies[i].x + baddies[i].width))  &&  (chopper.y > (baddies[i].y - chopper.length)) && (chopper.y < (baddies[i].y + baddies[i].height)))
			{
				baddies.splice(i,1);
			}
		}

		else if(chopper.direction == 3 || chopper.direction == 4)
		{
			if((chopper.x > (baddies[i].x - chopper.length)) && (chopper.x < (baddies[i].x + baddies[i].width))  &&  (chopper.y > (baddies[i].y - chopper.width)) && (chopper.y < (baddies[i].y + baddies[i].height)))
			{
				baddies.splice(i,1);
			}
		}
	}

}