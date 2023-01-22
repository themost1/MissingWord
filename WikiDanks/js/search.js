/*
    search.js

    MediaWiki API Demos
    Demo of `Search` module: Search for a text or title

    MIT License
*/

var url = "https://en.wikipedia.org/w/api.php"; 

//Parameters
// term = the answer you wish the result to have
//

function makeSearch(term) {

    var params = {
        action: "query",
        list: "search",
        srsearch: term,
        srprop: "snippet",
        srsort: "random",
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    console.log(url);

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            // Processing of response goes here
            var text =  cleanSnippet(response.query.search[0].snippet);
            var replace = new RegExp(term,"ig");
            console.log(replace);
            document.getElementById("searchResult").innerHTML = text.replaceAll(replace,'___'); 
          
        })
        .catch(function(error){console.log(error);});

}

function cleanSnippet(snippet){
        console.log("Initial Snippet: " + snippet);
        var div = document.createElement("div");
        div.innerHTML = snippet;
        console.log("Text Content: " + div.textContent);
        return div.textContent || div.innerText || "";
}
makeSearch("hat");