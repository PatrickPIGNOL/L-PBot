const Command = require("../Command.js");
class Efface extends Command{
  constructor() 
  {
    super(
      "efface",
      ["clean", "bulkdelete"],
      [
        "MANAGE_MESSAGES"
      ],
      1,
      0,
      "efface <number-1-99>",
      "Efface le contenu d'un canal.",
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
    const vSysteme = message.guild.channels.cache.find(
      vChannelFound => vChannelFound.name === "system"
    );
    vLogs.send(vLogsEmbed);
    vSysteme.send(vLogsEmbed);
    const vArgs = message.content.slice(pDiscordBot.aConfig.Prefix.length).split(/ +/);
    console.log("number : " + vArgs[1]);
    if (!vArgs[1] || isNaN(vArgs[1])) {
      message.reply("Vous devez spécifier un nobmre valide");
      message.delete();
      return;
    }
    const vMax = vArgs[1];
    const vChannel = message.channel;
    var vCount = 0;
    const vList = vChannel.messages.fetch({ limit: vMax });
    message.channel
      .bulkDelete(vMax)
      .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
      .catch(console.error);
  }
}

module.exports = new Efface();

