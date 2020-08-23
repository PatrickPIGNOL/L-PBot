const OnEvent = require("../OnEvent.js");
class OnChannelCreate extends OnEvent 
{
	constructor() 
	{
		super("channelCreate");
	}
	
	async mExecute(pDiscordBot, ...args) 
	{
		const channel = args[0];
		await this.mOnChannelCreate(pDiscordBot, channel);
	}

	async mOnChannelCreate(pDiscordBot, channel) 
	{
		console.log(`channelCreate: #${channel.name}`);
	}
}

module.exports = new OnChannelCreate();
