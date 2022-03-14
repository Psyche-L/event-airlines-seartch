
var clientId = "MjYwNjIxMjZ8MTY0NzAyMTg1My40OTkxMTk1";
var eventType="sports";
var selectedDate = "2022-04-01";
var api_key="b6c9caa257a28a219fbe8ce4353a3c83";
var eventLocation ="San Diego";
var lat="";
var lon="";
var eventDetails = [];


/* Run function getEventTypes() to get the following list in console log.
    Sports, Baseball, MLB Baseball, NCAA Baseball, Minor League Baseball, Football, NFL Football, 
    College Football, XFL, Basketball, NBA Basketball, College Basketball, College Women's Basketball, 
    WNBA Basketball, NBA D-League, Hockey, NHL Hockey, College Hockey, Minor League Hockey, 
    National Women's Hockey League, Soccer, MLS Soccer, College Soccer, European Soccer, 
    International Soccer, 2014 World Cup, US Minor League Soccer, National Women's Soccer League, 
    Auto Racing, NASCAR, NASCAR Sprint Cup Series, NASCAR Nationwide Series, Indycar, F1 Racing, 
    Monster Truck, Motocross, Golf, PGA Golf, LPGA Golf, Fighting, Boxing, MMA, Wrestling, WWE, 
    Tennis, Animal Sports, Horse Racing, Rodeo, Extreme Sports, Olympic Sports, Esports, Lacrosse, 
    Major League Lacrosse, Women's Professional Lacrosse League, Climbing, Concerts, Concert, 
    Music Festivals, Theater, Classical, Classical Opera, Classical Vocal, Classical Orchestral, 
    Cirque Du Soleil, Broadway Shows, Comedy, Family Entertainment, Dance Shows, Film, Literary, 
    Circus, addon, parking, club_passes, suite, 
*/

//Final Objective Take a location , then event type parameter. 
//Find all available event types
var urlTaxonomies = "https://api.seatgeek.com/2/taxonomies?client_id="+clientId;

//Search by eventType
var urlByEventType = "https://api.seatgeek.com/2/events?client_id="+clientId+"&taxonomies.name="+eventType;
//Following url's will print all events irrespective of type
var urlAllEvents = "https://api.seatgeek.com/2/events?client_id="+clientId;

var getEventsBySelectedLocationDate = function()
{   
    
    var geoUrl = "https://api.openweathermap.org/data/2.5/weather?q="+eventLocation+"&APPID="+api_key;
    fetch(geoUrl)
    .then ( function(response){
        return response.json();
    })
    .then (function(data){        
        lat = data.coord.lat;
        lon = data.coord.lon;
        getEventsByLocations(lat, lon);
    })
}

var getEventsByLocations = function(lat, lon){
    console.log("Print events by location selected by user");
    console.log(eventLocation);
    console.log(eventType);
    console.log(selectedDate);
    //Url to fetch events by users current location, event type and date
    var urlGetEventsByUsersSelectedLocation = 
    "https://api.seatgeek.com/2/events?client_id="+clientId+"&taxonomies.name="+eventType+"&lat="+lat+"&lon="+lon+"&per_page=25&datetime_utc.gte="+selectedDate;

    fetch(urlGetEventsByUsersSelectedLocation)
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        var events = data.events;
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
        console.log(eventDetails);
    })
}

var getEventsByUserLocation = function(){
 //geoip true will get users'ip and get events in 30 miles range. range to modify default 30 miles to new value.
 //per_page is default 10 records at a time, changed to 25 results.
 var urlGetEventsByUsersCurrentLocation = "https://api.seatgeek.com/2/events?client_id="+clientId+"&geoip=true&per_page=10"+"&taxonomies.name="+eventType;
 console.log("Print events by users current location using browser ip- feature built into api");
 console.log(eventType);
    fetch(urlGetEventsByUsersCurrentLocation)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var events = data.events;
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
    
}

var getEventTypes = function(){
    var eventTypeList="";
    fetch(urlTaxonomies)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var events = data.taxonomies;
        for (var i=0; i< events.length; i++)
        {
            eventTypeList= eventTypeList + events[i].name +", ";
        }  
        console.log(eventTypeList);
    })    
}

//getEventTypes();
//getEventsByUserLocation();

var showEventsOnPage = function(){
    var eventEl = $(".event-card");
    
    eventList = JSON.parse(JSON.stringify(eventDetails));

    for(var i = 0; i< eventList.length; i++)
    {
      var divColEl = $("<div>").addClass("column");
      var divColContentEl = $("<div>").addClass("callout");
      divColEl.append(divColContentEl);

      var eventHeaderEl = $("<p>").addClass("lead");
      eventHeaderEl.text(eventList[i].title);
      var dateEl = $("<p>");
      dateEl.text(eventList[i].date);
      var addressEl = $("<p>").addClass("subheader");
      addressEl.text(eventList[i].address);

      divColContentEl.append(eventHeaderEl, dateEl, addressEl);
      
      var divLinkEl = $("<div>").addClass("callout clearfix");
      var ticketUrlEL= $("<a>").addClass("button float-left")
                        .attr("href",eventList[i].url )
                        .attr("target", "_blank")
                        .text("Book Ticket");
        var FlightUrlEL= $("<a>").addClass("button float-right")
        .attr("href","/")
        .attr("target", "_blank")
        .text("Find Flight");
      divLinkEl.append(ticketUrlEL, FlightUrlEL);
      divColContentEl.append(divLinkEl);
      divColEl.append(divColContentEl);
      eventEl.append(divColEl);

    }
}

getEventsByUserLocation();
//getEventsBySelectedLocationDate();
//showEventsOnPage();