const OnEvent = require("../OnEvent.js");
class OnMessageDelete extends OnEvent {
  constructor() {
    super("messageDelete");
  }
  
  async mExecute(pDiscordBot, ...args) {
    const message = args[0];
    await this.mOnMessageDelete(pDiscordBot, message);
  }
  
  async mOnMessageDelete(pDiscordBot, message) {
    var vMessage =
      `le message <` +
      message.id +
      `> est supprimé -> content:"${message.content}" -> embeds :`;
    message.embeds.forEach(embed => {
      vMessage += embed;
    });
    console.error(vMessage);
    var vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setColor(pDiscordBot.aConfig.Bad)
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setTitle("**Suppression de message**")
      .setDescription(vMessage);
    var vLogs = message.guild.channels.cache.find(
      vChannelFound => vChannelFound.name === "logs"
    );
    if (vLogs) {
      vLogs.send(vEmbed);
    }
  }
}

module.exports = new OnMessageDelete();

