const fetch = require('node-fetch');
const Database = require("./tables/Database.js");
const SQLite = require("better-sqlite3");
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
		this.aSQL = new SQLite("./discordbot.sqlite");
		this.aSQL.pragma("synchronous = FULL");
    	this.aSQL.pragma("journal_mode = PERSIST");
		this.aSQL.pragma("auto_vacuum = FULL");
	}
	async mLogin() 
	{
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
		this.mSQL().Database = new Database(this.mSQL());
		process.on
		(
			'exit', () =>
			{ 
				this.mSQL().Database.mClose()
			}
		);
		process.on('SIGHUP', () => process.exit(128 + 1));
		process.on('SIGINT', () => process.exit(128 + 2));
		process.on('SIGTERM', () => process.exit(128 + 15));
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
	mSQL() 
	{
		return this.aSQL;
	}
}

module.exports = new DiscordBot();
