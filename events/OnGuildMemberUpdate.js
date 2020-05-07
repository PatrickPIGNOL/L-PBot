class OnGuildMemberUpdate {
  constructor() {
    this.aEventName = "guildMemberUpdate";
  }

  mEventName() {
    return this.aEventName;
  }

  async mExecute(pDiscordBot, ...args) {
    const oldMember = args[0];
    const newMember = args[1];
    await this.mOnGuildMemberUpdate(pDiscordBot, oldMember, newMember);
  }

  async mOnGuildMemberUpdate(pDiscordBot, oldMember, newMember) {
    var vThumbnail = "";
    const vGuild = pDiscordBot.aClient.guilds.cache.find(
      vGuild => vGuild.name === "Logique & Programmation"
    );
    const vLogs = vGuild.channels.cache.find(
      vChannelFound => vChannelFound.name === "logs"
    );
    const vLogsEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setDescription(vMessage)
      .setThumbnail(vThumbnail)
      .setColor(pDiscordBot.aConfig.Log);
    vLogs.send(vLogsEmbed);
    var vMessage = "";
    if (oldMember && newMember) {
      vThumbnail = newMember.user.displayAvatarURL();
      vMessage += `a guild member changes from ${oldMember.tag} to ${newMember.tag} - i.e. new role, removed role, nickname.\n`;
      vMessage += `old nickname : ${oldMember.user.nickname}; new nickname : ${newMember.user.nickname}\n`;
      vMessage += `old tag : ${oldMember.user.tag}; new tag : ${newMember.user.tag}\n`;
      vMessage += `old roles :\n`;
      for (var vIndex = 0; vIndex < oldMember.roles.size; vIndex++) {
        vMessage += `${oldMember.user.roles[vIndex].tag}\n`;
      }
      vMessage += `new roles :\n`;
      for (var vIndex = 0; vIndex < newMember.roles.size; vIndex++) {
        vMessage += `${newMember.roles[vIndex].tag}\n`;
      }
    } else if (oldMember) {
      vThumbnail = oldMember.user.displayAvatarURL();
      vMessage += `a guild member changes from ${oldMember.tag} - i.e. new role, removed role, nickname.\n`;
      vMessage += `old nickname : ${oldMember.nickname}\n`;
      vMessage += `old tag : ${oldMember.tag}\n`;
      vMessage += `old roles :\n`;
      for (var vIndex = 0; vIndex < oldMember.roles.size; vIndex++) {
        vMessage += `${oldMember.roles[vIndex].tag}\n`;
      }
      vMessage += `new roles :\n`;
      for (var vIndex = 0; vIndex < newMember.roles.size; vIndex++) {
        vMessage += `${newMember.roles[vIndex].tag}\n`;
      }
    } else if (newMember) {
      vThumbnail = newMember.user.displayAvatarURL();
      vMessage = `a guild member changes to ${newMember.tag} - i.e. new role, removed role, nickname.\n`;
      vMessage += `new nickname : ${newMember.nickname}\n`;
      vMessage += `new tag : ${newMember.tag}\n`;
      vMessage += `new roles :\n`;
      for (var vIndex = 0; vIndex < newMember.roles.size; vIndex++) {
        vMessage += `${newMember.roles[vIndex].tag}\n`;
      }
    } else {
      vMessage += `a guild member changes - i.e. new role, removed role, nickname.`;
    }
  }
}

module.exports = new OnGuildMemberUpdate();
