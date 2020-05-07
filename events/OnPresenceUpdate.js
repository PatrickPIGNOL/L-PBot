class OnPresenceUpdate {
  constructor() {
    this.aEventName = "presenceUpdate";
  }
  
  mEventName() {
    return this.aEventName;
  }
  
  async mExecute(pDiscordBot, ...args) {
    const oldMember = args[0];
    const newMember = args[1];
    //await this.mOnPresenceUpdate(pDiscordBot, oldMember, newMember);
  }
  
  async mOnPresenceUpdate(pDiscordBot, oldMember, newMember) {
    var vMessage = "";
    if (oldMember && newMember) {
      vMessage += `Un membre à changé son statut passant de ${oldMember.user}:${oldMember.status} à ${newMember.user}:${newMember.status}.`;
    } else if (oldMember) {
      vMessage += `Un membre à changé son statut de ${oldMember.user}:${oldMember.status}.`;
    } else if (newMember) {
      vMessage += `Un membre à changé son statut à ${newMember.user}:${newMember.status}.`;
    } else {
      vMessage += `Un membre à changé son statut.`;
    }
    var vLogs = pDiscordBot.aClient.guilds.cache
      .first()
      .channels.cache.find(vChannel => vChannel.name === "logs");
    const vLogEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setColor(pDiscordBot.aConfig.Log)
      .setTitle("Presence Update")
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setDescription(vMessage);
    vLogs.send(vLogEmbed);
  }
}

module.exports = new OnPresenceUpdate();
