class Exclure {
  constructor() 
  {
    this.aName = "exclure";
    this.aAliases = ['kick'];
    this.aArgs = false;
    this.aMentions = false;
    this.aUsage = "";
    this.aDescription = "c";
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
    vLogs.send(vLogsEmbed);
    const vSysteme = message.guild.channels.cache.find(
      vChannelFound => vChannelFound.name === "system"
    );
    vSysteme.send(vLogsEmbed);
    if (message.author !== message.guild.owner.user) {
      message.reply("Vous n'avez pas la permission d'executer cette commande");
      message.delete();
      return;
    }
    if (!message.mentions.members.first()) {
      message.reply("Vous devez mentionner un membre.");
      message.delete();
      return;
    }
    console.log(message.content);
    message.mentions.members.forEach(vMember => {
      if (vMember !== message.guild.owner) {
        var vArgs = message.content.split(" ");
        vArgs.shift();
        const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
          .setColor(pDiscordBot.aConfig.Bad)
          .setTitle("**⚡🔨EXCLUSION🔨⚡**")
          .setAuthor(vAuthor.username, vAuthor.displayAvatarURL())
          .setImage(pDiscordBot.aConfig.KICK)
          .setThumbnail(vMember.user.displayAvatarURL())
          .setDescription(
            `${vAuthor}` +
              " à exclu " +
              `${vMember.user}` +
              ' pour la raison "' +
              vArgs.join(" ") +
              '".'
          );
        message.channel.send(vEmbed);
        vMember.user.send(vEmbed).then(() => {
          vMember.kick(vArgs.join(" "));
        });
      }
    });
    message.delete();
  }
}

module.exports = new Exclure();

