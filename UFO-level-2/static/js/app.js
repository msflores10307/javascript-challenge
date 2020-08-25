// from data.js
var tableData = data;
// YOUR CODE HERE!

var dateform = d3.select("#datetime");
var button = d3.select("button");
var clear = d3.select("#clear-btn");
var cityform = d3.select("#city");
var shapeform = d3.select("#shape");
var countryform = d3.select("#country");
var stateform = d3.select("#state");
var table = d3.select("tbody");
var summary = d3.select("#sighting-summary");
var reportpanel = d3.select('#report-panel')

dateform.on("submit", dataRefresh);
cityform.on("submit",dataRefresh);
shapeform.on("submit",dataRefresh);
countryform.on("submit",dataRefresh);
stateform.on("submit",dataRefresh);
button.on("click",dataRefresh);
clear.on("click",clearTable);


function clearTable() { 
  $('td').remove(); 
  $('#sighting-summary').remove(); 

  var body = table.append("tbody"); // it works but i don't know why

  var log = reportpanel.append("div").attr('id','sighting-summary').attr("class",'panel-body')
  

  console.log("Should be cleared.")
} 


function dataRefresh() {
    
    d3.event.preventDefault();
    var summary = d3.select("#sighting-summary");
    var inputDate = d3.select("#datetime");
    var inputCity = d3.select("#city");
    var inputShape = d3.select("#shape");
    var inputCountry = d3.select("#country");
    var inputState = d3.select("#state");

    var searchDate = inputDate.property("value");
    var searchCity = inputCity.property("value");
    var searchShape = inputShape.property("value");
    var searchCountry = inputCountry.property("value");
    var searchState = inputState.property("value");

    console.log(`searchDate: ${searchDate}`)
    console.log(`searchCity: ${searchCity}`)
    console.log(`searchShape: ${searchShape}`)
    console.log(`searchCountry: ${searchCountry}`)
    console.log(`searchState: ${searchState}`)


    if (searchDate.concat(searchCity,searchShape,searchCountry,searchState) !== '') {

      if (searchDate !== '') {
        searchData = tableData.filter((record) => record.datetime === searchDate);
      } else { searchData = tableData;}
  
      if (searchCity !== '') {
        searchData = searchData.filter((record) => record.city === searchCity);
      } else { searchData = searchData;}
  
      if (searchShape !== '') {
        searchData = searchData.filter((record) => record.shape === searchShape);
      } else { searchData = searchData;}
  
      if (searchCountry !== '') {
        searchData = searchData.filter((record) => record.country === searchCountry);
      } else { searchData = searchData;}

      if (searchState !== '') {
        searchData = searchData.filter((record) => record.state === searchState);
      } else { searchData = searchData;}

    } else { searchData = []; }

    


    searchData.forEach((sighting) => {
      var row = table.append("tr");
      Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });

    var report = `There are ${searchData.length} known sightings meeting your criteria.`
    var doc = summary.append("p");
    doc.text(report)

    console.log(`Search returned ${searchData.length} records`)
  }