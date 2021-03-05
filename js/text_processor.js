loadNewGame()

function loadNewGame() {
	var xhr = new XMLHttpRequest();
	var url = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=random&grnnamespace=0&prop=revisions%7Cimages&rvprop=title&grnlimit=10"

	xhr.open('GET',url,true)
	xhr.onload = function() {
		var data = JSON.parse(this.response);
		for (var key in data.query.pages) {
			temp = data.query.pages[key].title
		}
		temp = new String(temp)
		temp = new String(temp.replaceAll(' ','_'))
		console.log(temp)
		useThatPage(temp)
	}
	xhr.send()
}

function useThatPage(title) {
	//Create a new object to interact with the server
	var xhr = new XMLHttpRequest();

	var charsToGet = 1200;
	var exLimit = "max";
	var urlBase = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&formatversion=2&excharacters="
		+ charsToGet.toString()
		+ "&exlimit="
		+ exLimit.toString()
		+ "&explaintext=1&titles="

	var url = urlBase + title
 
	// Provide 3 arguments (GET/POST, The URL, Async True/False)
	xhr.open('GET', url, true);

	// Once request has loaded...
	xhr.onload = function() {
		// Parse the request into JSON
		var data = JSON.parse(this.response);
		var content = data.query.pages[0].extract;
		processContent(content);
	}
	// Send request to the server asynchronously
	xhr.send();
}

function processContent(content) {
	text = new String(content)

	// Not Internet Explorer compatible
	text = new String(text.replaceAll('\n', ' <p></p> ')) 
	// End incompatible segment

	var spaced = text.split(" ")
	var ends = getEnds(spaced)
	var data = generateWikiBlank(spaced, ends)
	document.getElementById("spank").innerHTML = data[0];
	document.getElementById("spank").name = data[1]
	console.log("Correct answer is: " + data[1])
	
	setGuidanceText("Answer the question to send tendies to those in need.")
}

function generateWikiBlank(spaced, ends) {
	var blankId = chooseBlank(spaced, ends)
	var answer = spaced[blankId]
	var question = ""
	var passage = ""
	
	var nextEnd = -404
	var flag = true
	for (var i = 0; i < ends.length; i++){
		if (ends[i] > blankId && flag){
			nextEnd = i // this is reset to ends[i] after lastEnd is set
			flag = false
		}
	} // sometimes, somehow, next end is not found.

	var lastEnd
	if (nextEnd == 0) {
		lastEnd = -1
	} else {
		lastEnd = ends[nextEnd-1]
	}
	nextEnd = ends[nextEnd]

	console.log(lastEnd)
	console.log(blankId)
	console.log(nextEnd)

	for (var i = lastEnd+1; i <= nextEnd; i++){
		if (i == blankId){
			question = question + " " + "____"
		} else {
			question = question + " " + spaced[i]
		}
		passage = passage + " " + spaced[i]

	}

	return [question, answer, passage]
}

function getEnds(spaced) {
	let ends = []

	for (var i = 0; i < spaced.length; i++) {
		item = spaced[i]
		if (item.charAt(item.length-1) == "."){
			if (item.length > 3 || item.charAt(0) == item.charAt(0).toLowerCase() ){
				ends[ends.length] = i
			}
		}
	}
	return ends
}

function getSentenceByIndex(spaced, ends, index) {
	var start = 0
	if (index > 0){
		start = ends[index-1]+1
	} else {
		start = 0 
	}
	
	let passage = spaced[start]
	for (var i = start+1; i <= ends[index]; i++){
		passage = passage + " " + spaced[i]
	}
	document.getElementById("wank").innerHTML = passage;
	return passage
} 

function possibleBlank(item) {
	if (item.charAt(0) == item.charAt(0).toLowerCase()){

			if ((item.indexOf("ing") == item.length - 3 && item.length > 3)|| (item.indexOf("ed") == item.length-2 && item.length > 2) || (item.indexOf("ly") == item.length-2 && item.length > 2) || (item.indexOf("ous") == item.length-3 && item.length > 3)){
		
				var flag = true
				for (var i = 0; i < item.length; i++){
					if (item.charAt(i).toLowerCase() == item.charAt(i).toUpperCase()){
						flag = false
					}
				}
				if (flag){
					return true 
				}
			
		}
	}

	//NEEDS TO TRIM PUNCTUATION
	return false
}

function getPossibleBlanks (spaced, ends) {
	var possibleBlanks = []

	for (var k = 0; k < spaced.length; k++) {
		if (possibleBlank(spaced[k])) {
			possibleBlanks[possibleBlanks.length] = k
		}
	}

	return possibleBlanks // The index in spaced
}

function chooseBlank(spaced, ends) {
	var candidates = getPossibleBlanks(spaced, ends)
	var rngNum = Math.floor(Math.random() * candidates.length)

	return candidates[rngNum]
}