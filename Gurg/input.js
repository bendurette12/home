const NotPressed = 0;
const Pressed = 1;

var upArrow = NotPressed;
var downArrow = NotPressed;
var leftArrow = NotPressed;
var rightArrow = NotPressed;

document.addEventListener("keydown",event => 
{
	switch(event.keyCode)
	{
		case 37:
			g.moveLeft();
			leftArrow = Pressed;
			break;

		case 39:
			g.moveRight();
			rightArrow = Pressed;
			break;

		case 38:
			g.moveUp();
			upArrow = Pressed;
			break;

		case 40:
			g.moveDown();
			downArrow = Pressed;
			break;

		case 69: //e, changes to melee weapon
			g.melee();
			break;

		case 82: //r, changes to ranged weapon
			g.ranged();
			break;

		case 87: //w
			if(g.weapon == ranged)
			{
				//shoot a thing
				shootUp();
			}
			else
			{
				chopper.chopUp();
			}
			break;

		case 83: //s
			if(g.weapon == ranged)
			{
				//shoot a thing
				shootDown();
			}
			else
			{
				chopper.chopDown();
			}
			break;

		case 65: //a
			if(g.weapon == ranged)
			{
				//shoot a thing
				shootLeft();
			}
			else
			{
				chopper.chopLeft();
			}
			break;

		case 68: //d
			if(g.weapon == ranged)
			{
				//shoot a thing
				shootRight();
			}
			else
			{
				chopper.chopRight();
			}
			break;
	}
});

document.addEventListener("keyup",event => 
{
	switch(event.keyCode)
	{
		case 37: //left
			if (rightArrow == Pressed) g.moveRight(); //yes
			else if (g.xSpeed < 0) g.xStop();
			leftArrow = NotPressed; 
			break;

		case 39: //right
			if (leftArrow == Pressed) g.moveLeft();
			else if (g.xSpeed > 0) g.xStop();
			rightArrow = NotPressed;
			break;

		case 38: //up
			if (downArrow == Pressed) g.moveDown();
			else if (g.ySpeed < 0) g.yStop();
			upArrow = NotPressed;
			break;

		case 40: //down
			if (upArrow == Pressed) g.moveUp();
			else if (g.ySpeed > 0) g.yStop();
			downArrow = NotPressed;
			break;

		case 87: //w
			chopper.sheath();
			break;

		case 83: //s
			chopper.sheath();
			break;

		case 65: //a
			chopper.sheath();
			break;

		case 68: //d
			chopper.sheath();
			break;
	}
});
