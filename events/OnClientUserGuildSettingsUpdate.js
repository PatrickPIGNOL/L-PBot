const OnEvent = require("../OnEvent.js");
class OnClientUserGuildSettingsUpdate extends OnEvent 
{
	constructor() 
	{
		super("clientUserGuildSettingsUpdate");
	}
	
	mEventName() 
	{
		return this.aEventName;
	}
	
	async mExecute(pDiscordBot, ...args) 
	{
		const clientUserGuildSettings = args[0];
		await this.mOnClientUserGuildSettingsUpdate(pDiscordBot, clientUserGuildSettings);
	}
	
	async mOnClientUserGuildSettingsUpdate(pDiscordBot, clientUserGuildSettings) 
	{
		console.log
		(
			`clientUserGuildSettingsUpdate -> client user's settings update`
		);
	}
}

module.exports = new OnClientUserGuildSettingsUpdate();

