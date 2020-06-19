const Command = require("../Command.js");
class Supprime extends Command {
  constructor() {
    super(
      "exclure",
      ["delete", "clear"],
      ["MANAGE_MESSAGES"],
      1,
      0,
      0,
      0,
      "supprime <nombre-1-99>",
      "Supprime les messages un par un.",
      true,
      0
    );
    this.aName = "supprime";
    this.aAliases = ["delete", "clear"];
    this.aArgs = true;
    this.aMentions = false;
    this.aUsage = "+supprime <nombre-1-99>";
    this.aDescription = "Supprime les messages un par un.";
    this.aGuildOnly = true;
    this.aCooldown = 5;
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
        if (message.author !== message.guild.owner.user) {
          message.reply(
            "Vous n'avez pas la permission d'executer cette commande"
          );
          message.delete();
          return;
        }
        const vArgs = message.content
          .slice(pDiscordBot.aConfig.Prefix.length)
          .split(/ +/);
        console.log("number : " + vArgs[1]);
        if (!vArgs[1] || isNaN(vArgs[1])) {
          message.reply("Vous devez spécifier un nobmre valide");
          message.delete();
          return;
        }
        const vMax = vArgs[1];
        const vChannel = message.channel;
        var vCount = 0;
        message
          .delete()
          .then(() => {
            const vList = vChannel.messages
              .fetch({ limit: vMax })
              .then(vMessages => {
                vMessages
                  .forEach((vMessage, vIndex) => {
                    try {
                      vMessage
                        .delete()
                        .then(vDeletedMessage => {
                          console.error(
                            `deleting message #${vIndex} : ${vMessage.content}`
                          );
                          vCount++;
                        })
                        .catch(e => {
                          console.error(e);
                        });
                    } catch (e) {
                      console.error(e);
                    }
                  })
                  .then(() => {
                    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
                      .setColor(pDiscordBot.aConfig.Bad)
                      .setAuthor(
                        pDiscordBot.aClient.user.username,
                        pDiscordBot.aClient.user.displayAvatarURL(),
                        pDiscordBot.aConfig.URL
                      )
                      .setTitle("Commande d'administration")
                      .setDescription(vCount + " message deleted");
                    vChannel.send(vEmbed);
                  });
              });
          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
        message.reply(e);
        message.delete();
        return;
      });
  }
}

module.exports = new Supprime();
