document.getElementById( "myForm" ).addEventListener( "submit", function ( event ) {
    	event.preventDefault();
    	JavaScript:check();
  	}
);

document.getElementById( "forfeit" ).addEventListener( "click", function ( event ) {
    	event.preventDefault();
    	JavaScript:forfeit();
  	}
);

function check() {

	var guess = document.getElementById("guess").value;

	if (guess == document.getElementById("spank").name){
		setGuidanceText("You did it! The answer was \"" + guess + ".\" We're generating a new question....")
		document.getElementById("guesses").innerHTML = ""
		setTimeout(loadNewGame, 3000)
	} else {
		var candidates = getWrongAnswerTextOptions()
		var rngNum = Math.floor(Math.random() * candidates.length)
		document.getElementById("guidance_text").innerHTML = "You guessed \"" + guess + ".\" " + candidates[rngNum];
		document.getElementById("guesses").innerHTML = guess + "<p></p>" + document.getElementById("guesses").innerHTML
	}

	document.getElementById("guess").value = "";
}

function getWrongAnswerTextOptions() {
	return [
		"Not quite....",
		"Wrong!",
		"Incorrect, loser."
	];
}

function forfeit() {
		setGuidanceText("The answer was \"" + document.getElementById("spank").name + ".\" We're generating a new question....")
		setTimeout(loadNewGame, 3000)
}

function testForm() {
	var nameValue = document.getElementById("guess").value;
	document.getElementById("wank").innerHTML = nameValue;
	document.getElementById("guess").value = "";
}