
## Event Search

## User Story
AS a frequent traveler

I WANT to see the upcoming dates, times, and available tickets for an event type and  a city of my choosing. 

I WANT to be able to book tickets for an event and also lookup event location in a map.

## Description
Its a website for if you want to see events of your favourite type in a city, and purchase tickets all on one place.

GIVEN an event search page

THEN the user is shown twelve cards for sports events within 30 miles of current location starting with current date.

WHEN I search for either event types (like theatre, concert, NBA etc), location, or date

THEN I am presented with twelve cards labeling the date, time, and location of the events relating to the searched criteria, along with a google map and one button labeled book tickets. If the location is not provided in search criteria current location is used. If the date is not provided or date is in past, current date will be used. If there are no events available for the criteria a appropriate message will be displayed

WHEN the user accesses the page next time 

THEN the page will remember the previous selection of event type, location, and date. If the previous searched date is in the past then current date will be used.

WHEN I click the google map

THEN I am taken to the google map of the event location

WHEN  I click the Book Ticket button, I am taken to the SeatGeek website

THEN I am presented with available tickets to purchase for the event.


## Deployment

To deploy this project click https://psyche-l.github.io/event-finder/
or use this command below to clone to the repository 

```bash
  git clone git@github.com:Psyche-L/event-finder.git
```

## Known Bugs

The mini google map will clip outside of the card on certain screen sizes.
## Tech Stack

**Client:** HTML CSS JavaScript JQuery Foundation API




## Authors

- [@Psych-L](https://github.com/Psyche-L)
- [@meghark](https://github.com/meghark)
- [@JQPURRR-BYTES](https://github.com/JQPURRR-BYTES)


## Screenshot

<img width="1440" alt="event" src="https://user-images.githubusercontent.com/96844515/159196146-97fdc4c6-5dec-4f94-91fa-2577476bf9ba.png">



