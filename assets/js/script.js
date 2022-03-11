var clientId = "MjYwNjIxMjZ8MTY0NzAyMTg1My40OTkxMTk1";

//Final Objective Take a location , then event type parameter. 


//Following url's will print all events irrespective of type
var urlAllEvents = "https://api.seatgeek.com/2/events?client_id="+clientId;
//geoip true will get users'ip and get events in 30 miles range. range to modify default 30 miles to new value.
//per_page is default 10 records at a time, changed to 25 results.
var urlGetUsersCurrentLocation = "https://api.seatgeek.com/2/events?client_id="+clientId+"&geoip=true&range=10mi&per_page=25";

fetch(urlGetUsersCurrentLocation)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
})