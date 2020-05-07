class OnMessageDelete {
  constructor() {
    this.aEventName = "messageDeleteBulk";
  }
  
  mEventName() {
    return this.aEventName;
  }
  
  async mExecute(pDiscordBot, ...args) {
    const messages = args[0];
    await this.mOnMessageDelete(pDiscordBot, messages);
  }
  
  async mOnMessageDeleteBulk(pDiscordBot, messages) {
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setTitle("DeleteBulk")
      .setDescription(`${messages.length} messages ont été supprimés en masse.`)
      .setColor(pDiscordBot.aConfig.Bad);    
    const vLogs = pDiscordBot.aClient.guilds.cache
      .first()
      .channels.cache.find(vChannelFound => vChannelFound.name === "logs");
    if (vLogs) {
      vLogs.send(vEmbed);
    }
  }

}

module.exports = new OnMessageDelete();

