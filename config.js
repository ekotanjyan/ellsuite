var config = {};
config.production = {
	"redis":process.env.REDISCLOUD_URL
}
config.development = {
	"redis":"redis://rediscloud:u83shvCs58MGWOuS@pub-redis-14674.us-east-1-3.1.ec2.garantiadata.com:14674"
};
config.development.__proto__ = config.production;


module.exports = config;