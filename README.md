# API Project: URL Shortener Microservice 
  URL Shortener Microservice app that is built on the Glitch platform using Node.js, Express.js, Mongodb and Mongoose.

## Project 3 of 5 for [freeCodeCamp's](https://www.freecodecamp.com) Api and Microservices Developer Certification.

App Webpage: [URL Shortener API](https://fcc-urlshortener-apiproject.glitch.me "Url Shortener App") 

Glitch Project: [Url Shortener API Glitch Project](https://glitch.com/~fcc-urlshortener-apiproject)
 
Completed API and Microservices Certification: [Certificate](https://www.freecodecamp.org/certification/carlitos/data-visualization "FreeCodeCamp.Com").

## Technologies Used:
> * HTML, JavaScript, CSS, Node.js, Express.js, MongoDB and Mongoose.   


## Some requirements to complete project:

1. I can POST a URL to `https://fcc-urlshortener-apiproject.glitch.me/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`.
3. When I visit the shortened URL, it will redirect me to my original link.


#### Creation Example:

POST `https://fcc-urlshortener-apiproject.glitch.me/api/shorturl/new` - body (urlencoded) :  `url=https://www.google.com`

#### Usage:

https://fcc-urlshortener-apiproject.glitch.me/api/shorturl/0

#### Will redirect to:

https://www.freecodecamp.org/
