document.getElementById( "myForm" ).addEventListener( "submit", function ( event ) {
    	event.preventDefault();
    	JavaScript:check();
  	} );

function check(){
	if (document.getElementById("guess").value == document.getElementById("spank").name){
		document.getElementById("wank").innerHTML = "You did it!";
	}
	console.log(document.getElementById("guess").value)
	console.log(document.getElementById("spank").name)
	document.getElementById("guess").value = "";
}

function testForm(){
	var nameValue = document.getElementById("guess").value;
	document.getElementById("wank").innerHTML = nameValue;
	document.getElementById("guess").value = "";
}