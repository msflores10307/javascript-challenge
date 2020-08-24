// from data.js
var tableData = data;
// YOUR CODE HERE!

var form = d3.select(".form-control");
var button = d3.select("button");
var clear = d3.select("#clear-btn");
var table = d3.select("tbody");

form.on("submit", dataRefresh);

button.on("click",dataRefresh);
clear.on("click",clearTable);


function clearTable() { 
  $('td').remove(); 
  var body = table.append("tbody"); // it works but i don't know why
  console.log("Should be cleared.")
} 


function dataRefresh() {
    
    d3.event.preventDefault();

    var inputElement = d3.select("input");
    var searchDate = inputElement.property("value");
    console.log(searchDate)

    searchData = tableData.filter((record) => record.datetime === searchDate)
    searchData.forEach((sighting) => {
      var row = table.append("tr");
      Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });
    console.log("Done")

    

  }