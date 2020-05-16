const OnEvent = require("../OnEvent.js");
class OnChannelUpdate extends OnEvent {
  constructor() {
    super("channelUpdate");
  }
  
  async mExecute(pDiscordBot, ...args) {
    const oldChannel = args[0];
    const newChannel = args[1];
    await this.mOnChannelUpdate(pDiscordBot, oldChannel, newChannel);
  }
  
  async mOnChannelUpdate(pDiscordBot, oldChannel, newChannel) {
    if (oldChannel && newChannel) {
      console.log(
        `channelUpdate -> a channel is updated from ${oldChannel.name} to ${newChannel.name}`
      );
    } else if (oldChannel) {
      console.log(
        `channelUpdate -> a channel is updated from ${oldChannel.name}`
      );
    } else if (newChannel) {
      console.log(
        `channelUpdate -> a channel is updated to ${newChannel.name}`
      );
    } else {
      console.log(
        `channelUpdate -> a channel is updated - e.g. name change, topic change`
      );
    }
  }
}

module.exports = new OnChannelUpdate();

