class Points {
  constructor() 
  {
    this.aName = "points";
    this.aAliases = [''];
    this.aArgs = false;
    this.aMentions = false;
    this.aUsage = "";
    this.aDescription = "Retourne les points de reconnaissances de l'utilisateur";
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
  mExecute(pDiscordBot, message, args) 
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
    const vUser = message.author;
    var vScore = pDiscordBot.aSQL.getScore.get(message.guild.id, vUser.id);
    if (!vScore) {
      vScore = {
        guild: message.guild.id,
        user: vUser.id,
        usertag: vUser.tag,
        points: 0,
        level: 0
      };
    }
    var vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setColor(pDiscordBot.aConfig.Good)
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setTitle("Points de reconnaissances de " + message.author.username)
      .setDescription(
        "Retrouvez [le classement complet de tous nos membres](https://mercurial-ripe-rook.glitch.me/points) via internet."
      )
      .setThumbnail(message.author.displayAvatarURL())
      .addFields(
        {
          name: "*Points actuels :*",
          value: vScore.points + " points (Niv. " + vScore.level + ")",
          inline: true
        },
        {
          name: "*Prochain Niveau (" + (vScore.level + 1) + ") :*",
          value: (vScore.level + 1) * (vScore.level + 1) + " points.",
          inline: true
        },
        {
          name: "*@Identifiant :*",
          value: vUser,
          inline: false
        }
      );
    message.channel.send(vEmbed);
    message.delete();
  }
}

module.exports = new Points();
