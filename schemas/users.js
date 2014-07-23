var  mongoose = require('mongoose')
	,Schema = mongoose.Schema;

var UserSchema = new Schema({
	"email":String,
	"password":String,
	"settings":{
		"refreshDelay":Number,
		"feeds":[String]
	},
	// -----------
	"content":String,	
	"updated":{
		type:Date,
		default:Date.now
	},
	"created":{
		type:Date,
		default:Date.now
	}
})
mongoose.model('User', UserSchema);