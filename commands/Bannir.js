const Command = require("../Command.js");
class Bannir extends Command {
  constructor() 
  {
    super(
      "bannir",
      ["ban"],
      [
        "ADMINISTRATOR", // (implicitly has all permissions, and bypasses all channel overwrites) 
      ],
      1,
      1,
      "bannir <Raison + @IDPersonne(s) [+...]>",
      "Bannir définitivement une ou plusieurs personnes.",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) 
  {
    super.mExecute(pDiscordBot, message, args); 
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
      message.reply("Vous n'avez pas la permission d'executer cette commande");
      message.delete();
      return;
    }
    if (!message.mentions.members.first()) {
      message.reply("Vous devez mentionner un membre.");
      message.delete();
      return;
    }
    console.log(message.content);
    message.mentions.members.forEach(vMember => {
      if (vMember !== message.guild.owner) {
        var vArgs = message.content.split(" ");
        vArgs.shift();
        const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
          .setColor(pDiscordBot.aConfig.Bad)
          .setTitle("**⚡🔨BANNISSEMENT🔨⚡**")
          .setAuthor(vAuthor.username, vAuthor.displayAvatarURL())
          .setImage(pDiscordBot.aConfig.BAN)
          .setThumbnail(vMember.user.displayAvatarURL())
          .setDescription(
            `${vAuthor}` +
              " à banni " +
              `${vMember.user}` +
              ' pour la raison "' +
              vArgs.join(" ") +
              '".'
          );
        message.channel.send(vEmbed);
        vMember.user.send(vEmbed).then(() => {
          vMember.ban({ days: 0, reason: message.content });
        });
      }
    });
    message.delete();
  }
}

module.exports = new Bannir();

