const OnEvent = require("../OnEvent.js");
class OnGuildDelete extends OnEvent 
{
	constructor() 
	{
		super("guildDelete");
	}

	async mExecute(pDiscordBot, ...args) 
	{
		const guild = args[0];
		await this.mOnGuildDelete(pDiscordBot, guild);
	}

	async mOnGuildDelete(pDiscordBot, guild) 
	{
		console.log(`the client deleted/left a guild`);
	}
}

module.exports = new OnGuildDelete();