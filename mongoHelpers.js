module.exports = {
//function to open new connection to db only when necessary
    'connect' : function(callback){
        if(database === null){
            MongoClient.connect('mongodb://127.0.0.1:27017/twitter', function(err, db) {

                if(err) { return callback(err)};
                database = db;  //persist the connected db
                callback(null, db);

            });
        } else {
            callback(null, database);  //just use the existing database connection w/ no reconnect
        }
    }
}
