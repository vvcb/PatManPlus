DB_FILE_LOCATION = '/tmp/nhs-hack-day.sqlite3'

var db;

// Open database
function openDatabase() {

	var sqlite3 = require('sqlite3').verbose();
	db = new sqlite3.Database(DB_FILE_LOCATION);

	db.serialize(function() {
	  db.run("CREATE TABLE lorem (info TEXT)");

	  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");

	  for (var i = 0; i < 10; i++) {
	      stmt.run("Ipsum " + i);
	  }

	  stmt.finalize();

	  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
	      console.log(row.id + ": " + row.info);
	  });
	});

}

// Closes the database connection
function closeDatabase() {
	db.close();
}

// Exports entire database as JSON
function exportRecords() {

}

// Exports a single record as JSON
function exportSingleRecord() {

}

// Imports records as JSON
function importRecords() {

}

module.exports = {
}
