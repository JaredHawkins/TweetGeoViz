TweetGeoViz
===========

Visualization tool to view tweets by location and content.

------
A product of collaboration between HealthMap.org (Boston Children's Hospital), Mozilla Science Lab and our community.

![Screeshot 1](https://github.com/JaredHawkins/TweetGeoViz/blob/master/screenshots/mar_26_2015/1.png)

![Screeshot 2](https://github.com/JaredHawkins/TweetGeoViz/blob/master/screenshots/mar_26_2015/2.png)

![Screeshot 3](https://github.com/JaredHawkins/TweetGeoViz/blob/master/screenshots/mar_26_2015/3.png)

#Getting Started

##Dependencies
This project uses mongodb to manage its database, node.js for a server, and npm to manage dependencies. Install these on your machine to start:

 - [mongodb v2.6.4](http://docs.mongodb.org/manual/installation/)
 - [node v0.10.31](http://nodejs.org/download/) (comes with npm)
 - [control tweets](https://db.tt/29prxPri) (courtesy of HealthMap)

##Setup
In the top directory of the project, run

```
npm install
```

And npm will install all the dependencies required by the app (listed in `package.json`).

Next up is database setup. After acquiring the batch of control tweets, unzip them anywhere, and at a terminal prompt, start mongo with the command:

```
mongod
```

And just leave that running while using the app. Now in another terminal window, navigate to wherever you unzipped the control tweets to, and load them into mongodb by running:

```
mongoimport --db twitter --collection ControlTweets --file healthmap_geoTweets.json
```

This'll create a database called `twitter`, and a collection of tweets called `ControlTweets`. Think of this as a single table, with one row for each tweet in the database.

The last step, is to index the database based on tweet content (for those new to databasing: this is sort of like putting all the database entries in order so they're fast to search, like having the names in a phonebook in order makes the phonebook fast to search). Open up the mongodb shell from the terminal:

```
mongo
```

then navigate to the `twitter` database you created, index it based on tweets, and exit (this step took ~10 minutes on my laptop, don't panic if it looks like it's doing nothing for a few minutes):

```
use twitter
db.ControlTweets.ensureIndex({ t: "text" })
exit
```

App consists of 2 main components: Server and Client.

To start the Server, run in a separate window (by default it will run on `http://localhost:2063/`)

```
npm start
```

To run the Client, run in a separate window (by default it will run on `http://localhost:9005/`)

```
gulp
```

And in a browser, navigate to `http://localhost:9005/`.

#Database Schema

##mongodb

Each element in the database contains the following key / value pairs:

```
 "_id" : tweet ID (also the object ID for the mongo db)
 "lang" : language of tweet (should be mostly correct, but may have some mistakes)
 "loc" : user-entered location name
 "plt" : profile latitude coordinates
 "uid" : twitter user id
 "tlt" : tweet latitude
 "cc" : country code
 "f" : our own backup coding -- ignore
 "p" : twitter place ID (not sure if these can be looked up somehow via twitter)
 "t" : tweet text
 "cr" : time of the tweet in UTC (not converted to local time, so temporal analysis will not be very accurate)
 "pln" : profile longitude
 "tln" : tweet longitude
```

##geoJSON

The `/search` route in `routes.js` chews up tweets from the database into [geoJSON format](http://geojson.org/) (not strictly necessary at present, but we'll use this format for serving raw data from the database, and for potentially interfacing with other mapping tools in future). The specific format to be used contains only the minimal information necessary for plotting on a map:

```
{	
  type: "FeatureCollection",
  features: [...]
}
```

where `features` is an array of objects of the format:

```
{
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [tln, tlt]
  }
}
```

where `tln` and `tlt` are the tweet longitude and lattitude pulled from the database.

##Testing

You need to have Mocha installed on your computer

```
npm install -g mocha
```

Then execute tests from the top directory of the project:

```
npm test
```
