/*
//get reference to table body
const scoreBody = document.querySelector("#highScores > tbody");

//console.log(scoreBody);
var scores = 0;
function loadScores ()
{
	const xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
  		if (this.readyState == 4 && this.status == 200) {
    		scores = JSON.parse(this.responseText);
    		populateScores(scores);
  		}
	};
	xmlhttp.open("GET", "HighScore.txt", true);
	xmlhttp.send();
}

function populateScores (json)
{
	//console.log(json);

	//emptys table
	while(scoreBody.firstChild)
	{
		scoreBody.removeChild(scoreBody.firstChild);
	}

	//populate table
	json.forEach((row) => {
		const tr = document.createElement("tr");

		var tdName = document.createElement("td");
		tdName.textContent = row.name;
		tr.appendChild(tdName);

		var tdScore = document.createElement("td");
		tdScore.textContent = row.score;
		tr.appendChild(tdScore);

		var tdDate = document.createElement("td");
		tdDate.textContent = row.date;
		tr.appendChild(tdDate);

		//tr.appendChild(row.name);
		//tr.appendChild(row.score);
		//tr.appendChild(row.date);
		//console.log(row.name);
		//console.log(row.score);
		//console.log(row.date);

		scoreBody.appendChild(tr);
	});
}

//document.addEventListener("DOMContentLoaded", () => { loadScores(); });
document.addEventListener("DOMContentLoaded", loadScores);



//check if users score is high score
function checkCurrentScore()
{
	if(scores[scores.length-1].score < score)
	{
		console.log("boop");
		//ask for name

		//get date

		//add name, score, date to array

		//save array back to text file
	}
	return;
}

//save scores to file
