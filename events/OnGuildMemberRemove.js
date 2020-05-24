const OnEvent = require("../OnEvent.js");
class OnGuildMemberRemove extends OnEvent {
  constructor() {
    super("guildMemberRemove");
  }
  
  async mExecute(pDiscordBot, ...args) {
    const member = args[0];
    await this.mOnGuildMemberRemove(pDiscordBot, member);
  }
  
  mOnGuildMemberRemove(pDiscordBot, member) {
    const vUser = member.user;
    const vGuild = member.guild;
    const vCache = vGuild.channels.cache;
    const vAccueil = vCache.find(
      vChannelFound => vChannelFound.name === "accueil-et-départs"
    );
    const vLogs = vCache.find(vChannelFound => vChannelFound.name === "logs");
    if (!vLogs) {
      console.error('channel "logs" not found');
      return;
    }

    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setColor(pDiscordBot.aConfig.Bad)
      .setDescription(`${member} est parti du serveur.`)
      .setThumbnail(vUser.displayAvatarURL());
    vLogs.send(vEmbed);
    const vSystem = vCache.find(
      vChannelFound => vChannelFound.name === "system"
    );
    if (!vSystem) {
      console.error('channel "system" not found');
      return;
    }
    vSystem.send(vEmbed);
    if (!vAccueil) {
      console.log('channel "accueil-et-départs" not found');
      return;
    }
    const vLeaver = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        vGuild.owner.user.username,
        vGuild.owner.user.displayAvatarURL()
      )
      .setColor(pDiscordBot.aConfig.Bad)
      .setDescription(`Bon vents à toi, ${member}.`)
      .setThumbnail(vUser.displayAvatarURL());
    vAccueil.send(vLeaver);
  }
}

module.exports = new OnGuildMemberRemove();
