const Command = require("../Command.js");
class Donne extends Command {
  constructor() 
  {
    super(
      "donne",
      ["give"],
      ["ADMINISTRATOR"],
      2,
      1,
      "donne <int> @IDPersonne[ @IDPersonne[ ...]]",
      "Donne ou enlève des points de reconnaissances à une ou plusieurs personnes",
      true,
      0
    );
  }
  mExecute(pDiscordBot, message, args) 
  {
    super.mExecute(pDiscordBot, message, args);
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
      var vUser = vMember.user;
      var vScore = pDiscordBot.aSQL.getScore.get(message.guild.id, vUser.id);
      if (!vScore) {
        vScore = {
          GuildID: message.guild.id,
          GuildName: message.guild.name,
          MemberID: vUser.id,
          MemberTag: vUser.tag,
          Points: 0,
          Level: 1
        };
      } else {
        vScore.MemberTag = vUser.tag;
      }
      vScore.GuildName = message.guild.name;
      if (vPoints < 0) {
        vColor = pDiscordBot.aConfig.Bad;
      } else {
        vColor = pDiscordBot.aConfig.Good;
      }
      vScore.Points += vPoints;
      var vColor;
      var vMessage = `${message.author} a donné à ${vMember} ${vPoints} point de Reconnaissance soit un total de ${vScore.Points}.\n`;
      const vLevel = Math.floor(Math.sqrt(vScore.Points));
      if (vScore.Level != vLevel) {
        vMessage += `${vUser} est passé au niveau ${vLevel}.\n`;
        if (vScore.Level < vLevel) {
          vMessage += `:tada::confetti_ball: Félicitations ! :confetti_ball::tada:\n`;
        } else {
          vMessage += `:sob::scream: Vous avez été rétrogradé ! :scream::sob:\n`;
        }
      }
      vScore.Level = vLevel;
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

module.exports = new Donne();