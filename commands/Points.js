const Command = require("../Command.js");
class Points extends Command {
  constructor() 
  {
    super(
      "points",
      [],
      [],
      0,
      0,
      "points",
      "Retourne les points de reconnaissances de l'utilisateur",
      true,
      0
    );    
  }
  mExecute(pDiscordBot, message, args) 
  {
    super.mExecute(pDiscordBot, message, args);
    const vUser = message.author;
    var vScore = pDiscordBot.aSQL.getScore.get(message.guild.id, vUser.id);
    if (!vScore) {
      vScore = {
        GuildID: message.guild.id,
        GuildName: message.guild.name,
        MemberID: vUser.id,
        MemberTag: vUser.tag,
        Points: 0,
        Level: 0
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
        "Retrouvez [le classement complet de nos membres]("+pDiscordBot.mConfig().Points +") via internet."
      )
      .setThumbnail(message.author.displayAvatarURL())
      .addFields(
        {
          name: "*Points actuels :*",
          value: vScore.Points + " points (Niv. " + vScore.Level + ")",
          inline: true
        },
        {
          name: "*Prochain Niveau (" + (vScore.Level + 1) + ") :*",
          value: (vScore.Level + 1) * (vScore.Level + 1) + " points.",
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
