document.addEventListener("keydown",event => 
{
	switch(event.keyCode)
	{
		case 37:
			g.moveLeft();
			break;

		case 39:
			g.moveRight();
			break;

		case 38:
			g.moveUp();
			break;

		case 40:
			g.moveDown();
			break;
	}
});

document.addEventListener("keyup",event => 
{
	switch(event.keyCode)
	{
		case 37: //left
			g.xStop(); 
			break;

		case 39: //right
			g.xStop();
			break;

		case 38: //up
			g.yStop();
			break;

		case 40: //down
			g.yStop();
			break;
	}
});
