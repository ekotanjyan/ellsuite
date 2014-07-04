var  mongoose = require('mongoose')
	,Schema = mongoose.Schema;

var MacroSchema = new Schema({
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
mongoose.model('Macro',MacroSchema);