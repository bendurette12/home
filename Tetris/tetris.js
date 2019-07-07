const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const progressToNextLevelElement = document.getElementById("progressTowardsNextLevel");
const rowsClearedElement = document.getElementById("rowsCleared");

const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 20;
const VACANT = "WHITE"; //color of empty square

const QueueROW = 10;
const QueueCOL = 6;
const QueueXOffset = 12;
const QueueYOffset = 0;
const Queue1X = 1;
const Queue1Y = 1;
const Queue2X = 1;
const Queue2Y = 4;
const Queue3X = 1;
const Queue3Y = 7;

const HoldROW = 6;
const HoldCOL = 6;
const HoldXOffset = 12;
const HoldYOffset = 14;
const HoldPieceX = 1;
const HoldPieceY = 1;
let HoldUsed = 0;

//draw a square
function drawSquare(x,y,color)
{
	ctx.fillStyle = color;
	ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

	ctx.strokeStyle = "BLACK";
	ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}
//drawSquare(1,1,"GREEN");


//create the board
let board = [];
for(r = 0; r < ROW; r++)
{
	board[r] = [];
	for(c = 0; c < COL; c++)
	{
		board[r][c] = VACANT;
	}
}


//draw the board
function drawBoard()
{
	for(r = 0; r < ROW; r++)
	{
		for(c = 0; c < COL; c++)
		{
			drawSquare(c,r,board[r][c]);
		}
	}
}

drawBoard();


//create Queue
let queue = [];
for(r = 0; r < QueueROW; r++)
{
	queue[r] = [];
	for(c = 0; c < QueueCOL; c++)
	{
		queue[r][c] = VACANT;
	}
}

//draw Queue
function drawQueue()
{
	for(r = 0; r < QueueROW; r++)
	{
		for(c=0; c < QueueCOL; c++)
		{
			drawSquare(c+QueueXOffset,r+QueueYOffset,queue[r][c])
		}
	}
}

drawQueue();


//create Hold box
let hold = [];
for(r = 0; r < HoldROW; r++)
{
	hold[r] = [];
	for(c = 0; c < HoldCOL; c++)
	{
		hold[r][c] = VACANT;
	}
}

//draw Queue
function drawHold()
{
	for(r = 0; r < HoldROW; r++)
	{
		for(c=0; c < HoldCOL; c++)
		{
			drawSquare(c+HoldXOffset,r+HoldYOffset,hold[r][c])
		}
	}
}

drawHold();


//the pieces and their colors
const PIECES = 
[
	[Z,"#F42121"], //red
	[S,"#1E8449"], //green
	[T,"#8E44AD"], //purple
	[O,"#F1C40F"], //yellow
	[L,"#E67E22"], //orange
	[I,"#00CFFF"], //light blue
	[J,"#126CFC"]  //dark blue
];


//generate random pieces
function randomPiece()
{
	let r = randomN = Math.floor(Math.random() * PIECES.length)
	return new Piece( PIECES[r][0],PIECES[r][1]);
}



let p = randomPiece();

let q1 = randomPiece();
q1.x = QueueXOffset + Queue1X;
q1.y = QueueYOffset + Queue1Y;
if(q1.tetromino == O) {q1.y = q1.y - 1;}

let q2 = randomPiece();
q2.x = QueueXOffset + Queue2X;
q2.y = QueueYOffset + Queue2Y;
if(q2.tetromino == O) {q2.y = q2.y - 1;}

let q3 = randomPiece();
q3.x = QueueXOffset + Queue3X;
q3.y = QueueYOffset + Queue3Y;
if(q3.tetromino == O) {q3.y = q3.y - 1;}

let h = null;

//The Object Piece
function Piece(tetromino,color)
{
	this.tetromino = tetromino;
	this.color = color;

	this.tetrominoN = 0; //we start from the first pattern
	this.activeTetromino = this.tetromino[this.tetrominoN];

	//we need to control the pieces
	this.x = 3;
	this.y = -2;
}


//fill piece 
Piece.prototype.fill = function(color)
{
	for(r = 0; r < this.activeTetromino.length; r++)
	{
		for(c = 0; c < this.activeTetromino.length; c++)
		{
			if(this.activeTetromino[r][c])
			{
				drawSquare(this.x + c,this.y + r,color);
			}
		}
	}
}

//draw a piece to the board
Piece.prototype.draw = function()
{
	this.fill(this.color);
}

//undraw
Piece.prototype.unDraw = function()
{
	this.fill(VACANT);
}


//move piece down
Piece.prototype.moveDown = function() 
{
	if(!this.collision(0,1,this.activeTetromino))
	{
		this.unDraw();
		this.y++;
		this.draw();
	}
	else
	{
		//lock the piece and create a new one
		this.lock();
		nextPiece();
	}
}

//move piece right
Piece.prototype.moveRight = function() 
{
	if(!this.collision(1,0,this.activeTetromino))
	{
		this.unDraw();
		this.x++;
		this.draw();
	}
}

//move piece left
Piece.prototype.moveLeft = function() 
{
	if(!this.collision(-1,0,this.activeTetromino))
	{
		this.unDraw();
		this.x--;
		this.draw();
	}
}

//rotate piece
Piece.prototype.rotate = function() 
{
	let nextPattern = this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
	let kick = 0;

	if(this.collision(0,0,nextPattern))
	{
		if(this.x > COL/2)
		{
			//it's the right wall
			kick = -1;
		}
		else
		{
			//it's the left wall
			kick = 1;
		}
	}
	if(!this.collision(kick,0,nextPattern))
	{
		this.unDraw();
		this.x += kick;
		this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length;
		this.activeTetromino = this.tetromino[this.tetrominoN];
		this.draw();
	}
}

//rotate piece
Piece.prototype.hold = function() 
{
	if(!h)
	{
		h = p;
		p.unDraw();
		nextPiece();

		h.x = HoldXOffset + HoldPieceX;
		h.y = HoldYOffset + HoldPieceY;
		h.draw();

		HoldUsed = 1;
	}
	else if(HoldUsed == 0)
	{
		let temp = p;
		h.unDraw();
		p.unDraw();

		p = h;
		p.x = 3;
		p.y = 0;

		h = temp;
		h.x = HoldXOffset + HoldPieceX;
		h.y = HoldYOffset + HoldPieceY;

		h.draw();
		p.draw();

		HoldUsed = 1;
	}
}

//Drop piece
Piece.prototype.hardDrop = function()
{
	while(!this.collision(0,1,this.activeTetromino))
	{
		this.unDraw();
		this.y++;
		this.draw();
	}
	
	//lock the piece and create a new one
	this.lock();
	nextPiece();
}

let score = 0;
let rowsCleared=0;
let progressToNextLevel = 0
let level = 1;

//lock piece
Piece.prototype.lock = function()
{
	for(r = 0; r < this.activeTetromino.length; r++)
	{
		for(c = 0; c < this.activeTetromino.length; c++)
		{
			//skip vacant pieces
			if(!this.activeTetromino[r][c])
			{
				continue;
			}
			//pieces to lock on top = game over
			if(this.y + r < 0)
			{
				alert("Game Over");
				//stop request animation fram
				gameOver = true;
				break;
			}
			//we lock the piece
			board[this.y+r][this.x+c] = this.color;
		}
	}
	
	//remove full rows
	for(r = 0; r < ROW; r++)
	{
		let isRowFull = true;
		for(c = 0; c < COL; c++)
		{
			isRowFull = isRowFull && (board[r][c] != VACANT);
		}
		if(isRowFull)
		{
			//if the row is full, move down all the rows above
			for(y = r; y > 1; y--)
			{
				for(c = 0; c < COL; c++)
				{
					board[y][c] = board[y-1][c];
				}
			}
			//the top row board[0][..] has no row above it
			for(c = 0; c < COL; c++)
			{
				board[0][c] = VACANT;
			}
			
			//increment the score
			//score += 10;
			//score now calculated 
			
			//increment the number of rows completed
			rowsCleared++;
			//if(progressToNextLevel == 2)
			//{
			//	progressToNextLevel = 0;
			//	level++;
			//}
		}
	}
	
	updateScoreNLevel();
	
	//update the board
	drawBoard();	

	//update the score
	scoreElement.innerHTML = score;
	
	//update the level
	levelElement.innerHTML = level;
	
	//FOR TESTING
	progressToNextLevelElement.innerHTML = progressToNextLevel;
	//

	HoldUsed = 0;
}

//Update Level and score
function updateScoreNLevel()
{
	if(rowsCleared == 1)
	{
		progressToNextLevel += 1;
		score = score + (10 * level);
	}
	else if(rowsCleared == 2)
	{
		progressToNextLevel += 3;
		score = score + (30 * level);
	}
	else if(rowsCleared == 3)
	{
		progressToNextLevel += 6;
		score = score + (60 * level);
	}
	else if(rowsCleared == 4)
	{
		progressToNextLevel += 10;
		score = score + (100 * level);
	}
	
	//FOR TESTING
	rowsClearedElement.innerHTML = rowsCleared;
	//
	
	rowsCleared = 0;
	
	if(progressToNextLevel > 15)
	{
		level++;
		progressToNextLevel = progressToNextLevel%15;
	}
}



//collision function
Piece.prototype.collision = function(x,y,piece)
{
	for(r = 0; r < piece.length; r++)
	{
		for(c = 0; c < piece.length; c++)
		{
			//if the square is empty, we skip it
			if(!piece[r][c])
			{
				continue;
			}
			//coordinates of the piece after movement
			let newX = this.x + c + x;
			let newY = this.y + r + y;

			//conditions
			if(newX < 0 || newX >= COL || newY >= ROW)
			{
				return true;
			}
			//skip newY < 0; board[-1] will crash grame
			if(newY < 0)
			{
				continue;
			}
			//check if there is a locked piece already in place
			if(board[newY][newX] != VACANT)
			{
				return true;
			}
		}
	}
}

document.addEventListener("keydown",CONTROL);

function CONTROL(event)
{
	if(event.keyCode == 37)
	{
		p.moveLeft();
		//dropStart = Date.now();
	}
	else if(event.keyCode == 38)
	{
		p.rotate();
		//dropStart = Date.now();
	}
	else if(event.keyCode == 39)
	{
		p.moveRight();
		//dropStart = Date.now();
	}
	else if(event.keyCode == 40)
	{
		p.moveDown();
		dropStart = Date.now();
	}
	else if(event.keyCode == 67)
	{
		p.hold();
	}
	else if(event.keyCode == 32)
	{
		p.hardDrop();
		dropStart = Date.now();
	}
}

let dropStart = Date.now();
let gameOver = false;
function drop()
{
	let now = Date.now();
	let delta = now - dropStart;
	if(delta > 1000)
	{
		p.moveDown();
		dropStart = Date.now();
	}
	if(!gameOver)
	{
		requestAnimationFrame(drop);
	}
}
drop();


q1.draw();
q2.draw();
q3.draw();


function nextPiece()
{
	//undraw them all
	q1.unDraw();
	q2.unDraw();
	q3.unDraw();

	//update p from next on queue
	p = q1;
	p.x = 3;
	p.y = -2;

	//update q1
	q1 = q2;
	q1.y = q1.y - 3;

	//udpate q2
	q2 = q3;
	q2.y = q2.y - 3;

	//create new q3 and move up one space if O because it is a 4x4 instead of 3x3
	q3 = randomPiece();
	q3.x = QueueXOffset + Queue3X;
	q3.y = QueueYOffset + Queue3Y;
	if(q3.tetromino == O) {q3.y = q3.y - 1;}


	q1.draw();
	q2.draw();
	q3.draw();
}

