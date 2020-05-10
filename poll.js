class Sondage {
  constructor() 
  {
    this.aName = "sondage";
    this.aAliases = ['poll'];
    this.aArgs = true;
    this.aMentions = false;
    this.aUsage = "";
    this.aDescription = "Met en forme un sondage.";
    this.aGuildOnly = true;
    this.aCooldown = 5;
  }
  mName() {
    return this.aName;
  }
  mAliases()
  {
    return this.aAliases;
  }
  mArgs()
  {
    return this.aArgs;
  }
  mMentions()
  {
    return this.aMentions;
  }
  mUsage()
  {
    return this.aUsage;
  }  
  mDescription()
  {
    return this.aDescription;
  }
  mGuildOnly()
  {
    return this.aGuildOnly();
  }
  mCooldown()
  {
    return this.aCooldown();
  }
  async mExecute(pDiscordBot, message, args) 
  {
    const vMember = message.mentions.members.first();
    if (this.aMentions && !vMember) {
      const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setTitle("**Erreur**")
        .setColor(pDiscordBot.aConfig.Bad)
        .setThumbnail(vMember.user.displayAvatarURL());
      message.reply("Vous devez mentionner un membre.");
      message.delete();
      return;
    }
    if(this.aArgs && !args.length)
    {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    if (this.aGuildOnly && message.channel.type !== "text") {
      return message.reply("I can't execute that command inside DMs!");
    }
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL()
      )
      .setTitle("🗠📊Sondage📊🗠")
      .setColor(pDiscordBot.aConfig.Log)
      .setDescription(args.join(" "));
    message.channel.send(vEmbed);
    message.delete();
  }
}

module.exports = new Sondage();