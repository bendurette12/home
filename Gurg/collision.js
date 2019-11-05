

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
	if(chopper.direction != sheathed)
	{
		for(i=0; i < baddies.length; i++)
		{
			if(chopper.direction == up || chopper.direction == down)
			{
				if((chopper.x > (baddies[i].x - chopper.width)) && (chopper.x < (baddies[i].x + baddies[i].width))  &&  (chopper.y > (baddies[i].y - chopper.length)) && (chopper.y < (baddies[i].y + baddies[i].height)))
				{
					baddies.splice(i,1);
				}
			}

			else if(chopper.direction == left || chopper.direction == right)
			{
				if((chopper.x > (baddies[i].x - chopper.length)) && (chopper.x < (baddies[i].x + baddies[i].width))  &&  (chopper.y > (baddies[i].y - chopper.width)) && (chopper.y < (baddies[i].y + baddies[i].height)))
				{
					baddies.splice(i,1);
				}
			}
		}
	}

	//check if any bullets hit a baddie
	for(i=0; i < baddies.length; i++)
	{
		for(k=0; k < shots.length; k++)
		{
			console.log(baddies.length);
			console.log(baddies[i]);
			console.log(i);
			console.log(baddies[i].x);
			if((shots[k].x > (baddies[i].x - shots[k].size)) && (shots[k].x < (baddies[i].x + baddies[i].width))  &&  (shots[k].y > (baddies[i].y - shots[k].size)) && (shots[k].y < (baddies[i].y + baddies[i].height)))
			{
				console.log("hit");
				baddies.splice(i,1);
				shots.splice(k,1);
				if(baddies.length == 0)
					break;
				if(k>0)
					k--;
				if(i>0)
					i--;
			}
		}
	}

}