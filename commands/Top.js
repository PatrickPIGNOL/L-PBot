class Top {
  constructor() 
  {
    this.aName = "top";
    this.aAliases = [''];
    this.aArgs = false;
    this.aMentions = false;
    this.aUsage = "";
    this.aDescription = "Top 10 classement des points de reconnaissances.";
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
          "Vous n'avez pas la permission d'utiliser la commande \"top\""
        );
      message.reply(vReply);
      message.delete();
      return;
    }
    console.log("entering top");
    const top10 = pDiscordBot.aSQL
      .prepare(
        "SELECT * FROM scores WHERE guild = ? ORDER BY points DESC, usertag ASC LIMIT 10;"
      )
      .all(message.guild.id);
    const embed = new pDiscordBot.aDiscord.MessageEmbed()
      .setColor(pDiscordBot.aConfig.Good)
      .setTitle("Top 10 des points de reconnaissances")
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setDescription(
        `Retrouvez [le classement complet de tous nos membres](${pDiscordBot.aConfig.Points}) via internet.`
      );

    console.log("message embed created");
    var vRank = 1;
    top10.forEach(vData => {
      const vUserID = vData.user;
      const vMember = message.guild.members.cache.find(
        vSearchMember => vSearchMember.user.id == vUserID
      );
      if (vMember) {
        const vUser = vMember.user;
        console.log(vRank + ":" + vUser.tag + ":" + vUser.id);

        console.log("user " + vUser.tag + " fetched");
        embed.addField(
          `#${vRank} - ${vData.points} points (Niv. ${vData.level})`,
          `@${vUser.tag}`
        );
        //embed.setImage(vUser.displayAvatarURL());
        console.log("Field added !");
        vRank++;
      }
    });
    console.log("loop Finished !");
    message.channel.send(embed);
    message.delete();
  }
}

module.exports = new Top();
