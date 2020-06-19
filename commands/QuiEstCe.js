const Command = require("../Command.js");
class QuiEstCe extends Command {
  constructor() {
    super(
      "quiestce",
      ["quic", "cqui", "whois", "whos", "who"],
      [],
      0,
      1,
      0,
      0,
      "quiestce @IDUtilisateur",
      "Qui est cette personne ?",
      true,
      5
    );
  }
  mExecute(pDiscordBot, message, args) {
    super
      .mExecute(pDiscordBot, message, args)
      .then(() => {
        const vMember = message.mentions.members.first();
        const vUser = vMember.user;
        let vEconomy = pDiscordBot.mSQL().get;
        let vReconnaissance = pDiscordBot.aSQL.getReconnaissances.get(
          message.guild.id,
          vUser.id
        );
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
        let vParticipation = pDiscordBot.aSQL.getParticipations.get(
          message.guild.id,
          vUser.id
        );
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
            { name: "ID :", value: `${vUser.id}`, inline: false },
            { name: "Name :", value: `${vUser.username}`, inline: false },
            { name: "Tag :", value: `@${vUser.tag}`, inline: false },
            {
              name: "Date de création :",
              value: `${vUser.createdAt}`,
              inline: false
            },
            {
              name: "Points de Reconnaissances :",
              value: `Points : ${vReconnaissance.Points}\nNiveau : ${
                vReconnaissance.Level
              }\n Prochain niveau à ${(vReconnaissance.Level + 1) *
                (vReconnaissance.Level + 1)} points`,
              inline: false
            },
            {
              name: "Points de Participations :",
              value: `Points : ${vParticipation.Points}\nNiveau : ${
                vParticipation.Level
              }\n Prochain niveau à ${(vParticipation.Level + 1) *
                (vParticipation.Level + 1)} points`,
              inline: false
            }
          );
        message.reply(vEmbed);
        message.delete();
      })
      .catch(e => {
        console.error(e);
        message.reply(e);
        message.delete();
        return;
      });
  }
}

module.exports = new QuiEstCe();
