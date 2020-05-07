class mOnChannelDelete {
  constructor() {
    this.aEventName = "channelDelete";
  }
  
  mEventName() {
    return this.aEventName;
  }
  
  async mExecute(pDiscordBot, ...args) {
    const channel = args[0];
    await this.mOnChannelDelete(pDiscordBot, channel);
  }
  
  async mOnChannelDelete(channel) {
    console.log(`channelDelete: ${channel}`);
  }
}

module.exports = new mOnChannelDelete();
