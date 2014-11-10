//Landing page
app.get('/', function(req, res){
	res.render('demo.jade', {pins: JSON.stringify({features:[]}) });
});

//deal with search form - ors all words in search phrase together
app.post('/search', function(req, res){

	//connect to the db
	connect(function(err, db) {
		db.collection('ControlTweets', function(er, collection) {

			var geoJSONlist = {	type: "FeatureCollection",    // empty geojson blob
													features: []
												};

			//execute db query
			collection.find( { $text:{$search: req.body.tweetText} }, { tln: 1, tlt: 1 }, function(e, cursor){

				//chew up each database entry into geoJSON;
				//render the page with the data overlay once we reach the end of the list of matches.
				cursor.each(function(err,item){
					if(item){
						geoJSONlist.features.push({
							type: 'Feature',
							geometry: {
								type: 'Point',
								coordinates: [item.tln, item.tlt]
							}
						});
					} else{
							return res.render('demo.jade', {pins: JSON.stringify(geoJSONlist) });
					}

				});
			});

		});
	});
});
