const ms = require("ms");
const Command = require("../Command.js");
class Salaire extends Command {
  constructor() {
    super(
      "salaire",
      ["dayly"],
      [],
      0,
      0,
      0,
      0,
      "salaire",
      "Récupère votre salaire une fois par jour. Le salaire est déterminé par plusieurs facteurs dont la participation et la reconnaissance.",
      true,
      5
    );
  }
  async mExecute(pDiscordBot, message, args) {
    super
      .mExecute(pDiscordBot, message, args)
      .then(() => {
        console.log("0");
        let vParticipation = pDiscordBot.aSQL.getParticipations.get(
          message.guild.id,
          message.author.id
        );
        if (!vParticipation) {
          vParticipation = {
            GuildID: message.guild.id,
            GuildName: message.guild.name,
            MemberID: message.author.id,
            MemberTag: message.author.tag,
            Points: 0,
            Level: 0
          };
        }
        let vReconnaissance = pDiscordBot.aSQL.getReconnaissances.get(
          message.guild.id,
          message.author.id
        );
        if (!vReconnaissance) {
          vReconnaissance = {
            GuildID: message.guild.id,
            GuildName: message.guild.name,
            MemberID: message.author.id,
            MemberTag: message.author.tag,
            Points: 0,
            Level: 0
          };
        }
        let vEconomy = pDiscordBot.aSQL.getEconomy.get(
          message.guild.id,
          message.author.id
        );
        if (!vEconomy) {
          vEconomy = {
            GuildID: message.guild.id,
            GuildName: message.guild.name,
            MemberID: message.author.id,
            MemberTag: message.author.tag,
            Money: 0,
            Date: 0
          };
        }
        const vTimeout = 86400000;
        const vTime = ms(vTimeout - (Date.now() - vEconomy.Date));
        console.log("1");
        if (vTimeout - (Date.now() - vEconomy.Date) > 0) {
          console.log("2");
          const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
            .setAuthor(
              pDiscordBot.aClient.user.username,
              pDiscordBot.aClient.user.displayAvatarURL(),
              pDiscordBot.aConfig.URL
            )
            .setColor(pDiscordBot.aConfig.Bad)
            .setTitle("Erreur...")
            .setDescription(
              `Vous avez déjà récupéré votre paye du jour.\nVous pourrez recommencer dans ${vTime}.`
            )
            .setThumbnail(message.author.displayAvatarURL());
          message.reply(vEmbed);
        } else {
          console.log("3");
          const vSalaire =
            100 + 100 * vReconnaissance.Level + vParticipation.Level;
          console.log(vSalaire);
          vEconomy.Money += vSalaire;
          vEconomy.Date = Date.now();
          pDiscordBot.aSQL.setEconomy.run(vEconomy);
          const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
            .setAuthor(
              pDiscordBot.aClient.user.username,
              pDiscordBot.aClient.user.displayAvatarURL(),
              pDiscordBot.aConfig.URL
            )
            .setColor(pDiscordBot.aConfig.Good)
            .setTitle("Paye du jour")
            .setDescription(
              `${
                message.author
              }, vous avez touché ${vSalaire}₱ pour un solde total de ${
                vEconomy.Money
              }₱.\nVous pourrez recommencer dans ${ms(
                vTimeout - (Date.now() - vEconomy.Date)
              )}.`
            )
            .setThumbnail(message.author.displayAvatarURL());
          message.reply(vEmbed);
        }
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

module.exports = new Salaire();
