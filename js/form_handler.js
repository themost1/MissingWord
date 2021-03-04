document.getElementById( "myForm" ).addEventListener( "submit", function ( event ) {
    	event.preventDefault();
    	JavaScript:check();
  	} );

function check() {
	var guess = document.getElementById("guess").value;
	if (guess == document.getElementById("spank").name){
		document.getElementById("guidance_text").innerHTML = "You did it! The answer was " + guess + ".";
	} else {
		var candidates = getWrongAnswerTextOptions()
		var rngNum = Math.floor(Math.random() * candidates.length)
		document.getElementById("guidance_text").innerHTML = "You guessed \"" + guess + "\". " + candidates[rngNum];
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

function testForm() {
	var nameValue = document.getElementById("guess").value;
	document.getElementById("wank").innerHTML = nameValue;
	document.getElementById("guess").value = "";
}