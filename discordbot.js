const fetch = require('node-fetch');
const Database = require("./tables/Database.js");
const SQLite3 = require("better-sqlite3");
class DiscordBot 
{
	constructor()
	{
		this.aFS = require("fs");
		this.aDiscord = require("discord.js");
		this.aClient = new this.aDiscord.Client();
		this.aClient.commands = new this.aDiscord.Collection();
		const vCommandFiles = this.aFS
			.readdirSync("./commands")
			.filter(vFileFound => vFileFound.endsWith(".js"));
		for (const vFile of vCommandFiles) 
		{
			const vCommand = require(`./commands/${vFile}`);
			this.aClient.commands.set(vCommand.mName(), vCommand);
		}
		this.aConfig = require("./config.json");
		this.aTOKEN = process.env.TOKEN;		
	}
	async mLogin() 
	{
		this.aDatabase = new Database();
		await this.aClient.login(this.aTOKEN);

		this.aClient.removeAllListeners();

		const vEventsFiles = this.aFS
			.readdirSync("./events")
			.filter(vFileFound => vFileFound.endsWith(".js"));
		for (const vFile of vEventsFiles) 
		{
			const vEvent = require(`./events/${vFile}`);
			this.aClient.on(vEvent.mEventName(), (...args) => 
			{
				vEvent.mExecute(this, ...args);
			});
		}
	}
	get Database()
	{
		return this.aDatabase;
	}
	get Discord() 
	{
		return this.aDiscord;
	}
	mClient() 
	{
		return this.aClient;
	}
	mConfig() 
	{
		return this.aConfig;
	}
}

module.exports = new DiscordBot();
