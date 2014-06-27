var config = {};
config.production = {
	"redis":process.env.REDISCLOUD_URL
	"mongodb":process.env.MONGOLAB_URI
}
config.development = {
	"redis":"redis://rediscloud:u83shvCs58MGWOuS@pub-redis-14674.us-east-1-3.1.ec2.garantiadata.com:14674",
	"mongodb":"mongodb://heroku_app25636441:8anknb52jttccujtmkbipufn6l@ds031988.mongolab.com:31988/heroku_app25636441"
};
config.development.__proto__ = config.production;


module.exports = config;