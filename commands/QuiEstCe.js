class QuiEstCe {
  constructor() 
  {
    this.aDiscord = require("discord.js");
    this.aName = "quiestce";
    this.aAliases = ['quic','cqui','whois','whos', 'who'];
    this.aArgs = false;
    this.aMentions = true;
    this.aUsage = "";
    this.aDescription = "Qui est cette personne ?";
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
    const vUser = vMember.user;
    if (!vMember) {
      const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
        .setAuthor(
          pDiscordBot.aClient.user.username,
          pDiscordBot.aClient.user.displayAvatarURL(),
          pDiscordBot.aConfig.URL
        )
        .setTitle("**Erreur**")
        .setColor(pDiscordBot.aConfig.Bad)
        .setThumbnail(vUser.displayAvatarURL());
      message.reply("Vous devez mentionner un membre.");
      message.delete();
      return;
    }
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setTitle(vUser.username)
      .setColor(pDiscordBot.aConfig.Good)
      .setThumbnail(vUser.displayAvatarURL())
      .addFields(
        { name: "ID :", value: `${vUser.id}`, inline: true },
        { name: "Name :", value: `${vUser.username}`, inline: true },
        { name: "Tag :", value: `@${vUser.tag}`, inline: true },
        {
          name: "Date de création :",
          value: `${vUser.createdAt}`,
          inline: true
        }
      );
    message.channel.send(vEmbed);
    message.delete();
  }
}

module.exports = new QuiEstCe();
