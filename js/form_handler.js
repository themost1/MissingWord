var hintsInitial = ["??", "??"]
var hints = hintsInitial
var letters = ""

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
	var answer = document.getElementById("spank").name;


	if (guess == answer){

		//This will at least notify the player they were correct.


		setGuidanceText("You did it! The answer was \"" + guess + ".\" We're generating a new question....");
		document.getElementById("guesses").innerHTML = "";
		document.getElementById("hints").innerHTML = ""
		hints = hintsInitial
		letters = ""
		setTimeout(loadNewGame, 3000)
	} else {

		//This will check to see if you earned any information, then post your guess to the page. 

		var info = false;
		var message = "You guessed \"" + guess + ".\" ";
		var hint = ""

		if (guess.substring(0, 2) == answer.substring(0, 2)){
			
			message = message + "The first two letters are right!";
			hints[0] = answer.substring(0, 2);
			info = true;
		} 

		if (guess.substring(guess.length -2) == answer.substring(answer.length -2)){

			message = message + "The last two letters are right!";
			hints[1] = answer.substring(answer.length -2);
			info = true;

		} 
		var flag = 0
		for (var i = 0; i < guess.length; i++){
			if (answer.indexOf(guess.substring(i,i+1)) > -1 && letters.indexOf(guess.substring(i,i+1)) == -1){
				letters = letters+guess.substring(i,i+1)
				flag = flag + 1
				if (flag == 2) {
					i = guess.length
				}
			}
		}

		if (info) {

				document.getElementById("guidance_text").innerHTML = message;
		
		} else {

				var candidates = getWrongAnswerTextOptions()
				var rngNum = Math.floor(Math.random() * candidates.length);
				document.getElementById("guidance_text").innerHTML = "You guessed \"" + guess + ".\" " + candidates[rngNum];

		}
		document.getElementById("guesses").innerHTML = guess + "<p></p>" + document.getElementById("guesses").innerHTML;
		document.getElementById("hints").innerHTML = "Begins with " + hints[0] + " Ends with "  + hints[1] + ". You've found the letters: " + letters + ". (Max two per entry)";
	}


	document.getElementById("guess").value = "";


}

function forfeit() {
		setGuidanceText("The answer was \"" + document.getElementById("spank").name + ".\" We're generating a new question....")
		document.getElementById("guesses").innerHTML = ""
		setTimeout(loadNewGame, 3000)
}











function getWrongAnswerTextOptions() {
	return [
		"Incorrect.",
		"Not right.",
		"Unfortunately, no."
	];
}



function testForm() {
	var nameValue = document.getElementById("guess").value;
	document.getElementById("wank").innerHTML = nameValue;
	document.getElementById("guess").value = "";
}