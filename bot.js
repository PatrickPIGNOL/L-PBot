class DiscordBot {
  constructor() {
    this.aFS = require("fs");
    this.aDiscord = require("discord.js");
    this.aClient = new this.aDiscord.Client();
    this.aClient.commands = new this.aDiscord.Collection();
    const vCommandFiles = this.aFS
      .readdirSync("./commands")
      .filter(vFileFound => vFileFound.endsWith(".js"));
    for (const vFile of vCommandFiles) {
      const vCommand = require(`./commands/${vFile}`);
      this.aClient.commands.set(vCommand.mName(), vCommand);
    }
    this.aConfig = require("./config.json");
    this.aConfig.token = process.env.TOKEN;
    this.aSQLite = require("better-sqlite3");
    this.aSQL = new this.aSQLite("./scores.sqlite");
    this.aSQLite = new this.aSQLite("./discordbot.sqlite");
    this.aMS = require("ms");
  }
  mLogin() {
    this.aClient.login(this.aConfig.token);
    this.aClient.clearImmediate();
    this.aClient.removeAllListeners();

    const vEventsFiles = this.aFS
      .readdirSync("./events")
      .filter(vFileFound => vFileFound.endsWith(".js"));
    for (const vFile of vEventsFiles) {
      const vEvent = require(`./events/${vFile}`);
      this.aClient.on(vEvent.mEventName(), (...args)=>{
          vEvent.mExecute(this, ...args);
      });
    }
  }
  mDiscord() {
    return this.aDiscord();
  }
  mClient() {
    return this.aClient;
  }
  mConfig() {
    return this.aConfig;
  }
  mSQL() {
    return this.aSQL;
  }
}

module.exports = new DiscordBot();
