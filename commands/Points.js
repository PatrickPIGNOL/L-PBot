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
      "Retourne les points de reconnaissances et de participations de l'utilisateur",
      true,
      0
    );    
  }
  mExecute(pDiscordBot, message, args) 
  {
    super.mExecute(pDiscordBot, message, args);
    const vUser = message.author;
    let vReconnaissance = pDiscordBot.mSQL().getReconnaissances.get(message.guild.id, vUser.id);
    if (!vReconnaissance) {
      vReconnaissance = {
        GuildID: message.guild.id,
        GuildName: message.guild.name,
        MemberID: vUser.id,
        MemberTag: vUser.tag,
        Points: 0,
        Level: 0
      };
    }
    let vParticipation = pDiscordBot.mSQL().getParticipations.get(message.guild.id, vUser.id);
    if (!vParticipation) {
      vParticipation = {
        GuildID: message.guild.id,
        GuildName: message.guild.name,
        MemberID: vUser.id,
        MemberTag: vUser.tag,
        Points: 0,
        Level: 0
      };
    }
    let vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setColor(pDiscordBot.aConfig.Good)
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setTitle("Points de " + message.author.username)
      .setDescription(
        "Retrouvez le classement complet de nos membres [reconnaissances]("+pDiscordBot.mConfig().Reconnaissance +") et [participations]("+ pDiscordBot.mConfig().Participation +") via internet."
      )
      .setThumbnail(message.author.displayAvatarURL())
      .addFields(
        {
          name: "*Points de reconnaissances actuels :*",
          value: vReconnaissance.Points + " points (Niv. " + vReconnaissance.Level + ")",
          inline: false
        },
        {
          name: "*Prochain Niveau (" + (vReconnaissance.Level + 1) + ") :*",
          value: (vReconnaissance.Level + 1) * (vReconnaissance.Level + 1) + " points.",
          inline: false
        },
        {
          name: "*Points de participations actuels :*",
          value: vParticipation.Points + " points (Niv. " + vParticipation.Level + ")",
          inline: false
        },
        {
          name: "*Prochain Niveau (" + (vParticipation.Level + 1) + ") :*",
          value: (vParticipation.Level + 1) * (vParticipation.Level + 1) + " points.",
          inline: false
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
