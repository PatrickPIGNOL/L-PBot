const OnEvent = require("../OnEvent.js");
class OnGuildMemberSpeaking extends OnEvent {
  constructor() {
    super("guildMemberSpeaking");
  }
  
  async mExecute(pDiscordBot, ...args) {
    const member = args[0];
    const speaking = args[1]
    await this.OnGuildMemberSpeaking(pDiscordBot, member, speaking);
  }  
  
  async mOnGuildMemberSpeaking(pDiscordBot, member, speaking) {
    console.log(`a guild member starts/stops speaking: ${member.tag}`);
  }
}

module.exports = new OnGuildMemberSpeaking();