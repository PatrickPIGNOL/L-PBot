class OnMessage
{
  constructor()
  {
    this.aEventName = "message";
  }
  mEventName()
  {
    return this.aEventName;
  }
  async mExecute(pDiscordBot, ...args)
  {
    const message = args[0];
    console.log(
      "Nouveau message <" +
        message +
        "> de @" +
        message.author.tag +
        "(" +
        message.author.id +
        ") dans #" +
        message.channel.name +
        ' : "' +
        message.content +
        '";\n'
    );
    if (message.author.bot) {
      console.log("message is a bot message. Returning.");
      return;
    }

    pDiscordBot.mRemerciements(message);

    if (!message.content.startsWith(pDiscordBot.aConfig.Prefix)) {
      console.log("message is not a command. Returning.");
      return;
    }
    const vArgs = message.content.slice(pDiscordBot.aConfig.Prefix.length).split(/ +/);
    //const command = args.shift().toLowerCase();
    const vCommandName = vArgs.shift().toLowerCase();

    const vCommand =
      pDiscordBot.aClient.commands.get(vCommandName) ||
      pDiscordBot.aClient.commands.find(
        vCommandFound =>
          vCommandFound.mAliases() &&
          vCommandFound.mAliases().includes(vCommandName)
      );

    if (!vCommand) {
      return;
    }
    vCommand.mExecute(pDiscordBot, message, vArgs);

    /*
    if (message.content.startsWith(this.aConfig.Prefix + "bienvenue")) {
      this.mBienvenue(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "bye")) {
      this.mBye(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "help")) {
      this.mHelp(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "points")) {
      this.mPoints(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "give")) {
      this.mGive(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "top")) {
      this.mTop(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "mute")) {
      this.mMute(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "allmute")) {
      this.mAllMute(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "unmute")) {
      this.mUnMute(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "kick")) {
      this.mKick(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "allkick")) {
      this.mAllKick(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "ban")) {
      this.mBan(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "allban")) {
      this.mAllBan(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "clear")) {
      this.mClear(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "clean")) {
      this.mClean(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "ping")) {
      this.mPing(message);
      this.aClient.commands.get("ping").execute(message, args);
    } else if (message.content.startsWith(this.aConfig.Prefix + "poll")) {
      this.mPoll(message);
    } else if (message.content.startsWith(this.aConfig.Prefix + "whois")) {
      this.mWhois(message);
    } else {
      message.delete();
    }
*/
    
  }
}

module.exports = new OnMessage();