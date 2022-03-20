var clientId = "MjYwNjIxMjZ8MTY0NzAyMTg1My40OTkxMTk1";
var eventType="sports";
var selectedDate = "";
var api_key="b6c9caa257a28a219fbe8ce4353a3c83";
var eventLocation ="";
var lat="";
var lon="";
var eventDetails = [];


//Final Objective Take a location , then event type parameter. 
//Find all available event types
//var urlTaxonomies = "https://api.seatgeek.com/2/taxonomies?client_id="+clientId;

//Search by eventType
//var urlByEventType = "https://api.seatgeek.com/2/events?client_id="+clientId+"&taxonomies.name="+eventType;
//Following url's will print all events irrespective of type
//var urlAllEvents = "https://api.seatgeek.com/2/events?client_id="+clientId;

var urlGetEventsByUsersCurrentLocation = "https://api.seatgeek.com/2/events?client_id="+clientId+"&geoip=true&per_page=12"+"&taxonomies.name="+eventType;
var urlGetEventsByUsersSelectedLocation = "https://api.seatgeek.com/2/events?client_id="+clientId+"&taxonomies.name="+eventType+"&lat="+lat+"&lon="+lon+"&per_page=12";

var getEventsByLocations = function(lat, lon){
    //Url to fetch events by users current location, event type and date
    fetch(urlGetEventsByUsersSelectedLocation)
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        var events = data.events;
        eventDetails =[];
         //extract required fields from response, print only those in console.
        //Add or remove as required
        for(var i =0 ; i< events.length; i++)
        {
            var event = {};
            event.type = events[i].type;
            event.type = events[i].title;
            event.date = events[i].datetime_local;
            event.url = events[i].url;
            event.address = events[i].venue.address+" "+events[i].venue.extended_address;
            eventDetails.push(event);
        }
        //console.log(eventDetails);
    })
    .then(function(eventDetails){
        showEventsOnPage();
    })  
    .catch(function(error){
        showErrorMessage(error);
    })    
}

var showErrorMessage = function(message){
    var messageEl = $(".no-event-message");
    messageEl.text(message);
    var eventEl = $(".event-card");
    eventEl.empty();
}

var getEventsByUserLocation = function(){
 //geoip true will get users'ip and get events in 30 miles range. 
 //per_page is default 10 records at a time, changed to 12 results.
 
    fetch(urlGetEventsByUsersCurrentLocation)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var events = data.events;
        eventDetails =[];
         //extract required fields from response, print only those in console.
        //Add or remove as required
        for(var i =0 ; i< events.length; i++)
        {
            var event = {};
            event.type = events[i].type;
            event.title = events[i].title;
            event.date = events[i].datetime_local;
            event.url = events[i].url;
            event.address = events[i].venue.address+" "+events[i].venue.extended_address;
            eventDetails.push(event);
        }   
    })
    .then(function(eventDetails){
        showEventsOnPage();
    })   
    .catch(function(error){
        showErrorMessage(error);
    })   
}

//Function to create cards on the page.
var showEventsOnPage = function(){
    var eventEl = $(".event-card");
    eventEl.empty();
   
    var eventList = JSON.parse(JSON.stringify(eventDetails));  

    if(eventList.length === 0){
        showErrorMessage("No events matching the selected criteria are available");       
    }
    else{
        showErrorMessage("Available Events");      
        for(var i = 0; i< eventList.length; i++)
        {
        //Date calculation
            var evtDate = new Date(eventList[i].date);
            var dt = evtDate.toLocaleDateString();
            var time = evtDate.toLocaleTimeString();
            var dateForDisplay = dt+" "+time ;
            
            var divColEl = $("<div>").addClass("column");
            var divColContentEl = $("<div>").addClass("callout");
            divColEl.append(divColContentEl);

            var eventHeaderEl = $("<p>");
            eventHeaderEl.text(eventList[i].title);
            var dateEl = $("<p>").addClass("lead");
            dateEl.text(dateForDisplay);
            var addressEl = $("<p>").addClass("subheader");
            addressEl.text(eventList[i].address);

            divColContentEl.append(eventHeaderEl, dateEl, addressEl);
            
            var divLinkEl = $("<div>").addClass("callout clearfix");
            var ticketUrlEL= $("<a>").addClass("button")
                                .attr("href",eventList[i].url )
                                .attr("target", "_blank")
                                .text("Book Ticket");
            var imageUrl = $("<iframe>");
            imageUrl.attr("src",'https://www.google.com/maps/embed/v1/place?key=AIzaSyDO2DBVsP10Akh-Q8OWOoKUG4S3Qcygv2M&q='+eventList[i].address)
            
            
            divLinkEl.append(imageUrl, ticketUrlEL);
            divColContentEl.append(divLinkEl);
            divColEl.append(divColContentEl);
            eventEl.append(divColEl);
        }
    }    
}

var refreshPage = function(event) {
    //Read search box values
    eventType=$("#event-select").val();
    eventLocation= $("#search-city").val();
    date = $("#search-date").val();

    //If user has provided an input save in localstorage
    if(eventType)
    {
         localStorage.setItem("eventType", eventType);
    }
     
    if(eventLocation)
    {
        localStorage.setItem("city", eventLocation);
    }

    if(date)
    {
        localStorage.setItem("date", date);
    }


    if(eventType && !eventLocation && !date)
    {
        urlGetEventsByUsersCurrentLocation = "https://api.seatgeek.com/2/events?client_id="+clientId+"&geoip=true&per_page=12"+"&taxonomies.name="+eventType;
        getEventsByUserLocation();
    }
    else if (eventType && date && !eventLocation)
    {
        //Check if input date is valid
        if(Date.parse(date)){
            urlGetEventsByUsersCurrentLocation = "https://api.seatgeek.com/2/events?client_id="+clientId+"&geoip=true&per_page=12"+"&taxonomies.name="+eventType+"&datetime_local.gte="+date;
            getEventsByUserLocation();
        }
        else{
            showErrorMessage("No events matching the selected criteria. Check your date input.");
        }
        
    }
    else if(eventType && !date && eventLocation)
    {
        var geoUrl = "https://api.openweathermap.org/data/2.5/weather?q="+eventLocation+"&APPID="+api_key;
        fetch(geoUrl)
        .then ( function(response){
            return response.json();
        })
        .then (function(data){        
            lat = data.coord.lat;
            lon = data.coord.lon;
            urlGetEventsByUsersSelectedLocation = "https://api.seatgeek.com/2/events?client_id="+clientId+"&taxonomies.name="+eventType+"&lat="+lat+"&lon="+lon+"&per_page=12";
            getEventsByLocations(lat, lon);
        }) 
        .catch(function(error){
            showErrorMessage("No events matching the selected criteria");
        })  
    }
    else if (eventType && date && eventLocation)
    {
        var geoUrl = "https://api.openweathermap.org/data/2.5/weather?q="+eventLocation+"&APPID="+api_key;
        fetch(geoUrl)
        .then ( function(response){
            return response.json();
        })
        .then (function(data){        
            lat = data.coord.lat;
            lon = data.coord.lon;
            urlGetEventsByUsersSelectedLocation = "https://api.seatgeek.com/2/events?client_id="+clientId+"&taxonomies.name="+eventType+"&lat="+lat+"&lon="+lon+"&per_page=12&datetime_local.gte="+date;
            getEventsByLocations(lat, lon);
        }) 
        .catch(function(error){
            showErrorMessage("No events matching the selected criteria.");
        })  
    }    
}

var loadPage = function() {
    //Look for saved selections in local storage
    eventType = localStorage.getItem("eventType");
    eventLocation = localStorage.getItem("city");
    selectedDate = localStorage.getItem("date");

    if(eventType)
    {
        $("#event-select").val(eventType);    
    }

    if(eventLocation)
    {
        $("#search-city").val(eventLocation);
    }

    if(selectedDate)
    {
        $("#search-date").val(selectedDate);
    }

    refreshPage();
}

//on search now button click show events matching the search criteria.
$(".search-form").submit(function(event){
    event.preventDefault();
    refreshPage();
});
//On page load show data
loadPage();

