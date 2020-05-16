const Command = require("../Command.js");
class Statistiques extends Command {
  constructor() {
    super(
      "statistiques",
      ["stats"],
      [
        "ADMINISTRATOR"
      ],
      0,
      0,
      "statistiques",
      "Affiche les statistiques du serveur ...",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) {
    super.mExecute(pDiscordBot, message, args);
    let vOnlineMembers = 0;
    message.guild.members.cache.forEach(vMemberFound => {
      if(vMemberFound.presence.status !== "offline")
      {
        vOnlineMembers++;
      }
    });
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setTitle("📊Statistiques🗠")
      .setColor(pDiscordBot.aConfig.Good)
      .setDescription(`Statistique du serveur ${message.guild.name}`)
      .addFields(
        {
          name: "**Propriétaire**",
          value: `${message.guild.owner}`,            
          inline: false
        },
        {
          name: "**Utilisateurs Online**",
          value: `${vOnlineMembers}`,
          inline: true
        },
        {
          name: "**Utilisateurs Total**",
          value: `${message.guild.memberCount}`,
          inline: true
        },
      )
      //.setThumbnail()
    ;
    message.reply(vEmbed);
    message.delete();
  }
}

module.exports = new Statistiques();