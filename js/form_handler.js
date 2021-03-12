var hints = ["??", "??"]
var letters = ""
var score = []

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

	var trueGuess = document.getElementById("guess").value.replaceAll(" ", "")
	var guess = document.getElementById("guess").value.toLowerCase().replaceAll(" ", ""); // guess is re
	var answer = document.getElementById("spank").name;
	console.log("guess: "+guess+" answer: " + answer)


	if (guess == answer.toLowerCase()){

		//This will at least notify the player they were correct.


		setGuidanceText("You did it! The answer was \"" + answer + ".\" We're generating a new question....");
		document.getElementById("guesses").innerHTML = "";
		document.getElementById("hints").innerHTML = ""
		hints = ["??", "??"]
		letters = ""
		var flag = (cache.currentGame[7] == false)
		if (flag) {
			setTimeout(loadNewGame, 10000)
		}

		loadBlank(cache.currentGame)

		if (flag) {
			document.getElementById("bonusRound").innerHTML = "Here's a memory round while the next game loads.";
		} else {
			document.getElementById("bonusRound").innerHTML = "Here's another memory round!";
		}

	} else {

		//This will check to see if you earned any information, then post your guess to the page. 

		var info = false;
		var message = "You guessed \"" + trueGuess + ".\" ";
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
				document.getElementById("guidance_text").innerHTML = "You guessed \"" + trueGuess + ".\" " + candidates[rngNum];

		}
		document.getElementById("guesses").innerHTML = trueGuess + "<p></p>" + document.getElementById("guesses").innerHTML;
		document.getElementById("hints").innerHTML = "Begins with " + hints[0] + " Ends with "  + hints[1] + ". You've found the letters: " + letters + ". (Max two per entry)";
	}


	document.getElementById("guess").value = "";


}

function forfeit() {
		setGuidanceText("The answer was \"" + document.getElementById("spank").name + ".\" We're generating a new question....")
		document.getElementById("guesses").innerHTML = ""
		document.getElementById("hints").innerHTML = ""
		hints = ["??", "??"]
		letters = ""
		setTimeout(loadNewGame, 3000)
}

function clearHTML() {
		document.getElementById("guesses").innerHTML = ""
		document.getElementById("hints").innerHTML = ""
		hints = ["??", "??"]
		letters = ""
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