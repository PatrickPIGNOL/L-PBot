class Efface {
  constructor() 
  {
    this.aName = "efface";
    this.aAliases = ['clean', 'bulkdelete'];
    this.aArgs = false;
    this.aMentions = false;
    this.aUsage = "+efface <number-1-99>";
    this.aDescription = "Commande d'administration. Efface le contenu d'un canal.";
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
    const vAuthor = message.author;
    const vLogsEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setColor(pDiscordBot.aConfig.Bad)
      .setTitle("**Commande d'administration**")
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(
        "L'utilisateur " +
          message.author +
          " à utilisé la commande " +
          "```" +
          `${message.content}` +
          "```" +
          ` dans le cannal ${message.channel}`
      );
    const vLogs = message.guild.channels.cache.find(
      vChannelFound => vChannelFound.name === "logs"
    );
    const vSysteme = message.guild.channels.cache.find(
      vChannelFound => vChannelFound.name === "system"
    );
    vLogs.send(vLogsEmbed);
    vSysteme.send(vLogsEmbed);
    if (message.author !== message.guild.owner.user) {
      message.reply("Vous n'avez pas la permission d'executer cette commande");
      message.delete();
      return;
    }
    const vArgs = message.content.slice(pDiscordBot.aConfig.Prefix.length).split(/ +/);
    console.log("number : " + vArgs[1]);
    if (!vArgs[1] || isNaN(vArgs[1])) {
      message.reply("Vous devez spécifier un nobmre valide");
      message.delete();
      return;
    }
    const vMax = vArgs[1];
    const vChannel = message.channel;
    var vCount = 0;
    const vList = vChannel.messages.fetch({ limit: vMax });
    message.channel
      .bulkDelete(vMax)
      .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
      .catch(console.error);
  }
}

module.exports = new Efface();

