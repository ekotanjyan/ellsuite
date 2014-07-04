var mongoose =  require('mongoose'),
	fs 		 =	require('fs');

exports.init = function(app){
	mongoose.connect(app.get('config').mongodb);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
	  console.log('Connected...!!');
	});

	var schemasPath  = __dirname + '/schemas',
		schemasFiles = fs.readdirSync(schemasPath);

	schemasFiles.forEach(function(file){
		require(schemasPath + "/" + file);
	});
}