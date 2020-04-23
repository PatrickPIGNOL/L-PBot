class Give {
  constructor() 
  {
    this.aName = "give";
    this.aAliases = [''];
    this.aArgs = false;
    this.aMentions = true;
    this.aUsage = "";
    this.aDescription = "Donne ou enlève des points de reconnaissances à une ou plusieurs personnes";
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
    if (message.author !== message.guild.owner.user) {
      const vReply = new pDiscordBot.aDiscord.MessageEmbed()
        .setTitle("**Erreur**")
        .setColor(pDiscordBot.aConfig.Bad)
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setDescription(
          "Vous n'avez pas le droit d'utiliser la commande \"give\""
        );
      message.reply(vReply);
      message.delete();
      return;
    }
    const vArgs = message.content.slice().split(/ +/);
    if (isNaN(vArgs[1])) {
      const vReply = new pDiscordBot.aDiscord.MessageEmbed()
        .setTitle("**Erreur**")
        .setColor(pDiscordBot.aConfig.Bad)
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setDescription("Vous devez donner un nombre de points valide.");
      message.reply(vReply);
      message.delete();
      return;
    }
    if (!message.mentions.members.first()) {
      const vReply = new pDiscordBot.aDiscord.MessageEmbed()
        .setTitle("**Erreur**")
        .setColor(pDiscordBot.aConfig.Bad)
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setDescription("Vous devez mensionner au moins un utilisateur.");
      message.reply(vReply);
      message.delete();
      return;
    }
    const vPoints = parseInt(vArgs[1]);

    message.mentions.members.forEach(vMember => {
      var vUser = vMember.user;
      var vScore = pDiscordBot.aSQL.getScore.get(message.guild.id, vUser.id);
      if (!vScore) {
        vScore = {
          guild: message.guild.id,
          user: vUser.id,
          usertag: vUser.tag,
          points: 0,
          level: 1
        };
      } else {
        vScore.usertag = vUser.tag;
      }
      if (vPoints < 0) {
        vColor = pDiscordBot.aConfig.Bad;
      } else {
        vColor = pDiscordBot.aConfig.Good;
      }
      vScore.points += vPoints;
      var vColor;
      var vMessage = `${message.author} a donné à ${vMember} ${vPoints} point de Reconnaissance soit un total de ${vScore.points}.\n`;
      const vLevel = Math.floor(Math.sqrt(vScore.points));
      if (vScore.level != vLevel) {
        vMessage += `${vUser} est passé au niveau ${vLevel}.\n`;
        if (vScore.level < vLevel) {
          vMessage += `:tada::confetti_ball: Félicitations ! :confetti_ball::tada:\n`;
        } else {
          vMessage += `:sob::scream: Vous avez été rétrogradé ! :scream::sob:\n`;
        }
      }
      vScore.level = vLevel;
      pDiscordBot.aSQL.setScore.run(vScore);
      const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
        .setColor(vColor)
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setTitle("**Modification des points de reconnaissance**")
        .setThumbnail(vUser.displayAvatarURL())
        .setDescription(vMessage);
      message.channel.send(vEmbed);
    });
    message.delete();
  }
}

module.exports = new Give();