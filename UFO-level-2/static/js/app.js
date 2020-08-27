// from data.js
var tableData = data;

// this section of code creates event-listeners for all the interactive parts of the page
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

// this section of code triggers actions associated with events on the page
dateform.on("submit", dataRefresh);
cityform.on("submit",dataRefresh);
shapeform.on("submit",dataRefresh);
countryform.on("submit",dataRefresh);
stateform.on("submit",dataRefresh);
button.on("click",dataRefresh);
clear.on("click",clearTable);

// this section of code defines a function that clears search results and search log
function clearTable() { 
  $('td').remove(); 
  $('#sighting-summary').remove(); 
  var body = table.append("tbody"); // it works but i don't know why
  var log = reportpanel.append("div").attr('id','sighting-summary').attr("class",'panel-body')
  console.log("Should be cleared.")
} 

// this section of code defines a function that appends search results to index.html and displays it on the web page.
function dataRefresh() {
    // prevents an automatic refresh on form submit
    d3.event.preventDefault();

    // selects each of the html forms. and dynamic sections
    // ids in html are used to easily find these
    var summary = d3.select("#sighting-summary");
    var inputDate = d3.select("#datetime");
    var inputCity = d3.select("#city");
    var inputShape = d3.select("#shape");
    var inputCountry = d3.select("#country");
    var inputState = d3.select("#state");

    // grabs input value from each of the selected elements
    var searchDate = inputDate.property("value");
    var searchCity = inputCity.property("value");
    var searchShape = inputShape.property("value");
    var searchCountry = inputCountry.property("value");
    var searchState = inputState.property("value");

    // displays values to console
    console.log(`searchDate: ${searchDate}`)
    console.log(`searchCity: ${searchCity}`)
    console.log(`searchShape: ${searchShape}`)
    console.log(`searchCountry: ${searchCountry}`)
    console.log(`searchState: ${searchState}`)

    // cascading sequence of filters: 
    // This series of conditionals applies each filter to the data one by one. 
    // If no search criteria is present for any parameter, no results are displayed
    // If a parameter is missing search criteria, no filtering is applied for it. 
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

    // this block of code grabs data from filtered data array and appends it to the html.
    searchData.forEach((sighting) => {
      var row = table.append("tr");
      Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });

    // this block of code creates a search report statement and appends it to search log section in the html.
    var report = `There are ${searchData.length} known sightings meeting your criteria.`
    var doc = summary.append("p");
    doc.text(report)

    // prints number of records in search to the console
    console.log(`Search returned ${searchData.length} records`)
  }