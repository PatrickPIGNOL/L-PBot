const OnEvent = require("../OnEvent.js");
class OnGuildMemberAvailable extends OnEvent 
{
	constructor() 
	{
		super("guildMemberAvailable");
	}

	async mExecute(pDiscordBot, ...args) 
	{
		const member = args[0];
		await this.mOnGuildMemberAvailable(pDiscordBot, member);
	}

	async mOnGuildMemberAvailable(pDiscordBot, member) 
	{
		console.log(`member becomes available in a large guild: ${member.tag}`);
	}
}

module.exports = new OnGuildMemberAvailable();