const Command = require("../Command.js");
class Exclure extends Command {
  constructor() {
    super(
      "exclure",
      ["kick"],
      ["KICK_MEMBERS"],
      2,
      1,
      0,
      0,
      "exclure < @IDPersonne [@IDPersonne [...]] Raison>",
      "Exclure des personnes du serveur.",
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
        message.mentions.members.forEach(vMember => {
          if (vMember !== message.guild.owner) {
            var vArgs = message.content.split(" ");
            vArgs.shift();
            const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
              .setColor(pDiscordBot.aConfig.Bad)
              .setTitle("**⚡🔨EXCLUSION🔨⚡**")
              .setAuthor(vAuthor.username, vAuthor.displayAvatarURL())
              .setImage(pDiscordBot.aConfig.KICK)
              .setThumbnail(vMember.user.displayAvatarURL())
              .setDescription(
                `${vAuthor}` +
                  " à exclu " +
                  `${vMember.user}` +
                  ' pour la raison "' +
                  vArgs.join(" ") +
                  '".'
              );
            message.channel.send(vEmbed);
            vMember.user.send(vEmbed).then(() => {
              vMember.kick(vArgs.join(" "));
            });
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

module.exports = new Exclure();
