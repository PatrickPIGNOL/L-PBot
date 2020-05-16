const OnEvent = require("../OnEvent.js");
class mOnChannelDelete extends OnEvent {
  constructor() {
    super("channelDelete");
  }
  
  async mExecute(pDiscordBot, ...args) {
    const channel = args[0];
    await this.mOnChannelDelete(pDiscordBot, channel);
  }
  
  async mOnChannelDelete(pDiscordBot, channel) {
    console.log(`channelDelete: ${channel}`);
  }
}

module.exports = new mOnChannelDelete();
