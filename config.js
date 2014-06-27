var config = {};
config.production = {
	"redis":process.env.REDISCLOUD_URL,
	"mongodb":process.env.MONGOLAB_URI
}
config.development = {
	"redis":"redis://rediscloud:rLVTEaOSuA6dawXB@pub-redis-11467.us-east-1-3.4.ec2.garantiadata.com:11467",
	"mongodb":"mongodb://heroku_app25636441:8anknb52jttccujtmkbipufn6l@ds031988.mongolab.com:31988/heroku_app25636441",
	"facebook":{
		"apiKey":653951331362826,
		"apiSecret":"a94b3e8e19ba87bbc7b90fab7493cdfa"
	},
	"google":{
		"clientID":"457353786060-7vhqovi3o4n7qn0r45ouu1v3lbfuj4ck.apps.googleusercontent.com",
		"clientSecret":"6zgXy8k5UCAt3geLc-OJ1Kb4"
	},
	"twitter":{
		"apiKey":"zfXSbJYaS80ZY56QjsguOgfjJ",
		"apiSecret":"IICmsKLLDiDqc9PCN0LBX5aChr5N1uRQNTQRyHwlqV3waMfSd4"
	},
	"linkedin":{
		"apiKey":"75idosjcop3ki9",
		"secretKey":"G4peyKCkWD7eqxLH"
	}
};
config.development.__proto__ = config.production;


module.exports = config;
