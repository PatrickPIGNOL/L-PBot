const Command = require("../Command.js");
class Parler extends Command {
  constructor() {
    super(
      "parler",
      ["unmute"],
      ["MUTE_MEMBERS"],
      2,
      1,
      0,
      0,
      "parler <raison + @IDPersonne(s)>",
      "Commande d'administration. Rend la parole à une ou plusieurs personne.",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) {
    super
      .mExecute(pDiscordBot, message, args)
      .then(() => {
        const vAuthor = message.author;
        const vLogsEmbed = new pDiscordBot.aDiscord.MessageEmbed()
          .setColor(pDiscordBot.aConfig.Bad)
          .setTitle("**Commande d'administration**")
          .setAuthor(
            pDiscordBot.aClient.user.username,
            pDiscordBot.aClient.user.displayAvatarURL(),
            pDiscordBot.aConfig.URL
          )
          .setThumbnail(message.author.displayAvatarURL())
          .setDescription(
            "L'utilisateur " +
              message.author +
              " à utilisé la commande " +
              "```" +
              `${message.content}` +
              "```" +
              ` dans le cannal ${message.channel}`
          );
        const vLogs = message.guild.channels.cache.find(
          vChannelFound => vChannelFound.name === "logs"
        );
        vLogs.send(vLogsEmbed);
        const vSysteme = message.guild.channels.cache.find(
          vChannelFound => vChannelFound.name === "system"
        );
        vSysteme.send(vLogsEmbed);
        message.mentions.members.forEach(async vMember => {
          
          var vArgs = message.content.split(" ");
          vArgs.shift();
          const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
            .setColor(pDiscordBot.aConfig.Good)
            .setTitle("**🕊️🤝PARLONS EN PAIX🤝🕊️**")
            .setAuthor(vAuthor.username, vAuthor.displayAvatarURL())
            .setImage(pDiscordBot.aConfig.Talk)
            .setThumbnail(vMember.user.displayAvatarURL())
            .setDescription(
              `${vAuthor}` +
                " à rendu la parole à " +
                `${vMember.user}` +
                ' pour la raison "' +
                vArgs.join(" ") +
                '".'
            );
          vMember.send(vEmbed);
          message.channel.send(vEmbed);
        });
        message.guild.channels.cache.forEach(async (channel, id) => {
          var vPermission = channel.permissionOverwrites.get();
          if (vPermission) {
            await vPermission.delete();
          }
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

module.exports = new Parler();
