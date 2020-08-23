const OnEvent = require("../OnEvent.js");
class OnReconnecting extends OnEvent 
{
	constructor() 
	{
		super("clientUserSettingsUpdate");
	}
	
	async mExecute(pDiscordBot, ...args) 
	{
		const clientUserSettings = args[0];
		await this.mOnClientUserSettingsUpdate(pDiscordBot, clientUserSettings);
	}
	
	async mOnClientUserSettingsUpdate(pDiscordBot, clientUserSettings) 
	{
		console.log(`clientUserSettingsUpdate -> client user's settings update`);
	}
}

module.exports = new OnReconnecting();

