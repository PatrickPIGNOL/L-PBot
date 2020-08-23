const Command = require("../Command.js");
class Reconnaissance extends Command {
  constructor() {
    super(
      "reconnaissance",
      ["reco"],
      ["ADMINISTRATOR"],
      2,
      1,
      0,
      0,
      "reconnaissance <[+|-]int> @IDPersonne[ @IDPersonne[ ...]]",
      "Donne ou enlève des points de reconnaissances à une ou plusieurs personnes",
      true,
      0
    );
  }
  mExecute(pDiscordBot, message, args) {
    super
      .mExecute(pDiscordBot, message, args)
      .then(() => {
        const vMember = message.mentions.members.first();
        const vArgs = message.content.split(/ +/);
        if (isNaN(args[0])) {
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
        const vPoints = parseInt(vArgs[1]);
        message.mentions.members.forEach(vMember => {
          let vUser = vMember.user;
          let vReconnaissance = pDiscordBot
            .mSQL().Database.Reconnaissances.mGetReconnaissances(message.guild.id, vUser.id);
          if (!vReconnaissance) {
            vReconnaissance = {
              GuildID: message.guild.id,
              GuildName: message.guild.name,
              MemberID: vUser.id,
              MemberTag: vUser.tag,
              Points: 0,
              Level: 1
            };
          } else {
            vReconnaissance.MemberTag = vUser.tag;
          }
          vReconnaissance.GuildName = message.guild.name;
          let vColor;
          if (vPoints < 0) {
            vColor = pDiscordBot.aConfig.Bad;
          } else {
            vColor = pDiscordBot.aConfig.Good;
          }
          vReconnaissance.Points += vPoints;
          let vMessage = `${message.author} a donné à ${vMember} ${vPoints} point de Reconnaissance soit un total de ${vReconnaissance.Points}.\n`;
          const vLevel = Math.floor(Math.sqrt(vReconnaissance.Points));
          if (vReconnaissance.Level != vLevel) {
            vMessage += `${vUser} est passé au niveau ${vLevel}.\n`;
            if (vReconnaissance.Level < vLevel) {
              vMessage += `:tada::confetti_ball: Félicitations ! :confetti_ball::tada:\n`;
            } else {
              vMessage += `:sob::scream: Vous avez été rétrogradé ! :scream::sob:\n`;
            }
          }
          vReconnaissance.Level = vLevel;
          pDiscordBot.aSQL.Database.Reconnaissances.mSetReconnaissances(vReconnaissance);
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
      })
      .catch(e => {
        console.error(e);
        message.reply(e);
        message.delete();
        return;
      });
  }
}

module.exports = new Reconnaissance();
