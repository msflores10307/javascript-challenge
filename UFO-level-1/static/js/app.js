// from data.js
var tableData = data;

// this section of code creates event-listeners for all the interactive parts of the page
var form = d3.select(".form-control");
var button = d3.select("button");
var clear = d3.select("#clear-btn");
var table = d3.select("tbody");


// this section of code triggers actions associated with events on the page
form.on("submit", dataRefresh);
button.on("click",dataRefresh);
clear.on("click",clearTable);

// this section of code defines a function that clears search results 
function clearTable() { 
  $('td').remove(); 
  var body = table.append("tbody"); // it works but i don't know why
  console.log("Should be cleared.")
} 

// this section of code defines a function that appends search results to index.html and displays it on the web page.
function dataRefresh() {
    
    // prevents an automatic refresh on form submit
    d3.event.preventDefault();

    // selects each of the html forms and grabs the value in the forms
    var inputElement = d3.select("input");
    var searchDate = inputElement.property("value");
    // displays input date in console
    console.log(searchDate);

    // filters data provided for input date and appends the filtered data to web page
    searchData = tableData.filter((record) => record.datetime === searchDate)
    searchData.forEach((sighting) => {
      var row = table.append("tr");
      Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });
    // prints a message of encouragement to the console
    console.log("You did it!")

  }